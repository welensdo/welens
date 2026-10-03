import React from 'react';
import EmailTemplate from './EmailTemplate';
import EmailButton from './EmailButton';

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export default function PasswordResetEmail({ name, resetUrl }: PasswordResetEmailProps) {
  return (
    <EmailTemplate previewText="Restablece tu contraseña de WeLens">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          backgroundColor: '#F59E0B',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            color: '#FFFFFF',
            fontSize: '32px',
          }}>
            🔑
          </div>
        </div>
        
        <h1 style={{
          color: '#1E293B',
          fontSize: '32px',
          fontWeight: '600',
          letterSpacing: '-0.025em',
          lineHeight: '40px',
          margin: '0 0 16px',
        }}>
          Restablecer contraseña
        </h1>
        <p style={{
          color: '#64748B',
          fontSize: '18px',
          lineHeight: '28px',
          margin: '0',
        }}>
          Recibimos una solicitud para restablecer tu contraseña
        </p>
      </div>

      <div style={{
        backgroundColor: '#F8FAFC',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
      }}>
        <h2 style={{
          color: '#1E293B',
          fontSize: '20px',
          fontWeight: '600',
          margin: '0 0 16px',
        }}>
          Hola {name},
        </h2>
        <p style={{
          color: '#475569',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 16px',
        }}>
          Recibimos una solicitud para restablecer la contraseña de tu cuenta de WeLens.
        </p>
        <p style={{
          color: '#475569',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0',
        }}>
          Haz clic en el botón de abajo para crear una nueva contraseña:
        </p>
      </div>

      <EmailButton href={resetUrl}>
        Restablecer mi contraseña
      </EmailButton>

      <div style={{
        backgroundColor: '#FEF3C7',
        border: '2px solid #F59E0B',
        borderRadius: '16px',
        padding: '24px',
        marginTop: '32px',
      }}>
        <h3 style={{
          color: '#92400E',
          fontSize: '16px',
          fontWeight: '600',
          margin: '0 0 12px',
        }}>
          ⚠️ Información importante
        </h3>
        <ul style={{
          color: '#92400E',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0',
          paddingLeft: '20px',
        }}>
          <li style={{ marginBottom: '8px' }}>Este enlace expira en 1 hora por seguridad</li>
          <li style={{ marginBottom: '8px' }}>Solo puede usarse una vez</li>
          <li style={{ marginBottom: '8px' }}>Si no solicitaste esto, puedes ignorar este email</li>
          <li>Tu contraseña actual seguirá funcionando hasta que la cambies</li>
        </ul>
      </div>

      <div style={{
        textAlign: 'center',
        borderTop: '1px solid #E2E8F0',
        paddingTop: '24px',
        marginTop: '32px',
      }}>
        <p style={{
          color: '#64748B',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0 0 16px',
        }}>
          Si tienes problemas con el botón, copia y pega este enlace en tu navegador:
        </p>
        <p style={{
          color: '#3B82F6',
          fontSize: '12px',
          lineHeight: '16px',
          margin: '0',
          wordBreak: 'break-all',
          fontFamily: 'monospace',
          backgroundColor: '#F1F5F9',
          padding: '8px',
          borderRadius: '6px',
        }}>
          {resetUrl}
        </p>
      </div>
    </EmailTemplate>
  );
}