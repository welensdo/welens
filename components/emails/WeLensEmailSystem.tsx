import React from 'react';
import { SupportedLanguage, getEmailTranslations, EmailTranslations } from '@/lib/email-i18n';

// Design System Configuration
export const EmailDesignSystem = {
  // Typography Scale - Minimal and purposeful
  typography: {
    headline: {
      fontSize: '28px',
      lineHeight: '32px',
      fontWeight: '600',
      letterSpacing: '-0.4px',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
    },
    title: {
      fontSize: '21px',
      lineHeight: '25px',
      fontWeight: '500',
      letterSpacing: '-0.2px',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
    },
    body: {
      fontSize: '17px',
      lineHeight: '24px',
      fontWeight: '400',
      letterSpacing: '-0.1px',
      fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
    },
    caption: {
      fontSize: '14px',
      lineHeight: '18px',
      fontWeight: '400',
      letterSpacing: '0px',
      fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
    },
    legal: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      letterSpacing: '0px',
      fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
    }
  },

  // Restricted Color Palette
  colors: {
    primary: '#1d1d1f',      // Near black
    secondary: '#86868b',     // Neutral gray
    tertiary: '#d2d2d7',     // Light gray
    brand: '#0071e3',        // WeLens blue (used sparingly)
    background: '#ffffff',    // Pure white
    surface: '#f5f5f7',      // Off white
    divider: '#d2d2d7'       // Subtle border
  },

  // Consistent Spacing
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px'
  },

  // Container
  container: {
    maxWidth: '520px',       // Narrower for better readability
    padding: '32px'
  },

  // Buttons
  button: {
    primary: {
      backgroundColor: '#1d1d1f',
      color: '#ffffff',
      padding: '12px 20px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500',
      letterSpacing: '-0.1px',
      textDecoration: 'none',
      display: 'inline-block'
    }
  }
};

// Base Email Template - Clean and systematic
interface WeLensEmailProps {
  children: React.ReactNode;
  previewText?: string;
  language?: SupportedLanguage;
}

export default function WeLensEmail({ 
  children, 
  previewText, 
  language = 'es' 
}: WeLensEmailProps) {
  const { colors, container, typography, spacing } = EmailDesignSystem;
  const translations = getEmailTranslations(language);

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>WeLens</title>
        {previewText && (
          <div style={{ 
            display: 'none', 
            overflow: 'hidden', 
            lineHeight: '1px', 
            opacity: 0, 
            maxHeight: 0, 
            maxWidth: 0 
          }}>
            {previewText}
          </div>
        )}
        <style>{`
          @media screen and (max-width: 600px) {
            .container { 
              padding: 24px !important; 
              max-width: 100% !important; 
            }
            .content { 
              padding: 0 !important; 
            }
            .headline { 
              font-size: 24px !important; 
              line-height: 28px !important; 
            }
          }
        `}</style>
      </head>
      <body style={{
        backgroundColor: colors.background,
        fontFamily: typography.body.fontFamily,
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ 
          backgroundColor: colors.background,
          margin: 0,
          padding: 0,
          width: '100%',
          minHeight: '100vh'
        }}>
          <tr>
            <td align="center" style={{ padding: `${spacing.lg} ${spacing.sm}` }}>
              
              {/* Main Container */}
              <table 
                className="container"
                cellPadding="0" 
                cellSpacing="0" 
                style={{
                  backgroundColor: colors.background,
                  maxWidth: container.maxWidth,
                  width: '100%',
                  margin: '0 auto'
                }}
              >
                <tr>
                  <td className="content" style={{ padding: container.padding }}>
                    
                    {/* Logo */}
                    <div style={{ 
                      textAlign: 'center',
                      marginBottom: spacing.sm
                    }}>
                      <img 
                        src="https://welens.org/og-image.png" 
                        alt="WeLens" 
                        width="120"
                        height="120"
                        style={{ 
                          display: 'block', 
                          margin: '0 auto',
                          width: '120px',
                          height: '120px'
                        }} 
                      />
                    </div>

                    {/* Content */}
                    {children}

                    {/* Footer */}
                    <div style={{
                      marginTop: spacing.xxl,
                      paddingTop: spacing.lg,
                      borderTop: `1px solid ${colors.divider}`,
                      textAlign: 'center'
                    }}>
                      <p style={{
                        ...typography.legal,
                        color: colors.secondary,
                        margin: 0
                      }}>
                        {translations.footer.copyright}
                      </p>
                    </div>

                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

// Typography Components
export const EmailHeadline: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ 
  children, 
  style = {} 
}) => (
  <h1 className="headline" style={{
    ...EmailDesignSystem.typography.headline,
    color: EmailDesignSystem.colors.primary,
    margin: `0 0 ${EmailDesignSystem.spacing.sm} 0`,
    ...style
  }}>
    {children}
  </h1>
);

export const EmailTitle: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ 
  children, 
  style = {} 
}) => (
  <h2 style={{
    ...EmailDesignSystem.typography.title,
    color: EmailDesignSystem.colors.primary,
    margin: `0 0 ${EmailDesignSystem.spacing.sm} 0`,
    ...style
  }}>
    {children}
  </h2>
);

export const EmailBody: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ 
  children, 
  style = {} 
}) => (
  <p style={{
    ...EmailDesignSystem.typography.body,
    color: EmailDesignSystem.colors.primary,
    margin: `0 0 ${EmailDesignSystem.spacing.sm} 0`,
    ...style
  }}>
    {children}
  </p>
);

export const EmailCaption: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ 
  children, 
  style = {} 
}) => (
  <p style={{
    ...EmailDesignSystem.typography.caption,
    color: EmailDesignSystem.colors.secondary,
    margin: `0 0 ${EmailDesignSystem.spacing.sm} 0`,
    ...style
  }}>
    {children}
  </p>
);

export const EmailButton: React.FC<{ 
  href: string; 
  children: React.ReactNode; 
  style?: React.CSSProperties 
}> = ({ 
  href, 
  children, 
  style = {} 
}) => (
  <a 
    href={href} 
    style={{
      ...EmailDesignSystem.button.primary,
      ...style
    }}
  >
    {children}
  </a>
);

export const EmailDivider: React.FC<{ style?: React.CSSProperties }> = ({ style = {} }) => (
  <hr style={{
    border: 'none',
    borderTop: `1px solid ${EmailDesignSystem.colors.divider}`,
    margin: `${EmailDesignSystem.spacing.lg} 0`,
    ...style
  }} />
);

export const EmailSpacer: React.FC<{ size?: keyof typeof EmailDesignSystem.spacing }> = ({ 
  size = 'md' 
}) => (
  <div style={{ 
    height: EmailDesignSystem.spacing[size] 
  }} />
);

// Localized Footer Links Component
export const EmailFooterLinks: React.FC<{ 
  language?: SupportedLanguage;
  unsubscribeUrl?: string;
  supportUrl?: string;
  style?: React.CSSProperties;
}> = ({ 
  language = 'es',
  unsubscribeUrl,
  supportUrl,
  style = {} 
}) => {
  const translations = getEmailTranslations(language);
  
  return (
    <div style={{
      marginTop: EmailDesignSystem.spacing.md,
      textAlign: 'center',
      ...style
    }}>
      {unsubscribeUrl && (
        <>
          <a 
            href={unsubscribeUrl}
            style={{
              ...EmailDesignSystem.typography.legal,
              color: EmailDesignSystem.colors.secondary,
              textDecoration: 'underline',
              marginRight: EmailDesignSystem.spacing.sm
            }}
          >
            {translations.footer.unsubscribe}
          </a>
          <span style={{
            ...EmailDesignSystem.typography.legal,
            color: EmailDesignSystem.colors.tertiary,
            marginRight: EmailDesignSystem.spacing.sm
          }}>
            |
          </span>
        </>
      )}
      {supportUrl && (
        <a 
          href={supportUrl}
          style={{
            ...EmailDesignSystem.typography.legal,
            color: EmailDesignSystem.colors.secondary,
            textDecoration: 'underline'
          }}
        >
          {translations.footer.contact}
        </a>
      )}
    </div>
  );
};

// Context Provider for Language (for complex templates) - Server-safe version
export const getEmailLanguageContext = (language: SupportedLanguage = 'es') => ({
  language,
  translations: getEmailTranslations(language)
});

export const useEmailTranslations = (language?: SupportedLanguage) => {
  if (language) {
    return {
      language,
      translations: getEmailTranslations(language)
    };
  }
  
  // Return default language context for server-side rendering
  return getEmailLanguageContext('es');
};