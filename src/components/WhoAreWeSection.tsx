import React from 'react';

interface FolderShapeProps {
  tabColor: string;
  bodyColor: string;
  className: string;
}

function RetroFolder({ tabColor, bodyColor, className }: FolderShapeProps) {
  return (
    <svg
      viewBox="0 0 180 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Back folder silhouette with top-left tab */}
      <path
        d="M 14 0 H 54 C 61 0 65 4 70 10 L 76 16 H 164 C 173 16 180 23 180 32 V 126 C 180 136 172 144 162 144 H 18 C 8 144 0 136 0 126 V 14 C 0 6 6 0 14 0 Z"
        fill={tabColor}
      />
      {/* Front folder flap */}
      <rect x="0" y="24" width="180" height="120" rx="16" fill={bodyColor} />
    </svg>
  );
}

/**
 * Section 2: "WHO ARE WE?" retro OS window over dark motion-blurred light streaks
 * with four colorful folder icons peeking behind the corners.
 */
export function WhoAreWeSection() {
  return (
    <section
      id="who-are-we"
      aria-labelledby="who-are-we-heading"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center py-16 sm:py-20 lg:py-[11vh] px-6 sm:px-12 lg:px-14"
    >
      {/* Dark horizontal motion-blurred amber & slate-blue light streak backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/mohar-who-bg.png")',
        }}
      />

      {/* Window + peeking folders assembly */}
      <div className="relative z-10 w-full max-w-[1104px] lg:ml-[4.8%]">
        {/* Top-Left Coral / Pink Folder */}
        <RetroFolder
          tabColor="#FF5263"
          bodyColor="#FF808B"
          className="pointer-events-none select-none absolute -top-[9.5%] -left-[5.5%] sm:-top-[10.8%] sm:-left-[6.8%] lg:-top-[12.2%] lg:-left-[7.7%] w-[74px] sm:w-[118px] lg:w-[154px] h-auto z-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-transform duration-300"
        />

        {/* Top-Right Bright Lime-Green Folder */}
        <RetroFolder
          tabColor="#47E038"
          bodyColor="#8FF23E"
          className="pointer-events-none select-none absolute -top-[5.5%] -right-[4.5%] sm:-top-[6.8%] sm:-right-[5.2%] lg:-top-[6.6%] lg:-right-[5.9%] w-[96px] sm:w-[156px] lg:w-[216px] h-auto z-0 drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)] transition-transform duration-300"
        />

        {/* Bottom-Left Sky-Blue Folder */}
        <RetroFolder
          tabColor="#2D9CDB"
          bodyColor="#47B6F5"
          className="pointer-events-none select-none absolute -bottom-[5.2%] -left-[5.8%] sm:-bottom-[5.6%] sm:-left-[7.2%] lg:-bottom-[5.4%] lg:-left-[8.4%] w-[82px] sm:w-[132px] lg:w-[172px] h-auto z-0 drop-shadow-[0_12px_26px_rgba(0,0,0,0.55)] transition-transform duration-300"
        />

        {/* Bottom-Right Soft Peach Folder */}
        <RetroFolder
          tabColor="#F09978"
          bodyColor="#F9B79B"
          className="pointer-events-none select-none absolute bottom-[0.6%] -right-[3%] sm:bottom-[0.8%] sm:-right-[3.5%] lg:bottom-[0.6%] lg:-right-[3.6%] w-[56px] sm:w-[86px] lg:w-[112px] h-auto z-0 drop-shadow-[0_10px_22px_rgba(0,0,0,0.45)] transition-transform duration-300"
        />

        {/* Central Classic Metallic-Bar OS Window */}
        <div className="relative z-10 w-full rounded-t-[16px] sm:rounded-t-[20px] lg:rounded-t-[22px] rounded-b-[2px] overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.72)]">
          {/* Metallic silver-white title bar */}
          <div
            className="relative flex items-center justify-center h-[54px] sm:h-[72px] lg:h-[88px] px-4 sm:px-8 border-b border-black/10"
            style={{
              background:
                'linear-gradient(180deg, #FDFDFD 0%, #EAEAEA 48%, #B9B9B9 100%)',
            }}
          >
            {/* macOS Traffic-Light Dots */}
            <div
              aria-hidden="true"
              className="absolute left-4 sm:left-7 lg:left-[44px] top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2"
            >
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-[17px] lg:h-[17px] rounded-full bg-[#FF3B30] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]" />
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-[17px] lg:h-[17px] rounded-full bg-[#FF9500] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]" />
              <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-[17px] lg:h-[17px] rounded-full bg-[#28CD41] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]" />
            </div>

            {/* Centered Heading */}
            <h2
              id="who-are-we-heading"
              className="text-[#0A0A0A] font-extrabold uppercase tracking-[0.02em] text-[20px] sm:text-[32px] lg:text-[42px] leading-none select-none"
            >
              WHO <em className="italic font-extrabold">ARE</em> WE?
            </h2>
          </div>

          {/* Crisp White Window Body */}
          <div className="bg-white text-[#0A0A0A] px-5 sm:px-10 lg:px-[56px] pt-6 pb-8 sm:pt-8 sm:pb-11 lg:pt-[22px] lg:pb-[38px]">
            <div className="mx-auto max-w-[960px] text-center uppercase font-bold tracking-[0.095em] sm:tracking-[0.105em] text-[12px] sm:text-[16px] md:text-[18.5px] lg:text-[21.5px] leading-[1.3] space-y-4 sm:space-y-5 lg:space-y-[24px]">
              <p className="text-balance">
                MOHAR HELPS INDIAN CREATORS LAUNCH PRODUCTS WITHOUT ANY{' '}
                <span className="lg:block">INVESTMENT</span>
              </p>

              <p className="text-balance">
                YOU PRE-ORDER WHAT YOU LOVE, AND IT GETS MADE ONLY IF ENOUGH{' '}
                <span className="lg:block">PEOPLE BACK IT.</span>
              </p>

              <p className="text-balance">
                INDIA HAS PLENTY OF GREAT PRODUCT IDEAS. WHAT&apos;S MISSING IS
                THE MONEY FOR THE FIRST BATCH. SO WE LET THE PEOPLE WHO&apos;D
                ACTUALLY BUY A PRODUCT DECIDE IF IT GETS MADE.
              </p>

              <p>CREATORS SHARE AN IDEA AND PAY NOTHING UPFRONT.</p>

              <p>BACKERS PRE-ORDER AT EARLY-BIRD PRICES</p>

              <p className="text-balance">
                YOUR MONEY STAYS SAFE, AND YOU GET A REFUND IF THE GOAL
                ISN&apos;T <span className="lg:block">REACHED.</span>
              </p>

              <p className="pt-0.5 font-extrabold">BACK IT WHILE IT BLOOMS.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
