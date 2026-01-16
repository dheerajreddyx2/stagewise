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
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Who It's For
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Perfect for professionals who want their properties to make a lasting impression
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 border border-slate-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 inline-flex p-4 bg-slate-900 rounded-xl">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {audience.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
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
