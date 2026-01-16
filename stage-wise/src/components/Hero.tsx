import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToTransformations = () => {
    document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Ready to Transform Your Listing?
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
            Stagewise helps real estate agents turn empty or dull listings into buyer-ready homes using virtual staging and visual enhancements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
              Get a Free Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToTransformations}
              className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-50 transition-all duration-200 border-2 border-slate-200 hover:border-slate-300"
            >
              View Before & After
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
