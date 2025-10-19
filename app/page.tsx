'use client';

import { Header } from "@/components/organisms/Header";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ServicesSection } from "@/components/organisms/ServicesSection";
import { StorySection } from "@/components/organisms/StorySection";
import { CTASection } from "@/components/organisms/CTASection";
import { Footer } from "@/components/organisms/Footer";
import { RollingHills } from "@/components/decorative/RollingHills";
import { ViewStateProvider, useViewState } from "@/lib/contexts/ViewStateContext";
import { FormHighlightProvider } from "@/lib/contexts/FormHighlightContext";
import { BottomSheetProvider } from "@/lib/contexts/BottomSheetContext";

function HomeContent() {
  const { viewState, setViewState, setGrantResults, setSearchRequest } = useViewState();
  // Only show marketing sections when in form or loading view
  const showMarketingSections = viewState === 'form' || viewState === 'loading';

  const handleStartOver = () => {
    // Reset to form view
    setViewState('form');
    // Clear grant results and search request
    setGrantResults(null);
    setSearchRequest(null);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    // Go to contact form without grant results (standalone contact)
    setViewState('contact');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 lg:px-6 pt-24 md:pt-36 lg:pt-40">
      <div className="relative bg-gradient-to-br from-blue-50 via-background to-gold-50 rounded-t-[32px] shadow-[0_-4px_24px_rgba(0,0,0,0.08),0_-8px_48px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Racing Stripes Background SVG */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute w-full h-[150%] opacity-40"
            style={{ top: '-25%', transform: 'rotate(5deg)' }}
            viewBox="0 0 2477.43 7440.35"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffc500"
              d="M1526.65,0L386.77,7266.17l245.48,74.65L1772.13,74.65,1526.65,0ZM1853.97,99.52L714.09,7365.7l245.48,74.65L2099.45,174.17l-245.49-74.65Z"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <Header viewState={viewState} onLogoClick={handleStartOver} onContactClick={handleContactClick} />
          <HeroSection />

          {/* Only show marketing sections when in form/loading view */}
          {showMarketingSections && (
            <>
              <ServicesSection />
              <StorySection />
              <CTASection />
            </>
          )}

          <Footer onLogoClick={handleStartOver} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ViewStateProvider>
      <FormHighlightProvider>
        <BottomSheetProvider>
          <HomeContent />
        </BottomSheetProvider>
      </FormHighlightProvider>
    </ViewStateProvider>
  );
}
