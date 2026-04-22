import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProjectForm, ProjectFormData } from '@/components/admin/ProjectForm';
import { ProjectImageManager } from '@/components/admin/ProjectImageManager';
import { useProjectById, useUpdateProject } from '@/hooks/useProjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id || '0', 10);

  const { data: project, isLoading } = useProjectById(projectId);
  const updateMutation = useUpdateProject();

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      const updatedProject = await updateMutation.mutateAsync({ id: projectId, updates: data });
      toast.success('Project updated successfully');

      // If this project came from hardcoded fallback and got created in DB,
      // move to the actual DB id so image uploads/editing work correctly.
      if (updatedProject.id !== projectId) {
        navigate(`/admin/projects/${updatedProject.id}/edit`, { replace: true });
      }
    } catch (error) {
      toast.error('Failed to update project');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-6 max-w-3xl">
          <Skeleton className="h-10 w-64" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  if (!project) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/admin/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/admin/projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
            <p className="text-muted-foreground">{project.title}</p>
          </div>
        </div>

        {/* Project Details Form */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm
              initialData={project}
              onSubmit={handleSubmit}
              isSubmitting={updateMutation.isPending}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Image Manager */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectImageManager
              projectId={projectId}
              onProjectMaterialized={(newId) => {
                toast.success('Project synced to database — continuing under its new id.');
                navigate(`/admin/projects/${newId}/edit`, { replace: true });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
