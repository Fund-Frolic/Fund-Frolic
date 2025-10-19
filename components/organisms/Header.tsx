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
import { useBottomSheet } from '@/lib/contexts/BottomSheetContext';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional custom className for styling
   */
  className?: string;
  /**
   * Current view state to determine header behavior
   */
  viewState?: 'form' | 'loading' | 'results' | 'contact' | 'success';
  /**
   * Callback when logo is clicked (start over)
   */
  onLogoClick?: () => void;
  /**
   * Callback when Contact link is clicked
   */
  onContactClick?: () => void;
}

export const Header = ({
  className,
  viewState = 'form',
  onLogoClick,
  onContactClick,
  ...props
}: HeaderProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { triggerHighlight } = useFormHighlight();
  const { openBottomSheet, openContactBottomSheet } = useBottomSheet();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsScrolling(true);
    // If currently in contact view, go back to form view first
    if (onLogoClick && (sectionId === 'home' || sectionId === 'services' || sectionId === 'story')) {
      onLogoClick(); // This resets to form view
    }
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
    // Check if mobile on mount and resize
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      // Close mobile menu when resizing to desktop
      if (!newIsMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

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
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling, isMobileMenuOpen]);

  const isScrolled = scrollY > 20;
  const showNavLinks = viewState === 'form' || viewState === 'loading' || viewState === 'contact';
  const isResultsView = viewState === 'results' || viewState === 'success';

  return (
    <header
      className={cn(
        "fixed left-2 right-2 md:left-6 md:right-6 z-50 transition-all duration-300 ease-in-out",
        "top-4 md:top-12",
        isScrolled && "md:top-6",
        className
      )}
      {...props}
    >
      <div className={cn(
        "relative mx-auto rounded-2xl md:rounded-[20px] overflow-hidden transition-all ease-in-out",
        isScrolled
          ? "w-fit shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08),0_32px_64px_-12px_rgba(37,99,235,0.04)] duration-500"
          : "max-w-7xl shadow-[0_1px_2px_rgba(37,99,235,0.08)] md:shadow-none duration-300"
      )}>
        {/* Floating card background - always visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-elevated via-background to-background-elevated backdrop-blur-md" />

        {/* Subtle texture overlay - only when scrolled */}
        {isScrolled && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />
        )}

        <div className={cn(
          "relative py-3 md:py-4 flex items-center",
          isScrolled ? "px-4 md:px-6 gap-4" : "px-4 md:px-8 justify-between"
        )}>
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center transition-opacity hover:opacity-80 duration-200"
            aria-label="Start over"
          >
            {/* Mobile: always show compact logo. Desktop: compact when scrolled, full when not scrolled */}
            {isScrolled || isMobile ? (
              // Compact logo - symbol only
              <svg className="h-8 w-auto" viewBox="0 0 126.19 108.67" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fbbf24" d="M124.91,9.41c-.09-.08-.18-.15-.27-.23-1.1-.94-2.14-1.75-3.13-2.43-5.16-3.56-10.29-5.72-15.39-6.46-5.11-.75-9.91-.05-14.42,2.1-4.51,2.15-8.54,5.8-12.1,10.95l-1.44,2.09-8.71-6.02c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l8.62,5.95-26.29,38.05-11.78-8.14c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l11.78,8.14-1.44,2.09c-2.37,3.44-5.1,5.28-8.16,5.51-3.07.24-6.4-.88-10-3.37-.57-.39-1.19-.85-1.86-1.38,0,0-.01-.01-.02-.02-1.16-.91-2.84-.71-3.68.51l-6.11,8.85c-1.08,1.56-.82,3.69.61,4.93.09.08.18.15.27.23,1.1.94,2.14,1.75,3.13,2.43,5.16,3.56,10.29,5.72,15.39,6.46,5.11.75,9.91.05,14.42-2.1,4.51-2.15,8.54-5.8,12.1-10.95l1.44-2.09,8.71,6.02c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-8.62-5.95,26.29-38.05,11.78,8.14c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-11.78-8.14,1.44-2.09c2.37-3.44,5.1-5.28,8.16-5.51,3.07-.24,6.4.88,10,3.37.57.39,1.19.85,1.86,1.38,0,0,.01.01.02.02,1.16.91,2.84.71,3.68-.51l6.11-8.85c1.08-1.56.82-3.69-.61-4.93Z"/>
              </svg>
            ) : (
              // Full logo with text
              <svg id="Layer_1" data-name="Layer 1" className="h-8 w-auto" viewBox="0 0 711.19 108.67" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>{`
                    .cls-1 {
                      fill: #2563eb;
                    }
                    .cls-2 {
                      fill: #fbbf24;
                    }
                  `}</style>
                </defs>
                <g>
                  <path className="cls-1" d="M159.05,98.57v-49.32h-9.7c-.99,0-1.8-.8-1.8-1.8v-10.41c0-.99.8-1.8,1.8-1.8h9.7v-2.03c0-5.03,1-9.28,2.99-12.75,1.99-3.47,4.85-6.12,8.56-7.96,3.71-1.83,8.08-2.75,13.11-2.75.96,0,2.01.06,3.17.18.5.05.96.11,1.39.17.89.12,1.54.88,1.54,1.78v9.93c0,1.05-.89,1.87-1.93,1.79-.09,0-.19-.01-.28-.02-.68-.04-1.3-.06-1.86-.06-3.51,0-6.22.78-8.14,2.33-1.92,1.56-2.87,4.01-2.87,7.36v2.03h12.69c.99,0,1.8.8,1.8,1.8v10.41c0,.99-.8,1.8-1.8,1.8h-12.69v49.32c0,.99-.8,1.8-1.8,1.8h-12.09c-.99,0-1.8-.8-1.8-1.8Z"/>
                  <path className="cls-1" d="M223.33,100.36c-5.11,0-9.5-1.12-13.17-3.35-3.67-2.23-6.51-5.35-8.5-9.34-2-3.99-2.99-8.66-2.99-14.01v-38.07c0-.99.8-1.8,1.8-1.8h12.21c.99,0,1.8.8,1.8,1.8v36.75c0,2.71.54,5.09,1.62,7.12s2.63,3.63,4.67,4.79c2.04,1.16,4.33,1.74,6.88,1.74s4.83-.58,6.82-1.74c1.99-1.16,3.55-2.77,4.67-4.85,1.12-2.07,1.68-4.55,1.68-7.42v-36.39c0-.99.8-1.8,1.8-1.8h12.09c.99,0,1.8.8,1.8,1.8v61.53c0,.99-.8,1.8-1.8,1.8h-11.25c-.99,0-1.8-.8-1.8-1.8v-11.01l1.2,2.27c-1.52,3.99-3.99,6.98-7.42,8.98-3.43,1.99-7.46,2.99-12.09,2.99Z"/>
                  <path className="cls-1" d="M269.11,98.57v-61.53c0-.99.8-1.8,1.8-1.8h11.25c.99,0,1.8.8,1.8,1.8v11.01l-1.2-2.27c1.51-3.91,4.01-6.88,7.48-8.92,3.47-2.03,7.52-3.05,12.15-3.05s9.04,1.04,12.75,3.11c3.71,2.08,6.6,4.97,8.68,8.68,2.07,3.71,3.11,8,3.11,12.87v40.1c0,.99-.8,1.8-1.8,1.8h-12.09c-.99,0-1.8-.8-1.8-1.8v-36.39c0-2.87-.56-5.35-1.68-7.42-1.12-2.07-2.67-3.67-4.67-4.79-2-1.12-4.27-1.68-6.82-1.68s-4.83.56-6.82,1.68c-2,1.12-3.55,2.71-4.67,4.79-1.12,2.08-1.68,4.55-1.68,7.42v36.39c0,.99-.8,1.8-1.8,1.8h-12.21c-.99,0-1.8-.8-1.8-1.8Z"/>
                  <path className="cls-1" d="M368.1,100.36c-6.3,0-11.95-1.5-16.94-4.49-4.99-2.99-8.92-7.08-11.79-12.27-2.87-5.19-4.31-10.93-4.31-17.24s1.46-12.13,4.37-17.24c2.91-5.11,6.84-9.18,11.79-12.21,4.95-3.03,10.53-4.55,16.76-4.55,4.95,0,9.36.98,13.23,2.93,3.87,1.96,6.92,4.69,9.16,8.2l-2.39,3.23V10.1c0-.99.8-1.8,1.8-1.8h12.09c.99,0,1.8.8,1.8,1.8v87.02c0,.99-.8,1.8-1.8,1.8h-11.25c-.99,0-1.8-.8-1.8-1.8v-10.77l1.68,3.11c-2.24,3.59-5.35,6.31-9.34,8.14-3.99,1.84-8.34,2.75-13.05,2.75ZM369.78,86c3.51,0,6.64-.84,9.4-2.51,2.75-1.68,4.91-3.99,6.46-6.94,1.56-2.95,2.33-6.34,2.33-10.17s-.78-7.1-2.33-10.06c-1.56-2.95-3.71-5.27-6.46-6.94-2.75-1.68-5.89-2.51-9.4-2.51s-6.66.84-9.46,2.51c-2.79,1.68-4.97,3.99-6.52,6.94-1.56,2.95-2.33,6.31-2.33,10.06s.78,7.22,2.33,10.17c1.56,2.95,3.73,5.27,6.52,6.94,2.79,1.68,5.94,2.51,9.46,2.51Z"/>
                  <path className="cls-1" d="M442.79,98.57v-49.32h-9.7c-.99,0-1.8-.8-1.8-1.8v-10.41c0-.99.8-1.8,1.8-1.8h9.7v-2.04c0-5.03,1-9.28,2.99-12.75,1.99-3.47,4.85-6.12,8.56-7.96,3.71-1.84,8.08-2.75,13.11-2.75.96,0,2.01.06,3.17.18.5.05.96.11,1.39.17.89.12,1.54.88,1.54,1.78v9.93c0,1.05-.89,1.87-1.93,1.79-.09,0-.19-.01-.28-.02-.68-.04-1.3-.06-1.86-.06-3.51,0-6.22.78-8.14,2.33-1.92,1.56-2.87,4.01-2.87,7.36v2.04h12.69c.99,0,1.8.8,1.8,1.8v10.41c0,.99-.8,1.8-1.8,1.8h-12.69v49.32c0,.99-.8,1.8-1.8,1.8h-12.09c-.99,0-1.8-.8-1.8-1.8Z"/>
                  <path className="cls-1" d="M480.54,98.57v-61.53c0-.99.8-1.8,1.8-1.8h11.25c.99,0,1.8.8,1.8,1.8v12.69l-1.2-2.15c1.51-4.87,3.89-8.26,7.12-10.17,3.23-1.92,7.12-2.87,11.67-2.87h2.04c.99,0,1.8.8,1.8,1.8v10.41c0,.99-.8,1.8-1.8,1.8h-3.83c-4.47,0-8.06,1.36-10.77,4.07s-4.07,6.54-4.07,11.49v34.47c0,.99-.8,1.8-1.8,1.8h-12.21c-.99,0-1.8-.8-1.8-1.8Z"/>
                  <path className="cls-1" d="M551.85,100.36c-6.3,0-12.07-1.48-17.3-4.43-5.23-2.95-9.4-6.98-12.51-12.09-3.11-5.11-4.67-10.93-4.67-17.48s1.56-12.37,4.67-17.48c3.11-5.11,7.26-9.14,12.45-12.09,5.19-2.95,10.97-4.43,17.36-4.43s12.29,1.48,17.48,4.43c5.19,2.95,9.32,6.96,12.39,12.03,3.07,5.07,4.61,10.91,4.61,17.54s-1.56,12.37-4.67,17.48c-3.11,5.11-7.26,9.14-12.45,12.09-5.19,2.95-10.97,4.43-17.36,4.43ZM551.85,86c3.59,0,6.72-.84,9.4-2.51,2.67-1.68,4.79-4.01,6.34-7,1.56-2.99,2.33-6.36,2.33-10.11s-.78-7.1-2.33-10.06c-1.56-2.95-3.67-5.27-6.34-6.94-2.67-1.68-5.81-2.51-9.4-2.51s-6.62.84-9.34,2.51c-2.71,1.68-4.85,3.99-6.4,6.94-1.56,2.95-2.33,6.31-2.33,10.06s.78,7.12,2.33,10.11c1.56,2.99,3.69,5.33,6.4,7,2.71,1.68,5.82,2.51,9.34,2.51Z"/>
                  <path className="cls-1" d="M595.12,98.57V11.54c0-.99.8-1.8,1.8-1.8h12.21c.99,0,1.8.8,1.8,1.8v87.02c0,.99-.8,1.8-1.8,1.8h-12.21c-.99,0-1.8-.8-1.8-1.8Z"/>
                  <path className="cls-1" d="M623.96,26.14v-13.17c0-.99.8-1.8,1.8-1.8h12.21c.99,0,1.8.8,1.8,1.8v13.17c0-.99-.8-1.8-1.8-1.8h-12.21c-.99,0-1.8-.8-1.8-1.8ZM623.96,98.57v-61.53c0-.99.8-1.8,1.8-1.8h12.21c.99,0,1.8.8,1.8,1.8v61.53c0,.99-.8,1.8-1.8,1.8h-12.21c-.99,0-1.8-.8-1.8-1.8Z"/>
                  <path className="cls-1" d="M682.1,100.36c-6.54,0-12.37-1.5-17.48-4.49-5.11-2.99-9.16-7.06-12.15-12.21-2.99-5.15-4.49-10.95-4.49-17.42s1.48-12.25,4.43-17.36c2.95-5.11,7-9.14,12.15-12.09,5.15-2.95,10.99-4.43,17.54-4.43,4.63,0,8.94.82,12.93,2.45,3.99,1.64,7.44,3.89,10.35,6.76,2.49,2.45,4.38,5.26,5.67,8.41.37.9-.04,1.94-.93,2.33l-10.52,4.66c-.89.4-1.96.02-2.37-.86-1.22-2.6-3.02-4.71-5.38-6.34-2.83-1.95-6.09-2.93-9.76-2.93-3.43,0-6.48.82-9.16,2.45-2.67,1.64-4.77,3.95-6.28,6.94-1.52,2.99-2.27,6.36-2.27,10.11s.76,7.22,2.27,10.17c1.51,2.95,3.61,5.27,6.28,6.94,2.67,1.68,5.73,2.51,9.16,2.51,3.75,0,7-1,9.76-2.99,2.3-1.66,4.08-3.8,5.35-6.41.43-.88,1.47-1.26,2.36-.86l10.56,4.77c.89.4,1.3,1.45.91,2.35-1.29,3.02-3.15,5.76-5.59,8.23-2.87,2.91-6.31,5.19-10.29,6.82-3.99,1.63-8.34,2.45-13.05,2.45Z"/>
                </g>
                <path className="cls-2" d="M124.91,9.41c-.09-.08-.18-.15-.27-.23-1.1-.94-2.14-1.75-3.13-2.43-5.16-3.56-10.29-5.72-15.39-6.46-5.11-.75-9.91-.05-14.42,2.1-4.51,2.15-8.54,5.8-12.1,10.95l-1.44,2.09-8.71-6.02c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l8.62,5.95-26.29,38.05-11.78-8.14c-1.69-1.17-4.02-.75-5.19.95l-5.68,8.22c-1.17,1.69-.75,4.02.95,5.19l11.78,8.14-1.44,2.09c-2.37,3.44-5.1,5.28-8.16,5.51-3.07.24-6.4-.88-10-3.37-.57-.39-1.19-.85-1.86-1.38,0,0-.01-.01-.02-.02-1.16-.91-2.84-.71-3.68.51l-6.11,8.85c-1.08,1.56-.82,3.69.61,4.93.09.08.18.15.27.23,1.1.94,2.14,1.75,3.13,2.43,5.16,3.56,10.29,5.72,15.39,6.46,5.11.75,9.91.05,14.42-2.1,4.51-2.15,8.54-5.8,12.1-10.95l1.44-2.09,8.71,6.02c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-8.62-5.95,26.29-38.05,11.78,8.14c1.69,1.17,4.02.75,5.19-.95l5.68-8.22c1.17-1.69.75-4.02-.95-5.19l-11.78-8.14,1.44-2.09c2.37-3.44,5.1-5.28,8.16-5.51,3.07-.24,6.4.88,10,3.37.57.39,1.19.85,1.86,1.38,0,0,.01.01.02.02,1.16.91,2.84.71,3.68-.51l6.11-8.85c1.08-1.56.82-3.69-.61-4.93Z"/>
              </svg>
            )}
          </button>

          {/* Vertical divider - only when scrolled and showing nav links */}
          {isScrolled && showNavLinks && (
            <div className="h-8 w-px bg-border flex-shrink-0" />
          )}

          {/* Navigation Links - only show in form/loading views */}
          {showNavLinks && (
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
              <button
                onClick={onContactClick}
                className="relative font-body text-sm font-medium transition-colors duration-200 pb-1 text-muted-foreground hover:text-foreground"
              >
                Contact
              </button>
            </nav>
          )}

          {/* CTA and Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size={isMobile ? "sm" : "md"}
              onClick={() => {
              // If in results/contact/success view, show contact form
              if (isResultsView) {
                // On mobile (below 640px), open contact bottom sheet
                if (window.innerWidth < 640) {
                  openContactBottomSheet();
                } else {
                  // On desktop, scroll to contact form
                  const element = document.getElementById('contact-form');
                  if (element) {
                    const offset = 120;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              } else {
                // Form/loading view - Get Started behavior
                // On mobile (below 640px), open bottom sheet instead
                if (window.innerWidth < 640) {
                  openBottomSheet();
                } else {
                  // On desktop, scroll and highlight form
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
                }
              }
            }}
          >
            {isResultsView ? 'Get Expert Help' : 'Get Started'}
          </Button>

          {/* Mobile Hamburger Menu - to the right of CTA */}
          {showNavLinks && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && showNavLinks && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-[45]"
            style={{ top: '80px' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu */}
          <div
            className="md:hidden fixed left-2 right-2 z-[46] bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md overflow-hidden"
            style={{
              top: isScrolled ? '88px' : '108px',
              animation: 'slideDown 200ms ease-out'
            }}
          >
            <style jsx>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-8px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            <nav className="flex flex-col p-4 space-y-2">
              <button
                onClick={() => {
                  scrollToSection('home');
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-left px-4 py-3 rounded-xl font-body text-base font-medium transition-colors duration-200",
                  activeSection === 'home'
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-background/60"
                )}
              >
                Home
              </button>
              <button
                onClick={() => {
                  scrollToSection('services');
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-left px-4 py-3 rounded-xl font-body text-base font-medium transition-colors duration-200",
                  activeSection === 'services'
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-background/60"
                )}
              >
                Services
              </button>
              <button
                onClick={() => {
                  scrollToSection('story');
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-left px-4 py-3 rounded-xl font-body text-base font-medium transition-colors duration-200",
                  activeSection === 'story'
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-background/60"
                )}
              >
                Our Story
              </button>
              <button
                onClick={() => {
                  if (onContactClick) onContactClick();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-4 py-3 rounded-xl font-body text-base font-medium transition-colors duration-200 text-foreground hover:bg-background/60"
              >
                Contact
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

Header.displayName = "Header";
