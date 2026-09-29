// Utilidades de validación y sanitización para el backend

export const validateEmail = (email: string): boolean => {
  // RFC 5322 compliant regex (simplified version)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254; // RFC max length
};

export const sanitizeString = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength) // Prevent extremely long inputs
    .replace(/[<>]/g, '') // Remove angle brackets for XSS prevention
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove inline event handlers
    .replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (typeof password !== 'string') {
    return { valid: false, error: 'La contraseña debe ser una cadena de texto' };
  }
  
  if (password.length < 6) {
    return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'La contraseña es demasiado larga' };
  }
  
  return { valid: true };
};

export const validateName = (name: string): { valid: boolean; error?: string } => {
  if (typeof name !== 'string') {
    return { valid: false, error: 'El nombre debe ser una cadena de texto' };
  }
  
  const sanitized = sanitizeString(name, 100);
  
  if (sanitized.length < 2) {
    return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }
  
  if (sanitized.length > 100) {
    return { valid: false, error: 'El nombre es demasiado largo' };
  }
  
  return { valid: true };
};

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (identifier: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxAttempts) {
    return false;
  }
  
  record.count++;
  return true;
};

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute
