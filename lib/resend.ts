import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email aliases disponibles
export const EMAIL_ALIASES = {
  data: 'data@welens.org',
  shipping: 'shipping@welens.org',
  soporte: 'soporte@welens.org', 
  careers: 'careers@welens.org',
  support: 'support@welens.org',
  legal: 'legal@welens.org',
  privacy: 'privacy@welens.org',
  hola: 'hola@welens.org',
} as const;

export const FROM_EMAIL = process.env.FROM_EMAIL || EMAIL_ALIASES.data;