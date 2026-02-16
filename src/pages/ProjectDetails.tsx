import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Zap, CheckCircle2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { siteConfig } from '@/content/site-content';
import { useProject, useProjectImages } from '@/hooks/useProjects';
import { ProjectImageGallery } from '@/components/ProjectImageGallery';

const ProjectDetails = () => {
  const { slug } = useParams();
  const { data: project, isLoading } = useProject(slug || '');
  const staticImages = project?.static_images || [];
  const shouldFetchDbImages = staticImages.length === 0;
  const { data: images } = useProjectImages(shouldFetchDbImages ? project?.id : undefined);
  const galleryImages = staticImages.length > 0 ? staticImages : images || [];
  const integrationName = project?.integration_name || 'Интеграция и мониторинг';
  const integrationNote = project?.integration_note || project?.solis_note || '';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding bg-background">
          <div className="container-section">
            <Skeleton className="h-6 w-48 mb-6" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <Skeleton className="aspect-[16/10] rounded-3xl" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-48 rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!project) {
    return <Navigate to="/проекти" replace />;
  }

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-section">
          <Link to="/проекти" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Назад към проекти
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="space-y-6">
              {/* Image Gallery */}
              <div className="overflow-hidden rounded-3xl">
                {galleryImages.length > 0 ? (
                  <ProjectImageGallery images={galleryImages} />
                ) : (
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-3xl" />
                )}
              </div>

              {/* Project Info Card */}
              <div className="overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                      <Zap className="h-3.5 w-3.5" />
                      {project.power}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.city}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold">
                      {project.type === 'home' ? 'Дом' : 'Бизнес'}
                    </span>
                  </div>

                  <h1 className="heading-section text-foreground">{project.title}</h1>
                  <p className="mt-4 text-body">{project.summary}</p>

                  <h2 className="mt-8 text-lg font-bold text-foreground">Какво е направено</h2>
                  <ul className="mt-3 space-y-2.5">
                    {project.completed_scope.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {integrationNote && (
                    <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                      <p className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-foreground">
                        <Smartphone className="h-4 w-4 text-primary" />
                        {integrationName}
                      </p>
                      <p className="text-sm text-muted-foreground">{integrationNote}</p>
                    </div>
                  )}
                </div>
              </div>
            </article>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft">
                <h2 className="text-lg font-bold text-foreground">Обсъдете подобен проект</h2>
                <p className="mt-2 text-sm text-muted-foreground">По телефон ще получите най-бързата ориентировъчна оферта.</p>
                <Button variant="accent" className="mt-5 w-full" asChild>
                  <a href={siteConfig.phoneHref}>
                    <Phone className="mr-2 h-4 w-4" />
                    {siteConfig.phoneDisplay}
                  </a>
                </Button>
              </div>

              <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft">
                <h3 className="font-bold text-foreground">Планиране и изпълнение</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Всеки обект минава през оглед, техническа оценка и детайлно оразмеряване,
                  за да се гарантира надеждна работа и реалистична възвръщаемост.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetails;
