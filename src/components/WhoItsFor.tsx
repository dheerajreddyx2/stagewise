import { Home, Building2, Key } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const audiences = [
  {
    icon: Home,
    title: 'Real Estate Agents',
    description: 'Stand out with professionally staged listings that sell faster and at better prices.',
    gradient: 'from-purple-500 to-purple-700',
    bgGradient: 'bg-gradient-to-br from-purple-100 to-purple-200',
  },
  {
    icon: Building2,
    title: 'Builders & Developers',
    description: 'Showcase your projects at their full potential before construction is complete.',
    gradient: 'from-pink-500 to-pink-700',
    bgGradient: 'bg-gradient-to-br from-pink-100 to-pink-200',
  },
  {
    icon: Key,
    title: 'Airbnb & Serviced Apartments',
    description: 'Create compelling visuals that drive more bookings and higher occupancy rates.',
    gradient: 'from-blue-500 to-blue-700',
    bgGradient: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
];

export default function WhoItsFor() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-purple-50/30 to-pink-50/30">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                className={`bg-white rounded-3xl p-10 transition-all duration-700 hover:shadow-elegant hover:-translate-y-2 border border-border/50 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`mb-8 inline-flex p-5 ${audience.bgGradient} rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <Icon className={`w-12 h-12 text-${audience.gradient.split(' ')[0].replace('from-', '')}`} strokeWidth={2.5} />
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
