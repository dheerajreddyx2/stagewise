import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LeadFormModal from './LeadFormModal';

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30 mix-blend-overlay"></div>

        {/* Decorative circles */}
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            See how your property could look in 24 hours
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of successful agents who trust Stagewise to make their listings shine.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-purple-700 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-glow transform hover:-translate-y-1 inline-flex items-center gap-3"
          >
            Get a Free Demo
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
