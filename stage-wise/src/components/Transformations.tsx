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
      <section id="transformations" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-slate-600">Loading transformations...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="transformations" className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Sample Transformations
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how we turn empty spaces into inviting homes that buyers can't resist
          </p>
        </div>

        <div className="space-y-16">
          {transformations.map((transformation, index) => (
            <div
              key={transformation.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative group overflow-hidden">
                  <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold text-sm z-10">
                    Before
                  </div>
                  <img
                    src={transformation.before_image_url}
                    alt={`Before - ${transformation.title}`}
                    className="w-full h-full object-cover min-h-[300px] md:min-h-[500px] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="relative group overflow-hidden">
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm z-10">
                    After
                  </div>
                  <img
                    src={transformation.after_image_url}
                    alt={`After - ${transformation.title}`}
                    className="w-full h-full object-cover min-h-[300px] md:min-h-[500px] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold text-slate-900">{transformation.title}</h3>
                <p className="text-slate-600 mt-1">{transformation.room_type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
