// Email Internationalization System for WeLens
export type SupportedLanguage = 'es' | 'en';

export interface EmailTranslations {
  // Common
  company: string;
  website: string;
  footer: {
    copyright: string;
    unsubscribe: string;
    contact: string;
  };
  
  // Welcome Email
  welcome: {
    subject: string;
    headline: string;
    body: string;
    cta: string;
    nextSteps: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
    };
  };

  // Order Confirmation
  orderConfirmation: {
    subject: (orderNumber: string) => string;
    headline: (orderNumber: string) => string;
    thankYou: string;
    orderDetails: string;
    orderNumber: string;
    orderDate: string;
    items: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
    shippingAddress: string;
    estimatedDelivery: string;
    trackingInfo: string;
  };

  // Order Status Updates
  orderStatus: {
    subject: (orderNumber: string, status: string) => string;
    headline: (status: string) => string;
    statusMessages: {
      pending: string;
      processing: string;
      manufacturing: string;
      quality_check: string;
      packaging: string;
      shipped: string;
      delivered: string;
      cancelled: string;
    };
    trackingNumber: string;
    estimatedDelivery: string;
    note: string;
  };

  // Password Reset
  passwordReset: {
    subject: string;
    headline: string;
    body: string;
    cta: string;
    expiry: string;
    security: string;
  };

  // Custom Admin Email
  customAdmin: {
    sentFrom: string;
  };

  // Email Names (for sender display)
  senderNames: {
    data: string;
    shipping: string;
    soporte: string;
    careers: string;
    support: string;
    legal: string;
    privacy: string;
    hola: string;
  };
}

// Spanish Translations
export const emailTranslationsES: EmailTranslations = {
  company: 'WeLens',
  website: 'https://welens.org',
  footer: {
    copyright: `© ${new Date().getFullYear()} WeLens`,
    unsubscribe: 'Darse de baja',
    contact: 'Contactar soporte'
  },

  welcome: {
    subject: '¡Bienvenido a WeLens! Tu cuenta ha sido creada',
    headline: '¡Bienvenido a WeLens!',
    body: 'Gracias por unirte a nosotros. Tu cuenta ha sido creada exitosamente y ya puedes comenzar a explorar nuestros productos revolucionarios.',
    cta: 'Explorar productos',
    nextSteps: {
      title: 'Próximos pasos',
      step1: 'Completa tu perfil para recomendaciones personalizadas',
      step2: 'Explora nuestro catálogo de lentes inteligentes',
      step3: 'Configura tu primer par de lentes'
    }
  },

  orderConfirmation: {
    subject: (orderNumber: string) => `Orden ${orderNumber} confirmada - WeLens`,
    headline: (orderNumber: string) => `¡Tu orden ${orderNumber} ha sido confirmada!`,
    thankYou: 'Gracias por tu compra. Hemos recibido tu pedido y está siendo procesado.',
    orderDetails: 'Detalles del pedido',
    orderNumber: 'Número de orden',
    orderDate: 'Fecha del pedido',
    items: 'Artículos',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    tax: 'Impuestos',
    total: 'Total',
    shippingAddress: 'Dirección de envío',
    estimatedDelivery: 'Entrega estimada',
    trackingInfo: 'Te enviaremos información de seguimiento una vez que tu pedido sea enviado.'
  },

  orderStatus: {
    subject: (orderNumber: string, status: string) => `Actualización: Tu orden ${orderNumber} está ${status.toLowerCase()}`,
    headline: (status: string) => `Estado de tu pedido: ${status}`,
    statusMessages: {
      pending: 'Pendiente',
      processing: 'En proceso',
      manufacturing: 'Fabricando',
      quality_check: 'Control de calidad',
      packaging: 'Empacando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    },
    trackingNumber: 'Número de seguimiento',
    estimatedDelivery: 'Entrega estimada',
    note: 'Nota adicional'
  },

  passwordReset: {
    subject: 'Restablecer contraseña - WeLens',
    headline: 'Restablecer tu contraseña',
    body: 'Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para crear una nueva contraseña.',
    cta: 'Restablecer contraseña',
    expiry: 'Este enlace expirará en 24 horas por seguridad.',
    security: 'Si no solicitaste este cambio, puedes ignorar este correo de forma segura.'
  },

  customAdmin: {
    sentFrom: 'Enviado desde'
  },

  senderNames: {
    data: 'WeLens',
    shipping: 'WeLens Envíos',
    soporte: 'WeLens Soporte',
    careers: 'WeLens Carreras',
    support: 'WeLens Soporte',
    legal: 'WeLens Legal',
    privacy: 'WeLens Privacidad',
    hola: 'WeLens'
  }
};

// English Translations
export const emailTranslationsEN: EmailTranslations = {
  company: 'WeLens',
  website: 'https://welens.org',
  footer: {
    copyright: `© ${new Date().getFullYear()} WeLens`,
    unsubscribe: 'Unsubscribe',
    contact: 'Contact support'
  },

  welcome: {
    subject: 'Welcome to WeLens! Your account has been created',
    headline: 'Welcome to WeLens!',
    body: 'Thank you for joining us. Your account has been successfully created and you can now start exploring our revolutionary products.',
    cta: 'Explore products',
    nextSteps: {
      title: 'Next steps',
      step1: 'Complete your profile for personalized recommendations',
      step2: 'Explore our smart lens catalog',
      step3: 'Configure your first pair of lenses'
    }
  },

  orderConfirmation: {
    subject: (orderNumber: string) => `Order ${orderNumber} confirmed - WeLens`,
    headline: (orderNumber: string) => `Your order ${orderNumber} has been confirmed!`,
    thankYou: 'Thank you for your purchase. We have received your order and it is being processed.',
    orderDetails: 'Order details',
    orderNumber: 'Order number',
    orderDate: 'Order date',
    items: 'Items',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax',
    total: 'Total',
    shippingAddress: 'Shipping address',
    estimatedDelivery: 'Estimated delivery',
    trackingInfo: 'We will send you tracking information once your order is shipped.'
  },

  orderStatus: {
    subject: (orderNumber: string, status: string) => `Update: Your order ${orderNumber} is ${status.toLowerCase()}`,
    headline: (status: string) => `Order status: ${status}`,
    statusMessages: {
      pending: 'Pending',
      processing: 'Processing',
      manufacturing: 'Manufacturing',
      quality_check: 'Quality check',
      packaging: 'Packaging',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    },
    trackingNumber: 'Tracking number',
    estimatedDelivery: 'Estimated delivery',
    note: 'Additional note'
  },

  passwordReset: {
    subject: 'Reset password - WeLens',
    headline: 'Reset your password',
    body: 'We received a request to reset the password for your account. Click the button below to create a new password.',
    cta: 'Reset password',
    expiry: 'This link will expire in 24 hours for security.',
    security: 'If you did not request this change, you can safely ignore this email.'
  },

  customAdmin: {
    sentFrom: 'Sent from'
  },

  senderNames: {
    data: 'WeLens',
    shipping: 'WeLens Shipping',
    soporte: 'WeLens Support',
    careers: 'WeLens Careers',
    support: 'WeLens Support',
    legal: 'WeLens Legal',
    privacy: 'WeLens Privacy',
    hola: 'WeLens'
  }
};

// Translation getter
export function getEmailTranslations(language: SupportedLanguage): EmailTranslations {
  switch (language) {
    case 'en':
      return emailTranslationsEN;
    case 'es':
    default:
      return emailTranslationsES;
  }
}

// Language detection utilities
export function detectLanguageFromEmail(email: string): SupportedLanguage {
  // Common English domains
  const englishDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
    'icloud.com', 'aol.com', 'protonmail.com', 'hey.com',
    '.com', '.org', '.net', '.edu', '.gov'
  ];

  // Spanish/Latin American domains
  const spanishDomains = [
    '.mx', '.es', '.ar', '.co', '.cl', '.pe', '.ve', '.ec', 
    '.gt', '.hn', '.sv', '.ni', '.cr', '.pa', '.do', '.pr', '.cu',
    'hotmail.es', 'yahoo.es', 'gmail.es'
  ];

  const emailLower = email.toLowerCase();
  
  // Check for Spanish domains first (more specific)
  if (spanishDomains.some(domain => emailLower.includes(domain))) {
    return 'es';
  }

  // Default to English for international domains
  return 'en';
}

export function detectLanguageFromUserAgent(userAgent?: string): SupportedLanguage {
  if (!userAgent) return 'es'; // Default to Spanish
  
  const ua = userAgent.toLowerCase();
  
  // Check for Spanish language indicators
  if (ua.includes('es-') || ua.includes('es_') || 
      ua.includes('spanish') || ua.includes('español')) {
    return 'es';
  }
  
  // Check for English language indicators
  if (ua.includes('en-') || ua.includes('en_') || 
      ua.includes('english')) {
    return 'en';
  }
  
  // Default to Spanish (WeLens is primarily Spanish market)
  return 'es';
}

export function detectLanguageFromGeolocation(country?: string): SupportedLanguage {
  if (!country) return 'es';
  
  const spanishSpeakingCountries = [
    'MX', 'ES', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'HN', 
    'SV', 'NI', 'CR', 'PA', 'DO', 'PR', 'CU', 'BO', 'PY', 'UY'
  ];
  
  return spanishSpeakingCountries.includes(country.toUpperCase()) ? 'es' : 'en';
}

// Smart language detection combining multiple signals
export function detectUserLanguage({
  email,
  userAgent,
  country,
  userPreference
}: {
  email?: string;
  userAgent?: string;
  country?: string;
  userPreference?: SupportedLanguage;
}): SupportedLanguage {
  
  // 1. User explicit preference (highest priority)
  if (userPreference) {
    return userPreference;
  }

  // 2. Geolocation (high priority)
  if (country) {
    const geoLang = detectLanguageFromGeolocation(country);
    if (geoLang === 'es') return 'es';
  }

  // 3. Email domain (medium priority)
  if (email) {
    const emailLang = detectLanguageFromEmail(email);
    if (emailLang === 'es') return 'es';
  }

  // 4. User agent (low priority)
  if (userAgent) {
    return detectLanguageFromUserAgent(userAgent);
  }

  // 5. Default fallback
  return 'es';
}