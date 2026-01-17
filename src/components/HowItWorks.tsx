import { Upload, Wand2, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    icon: Upload,
    title: 'Share your listing photos',
    description: 'Send your property images directly to us.',
  },
  {
    icon: Wand2,
    title: 'We virtually stage and enhance',
    description: 'Our team transforms key rooms with professional virtual staging and enhancements.',
  },
  {
    icon: TrendingUp,
    title: 'Attract more enquiries',
    description: 'Receive stunning photos within 24hrs and watch your listing engagement soar.',
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-white to-purple-50/20 relative">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your listings from ordinary to extraordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 transition-all duration-700 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6">
                  <div className={`text-white p-4 rounded-xl shadow-lg ${index === 0 ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600' :
                    index === 1 ? 'bg-gradient-to-br from-pink-500 via-pink-600 to-orange-500' :
                      'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600'
                    }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4
                  text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
