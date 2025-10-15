/**
 * HeroSection Component
 *
 * Landing page hero section with headline, value proposition, and key features.
 * Left side displays marketing copy, right side reserved for visual content.
 * Design system colors: primary (blue), accent (gold), semantic tokens.
 * Spacing: 8-point grid aligned.
 */

'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/atoms/Badge';
import { useEffect, useState, useRef } from 'react';

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional custom className for styling
   */
  className?: string;
}

export const HeroSection = ({
  className,
  ...props
}: HeroSectionProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;

      // Progress from 0 to 1 as we scroll from top to halfway through section 1
      // At scrollY = 0: progress = 0 (hills fully visible)
      // At scrollY = sectionHeight / 2: progress = 1 (hills fully slid out)
      const progress = Math.max(0, Math.min(1, scrollY / (sectionHeight / 2)));

      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={cn(
        "relative w-full min-h-screen flex items-center px-6 md:px-12",
        className
      )}
      {...props}
    >
      {/* Rolling hills at bottom of hero section */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* RollingHillOne - slides left */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[1600px]"
          style={{
            transform: `translate3d(${-scrollProgress * 100}%, 0, 0)`,
            opacity: 1 - scrollProgress,
            willChange: 'transform, opacity'
          }}
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 260 C200 280, 400 330, 600 400 C800 470, 1000 530, 1200 565 C1300 582, 1370 592, 1440 598 L1440 600 L0 600 Z"
            fill="#FFFBEB"
          />
        </svg>

        {/* RollingHillTwo - slides right */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[1300px]"
          style={{
            transform: `translate3d(${scrollProgress * 100}%, 0, 0)`,
            opacity: 1 - scrollProgress,
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 -4px 12px rgba(251, 191, 36, 0.3)) drop-shadow(0 -8px 24px rgba(251, 191, 36, 0.2))'
          }}
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1440 296 C1240 316, 1040 366, 840 436 C640 506, 440 566, 240 594 C140 608, 70 598, 0 598 L0 600 L1440 600 Z"
            fill="#FEF3C7"
          />
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto w-full z-10 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Marketing copy */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge variant="warning" size="md" className="font-semibold tracking-wide">
              MEET FUND FROLIC
            </Badge>

            {/* Main headline with strategic color */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
              The funding buddy you actually want on your team.
            </h1>

            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
              Millions in federal, state, and private grants go unclaimed every year… and a bunch of them could be perfect for your startup. Type your project idea into our{' '}
              <span className="font-semibold text-primary">AI Grant Finder</span>, and we'll match you with the grants that actually make sense for you. No equity. No shady term sheets. Just funding opportunities that let you scale fast, stay in control, and actually enjoy the ride.
            </p>
          </div>

          {/* Right side - AI Chat Interface */}
          <div className="w-full h-[400px] lg:h-[600px]">
            {/* Main container with sophisticated floating elevation */}
            <div className="relative w-full h-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-[24px] shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08),0_32px_64px_-12px_rgba(37,99,235,0.04)] backdrop-blur-md flex flex-col overflow-hidden">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

              {/* Chat header - minimal and ethereal */}
              <div className="relative z-10 px-8 py-4 bg-gradient-to-b from-background-elevated/60 to-transparent backdrop-blur-xl flex items-center gap-3 border-b border-border/50">
                <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-primary via-blue-600 to-blue-700 rounded-[14px] flex items-center justify-center shadow-[0_1px_2px_rgba(37,99,235,0.25),0_4px_8px_rgba(37,99,235,0.20),0_12px_24px_rgba(37,99,235,0.12)]">
                  <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-body text-base font-medium text-foreground">
                    AI Grant Finder
                  </h3>
                  <p className="font-body text-sm text-muted-foreground/60 mt-0.5">
                    Powered by Fund Frolic
                  </p>
                </div>
              </div>

              {/* Chat messages with refined spacing */}
              <div className="relative z-0 flex-1 px-10 py-10 space-y-8 overflow-y-auto">
                {/* AI Message - Enhanced greeting */}
                <div className="flex items-start gap-5 animate-in fade-in slide-in-from-left duration-500">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-[12px] flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1 max-w-[82%]">
                    <div className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/60 rounded-[20px] rounded-tl-sm px-6 py-5 shadow-[0_1px_2px_rgba(37,99,235,0.10),0_4px_12px_-2px_rgba(37,99,235,0.08),0_12px_24px_-4px_rgba(37,99,235,0.05),0_20px_40px_-8px_rgba(37,99,235,0.03)]">
                      <p className="font-body text-base text-foreground leading-[1.7]">
                        Hi! I'm your AI grant finder. Tell me about your startup or project, and I'll find matching grants for you.
                      </p>
                    </div>
                    <span className="font-body text-xs text-muted-foreground/80 mt-3 ml-2 inline-block">
                      Just now
                    </span>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-5 justify-end animate-in fade-in slide-in-from-right duration-500">
                  <div className="flex-1 max-w-[82%] text-right">
                    <div className="inline-block bg-gradient-to-br from-background-elevated to-background/95 rounded-[20px] rounded-tr-sm px-6 py-5 shadow-[0_1px_2px_rgba(107,114,128,0.08),0_4px_12px_-2px_rgba(107,114,128,0.06),0_12px_24px_-4px_rgba(107,114,128,0.04),0_20px_40px_-8px_rgba(107,114,128,0.02)]">
                      <p className="font-body text-base text-foreground leading-[1.7] text-left">
                        I'm building a climate tech startup focused on carbon capture technology for small businesses.
                      </p>
                    </div>
                    <span className="font-body text-xs text-muted-foreground/80 mt-3 mr-2 inline-block">
                      Just now
                    </span>
                  </div>
                </div>

                {/* AI Response with grants - Enhanced elevation */}
                <div className="flex items-start gap-5 animate-in fade-in slide-in-from-left duration-500">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-[12px] flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1 max-w-[82%]">
                    <div className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/60 rounded-[20px] rounded-tl-sm px-6 py-5 shadow-[0_1px_2px_rgba(37,99,235,0.10),0_4px_12px_-2px_rgba(37,99,235,0.08),0_12px_24px_-4px_rgba(37,99,235,0.05),0_20px_40px_-8px_rgba(37,99,235,0.03)]">
                      <p className="font-body text-base text-foreground leading-[1.7] mb-5">
                        Great! I found <span className="font-semibold text-primary">3 matching grants</span> for your climate tech startup:
                      </p>

                      {/* Grant card 1 - Premium elevation */}
                      <div className="group bg-background rounded-[16px] p-5 mb-4 shadow-[0_1px_2px_rgba(59,130,246,0.08),0_4px_8px_-2px_rgba(59,130,246,0.06),0_8px_16px_-4px_rgba(59,130,246,0.04),0_16px_32px_-8px_rgba(59,130,246,0.02)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.12),0_8px_16px_-2px_rgba(37,99,235,0.10),0_16px_32px_-4px_rgba(37,99,235,0.08),0_24px_48px_-8px_rgba(37,99,235,0.06)] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-start justify-between gap-4 mb-2.5">
                          <h4 className="font-body text-[15px] font-semibold text-foreground leading-[1.5] group-hover:text-primary transition-colors duration-300">
                            DOE Small Business Innovation Research
                          </h4>
                          <span className="flex-shrink-0 px-3.5 py-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-white text-xs font-bold rounded-full shadow-[0_1px_2px_rgba(245,158,11,0.30),0_4px_8px_rgba(245,158,11,0.25),0_8px_16px_rgba(245,158,11,0.15)]">
                            $250K
                          </span>
                        </div>
                        <p className="font-body text-[13px] text-muted-foreground leading-[1.6]">
                          Federal • 94% match • Deadline: Jan 15
                        </p>
                      </div>

                      {/* Grant card 2 */}
                      <div className="group bg-background rounded-[16px] p-5 mb-4 shadow-[0_1px_2px_rgba(59,130,246,0.08),0_4px_8px_-2px_rgba(59,130,246,0.06),0_8px_16px_-4px_rgba(59,130,246,0.04),0_16px_32px_-8px_rgba(59,130,246,0.02)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.12),0_8px_16px_-2px_rgba(37,99,235,0.10),0_16px_32px_-4px_rgba(37,99,235,0.08),0_24px_48px_-8px_rgba(37,99,235,0.06)] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-start justify-between gap-4 mb-2.5">
                          <h4 className="font-body text-[15px] font-semibold text-foreground leading-[1.5] group-hover:text-primary transition-colors duration-300">
                            EPA Climate Tech Innovation Fund
                          </h4>
                          <span className="flex-shrink-0 px-3.5 py-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-white text-xs font-bold rounded-full shadow-[0_1px_2px_rgba(245,158,11,0.30),0_4px_8px_rgba(245,158,11,0.25),0_8px_16px_rgba(245,158,11,0.15)]">
                            $500K
                          </span>
                        </div>
                        <p className="font-body text-[13px] text-muted-foreground leading-[1.6]">
                          Federal • 91% match • Deadline: Feb 1
                        </p>
                      </div>

                      {/* Grant card 3 */}
                      <div className="group bg-background rounded-[16px] p-5 shadow-[0_1px_2px_rgba(59,130,246,0.08),0_4px_8px_-2px_rgba(59,130,246,0.06),0_8px_16px_-4px_rgba(59,130,246,0.04),0_16px_32px_-8px_rgba(59,130,246,0.02)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.12),0_8px_16px_-2px_rgba(37,99,235,0.10),0_16px_32px_-4px_rgba(37,99,235,0.08),0_24px_48px_-8px_rgba(37,99,235,0.06)] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-start justify-between gap-4 mb-2.5">
                          <h4 className="font-body text-[15px] font-semibold text-foreground leading-[1.5] group-hover:text-primary transition-colors duration-300">
                            California Clean Energy Grant
                          </h4>
                          <span className="flex-shrink-0 px-3.5 py-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-white text-xs font-bold rounded-full shadow-[0_1px_2px_rgba(245,158,11,0.30),0_4px_8px_rgba(245,158,11,0.25),0_8px_16px_rgba(245,158,11,0.15)]">
                            $150K
                          </span>
                        </div>
                        <p className="font-body text-[13px] text-muted-foreground leading-[1.6]">
                          State • 88% match • Deadline: Jan 30
                        </p>
                      </div>
                    </div>
                    <span className="font-body text-xs text-muted-foreground/80 mt-3 ml-2 inline-block">
                      Just now
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat input with refined polish */}
              <div className="relative z-10 px-10 py-8 bg-gradient-to-t from-background-elevated/95 via-background-elevated/70 to-transparent backdrop-blur-md border-t border-border/40">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Describe your startup or project..."
                    className="flex-1 px-6 py-4 bg-background/90 backdrop-blur-sm rounded-[18px] font-body text-[15px] text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:shadow-[0_2px_4px_rgba(37,99,235,0.10),0_8px_16px_-2px_rgba(37,99,235,0.12),0_16px_32px_-4px_rgba(37,99,235,0.08),inset_0_1px_2px_rgb(255,255,255,0.8)] transition-all duration-300"
                    disabled
                  />
                  <button
                    className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_6px_12px_rgba(37,99,235,0.20),0_12px_24px_-2px_rgba(37,99,235,0.15),0_20px_40px_-4px_rgba(37,99,235,0.10)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_8px_16px_rgba(37,99,235,0.25),0_16px_32px_-2px_rgba(37,99,235,0.20),0_24px_48px_-4px_rgba(37,99,235,0.12)] hover:scale-105 active:scale-95"
                    disabled
                    aria-label="Send message"
                  >
                    <svg className="w-6 h-6 text-primary-foreground drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";
