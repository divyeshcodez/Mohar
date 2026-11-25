import React from 'react';
import { DOCK_APPS, type DockAppId } from '../data/moharData';

interface BottomDockProps {
  activeApp: DockAppId | null;
  onSelectApp: (appId: DockAppId) => void;
}

const ICON_BACKGROUNDS: Record<DockAppId, string> = {
  'our-story': 'linear-gradient(180deg, #FFF052 0%, #FACC15 48%, #B47B00 100%)',
  explore: 'linear-gradient(180deg, #74D2FF 0%, #1DA1F2 50%, #0369A1 100%)',
  launch: 'linear-gradient(180deg, #D4D7DC 0%, #8E95A0 52%, #474D56 100%)',
  trust: 'linear-gradient(180deg, #FF7AE0 0%, #FF1CAE 52%, #C90083 100%)',
  'ending-soon': 'linear-gradient(180deg, #FF806E 0%, #F43F2E 50%, #B91C1C 100%)',
  'how-it-works': 'linear-gradient(180deg, #86F77B 0%, #2BD93B 50%, #15803D 100%)',
  'my-backed': 'linear-gradient(180deg, #FFB357 0%, #FF6B14 52%, #C2410C 100%)',
  'talk-to-us': 'linear-gradient(180deg, #EB82FF 0%, #C62EFF 52%, #86198F 100%)',
};

function DockGlyph({ id }: { id: DockAppId }) {
  switch (id) {
    /* 1. Mango blossom -> Our Story */
    case 'our-story':
      return (
        <svg viewBox="0 0 48 48" className="w-[70%] h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          {/* 5 delicate mango blossom petals radiating from center */}
          <ellipse cx="24" cy="13.5" rx="4.4" ry="7.4" fill="#FFFFFF" />
          <ellipse cx="34.2" cy="20.6" rx="4.4" ry="7.4" transform="rotate(72 34.2 20.6)" fill="#FFFFFF" />
          <ellipse cx="30.3" cy="32.4" rx="4.4" ry="7.4" transform="rotate(144 30.3 32.4)" fill="#FFFFFF" />
          <ellipse cx="17.7" cy="32.4" rx="4.4" ry="7.4" transform="rotate(216 17.7 32.4)" fill="#FFFFFF" />
          <ellipse cx="13.8" cy="20.6" rx="4.4" ry="7.4" transform="rotate(288 13.8 20.6)" fill="#FFFFFF" />
          {/* Warm golden blossom center & tiny bud accents */}
          <circle cx="24" cy="24" r="5" fill="#D99B00" />
          <circle cx="24" cy="24" r="2.2" fill="#FFF7CC" />
        </svg>
      );

    /* 2. Compass -> Explore */
    case 'explore':
      return (
        <svg viewBox="0 0 48 48" className="w-[70%] h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <circle cx="24" cy="24" r="18" fill="#FFFFFF" fillOpacity="0.96" />
          <circle cx="24" cy="24" r="14.5" stroke="#0EA5E9" strokeWidth="2" strokeOpacity="0.45" />
          <line x1="24" y1="8.5" x2="24" y2="12" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="36" x2="24" y2="39.5" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <line x1="8.5" y1="24" x2="12" y2="24" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="24" x2="39.5" y2="24" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <polygon points="33,15 26.8,26.8 21.2,21.2" fill="#0284C7" />
          <polygon points="15,33 21.2,21.2 26.8,26.8" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="2.2" fill="#FFFFFF" />
        </svg>
      );

    /* 3. Seed -> Launch */
    case 'launch':
      return (
        <svg viewBox="0 0 48 48" className="w-[68%] h-[68%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" fill="none">
          {/* Botanical teardrop seed with delicate inner germination line */}
          <path
            d="M24 8C24 8 36 18.2 36 28.2C36 35 30.6 40 24 40C17.4 40 12 35 12 28.2C12 18.2 24 8 24 8Z"
            fill="#FFFFFF"
          />
          <path
            d="M24 17V34"
            stroke="#5B626D"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M24 27C24 23.5 27.5 21 30.5 21"
            stroke="#5B626D"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 30.5C24 27.2 20.8 25 18 25"
            stroke="#5B626D"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );

    /* 4. Shield -> Trust */
    case 'trust':
      return (
        <svg viewBox="0 0 48 48" className="w-[68%] h-[68%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <path
            d="M24 7L38 12.6V23.4C38 32.4 31.9 38.9 24 41.5C16.1 38.9 10 32.4 10 23.4V12.6L24 7Z"
            fill="#FFFFFF"
          />
          <path
            d="M17.8 24.4L22 28.6L30.8 19.6"
            stroke="#EC4899"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* 5. Clock -> Ending soon */
    case 'ending-soon':
      return (
        <svg viewBox="0 0 48 48" className="w-[70%] h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <circle cx="24" cy="24" r="17.5" fill="#FFFFFF" />
          <circle cx="24" cy="24" r="14" stroke="#FCA5A5" strokeWidth="1.6" />
          <path
            d="M24 14.5V24L30.5 28"
            stroke="#DC2626"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="2.2" fill="#DC2626" />
        </svg>
      );

    /* 6. Gold coin (mohar) -> How it works */
    case 'how-it-works':
      return (
        <svg viewBox="0 0 48 48" className="w-[72%] h-[72%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" fill="none">
          {/* Outer Mohar coin silhouette */}
          <circle cx="24" cy="24" r="17.5" fill="#FFF8D6" stroke="#FFFFFF" strokeWidth="1.6" />
          {/* Inner antique stamped beaded ring */}
          <circle
            cx="24"
            cy="24"
            r="13"
            stroke="#16A34A"
            strokeWidth="2"
            strokeDasharray="2.5 2.5"
          />
          {/* Central stamped royal Mohar star/crest */}
          <path
            d="M24 14.8L26.6 20.6L32.8 21.3L28.1 25.5L29.4 31.6L24 28.4L18.6 31.6L19.9 25.5L15.2 21.3L21.4 20.6L24 14.8Z"
            fill="#16A34A"
          />
        </svg>
      );

    /* 7. Heart -> My Backed */
    case 'my-backed':
      return (
        <svg viewBox="0 0 48 48" className="w-[74%] h-[74%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <circle cx="24" cy="24" r="18.5" fill="#FFFFFF" />
          <path
            d="M24 34.4C24 34.4 13.5 27.9 13.5 20.6C13.5 17.2 16.1 14.6 19.3 14.6C21.3 14.6 23 15.7 24 17.3C25 15.7 26.7 14.6 28.7 14.6C31.9 14.6 34.5 17.2 34.5 20.6C34.5 27.9 24 34.4 24 34.4Z"
            fill="#F97316"
          />
        </svg>
      );

    /* 8. Envelope -> Talk to us */
    case 'talk-to-us':
      return (
        <svg viewBox="0 0 48 48" className="w-[70%] h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <rect x="6" y="11" width="36" height="26" rx="4.5" fill="#FFFFFF" />
          <path
            d="M8.5 13.5L24 25.5L39.5 13.5"
            stroke="#C026D3"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 34.5L18.5 24.5M39.5 34.5L29.5 24.5"
            stroke="#D946EF"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function BottomDock({ activeApp, onSelectApp }: BottomDockProps) {
  return (
    <nav
      aria-label="MoHaR application dock"
      className="relative z-30 flex justify-center w-full px-2 sm:px-4"
    >
      <div className="mohar-dock-glass inline-flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-[15px] px-2.5 py-2.5 sm:px-5 sm:py-3.5 lg:px-[26px] lg:py-[18px] rounded-[18px] sm:rounded-[22px] max-w-[calc(100vw-16px)]">
        {DOCK_APPS.map((app) => {
          const isActive = activeApp === app.id;
          return (
            <div key={app.id} className="group relative flex flex-col items-center">
              {/* Hover & focus tooltip showing exact MoHaR dock name */}
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-950/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-stone-100 opacity-0 translate-y-1 shadow-lg backdrop-blur-md transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
              >
                {app.label}
              </span>

              <button
                type="button"
                aria-label={app.label}
                aria-pressed={isActive}
                onClick={() => onSelectApp(app.id)}
                style={{ background: ICON_BACKGROUNDS[app.id] }}
                className={`dock-icon-gloss relative flex items-center justify-center w-[36px] h-[36px] min-[420px]:w-[40px] min-[420px]:h-[40px] sm:w-[50px] sm:h-[50px] md:w-[54px] md:h-[54px] lg:w-[62px] lg:h-[62px] rounded-[10px] sm:rounded-[13px] lg:rounded-[15px] cursor-pointer shadow-[0_6px_14px_rgba(0,0,0,0.32),inset_0_1px_1px_rgba(255,255,255,0.65)] transition-transform duration-150 ease-out hover:-translate-y-1.5 hover:scale-[1.1] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isActive ? 'ring-2 ring-white/95 -translate-y-1 scale-[1.06]' : ''
                }`}
              >
                <span className="relative z-10 flex items-center justify-center w-full h-full">
                  <DockGlyph id={app.id} />
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
