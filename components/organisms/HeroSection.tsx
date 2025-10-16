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
  const { viewState, setViewState, grantResults, setGrantResults } = useViewState();
  const { isHighlighted } = useFormHighlight();
  const [formData, setFormData] = useState<FormData>({
    projectDescription: '',
    revenueStatus: '',
    organizationType: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
    // Immediately transition to loading state
    setViewState('loading');
  };

  // Effect to handle API call when entering loading state
  useEffect(() => {
    if (viewState === 'loading' && !grantResults) {
      const fetchGrants = async () => {
        try {
          const response = await fetch('/api/find-grants', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              projectDescription: formData.projectDescription,
              revenueStatus: formData.revenueStatus,
              organizationType: formData.organizationType,
            }),
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
  }, [viewState, grantResults, formData, setViewState, setGrantResults]);

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
    setErrors({});
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
        onRequestHelp={handleRequestHelp}
      />
    );
  }

  // Show contact form
  if (viewState === 'contact' && grantResults) {
    return (
      <ContactForm
        searchId={grantResults.searchId}
        onSuccess={handleContactSuccess}
      />
    );
  }

  // Show success state
  if (viewState === 'success' && grantResults) {
    return (
      <ContactSuccess
        results={grantResults}
        onFindMoreGrants={handleFindMoreGrants}
      />
    );
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
            {/* Badge */}
            <Badge variant="success" size="md" className="font-semibold tracking-wide">
              MEET FUND FROLIC
            </Badge>

            {/* Main headline with strategic color */}
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-foreground">
              The funding <span className="bg-gold-100 text-gold-800 px-2 py-1 rounded-lg">buddy</span> you actually want on your team.
            </h1>

            <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Our AI instantly matches you with federal, state, and private grants that actually fit your project. No equity given up. No complicated applications yet. Just 3 perfect matches with direct application links.
            </p>
          </div>

          {/* Right side - Grant Finder Form */}
          <div className="w-full pt-4 sm:pt-6 lg:pt-8 relative">
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
                  Find $50K-$500K in grants for your startup in seconds
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
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
                          ? "bg-primary text-primary-foreground shadow-[0_2px_4px_rgba(37,99,235,0.20),0_8px_16px_rgba(37,99,235,0.15)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_2px_rgba(59,130,246,0.06)]"
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
                          ? "bg-primary text-primary-foreground shadow-[0_2px_4px_rgba(37,99,235,0.20),0_8px_16px_rgba(37,99,235,0.15)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_2px_rgba(59,130,246,0.06)]"
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
                          ? "bg-primary text-primary-foreground shadow-[0_2px_4px_rgba(37,99,235,0.20),0_8px_16px_rgba(37,99,235,0.15)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_2px_rgba(59,130,246,0.06)]"
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
                          ? "bg-primary text-primary-foreground shadow-[0_2px_4px_rgba(37,99,235,0.20),0_8px_16px_rgba(37,99,235,0.15)]"
                          : "bg-background/60 text-foreground hover:bg-background/90 shadow-[0_1px_2px_rgba(59,130,246,0.06)]"
                      )}
                    >
                      Non-Profit
                    </button>
                  </div>
                  {errors.organizationType && (
                    <p className="text-xs text-error ml-2">{errors.organizationType}</p>
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
                  className="w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_4px_8px_rgba(251,191,36,0.18),0_6px_12px_rgba(37,99,235,0.20),0_12px_24px_-2px_rgba(37,99,235,0.15)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_6px_12px_rgba(251,191,36,0.20),0_8px_16px_rgba(37,99,235,0.25),0_16px_32px_-2px_rgba(37,99,235,0.20)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  Find My Grants
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";
