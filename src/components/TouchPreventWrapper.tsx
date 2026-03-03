'use client';
import { useLayoutEffect, useRef, ReactNode } from 'react';

export default function TouchPreventWrapper({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let startX = 0;
        let startY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Allow horizontal scroll on elements with the class 'allow-x-scroll'
            if ((e.target as HTMLElement).closest('.allow-x-scroll')) {
                return;
            }

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);

            // Force block browser's default behavior if swiping horizontally more than vertically
            if (diffX > diffY) {
                if (e.cancelable) {
                    e.preventDefault();
                }
            }
        };

        // Bind to global document for definitive mobile override
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full relative">
            {children}
        </div>
    );
}
