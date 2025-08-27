import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { parse, format, toSeconds } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(isoDuration: string): string {
  if (!isoDuration) return "0:00";
  const duration = isoDuration
    .replace('PT', '')
    .replace('H', ':')
    .replace('M', ':')
    .replace('S', '');

  const parts = duration.split(':').map(Number);
  let hours = 0, minutes = 0, seconds = 0;

  if (isoDuration.includes('H')) {
    hours = parts.shift() || 0;
  }
  if (isoDuration.includes('M')) {
    minutes = parts.shift() || 0;
  }
  if (isoDuration.includes('S')) {
    seconds = parts.shift() || 0;
  }
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}