import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useProjects, useDeleteProject, useReorderProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2, ExternalLink, GripVertical, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ProjectsList() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'home' | 'business'>('all');
  const [projectToDelete, setProjectToDelete] = useState<{ id: number; title: string } | null>(null);
  const [localProjects, setLocalProjects] = useState<any[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const { data: projects, isLoading } = useProjects(typeFilter === 'all' ? undefined : typeFilter);
  const deleteMutation = useDeleteProject();
  const reorderMutation = useReorderProjects();

  // Keep local list in sync when server data changes
  useEffect(() => {
    if (projects) setLocalProjects(projects);
  }, [projects]);

  /* ── Delete ── */
  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteMutation.mutateAsync(projectToDelete.id);
      toast.success('Project deleted');
      setProjectToDelete(null);
    } catch {
      toast.error('Failed to delete project');
    }
  };

  /* ── Drag handlers ── */
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (index !== dragOverIndex) setDragOverIndex(index);
  };

  const applyReorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= localProjects.length || toIndex >= localProjects.length) return;
    if (reorderMutation.isPending) return;

    const reordered = [...localProjects];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setLocalProjects(reordered);

    const ordered = reordered.map((p, i) => ({
      id: p.id,
      slug: p.slug,
      display_order: i,
    }));

    reorderMutation.mutate(ordered, {
      onSuccess: () => toast.success('Order saved'),
      onError: (err) => {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        toast.error(`Failed to save order: ${msg}`, { duration: 10000 });
        console.error('Reorder error:', err);
        if (projects) setLocalProjects(projects); // revert
      },
    });
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null) applyReorder(draggedIndex, dropIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Drag rows on desktop, or use ↑/↓ arrows on mobile · changes save automatically
            </p>
          </div>
          <Link to="/admin/projects/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select value={typeFilter} onValueChange={(v: any) => setTypeFilter(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>

          {reorderMutation.isPending && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving order…
            </span>
          )}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : localProjects.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]" />
                  <TableHead className="w-[36px] text-center text-xs text-muted-foreground">#</TableHead>
                  <TableHead className="w-[72px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">City</TableHead>
                  <TableHead className="hidden sm:table-cell">Power</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localProjects.map((project, index) => {
                  const isDragging = draggedIndex === index;
                  const isOver = dragOverIndex === index && draggedIndex !== index;

                  return (
                    <TableRow
                      key={project.slug}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        'transition-colors duration-150 select-none',
                        isDragging && 'opacity-40 bg-muted',
                        isOver && 'border-t-2 border-primary bg-primary/5',
                      )}
                    >
                      {/* Drag handle + mobile up/down buttons */}
                      <TableCell className="pr-0">
                        <div className="flex items-center gap-1">
                          <div
                            className={cn(
                              'hidden sm:flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground transition-colors',
                              reorderMutation.isPending ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing',
                            )}
                            title="Drag to reorder"
                          >
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col sm:hidden">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              disabled={index === 0 || reorderMutation.isPending}
                              onClick={() => applyReorder(index, index - 1)}
                              aria-label="Move up"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              disabled={index === localProjects.length - 1 || reorderMutation.isPending}
                              onClick={() => applyReorder(index, index + 1)}
                              aria-label="Move down"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>

                      {/* Position badge */}
                      <TableCell className="text-center">
                        <span className="text-xs font-mono text-muted-foreground">{index + 1}</span>
                      </TableCell>

                      {/* Thumbnail */}
                      <TableCell>
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover"
                              draggable={false}
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">{project.title}</TableCell>

                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {project.city}
                      </TableCell>

                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {project.power}
                      </TableCell>

                      <TableCell>
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                            project.type === 'home'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700',
                          )}
                        >
                          {project.type === 'home' ? 'Home' : 'Business'}
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/проекти/${project.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/admin/projects/${project.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setProjectToDelete({ id: project.id, title: project.title })}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-muted-foreground">No projects found</p>
            <Link to="/admin/projects/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Project
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Delete dialog */}
      <AlertDialog open={projectToDelete !== null} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{projectToDelete?.title}"? This will also delete all
              associated images. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
