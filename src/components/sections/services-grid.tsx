import { ServiceCard } from './service-card';
import { SectionHeader } from '@/components/ui/section-header';
import { EmptyState } from '@/components/ui/empty-state';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
}

interface ServicesGridProps {
  services: Service[];
  title: string;
  subtitle: string;
}

export function ServicesGrid({ services, title, subtitle }: ServicesGridProps) {
  if (services.length === 0) {
    return <EmptyState title="No services available" message="Check back soon for our service offerings." />;
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
