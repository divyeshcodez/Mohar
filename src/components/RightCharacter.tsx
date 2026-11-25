import { useState } from 'react';

/**
 * Illustrated anime-style young man standing with his back to the viewer on the right side,
 * feet resting in shallow water with subtle animated ripples around his ankles.
 */
export function RightCharacter() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute right-[2%] sm:right-[4%] lg:right-[6.2%] bottom-[12%] sm:bottom-[10%] lg:bottom-[3.6%] z-20 flex flex-col items-center"
    >
      <div className="relative w-[104px] sm:w-[148px] md:w-[172px] lg:w-[13.5vw] max-w-[224px]">
        {/* Standing illustrated character with subtle atmospheric breathing sway */}
        <img
          src="/assets/mohar-character.png"
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          draggable={false}
          className="relative z-10 w-full h-auto object-contain animate-character-breathe"
        />

        {/* Subtle shallow-water concentric ripples wrapping around his ankles/feet */}
        <svg
          viewBox="0 0 380 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-[6.5%] left-1/2 -translate-x-[53%] w-[202%] h-auto z-20 overflow-visible"
        >
          {/* Soft dark shallow water reflection under ankles */}
          <ellipse
            cx="192"
            cy="52"
            rx="126"
            ry="22"
            fill="rgba(34, 30, 24, 0.25)"
          />

          {/* Outer wide hand-drawn water ripple arcs matching reference */}
          <g className="animate-ripple-a" stroke="rgba(235, 232, 224, 0.78)" strokeLinecap="round">
            {/* Far left arc */}
            <path
              d="M 42 40 C 26 50, 34 66, 72 76 C 110 86, 165 90, 212 86"
              strokeWidth="3.2"
            />
            {/* Far right outer arc */}
            <path
              d="M 278 28 C 330 36, 358 53, 346 70 C 338 81, 305 88, 265 90"
              strokeWidth="3.0"
            />
            {/* Upper subtle ripple curl on far left */}
            <path
              d="M 80 26 C 60 30, 54 39, 66 47"
              strokeWidth="2.4"
              strokeOpacity="0.65"
            />
          </g>

          {/* Inner ankle ripple rings */}
          <g className="animate-ripple-b" stroke="rgba(245, 243, 236, 0.9)" strokeLinecap="round">
            {/* Left ankle splash ring */}
            <path
              d="M 142 42 C 122 47, 120 57, 146 64 C 174 71, 220 72, 250 63"
              strokeWidth="3.2"
            />
            {/* Right ankle inner arc */}
            <path
              d="M 222 44 C 248 46, 274 53, 272 62 C 270 70, 246 76, 216 77"
              strokeWidth="2.8"
            />
            {/* Front shimmering highlight wave */}
            <path
              d="M 114 68 C 148 81, 222 84, 286 74"
              strokeWidth="2.6"
              strokeOpacity="0.76"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
