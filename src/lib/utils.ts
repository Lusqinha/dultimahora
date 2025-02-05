import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(date: Date) {
  return date.toString().split('T')[0].split('-').reverse().join('/')
}

export function smallDateString(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'short', day: 'numeric' });

  const fixed_date = new Date(date).setDate(new Date(date).getDate() + 1)

  return `${formatter.format(fixed_date)}`
}

export function validateNumber(phoneNumber: string) {
  const regex = /^\+[1-9]\d{1,14}$/;
  return regex.test(phoneNumber);
}