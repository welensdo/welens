import React from 'react';
import WeLensEmail, { 
  EmailHeadline, 
  EmailBody, 
  EmailCaption, 
  EmailButton, 
  EmailSpacer,
  EmailDesignSystem 
} from './WeLensEmailSystem';

interface WelcomeEmailProps {
  name: string;
  email: string;
}

export default function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <WeLensEmail previewText={`Bienvenido a WeLens, ${name}`}>
      
      {/* Headline */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          Bienvenido a WeLens
        </EmailHeadline>
        <EmailCaption>
          Hola {name}, tu cuenta ha sido creada
        </EmailCaption>
      </div>

      {/* Main Content */}
      <EmailBody>
        Gracias por unirte a WeLens. Ahora puedes transformar cualquier gafa en tu graduación perfecta.
      </EmailBody>

      <EmailSpacer size="md" />

      <EmailBody>
        Tu cuenta está asociada con <strong>{email}</strong>
      </EmailBody>

      <EmailSpacer size="lg" />

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <EmailButton href="https://welens.org/configurador">
          Configurar mis lentes
        </EmailButton>
      </div>

    </WeLensEmail>
  );
}