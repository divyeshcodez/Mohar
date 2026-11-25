import { useState } from 'react';

/**
 * Main MoHaR brand lockup and tagline:
 * - Renders the exact MoHaR hybrid italic-serif + pixel-art letterforms & perched star
 *   extracted directly from the reference artwork (with a crisp inline SVG fallback).
 * - Centered bold italic white sans-serif tagline directly underneath.
 */
export function HeroLogo() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center text-center select-none pointer-events-auto">
      <h1 className="sr-only">MoHaR</h1>

      {!imgError ? (
        <img
          src="/assets/mohar-logo.png"
          alt="MoHaR"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          draggable={false}
          className="w-[270px] sm:w-[460px] md:w-[560px] lg:w-[668px] h-auto max-w-[84vw] object-contain drop-shadow-[0_4px_18px_rgba(20,16,10,0.22)]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="text-white text-6xl sm:text-8xl lg:text-[132px] font-serif italic tracking-tight leading-none drop-shadow-[0_4px_18px_rgba(20,16,10,0.3)]"
        >
          MoHaR
        </div>
      )}

      <p
        className="mt-2.5 sm:mt-4 lg:mt-[18px] text-white font-extrabold italic tracking-[-0.012em] leading-[1.12] text-[21px] sm:text-[30px] md:text-[36px] lg:text-[43px] whitespace-nowrap"
        style={{
          textShadow: '0 2px 14px rgba(18, 14, 9, 0.42), 0 1px 3px rgba(18, 14, 9, 0.35)',
        }}
      >
        Bloom first. Ship next.
      </p>
    </div>
  );
}
