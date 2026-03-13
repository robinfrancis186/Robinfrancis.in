import { useRef, useEffect, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

interface LottieClientProps {
    animationName: string;
    size: number;
    className: string;
}

const LottieClient = ({ animationName, size, className }: LottieClientProps) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        let isMounted = true;
        // Dynamically fetch the animation JSON from the bundle via Vite chunking
        import(`../../assets/lottie/${animationName}.json`)
            .then((module) => {
                if (isMounted) setAnimationData(module.default);
            })
            .catch(err => console.error(`Failed to load Lottie animation: ${animationName}`, err));
            
        return () => { isMounted = false; };
    }, [animationName]);

    const handleMouseEnter = () => {
        lottieRef.current?.setDirection(1);
        lottieRef.current?.play();
    };

    const handleMouseLeave = () => {
        lottieRef.current?.setDirection(-1);
        lottieRef.current?.play();
    };

    if (!animationData) {
        return <div className={className} style={{ width: size, height: size }} />;
    }

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

export default LottieClient;
