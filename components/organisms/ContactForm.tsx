/**
 * ContactForm Component
 *
 * Collects user contact information for grant writing assistance.
 * Submits to backend with searchId to track which grants they're interested in.
 */

'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { GrantResult, SearchRequest } from '@/types/grants';

export interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Search ID to associate contact with grant search (optional for standalone contact)
   */
  searchId?: string;
  /**
   * Grant results to include in email (optional, only when user found grants)
   */
  grantResults?: GrantResult;
  /**
   * Search request data to include in email (optional, only when user found grants)
   */
  searchRequest?: SearchRequest;
  /**
   * Callback when form is successfully submitted
   */
  onSuccess?: () => void;
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

export const ContactForm = ({
  searchId,
  grantResults,
  searchRequest,
  onSuccess,
  className,
  ...props
}: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organizationName: '',
    phone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // organizationName and phone are optional - no validation needed

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
          ...(searchId && { searchId }),
          name: formData.name,
          email: formData.email,
          ...(formData.organizationName && { organizationName: formData.organizationName }),
          ...(formData.phone && { phone: formData.phone }),
          ...(grantResults && { grantResults }),
          ...(searchRequest && { searchRequest }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit contact form');
      }

      // Success!
      if (onSuccess) {
        onSuccess();
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
        "w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="relative w-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl shadow-[0_1px_3px_rgba(37,99,235,0.12),0_4px_8px_rgba(37,99,235,0.15),0_8px_16px_-4px_rgba(37,99,235,0.10),0_12px_24px_rgba(59,130,246,0.12),0_20px_40px_-8px_rgba(37,99,235,0.08),0_24px_48px_rgba(59,130,246,0.08)] backdrop-blur-md overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 px-6 sm:px-8 py-6 bg-gradient-to-b from-background-elevated/60 to-transparent backdrop-blur-xl border-b border-border/50">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground text-center">
            Get Expert Grant Writing Help
          </h3>
          <p className="font-body text-sm sm:text-base text-muted-foreground text-center mt-2">
            Share your contact info and we'll reach out to discuss how we can help you win these grants.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 p-6 sm:p-8 space-y-5 sm:space-y-6">
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
                "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-base text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
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
                "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-base text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
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
              className={cn(
                "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-base text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
                errors.organizationName ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
              )}
            />
            {errors.organizationName && (
              <p className="text-xs text-error ml-2">{errors.organizationName}</p>
            )}
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
              className={cn(
                "w-full px-4 py-3 bg-background/90 backdrop-blur-sm rounded-[16px] font-body text-base text-foreground placeholder:text-muted-foreground/60 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
                errors.phone ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
              )}
            />
            {errors.phone && (
              <p className="text-xs text-error ml-2">{errors.phone}</p>
            )}
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
              We respect your privacy. Your information will never be sold or shared with third parties. We'll only use it to contact you about the grant opportunities you've selected.
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
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

ContactForm.displayName = "ContactForm";
