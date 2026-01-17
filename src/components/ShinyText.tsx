
import { motion } from 'framer-motion';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    delay?: number;
    color?: string;
    gradient?: string;
    shineColor?: string;
    spread?: number;
    direction?: 'left' | 'right';
    yoyo?: boolean;
    pauseOnHover?: boolean;
    className?: string;
}

export default function ShinyText({
    text,
    disabled = false,
    speed = 2,
    delay = 0,
    color = '#b5b5b5',
    gradient,
    shineColor = '#ffffff',
    spread = 120,
    direction = 'left',
    yoyo = false,
    pauseOnHover = false,
    className = '',
}: ShinyTextProps) {
    const shineLayer = `linear-gradient(
        120deg,
        transparent 40%,
        ${shineColor} 50%,
        transparent 60%
    )`;

    const baseLayer = gradient || `linear-gradient(${color}, ${color})`;

    const backgroundImage = gradient
        ? `${shineLayer}, ${baseLayer}`
        : `linear-gradient(120deg, ${color} 40%, ${shineColor} 50%, ${color} 60%)`;

    const backgroundSize = gradient ? '200% 100%, 100% 100%' : '200% 100%';

    return (
        <motion.span
            className={`inline-block bg-clip-text text-transparent ${className}`}
            style={{
                backgroundImage,
                backgroundSize,
                WebkitBackgroundClip: 'text',
                display: 'inline-block',
            }}
            initial={{ backgroundPosition: direction === 'left' ? '100% 0, 0 0' : '-100% 0, 0 0' }}
            animate={
                disabled
                    ? {}
                    : {
                        backgroundPosition: direction === 'left'
                            ? ['100% 0, 0 0', '-100% 0, 0 0']
                            : ['-100% 0, 0 0', '100% 0, 0 0'],
                    }
            }
            transition={{
                duration: speed,
                delay: delay,
                ease: 'linear',
                repeat: Infinity,
                repeatType: yoyo ? 'reverse' : 'loop',
            }}
            whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
        >
            {text}
        </motion.span>
    );
}
