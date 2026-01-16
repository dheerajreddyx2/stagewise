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
    title: 'Upload better photos and attract enquiries',
    description: 'Receive stunning photos within 24-48 hours and watch your listing engagement soar.',
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three simple steps to transform your listings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`relative bg-slate-50 rounded-2xl p-8 transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <div className="mb-6 inline-flex p-4 bg-blue-100 rounded-xl">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
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
