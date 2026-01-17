import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Transformation } from '../lib/database.types';
import LeadFormModal from '../components/LeadFormModal';

interface GalleryProps {
    onGetDemoClick?: () => void;
}

export default function Gallery({ onGetDemoClick }: GalleryProps) {
    const navigate = useNavigate();
    const [transformations, setTransformations] = useState<Transformation[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        fetchTransformations();
        window.scrollTo(0, 0);
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
            { threshold: 0.1 }
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

    const handleGetDemoClick = () => {
        if (onGetDemoClick) {
            onGetDemoClick();
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50/40 to-pink-50/40">
            {/* Back Button - Fixed position top left */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md text-purple-600 font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 border border-purple-200/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </div>

            {/* Transformations Grid */}
            <section className="pt-24 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center text-muted-foreground animate-pulse py-20">
                            Loading transformations...
                        </div>
                    ) : transformations.length === 0 ? (
                        <div className="text-center text-muted-foreground py-20">
                            No transformations available at the moment.
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {transformations.map((transformation) => {
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
                                        className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-elegant overflow-hidden transform transition-all duration-700 hover:shadow-2xl border border-purple-200/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                    >
                                        <div className="grid grid-cols-2 gap-0 relative">
                                            {/* Before Image */}
                                            <div className="relative group overflow-hidden h-[200px] md:h-[300px]">
                                                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-medium text-xs z-10 border border-white/10">
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
                                            <div className="relative group overflow-hidden h-[200px] md:h-[300px]">
                                                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-medium text-xs z-10 border border-white/20 shadow-lg">
                                                    After
                                                </div>
                                                <img
                                                    src={transformation.after_image_url}
                                                    alt={`After - ${transformation.title}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 backdrop-blur-sm border-t border-purple-200/30">
                                            <h3 className="text-xl font-bold font-serif text-foreground">{transformation.title}</h3>
                                            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mt-1">
                                                {transformation.room_type}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Get a Demo CTA - Only shown after all transformations */}
                    {!loading && transformations.length > 0 && (
                        <div className="text-center mt-16">
                            <button
                                onClick={handleGetDemoClick}
                                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                Get a Demo
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
