import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30 mix-blend-overlay"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
          See how your property could look in 24 hours
        </h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of successful agents who trust Stagewise to make their listings shine.
        </p>
        <button className="bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-secondary hover:text-white transition-all duration-300 shadow-2xl hover:shadow-glow transform hover:-translate-y-1 inline-flex items-center gap-3">
          Get Started Today
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
