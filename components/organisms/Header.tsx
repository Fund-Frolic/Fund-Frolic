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
import { useFormHighlight } from '@/lib/contexts/FormHighlightContext';

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
  const [isScrolling, setIsScrolling] = useState(false);
  const { triggerHighlight } = useFormHighlight();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsScrolling(true);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Account for fixed header height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Re-enable scroll listener after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Track scroll position
      setScrollY(window.scrollY);

      // Skip active section detection during programmatic scrolling
      if (isScrolling) return;

      // Track active section
      const sections = ['home', 'services', 'story'];
      const scrollPosition = window.scrollY + 150; // Account for header offset

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
  }, [isScrolling]);

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
        {/* Floating card background - always visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-elevated via-background to-background-elevated backdrop-blur-md" />

        {/* Subtle texture overlay - only when scrolled */}
        {isScrolled && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />
        )}

        <div className={cn(
          "relative py-4 flex items-center",
          isScrolled ? "px-6 gap-4" : "px-8 justify-between"
        )}>
          {/* Logo */}
          <div className="flex items-center">
            <svg className="h-8 w-auto" viewBox="0 0 711.19 108.67" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style>{`
                  .cls-1 { fill: #2563eb; }
                  .cls-2 { fill: #fbbf24; }
                `}</style>
              </defs>
              <g>
                <path className="cls-1" d="M173.35,119.37V54.14h-12.82c-1.31,0-2.37-1.06-2.37-2.37v-13.77c0-1.31,1.06-2.37,2.37-2.37h12.82v-2.69c0-6.65,1.32-12.27,3.96-16.86,2.64-4.59,6.41-8.1,11.32-10.53,4.91-2.43,10.69-3.64,17.33-3.64,1.27,0,2.66.08,4.2.24.66.07,1.27.14,1.84.22,1.17.16,2.04,1.17,2.04,2.35v13.14c0,1.38-1.18,2.48-2.56,2.37-.12-.01-.25-.02-.37-.03-.9-.05-1.72-.08-2.45-.08-4.65,0-8.23,1.03-10.77,3.09-2.53,2.06-3.8,5.3-3.8,9.74v2.69h16.78c1.31,0,2.37,1.06,2.37,2.37v13.77c0,1.31-1.06,2.37-2.37,2.37h-16.78v65.22c0,1.31-1.06,2.37-2.37,2.37h-15.99c-1.31,0-2.37-1.06-2.37-2.37Z"/>
                <path className="cls-1" d="M258.36,121.74c-6.76,0-12.56-1.48-17.41-4.43-4.86-2.95-8.6-7.07-11.24-12.35-2.64-5.28-3.96-11.45-3.96-18.52v-50.34c0-1.31,1.06-2.37,2.37-2.37h16.15c1.31,0,2.37,1.06,2.37,2.37v48.6c0,3.59.71,6.73,2.14,9.42s3.48,4.8,6.17,6.33c2.69,1.53,5.72,2.3,9.1,2.3s6.38-.76,9.02-2.3c2.64-1.53,4.69-3.67,6.17-6.41,1.48-2.74,2.22-6.02,2.22-9.82v-48.13c0-1.31,1.06-2.37,2.37-2.37h15.99c1.31,0,2.37,1.06,2.37,2.37v81.37c0,1.31-1.06,2.37-2.37,2.37h-14.88c-1.31,0-2.37-1.06-2.37-2.37v-14.56l1.58,3.01c-2.01,5.28-5.28,9.24-9.82,11.87-4.54,2.64-9.87,3.96-15.99,3.96Z"/>
                <path className="cls-1" d="M318.9,119.37V37.99c0-1.31,1.06-2.37,2.37-2.37h14.88c1.31,0,2.37,1.06,2.37,2.37v14.56l-1.58-3.01c2-5.17,5.3-9.1,9.89-11.79,4.59-2.69,9.95-4.04,16.07-4.04s11.95,1.37,16.86,4.12c4.91,2.75,8.73,6.57,11.48,11.48,2.74,4.91,4.12,10.58,4.12,17.02v53.03c0,1.31-1.06,2.37-2.37,2.37h-15.99c-1.31,0-2.37-1.06-2.37-2.37v-48.13c0-3.8-.74-7.07-2.22-9.82-1.48-2.74-3.54-4.85-6.17-6.33-2.64-1.48-5.65-2.22-9.02-2.22s-6.39.74-9.02,2.22c-2.64,1.48-4.7,3.59-6.17,6.33-1.48,2.75-2.22,6.02-2.22,9.82v48.13c0,1.31-1.06,2.37-2.37,2.37h-16.15c-1.31,0-2.37-1.06-2.37-2.37Z"/>
                <path className="cls-1" d="M449.83,121.74c-8.34,0-15.81-1.98-22.4-5.94-6.6-3.96-11.79-9.36-15.59-16.23-3.8-6.86-5.7-14.46-5.7-22.8s1.92-16.04,5.78-22.8c3.85-6.75,9.05-12.14,15.59-16.15,6.54-4.01,13.93-6.02,22.16-6.02,6.54,0,12.37,1.29,17.49,3.88,5.12,2.59,9.15,6.2,12.11,10.84l-3.17,4.27V2.37c0-1.31,1.06-2.37,2.37-2.37h15.99c1.31,0,2.37,1.06,2.37,2.37v115.09c0,1.31-1.06,2.37-2.37,2.37h-14.88c-1.31,0-2.37-1.06-2.37-2.37v-14.25l2.22,4.12c-2.96,4.75-7.07,8.34-12.35,10.76-5.28,2.43-11.03,3.64-17.26,3.64ZM452.04,102.74c4.64,0,8.79-1.11,12.43-3.32,3.64-2.22,6.49-5.28,8.55-9.18,2.06-3.9,3.09-8.39,3.09-13.46s-1.03-9.39-3.09-13.3c-2.06-3.9-4.91-6.97-8.55-9.18-3.64-2.22-7.78-3.32-12.43-3.32s-8.81,1.11-12.51,3.32c-3.7,2.22-6.57,5.28-8.63,9.18-2.06,3.91-3.09,8.34-3.09,13.3s1.03,9.55,3.09,13.46c2.06,3.91,4.93,6.97,8.63,9.18,3.69,2.22,7.86,3.32,12.51,3.32Z"/>
                <path className="cls-1" d="M548.6,119.37V54.14h-12.82c-1.31,0-2.37-1.06-2.37-2.37v-13.77c0-1.31,1.06-2.37,2.37-2.37h12.82v-2.69c0-6.65,1.32-12.27,3.96-16.86,2.64-4.59,6.41-8.1,11.32-10.53,4.91-2.43,10.69-3.64,17.33-3.64,1.27,0,2.66.08,4.2.24.66.07,1.27.14,1.84.22,1.17.16,2.04,1.17,2.04,2.35v13.14c0,1.38-1.18,2.48-2.56,2.37-.13-.01-.25-.02-.37-.03-.9-.05-1.72-.08-2.45-.08-4.65,0-8.23,1.03-10.77,3.09-2.53,2.06-3.8,5.3-3.8,9.74v2.69h16.78c1.31,0,2.37,1.06,2.37,2.37v13.77c0,1.31-1.06,2.37-2.37,2.37h-16.78v65.22c0,1.31-1.06,2.37-2.37,2.37h-15.99c-1.31,0-2.37-1.06-2.37-2.37Z"/>
                <path className="cls-1" d="M598.52,119.37V37.99c0-1.31,1.06-2.37,2.37-2.37h14.88c1.31,0,2.37,1.06,2.37,2.37v16.78l-1.58-2.85c2-6.44,5.15-10.92,9.42-13.46,4.27-2.53,9.42-3.8,15.44-3.8h2.69c1.31,0,2.37,1.06,2.37,2.37v13.77c0,1.31-1.06,2.37-2.37,2.37h-5.07c-5.91,0-10.66,1.8-14.25,5.38s-5.38,8.65-5.38,15.2v45.59c0,1.31-1.06,2.37-2.37,2.37h-16.15c-1.31,0-2.37-1.06-2.37-2.37Z"/>
                <path className="cls-1" d="M692.84,121.74c-8.34,0-15.96-1.95-22.88-5.86-6.91-3.9-12.43-9.23-16.54-15.99-4.12-6.75-6.17-14.46-6.17-23.11s2.06-16.36,6.17-23.11c4.12-6.75,9.6-12.08,16.46-15.99,6.86-3.9,14.51-5.86,22.95-5.86s16.25,1.95,23.11,5.86c6.86,3.91,12.32,9.21,16.39,15.91,4.06,6.7,6.09,14.43,6.09,23.19s-2.06,16.36-6.17,23.11c-4.12,6.76-9.6,12.09-16.46,15.99-6.86,3.91-14.51,5.86-22.96,5.86ZM692.84,102.74c4.75,0,8.89-1.11,12.43-3.32,3.53-2.22,6.33-5.3,8.39-9.26s3.09-8.42,3.09-13.38-1.03-9.39-3.09-13.3c-2.06-3.9-4.86-6.97-8.39-9.18-3.54-2.22-7.68-3.32-12.43-3.32s-8.76,1.11-12.35,3.32c-3.59,2.22-6.41,5.28-8.47,9.18-2.06,3.91-3.09,8.34-3.09,13.3s1.03,9.42,3.09,13.38,4.88,7.04,8.47,9.26c3.59,2.22,7.7,3.32,12.35,3.32Z"/>
                <path className="cls-1" d="M750.07,119.37V4.27c0-1.31,1.06-2.37,2.37-2.37h16.15c1.31,0,2.37,1.06,2.37,2.37v115.09c0,1.31-1.06,2.37-2.37,2.37h-16.15c-1.31,0-2.37-1.06-2.37-2.37Z"/>
                <path className="cls-1" d="M788.2,23.59V6.17c0-1.31,1.06-2.37,2.37-2.37h16.15c1.31,0,2.37,1.06,2.37,2.37v17.41c0,1.31-1.06,2.37-2.37,2.37h-16.15c-1.31,0-2.37-1.06-2.37-2.37ZM788.2,119.37V37.99c0-1.31,1.06-2.37,2.37-2.37h16.15c1.31,0,2.37,1.06,2.37,2.37v81.37c0,1.31-1.06,2.37-2.37,2.37h-16.15c-1.31,0-2.37-1.06-2.37-2.37Z"/>
                <path className="cls-1" d="M865.09,121.74c-8.66,0-16.36-1.98-23.11-5.94-6.76-3.96-12.11-9.34-16.07-16.15s-5.94-14.49-5.94-23.03,1.95-16.2,5.86-22.95c3.9-6.75,9.26-12.08,16.07-15.99,6.81-3.9,14.54-5.86,23.19-5.86,6.12,0,11.82,1.08,17.1,3.25,5.28,2.16,9.84,5.15,13.69,8.94,3.29,3.24,5.79,6.95,7.5,11.12.49,1.19-.05,2.56-1.23,3.09l-13.91,6.17c-1.18.52-2.59.03-3.14-1.14-1.62-3.44-3.99-6.23-7.11-8.39-3.75-2.58-8.05-3.88-12.9-3.88-4.54,0-8.58,1.08-12.11,3.25-3.54,2.16-6.31,5.22-8.31,9.18-2.01,3.96-3.01,8.42-3.01,13.38s1,9.55,3.01,13.46c2,3.91,4.77,6.97,8.31,9.18,3.53,2.22,7.57,3.32,12.11,3.32,4.96,0,9.26-1.32,12.9-3.96,3.04-2.2,5.4-5.03,7.07-8.48.56-1.16,1.94-1.67,3.12-1.14l13.96,6.31c1.18.53,1.71,1.91,1.21,3.1-1.7,3.99-4.17,7.62-7.39,10.88-3.8,3.85-8.34,6.86-13.61,9.02-5.28,2.16-11.03,3.25-17.26,3.25Z"/>
              </g>
              <path className="cls-2" d="M124.91,15.95c-.09-.08-.18-.15-.27-.23-1.1-.94-2.14-1.75-3.13-2.43-5.16-3.56-10.29-5.72-15.39-6.46-5.11-.75-9.91-.05-14.42,2.1-4.51,2.15-8.54,5.8-12.1,10.95l-1.44,2.09-8.71-6.02c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l8.62,5.95-26.29,38.05-11.78-8.14c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l11.78,8.14-1.44,2.09c-2.37,3.44-5.1,5.28-8.16,5.51-3.07.24-6.4-.88-10-3.37-.57-.39-1.19-.85-1.86-1.38,0,0-.01-.01-.02-.02-1.16-.91-2.84-.71-3.68.51l-6.11,8.85c-1.08,1.56-.82,3.69.61,4.93.09.08.18.15.27.23,1.1.94,2.14,1.75,3.13,2.43,5.16,3.56,10.29,5.72,15.39,6.46,5.11.75,9.91.05,14.42-2.1,4.51-2.15,8.54-5.8,12.1-10.95l1.44-2.09,8.71,6.02c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-8.62-5.95,26.29-38.05,11.78,8.14c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-11.78-8.14,1.44-2.09c2.37-3.44,5.1-5.28,8.16-5.51,3.07-.24,6.4.88,10,3.37.57.39,1.19.85,1.86,1.38,0,0,.01.01.02.02,1.16.91,2.84.71,3.68-.51l6.11-8.85c1.08-1.56.82-3.69-.61-4.93Z"/>
            </svg>
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
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              const element = document.getElementById('home');
              if (element) {
                const offset = 120;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
                triggerHighlight();
              }
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.displayName = "Header";
