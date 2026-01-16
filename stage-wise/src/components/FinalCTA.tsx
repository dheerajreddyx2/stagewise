import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          See how your property could look in 24 hours
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Join hundreds of successful agents who trust Stagewise to make their listings shine.
        </p>
        <button className="bg-white text-slate-900 px-10 py-5 rounded-lg font-bold text-lg hover:bg-slate-50 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 inline-flex items-center gap-3">
          Get Started Today
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
