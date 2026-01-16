import { Upload, Wand2, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    icon: Upload,
    title: 'Share your listing photos',
    description: 'Upload your property images through our simple platform or send them directly to us.',
  },
  {
    icon: Wand2,
    title: 'We virtually stage and enhance',
    description: 'Our team transforms key rooms with professional virtual staging and enhancements.',
  },
  {
    icon: TrendingUp,
    title: 'Attract more enquiries',
    description: 'Receive stunning photos within 24-48 hours and watch your listing engagement soar.',
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-24 px-6 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your listings from ordinary to extraordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-accent via-secondary/30 to-accent z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 transition-all duration-700 hover:-translate-y-2 z-10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-accent rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-2 bg-white rounded-full border border-accent/50 flex items-center justify-center shadow-sm z-10">
                    <div className="bg-gradient-to-br from-primary to-primary-glow text-white p-3.5 rounded-xl shadow-lg">
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md z-20 border-2 border-white">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">
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
