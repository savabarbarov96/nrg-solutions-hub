import { supabase } from '@/lib/supabase';
import { projects as staticProjects } from '@/content/site-content';
import type {
  Project,
  ProjectInsert,
  ProjectUpdate,
  ProjectImage,
  ProjectImageInsert,
  PricingPackage,
  PricingPackageUpdate,
} from '@/types/database';

// =====================================================
// Projects API
// =====================================================

export async function getProjects(type?: 'home' | 'business'): Promise<any[]> {
  const staticFiltered = type
    ? staticProjects.filter((project) => project.type === type)
    : staticProjects;

  try {
    let query = supabase
      .from('projects')
      .select(`
        *,
        project_images (
          image_url,
          display_order
        )
      `)
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Transform data to include first image as 'image' property for compatibility
    const projects = (data || []).map((project: any) => {
      const images = project.project_images || [];
      const firstImage = images.sort((a: any, b: any) => a.display_order - b.display_order)[0];

      return {
        ...project,
        image: firstImage?.image_url || null,
        project_images: undefined, // Remove the nested array from the response
      };
    });

    // Hardcoded portfolio is source of truth for known slugs.
    // Keep DB-only projects as extras (e.g. newly created from admin).
    const dbOnlyProjects = projects.filter(
      (dbProject) => !staticFiltered.some((staticProject) => staticProject.slug === dbProject.slug)
    );

    return [...staticFiltered, ...dbOnlyProjects];
  } catch (error) {
    console.warn('Falling back to static projects dataset:', error);
    return staticFiltered;
  }
}

export async function getProjectBySlug(slug: string): Promise<any | null> {
  const staticProject = staticProjects.find((project) => project.slug === slug);
  if (staticProject) {
    return staticProject;
  }

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (
        image_url,
        display_order
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return staticProject || null;
    }
    console.error('Error fetching project:', error);
    throw new Error(`Failed to fetch project: ${error.message}`);
  }

  if (!data) return null;

  // Transform data to include first image as 'image' property for compatibility
  const images = data.project_images || [];
  const firstImage = images.sort((a: any, b: any) => a.display_order - b.display_order)[0];

  return {
    ...data,
    image: firstImage?.image_url || null,
    project_images: undefined,
  };
}

export async function getProjectById(id: number): Promise<any | null> {
  const staticProject = staticProjects.find((project) => project.id === id);

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (
        image_url,
        display_order
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return staticProject || null;
    }
    console.error('Error fetching project:', error);
    throw new Error(`Failed to fetch project: ${error.message}`);
  }

  if (!data) return staticProject || null;

  // Transform data to include first image as 'image' property for compatibility
  const images = data.project_images || [];
  const firstImage = images.sort((a: any, b: any) => a.display_order - b.display_order)[0];

  return {
    ...data,
    image: firstImage?.image_url || null,
    project_images: undefined,
  };
}

export async function createProject(project: ProjectInsert): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating project:', error);
    throw new Error(`Failed to create project: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to create project: no project was returned by the database');
  }

  return data;
}

export async function updateProject(id: number, updates: ProjectUpdate): Promise<Project> {
  const payload = { ...updates, updated_at: new Date().toISOString() };

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating project:', error);
    throw new Error(`Failed to update project: ${error.message}`);
  }

  if (data) {
    return data;
  }

  // Fallback path for hardcoded projects: update by slug, or create if missing.
  const staticProject = staticProjects.find((project) => project.id === id);
  const fallbackSlug = updates.slug || staticProject?.slug;

  if (!fallbackSlug) {
    throw new Error('Failed to update project: project not found or update not permitted');
  }

  const { data: dataBySlug, error: errorBySlug } = await supabase
    .from('projects')
    .update(payload)
    .eq('slug', fallbackSlug)
    .select()
    .maybeSingle();

  if (errorBySlug) {
    console.error('Error updating project by slug:', errorBySlug);
    throw new Error(`Failed to update project: ${errorBySlug.message}`);
  }

  if (dataBySlug) {
    return dataBySlug;
  }

  const projectToCreate: ProjectInsert = {
    slug: fallbackSlug,
    city: updates.city || staticProject?.city || 'България',
    power: updates.power || staticProject?.power || '0 kW',
    type: updates.type || staticProject?.type || 'home',
    title: updates.title || staticProject?.title || fallbackSlug,
    summary: updates.summary || staticProject?.summary || 'Проект от портфолиото на NRGsolution.',
    completed_scope: updates.completed_scope || staticProject?.completed_scope || [],
    solis_note: updates.solis_note || staticProject?.solis_note || '',
  };

  const { data: createdProject, error: createError } = await supabase
    .from('projects')
    .insert(projectToCreate)
    .select()
    .maybeSingle();

  if (createError) {
    console.error('Error creating project during update fallback:', createError);
    throw new Error(`Failed to update project: ${createError.message}`);
  }

  if (!createdProject) {
    throw new Error('Failed to update project: project was not created');
  }

  return createdProject;
}

export async function deleteProject(id: number): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw new Error(`Failed to delete project: ${error.message}`);
  }
}

// =====================================================
// Project Images API
// =====================================================

export async function getProjectImages(projectId: number): Promise<ProjectImage[]> {
  const { data, error } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching project images:', error);
    throw new Error(`Failed to fetch project images: ${error.message}`);
  }

  return data || [];
}

export async function uploadProjectImage(
  projectId: number,
  file: File,
  displayOrder: number = 0
): Promise<ProjectImage> {
  // Upload to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${projectId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('project-images').getPublicUrl(filePath);

  // Create database record
  const imageInsert: ProjectImageInsert = {
    project_id: projectId,
    image_url: publicUrl,
    display_order: displayOrder,
  };

  const { data, error } = await supabase
    .from('project_images')
    .insert(imageInsert)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating image record:', error);
    throw new Error(`Failed to create image record: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to create image record: no image record was returned by the database');
  }

  return data;
}

export async function deleteProjectImage(imageId: number): Promise<void> {
  // Get image URL first to delete from storage
  const { data: image } = await supabase
    .from('project_images')
    .select('image_url')
    .eq('id', imageId)
    .single();

  if (image?.image_url) {
    // Extract path from URL
    const url = new URL(image.image_url);
    const pathParts = url.pathname.split('/project-images/');
    if (pathParts.length > 1) {
      const filePath = pathParts[1];
      await supabase.storage.from('project-images').remove([filePath]);
    }
  }

  // Delete database record
  const { error } = await supabase.from('project_images').delete().eq('id', imageId);

  if (error) {
    console.error('Error deleting image:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

export async function reorderProjectImages(
  updates: { id: number; display_order: number }[]
): Promise<void> {
  const promises = updates.map(({ id, display_order }) =>
    supabase.from('project_images').update({ display_order }).eq('id', id)
  );

  const results = await Promise.all(promises);
  const errors = results.filter((r) => r.error);

  if (errors.length > 0) {
    console.error('Error reordering images:', errors);
    throw new Error('Failed to reorder images');
  }
}

// =====================================================
// Pricing Packages API
// =====================================================

export async function getPricingPackages(): Promise<PricingPackage[]> {
  const { data, error } = await supabase
    .from('pricing_packages')
    .select('*')
    .order('price_eur', { ascending: true });

  if (error) {
    console.error('Error fetching pricing packages:', error);
    throw new Error(`Failed to fetch pricing packages: ${error.message}`);
  }

  return data || [];
}

export async function updatePricingPackage(
  id: '8kw' | '12kw' | '15kw',
  updates: PricingPackageUpdate
): Promise<PricingPackage> {
  const { data, error } = await supabase
    .from('pricing_packages')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating pricing package:', error);
    throw new Error(`Failed to update pricing package: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to update pricing package: package not found or update not permitted');
  }

  return data;
}
