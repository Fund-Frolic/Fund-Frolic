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
            {/* Badge visible at all times */}
            <div className="flex justify-center lg:justify-start pt-4 lg:pt-0">
              <Badge variant="success" size="md" className="font-semibold tracking-wide shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(37,99,235,0.15),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(59,130,246,0.12)]">
                MEET FUND FROLIC
              </Badge>
            </div>

            {/* Main headline - Condensed on mobile, full on desktop */}
            <h1 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-foreground text-center lg:text-left">
              <span className="lg:hidden">Grow Without Giving Up Equity</span>
              <span className="hidden lg:inline">Fuel Your Startup's Growth - Without Giving Up Equity</span>
            </h1>

            {/* Body copy - Full text on all screen sizes */}
            <p className="font-body text-base sm:text-lg md:text-lg lg:text-xl text-muted-foreground leading-relaxed text-center lg:text-left">
              You're here to scale without giving up equity. That's why Fund Frolic exists. Our AI Grant Finder instantly matches your project with grants built for for-profits and nonprofits alike. We handle the government forms and red tape, so you stay focused on what you're building.
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
                      "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-base text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300 resize-none",
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
                      "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-base text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300 resize-none",
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
