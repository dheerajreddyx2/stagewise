import { Home, Building2, Key } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const audiences = [
  {
    icon: Home,
    title: 'Real Estate Agents',
    description: 'Stand out with professionally staged listings that sell faster and at better prices.',
  },
  {
    icon: Building2,
    title: 'Builders & Developers',
    description: 'Showcase your projects at their full potential before construction is complete.',
  },
  {
    icon: Key,
    title: 'Airbnb & Serviced Apartments',
    description: 'Create compelling visuals that drive more bookings and higher occupancy rates.',
  },
];

export default function WhoItsFor() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-24 px-6 bg-accent/20">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Who It's For
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Perfect for professionals who want their properties to make a lasting impression
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-3xl p-10 transition-all duration-700 hover:shadow-elegant hover:-translate-y-2 border border-border/50 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-8 inline-flex p-4 bg-accent/30 rounded-2xl group-hover:bg-primary/10 transition-colors duration-300">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {audience.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
