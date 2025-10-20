/**
 * GrantResults Component
 *
 * Displays the AI-generated grant recommendations.
 * Shows 3 grant cards and optional CTA for grant writing assistance.
 */

'use client';

import { cn } from '@/lib/utils';
import { GrantResult, SearchRequest } from '@/types/grants';
import { GrantCard } from '@/components/molecules/GrantCard';
import { Badge } from '@/components/atoms/Badge';
import { useState, useRef } from 'react';
import { useBottomSheet } from '@/lib/contexts/BottomSheetContext';

export interface GrantResultsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results'> {
  /**
   * Grant results from API
   */
  results: GrantResult;
  /**
   * Search request data (for email context)
   */
  searchRequest?: SearchRequest;
  /**
   * Callback when user wants to get help with grant writing
   */
  onRequestHelp?: () => void;
  /**
   * Callback when user wants to start over
   */
  onStartOver?: () => void;
  /**
   * Optional custom className for styling
   */
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  organizationName: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  organizationName?: string;
  phone?: string;
  submit?: string;
}

export const GrantResults = ({
  results,
  searchRequest,
  onRequestHelp,
  onStartOver,
  className,
  ...props
}: GrantResultsProps) => {
  const { isContactBottomSheetOpen, isContactBottomSheetClosing, closeContactBottomSheet } = useBottomSheet();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organizationName: '',
    phone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  // Refs for each grant card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchId: results.searchId,
          name: formData.name,
          email: formData.email,
          ...(formData.organizationName && { organizationName: formData.organizationName }),
          ...(formData.phone && { phone: formData.phone }),
          grantResults: results, // Include grant results for email
          searchRequest: searchRequest, // Include search request for email context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit contact form');
      }

      // Success!
      setShowSuccess(true);
      // Close bottom sheet if open
      if (isContactBottomSheetOpen) {
        closeContactBottomSheet();
      }

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20",
        className
      )}
      {...props}
    >
      <div className="space-y-8 sm:space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <Badge variant="success" size="md" className="font-semibold tracking-wide shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(37,99,235,0.15),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(59,130,246,0.12)]">
            GRANTS FOUND
          </Badge>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            We found 3 perfect matches for your project
          </h2>

          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our AI analyzed thousands of grants and selected these top opportunities that align with your project goals and eligibility requirements.
          </p>
        </div>

        {/* Grant Cards - Accordion mode */}
        <div className="space-y-4 sm:space-y-6">
          {results.grants.map((grant, index) => (
            <GrantCard
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              grant={grant}
              rank={index + 1}
              isExpanded={expandedCardIndex === index}
              onToggle={() => {
                const isCurrentlyExpanded = expandedCardIndex === index;

                // Toggle: if clicking the currently expanded card, collapse it. Otherwise, expand the clicked card
                setExpandedCardIndex(isCurrentlyExpanded ? null : index);

                // If expanding (not collapsing), scroll to the card with offset for fixed header
                if (!isCurrentlyExpanded && cardRefs.current[index]) {
                  setTimeout(() => {
                    const element = cardRefs.current[index];
                    if (element) {
                      const offset = 120; // Account for fixed header height
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }, 50); // Small delay to let the card start expanding
                }
              }}
            />
          ))}
        </div>

        {/* Contact Form Section - Visible on all screen sizes */}
        <div id="contact-form" className="relative w-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(251,191,36,0.25),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(251,191,36,0.20),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(251,191,36,0.12)] backdrop-blur-md overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

          {showSuccess ? (
            <div className="relative z-10 p-6 sm:p-8 lg:p-12 text-center space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-center">
                <svg className="w-16 h-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Thanks! We'll be in touch soon.
              </h3>
              <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We've sent your grant matches to your email and our team will reach out to discuss how we can help you win these grants.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="relative z-10 px-6 sm:px-8 py-6 bg-gradient-to-b from-background-elevated/60 to-transparent backdrop-blur-xl border-b border-border/50">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-center">
                  Send Results + Get Expert Help
                </h3>
                <p className="font-body text-sm sm:text-base text-muted-foreground text-center mt-2">
                  We'll email your grant matches and reach out to help you apply for the ones that fit best.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative z-10 p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-body text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        if (errors.name) {
                          setErrors(prev => ({ ...prev, name: undefined }));
                        }
                      }}
                      placeholder="John Doe"
                      className={cn(
                        "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
                        errors.name ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
                      )}
                    />
                    {errors.name && (
                      <p className="text-xs text-error ml-2">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-body text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) {
                          setErrors(prev => ({ ...prev, email: undefined }));
                        }
                      }}
                      placeholder="john@example.com"
                      className={cn(
                        "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
                        errors.email ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
                      )}
                    />
                    {errors.email && (
                      <p className="text-xs text-error ml-2">{errors.email}</p>
                    )}
                  </div>

                  {/* Organization Name */}
                  <div className="space-y-2">
                    <label htmlFor="organizationName" className="block font-body text-sm font-medium text-foreground">
                      Business Name <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, organizationName: e.target.value }));
                        if (errors.organizationName) {
                          setErrors(prev => ({ ...prev, organizationName: undefined }));
                        }
                      }}
                      placeholder="Acme Inc."
                      className="w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-body text-sm font-medium text-foreground">
                      Phone <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) {
                          setErrors(prev => ({ ...prev, phone: undefined }));
                        }
                      }}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-[16px]">
                    <p className="text-sm text-error text-center">{errors.submit}</p>
                  </div>
                )}

                {/* Privacy Disclaimer */}
                <div className="flex items-start gap-2 p-4 bg-muted/30 rounded-[12px]">
                  <svg className="flex-shrink-0 w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    We respect your privacy. Your information will never be sold or shared with third parties.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_4px_8px_rgba(37,99,235,0.20),0_8px_16px_rgba(59,130,246,0.15),0_12px_24px_-2px_rgba(37,99,235,0.10)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_6px_12px_rgba(37,99,235,0.25),0_12px_24px_rgba(59,130,246,0.18),0_16px_32px_-2px_rgba(37,99,235,0.15)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send My Results'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Start Over Link */}
        {onStartOver && (
          <div className="text-center pt-4">
            <button
              onClick={onStartOver}
              className="font-body text-sm text-muted-foreground hover:text-foreground underline transition-colors duration-200"
            >
              Start Over
            </button>
          </div>
        )}

        {/* Search Info */}
        <div className="text-center space-y-2">
          <p className="font-body text-sm text-muted-foreground">
            Search ID: {results.searchId}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Generated on {new Date(results.timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Contact Bottom Sheet - Only on mobile below sm */}
      {isContactBottomSheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className="sm:hidden fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-[1030] transition-opacity duration-300 ease-out"
            style={{
              animation: isContactBottomSheetClosing
                ? 'fadeOut 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
                : 'fadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
            onClick={closeContactBottomSheet}
          />

          {/* Bottom Sheet */}
          <div
            className="sm:hidden fixed inset-x-0 bottom-0 z-[1040]"
            style={{
              animation: isContactBottomSheetClosing
                ? 'slideDown 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
                : 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div className="bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-t-[32px] shadow-[0_-4px_24px_rgba(0,0,0,0.12),0_-8px_48px_rgba(0,0,0,0.08)] max-h-[85vh] overflow-y-auto">
              {/* Handle bar */}
              <div className="flex justify-center py-3 sticky top-0 bg-background-elevated/95 backdrop-blur-xl border-b border-border/50 rounded-t-[32px]">
                <div className="w-12 h-1.5 bg-border rounded-full" />
              </div>

              {showSuccess ? (
                <div className="p-6 text-center space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-center">
                    <svg className="w-16 h-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Thanks! We'll be in touch soon.
                  </h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    We've sent your grant matches to your email and our team will reach out to discuss how we can help you win these grants.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="px-6 py-4 bg-gradient-to-b from-background-elevated/60 to-transparent">
                    <h3 className="font-display text-2xl font-bold text-foreground text-center">
                      Send Results + Get Expert Help
                    </h3>
                    <p className="font-body text-sm text-muted-foreground text-center mt-2">
                      We'll email your grant matches and reach out to help you apply for the ones that fit best.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 gap-5">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name-mobile" className="block font-body text-sm font-medium text-foreground">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name-mobile"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, name: e.target.value }));
                            if (errors.name) {
                              setErrors(prev => ({ ...prev, name: undefined }));
                            }
                          }}
                          placeholder="John Doe"
                          className={cn(
                            "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
                            errors.name ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
                          )}
                        />
                        {errors.name && (
                          <p className="text-xs text-error ml-2">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email-mobile" className="block font-body text-sm font-medium text-foreground">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email-mobile"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, email: e.target.value }));
                            if (errors.email) {
                              setErrors(prev => ({ ...prev, email: undefined }));
                            }
                          }}
                          placeholder="john@example.com"
                          className={cn(
                            "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
                            errors.email ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
                          )}
                        />
                        {errors.email && (
                          <p className="text-xs text-error ml-2">{errors.email}</p>
                        )}
                      </div>

                      {/* Organization Name */}
                      <div className="space-y-2">
                        <label htmlFor="organizationName-mobile" className="block font-body text-sm font-medium text-foreground">
                          Business Name <span className="text-muted-foreground font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="organizationName-mobile"
                          value={formData.organizationName}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, organizationName: e.target.value }));
                            if (errors.organizationName) {
                              setErrors(prev => ({ ...prev, organizationName: undefined }));
                            }
                          }}
                          placeholder="Acme Inc."
                          className="w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone-mobile" className="block font-body text-sm font-medium text-foreground">
                          Phone <span className="text-muted-foreground font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone-mobile"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, phone: e.target.value }));
                            if (errors.phone) {
                              setErrors(prev => ({ ...prev, phone: undefined }));
                            }
                          }}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                      <div className="p-4 bg-error/10 border border-error/20 rounded-[16px]">
                        <p className="text-sm text-error text-center">{errors.submit}</p>
                      </div>
                    )}

                    {/* Privacy Disclaimer */}
                    <div className="flex items-start gap-2 p-4 bg-muted/30 rounded-[12px]">
                      <svg className="flex-shrink-0 w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        We respect your privacy. Your information will never be sold or shared with third parties.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-base text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_2px_4px_rgba(37,99,235,0.30),0_6px_12px_rgba(251,191,36,0.22),0_8px_16px_rgba(37,99,235,0.25),0_14px_28px_-2px_rgba(37,99,235,0.18)] hover:shadow-[0_3px_6px_rgba(37,99,235,0.35),0_8px_16px_rgba(251,191,36,0.25),0_12px_24px_rgba(37,99,235,0.30),0_20px_40px_-2px_rgba(37,99,235,0.22)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send My Results'
                      )}
                    </button>
                  </form>
                </>
              )}

              {/* Start Over Link - Mobile */}
              {onStartOver && !showSuccess && (
                <div className="text-center pb-6">
                  <button
                    onClick={() => {
                      closeContactBottomSheet();
                      setTimeout(onStartOver, 400); // Wait for sheet to close
                    }}
                    className="font-body text-sm text-muted-foreground hover:text-foreground underline transition-colors duration-200"
                  >
                    Start Over
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

GrantResults.displayName = "GrantResults";
