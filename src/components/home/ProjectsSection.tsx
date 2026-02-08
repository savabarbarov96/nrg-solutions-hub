import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectProps {
  image: string;
  city: string;
  power: string;
  type: 'home' | 'business';
}

function ProjectCard({ image, city, power, type }: ProjectProps) {
  return (
    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
      <img 
        src={image} 
        alt={`Соларна система ${power} в ${city}`} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/90 bg-primary/80 px-2.5 py-1 rounded-full">
            <Zap className="w-3 h-3" />
            {power}
          </span>
          <span className="text-xs font-medium text-primary-foreground/70 bg-foreground/30 px-2.5 py-1 rounded-full">
            {type === 'home' ? 'Дом' : 'Бизнес'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-primary-foreground">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">{city}</span>
        </div>
      </div>
    </div>
  );
}

// Placeholder projects - in production these would come from a CMS/database
const projects: ProjectProps[] = [
  { image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop', city: 'София', power: '12 kW', type: 'home' },
  { image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop', city: 'Пловдив', power: '15 kW', type: 'business' },
  { image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=600&fit=crop', city: 'Варна', power: '8 kW', type: 'home' },
  { image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=600&fit=crop', city: 'Бургас', power: '12 kW', type: 'home' },
  { image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&h=600&fit=crop', city: 'Стара Загора', power: '20 kW', type: 'business' },
  { image: 'https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=800&h=600&fit=crop', city: 'Русе', power: '10 kW', type: 'home' },
];

export function ProjectsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-section">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-sm font-semibold text-primary mb-3">ПОРТФОЛИО</span>
            <h2 className="heading-section text-foreground">
              Последни проекти
            </h2>
          </div>
          <Button variant="outline" asChild className="gap-2 self-start sm:self-auto">
            <Link to="/проекти">
              Виж всички
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
