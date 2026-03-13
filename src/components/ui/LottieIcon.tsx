import { lazy, Suspense } from 'react';

// Lazy load the actual Lottie library wrapper to split it from the main bundle
const LottieClient = lazy(() => import('./LottieClient'));

interface LottieIconProps {
    animationName: string;
    size?: number;
    className?: string;
}

/**
 * A reusable Lottie micro-animation icon component.
 * Completely split from the main chunk to fix TBT and LCP scores.
 */
const LottieIcon = ({ animationName, size = 28, className = '' }: LottieIconProps) => {
    return (
        <Suspense fallback={<div className={className} style={{ width: size, height: size, display: 'inline-block' }} />}>
            <LottieClient animationName={animationName} size={size} className={className} />
        </Suspense>
    );
};

export default LottieIcon;
