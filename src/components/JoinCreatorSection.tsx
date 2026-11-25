import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { validateCreatorForm } from '../data/moharData';

type FolderDialogType = 'paid' | 'need' | null;

function CreatorFolderIcon({
  tabColor,
  bodyColor,
}: {
  tabColor: string;
  bodyColor: string;
}) {
  return (
    <svg
      viewBox="0 0 180 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
    >
      <path
        d="M 14 0 H 56 C 63 0 68 4 73 10 L 79 16 H 164 C 173 16 180 23 180 32 V 126 C 180 136 172 144 162 144 H 18 C 8 144 0 136 0 126 V 14 C 0 6 6 0 14 0 Z"
        fill={tabColor}
      />
      <rect x="0" y="24" width="180" height="120" rx="16" fill={bodyColor} />
    </svg>
  );
}

/**
 * Classic 8-bit pixel hand pointer cursor overlapping the JOIN AS CREATOR button.
 */
function PixelHandCursor() {
  return (
    <svg
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-10 h-11 sm:w-12 sm:h-14 lg:w-[66px] lg:h-[72px] -rotate-[16deg] drop-shadow-[0_4px_6px_rgba(0,0,0,0.22)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      shapeRendering="crispEdges"
    >
      {/* White inner hand fill */}
      <path
        d="M8 2H10V10H12V8H14V10H16V9H18V11H20V17H19V20H17V22H9V20H7V18H5V16H4V14H6V13H8V2Z"
        fill="#FFFFFF"
      />
      {/* Crisp 1px black stepped pixel outline */}
      <path
        d="M7 1H11V2H11V7H14V8H17V9H19V10H20V11H21V17H20V20H19V21H18V23H8V21H7V20H6V19H5V18H4V17H3V16H2V14H3V13H4V12H7V1Z M8 2V13H5V14H4V15H5V16H6V17H7V18H8V20H9V22H17V20H18V19H19V17H20V11H19V10H17V13H16V9H14V13H13V8H11V13H10V2H8Z"
        fill="#0D0D0D"
      />
    </svg>
  );
}

/**
 * Section 3: Retro CRT monitor screen with JOIN AS CREATOR pixel button & hand cursor,
 * vibrant green condensed headline, 4-step cream roadmap, and two clickable desktop folders
 * (HOW YOU GET PAID and WHAT YOU NEED).
 */
export function JoinCreatorSection() {
  const [folderDialog, setFolderDialog] = useState<FolderDialogType>(null);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  const [creatorName, setCreatorName] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [goalAmount, setGoalAmount] = useState('50000');
  const [errors, setErrors] = useState<
    Partial<Record<'creatorName' | 'productTitle' | 'goalAmount', string>>
  >({});
  const [submittedTitle, setSubmittedTitle] = useState<string | null>(null);

  // Wide stepped pixel pill button paths on a 600 x 126 coordinate grid
  const outerPill = [
    'M 54 0 H 546 V 9 H 564 V 18 H 576 V 27 H 584 V 38 H 592 V 50 H 600 V 76 H 592 V 88 H 584 V 99 H 576 V 108 H 564 V 117 H 546 V 126',
    'H 54 V 117 H 36 V 108 H 24 V 99 H 16 V 88 H 8 V 76 H 0 V 50 H 8 V 38 H 16 V 27 H 24 V 18 H 36 V 9 H 54 Z',
  ].join(' ');

  const lavenderRim = [
    'M 54 9 H 546 V 18 H 564 V 27 H 576 V 38 H 584 V 50 H 592 V 76 H 584 V 88 H 576 V 99 H 564 V 108 H 546 V 117',
    'H 54 V 108 H 36 V 99 H 24 V 88 H 16 V 76 H 8 V 50 H 16 V 38 H 24 V 27 H 36 V 18 H 54 Z',
  ].join(' ');

  const whiteCore = [
    'M 54 17 H 546 V 26 H 564 V 35 H 574 V 46 H 582 V 80 H 574 V 91 H 564 V 100 H 546 V 109',
    'H 54 V 100 H 36 V 91 H 26 V 80 H 18 V 46 H 26 V 35 H 36 V 26 H 54 Z',
  ].join(' ');

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateCreatorForm({ creatorName, productTitle, goalAmount });
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setSubmittedTitle(productTitle.trim());
    setCreatorName('');
    setProductTitle('');
  };

  return (
    <section
      id="join-creator"
      aria-labelledby="join-creator-heading"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#161718] flex flex-col justify-between py-12 sm:py-16 lg:py-0 px-5 sm:px-10"
    >
      {/* Retro Dark CRT Bezel & Speckled Curved Screen Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/mohar-creator-bg.png")',
        }}
      />

      {/* Top-Right Interactive Desktop Folder: HOW YOU GET PAID */}
      <button
        type="button"
        onClick={() => setFolderDialog('paid')}
        aria-label="How you get paid"
        className="group relative lg:absolute lg:top-[4.6%] lg:right-[4.2%] z-20 self-end lg:self-auto mb-6 lg:mb-0 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <div className="w-[88px] sm:w-[132px] lg:w-[162px]">
          <CreatorFolderIcon tabColor="#4BE13A" bodyColor="#8CF43B" />
        </div>
        <span
          className="mt-2 sm:mt-2.5 text-white font-bold uppercase tracking-[0.045em] text-[13px] sm:text-[18px] lg:text-[23px] leading-tight whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-serif)',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
          }}
        >
          HOW YOU GET PAID
        </span>
      </button>

      {/* Main Centered Content Column */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center lg:pt-[8.2vh] lg:pb-[3vh]">
        {/* JOIN AS CREATOR Wide Stepped Pixel Pill CTA + Pixel Hand Cursor */}
        <div className="relative inline-flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              setSubmittedTitle(null);
              setErrors({});
              setCreatorModalOpen(true);
            }}
            className="group relative inline-flex items-center justify-center w-[280px] h-[64px] sm:w-[440px] sm:h-[96px] lg:w-[596px] lg:h-[126px] cursor-pointer select-none transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1700D1]"
          >
            <svg
              viewBox="0 0 600 126"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full drop-shadow-[0_6px_16px_rgba(23,0,209,0.16)]"
            >
              <path d={outerPill} fill="#1200C8" shapeRendering="crispEdges" />
              <path d={lavenderRim} fill="#B8C0FB" shapeRendering="crispEdges" />
              <path d={whiteCore} fill="#FFFFFF" shapeRendering="crispEdges" />
            </svg>

            <span className="relative z-10 px-6 text-[18px] sm:text-[29px] lg:text-[39px] font-extrabold uppercase tracking-[0.03em] text-[#0052FF] whitespace-nowrap leading-none">
              JOIN AS CREATOR
            </span>

            {/* Pixel hand pointer resting right on the bottom edge of the pill */}
            <span className="pointer-events-none absolute -bottom-[26px] sm:-bottom-[34px] lg:-bottom-[42px] left-[49%] -translate-x-1/2 z-20">
              <PixelHandCursor />
            </span>
          </button>
        </div>

        {/* Vibrant Green Condensed Headline */}
        <h2
          id="join-creator-heading"
          className="mt-10 sm:mt-12 lg:mt-[46px] text-[#48DE52] uppercase tracking-[0.018em] leading-[1.06] text-[27px] sm:text-[42px] md:text-[50px] lg:text-[58px] px-2"
          style={{
            fontFamily: "'Anton', sans-serif",
          }}
        >
          BLOOM FIRST. THE FRUIT WILL FOLLOW.
        </h2>

        {/* 4-Line Crisp Cream Condensed Creator Steps */}
        <ol
          className="mt-5 sm:mt-7 lg:mt-[30px] space-y-2 sm:space-y-3 lg:space-y-[14px] text-[#FAF9E6] uppercase tracking-[0.075em] leading-[1.18] text-[20px] sm:text-[31px] md:text-[37px] lg:text-[43px] list-none p-0 m-0"
          style={{
            fontFamily: "'Anton', sans-serif",
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.35)',
          }}
        >
          <li>SIGN UP AND ADD YOUR PRODUCT</li>
          <li>GO LIVE AND LET PEOPLE VOTE</li>
          <li>COLLECT PRE-ORDERS</li>
          <li>THEN ADD PAN AND BANK TO GET PAID</li>
        </ol>
      </div>

      {/* Bottom-Left Interactive Desktop Folder: WHAT YOU NEED */}
      <div className="relative z-20 flex flex-col lg:block items-start mt-8 lg:mt-0">
        <button
          type="button"
          onClick={() => setFolderDialog('need')}
          aria-label="What you need"
          className="group relative lg:absolute lg:bottom-[12.2vh] lg:left-[2.6vw] flex flex-col items-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <div className="w-[92px] sm:w-[138px] lg:w-[172px]">
            <CreatorFolderIcon tabColor="#FF8D5C" bodyColor="#FFB899" />
          </div>
          <span
            className="mt-2 sm:mt-2.5 text-white font-bold uppercase tracking-[0.045em] text-[13px] sm:text-[18px] lg:text-[23px] leading-tight whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-serif)',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            WHAT YOU NEED
          </span>
        </button>
      </div>

      {/* Bottom-Center Caption */}
      <p
        className="relative z-10 text-center text-white font-normal tracking-[0.01em] text-[18px] sm:text-[24px] lg:text-[31px] mt-6 lg:mt-0 lg:pb-[3.2vh]"
        style={{
          textShadow: '0 2px 6px rgba(0, 0, 0, 0.45)',
        }}
      >
        Free to start
      </p>

      {/* Folder Info Dialog (HOW YOU GET PAID / WHAT YOU NEED) */}
      {folderDialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="folder-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md"
          onClick={() => setFolderDialog(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#F7F3EB] text-stone-900 shadow-2xl border border-stone-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-300/70">
              <h3
                id="folder-dialog-title"
                className="text-xl font-bold text-stone-900"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {folderDialog === 'paid' ? 'How You Get Paid' : 'What You Need'}
              </h3>
              <button
                type="button"
                onClick={() => setFolderDialog(null)}
                aria-label="Close folder details"
                className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {folderDialog === 'paid' ? (
              <div className="p-6 space-y-3 text-sm text-stone-700 leading-relaxed">
                <p>
                  Backer pre-orders are held safely in escrow while your campaign
                  blooms. You pay zero upfront platform fees to list your idea.
                </p>
                <p>
                  Once your first-batch goal is reached, verify your PAN and Indian
                  bank details to receive production payouts directly to your account.
                </p>
                <p className="text-xs text-stone-500">
                  If a campaign does not hit its goal, every backer is automatically
                  refunded in full.
                </p>
              </div>
            ) : (
              <ul className="p-6 space-y-2.5 text-sm text-stone-700 list-disc pl-10">
                <li>An original physical or creative product concept</li>
                <li>Sketches, renders, or early prototype photos</li>
                <li>A clear first-batch pricing &amp; timeline estimate</li>
                <li>PAN card &amp; bank account (only required once funded)</li>
              </ul>
            )}

            <div className="px-6 py-4 bg-[#EFEAE0]/70 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setFolderDialog(null);
                  setCreatorModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-[#1700D1] text-white hover:brightness-110 cursor-pointer"
              >
                Start Free as Creator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Creator Onboarding Modal */}
      {creatorModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="creator-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md"
          onClick={() => setCreatorModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#F7F3EB] text-stone-900 shadow-2xl border border-stone-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-300/70">
              <div>
                <p className="text-xs font-medium text-stone-500">
                  MoHaR Creator Launchpad · Free to start
                </p>
                <h3
                  id="creator-modal-title"
                  className="mt-1 text-2xl font-semibold text-stone-900"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Join as Creator
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCreatorModalOpen(false)}
                aria-label="Close Join as Creator"
                className="p-2 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedTitle ? (
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">Idea queued for community voting!</p>
                    <p className="mt-1 text-emerald-800">
                      &ldquo;{submittedTitle}&rdquo; is ready to collect early-bird
                      backers. No upfront payment needed.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCreatorModalOpen(false)}
                  className="w-full py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-stone-900 text-white hover:bg-stone-800 cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreatorSubmit} noValidate className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="creator-name"
                    className="block text-xs font-semibold text-stone-700 mb-1"
                  >
                    Creator or Studio Name
                  </label>
                  <input
                    id="creator-name"
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Aarav Studio"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#1700D1]"
                  />
                  {errors.creatorName && (
                    <p role="alert" className="mt-1 text-xs text-red-700">
                      {errors.creatorName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="creator-product"
                    className="block text-xs font-semibold text-stone-700 mb-1"
                  >
                    Product Idea Title
                  </label>
                  <input
                    id="creator-product"
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    placeholder="Brass Pour-Over Coffee Dripper"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 focus:outline-none focus:border-[#1700D1]"
                  />
                  {errors.productTitle && (
                    <p role="alert" className="mt-1 text-xs text-red-700">
                      {errors.productTitle}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="creator-goal"
                    className="block text-xs font-semibold text-stone-700 mb-1"
                  >
                    First-Batch Goal (INR ₹)
                  </label>
                  <input
                    id="creator-goal"
                    type="text"
                    inputMode="numeric"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    placeholder="50000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 tabular-nums focus:outline-none focus:border-[#1700D1]"
                  />
                  {errors.goalAmount && (
                    <p role="alert" className="mt-1 text-xs text-red-700">
                      {errors.goalAmount}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg text-sm font-extrabold uppercase tracking-wider bg-[#1700D1] text-white hover:brightness-110 transition-all cursor-pointer"
                >
                  Submit Product Idea
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
