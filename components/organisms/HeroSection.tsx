/**
 * HeroSection Component
 *
 * Landing page hero section with headline, value proposition, and key features.
 * Left side displays marketing copy, right side features AI Grant Finder chat interface.
 * The chat interface is a progressive disclosure form that feels like an AI conversation.
 * Design system colors: primary (blue), accent (gold), semantic tokens.
 * Spacing: 8-point grid aligned.
 */

'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/atoms/Badge';
import { useState, useRef, useEffect } from 'react';

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional custom className for styling
   */
  className?: string;
}

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string | React.ReactNode;
  timestamp: string;
}

interface FormData {
  idea: string;
  name: string;
  email: string;
  businessName: string;
  certifications: string[];
}

const CERTIFICATIONS = [
  'Minority-Owned',
  'Veteran-Owned',
  'Women-Owned',
  'Disabled-Owned',
  'LGBTQ+-Owned',
  'Native American/Tribal-Owned',
  'HUBZone Certified',
  '8(a) Certified',
  'Small Disadvantaged Business',
  'Rural Business',
  'Economically Disadvantaged',
];

export const HeroSection = ({
  className,
  ...props
}: HeroSectionProps) => {
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI grant finder. Tell me about your startup or project, and I'll find matching grants for you.",
      timestamp: 'Just now'
    }
  ]);
  const [formData, setFormData] = useState<FormData>({
    idea: '',
    name: '',
    email: '',
    businessName: '',
    certifications: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string}>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const addMessage = (type: 'ai' | 'user', content: string | React.ReactNode) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: 'Just now'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idea.trim()) return;

    // Add user message
    addMessage('user', formData.idea);

    // Show loading
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      addMessage('ai', "Got it! What's your name and email so I can send you these opportunities?");
      setStep(2);
    }, 1000);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const newErrors: {email?: string} = {};
    if (!formData.name.trim()) return;
    if (!formData.email.trim()) return;
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Add user message
    addMessage('user', `${formData.name} • ${formData.email}`);

    // Show loading
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      addMessage('ai', "Perfect! One more thing - select any certifications that apply to help me find specialized grants. Also, what's your business name? (optional)");
      setStep(3);
    }, 1000);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add user message showing selections
    const certText = formData.certifications.length > 0
      ? formData.certifications.join(', ')
      : 'No certifications selected';
    const businessText = formData.businessName.trim()
      ? `Business: ${formData.businessName}`
      : '';

    addMessage('user', (
      <div className="space-y-1">
        <p>{certText}</p>
        {businessText && <p className="text-xs opacity-80">{businessText}</p>}
      </div>
    ));

    // Show loading
    setIsLoading(true);

    // Simulate AI processing (this is where the real AI call would happen)
    setTimeout(() => {
      setIsLoading(false);
      addMessage('ai', "Awesome! I'm searching for the best grant matches for you. We'll send the results to your email shortly. In the meantime, want to book a discovery call to discuss your funding strategy?");
      // Here you would actually make the API call with all the form data
      console.log('Form submitted:', formData);
    }, 1500);
  };

  const toggleCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex items-start gap-5 animate-in fade-in slide-in-from-left duration-300">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-[12px] flex items-center justify-center">
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="flex-1 max-w-[82%]">
        <div className="bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/60 rounded-[20px] rounded-tl-sm px-6 py-4 shadow-[0_1px_2px_rgba(37,99,235,0.10),0_4px_12px_-2px_rgba(37,99,235,0.08)]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      className={cn(
        "relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      <div className="relative max-w-7xl mx-auto w-full z-10 -mt-12 md:-mt-16 lg:-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
          {/* Left side - Marketing copy */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <Badge variant="warning" size="md" className="font-semibold tracking-wide">
              MEET FUND FROLIC
            </Badge>

            {/* Main headline with strategic color */}
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-foreground">
              The funding buddy you actually want on your team.
            </h1>

            <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Millions in federal, state, and private grants go unclaimed every year… and a bunch of them could be perfect for your startup. Type your project idea into our{' '}
              <span className="font-semibold text-primary">AI Grant Finder</span>, and we'll match you with the grants that actually make sense for you. No equity. No shady term sheets. Just funding opportunities that let you scale fast, stay in control, and actually enjoy the ride.
            </p>
          </div>

          {/* Right side - AI Chat Interface */}
          <div className="w-full h-[320px] sm:h-[400px] lg:h-[600px]">
            {/* Main container with sophisticated floating elevation */}
            <div className="relative w-full h-full bg-gradient-to-br from-background-elevated via-background to-background-elevated rounded-xl sm:rounded-2xl lg:rounded-[24px] shadow-[0_1px_3px_rgba(37,99,235,0.12),0_8px_16px_-4px_rgba(37,99,235,0.10),0_20px_40px_-8px_rgba(37,99,235,0.08),0_32px_64px_-12px_rgba(37,99,235,0.04)] backdrop-blur-md flex flex-col overflow-hidden">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none" />

              {/* Chat header - minimal and ethereal */}
              <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-b from-background-elevated/60 to-transparent backdrop-blur-xl flex items-center gap-3 border-b border-border/50">
                <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-primary via-blue-600 to-blue-700 rounded-[14px] flex items-center justify-center shadow-[0_1px_2px_rgba(37,99,235,0.25),0_4px_8px_rgba(37,99,235,0.20),0_12px_24px_rgba(37,99,235,0.12)]">
                  <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-body text-sm sm:text-base font-medium text-foreground">
                    AI Grant Finder
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground/60 mt-0.5">
                    Powered by Fund Frolic
                  </p>
                </div>
              </div>

              {/* Chat messages with refined spacing */}
              <div
                ref={chatContainerRef}
                className="relative z-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 space-y-4 sm:space-y-6 overflow-y-auto"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start gap-5 animate-in fade-in duration-500",
                      message.type === 'user' ? 'justify-end slide-in-from-right' : 'slide-in-from-left'
                    )}
                  >
                    {message.type === 'ai' && (
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-[12px] flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    )}

                    <div className={cn(
                      "flex-1 max-w-[82%]",
                      message.type === 'user' && "text-right"
                    )}>
                      <div className={cn(
                        "rounded-[20px] px-4 py-3 sm:px-6 sm:py-5",
                        message.type === 'ai'
                          ? "bg-gradient-to-br from-blue-50 via-blue-50/80 to-blue-100/60 rounded-tl-sm shadow-[0_1px_2px_rgba(37,99,235,0.10),0_4px_12px_-2px_rgba(37,99,235,0.08),0_12px_24px_-4px_rgba(37,99,235,0.05),0_20px_40px_-8px_rgba(37,99,235,0.03)]"
                          : "inline-block bg-gradient-to-br from-background-elevated to-background/95 rounded-tr-sm shadow-[0_1px_2px_rgba(107,114,128,0.08),0_4px_12px_-2px_rgba(107,114,128,0.06),0_12px_24px_-4px_rgba(107,114,128,0.04),0_20px_40px_-8px_rgba(107,114,128,0.02)]"
                      )}>
                        <div className={cn(
                          "font-body text-sm sm:text-base text-foreground leading-[1.7]",
                          message.type === 'user' && "text-left"
                        )}>
                          {message.content}
                        </div>
                      </div>
                      <span className={cn(
                        "font-body text-xs text-muted-foreground/80 mt-2 sm:mt-3 inline-block",
                        message.type === 'ai' ? "ml-2" : "mr-2"
                      )}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input with refined polish - changes based on step */}
              <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8 bg-gradient-to-t from-background-elevated/95 via-background-elevated/70 to-transparent backdrop-blur-md border-t border-border/40">
                {step === 1 && (
                  <form onSubmit={handleStep1Submit} className="flex items-end gap-4">
                    <textarea
                      value={formData.idea}
                      onChange={(e) => setFormData(prev => ({ ...prev, idea: e.target.value }))}
                      placeholder="Describe your startup or project..."
                      rows={1}
                      className="flex-1 px-6 py-4 bg-background/90 backdrop-blur-sm rounded-[18px] font-body text-[15px] text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:shadow-[0_2px_4px_rgba(37,99,235,0.10),0_8px_16px_-2px_rgba(37,99,235,0.12),0_16px_32px_-4px_rgba(37,99,235,0.08),inset_0_1px_2px_rgb(255,255,255,0.8)] transition-all duration-300 resize-none"
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!formData.idea.trim() || isLoading}
                      className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_6px_12px_rgba(37,99,235,0.20),0_12px_24px_-2px_rgba(37,99,235,0.15),0_20px_40px_-4px_rgba(37,99,235,0.10)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_8px_16px_rgba(37,99,235,0.25),0_16px_32px_-2px_rgba(37,99,235,0.20),0_24px_48px_-4px_rgba(37,99,235,0.12)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      aria-label="Send message"
                    >
                      <svg className="w-6 h-6 text-primary-foreground drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleStep2Submit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                        className="px-6 py-4 bg-background/90 backdrop-blur-sm rounded-[18px] font-body text-[15px] text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300"
                      />
                      <div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, email: e.target.value }));
                            if (errors.email) setErrors({});
                          }}
                          placeholder="Your email"
                          className={cn(
                            "w-full px-6 py-4 bg-background/90 backdrop-blur-sm rounded-[18px] font-body text-[15px] text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 transition-all duration-300",
                            errors.email ? "ring-2 ring-error focus:ring-error" : "focus:ring-primary/40"
                          )}
                        />
                        {errors.email && (
                          <p className="text-xs text-error mt-1.5 ml-2">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!formData.name.trim() || !formData.email.trim() || isLoading}
                      className="w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_6px_12px_rgba(37,99,235,0.20),0_12px_24px_-2px_rgba(37,99,235,0.15)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_8px_16px_rgba(37,99,235,0.25),0_16px_32px_-2px_rgba(37,99,235,0.20)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Continue
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleStep3Submit} className="space-y-4">
                    <div className="max-h-[180px] overflow-y-auto space-y-2 px-2 py-1">
                      {CERTIFICATIONS.map((cert) => (
                        <label
                          key={cert}
                          className="flex items-center gap-3 px-4 py-3 bg-background/60 hover:bg-background/90 rounded-[14px] cursor-pointer transition-all duration-200 group"
                        >
                          <input
                            type="checkbox"
                            checked={formData.certifications.includes(cert)}
                            onChange={() => toggleCertification(cert)}
                            className="w-4 h-4 rounded border-2 border-primary/30 text-primary focus:ring-2 focus:ring-primary/40 cursor-pointer"
                          />
                          <span className="font-body text-sm text-foreground group-hover:text-primary transition-colors">
                            {cert}
                          </span>
                        </label>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="Business name (optional)"
                      className="w-full px-6 py-4 bg-background/90 backdrop-blur-sm rounded-[18px] font-body text-[15px] text-foreground placeholder:text-muted-foreground/70 shadow-[0_1px_2px_rgba(59,130,246,0.06),0_4px_8px_-2px_rgba(59,130,246,0.04),0_8px_16px_-4px_rgba(59,130,246,0.02),inset_0_1px_2px_rgb(255,255,255,0.8)] focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-6 py-4 bg-gradient-to-br from-primary via-blue-600 to-blue-700 hover:from-blue-600 hover:via-primary hover:to-blue-600 rounded-[18px] font-body font-semibold text-primary-foreground transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-[0_1px_3px_rgba(37,99,235,0.25),0_6px_12px_rgba(37,99,235,0.20),0_12px_24px_-2px_rgba(37,99,235,0.15)] hover:shadow-[0_2px_4px_rgba(37,99,235,0.30),0_8px_16px_rgba(37,99,235,0.25),0_16px_32px_-2px_rgba(37,99,235,0.20)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Find My Grants
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";
