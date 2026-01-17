import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Transformation } from '../lib/database.types';

export default function Transformations() {
  const [showAll, setShowAll] = useState(false);
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchTransformations();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  async function fetchTransformations() {
    try {
      const { data, error } = await supabase
        .from('transformations')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTransformations(data || []);
    } catch (error) {
      console.error('Error fetching transformations:', error);
    } finally {
      setLoading(false);
    }
  }

  const displayedTransformations = showAll ? transformations : transformations.slice(0, 2);

  return (
    <section id="transformations" className="py-16 px-6 bg-gradient-to-br from-purple-50/40 to-pink-50/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Transformation Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Witness the magic. See how we turn empty, lifeless spaces into warm, inviting homes that buyers can't resist.
          </p>
        </div>

        <div className="space-y-20">
          {displayedTransformations.map((transformation, index) => {
            const isVisible = visibleCards.has(transformation.id);
            return (
              <div
                key={transformation.id}
                id={transformation.id}
                ref={(node) => {
                  if (node && observerRef.current) {
                    observerRef.current.observe(node);
                  }
                }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-elegant overflow-hidden transform transition-all duration-500 hover:shadow-2xl border border-purple-200/30"
              >
                <div className="grid md:grid-cols-2 gap-0 relative">
                  {/* Before Image */}
                  <div
                    className={`relative group overflow-hidden h-[350px] md:h-[500px] transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                      }`}
                  >
                    <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md text-white px-5 py-2 rounded-full font-medium text-sm z-10 border border-white/10">
                      Before
                    </div>
                    <img
                      src={transformation.before_image_url}
                      alt={`Before - ${transformation.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>

                  {/* After Image */}
                  <div
                    className={`relative group overflow-hidden h-[350px] md:h-[500px] transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                      }`}
                  >
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-md text-white px-5 py-2 rounded-full font-medium text-sm z-10 border border-white/20 shadow-lg">
                      After
                    </div>
                    <img
                      src={transformation.after_image_url}
                      alt={`After - ${transformation.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay for better text visibility if needed, or just shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-r from-purple-50/50 to-pink-50/50 backdrop-blur-sm border-t border-purple-200/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold font-serif text-foreground">{transformation.title}</h3>
                      <p className="text-muted-foreground mt-1 font-medium text-sm tracking-wide uppercase">{transformation.room_type}</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-serif italic text-lg font-bold">Staged in 24h</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        {transformations.length > 2 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <span>{showAll ? 'Show Less' : 'View More Transformations'}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section >
  );
}
