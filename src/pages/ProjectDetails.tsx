import { Layout } from '@/components/layout/Layout';
import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Zap, CheckCircle2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects, siteConfig } from '@/content/site-content';

const ProjectDetails = () => {
  const { slug } = useParams();

  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug]);

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
            <article className="overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 font-semibold text-primary-foreground">
                    <Zap className="h-3.5 w-3.5" />
                    {project.power}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2.5 py-1 font-semibold text-white">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.city}
                  </span>
                  <span className="rounded-full bg-white/25 px-2.5 py-1 font-semibold text-white">
                    {project.type === 'home' ? 'Дом' : 'Бизнес'}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h1 className="heading-section text-foreground">{project.title}</h1>
                <p className="mt-4 text-body">{project.summary}</p>

                <h2 className="mt-8 text-lg font-bold text-foreground">Какво е направено</h2>
                <ul className="mt-3 space-y-2.5">
                  {project.completedScope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <p className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-foreground">
                    <Smartphone className="h-4 w-4 text-primary" />
                    Solis интеграция
                  </p>
                  <p className="text-sm text-muted-foreground">{project.solisNote}</p>
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
                <h3 className="font-bold text-foreground">Безплатен оглед</h3>
                <p className="mt-2 text-sm text-muted-foreground">Втори приоритетен CTA: заявка за оглед с кратка форма.</p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link to="/контакти#оглед">Заяви безплатен оглед</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetails;
