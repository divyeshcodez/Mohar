import React, { useState } from 'react';
import {
  Camera as CameraIcon,
  ExternalLink,
  Heart,
  Plus,
  Send,
  X,
} from 'lucide-react';
import {
  DOCK_APPS,
  MOHAR_PRODUCTS,
  type CalendarEvent,
  type DockAppId,
  type MessageEntry,
  type NoteEntry,
} from '../data/moharData';

interface DockAppModalProps {
  activeApp: DockAppId | null;
  onClose: () => void;
  notes: NoteEntry[];
  onAddNote: (title: string, body: string) => void;
  messages: MessageEntry[];
  onSendMessage: (text: string) => void;
  events: CalendarEvent[];
  onAddEvent: (date: string, title: string) => void;
  favoriteIds: string[];
  onToggleFavorite: (productId: string) => void;
}

const BOOKMARKS = [
  {
    title: 'Classical Pastoral Light Studies',
    domain: 'archive.mohar.studio/pastoral-light',
    note: 'Oil brushwork and atmospheric distance in 17th-century European landscapes.',
  },
  {
    title: 'Hybrid Serif & Pixel Type Specimens',
    domain: 'type.mohar.studio/specimens',
    note: 'Pairing high-contrast italic serifs with crisp 8-bit modular grid glyphs.',
  },
  {
    title: 'Shipping Quietly — Field Notes',
    domain: 'journal.mohar.studio/bloom-first',
    note: 'Why unhurried creative exploration produces enduring software.',
  },
];

export function DockAppModal({
  activeApp,
  onClose,
  notes,
  onAddNote,
  messages,
  onSendMessage,
  events,
  onAddEvent,
  favoriteIds,
  onToggleFavorite,
}: DockAppModalProps) {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [msgText, setMsgText] = useState('');
  const [eventDate, setEventDate] = useState('Dec 20');
  const [eventTitle, setEventTitle] = useState('');
  const [mailTo, setMailTo] = useState('hello@mohar.studio');
  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');
  const [mailSent, setMailSent] = useState(false);
  const [shutterCount, setShutterCount] = useState(1);
  const [activeTone, setActiveTone] = useState<'Natural' | 'Warm Varnish' | 'Silver Mist'>('Natural');
  const [selectedBookmark, setSelectedBookmark] = useState(BOOKMARKS[0].title);

  if (!activeApp) return null;

  const appMeta = DOCK_APPS.find((a) => a.id === activeApp)!;

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteBody.trim()) return;
    onAddNote(noteTitle, noteBody);
    setNoteTitle('');
    setNoteBody('');
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    onSendMessage(msgText);
    setMsgText('');
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventDate.trim() || !eventTitle.trim()) return;
    onAddEvent(eventDate.trim(), eventTitle.trim());
    setEventTitle('');
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/55 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[82vh] overflow-hidden rounded-2xl bg-[#F7F3EB] text-stone-900 shadow-2xl border border-stone-300/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-stone-300/70">
          <div>
            <p className="text-xs font-medium text-stone-500">
              MoHaR Dock · {appMeta.subtitle}
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

        {/* Interactive Content per Dock App */}
        <div className="overflow-y-auto p-6 space-y-5">
          {activeApp === 'notes' && (
            <>
              <form onSubmit={handleNoteSubmit} className="space-y-3 p-4 rounded-xl bg-white border border-stone-200">
                <label htmlFor="note-title" className="block text-xs font-semibold text-stone-700">
                  New Studio Note
                </label>
                <input
                  id="note-title"
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-[#FAF8F4] focus:outline-none focus:border-[#1700D1]"
                />
                <textarea
                  aria-label="Note content"
                  rows={2}
                  value={noteBody}
                  onChange={(e) => setNoteBody(e.target.value)}
                  placeholder="Write an idea before shipping..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-[#FAF8F4] focus:outline-none focus:border-[#1700D1] resize-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </button>
              </form>

              <div className="space-y-3">
                {notes.map((n) => (
                  <article key={n.id} className="p-4 rounded-xl bg-white/90 border border-stone-200">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-bold text-stone-900">{n.title}</h3>
                      <span className="text-xs text-stone-500">{n.updatedAt}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-stone-700 leading-relaxed">{n.body}</p>
                  </article>
                ))}
              </div>
            </>
          )}

          {activeApp === 'browser' && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">{appMeta.description}</p>
              {BOOKMARKS.map((bm) => {
                const isSelected = selectedBookmark === bm.title;
                return (
                  <button
                    key={bm.title}
                    type="button"
                    onClick={() => setSelectedBookmark(bm.title)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#1700D1]'
                        : 'bg-white/80 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-stone-900">{bm.title}</span>
                      <ExternalLink className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                    <p className="mt-0.5 text-xs text-[#1700D1]">{bm.domain}</p>
                    <p className="mt-2 text-xs text-stone-600 leading-relaxed">{bm.note}</p>
                  </button>
                );
              })}
            </div>
          )}

          {activeApp === 'camera' && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl border border-stone-300 aspect-video bg-stone-900">
                <img
                  src="/assets/mohar-bg.png"
                  alt="MoHaR studio viewfinder preview"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    activeTone === 'Warm Varnish'
                      ? 'sepia-[0.35] contrast-105'
                      : activeTone === 'Silver Mist'
                      ? 'saturate-50 brightness-105'
                      : ''
                  }`}
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95 bg-stone-950/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <span>Tone: {activeTone}</span>
                  <span className="tabular-nums">Frame #{shutterCount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/80">
                  {(['Natural', 'Warm Varnish', 'Silver Mist'] as const).map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setActiveTone(tone)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                        activeTone === tone
                          ? 'bg-white text-stone-950 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShutterCount((c) => c + 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer"
                >
                  <CameraIcon className="w-4 h-4" />
                  <span>Capture Study</span>
                </button>
              </div>
            </div>
          )}

          {activeApp === 'gallery' && (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">{appMeta.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <figure className="rounded-xl overflow-hidden bg-white border border-stone-200">
                  <img
                    src="/assets/mohar-bg.png"
                    alt="Pastoral Renaissance backdrop"
                    referrerPolicy="no-referrer"
                    className="w-full h-32 object-cover"
                  />
                  <figcaption className="px-3 py-2 text-xs text-stone-700">
                    Pastoral Landscape · Oil Study
                  </figcaption>
                </figure>
                <figure className="rounded-xl overflow-hidden bg-[#2f2a22] border border-stone-200 flex flex-col">
                  <div className="h-32 flex items-center justify-center p-2">
                    <img
                      src="/assets/mohar-bulb.png"
                      alt="Vintage glass bulb study"
                      referrerPolicy="no-referrer"
                      className="max-h-full object-contain"
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-xs text-stone-700 bg-white">
                    Filament Glass · Left Motif
                  </figcaption>
                </figure>
              </div>
            </div>
          )}

          {activeApp === 'calendar' && (
            <div className="space-y-4">
              <form onSubmit={handleEventSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  aria-label="Event date"
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="Dec 20"
                  className="sm:w-28 px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1]"
                />
                <input
                  aria-label="Milestone title"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Add shipping milestone..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 whitespace-nowrap cursor-pointer"
                >
                  Add Date
                </button>
              </form>
              <div className="divide-y divide-stone-200 rounded-xl bg-white border border-stone-200 overflow-hidden">
                {events.map((ev) => (
                  <div key={ev.id} className="px-4 py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-stone-900">{ev.title}</p>
                      <p className="text-xs text-stone-500">{ev.stage}</p>
                    </div>
                    <span className="text-xs font-semibold text-stone-700 tabular-nums whitespace-nowrap">
                      {ev.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeApp === 'messages' && (
            <div className="space-y-4">
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-xl border ${
                      m.fromMe
                        ? 'bg-[#1700D1]/8 border-[#1700D1]/25 ml-8'
                        : 'bg-white border-stone-200 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-stone-700">{m.sender}</span>
                      <span>{m.time}</span>
                    </div>
                    <p className="text-sm text-stone-800 leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleMessageSubmit} className="flex gap-2">
                <input
                  aria-label="Write studio message"
                  type="text"
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder="Write a message to the studio..."
                  className="flex-1 px-3.5 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1]"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {activeApp === 'favorites' && (
            <div className="space-y-3">
              <p className="text-sm text-stone-600">
                Pinned MoHaR products ({favoriteIds.length} saved).
              </p>
              {favoriteIds.length === 0 ? (
                <div className="p-6 rounded-xl bg-white border border-stone-200 text-center text-sm text-stone-500">
                  No favorites saved yet. Open Explore Products to pin tools here.
                </div>
              ) : (
                MOHAR_PRODUCTS.filter((p) => favoriteIds.includes(p.id)).map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-stone-900">{product.name}</p>
                      <p className="text-xs text-stone-500">
                        {product.category} · {product.releaseTag}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleFavorite(product.id)}
                      aria-label={`Remove ${product.name} from favorites`}
                      className="p-2 rounded-lg text-orange-600 bg-orange-50 hover:bg-orange-100 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeApp === 'mail' && (
            <form onSubmit={handleMailSubmit} className="space-y-3">
              {mailSent && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
                  Your letter has been queued for dispatch to {mailTo}.
                </div>
              )}
              <div>
                <label htmlFor="mail-to" className="block text-xs font-semibold text-stone-700 mb-1">
                  Recipient
                </label>
                <input
                  id="mail-to"
                  type="email"
                  value={mailTo}
                  onChange={(e) => setMailTo(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1]"
                />
              </div>
              <div>
                <label htmlFor="mail-subject" className="block text-xs font-semibold text-stone-700 mb-1">
                  Subject
                </label>
                <input
                  id="mail-subject"
                  type="text"
                  value={mailSubject}
                  onChange={(e) => {
                    setMailSubject(e.target.value);
                    setMailSent(false);
                  }}
                  placeholder="Collaborating on the next release"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1]"
                />
              </div>
              <div>
                <label htmlFor="mail-body" className="block text-xs font-semibold text-stone-700 mb-1">
                  Message
                </label>
                <textarea
                  id="mail-body"
                  rows={3}
                  value={mailBody}
                  onChange={(e) => setMailBody(e.target.value)}
                  placeholder="Write your note..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#1700D1] resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Letter</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
