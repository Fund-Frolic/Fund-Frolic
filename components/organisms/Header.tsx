/**
 * Header Component
 *
 * Main site header with logo, navigation, and CTA.
 * Design system colors: primary (blue), accent (gold), semantic tokens.
 * Spacing: 8-point grid aligned.
 */

'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { useEffect, useState } from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional custom className for styling
   */
  className?: string;
}

export const Header = ({
  className,
  ...props
}: HeaderProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Track scroll position
      setScrollY(window.scrollY);

      // Track active section
      const sections = ['home', 'services', 'story'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isScrolled = scrollY > 20;

  return (
    <header
      className={cn(
        "fixed left-6 right-6 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "top-6" : "top-12",
        className
      )}
      {...props}
    >
      <div className={cn(
        "relative mx-auto rounded-[20px] overflow-hidden transition-all ease-in-out",
        isScrolled
          ? "w-fit shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08),0_32px_64px_-12px_rgba(37,99,235,0.04)] duration-500"
          : "max-w-7xl shadow-none duration-300"
      )}>
        {/* Floating card background - fades in when scrolled */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-background-elevated via-background to-background-elevated backdrop-blur-md transition-opacity duration-500 ease-in-out",
            isScrolled ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Subtle texture overlay - only when scrolled */}
        {isScrolled && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />
        )}

        <div className={cn(
          "relative py-4 flex items-center",
          isScrolled ? "px-6 gap-4" : "px-8 justify-between"
        )}>
          {/* Logo with icon */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-primary via-blue-600 to-blue-700 rounded-[12px] flex items-center justify-center shadow-[0_1px_2px_rgba(37,99,235,0.25),0_4px_8px_rgba(37,99,235,0.20),0_12px_24px_rgba(37,99,235,0.12)]">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              Fund Frolic
            </span>
          </div>

          {/* Vertical divider - only when scrolled */}
          {isScrolled && (
            <div className="h-8 w-px bg-border flex-shrink-0" />
          )}

          {/* Navigation Links */}
          <nav className={cn(
            "hidden md:flex items-center",
            isScrolled ? "gap-4" : "gap-6"
          )}>
            <button
              onClick={() => scrollToSection('home')}
              className={cn(
                "relative font-body text-sm font-medium transition-colors duration-200 pb-1",
                activeSection === 'home'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Home
              {activeSection === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-blue-600 to-blue-700 rounded-full shadow-[0_1px_4px_rgba(37,99,235,0.4)]" />
              )}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={cn(
                "relative font-body text-sm font-medium transition-colors duration-200 pb-1",
                activeSection === 'services'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Services
              {activeSection === 'services' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-blue-600 to-blue-700 rounded-full shadow-[0_1px_4px_rgba(37,99,235,0.4)]" />
              )}
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className={cn(
                "relative font-body text-sm font-medium transition-colors duration-200 pb-1",
                activeSection === 'story'
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Our Story
              {activeSection === 'story' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-blue-600 to-blue-700 rounded-full shadow-[0_1px_4px_rgba(37,99,235,0.4)]" />
              )}
            </button>
          </nav>

          {/* CTA */}
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";
