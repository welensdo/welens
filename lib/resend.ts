import { Resend } from 'resend';

// Only check for API key on server side
let resend: Resend | null = null;

if (typeof window === 'undefined') {
  // Server side only
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set in environment variables');
  } else {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
}

export { resend };

// Email configuration - addresses only for Resend compatibility
export const EMAIL_ADDRESSES = {
  data: 'data@welens.org',
  shipping: 'shipping@welens.org',
  soporte: 'soporte@welens.org', 
  careers: 'careers@welens.org',
  support: 'support@welens.org',
  legal: 'legal@welens.org',
  privacy: 'privacy@welens.org',
  hello: 'hello@welens.org',
} as const;

// Display names for each email address
export const EMAIL_NAMES = {
  data: 'WeLens',
  shipping: 'WeLens Shipping',
  soporte: 'WeLens Soporte', 
  careers: 'WeLens Careers',
  support: 'WeLens Support',
  legal: 'WeLens Legal',
  privacy: 'WeLens Privacy',
  hello: 'WeLens',
} as const;

// Combined email aliases with proper Resend format
export const EMAIL_ALIASES = EMAIL_ADDRESSES; // Keep backward compatibility

// Helper function to get proper from field
export function getFromEmail(alias: keyof typeof EMAIL_ADDRESSES) {
  return `${EMAIL_NAMES[alias]} <${EMAIL_ADDRESSES[alias]}>`;
}

export const FROM_EMAIL = process.env.FROM_EMAIL || EMAIL_ADDRESSES.data;