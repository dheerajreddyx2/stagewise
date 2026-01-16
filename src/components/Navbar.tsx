import { Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 glass border-b border-white/20"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-primary to-primary-glow p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-foreground tracking-tight">Stagewise</span>
          </a>
          <a
            href="/admin"
            className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-accent/50"
          >
            Admin Access
          </a>
        </div>
      </div>
    </nav>
  );
}
