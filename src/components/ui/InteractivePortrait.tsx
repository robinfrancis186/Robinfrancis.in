import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InteractivePortraitProps {
    baseImage: string;
    revealImage: string;
    alt?: string;
    className?: string;
}

const InteractivePortrait: React.FC<InteractivePortraitProps> = ({
    baseImage,
    revealImage,
    alt = 'Portrait',
    className
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const baseRadius = 80;

    // Mouse position relative to the container
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the main cursor blob
    const blobX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
    const blobY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

    // Trailing blobs with increasing lag
    const trail1X = useSpring(mouseX, { damping: 30, stiffness: 150, mass: 0.8 });
    const trail1Y = useSpring(mouseY, { damping: 30, stiffness: 150, mass: 0.8 });

    const trail2X = useSpring(mouseX, { damping: 40, stiffness: 100, mass: 1.2 });
    const trail2Y = useSpring(mouseY, { damping: 40, stiffness: 100, mass: 1.2 });

    const trail3X = useSpring(mouseX, { damping: 50, stiffness: 80, mass: 1.5 });
    const trail3Y = useSpring(mouseY, { damping: 50, stiffness: 80, mass: 1.5 });

    // Parallax effect for images
    const parallaxX = useTransform(blobX, [0, 500], [10, -10]);
    const parallaxY = useTransform(blobY, [0, 500], [10, -10]);

    // CSS mask-image built from multiple radial gradients — no SVG bugs
    const maskImage = useTransform(
        [blobX, blobY, trail1X, trail1Y, trail2X, trail2Y, trail3X, trail3Y],
        ([bx, by, t1x, t1y, t2x, t2y, t3x, t3y]) => {
            if (!isHovered) return 'none';
            return [
                `radial-gradient(circle ${baseRadius}px at ${bx}px ${by}px, black 60%, transparent 100%)`,
                `radial-gradient(circle ${baseRadius * 0.8}px at ${t1x}px ${t1y}px, black 50%, transparent 100%)`,
                `radial-gradient(circle ${baseRadius * 0.6}px at ${t2x}px ${t2y}px, black 40%, transparent 100%)`,
                `radial-gradient(circle ${baseRadius * 0.4}px at ${t3x}px ${t3y}px, black 30%, transparent 100%)`,
            ].join(', ');
        }
    );

    // Init to center
    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(rect.width / 2);
            mouseY.set(rect.height / 2);
        }
    }, [mouseX, mouseY]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(rect.width / 2);
            mouseY.set(rect.height / 2);
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative overflow-hidden rounded-2xl shadow-2xl cursor-none select-none",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ isolation: 'isolate' }}
        >
            {/* Subtle wave background */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none z-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="portrait-wave" width="80" height="16" patternUnits="userSpaceOnUse">
                            <path d="M0,8 Q20,0 40,8 T80,8" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#portrait-wave)" />
                </svg>
            </div>

            {/* Base Image (Light) */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{ x: parallaxX, y: parallaxY }}
            >
                <img
                    src={baseImage}
                    alt={alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </motion.div>

            {/* Reveal Image — revealed through CSS mask on hover */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    x: parallaxX,
                    y: parallaxY,
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ opacity: { duration: 0.2 } }}
            >
                <img
                    src={revealImage}
                    alt={alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </motion.div>

            {/* Interactive hint ring */}
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.15)'
                }}
            />

            {/* Custom Cursor Dot */}
            <motion.div
                className="absolute w-3 h-3 rounded-full pointer-events-none z-40"
                style={{
                    x: blobX,
                    y: blobY,
                    translateX: '-50%',
                    translateY: '-50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    boxShadow: '0 0 8px 2px rgba(255,255,255,0.5)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};

export default InteractivePortrait;
