import React from 'react';
import { cn } from '@/lib/utils';

interface InteractivePortraitProps {
    baseImage: string;       // light-mode image
    darkImage?: string;      // optional dark-mode image
    alt?: string;
    className?: string;
}

const InteractivePortrait: React.FC<InteractivePortraitProps> = ({
    baseImage,
    darkImage,
    alt = 'Portrait',
    className
}) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl shadow-2xl select-none",
                className
            )}
            style={{ isolation: 'isolate' }}
        >
            {/* Light mode image */}
            <img
                src={baseImage}
                alt={alt}
                width={800}
                height={1067}
                className="w-full h-auto object-cover block dark:hidden"
                draggable={false}
            />

            {/* Dark mode image (fallbacks to same as light if not provided) */}
            <img
                src={darkImage || baseImage}
                alt={alt}
                width={800}
                height={1067}
                className="w-full h-auto object-cover hidden dark:block"
                draggable={false}
            />
        </div>
    );
};

export default InteractivePortrait;
