import { useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Zap, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/content/site-content';
import { useProjects } from '@/hooks/useProjects';

type ProjectFilter = 'all' | 'home' | 'business';

const typeFilters: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'Всички' },
  { value: 'home', label: 'Дом' },
  { value: 'business', label: 'Бизнес' },
];

function ProjectCard({ project }: { project: any }) {
  // Use a placeholder gradient if no image is available
  const hasImage = 'image' in project;

  return (
    <Link to={`/проекти/${project.slug}`} className="group overflow-hidden rounded-2xl border border-border/80 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        {hasImage ? (
          <img
            src={project.image}
            alt={`${project.title} - ${project.city}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />

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
          <p className="text-sm font-bold text-white">{project.title}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-white/85">
            <MapPin className="h-3.5 w-3.5" />
            {project.city}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">{project.summary}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary">
          Виж case study
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

const Projects = () => {
  const [typeFilter, setTypeFilter] = useState<ProjectFilter>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');

  const { data: projects, isLoading } = useProjects();

  const cityOptions = useMemo(() => {
    if (!projects) return ['all'];
    return ['all', ...Array.from(new Set(projects.map((p) => p.city)))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter((project) => {
      const typeMatch = typeFilter === 'all' || project.type === typeFilter;
      const cityMatch = cityFilter === 'all' || project.city === cityFilter;
      return typeMatch && cityMatch;
    });
  }, [projects, typeFilter, cityFilter]);

  return (
    <Layout>
      <section className="section-padding bg-[var(--gradient-hero)]">
        <div className="container-section">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Проекти / Портфолио</span>
            <h1 className="heading-display mt-5 text-foreground">Реални изпълнения</h1>
            <p className="text-body mt-5 text-lg">Лесно редактиране: добавете нов обект в `src/content/site-content.ts` и той ще се появи тук и в home teaser секцията.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-section">
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/80 bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Filter className="h-4 w-4 text-primary" />
              Филтрирай
            </div>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTypeFilter(option.value)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                    typeFilter === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="city-filter" className="font-semibold text-muted-foreground">Град:</label>
              <select
                id="city-filter"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground"
              >
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'Всички градове' : city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-border/80 bg-white">
                  <Skeleton className="aspect-[4/3]" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}

          <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h2 className="heading-card text-foreground">Вашият проект може да е следващият</h2>
            <p className="mt-2 text-muted-foreground">Обаждането е най-бързият начин за старт.</p>
            <Button variant="accent" size="lg" className="mt-5" asChild>
              <a href={siteConfig.phoneHref}>
                <Phone className="mr-2 h-5 w-5" />
                {siteConfig.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
