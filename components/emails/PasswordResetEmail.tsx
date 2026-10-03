import React from 'react';
import WeLensEmail, { 
  EmailHeadline, 
  EmailBody, 
  EmailCaption, 
  EmailButton, 
  EmailSpacer,
  EmailDesignSystem 
} from './WeLensEmailSystem';

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export default function PasswordResetEmail({ name, resetUrl }: PasswordResetEmailProps) {
  return (
    <WeLensEmail previewText="Restablecer contraseña de WeLens">
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          Restablecer contraseña
        </EmailHeadline>
        <EmailCaption>
          Hola {name}, recibimos tu solicitud
        </EmailCaption>
      </div>

      {/* Content */}
      <EmailBody>
        Haz clic en el botón de abajo para crear una nueva contraseña. Este enlace expira en 1 hora.
      </EmailBody>

      <EmailSpacer size="lg" />

      {/* CTA */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.lg }}>
        <EmailButton href={resetUrl}>
          Restablecer contraseña
        </EmailButton>
      </div>

      {/* Security Note */}
      <div style={{ 
        backgroundColor: EmailDesignSystem.colors.surface,
        padding: EmailDesignSystem.spacing.md,
        borderRadius: '8px'
      }}>
        <EmailCaption style={{ margin: 0 }}>
          Si no solicitaste este cambio, puedes ignorar este correo. 
          Tu contraseña actual seguirá funcionando normalmente.
        </EmailCaption>
      </div>

      <EmailSpacer size="md" />

      {/* Manual Link */}
      <EmailCaption>
        ¿Problemas con el botón? Copia este enlace: <br />
        <span style={{ 
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '12px',
          wordBreak: 'break-all',
          color: EmailDesignSystem.colors.secondary
        }}>
          {resetUrl}
        </span>
      </EmailCaption>

    </WeLensEmail>
  );
}