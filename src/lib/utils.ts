import { type ClassValue, clsx } from 'clsx';
import { addDays, addWeeks } from 'date-fns';
import { twMerge } from 'tailwind-merge';

/**
 * @function cn shadcn created to merge tw classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function uniqueFunc<T extends Record<string, any>>(
  arr: T[],
  primaryKey: keyof T
) {
  const res = new Map();
  return arr.filter(
    (item) => !res.has(item[primaryKey]) && res.set(item[primaryKey], 1)
  );
}

//time
export const today = new Date();
export const tmr = addDays(today, 1);
export const futureWeeks = (weeks: number) => addWeeks(today, weeks);
