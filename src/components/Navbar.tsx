import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface NavbarProps {
  onGetDemoClick?: () => void;
}

export default function Navbar({ onGetDemoClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTransformations = () => {
    document.getElementById('transformations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
      <div className={`absolute inset-0 transition-all duration-300 border-b ${isScrolled
        ? 'backdrop-blur-xl bg-white/30 border-purple-200/20 shadow-lg'
        : 'backdrop-blur-md bg-white/20 border-white/10'
        }`}></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1.5 group">
            <img src="/sw-logo.png" alt="Stagewise" className="w-[70px] h-[70px] object-contain" />
            <span className="text-2xl font-serif font-bold text-foreground tracking-tight">Stagewise</span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={scrollToTransformations}
              className="text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              Our Work
            </button>
            <button
              onClick={onGetDemoClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Demo
            </button>
            <a
              href="/admin"
              className="p-2.5 text-muted-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-accent/50 group relative"
              title="Admin Login"
            >
              <Lock className="w-5 h-5" />
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-800/95 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                Admin Login
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
