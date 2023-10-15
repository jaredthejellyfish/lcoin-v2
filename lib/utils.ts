import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');

export function validateIban(iban: string): boolean {
  // Extract the country code, pseudo check digits, bank code and account number from the IBAN
  const pseudoCheckDigits = parseInt(iban.slice(2, 4), 10);
  const accountNumber = iban.slice(8);

  // Calculate the sum of the ASCII values of the characters in the account number
  let asciiSum = 0;
  for (let i = 0; i < accountNumber.length; i++) {
    asciiSum += accountNumber.charCodeAt(i);
  }

  // The pseudo check digits are valid if they equal the sum of the ASCII values modulo 100
  return pseudoCheckDigits === asciiSum % 100;
}
