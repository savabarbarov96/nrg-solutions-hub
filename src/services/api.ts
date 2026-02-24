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
  PricingOfferCard,
  PricingOfferCardId,
  PricingOfferCardUpdate,
  QuestionnaireSubmissionInsert,
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
          display_order,
          rotation
        )
      `)
      .order('display_order', { ascending: true });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Transform DB rows: extract first image + rotation
    const dbProjects = (data || []).map((project: any) => {
      const images = project.project_images || [];
      const firstImage = images.sort((a: any, b: any) => a.display_order - b.display_order)[0];

      return {
        ...project,
        image: firstImage?.image_url || null,
        image_rotation: firstImage?.rotation || 0,
        project_images: undefined,
      };
    });

    // Build a map of DB projects by slug for quick lookup
    const dbBySlug = new Map<string, any>();
    for (const dbProject of dbProjects) {
      dbBySlug.set(dbProject.slug, dbProject);
    }

    // Merge: for each static project, use DB display_order if a DB row exists
    const merged: any[] = staticFiltered.map((staticProject) => {
      const dbRow = dbBySlug.get(staticProject.slug);
      if (dbRow) {
        return {
          ...staticProject,
          display_order: dbRow.display_order,
          image_rotation: dbRow.image_rotation || 0,
        };
      }
      return staticProject;
    });

    // Add DB-only projects (not in static list)
    const staticSlugs = new Set(staticFiltered.map((p) => p.slug));
    for (const dbProject of dbProjects) {
      if (!staticSlugs.has(dbProject.slug)) {
        merged.push(dbProject);
      }
    }

    // Sort by display_order ascending
    merged.sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

    return merged;
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
        display_order,
        rotation
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

  const images = data.project_images || [];
  const firstImage = images.sort((a: any, b: any) => a.display_order - b.display_order)[0];

  return {
    ...data,
    image: firstImage?.image_url || null,
    image_rotation: firstImage?.rotation || 0,
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
        display_order,
        rotation
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

  const images = data.project_images || [];
  const firstImage = images.sort((a: any, b: any) => a.display_order - b.display_order)[0];

  return {
    ...data,
    image: firstImage?.image_url || null,
    image_rotation: firstImage?.rotation || 0,
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
// Project Ordering API
// =====================================================

export async function reorderProjects(
  orderedProjects: { id: number; slug: string; display_order: number }[]
): Promise<void> {
  for (const project of orderedProjects) {
    // Update by slug — avoids id mismatch between static array ids and DB ids.
    // Returns an array (never 406), empty if no row exists.
    const { data: updated, error } = await supabase
      .from('projects')
      .update({ display_order: project.display_order })
      .eq('slug', project.slug)
      .select('id');

    if (error) {
      console.error('Error reordering project:', project.slug, error);
      throw new Error(`Failed to reorder project "${project.slug}": ${error.message}`);
    }

    // No existing DB row for this static project — insert one
    if (!updated || updated.length === 0) {
      const staticProject = staticProjects.find((p) => p.slug === project.slug);
      if (staticProject) {
        const { error: insertError } = await supabase.from('projects').insert({
          slug: staticProject.slug,
          city: staticProject.city,
          power: staticProject.power,
          type: staticProject.type,
          title: staticProject.title,
          summary: staticProject.summary,
          completed_scope: staticProject.completed_scope,
          solis_note: staticProject.solis_note,
          display_order: project.display_order,
        });

        if (insertError) {
          console.error('Error inserting static project for reorder:', staticProject.slug, insertError);
        }
      }
    }
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

export async function updateImageRotation(imageId: number, rotation: number): Promise<void> {
  const { error } = await supabase
    .from('project_images')
    .update({ rotation })
    .eq('id', imageId);

  if (error) {
    console.error('Error updating image rotation:', error);
    throw new Error(`Failed to update image rotation: ${error.message}`);
  }
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

// =====================================================
// Pricing Offer Cards API
// =====================================================

export async function getPricingOfferCards(): Promise<PricingOfferCard[]> {
  const { data, error } = await supabase
    .from('pricing_offer_cards')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching pricing offer cards:', error);
    throw new Error(`Failed to fetch pricing offer cards: ${error.message}`);
  }

  return data || [];
}

export async function updatePricingOfferCard(
  id: PricingOfferCardId,
  updates: PricingOfferCardUpdate
): Promise<PricingOfferCard> {
  const { data, error } = await supabase
    .from('pricing_offer_cards')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating pricing offer card:', error);
    throw new Error(`Failed to update pricing offer card: ${error.message}`);
  }

  if (!data) {
    throw new Error('Failed to update pricing offer card: card not found or update not permitted');
  }

  return data;
}

export async function uploadPricingOfferCardImage(
  id: PricingOfferCardId,
  slot: 'hero' | 'inverter' | 'battery' | 'panels',
  file: File
): Promise<string> {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${slot}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
  const filePath = `offer-cards/${id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(filePath, file, { upsert: false });

  if (uploadError) {
    console.error('Error uploading offer card image:', uploadError);
    throw new Error(`Failed to upload offer card image: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('project-images').getPublicUrl(filePath);

  return publicUrl;
}

// =====================================================
// Questionnaire API
// =====================================================

export async function submitQuestionnaire(
  submission: QuestionnaireSubmissionInsert,
  image?: File
): Promise<void> {
  // 0. Upload image to Supabase Storage if provided
  let imageUrl: string | null = null;
  if (image) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `contact-uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, image);

    if (uploadError) {
      console.error('Error uploading questionnaire image:', uploadError);
    } else {
      const { data: urlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }
  }

  // 1. Save to database
  const { error } = await supabase
    .from('questionnaire_submissions')
    .insert(submission);

  if (error) {
    console.error('Error saving questionnaire submission:', error);
    throw new Error(`Failed to save questionnaire: ${error.message}`);
  }

  // 2. Send email via Supabase Edge Function → Resend (non-blocking)
  try {
    const fields = [
      { label: 'Име', value: submission.name },
      { label: 'Имейл', value: submission.email },
      { label: 'Телефон', value: submission.phone },
      { label: 'Вид мрежа', value: submission.grid_type },
      { label: 'Цел', value: submission.purpose },
      { label: 'Мощност', value: submission.power_needed },
      { label: 'Вид система', value: submission.system_type },
      { label: 'Вид монтаж', value: submission.mounting_type },
      { label: 'Етап строителство', value: submission.construction_stage },
      { label: 'Вид имот', value: submission.property_type },
      { label: 'Локация', value: submission.location },
    ];

    const filledFields = fields
      .filter((f) => f.value)
      .map((f) => `<tr><td style="padding:6px 12px;font-weight:600;color:#374151">${f.label}</td><td style="padding:6px 12px;color:#6b7280">${f.value}</td></tr>`)
      .join('');

    const imageSection = imageUrl
      ? `<div style="margin-top:16px">
          <p style="font-weight:600;color:#374151;margin-bottom:8px">Снимка на мястото:</p>
          <a href="${imageUrl}" target="_blank" style="color:#0d9488;text-decoration:underline">Виж снимката</a>
          <br/><img src="${imageUrl}" alt="Снимка от клиент" style="margin-top:8px;max-width:400px;border-radius:8px;border:1px solid #e5e7eb" />
        </div>`
      : '';

    const html = `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#0d9488">Ново запитване от сайта</h2>
        <table style="border-collapse:collapse;width:100%">
          ${filledFields}
        </table>
        ${imageSection}
        <p style="margin-top:20px;color:#9ca3af;font-size:13px">Изпратено от формата за запитване на NRGsolution.bg</p>
      </div>
    `;

    const { error: fnError } = await supabase.functions.invoke('send-email', {
      body: {
        to: ['savabarbarov96@gmail.com'],
        reply_to: submission.email,
        subject: `Ново запитване: ${submission.name} - ${submission.location || 'без локация'}`,
        html,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    });

    if (fnError) {
      console.error('Resend edge function error (questionnaire):', fnError);
    } else {
      console.log('Resend email sent OK (questionnaire)');
    }
  } catch (emailError) {
    console.error('Failed to send email notification (non-blocking):', emailError);
  }
}

// =====================================================
// Contact Form API
// =====================================================

export async function submitContactForm(data: {
  name: string;
  phone: string;
  city: string;
  type: string;
  message?: string;
}): Promise<void> {
  // Save to questionnaire_submissions with mostly null question fields
  const { error } = await supabase
    .from('questionnaire_submissions')
    .insert({
      name: data.name,
      email: `${data.phone}@contact-form.local`,
      phone: data.phone,
      location: data.city,
      property_type: data.type === 'home' ? 'Къща' : 'Бизнес обект',
      purpose: data.message || null,
    });

  if (error) {
    console.error('Error saving contact form submission:', error);
    throw new Error(`Failed to save contact form: ${error.message}`);
  }

  // Send email via Supabase Edge Function → Resend (non-blocking)
  try {
    const rows = [
      { label: 'Име', value: data.name },
      { label: 'Телефон', value: data.phone },
      { label: 'Град', value: data.city },
      { label: 'Вид обект', value: data.type === 'home' ? 'Дом' : 'Бизнес' },
      { label: 'Съобщение', value: data.message },
    ]
      .filter((f) => f.value)
      .map(
        (f) =>
          `<tr><td style="padding:6px 12px;font-weight:600;color:#374151">${f.label}</td><td style="padding:6px 12px;color:#6b7280">${f.value}</td></tr>`
      )
      .join('');

    const html = `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#0d9488">Ново съобщение от контактната форма</h2>
        <table style="border-collapse:collapse;width:100%">
          ${rows}
        </table>
        <p style="margin-top:20px;color:#9ca3af;font-size:13px">Изпратено от контактната форма на NRGsolution.bg</p>
      </div>
    `;

    const { error: fnError } = await supabase.functions.invoke('send-email', {
      body: {
        to: ['savabarbarov96@gmail.com'],
        subject: `Контактна форма: ${data.name} - ${data.city}`,
        html,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    });

    if (fnError) {
      console.error('Resend edge function error (contact):', fnError);
    } else {
      console.log('Resend email sent OK (contact)');
    }
  } catch (emailError) {
    console.error('Failed to send contact form email (non-blocking):', emailError);
  }
}
