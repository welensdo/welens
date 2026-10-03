import React from 'react';
import WeLensEmail, { 
  EmailHeadline, 
  EmailBody, 
  EmailCaption, 
  EmailSpacer,
  EmailDesignSystem,
  EmailFooterLinks
} from './WeLensEmailSystem';
import { SupportedLanguage, getEmailTranslations } from '@/lib/email-i18n';

interface CustomAdminEmailProps {
  subject: string;
  message: string;
  language?: SupportedLanguage;
  senderAlias?: string;
}

export default function CustomAdminEmail({ 
  subject, 
  message, 
  language = 'es',
  senderAlias = 'data'
}: CustomAdminEmailProps) {
  const translations = getEmailTranslations(language);
  
  // Convert line breaks to proper React elements
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <WeLensEmail 
      previewText={subject}
      language={language}
    >
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          {subject}
        </EmailHeadline>
        <EmailCaption>
          {language === 'es' ? 'Mensaje desde WeLens' : 'Message from WeLens'}
        </EmailCaption>
      </div>

      {/* Message Content */}
      <EmailBody>
        {formatMessage(message)}
      </EmailBody>

      <EmailSpacer size="lg" />

      {/* Sender Info */}
      <div style={{ 
        backgroundColor: EmailDesignSystem.colors.surface,
        padding: EmailDesignSystem.spacing.md,
        borderRadius: '8px',
        marginBottom: EmailDesignSystem.spacing.lg
      }}>
        <EmailCaption style={{ margin: 0 }}>
          {translations.customAdmin.sentFrom}: {translations.senderNames[senderAlias as keyof typeof translations.senderNames] || 'WeLens'}
        </EmailCaption>
      </div>

      {/* Closing */}
      <EmailCaption>
        {language === 'es' ? (
          <>Saludos,<br />Equipo WeLens</>
        ) : (
          <>Best regards,<br />WeLens Team</>
        )}
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