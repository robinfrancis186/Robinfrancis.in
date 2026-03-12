import { useState, useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
    /** Minimum time (ms) to show the loading screen. Default: 2200 */
    minDisplayTime?: number;
    /** Called when the loading screen finishes its fade-out */
    onFinished?: () => void;
}

const LoadingScreen = ({ minDisplayTime = 2200, onFinished }: LoadingScreenProps) => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            // Remove from DOM after fade-out transition completes
            setTimeout(() => {
                setVisible(false);
                onFinished?.();
            }, 600);
        }, minDisplayTime);

        return () => clearTimeout(timer);
    }, [minDisplayTime, onFinished]);

    if (!visible) return null;

    return (
        <div className={`loading-screen text-foreground ${fadeOut ? 'fade-out' : ''}`}>
            {/* Noise texture */}
            <div className="loading-noise-bg" />

            {/* Long horizontal streaks across background */}
            <div className="long-fazers">
                <span />
                <span />
                <span />
                <span />
            </div>

            {/* Speed character loader */}
            <div className="relative w-full max-w-2xl" style={{ height: 400 }}>
                <div className="speed-loader">
                    {/* Trail lines */}
                    <span>
                        <span />
                        <span />
                        <span />
                        <span />
                    </span>
                    {/* Body + face */}
                    <div className="speed-base">
                        <span />
                        <div className="speed-face" />
                    </div>
                </div>
            </div>

            {/* Text + progress bar */}
            <div className="z-20 text-center mt-8 space-y-4">
                <h1
                    className="text-3xl md:text-4xl font-bold tracking-tighter uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
                >
                    Loading
                </h1>
                <p
                    className="text-muted-foreground font-light tracking-widest uppercase text-xs"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    Preparing your experience
                </p>

                {/* Animated progress bar */}
                <div className="w-64 h-1 bg-muted rounded-full mx-auto mt-12 overflow-hidden relative">
                    <div className="h-full bg-foreground w-1/3 loading-progress-bar" />
                </div>
            </div>

            {/* Decorative bottom-left status */}
            <div className="absolute bottom-12 left-12 flex flex-col items-start space-y-2 opacity-40">
                <div className="flex items-center space-x-2 text-[10px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>SYSTEMS NOMINAL</span>
                </div>
                <div
                    className="text-[10px] text-muted-foreground uppercase tracking-tighter"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    ROBIN FRANCIS // PORTFOLIO v2.0
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
