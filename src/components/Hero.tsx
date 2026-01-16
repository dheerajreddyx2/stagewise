import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToTransformations = () => {
    document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-60"></div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-accent mb-8 animate-fade-in shadow-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-primary">Premium Virtual Staging Services</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground tracking-tight leading-[1.1] mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Transform Listings into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-glow to-secondary">Dream Homes</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We turn empty spaces into buyer-ready masterpieces. Increase engagement and sell faster with our cinematic virtual staging.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button className="group bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-elegant hover:shadow-xl hover:-translate-y-1 flex items-center gap-3">
              Get a Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToTransformations}
              className="px-8 py-4 rounded-xl font-semibold text-lg text-foreground bg-white/50 hover:bg-white transition-all duration-300 border border-border hover:border-primary/30 shadow-sm hover:shadow-md backdrop-blur-sm"
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
