import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function mergeCls(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
