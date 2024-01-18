import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @function cn shadcn created to merge tw classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uniqueFunc<T extends Record<string, any>>(
  arr: T[],
  primaryKey: keyof T
) {
  const res = new Map();
  return arr.filter(
    (item) => !res.has(item[primaryKey]) && res.set(item[primaryKey], 1)
  );
}
