import React from 'react';
import { DOCK_APPS, type DockAppId } from '../data/moharData';

interface BottomDockProps {
  activeApp: DockAppId | null;
  onSelectApp: (appId: DockAppId) => void;
}

const ICON_BACKGROUNDS: Record<DockAppId, string> = {
  notes: 'linear-gradient(180deg, #FFF052 0%, #FACC15 48%, #B47B00 100%)',
  browser: 'linear-gradient(180deg, #74D2FF 0%, #1DA1F2 50%, #0369A1 100%)',
  camera: 'linear-gradient(180deg, #D4D7DC 0%, #8E95A0 52%, #474D56 100%)',
  gallery: 'linear-gradient(180deg, #FF7AE0 0%, #FF1CAE 52%, #C90083 100%)',
  calendar: 'linear-gradient(180deg, #FF806E 0%, #F43F2E 50%, #B91C1C 100%)',
  messages: 'linear-gradient(180deg, #86F77B 0%, #2BD93B 50%, #15803D 100%)',
  favorites: 'linear-gradient(180deg, #FFB357 0%, #FF6B14 52%, #C2410C 100%)',
  mail: 'linear-gradient(180deg, #EB82FF 0%, #C62EFF 52%, #86198F 100%)',
};

function DockGlyph({ id }: { id: DockAppId }) {
  switch (id) {
    case 'notes':
      return (
        <svg viewBox="0 0 48 48" className="w-[64%] h-[64%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          {/* Notepad page */}
          <rect x="8" y="8" width="26" height="32" rx="4" fill="#FFFFFF" />
          <line x1="13" y1="15" x2="27" y2="15" stroke="#D49A00" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="13" y1="21.5" x2="25" y2="21.5" stroke="#D49A00" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="13" y1="28" x2="22" y2="28" stroke="#D49A00" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="13" y1="34" x2="20" y2="34" stroke="#D49A00" strokeWidth="2.6" strokeLinecap="round" />
          {/* Diagonal pencil */}
          <path
            d="M23.5 32.5L36.8 19.2C37.8 18.2 39.4 18.2 40.4 19.2L41.1 19.9C42.1 20.9 42.1 22.5 41.1 23.5L27.8 36.8L21.5 38.8L23.5 32.5Z"
            fill="#FFFFFF"
            stroke="#C68900"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'browser':
      return (
        <svg viewBox="0 0 48 48" className="w-[70%] h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <circle cx="24" cy="24" r="18" fill="#FFFFFF" fillOpacity="0.96" />
          <circle cx="24" cy="24" r="14.5" stroke="#0EA5E9" strokeWidth="2" strokeOpacity="0.45" />
          {/* Tick marks */}
          <line x1="24" y1="8.5" x2="24" y2="12" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="36" x2="24" y2="39.5" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <line x1="8.5" y1="24" x2="12" y2="24" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="24" x2="39.5" y2="24" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          {/* Compass needle */}
          <polygon points="33,15 26.8,26.8 21.2,21.2" fill="#0284C7" />
          <polygon points="15,33 21.2,21.2 26.8,26.8" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="2.2" fill="#FFFFFF" />
        </svg>
      );

    case 'camera':
      return (
        <svg viewBox="0 0 48 48" className="w-[70%] h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" fill="none">
          <path
            d="M17.5 11.5L19.6 8.5H28.4L30.5 11.5H37.5C40 11.5 42 13.5 42 16V34C42 36.5 40 38.5 37.5 38.5H10.5C8 38.5 6 36.5 6 34V16C6 13.5 8 11.5 10.5 11.5H17.5Z"
            fill="#FFFFFF"
          />
          <circle cx="24" cy="25" r="8.8" fill="#6B7280" />
          <circle cx="24" cy="25" r="5.6" fill="#FFFFFF" />
          <circle cx="24" cy="25" r="3" fill="#6B7280" />
          <circle cx="35.5" cy="16.5" r="1.8" fill="#6B7280" />
        </svg>
      );

    case 'gallery':
      return (
        <svg viewBox="0 0 48 48" className="w-[68%] h-[68%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <rect x="7" y="9" width="34" height="30" rx="5" fill="#FFFFFF" />
          {/* Inner framed sky/mountain cutout */}
          <rect x="11" y="13" width="26" height="22" rx="2.5" fill="#FCE7F3" />
          <circle cx="30" cy="18.5" r="3.2" fill="#EC4899" />
          <path d="M11 35L19.5 23.5L25.5 30.5L29.5 26L37 35H11Z" fill="#EC4899" />
        </svg>
      );

    case 'calendar':
      return (
        <svg viewBox="0 0 48 48" className="w-[66%] h-[66%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          {/* Top binding tabs */}
          <rect x="13.5" y="6.5" width="4.5" height="8" rx="2.2" fill="#FFFFFF" />
          <rect x="30" y="6.5" width="4.5" height="8" rx="2.2" fill="#FFFFFF" />
          {/* Header & crisp white calendar body matching reference */}
          <rect x="8" y="10.5" width="32" height="30.5" rx="4.5" fill="#FFFFFF" />
          <line x1="8" y1="19.5" x2="40" y2="19.5" stroke="#EF4444" strokeWidth="3.2" />
        </svg>
      );

    case 'messages':
      return (
        <svg viewBox="0 0 48 48" className="w-[70%] h-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          <path
            d="M24 9C14.1 9 6 15.5 6 23.5C6 27.6 8.1 31.3 11.6 33.9L9.6 40.2L17.4 36.9C19.5 37.6 21.7 38 24 38C33.9 38 42 31.5 42 23.5C42 15.5 33.9 9 24 9Z"
            fill="#FFFFFF"
          />
          <circle cx="16.8" cy="23.5" r="2.7" fill="#22C55E" />
          <circle cx="24" cy="23.5" r="2.7" fill="#22C55E" />
          <circle cx="31.2" cy="23.5" r="2.7" fill="#22C55E" />
        </svg>
      );

    case 'favorites':
      return (
        <svg viewBox="0 0 48 48" className="w-[74%] h-[74%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]" fill="none">
          {/* Exact reference icon #7: bright white circular medallion with orange heart inside */}
          <circle cx="24" cy="24" r="18.5" fill="#FFFFFF" />
          <path
            d="M24 34.4C24 34.4 13.5 27.9 13.5 20.6C13.5 17.2 16.1 14.6 19.3 14.6C21.3 14.6 23 15.7 24 17.3C25 15.7 26.7 14.6 28.7 14.6C31.9 14.6 34.5 17.2 34.5 20.6C34.5 27.9 24 34.4 24 34.4Z"
            fill="#F97316"
          />
        </svg>
      );

    case 'mail':
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
              {/* Hover & focus tooltip */}
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-stone-950/88 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-stone-100 opacity-0 translate-y-1 shadow-lg backdrop-blur-md transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
              >
                {app.label}
              </span>

              <button
                type="button"
                aria-label={`Open ${app.label}`}
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
