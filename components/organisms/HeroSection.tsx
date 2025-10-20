/**
 * HeroSection Component
 *
 * Landing page hero section with headline, value proposition, and key features.
 * Left side displays marketing copy, right side features AI Grant Finder form.
 * Simple form with validation that maintains chat-like aesthetic.
 * Design system colors: primary (blue), accent (gold), semantic tokens.
 * Spacing: 8-point grid aligned.
 */

'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/atoms/Badge';
import { useState, useEffect, useRef } from 'react';
import { GrantLoadingState } from '@/components/organisms/GrantLoadingState';
import { GrantResults } from '@/components/organisms/GrantResults';
import { ContactForm } from '@/components/organisms/ContactForm';
import { ContactSuccess } from '@/components/organisms/ContactSuccess';
import { useViewState } from '@/lib/contexts/ViewStateContext';
import { useFormHighlight } from '@/lib/contexts/FormHighlightContext';
import { useBottomSheet } from '@/lib/contexts/BottomSheetContext';

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional custom className for styling
   */
  className?: string;
}

interface FormData {
  projectDescription: string;
  revenueStatus: 'positive' | 'not-positive' | '';
  organizationType: 'for-profit' | 'non-profit' | '';
}

interface FormErrors {
  projectDescription?: string;
  revenueStatus?: string;
  organizationType?: string;
  submit?: string;
}

export const HeroSection = ({
  className,
  ...props
}: HeroSectionProps) => {
  const { viewState, setViewState, grantResults, setGrantResults, searchRequest, setSearchRequest } = useViewState();
  const { isHighlighted, triggerHighlight } = useFormHighlight();
  const { isBottomSheetOpen, isBottomSheetClosing, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [formData, setFormData] = useState<FormData>({
    projectDescription: '',
    revenueStatus: '',
    organizationType: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [wasMobile, setWasMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  const scrollToForm = () => {
    const element = document.getElementById('home');
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      triggerHighlight();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Please describe your project';
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription = 'Please provide more details (at least 20 characters)';
    }

    if (!formData.revenueStatus) {
      newErrors.revenueStatus = 'Please select your revenue status';
    }

    if (!formData.organizationType) {
      newErrors.organizationType = 'Please select your organization type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setErrors({});
    // Close bottom sheet if open
    if (isBottomSheetOpen) {
      closeBottomSheet();
    }
    // Immediately transition to loading state
    setViewState('loading');
  };

  // Effect to handle responsive form continuity across breakpoints
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const hasFormData = !!(formData.projectDescription || formData.revenueStatus || formData.organizationType);

      // Only trigger if form has data AND breakpoint changed
      if (hasFormData && isMobile !== wasMobile) {

        // Mobile → Desktop: Close sheet, scroll to form, highlight
        if (!isMobile && wasMobile) {
          if (isBottomSheetOpen) {
            closeBottomSheet();
          }
          // Delay to let sheet close, then scroll & highlight
          setTimeout(() => {
            scrollToForm();
          }, 100);
        }

        // Desktop → Mobile: Open bottom sheet
        if (isMobile && !wasMobile) {
          openBottomSheet();
        }
      }

      setWasMobile(isMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [formData, wasMobile, isBottomSheetOpen, openBottomSheet, closeBottomSheet, triggerHighlight]);

  // Effect to handle API call when entering loading state
  useEffect(() => {
    if (viewState === 'loading' && !grantResults) {
      const fetchGrants = async () => {
        try {
          // Store the search request for later use in contact form
          const searchRequestData = {
            projectDescription: formData.projectDescription,
            revenueStatus: formData.revenueStatus as 'positive' | 'not-positive',
            organizationType: formData.organizationType as 'for-profit' | 'non-profit',
          };
          setSearchRequest(searchRequestData);

          const response = await fetch('/api/find-grants', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchRequestData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to find grants');
          }

          const result = await response.json();
          setGrantResults(result);

          // Keep loading state for at least 2 seconds for smooth UX
          setTimeout(() => {
            setViewState('results');
            // Scroll to top when results load
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 2000);

        } catch (error) {
          console.error('Error finding grants:', error);
          setErrors({
            submit: error instanceof Error ? error.message : 'Failed to find grants. Please try again.'
          });
          // Go back to form view on error
          setViewState('form');
        }
      };

      fetchGrants();
    }
  }, [viewState, grantResults, formData, setViewState, setGrantResults, setSearchRequest]);

  const handleRequestHelp = () => {
    setViewState('contact');
  };

  const handleContactSuccess = () => {
    setViewState('success');
  };

  const handleFindMoreGrants = () => {
    // Reset everything and go back to form
    setViewState('form');
    setFormData({
      projectDescription: '',
      revenueStatus: '',
      organizationType: ''
    });
    setGrantResults(null);
    setSearchRequest(null);
    setErrors({});
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state
  if (viewState === 'loading') {
    return <GrantLoadingState />;
  }

  // Show results
  if (viewState === 'results' && grantResults) {
    return (
      <GrantResults
        results={grantResults}
        searchRequest={searchRequest || undefined}
        onRequestHelp={handleRequestHelp}
        onStartOver={handleFindMoreGrants}
      />
    );
  }

  // Show contact form
  if (viewState === 'contact') {
    return (
      <ContactForm
        searchId={grantResults?.searchId}
        grantResults={grantResults || undefined}
        searchRequest={searchRequest || undefined}
        onSuccess={handleContactSuccess}
      />
    );
  }

  // Show success state
  if (viewState === 'success') {
    if (grantResults) {
      // Success after finding grants
      return (
        <ContactSuccess
          results={grantResults}
          onFindMoreGrants={handleFindMoreGrants}
        />
      );
    } else {
      // Success after standalone contact - redirect back to form
      setTimeout(() => {
        handleFindMoreGrants();
      }, 2000);
      return (
        <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="relative max-w-2xl mx-auto w-full text-center space-y-6">
            <div className="text-6xl">✓</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Thank you for reaching out!
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              We'll be in touch soon to help you find the perfect grants for your project.
            </p>
          </div>
        </section>
      );
    }
  }

  return (
    <section
      id="home"
      className={cn(
        "relative w-full py-12 sm:py-16 md:py-20 lg:py-24 flex items-center px-4 sm:px-6 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      <div className="relative max-w-7xl mx-auto w-full z-10 -mt-12 md:-mt-16 lg:-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
          {/* Left side - Marketing copy */}
          <div className="space-y-6 sm:space-y-8">
            {/* Logo on mobile, Badge on desktop */}
            <div className="flex justify-center lg:justify-start pt-4 lg:pt-0">
              {/* Mobile: Full logo */}
              <svg className="lg:hidden h-6 w-auto" viewBox="0 0 711.19 108.67" xmlns="http://www.w3.org/2000/svg">
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

              {/* Desktop: Badge */}
              <Badge variant="success" size="md" className="hidden lg:inline-flex font-semibold tracking-wide shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(37,99,235,0.15),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(59,130,246,0.12)]">
                MEET FUND FROLIC
              </Badge>
            </div>

            {/* Main headline - Condensed on mobile, full on desktop */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-foreground text-center lg:text-left">
              <span className="lg:hidden">Grow Without Giving Up Equity</span>
              <span className="hidden lg:inline">Fuel Your Startup's Growth - Without Giving Up Equity</span>
            </h1>

            {/* Body copy - Condensed on mobile, full on desktop */}
            <p className="font-body text-base sm:text-lg md:text-lg lg:text-xl text-muted-foreground leading-relaxed text-center lg:text-left">
              <span className="lg:hidden">AI-powered grant matching for startups. We handle the paperwork, you focus on building.</span>
              <span className="hidden lg:inline">You're here to scale without giving up equity. That's why Fund Frolic exists. Our AI Grant Finder instantly matches your project with grants built for for-profits and nonprofits alike. We handle the government forms and red tape, so you stay focused on what you're building.</span>
            </p>

            {/* Mobile CTA Button - Only show below sm breakpoint */}
            <button
              onClick={openBottomSheet}
              className="sm:hidden w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-base text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_2px_8px_rgba(37,99,235,0.3),0_4px_12px_rgba(251,191,36,0.2)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.35),0_8px_20px_rgba(251,191,36,0.25)] active:scale-[0.98]"
            >
              Find Grants with AI
            </button>
          </div>

          {/* Right side - Grant Finder Form - Hidden on mobile below sm */}
          <div className="hidden sm:block w-full pt-4 sm:pt-6 lg:pt-8 relative">
            {/* "Start Here" Indicator - appears when highlighted */}
            {isHighlighted && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold-400/30 blur-xl rounded-full animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 text-white px-6 py-2 rounded-full font-body font-bold text-sm shadow-[0_4px_12px_rgba(251,191,36,0.4),0_8px_24px_rgba(251,191,36,0.3)] flex items-center gap-2">
                    <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>START HERE</span>
                    <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Main container with sophisticated floating elevation */}
            <div className={cn(
              "relative w-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl lg:rounded-[24px] backdrop-blur-md overflow-hidden transition-all duration-500",
              isHighlighted
                ? "shadow-[0_0_0_4px_rgba(251,191,36,0.3),0_0_0_8px_rgba(37,99,235,0.2),0_2px_6px_rgba(37,99,235,0.15),0_8px_16px_rgba(251,191,36,0.35),0_16px_32px_-4px_rgba(37,99,235,0.15),0_24px_48px_rgba(251,191,36,0.30),0_32px_64px_-8px_rgba(37,99,235,0.12),0_48px_96px_rgba(251,191,36,0.20)] animate-pulse"
                : "shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(251,191,36,0.25),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(251,191,36,0.20),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(251,191,36,0.12)]"
            )}>
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

              {/* Form header */}
              <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-gradient-to-b from-background-elevated/60 to-transparent backdrop-blur-xl border-b border-border/50">
                <h3 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground text-center">
                  Find grants in seconds
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
                {/* Revenue Status */}
                <div className="space-y-2">
                  <label className="block font-body text-sm font-medium text-foreground">
                    Revenue Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, revenueStatus: 'positive' }));
                        if (errors.revenueStatus) {
                          setErrors(prev => ({ ...prev, revenueStatus: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.revenueStatus === 'positive'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      Revenue Positive
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, revenueStatus: 'not-positive' }));
                        if (errors.revenueStatus) {
                          setErrors(prev => ({ ...prev, revenueStatus: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.revenueStatus === 'not-positive'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      Not Revenue Positive
                    </button>
                  </div>
                  {errors.revenueStatus && (
                    <p className="text-xs text-error ml-2">{errors.revenueStatus}</p>
                  )}
                </div>

                {/* Organization Type */}
                <div className="space-y-2">
                  <label className="block font-body text-sm font-medium text-foreground">
                    Organization Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, organizationType: 'for-profit' }));
                        if (errors.organizationType) {
                          setErrors(prev => ({ ...prev, organizationType: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.organizationType === 'for-profit'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      For-Profit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, organizationType: 'non-profit' }));
                        if (errors.organizationType) {
                          setErrors(prev => ({ ...prev, organizationType: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.organizationType === 'non-profit'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      Non-Profit
                    </button>
                  </div>
                  {errors.organizationType && (
                    <p className="text-xs text-error ml-2">{errors.organizationType}</p>
                  )}
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label htmlFor="projectDescription" className="block font-body text-sm font-medium text-foreground">
                    Describe Your Project
                  </label>
                  <textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, projectDescription: e.target.value }));
                      if (errors.projectDescription) {
                        setErrors(prev => ({ ...prev, projectDescription: undefined }));
                      }
                    }}
                    rows={4}
                    placeholder="Tell us about your project. Include relevant details like veteran-owned, minority-owned, immigrant-owned, women-owned, or other special designations..."
                    className={cn(
                      "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300 resize-none",
                      errors.projectDescription ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
                    )}
                  />
                  {errors.projectDescription && (
                    <p className="text-xs text-error ml-2">{errors.projectDescription}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-[16px]">
                    <p className="text-sm text-error text-center">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_2px_4px_rgba(37,99,235,0.30),0_6px_12px_rgba(251,191,36,0.22),0_8px_16px_rgba(37,99,235,0.25),0_14px_28px_-2px_rgba(37,99,235,0.18)] hover:shadow-[0_3px_6px_rgba(37,99,235,0.35),0_8px_16px_rgba(251,191,36,0.25),0_12px_24px_rgba(37,99,235,0.30),0_20px_40px_-2px_rgba(37,99,235,0.22)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Find My Grants
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Modal - Only on mobile below sm */}
      {isBottomSheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className="sm:hidden fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-[1030] transition-opacity duration-300 ease-out"
            style={{
              animation: isBottomSheetClosing
                ? 'fadeOut 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
                : 'fadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
            onClick={closeBottomSheet}
          />

          {/* Bottom Sheet */}
          <div
            className="sm:hidden fixed inset-x-0 bottom-0 z-[1040]"
            style={{
              animation: isBottomSheetClosing
                ? 'slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
                : 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div className="bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-t-[32px] shadow-[0_-4px_24px_rgba(0,0,0,0.12),0_-8px_48px_rgba(0,0,0,0.08)] max-h-[85vh] overflow-y-auto">
              {/* Handle bar */}
              <div className="flex justify-center py-3 sticky top-0 bg-background-elevated/95 backdrop-blur-xl border-b border-border/50 rounded-t-[32px]">
                <div className="w-12 h-1.5 bg-border rounded-full" />
              </div>

              {/* Form header */}
              <div className="px-6 py-4 bg-gradient-to-b from-background-elevated/60 to-transparent">
                <h3 className="font-display text-2xl font-bold text-foreground text-center">
                  Find grants in seconds
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Revenue Status */}
                <div className="space-y-2">
                  <label className="block font-body text-sm font-medium text-foreground">
                    Revenue Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, revenueStatus: 'positive' }));
                        if (errors.revenueStatus) {
                          setErrors(prev => ({ ...prev, revenueStatus: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.revenueStatus === 'positive'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      Revenue Positive
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, revenueStatus: 'not-positive' }));
                        if (errors.revenueStatus) {
                          setErrors(prev => ({ ...prev, revenueStatus: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.revenueStatus === 'not-positive'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      Not Revenue Positive
                    </button>
                  </div>
                  {errors.revenueStatus && (
                    <p className="text-xs text-error ml-2">{errors.revenueStatus}</p>
                  )}
                </div>

                {/* Organization Type */}
                <div className="space-y-2">
                  <label className="block font-body text-sm font-medium text-foreground">
                    Organization Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, organizationType: 'for-profit' }));
                        if (errors.organizationType) {
                          setErrors(prev => ({ ...prev, organizationType: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.organizationType === 'for-profit'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      For-Profit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, organizationType: 'non-profit' }));
                        if (errors.organizationType) {
                          setErrors(prev => ({ ...prev, organizationType: undefined }));
                        }
                      }}
                      className={cn(
                        "px-4 py-3 rounded-[16px] font-body text-sm font-medium transition-all duration-200",
                        formData.organizationType === 'non-profit'
                          ? "bg-primary text-primary-foreground shadow-[0_2px_6px_rgba(37,99,235,0.25),0_8px_20px_rgba(37,99,235,0.20)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_3px_rgba(59,130,246,0.10)]"
                      )}
                    >
                      Non-Profit
                    </button>
                  </div>
                  {errors.organizationType && (
                    <p className="text-xs text-error ml-2">{errors.organizationType}</p>
                  )}
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label htmlFor="projectDescription-mobile" className="block font-body text-sm font-medium text-foreground">
                    Describe Your Project
                  </label>
                  <textarea
                    id="projectDescription-mobile"
                    value={formData.projectDescription}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, projectDescription: e.target.value }));
                      if (errors.projectDescription) {
                        setErrors(prev => ({ ...prev, projectDescription: undefined }));
                      }
                    }}
                    rows={4}
                    placeholder="Tell us about your project. Include relevant details like veteran-owned, minority-owned, immigrant-owned, women-owned, or other special designations..."
                    className={cn(
                      "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300 resize-none",
                      errors.projectDescription ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
                    )}
                  />
                  {errors.projectDescription && (
                    <p className="text-xs text-error ml-2">{errors.projectDescription}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-[16px]">
                    <p className="text-sm text-error text-center">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-base text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_2px_4px_rgba(37,99,235,0.30),0_6px_12px_rgba(251,191,36,0.22),0_8px_16px_rgba(37,99,235,0.25),0_14px_28px_-2px_rgba(37,99,235,0.18)] hover:shadow-[0_3px_6px_rgba(37,99,235,0.35),0_8px_16px_rgba(251,191,36,0.25),0_12px_24px_rgba(37,99,235,0.30),0_20px_40px_-2px_rgba(37,99,235,0.22)] active:scale-[0.98]"
                >
                  Find My Grants
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

HeroSection.displayName = "HeroSection";
