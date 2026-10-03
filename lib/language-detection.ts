// Language Detection Service for WeLens
import { 
  SupportedLanguage, 
  detectUserLanguage,
  detectLanguageFromEmail,
  detectLanguageFromGeolocation,
  detectLanguageFromUserAgent
} from './email-i18n';

// User interface for language detection
export interface UserLanguageData {
  email?: string;
  userAgent?: string;
  country?: string;
  acceptLanguage?: string;
  userPreference?: SupportedLanguage;
  ipCountry?: string;
  timezone?: string;
}

// Enhanced language detection with multiple data sources
export class LanguageDetectionService {
  
  /**
   * Detect user language from Next.js request headers
   */
  static detectFromRequest(req: {
    headers: {
      'accept-language'?: string;
      'user-agent'?: string;
      'cf-ipcountry'?: string; // Cloudflare country header
      'x-forwarded-country'?: string; // Other CDN country headers
    };
  }): SupportedLanguage {
    
    const acceptLanguage = req.headers['accept-language'];
    const userAgent = req.headers['user-agent'];
    const country = req.headers['cf-ipcountry'] || req.headers['x-forwarded-country'];
    
    return this.detectFromHeaders({
      acceptLanguage,
      userAgent,
      country
    });
  }

  /**
   * Detect language from HTTP headers
   */
  static detectFromHeaders({
    acceptLanguage,
    userAgent,
    country
  }: {
    acceptLanguage?: string;
    userAgent?: string;
    country?: string;
  }): SupportedLanguage {
    
    // 1. Accept-Language header (highest priority for web requests)
    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase());
      
      // Look for exact Spanish matches
      const spanishLanguages = ['es', 'es-mx', 'es-es', 'es-ar', 'es-co', 'es-cl', 'es-pe'];
      if (languages.some(lang => spanishLanguages.includes(lang))) {
        return 'es';
      }
      
      // Look for English
      if (languages.some(lang => lang.startsWith('en'))) {
        return 'en';
      }
    }

    // 2. Geographic location
    if (country) {
      const geoLanguage = detectLanguageFromGeolocation(country);
      if (geoLanguage === 'es') return 'es';
    }

    // 3. User agent fallback
    if (userAgent) {
      return detectLanguageFromUserAgent(userAgent);
    }

    // 4. Default to Spanish (WeLens primary market)
    return 'es';
  }

  /**
   * Detect language from user database record
   */
  static detectFromUser(user: {
    email?: string;
    language?: SupportedLanguage;
    country?: string;
    timezone?: string;
  }): SupportedLanguage {
    
    // 1. Explicit user preference (highest priority)
    if (user.language) {
      return user.language;
    }

    // 2. User's country
    if (user.country) {
      const geoLanguage = detectLanguageFromGeolocation(user.country);
      if (geoLanguage === 'es') return 'es';
    }

    // 3. Timezone inference
    if (user.timezone) {
      const tzLanguage = this.detectFromTimezone(user.timezone);
      if (tzLanguage === 'es') return 'es';
    }

    // 4. Email domain
    if (user.email) {
      return detectLanguageFromEmail(user.email);
    }

    return 'es';
  }

  /**
   * Detect language from timezone
   */
  static detectFromTimezone(timezone: string): SupportedLanguage {
    const spanishTimezones = [
      'America/Mexico_City',
      'America/Cancun',
      'America/Merida',
      'America/Monterrey',
      'America/Matamoros',
      'America/Mazatlan',
      'America/Chihuahua',
      'America/Hermosillo',
      'America/Tijuana',
      'Europe/Madrid',
      'Atlantic/Canary',
      'America/Argentina/Buenos_Aires',
      'America/Argentina/Cordoba',
      'America/Argentina/Mendoza',
      'America/Bogota',
      'America/Santiago',
      'America/Lima',
      'America/Caracas',
      'America/Guayaquil',
      'America/Guatemala',
      'America/Tegucigalpa',
      'America/Managua',
      'America/Costa_Rica',
      'America/Panama',
      'America/Santo_Domingo',
      'America/Havana'
    ];

    return spanishTimezones.includes(timezone) ? 'es' : 'en';
  }

  /**
   * Smart detection combining all available signals
   */
  static detectSmart({
    email,
    userAgent,
    country,
    acceptLanguage,
    userPreference,
    ipCountry,
    timezone
  }: UserLanguageData): SupportedLanguage {
    
    // Create priority-weighted detection
    const signals: Array<{ language: SupportedLanguage; weight: number }> = [];

    // 1. User explicit preference (weight: 10)
    if (userPreference) {
      signals.push({ language: userPreference, weight: 10 });
    }

    // 2. Accept-Language header (weight: 8)
    if (acceptLanguage) {
      const headerLang = this.detectFromHeaders({ acceptLanguage });
      signals.push({ language: headerLang, weight: 8 });
    }

    // 3. Geographic signals (weight: 6)
    if (country) {
      const countryLang = detectLanguageFromGeolocation(country);
      signals.push({ language: countryLang, weight: 6 });
    }

    if (ipCountry && ipCountry !== country) {
      const ipLang = detectLanguageFromGeolocation(ipCountry);
      signals.push({ language: ipLang, weight: 5 });
    }

    // 4. Timezone (weight: 4)
    if (timezone) {
      const tzLang = this.detectFromTimezone(timezone);
      signals.push({ language: tzLang, weight: 4 });
    }

    // 5. Email domain (weight: 3)
    if (email) {
      const emailLang = detectLanguageFromEmail(email);
      signals.push({ language: emailLang, weight: 3 });
    }

    // 6. User agent (weight: 1)
    if (userAgent) {
      const uaLang = detectLanguageFromUserAgent(userAgent);
      signals.push({ language: uaLang, weight: 1 });
    }

    // Calculate weighted scores
    const scores = { es: 0, en: 0 };
    signals.forEach(signal => {
      scores[signal.language] += signal.weight;
    });

    // Return language with highest score, default to Spanish
    return scores.es >= scores.en ? 'es' : 'en';
  }

  /**
   * Get language for email sending (with fallback chain)
   */
  static getEmailLanguage({
    userRecord,
    requestData,
    fallbackLanguage = 'es'
  }: {
    userRecord?: {
      email?: string;
      language?: SupportedLanguage;
      country?: string;
      timezone?: string;
    };
    requestData?: {
      headers?: {
        'accept-language'?: string;
        'user-agent'?: string;
        'cf-ipcountry'?: string;
        'x-forwarded-country'?: string;
      };
    };
    fallbackLanguage?: SupportedLanguage;
  }): SupportedLanguage {
    
    // Try user record first
    if (userRecord) {
      const userLanguage = this.detectFromUser(userRecord);
      if (userLanguage) return userLanguage;
    }

    // Try request headers
    if (requestData?.headers) {
      return this.detectFromRequest({ headers: requestData.headers });
    }

    return fallbackLanguage;
  }
}

// Convenience functions for common use cases

/**
 * Quick language detection for API routes
 */
export function detectLanguageFromAPI(req: {
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
}): SupportedLanguage {
  
  // Check for explicit language parameter
  const langParam = req.query?.lang || req.query?.language;
  if (langParam === 'es' || langParam === 'en') {
    return langParam as SupportedLanguage;
  }

  // Detect from headers
  return LanguageDetectionService.detectFromRequest({
    headers: {
      'accept-language': req.headers['accept-language'] as string,
      'user-agent': req.headers['user-agent'] as string,
      'cf-ipcountry': req.headers['cf-ipcountry'] as string,
      'x-forwarded-country': req.headers['x-forwarded-country'] as string
    }
  });
}

/**
 * Language detection for user registration/login
 */
export function detectLanguageForNewUser({
  email,
  request
}: {
  email: string;
  request?: {
    headers: Record<string, string | string[] | undefined>;
  };
}): SupportedLanguage {
  
  const signals: UserLanguageData = { email };
  
  if (request?.headers) {
    signals.acceptLanguage = request.headers['accept-language'] as string;
    signals.userAgent = request.headers['user-agent'] as string;
    signals.country = request.headers['cf-ipcountry'] as string || 
                     request.headers['x-forwarded-country'] as string;
  }

  return LanguageDetectionService.detectSmart(signals);
}

/**
 * Language detection for existing user emails
 */
export function detectLanguageForEmail({
  userEmail,
  userName,
  userCountry,
  userLanguagePreference
}: {
  userEmail: string;
  userName?: string;
  userCountry?: string;
  userLanguagePreference?: SupportedLanguage;
}): SupportedLanguage {
  
  return LanguageDetectionService.detectFromUser({
    email: userEmail,
    language: userLanguagePreference,
    country: userCountry
  });
}