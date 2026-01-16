import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Transformation } from '../lib/database.types';

export default function Transformations() {
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransformations();
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

  if (loading) {
    return (
      <section id="transformations" className="py-24 px-6 bg-accent/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-muted-foreground animate-pulse">Loading gallery...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="transformations" className="py-24 px-6 bg-accent/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Transformation Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Witness the magic. See how we turn empty, lifeless spaces into warm, inviting homes that buyers can't resist.
          </p>
        </div>

        <div className="space-y-20">
          {transformations.map((transformation, index) => (
            <div
              key={transformation.id}
              className="bg-white rounded-3xl shadow-elegant overflow-hidden transform transition-all duration-500 hover:shadow-2xl border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-0 relative">
                {/* Before Image */}
                <div className="relative group overflow-hidden h-[350px] md:h-[500px]">
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
                <div className="relative group overflow-hidden h-[350px] md:h-[500px]">
                  <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-md text-white px-5 py-2 rounded-full font-medium text-sm z-10 border border-white/20 shadow-lg">
                    After
                  </div>
                  <img
                    src={transformation.after_image_url}
                    alt={`After - ${transformation.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay for better text visibility if needed, or just shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              <div className="p-8 bg-white/80 backdrop-blur-sm border-t border-accent">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-foreground">{transformation.title}</h3>
                    <p className="text-muted-foreground mt-1 font-medium text-sm tracking-wide uppercase">{transformation.room_type}</p>
                  </div>
                  <div className="hidden md:block">
                     <span className="text-secondary font-serif italic text-lg">Staged in 24h</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
