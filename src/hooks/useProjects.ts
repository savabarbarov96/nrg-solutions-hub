import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjects,
  getProjectBySlug,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectImages,
  uploadProjectImage,
  deleteProjectImage,
  reorderProjectImages,
  updateImageRotation,
  reorderProjects,
} from '@/services/api';
import type { ProjectInsert, ProjectUpdate } from '@/types/database';
import { projects as fallbackProjects } from '@/content/site-content';

// =====================================================
// Query Keys
// =====================================================
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (type?: 'home' | 'business') => [...projectKeys.lists(), { type }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (slug: string) => [...projectKeys.details(), slug] as const,
  detailById: (id: number) => [...projectKeys.details(), id] as const,
  images: (projectId: number) => [...projectKeys.all, 'images', projectId] as const,
};

// =====================================================
// Projects Queries
// =====================================================

export function useProjects(type?: 'home' | 'business') {
  return useQuery({
    queryKey: projectKeys.list(type),
    queryFn: () => getProjects(type),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    // Fallback to static data on error
    placeholderData: type
      ? fallbackProjects.filter((p) => p.type === type)
      : fallbackProjects,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: projectKeys.detail(slug),
    queryFn: () => getProjectBySlug(slug),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!slug,
    // Fallback to static data on error
    placeholderData: fallbackProjects.find((p) => p.slug === slug) || null,
  });
}

export function useProjectById(id: number) {
  return useQuery({
    queryKey: projectKeys.detailById(id),
    queryFn: () => getProjectById(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!id,
  });
}

export function useProjectImages(projectId: number | undefined) {
  return useQuery({
    queryKey: projectKeys.images(projectId!),
    queryFn: () => getProjectImages(projectId!),
    staleTime: 5 * 60 * 1000,
    enabled: !!projectId,
  });
}

// =====================================================
// Projects Mutations
// =====================================================

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: ProjectInsert) => createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: ProjectUpdate }) =>
      updateProject(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(data.slug) });
      queryClient.invalidateQueries({ queryKey: projectKeys.detailById(data.id) });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useReorderProjects() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderedProjects: { id: number; slug: string; display_order: number }[]) =>
      reorderProjects(orderedProjects),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

// =====================================================
// Project Images Mutations
// =====================================================

export function useUploadProjectImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      file,
      displayOrder,
    }: {
      projectId: number;
      file: File;
      displayOrder?: number;
    }) => uploadProjectImage(projectId, file, displayOrder),
    onSuccess: (result, { projectId }) => {
      // Invalidate images for both the requested id and the resolved DB id
      // (they differ when a static project was just materialised in DB).
      queryClient.invalidateQueries({ queryKey: projectKeys.images(projectId) });
      if (result.resolved_project_id && result.resolved_project_id !== projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.images(result.resolved_project_id) });
        queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      }
    },
  });
}

export function useDeleteProjectImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageId, projectId }: { imageId: number; projectId: number }) =>
      deleteProjectImage(imageId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.images(projectId) });
    },
  });
}

export function useReorderProjectImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      updates,
    }: {
      projectId: number;
      updates: { id: number; display_order: number }[];
    }) => reorderProjectImages(updates),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.images(projectId) });
    },
  });
}

export function useUpdateImageRotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      imageId,
      rotation,
      projectId,
      imageUrl,
    }: {
      imageId: number;
      rotation: number;
      projectId: number;
      imageUrl?: string;
    }) => updateImageRotation(imageId, rotation, { projectId, imageUrl }),
    onSuccess: (result, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.images(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      if (result?.resolved_project_id && result.resolved_project_id !== projectId) {
        queryClient.invalidateQueries({ queryKey: projectKeys.images(result.resolved_project_id) });
      }
    },
  });
}
