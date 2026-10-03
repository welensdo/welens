// Language Detection Middleware for Next.js
import { NextRequest, NextResponse } from 'next/server';
import { SupportedLanguage } from '../email-i18n';
import { LanguageDetectionService } from '../language-detection';

/**
 * Middleware to detect and set user language preferences
 */
export function languageMiddleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  
  // Skip middleware for static assets and API routes that don't need language detection
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/webhooks/') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return response;
  }

  // Detect language from request
  const detectedLanguage = LanguageDetectionService.detectFromRequest({
    headers: {
      'accept-language': request.headers.get('accept-language') || undefined,
      'user-agent': request.headers.get('user-agent') || undefined,
      'cf-ipcountry': request.headers.get('cf-ipcountry') || undefined,
      'x-forwarded-country': request.headers.get('x-forwarded-country') || undefined,
    }
  });

  // Set language in response headers for use in API routes
  response.headers.set('x-detected-language', detectedLanguage);
  
  // Set language cookie if not already set
  const currentLangCookie = request.cookies.get('welens-language');
  if (!currentLangCookie) {
    response.cookies.set('welens-language', detectedLanguage, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax'
    });
  }

  return response;
}

/**
 * Get detected language from request (for use in API routes)
 */
export function getLanguageFromRequest(request: Request | NextRequest): SupportedLanguage {
  
  // Try to get from custom header first (set by middleware)
  const detectedLanguage = request.headers.get('x-detected-language');
  if (detectedLanguage === 'es' || detectedLanguage === 'en') {
    return detectedLanguage;
  }

  // Fallback to detection
  return LanguageDetectionService.detectFromRequest({
    headers: {
      'accept-language': request.headers.get('accept-language') || undefined,
      'user-agent': request.headers.get('user-agent') || undefined,
      'cf-ipcountry': request.headers.get('cf-ipcountry') || undefined,
      'x-forwarded-country': request.headers.get('x-forwarded-country') || undefined,
    }
  });
}

/**
 * Get user language with cookie fallback
 */
export function getLanguageFromCookies(request: Request | NextRequest): SupportedLanguage {
  
  // Check for language cookie
  if ('cookies' in request) {
    const langCookie = request.cookies.get('welens-language');
    if (langCookie && (langCookie.value === 'es' || langCookie.value === 'en')) {
      return langCookie.value;
    }
  }

  // Fallback to detection
  return getLanguageFromRequest(request);
}

/**
 * Utility to set user language preference
 */
export function createLanguageCookie(language: SupportedLanguage): string {
  return `welens-language=${language}; Path=/; Max-Age=${365 * 24 * 60 * 60}; SameSite=Lax`;
}