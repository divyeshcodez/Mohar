import { useEffect, useState } from 'react';
import { AuthModal, type UserSession } from './components/AuthModal';
import { BottomDock } from './components/BottomDock';
import { DockAppModal } from './components/DockAppModal';
import { ExploreProductsModal } from './components/ExploreProductsModal';
import { HeroLogo } from './components/HeroLogo';
import { JoinCreatorSection } from './components/JoinCreatorSection';
import { LeftLightBulb } from './components/LeftLightBulb';
import { OurStoryPage } from './components/OurStoryPage';
import { PixelPillButton } from './components/PixelPillButton';
import { RightCharacter } from './components/RightCharacter';
import { WhoAreWeSection } from './components/WhoAreWeSection';
import {
  INITIAL_BACKED_IDS,
  toggleBackedItem,
  type DockAppId,
} from './data/moharData';

export default function App() {
  const [page, setPage] = useState<'home' | 'our-story'>(() =>
    typeof window !== 'undefined' && window.location.hash === '#our-story'
      ? 'our-story'
      : 'home'
  );
  const [exploreOpen, setExploreOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [activeDockApp, setActiveDockApp] = useState<DockAppId | null>(null);
  const [session, setSession] = useState<UserSession | null>(null);
  const [backedIds, setBackedIds] = useState<string[]>(INITIAL_BACKED_IDS);

  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash === '#our-story' ? 'our-story' : 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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

  const openOurStoryPage = () => {
    setExploreOpen(false);
    setAuthOpen(false);
    setActiveDockApp(null);
    setPage('our-story');
    if (window.location.hash !== '#our-story') {
      window.history.pushState(null, '', '#our-story');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const returnHome = () => {
    setPage('home');
    if (window.location.hash === '#our-story') {
      window.history.pushState(null, '', window.location.pathname || '/');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleDockSelect = (appId: DockAppId) => {
    if (appId === 'our-story') {
      openOurStoryPage();
      return;
    }
    if (appId === 'explore') {
      setActiveDockApp(null);
      setExploreOpen(true);
      return;
    }
    setActiveDockApp((current) => (current === appId ? null : appId));
  };

  const handleToggleBacked = (productId: string) => {
    setBackedIds((prev) => toggleBackedItem(prev, productId));
  };

  const handleJumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (page === 'our-story') {
    return <OurStoryPage onBack={returnHome} />;
  }

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
              onSelectApp={handleDockSelect}
            />
          </footer>
        </div>
      </section>

      {/* Section 2: WHO ARE WE? */}
      <WhoAreWeSection />

      {/* Section 3: JOIN AS CREATOR */}
      <JoinCreatorSection />

      {/* Interactive Modals */}
      <ExploreProductsModal
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        backedIds={backedIds}
        onToggleBacked={handleToggleBacked}
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
        backedIds={backedIds}
        onToggleBacked={handleToggleBacked}
        onJumpToSection={handleJumpToSection}
      />
    </div>
  );
}
