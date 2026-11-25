import React from 'react';

interface PixelPillButtonProps {
  variant: 'white' | 'yellow';
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

/**
 * Exact 8-bit stepped pixel-border rounded pill button matching the MoHaR reference.
 * Uses an exact stepped SVG polygon matching the 304x65 pixel staircase from the reference
 * so both the fill and bright cobalt-blue (#1700D1) pixel outline stay razor-sharp at any size.
 */
export function PixelPillButton({
  variant,
  onClick,
  children,
  ariaLabel,
}: PixelPillButtonProps) {
  const fillColor = variant === 'yellow' ? '#FDFF00' : '#FFFFFF';
  const hoverFillClass =
    variant === 'yellow'
      ? 'group-hover:brightness-[0.98]'
      : 'group-hover:brightness-[0.98]';

  // Exact stepped-pixel pill silhouette on a 304 x 65 coordinate grid (5px step unit)
  const outerBorderPath = [
    'M 27 0 H 277 V 5 H 287 V 10 H 292 V 15 H 299 V 24 H 304 V 41 H 299 V 50 H 292 V 55 H 287 V 60 H 277 V 65',
    'H 27 V 60 H 17 V 55 H 12 V 50 H 5 V 41 H 0 V 24 H 5 V 15 H 12 V 10 H 17 V 5 H 27 Z',
  ].join(' ');

  const innerFillPath = [
    'M 27 5 H 277 V 10 H 287 V 15 H 292 V 24 H 299 V 41 H 292 V 50 H 287 V 55 H 277 V 60',
    'H 27 V 55 H 17 V 50 H 12 V 41 H 5 V 24 H 12 V 15 H 17 V 10 H 27 Z',
  ].join(' ');

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="group relative inline-flex items-center justify-center w-[156px] h-[38px] sm:w-[228px] sm:h-[50px] lg:w-[298px] lg:h-[64px] cursor-pointer select-none transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <svg
        viewBox="0 0 304 65"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full drop-shadow-[0_3px_6px_rgba(23,0,209,0.22)] transition-[filter] duration-150 ${hoverFillClass}`}
      >
        <path d={outerBorderPath} fill="#1700D1" shapeRendering="crispEdges" />
        <path d={innerFillPath} fill={fillColor} shapeRendering="crispEdges" />
      </svg>

      <span className="relative z-10 px-3 sm:px-5 text-[10.5px] sm:text-[14.5px] lg:text-[19.5px] font-extrabold uppercase tracking-[0.035em] text-[#1700D1] whitespace-nowrap leading-none">
        {children}
      </span>
    </button>
  );
}
