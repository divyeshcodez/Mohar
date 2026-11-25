import { useEffect, useState } from 'react';
import { AuthModal, type UserSession } from './components/AuthModal';
import { BottomDock } from './components/BottomDock';
import { DockAppModal } from './components/DockAppModal';
import { ExploreProductsModal } from './components/ExploreProductsModal';
import { HeroLogo } from './components/HeroLogo';
import { JoinCreatorSection } from './components/JoinCreatorSection';
import { LeftLightBulb } from './components/LeftLightBulb';
import { PixelPillButton } from './components/PixelPillButton';
import { RightCharacter } from './components/RightCharacter';
import { WhoAreWeSection } from './components/WhoAreWeSection';
import {
  INITIAL_EVENTS,
  INITIAL_FAVORITE_IDS,
  INITIAL_MESSAGES,
  INITIAL_NOTES,
  addNoteItem,
  sendMessageItem,
  toggleFavoriteItem,
  type CalendarEvent,
  type DockAppId,
  type MessageEntry,
  type NoteEntry,
} from './data/moharData';

export default function App() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeDockApp, setActiveDockApp] = useState<DockAppId | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);

  const [notes, setNotes] = useState<NoteEntry[]>(INITIAL_NOTES);
  const [messages, setMessages] = useState<MessageEntry[]>(INITIAL_MESSAGES);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(INITIAL_FAVORITE_IDS);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExploreOpen(false);
        setAuthOpen(false);
        setActiveDockApp(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddNote = (title: string, body: string) => {
    setNotes((prev) => addNoteItem(prev, title, body));
  };

  const handleSendMessage = (text: string) => {
    setMessages((prev) => sendMessageItem(prev, text, session ? session.name : 'You'));
  };

  const handleAddEvent = (date: string, title: string) => {
    setEvents((prev) => [
      ...prev,
      { id: `e-${Date.now()}`, date, title, stage: 'Scheduled' },
    ]);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavoriteIds((prev) => toggleFavoriteItem(prev, productId));
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black">
      {/* Section 1: Full-Viewport Renaissance Hero */}
      <section
        aria-label="MoHaR Hero"
        className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#3a3328]"
      >
      {/* Full-viewport Renaissance landscape oil painting background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/assets/mohar-bg.png")',
          }}
        />
        {/* Extremely subtle edge vignette to preserve painting vibrancy while gently grounding text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(20, 16, 10, 0) 48%, rgba(20, 16, 10, 0.14) 100%)',
          }}
        />
      </div>

      {/* Left-side cropped vintage transparent glass light bulb */}
      <LeftLightBulb />

      {/* Right-side illustrated anime character standing in shallow rippling water */}
      <RightCharacter />

      {/* Foreground semantic layout shell */}
      <div className="relative z-30 flex flex-col justify-between h-full w-full">
        {/* Top Navigation: Positioned near top, slightly right of center on desktop */}
        <header className="w-full pt-5 sm:pt-6 lg:pt-[30px] px-4 sm:px-6 lg:px-0">
          <nav
            aria-label="Primary actions"
            className="flex items-center justify-center lg:justify-end gap-2.5 sm:gap-4 lg:gap-[23px] lg:pr-[12.4%]"
          >
            <PixelPillButton
              variant="white"
              onClick={() => setExploreOpen(true)}
              ariaLabel="Explore Products"
            >
              EXPLORE PRODUCTS
            </PixelPillButton>

            <PixelPillButton
              variant="yellow"
              onClick={() => setAuthOpen(true)}
              ariaLabel={session ? `Account (${session.name})` : 'Login or Signup'}
            >
              {session ? 'ACCOUNT' : 'LOGIN / SIGNUP'}
            </PixelPillButton>
          </nav>
        </header>

        {/* Main Hero Centerpiece */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-8 sm:-mt-10 lg:-mt-14">
          <HeroLogo />
        </main>

        {/* Bottom Translucent Frosted-Glass Application Dock */}
        <footer className="pb-5 sm:pb-7 lg:pb-[54px] w-full">
          <BottomDock
            activeApp={activeDockApp}
            onSelectApp={(appId) =>
              setActiveDockApp((current) => (current === appId ? null : appId))
            }
          />
        </footer>
      </div>
      </section>

      {/* Section 2: WHO ARE WE? */}
      <WhoAreWeSection />

      {/* Section 3: JOIN AS CREATOR */}
      <JoinCreatorSection />

      {/* Interactive Modals (only mounted when opened by user action) */}
      <ExploreProductsModal
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
        onLaunchDockApp={(appId) => setActiveDockApp(appId)}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        session={session}
        onLoginSuccess={(nextSession) => setSession(nextSession)}
        onLogout={() => setSession(null)}
      />

      <DockAppModal
        activeApp={activeDockApp}
        onClose={() => setActiveDockApp(null)}
        notes={notes}
        onAddNote={handleAddNote}
        messages={messages}
        onSendMessage={handleSendMessage}
        events={events}
        onAddEvent={handleAddEvent}
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
