/* eslint-disable import/no-extraneous-dependencies -- clsx@"2.0.0" from class-variance-authority@0.7.0 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
