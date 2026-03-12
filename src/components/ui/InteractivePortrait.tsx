import React from 'react';
import { cn } from '@/lib/utils';

interface InteractivePortraitProps {
    baseImage: string;
    alt?: string;
    className?: string;
}

const InteractivePortrait: React.FC<InteractivePortraitProps> = ({
    baseImage,
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
            <img
                src={baseImage}
                alt={alt}
                className="w-full h-auto object-cover"
                draggable={false}
            />
        </div>
    );
};

export default InteractivePortrait;
