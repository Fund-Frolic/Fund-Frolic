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

function HomeContent() {
  const { viewState } = useViewState();
  // Only show marketing sections when in form or loading view
  const showMarketingSections = viewState === 'form' || viewState === 'loading';

  return (
    <div className="min-h-screen bg-gray-100 px-6 pt-40">
      <div className="relative bg-gradient-to-br from-blue-50 via-background to-gold-50 rounded-t-[32px] shadow-[0_-4px_24px_rgba(0,0,0,0.08),0_-8px_48px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="relative z-10">
          <Header />
          <HeroSection />

          {/* Only show marketing sections when in form/loading view */}
          {showMarketingSections && (
            <>
              <ServicesSection />
              <StorySection />
              <CTASection />
            </>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ViewStateProvider>
      <FormHighlightProvider>
        <HomeContent />
      </FormHighlightProvider>
    </ViewStateProvider>
  );
}
