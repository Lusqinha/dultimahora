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

export function formatCPF(value: string): string {
  return value
    .replace(/\D/g, '') // Remove tudo que não for número
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona o segundo ponto
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4') // Adiciona o traço
    .slice(0, 14); // Garante o tamanho correto
}

export function formatPhone(value: string): string {
  return value
    .replace(/\D/g, '') // Remove tudo que não for número
    .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses no DDD
    .replace(/(\(\d{2}\) \d{5})(\d)/, '$1-$2') // Adiciona o hífen no lugar correto
    .slice(0, 15); // Garante o tamanho correto
}