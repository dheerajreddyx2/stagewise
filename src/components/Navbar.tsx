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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 sm:gap-1.5 group flex-shrink-0">
            <img src="/sw-logo.png" alt="Stagewise" className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] object-contain" />
            <span className="text-lg sm:text-2xl font-serif font-bold text-foreground tracking-tight">Stagewise</span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <button
              onClick={scrollToTransformations}
              className="hidden md:block text-base font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              Our Work
            </button>
            <button
              onClick={onGetDemoClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              Get Demo
            </button>
            <a
              href="/admin"
              className="p-2 sm:p-2.5 text-muted-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-accent/50 group relative flex-shrink-0"
              title="Admin Login"
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
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
