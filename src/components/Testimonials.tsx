import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        text: "StageWise transformed our listings! Properties that sat for months sold within weeks. The virtual staging looks incredibly realistic.",
        author: "Real Estate Agent",
        location: "Mumbai",
        rating: 5,
        delay: "0s"
    },
    {
        id: 2,
        text: "24-hour turnaround is a game changer. We can list properties faster and our clients love the professional presentation.",
        author: "Property Developer",
        location: "Bangalore",
        rating: 5,
        delay: "0.2s"
    },
    {
        id: 3,
        text: "The quality is outstanding. Buyers can finally visualize the potential of empty spaces. Our closing rate improved by 40%.",
        author: "Broker",
        location: "Delhi",
        rating: 5,
        delay: "0.4s"
    },
    {
        id: 4,
        text: "Best investment for our Airbnb business. Professional staging photos at a fraction of physical staging costs. Highly recommend!",
        author: "Airbnb Host",
        location: "Goa",
        rating: 5,
        delay: "0.6s"
    },
    {
        id: 5,
        text: "StageWise made our luxury properties stand out. The attention to detail and premium aesthetics are exactly what we needed.",
        author: "Luxury Real Estate Agent",
        location: "Hyderabad",
        rating: 5,
        delay: "0.8s"
    },
    {
        id: 6,
        text: "Quick, affordable, and professional. Virtual staging has become an essential part of our marketing strategy.",
        author: "Real Estate Agency",
        location: "Pune",
        rating: 5,
        delay: "1s"
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-purple-50/60 to-pink-50/60 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Real results from real estate professionals who trust StageWise
                    </p>
                </div>

                {/* Floating testimonial cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="group bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-purple-200/30 transform hover:-translate-y-2 transition-all duration-500 animate-float"
                            style={{
                                animationDelay: testimonial.delay,
                                animationDuration: '6s'
                            }}
                        >
                            {/* Star rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Testimonial text */}
                            <p className="text-foreground text-base leading-relaxed mb-6 italic">
                                "{testimonial.text}"
                            </p>

                            {/* Author info */}
                            <div className="pt-4 border-t border-purple-200/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">
                                            {testimonial.author.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}
