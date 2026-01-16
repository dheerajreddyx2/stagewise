import { Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-slate-300 py-16 px-6 relative overflow-hidden">
       {/* Subtle mesh for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-6 tracking-tight">Stagewise</h3>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Premium virtual staging and visual enhancement services for real estate professionals who demand the best.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm opacity-80">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="mailto:hello@stagewise.in"
                className="flex items-center gap-3 text-slate-400 hover:text-secondary transition-colors duration-300 group"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-secondary/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>hello@stagewise.in</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-green-400 transition-colors duration-300 group"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-green-400/10 transition-colors">
                   <MessageCircle className="w-5 h-5" />
                </div>
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>

          <div>
             <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm opacity-80">Location</h4>
            <div className="flex items-start gap-3 text-slate-400">
               <div className="p-2 bg-white/5 rounded-lg">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
               </div>
              <span>India</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Stagewise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
