import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration with proper sender names
export const EMAIL_ALIASES = {
  data: 'WeLens <data@welens.org>',
  shipping: 'WeLens Shipping <shipping@welens.org>',
  soporte: 'WeLens Soporte <soporte@welens.org>', 
  careers: 'WeLens Careers <careers@welens.org>',
  support: 'WeLens Support <support@welens.org>',
  legal: 'WeLens Legal <legal@welens.org>',
  privacy: 'WeLens Privacy <privacy@welens.org>',
  hola: 'WeLens <hola@welens.org>',
} as const;

export const FROM_EMAIL = process.env.FROM_EMAIL || EMAIL_ALIASES.data;