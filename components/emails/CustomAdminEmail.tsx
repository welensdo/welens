import React from 'react';
import WeLensEmail, { 
  EmailHeadline, 
  EmailBody, 
  EmailCaption, 
  EmailSpacer,
  EmailDesignSystem 
} from './WeLensEmailSystem';

interface CustomAdminEmailProps {
  subject: string;
  message: string;
}

export default function CustomAdminEmail({ subject, message }: CustomAdminEmailProps) {
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
    <WeLensEmail previewText={subject}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          {subject}
        </EmailHeadline>
        <EmailCaption>
          Mensaje desde WeLens
        </EmailCaption>
      </div>

      {/* Message Content */}
      <EmailBody>
        {formatMessage(message)}
      </EmailBody>

      <EmailSpacer size="lg" />

      <EmailCaption>
        Saludos,<br />
        Equipo WeLens
      </EmailCaption>

    </WeLensEmail>
  );
}