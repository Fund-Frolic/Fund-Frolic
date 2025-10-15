/**
 * ProjectCard Molecule (Compound Component)
 *
 * Showcase portfolio projects with flexible layouts.
 * Container: white bg, gray-200 border, shadow-md → shadow-lg on hover.
 * Layouts: grid (vertical), featured (prominent), horizontal (split), minimal (compact).
 * Typography: Fraunces titles, Inter body. Tags: terracotta/sage variants.
 * Transitions: 150ms ease-out. Hover: Elevate shadow, subtle scale.
 * Spacing: 8-point grid (gap-4 = 16px, gap-6 = 24px, p-6 = 24px, p-8 = 32px).
 */

'use client';

import { createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Arrow right icon
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Eye icon for stats
const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

// Heart icon for stats
const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

// Context for layout variant
interface ProjectCardContextValue {
  layout: 'grid' | 'featured' | 'horizontal' | 'minimal';
}

const ProjectCardContext = createContext<ProjectCardContextValue | null>(null);

const useProjectCardContext = () => {
  const context = useContext(ProjectCardContext);
  if (!context) {
    throw new Error('ProjectCard sub-components must be used within ProjectCard');
  }
  return context;
};

// Main container variants
const projectCardVariants = cva(
  "bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-150 ease-out hover:shadow-lg",
  {
    variants: {
      layout: {
        grid: "flex flex-col overflow-hidden h-full",
        featured: "flex flex-col overflow-hidden hover:scale-[1.01] h-full",
        horizontal: "flex flex-col md:flex-row overflow-hidden h-full",
        minimal: "flex flex-col",
      },
    },
    defaultVariants: {
      layout: "grid",
    },
  }
);

export interface ProjectCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof projectCardVariants> {
  /** Layout variant */
  layout?: 'grid' | 'featured' | 'horizontal' | 'minimal';
  /** Children (compound components) */
  children: React.ReactNode;
}

// Main ProjectCard component
export const ProjectCard = ({
  layout = 'grid',
  children,
  className,
  ...props
}: ProjectCardProps) => {
  return (
    <ProjectCardContext.Provider value={{ layout }}>
      <article
        className={cn(projectCardVariants({ layout }), className)}
        {...props}
      >
        {children}
      </article>
    </ProjectCardContext.Provider>
  );
};

// ProjectCard.Image
interface ProjectCardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

ProjectCard.Image = function ProjectCardImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className,
}: ProjectCardImageProps) {
  const { layout } = useProjectCardContext();

  const containerClasses = cn(
    "relative overflow-hidden bg-gray-100 flex-shrink-0",
    layout === 'grid' && "w-full aspect-video",
    layout === 'featured' && "w-full aspect-[16/9]",
    layout === 'horizontal' && "w-full md:w-2/5 aspect-video md:aspect-square"
  );

  return (
    <div className={containerClasses}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn(
          "w-full h-full transition-transform duration-150 ease-out hover:scale-105",
          className
        )}
      />
    </div>
  );
};

// ProjectCard.Content - Wrapper for consistent spacing
interface ProjectCardContentProps {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Content = function ProjectCardContent({
  children,
  className,
}: ProjectCardContentProps) {
  const { layout } = useProjectCardContext();

  return (
    <div
      className={cn(
        "flex flex-col flex-1",
        layout === 'grid' && "p-6 gap-4",
        layout === 'featured' && "p-8 gap-6",
        layout === 'horizontal' && "p-6 gap-4",
        layout === 'minimal' && "p-6 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

// ProjectCard.Header
interface ProjectCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Header = function ProjectCardHeader({
  children,
  className,
}: ProjectCardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2 items-start", className)}>
      {children}
    </div>
  );
};

// ProjectCard.Badge
const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full w-fit",
  {
    variants: {
      variant: {
        featured: "bg-blue-100 text-blue-700",
        new: "bg-gold-100 text-gold-700",
      },
    },
    defaultVariants: {
      variant: "featured",
    },
  }
);

interface ProjectCardBadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Badge = function ProjectCardBadge({
  variant = 'featured',
  children,
  className,
}: ProjectCardBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  );
};

// ProjectCard.Title
interface ProjectCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Title = function ProjectCardTitle({
  children,
  className,
}: ProjectCardTitleProps) {
  const { layout } = useProjectCardContext();

  return (
    <h3
      className={cn(
        "font-display font-semibold text-gray-900",
        layout === 'featured' ? "text-3xl" : "text-2xl",
        layout === 'minimal' && "text-xl",
        className
      )}
    >
      {children}
    </h3>
  );
};

// ProjectCard.Description
interface ProjectCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Description = function ProjectCardDescription({
  children,
  className,
}: ProjectCardDescriptionProps) {
  return (
    <p
      className={cn(
        "font-inter text-base text-gray-700 leading-relaxed line-clamp-3",
        className
      )}
    >
      {children}
    </p>
  );
};

// ProjectCard.Tags
interface ProjectCardTagsProps {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Tags = function ProjectCardTags({
  children,
  className,
}: ProjectCardTagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {children}
    </div>
  );
};

// ProjectCard.Stats
interface ProjectCardStatsProps {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Stats = function ProjectCardStats({
  children,
  className,
}: ProjectCardStatsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {children}
    </div>
  );
};

// ProjectCard.Stat
interface ProjectCardStatProps {
  icon?: 'eye' | 'heart';
  value: string | number;
  label: string;
  className?: string;
}

ProjectCard.Stat = function ProjectCardStat({
  icon = 'eye',
  value,
  label,
  className,
}: ProjectCardStatProps) {
  const IconComponent = icon === 'heart' ? HeartIcon : EyeIcon;

  return (
    <div className={cn("flex items-center gap-1.5 text-gray-600", className)}>
      <IconComponent className="w-4 h-4" />
      <span className="text-sm font-medium">{value}</span>
      <span className="text-xs sr-only">{label}</span>
    </div>
  );
};

// ProjectCard.Footer
interface ProjectCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

ProjectCard.Footer = function ProjectCardFooter({
  children,
  className,
}: ProjectCardFooterProps) {
  return (
    <div className={cn("mt-auto", className)}>
      {children}
    </div>
  );
};

// ProjectCard.Link
interface ProjectCardLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}

ProjectCard.Link = function ProjectCardLink({
  href,
  children,
  className,
  showArrow = true,
}: ProjectCardLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-inter text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150 ease-out",
        className
      )}
    >
      {children}
      {showArrow && <ArrowRightIcon className="w-4 h-4" />}
    </a>
  );
};

ProjectCard.displayName = "ProjectCard";
