import { Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Stagewise</span>
          </a>
          <a
            href="/admin"
            className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm font-medium"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
}
