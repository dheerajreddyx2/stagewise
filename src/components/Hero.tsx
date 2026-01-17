import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import LeadFormModal from './LeadFormModal';
import ShinyText from './ShinyText';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTransformations = () => {
    document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative pt-28 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-60"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-accent mb-6 animate-fade-in shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-primary">Premium Virtual Staging Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <ShinyText
                text="Transform Listings into"
                disabled={false}
                speed={3}
                color="#1e293b"
                shineColor="#ffffff"
                className="block"
              />
              <ShinyText
                text="Dream Homes"
                disabled={false}
                speed={3}
                gradient="linear-gradient(to right, #9333ea, #db2777)" // Purple to Pink hex codes
                shineColor="#ffffff"
                className="block"
              />
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We turn empty spaces into buyer-ready masterpieces. Increase engagement and sell faster with our cinematic virtual staging.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-elegant flex items-center gap-3"
              >
                Get a Free Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToTransformations}
                className="px-8 py-4 rounded-xl font-semibold text-lg text-foreground bg-white/50 hover:bg-white transition-all duration-300 border border-border hover:border-primary/30 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                See Our Work
              </button>
            </div>
          </div >
        </div >
      </section >

      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
