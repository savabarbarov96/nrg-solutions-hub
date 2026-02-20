import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useProjects } from '@/hooks/useProjects';

function ProjectCard({ project }: { project: any }) {
  const hasImage = 'image' in project;

  return (
    <Link
      to={`/проекти/${project.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border/70"
    >
      {hasImage ? (
        <img
          src={project.image}
          alt={`${project.title} ${project.power} в ${project.city}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={project.image_rotation ? { transform: `rotate(${project.image_rotation}deg)` } : undefined}
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/85 px-2.5 py-1 font-semibold text-primary-foreground">
            <Zap className="h-3.5 w-3.5" />
            {project.power}
          </span>
          <span className="rounded-full bg-white/20 px-2.5 py-1 font-semibold text-white">
            {project.type === 'home' ? 'Дом' : 'Бизнес'}
          </span>
        </div>
        <p className="mb-1 text-sm font-bold text-white">{project.title}</p>
        <p className="inline-flex items-center gap-1 text-xs text-white/85">
          <MapPin className="h-3.5 w-3.5" />
          {project.city}
        </p>
      </div>
    </Link>
  );
}

export function ProjectsSection() {
  const { data: projects, isLoading } = useProjects();
  const featured = projects?.slice(0, 6) || [];

  return (
    <section className="section-padding bg-background">
      <div className="container-section">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-eyebrow">Последни проекти</span>
            <h2 className="heading-section mt-5 text-foreground">Реални изпълнения в цяла България</h2>
          </div>
          <Button variant="outline" asChild className="gap-2 self-start sm:self-auto">
            <Link to="/проекти">
              Виж всички проекти
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
