import { useEffect, useRef, useState } from 'react';

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

function Stat({ end, label, suffix = '', prefix = '', delay = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div
      ref={ref}
      className="text-center p-8 rounded-3xl bg-white border border-accent/50 shadow-sm hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-5xl md:text-6xl font-bold font-serif text-primary mb-3 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-glow">
        {prefix}{count}{suffix}
      </div>
      <div className="text-lg font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-8 px-6 relative bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <Stat end={120} label="Photos Transformed" suffix="+" delay={0} />
          <Stat end={24} label="Delivery Time" suffix=" hrs" delay={150} />
          <Stat end={300} label="Better Visual Appeal" suffix="%" delay={300} />
        </div>
      </div>
    </section>
  );
}
