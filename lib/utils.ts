import { clsx, type ClassValue } from 'clsx';

/** Class-name combiner used across all components. */
export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}
