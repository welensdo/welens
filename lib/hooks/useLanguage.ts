// React Hook for Language Management
'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { SupportedLanguage } from '../email-i18n';

// Language Context
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isLoading: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  isLoading: true
});

// Language Hook
export function useLanguage() {
  return useContext(LanguageContext);
}

// Language Provider Hook
export function useLanguageProvider() {
  const [language, setLanguageState] = useState<SupportedLanguage>('es');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language on client side
  useEffect(() => {
    // Check for stored language preference
    const storedLang = localStorage.getItem('welens-language');
    if (storedLang === 'es' || storedLang === 'en') {
      setLanguageState(storedLang);
      setIsLoading(false);
      return;
    }

    // Check for cookie
    const cookieLang = getCookieValue('welens-language');
    if (cookieLang === 'es' || cookieLang === 'en') {
      setLanguageState(cookieLang);
      localStorage.setItem('welens-language', cookieLang);
      setIsLoading(false);
      return;
    }

    // Detect from browser
    const browserLang = detectBrowserLanguage();
    setLanguageState(browserLang);
    localStorage.setItem('welens-language', browserLang);
    setIsLoading(false);
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('welens-language', lang);
    
    // Set cookie for server-side detection
    document.cookie = `welens-language=${lang}; Path=/; Max-Age=${365 * 24 * 60 * 60}; SameSite=Lax`;
    
    // Optional: Send to server to update user preference
    updateUserLanguagePreference(lang);
  };

  return {
    language,
    setLanguage,
    isLoading
  };
}

// Helper Functions

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
}

function detectBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') return 'es';
  
  const browserLangs = navigator.languages || [navigator.language];
  
  // Check for Spanish variants
  const spanishLangs = ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-CL'];
  if (browserLangs.some(lang => spanishLangs.includes(lang))) {
    return 'es';
  }
  
  // Check for English
  if (browserLangs.some(lang => lang.startsWith('en'))) {
    return 'en';
  }
  
  // Default to Spanish
  return 'es';
}

async function updateUserLanguagePreference(language: SupportedLanguage) {
  try {
    await fetch('/api/user/language-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language }),
    });
  } catch (error) {
    // Silently fail - not critical
    console.debug('Failed to update language preference:', error);
  }
}

// Language Selector Hook
export function useLanguageSelector() {
  const { language, setLanguage, isLoading } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };
  
  const selectLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
  };
  
  return {
    currentLanguage: language,
    isLoading,
    toggleLanguage,
    selectLanguage,
    availableLanguages: [
      { code: 'es', name: 'Español', nativeName: 'Español' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ] as const
  };
}

// Email Language Detection Hook
export function useEmailLanguage(userEmail?: string) {
  const [emailLanguage, setEmailLanguage] = useState<SupportedLanguage>('es');
  const { language: currentLanguage } = useLanguage();

  useEffect(() => {
    if (userEmail) {
      // Simple email domain detection
      const emailLower = userEmail.toLowerCase();
      
      const spanishDomains = [
        '.mx', '.es', '.ar', '.co', '.cl', '.pe', '.ve', '.ec',
        'hotmail.es', 'yahoo.es', 'gmail.es'
      ];
      
      const isSpanishEmail = spanishDomains.some(domain => 
        emailLower.includes(domain)
      );
      
      setEmailLanguage(isSpanishEmail ? 'es' : currentLanguage);
    } else {
      setEmailLanguage(currentLanguage);
    }
  }, [userEmail, currentLanguage]);

  return emailLanguage;
}