/**
 * Utility Functions
 *
 * Common utility functions used throughout the application.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 *
 * Uses clsx to handle conditional classes and tailwind-merge
 * to properly merge Tailwind classes (later classes override earlier ones).
 *
 * @example
 * cn('px-2 py-1', 'px-4') // => 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // conditional
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
