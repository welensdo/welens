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

interface WelcomeEmailProps {
  name: string;
  email: string;
  language?: SupportedLanguage;
}

export default function WelcomeEmail({ 
  name, 
  email, 
  language = 'es' 
}: WelcomeEmailProps) {
  const translations = getEmailTranslations(language);
  const productUrl = language === 'en' 
    ? 'https://welens.org/en/configurator' 
    : 'https://welens.org/configurador';

  return (
    <WeLensEmail 
      previewText={`${translations.welcome.headline}, ${name}`}
      language={language}
    >
      
      {/* Headline */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.lg }}>
        <EmailHeadline>
          {translations.welcome.headline}
        </EmailHeadline>
        <EmailCaption>
          {language === 'es' ? `Hola ${name}, tu cuenta ha sido creada` : `Hello ${name}, your account has been created`}
        </EmailCaption>
      </div>

      {/* Main Content */}
      <EmailBody>
        {translations.welcome.body}
      </EmailBody>

      <EmailSpacer size="md" />

      <EmailBody>
        {language === 'es' 
          ? <>Tu cuenta está asociada con <strong>{email}</strong></>
          : <>Your account is associated with <strong>{email}</strong></>
        }
      </EmailBody>

      <EmailSpacer size="lg" />

      {/* Next Steps */}
      <div style={{ 
        backgroundColor: EmailDesignSystem.colors.surface,
        borderRadius: '12px',
        padding: EmailDesignSystem.spacing.lg,
        marginBottom: EmailDesignSystem.spacing.lg
      }}>
        <EmailBody style={{ fontWeight: '500', marginBottom: EmailDesignSystem.spacing.sm }}>
          {translations.welcome.nextSteps.title}:
        </EmailBody>
        <EmailCaption style={{ marginBottom: EmailDesignSystem.spacing.xs }}>
          1. {translations.welcome.nextSteps.step1}
        </EmailCaption>
        <EmailCaption style={{ marginBottom: EmailDesignSystem.spacing.xs }}>
          2. {translations.welcome.nextSteps.step2}
        </EmailCaption>
        <EmailCaption style={{ marginBottom: 0 }}>
          3. {translations.welcome.nextSteps.step3}
        </EmailCaption>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <EmailButton href={productUrl}>
          {translations.welcome.cta}
        </EmailButton>
      </div>

      <EmailSpacer size="lg" />

      {/* Footer Links */}
      <EmailFooterLinks 
        language={language}
        supportUrl={language === 'en' ? 'https://welens.org/en/support' : 'https://welens.org/soporte'}
      />

    </WeLensEmail>
  );
}