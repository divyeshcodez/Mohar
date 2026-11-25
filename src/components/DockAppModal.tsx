import React, { useState } from 'react';
import {
  ArrowDown,
  Check,
  Clock,
  Heart,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  DOCK_APPS,
  MOHAR_PRODUCTS,
  getEndingSoonProducts,
  type DockAppId,
} from '../data/moharData';

interface DockAppModalProps {
  activeApp: DockAppId | null;
  onClose: () => void;
  backedIds: string[];
  onToggleBacked: (productId: string) => void;
  onJumpToSection: (sectionId: string) => void;
}

export function DockAppModal({
  activeApp,
  onClose,
  backedIds,
  onToggleBacked,
  onJumpToSection,
}: DockAppModalProps) {
  const [mailTo] = useState('hello@mohar.in');
  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');
  const [mailSent, setMailSent] = useState(false);

  if (!activeApp || activeApp === 'our-story' || activeApp === 'explore') {
    return null;
  }

  const appMeta = DOCK_APPS.find((a) => a.id === activeApp)!;
  const endingSoon = getEndingSoonProducts(MOHAR_PRODUCTS);
  const backedProducts = MOHAR_PRODUCTS.filter((p) => backedIds.includes(p.id));

  const handleMailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailSubject.trim() || !mailBody.trim()) return;
    setMailSent(true);
    setMailSubject('');
    setMailBody('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dock-app-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[82vh] overflow-hidden rounded-2xl bg-[#F7F3EB] text-stone-900 shadow-2xl border border-stone-300/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-stone-300/70">
          <div>
            <p className="text-xs font-medium text-stone-500">
              MoHaR · {appMeta.subtitle}
            </p>
            <h2
              id="dock-app-title"
              className="mt-0.5 text-2xl font-semibold text-stone-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {appMeta.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${appMeta.label}`}
            className="p-2 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4">
          {activeApp === 'launch' && (
            <div className="space-y-4">
              <p className="text-sm text-stone-700 leading-relaxed">
                Plant your first product seed on MoHaR with zero upfront
                investment. Share your concept, gather votes and early-bird
                pre-orders, and only begin factory production once your goal is
                reached.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white border border-stone-200">
                  <p className="text-sm font-bold text-stone-900">Free to start</p>
                  <p className="mt-1 text-xs text-stone-600">
                    No ₹10 lakh minimum order risk before knowing real demand.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-stone-200">
                  <p className="text-sm font-bold text-stone-900">Direct Payout</p>
                  <p className="mt-1 text-xs text-stone-600">
                    Add your PAN and bank account only after your pre-order goal hits.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onJumpToSection('join-creator');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1700D1] text-white text-xs font-extrabold uppercase tracking-wider hover:brightness-110 cursor-pointer"
              >
                <span>Go to Creator Launchpad</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {activeApp === 'trust' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-200">
                <ShieldCheck className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-stone-900">
                    100% Automatic Refund Guarantee
                  </p>
                  <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                    If a product does not reach its first-batch goal before the
                    timer ends, your pre-order payment is automatically refunded in
                    full.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <p className="text-sm font-bold text-stone-900">
                  Escrow-Protected Pre-Orders
                </p>
                <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                  Funds are released to verified Indian creators only after goal
                  completion and PAN / bank verification.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <p className="text-sm font-bold text-stone-900">
                  Real Prototypes, Transparent Batches
                </p>
                <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                  Every campaign lists clear first-batch timelines, creator
                  updates, and realistic delivery windows.
                </p>
              </div>
            </div>
          )}

          {activeApp === 'ending-soon' && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                Early-bird drops entering their final hours.
              </p>
              {endingSoon.map((product) => {
                const isBacked = backedIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-stone-900">{product.name}</p>
                      <p className="mt-0.5 text-xs text-stone-500 flex items-center gap-1.5 tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-red-600" />
                        <span>{product.hoursLeft}h left</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.fundedPercent}% funded</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.earlyBirdPrice}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleBacked(product.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                        isBacked
                          ? 'bg-orange-600 text-white'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      {isBacked ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Backed</span>
                        </>
                      ) : (
                        <span>Back Now</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeApp === 'how-it-works' && (
            <div className="space-y-3">
              <ol className="space-y-2.5 list-none p-0 m-0">
                {[
                  {
                    step: '01. Share the Idea',
                    detail: 'Creators list a product concept with zero upfront investment.',
                  },
                  {
                    step: '02. Vote & Bloom',
                    detail: 'The community discovers ideas and signals real demand.',
                  },
                  {
                    step: '03. Pre-Order Safely',
                    detail: 'Backers pre-order at early-bird prices with full refund protection.',
                  },
                  {
                    step: '04. Manufacture & Ship',
                    detail: 'Once funded, creators verify PAN & bank details and ship batch one.',
                  },
                ].map((item) => (
                  <li
                    key={item.step}
                    className="p-3.5 rounded-xl bg-white border border-stone-200"
                  >
                    <p className="text-sm font-bold text-stone-900">{item.step}</p>
                    <p className="mt-0.5 text-xs text-stone-600">{item.detail}</p>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onJumpToSection('who-are-we');
                }}
                className="text-xs font-bold text-[#1700D1] hover:underline cursor-pointer"
              >
                Read Who Are We section ↓
              </button>
            </div>
          )}

          {activeApp === 'my-backed' && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600 tabular-nums">
                You are backing {backedProducts.length} creator{' '}
                {backedProducts.length === 1 ? 'product' : 'products'}.
              </p>
              {backedProducts.length === 0 ? (
                <div className="p-6 rounded-xl bg-white border border-stone-200 text-center text-sm text-stone-500">
                  No backed products yet. Open Explore or Ending soon to pre-order
                  a drop.
                </div>
              ) : (
                backedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-stone-900">{product.name}</p>
                      <p className="text-xs text-stone-500 tabular-nums">
                        {product.creator} · {product.earlyBirdPrice} ·{' '}
                        {product.fundedPercent}% funded
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleBacked(product.id)}
                      aria-label={`Remove ${product.name} from My Backed`}
                      className="p-2 rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeApp === 'talk-to-us' && (
            <form onSubmit={handleMailSubmit} className="space-y-3">
              {mailSent && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
                  Message sent to {mailTo}. Team Mohar will reply soon.
                </div>
              )}
              <div>
                <label htmlFor="talk-subject" className="block text-xs font-semibold text-stone-700 mb-1">
                  Subject
                </label>
                <input
                  id="talk-subject"
                  type="text"
                  value={mailSubject}
                  onChange={(e) => {
                    setMailSubject(e.target.value);
                    setMailSent(false);
                  }}
                  placeholder="Question about launching my first batch"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1]"
                />
              </div>
              <div>
                <label htmlFor="talk-body" className="block text-xs font-semibold text-stone-700 mb-1">
                  Message
                </label>
                <textarea
                  id="talk-body"
                  rows={3}
                  value={mailBody}
                  onChange={(e) => setMailBody(e.target.value)}
                  placeholder="Write to Team Mohar..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1] resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Team Mohar</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
