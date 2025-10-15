/**
 * TestimonialCard Molecule
 *
 * Client/colleague testimonials with attribution.
 * Container: bg-white border border-gray-200 rounded-lg p-6 shadow-sm.
 * Quote: font-inter text-lg text-gray-700 leading-relaxed with quotation marks.
 * Avatar: 48px (lg), circular, top or left.
 * Name: font-inter text-base font-semibold text-gray-900.
 * Role: text-gray-600 text-sm.
 * Company: text-gray-600 text-sm (optional).
 * Layout: Vertical (avatar top) or horizontal (avatar left).
 * Accessibility: <blockquote> semantic HTML, descriptive alt text.
 */

import { cn } from '@/lib/utils';
import { Avatar } from '@/components/atoms/Avatar';

// Quote icon
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
  </svg>
);

export interface TestimonialCardProps {
  /** Testimonial quote text */
  quote: string;
  /** Person's name */
  name: string;
  /** Person's role/title */
  role: string;
  /** Company name (optional) */
  company?: string;
  /** Avatar image URL (optional) */
  avatar?: string;
  /** Layout variant */
  layout?: 'vertical' | 'horizontal';
  /** Additional wrapper class */
  className?: string;
}

export const TestimonialCard = ({
  quote,
  name,
  role,
  company,
  avatar,
  layout = 'vertical',
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-lg p-6 shadow-sm",
        className
      )}
    >
      {layout === 'vertical' ? (
        // Vertical layout: avatar top, quote below
        <div className="flex flex-col gap-4">
          {/* Quote with icon */}
          <div>
            <QuoteIcon className="w-8 h-8 text-blue-600 mb-3" />
            <blockquote className="font-inter text-lg text-gray-700 leading-relaxed">
              "{quote}"
            </blockquote>
          </div>

          {/* Attribution */}
          <div className="flex items-center gap-3">
            <Avatar
              src={avatar}
              alt={`Photo of ${name}`}
              fallback={name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              size="lg"
            />
            <div>
              <p className="font-inter text-base font-semibold text-gray-900">
                {name}
              </p>
              <p className="font-inter text-sm text-gray-600">
                {role}
                {company && ` at ${company}`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Horizontal layout: avatar left, quote right
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar
              src={avatar}
              alt={`Photo of ${name}`}
              fallback={name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              size="lg"
            />
          </div>

          {/* Quote + Attribution */}
          <div className="flex flex-col gap-3">
            <div>
              <QuoteIcon className="w-6 h-6 text-blue-600 mb-2" />
              <blockquote className="font-inter text-lg text-gray-700 leading-relaxed">
                "{quote}"
              </blockquote>
            </div>
            <div>
              <p className="font-inter text-base font-semibold text-gray-900">
                {name}
              </p>
              <p className="font-inter text-sm text-gray-600">
                {role}
                {company && ` at ${company}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TestimonialCard.displayName = "TestimonialCard";
