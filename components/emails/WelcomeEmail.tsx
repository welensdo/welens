import React from 'react';
import EmailTemplate from './EmailTemplate';
import EmailButton from './EmailButton';

interface WelcomeEmailProps {
  name: string;
  email: string;
}

export default function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <EmailTemplate previewText="¡Bienvenido a WeLens! Tu cuenta ha sido creada exitosamente.">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          color: '#1E293B',
          fontSize: '32px',
          fontWeight: '600',
          letterSpacing: '-0.025em',
          lineHeight: '40px',
          margin: '0 0 16px',
        }}>
          ¡Bienvenido a WeLens!
        </h1>
        <p style={{
          color: '#64748B',
          fontSize: '18px',
          lineHeight: '28px',
          margin: '0',
        }}>
          Tu cuenta ha sido creada exitosamente
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
          Gracias por unirte a WeLens. Estamos emocionados de tenerte con nosotros.
        </p>
        <p style={{
          color: '#475569',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0',
        }}>
          Con WeLens, ahora puedes transformar cualquier gafa en tu graduación perfecta. 
          ¡Es hora de descubrir una nueva forma de ver!
        </p>
      </div>

      <div style={{
        backgroundColor: '#EFF6FF',
        borderLeft: '4px solid #3B82F6',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '32px',
      }}>
        <h3 style={{
          color: '#1E293B',
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 12px',
        }}>
          ¿Qué puedes hacer ahora?
        </h3>
        <ul style={{
          color: '#475569',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0',
          paddingLeft: '20px',
        }}>
          <li style={{ marginBottom: '8px' }}>Configura tu graduación personalizada</li>
          <li style={{ marginBottom: '8px' }}>Explora nuestra colección de accesorios</li>
          <li style={{ marginBottom: '8px' }}>Realiza tu primer pedido</li>
          <li>Accede a tu panel personal</li>
        </ul>
      </div>

      <EmailButton href="https://welens.com/configurador">
        Configurar mis lentes
      </EmailButton>

      <div style={{
        textAlign: 'center',
        borderTop: '1px solid #E2E8F0',
        paddingTop: '24px',
      }}>
        <p style={{
          color: '#64748B',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0',
        }}>
          Tu cuenta está asociada con: <strong>{email}</strong>
        </p>
      </div>
    </EmailTemplate>
  );
}