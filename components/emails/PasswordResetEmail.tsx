import React from 'react';
import WeLensEmail, { 
  EmailHeadline, 
  EmailBody, 
  EmailCaption, 
  EmailButton, 
  EmailSpacer,
  EmailDesignSystem,
  EmailFooterLinks
} from './WeLensEmailSystem';
import { SupportedLanguage, getEmailTranslations } from '@/lib/email-i18n';

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
  language?: SupportedLanguage;
}

export default function PasswordResetEmail({ 
  name, 
  resetUrl, 
  language = 'es' 
}: PasswordResetEmailProps) {
  const translations = getEmailTranslations(language);

  return (
    <WeLensEmail 
      previewText={translations.passwordReset.headline}
      language={language}
    >
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          {translations.passwordReset.headline}
        </EmailHeadline>
        <EmailCaption>
          {language === 'es' 
            ? `Hola ${name}, recibimos tu solicitud`
            : `Hello ${name}, we received your request`
          }
        </EmailCaption>
      </div>

      {/* Content */}
      <EmailBody>
        {translations.passwordReset.body}
      </EmailBody>

      <EmailSpacer size="lg" />

      {/* CTA */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.lg }}>
        <EmailButton href={resetUrl}>
          {translations.passwordReset.cta}
        </EmailButton>
      </div>

      {/* Expiry Notice */}
      <div style={{ 
        backgroundColor: EmailDesignSystem.colors.surface,
        padding: EmailDesignSystem.spacing.md,
        borderRadius: '8px',
        marginBottom: EmailDesignSystem.spacing.md
      }}>
        <EmailCaption style={{ 
          margin: `0 0 ${EmailDesignSystem.spacing.xs} 0`,
          fontWeight: '500' 
        }}>
          {translations.passwordReset.expiry}
        </EmailCaption>
      </div>

      {/* Security Note */}
      <div style={{ 
        backgroundColor: EmailDesignSystem.colors.surface,
        padding: EmailDesignSystem.spacing.md,
        borderRadius: '8px'
      }}>
        <EmailCaption style={{ margin: 0 }}>
          {translations.passwordReset.security}
        </EmailCaption>
      </div>

      <EmailSpacer size="md" />

      {/* Manual Link */}
      <EmailCaption>
        {language === 'es' 
          ? '¿Problemas con el botón? Copia este enlace:'
          : 'Having trouble with the button? Copy this link:'
        } <br />
        <span style={{ 
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '12px',
          wordBreak: 'break-all',
          color: EmailDesignSystem.colors.secondary
        }}>
          {resetUrl}
        </span>
      </EmailCaption>

      <EmailSpacer size="lg" />

      {/* Footer Links */}
      <EmailFooterLinks 
        language={language}
        supportUrl={language === 'en' ? 'https://welens.org/en/support' : 'https://welens.org/soporte'}
      />

    </WeLensEmail>
  );
}