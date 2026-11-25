import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface OurStoryPageProps {
  onBack: () => void;
}

/**
 * Translucent ragged beige masking tape strip matching the reference scrapbook notes.
 */
function MaskingTape({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute z-20 ${className}`}
      style={{
        background:
          'repeating-linear-gradient(90deg, rgba(224,212,193,0.58) 0px, rgba(212,198,176,0.52) 2px, rgba(232,222,205,0.6) 4px)',
        boxShadow: '0 2px 6px rgba(24, 8, 8, 0.22)',
        clipPath:
          'polygon(2% 4%, 98% 0%, 100% 18%, 97% 36%, 99% 56%, 96% 78%, 99% 96%, 1% 100%, 3% 80%, 0% 58%, 3% 34%, 0% 16%)',
        backdropFilter: 'contrast(0.96)',
      }}
    />
  );
}

/**
 * Subtle folded white stationery sheet background with crisp vertical & horizontal paper creases.
 */
const FOLDED_PAPER_STYLE: React.CSSProperties = {
  backgroundColor: '#FBFBF9',
  backgroundImage: [
    'linear-gradient(90deg, rgba(0,0,0,0.03) 0%, transparent 3%, transparent 24.5%, rgba(0,0,0,0.045) 25%, rgba(255,255,255,0.6) 25.5%, transparent 27%, transparent 49.5%, rgba(0,0,0,0.04) 50%, rgba(255,255,255,0.65) 50.5%, transparent 52%, transparent 74.5%, rgba(0,0,0,0.04) 75%, rgba(255,255,255,0.55) 75.5%, transparent 77%)',
    'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 8%, transparent 49.4%, rgba(0,0,0,0.045) 50%, rgba(255,255,255,0.7) 50.7%, transparent 53%, rgba(0,0,0,0.025) 100%)',
  ].join(', '),
};

/**
 * Full-screen "OUR STORY" webpage opened when clicking "Our Story" (Mango blossom) in the dock.
 * Recreates the exact distressed burgundy wall, pixel-art OUR STORY header, italic serif subtitle,
 * and three folded, taped stationery notes (Problem, What we believe, The Mohar way).
 */
export function OurStoryPage({ onBack }: OurStoryPageProps) {
  const [titleImgError, setTitleImgError] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#4d1818] text-white">
      {/* Distressed burgundy grunge wall background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/mohar-story-bg.png")',
        }}
      />

      {/* Top-left subtle back button */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 pt-3 sm:pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/85 hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to MoHaR</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-4 pb-16 lg:pb-6">
        {/* Centered Pixel-Art OUR STORY Title + Italic Serif Subtitle */}
        <div className="flex flex-col items-center text-center pt-1 sm:pt-2 lg:pt-0">
          <h1 className="sr-only">OUR STORY</h1>

          {!titleImgError ? (
            <img
              src="/assets/mohar-our-story-title.png"
              alt="OUR STORY"
              referrerPolicy="no-referrer"
              onError={() => setTitleImgError(true)}
              draggable={false}
              className="w-[260px] sm:w-[430px] lg:w-[585px] max-w-[88vw] h-auto object-contain select-none"
            />
          ) : (
            <div
              aria-hidden="true"
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.14em] text-white"
            >
              OUR STORY
            </div>
          )}

          <p
            className="mt-3 sm:mt-4 lg:mt-[16px] text-white italic font-normal text-[20px] sm:text-[26px] lg:text-[31px] tracking-[0.01em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Bloom first. The fruit will follow.
          </p>
        </div>

        {/* Three Folded & Taped Paper Notes Collage */}
        <div className="mt-10 sm:mt-12 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-4 items-start">
          {/* Note 1: Problem (Left, upright, tape on top edge) */}
          <article
            className="relative mx-auto w-full max-w-[465px] lg:mt-[10px] px-6 sm:px-8 pt-7 pb-8 text-[#0F0F0F] shadow-[0_18px_42px_rgba(24,5,5,0.5)]"
            style={FOLDED_PAPER_STYLE}
          >
            <MaskingTape className="-top-[26px] left-1/2 -translate-x-1/2 w-[156px] sm:w-[186px] h-[54px] sm:h-[62px] -rotate-[1deg]" />

            <h2
              className="text-center italic font-semibold text-[28px] sm:text-[33px] leading-tight text-[#0B0B0B]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Problem
            </h2>

            <p className="mt-3.5 text-center text-[15.5px] sm:text-[18px] lg:text-[19.5px] leading-[1.36] font-normal text-[#141414]">
              A manufacturer says: minimum order, 1,000 pieces. Cost: ₹10 lakh. A
              creator without that money watches the idea stop right there. Every
              year, many great Indian products end this way.
            </p>

            <p
              className="mt-6 sm:mt-7 pl-2 sm:pl-4 text-[34px] sm:text-[42px] leading-none text-[#111111]"
              style={{ fontFamily: "'Sacramento', cursive" }}
            >
              The Mohar team
            </p>
          </article>

          {/* Note 2: What we believe (Center-bottom, slightly tilted counter-clockwise, tape on top edge) */}
          <article
            className="relative mx-auto w-full max-w-[468px] lg:mt-[202px] -rotate-[1.6deg] lg:-rotate-[2.4deg] px-6 sm:px-8 pt-6 pb-5 text-[#0F0F0F] shadow-[0_20px_46px_rgba(24,5,5,0.54)]"
            style={FOLDED_PAPER_STYLE}
          >
            <MaskingTape className="-top-[26px] left-1/2 -translate-x-1/2 w-[156px] sm:w-[184px] h-[52px] sm:h-[60px] -rotate-[2deg]" />

            <h2
              className="text-center italic font-semibold text-[28px] sm:text-[33px] leading-tight text-[#0B0B0B]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              What we believe
            </h2>

            <p className="mt-3.5 text-center text-[15.5px] sm:text-[18px] lg:text-[19.5px] leading-[1.35] font-normal text-[#141414]">
              A mango tree flowers before it fruits. The blossom is the moment
              the tree says &ldquo;something is coming.&rdquo; Products should
              work the same way. Show the idea first, let people believe in it,
              and only then start the factory.
            </p>

            <p
              className="mt-5 sm:mt-6 text-center text-[36px] sm:text-[44px] leading-none text-[#111111]"
              style={{ fontFamily: "'Sacramento', cursive" }}
            >
              Team Mohar
            </p>
          </article>

          {/* Note 3: The Mohar way (Right, gently tilted clockwise, tape across bottom edge!) */}
          <article
            className="relative mx-auto w-full max-w-[465px] lg:mt-[36px] rotate-[1.2deg] lg:rotate-[1.6deg] px-6 sm:px-8 pt-7 pb-8 text-[#0F0F0F] shadow-[0_18px_42px_rgba(24,5,5,0.5)]"
            style={FOLDED_PAPER_STYLE}
          >
            <h2
              className="text-center italic font-semibold text-[28px] sm:text-[33px] leading-tight text-[#0B0B0B]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              The Mohar way
            </h2>

            <p className="mt-4 sm:mt-5 text-center text-[16px] sm:text-[18.5px] lg:text-[20px] leading-[1.4] font-normal text-[#141414]">
              Customers first. Factory second. Pre-order it, back it, and if the
              goal is hit, it gets made.
            </p>

            <div
              className="mt-7 sm:mt-8 text-center text-[36px] sm:text-[43px] leading-[1.15] text-[#111111]"
              style={{ fontFamily: "'Sacramento', cursive" }}
            >
              <p>Made in India,</p>
              <p>backed by India</p>
            </div>

            {/* Bottom-edge masking tape overlapping the lower margin & signature just like reference */}
            <MaskingTape className="-bottom-[26px] left-[58%] -translate-x-1/2 w-[112px] sm:w-[124px] h-[54px] sm:h-[60px] -rotate-[8deg]" />
          </article>
        </div>
      </main>
    </div>
  );
}
