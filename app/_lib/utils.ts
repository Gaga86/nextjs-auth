import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function sevenDaysFromNow() {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}