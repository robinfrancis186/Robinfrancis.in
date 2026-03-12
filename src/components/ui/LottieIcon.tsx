import { useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

interface LottieIconProps {
    animationData: object;
    size?: number;
    className?: string;
}

/**
 * A reusable Lottie micro-animation icon component.
 * Plays the animation on hover and reverses on mouse leave.
 */
const LottieIcon = ({ animationData, size = 28, className = '' }: LottieIconProps) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    const handleMouseEnter = () => {
        lottieRef.current?.setDirection(1);
        lottieRef.current?.play();
    };

    const handleMouseLeave = () => {
        lottieRef.current?.setDirection(-1);
        lottieRef.current?.play();
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                style={{ width: size, height: size }}
            />
        </div>
    );
};

export default LottieIcon;
