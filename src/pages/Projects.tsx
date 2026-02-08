import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Phone, MapPin, Zap, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ProjectType = 'all' | 'home' | 'business';

interface Project {
  id: number;
  image: string;
  city: string;
  power: string;
  type: 'home' | 'business';
  description: string;
}

// Placeholder projects - in production these would come from a CMS/database
const projects: Project[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop', city: 'София', power: '12 kW', type: 'home', description: 'Покривна инсталация на еднофамилна къща с южно изложение.' },
  { id: 2, image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop', city: 'Пловдив', power: '15 kW', type: 'business', description: 'Складова база с покривен монтаж и оптимизирана конструкция.' },
  { id: 3, image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop', city: 'Варна', power: '8 kW', type: 'home', description: 'Вила край морето с интегрирана система за съхранение.' },
  { id: 4, image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=600&fit=crop', city: 'Бургас', power: '12 kW', type: 'home', description: 'Къща с голям двор и наземен монтаж на панелите.' },
  { id: 5, image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&h=600&fit=crop', city: 'Стара Загора', power: '20 kW', type: 'business', description: 'Производствено предприятие с голяма консумация.' },
  { id: 6, image: 'https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=800&h=600&fit=crop', city: 'Русе', power: '10 kW', type: 'home', description: 'Модерна къща с интелигентно управление на енергията.' },
  { id: 7, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop', city: 'Плевен', power: '15 kW', type: 'home', description: 'Голям дом с висока консумация и климатични системи.' },
  { id: 8, image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop', city: 'Велико Търново', power: '25 kW', type: 'business', description: 'Хотел с комбинирана система за отопление и ток.' },
  { id: 9, image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop', city: 'Благоевград', power: '8 kW', type: 'home', description: 'Къща в планината с адаптирана конструкция.' },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group card-elevated overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={project.image} 
          alt={`Соларна система ${project.power} в ${project.city}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/90 bg-primary/80 px-2.5 py-1 rounded-full">
              <Zap className="w-3 h-3" />
              {project.power}
            </span>
            <span className="text-xs font-medium text-primary-foreground/70 bg-foreground/30 px-2.5 py-1 rounded-full">
              {project.type === 'home' ? 'Дом' : 'Бизнес'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-primary-foreground">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{project.city}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>
    </div>
  );
}

const Projects = () => {
  const [filter, setFilter] = useState<ProjectType>('all');

  const filteredProjects = projects.filter(
    (project) => filter === 'all' || project.type === filter
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-muted/50 to-background">
        <div className="container-section">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sm font-semibold text-primary mb-4">ПОРТФОЛИО</span>
            <h1 className="heading-display text-foreground mb-6">
              Нашите проекти
            </h1>
            <p className="text-body text-lg">
              Примери от монтирани системи в цяла България — за домове и бизнес клиенти.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-background">
        <div className="container-section">
          {/* Filter */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Всички' },
                { value: 'home', label: 'Домове' },
                { value: 'business', label: 'Бизнес' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as ProjectType)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    filter === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Искате вашият проект да е следващият?
            </p>
            <Button variant="accent" size="lg" asChild>
              <a href="tel:+359888123456">
                <Phone className="w-5 h-5 mr-2" />
                Обади се за оферта
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
