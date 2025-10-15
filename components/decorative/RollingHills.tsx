/**
 * RollingHills Component
 *
 * Sophisticated decorative background element featuring 4 layers of organic rolling hills
 * with natural topography and atmospheric depth. Each layer uses unique bezier curves to
 * create asymmetric, varied peaks and valleys that extend 50-60% up the viewport.
 *
 * Layering technique:
 * - Layer 4 (back): Most ethereal, opacity 0.08, gentle distant peaks
 * - Layer 3: Far background, opacity 0.12, varied gentle slopes
 * - Layer 2: Middle depth, opacity 0.18, more pronounced undulation
 * - Layer 1 (front): Foreground, opacity 0.25, most defined peaks
 *
 * Uses gold color tokens with graduated opacity to create atmospheric perspective.
 * Staggered float animations (13s-24s) provide subtle, organic movement.
 * Reinforces the "frolic" brand personality with whimsical, ethereal landscape.
 */

'use client';

import { cn } from '@/lib/utils';

export interface RollingHillsProps {
  className?: string;
}

export const RollingHills = ({ className }: RollingHillsProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden z-0",
        className
      )}
      style={{ isolation: 'isolate' }}
      aria-hidden="true"
    >
      {/* RollingHillOne - Flows from left, cascades down and right */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[60vh] animate-[float_18s_ease-in-out_infinite]"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 260 C200 280, 400 330, 600 400 C800 470, 1000 530, 1200 565 C1300 582, 1370 592, 1440 598 L1440 600 L0 600 Z"
          fill="#FFFBEB"
        />
      </svg>

      {/* RollingHillTwo - Flows from right, cascades down and left, darker foreground */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[60vh] animate-[float_15s_ease-in-out_infinite_1.5s]"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M1440 296 C1240 316, 1040 366, 840 436 C640 506, 440 566, 240 594 C140 608, 70 598, 0 598 L0 600 L1440 600 Z"
          fill="#FEF3C7"
        />
      </svg>
    </div>
  );
};

RollingHills.displayName = "RollingHills";
