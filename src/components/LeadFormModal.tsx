import { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        mobile_number: '',
        city: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('leads')
                .insert([{ ...formData, status: 'new' }]);

            if (error) throw error;

            setSubmitStatus('success');
            setFormData({ name: '', mobile_number: '', city: '' });
        } catch (error: any) {
            console.error('Error submitting lead:', error);
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden transform transition-all flex flex-col">
                {/* Header - Compact */}
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white flex-shrink-0 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-full transition-colors z-20"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-3xl font-serif font-bold">Get a Free Demo</h2>
                    <p className="text-white/95 mt-2 text-base">Transform your listings with virtual staging</p>
                </div>

                {/* Form - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1">
                    {submitStatus === 'success' ? (
                        <div className="text-center py-6 animate-fade-in relative overflow-hidden">
                            {/* Confetti Animation - confined to this div */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {[...Array(30)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute animate-confetti"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: '-10px',
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: ['#9333EA', '#EC4899', '#F472B6', '#C084FC', '#FBBF24'][i % 5],
                                            opacity: 0.8,
                                            animationDelay: `${Math.random() * 0.3}s`,
                                            animationDuration: `${2 + Math.random() * 1}s`,
                                            transform: `rotate(${Math.random() * 360}deg)`,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full mb-3 relative">
                                <div className="absolute inset-0 bg-purple-400/20 rounded-full animate-ping"></div>
                                <CheckCircle2 className="w-8 h-8 text-purple-600 animate-scale-in relative z-10" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1.5">Thank You!</h3>
                            <p className="text-muted-foreground text-sm mb-1">Your request has been received.</p>
                            <p className="text-xs text-purple-600 font-medium">We'll reach out within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1.5">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-purple-50/30 transition-all text-base"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="mobile" className="block text-sm font-semibold text-foreground mb-1.5">
                                    Mobile / WhatsApp Number *
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    required
                                    value={formData.mobile_number}
                                    onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-purple-50/30 transition-all text-base"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-semibold text-foreground mb-1.5">
                                    City *
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-purple-50/30 transition-all text-base"
                                    placeholder="Mumbai"
                                />
                            </div>

                            {submitStatus === 'error' && (
                                <div className="flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-lg">
                                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-red-800">{errorMessage}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3.5 rounded-lg font-semibold text-base hover:shadow-lg hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Request
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
