import React from 'react';
import PremiumEmailTemplate from './PremiumEmailTemplate';

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
}

export default function PasswordResetEmail({ name, resetUrl }: PasswordResetEmailProps) {
  return (
    <PremiumEmailTemplate 
      previewText="Restablece tu contraseña de WeLens de forma segura"
      title="Restablecer contraseña"
      subtitle="Recibimos una solicitud para restablecer tu contraseña"
    >
      {/* Security Icon */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '48px',
        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        margin: '0 auto 48px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)',
      }}>
        <div style={{
          fontSize: '48px',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        }}>
          🔐
        </div>
      </div>

      {/* Main Message */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '40px',
        border: '1px solid #f59e0b',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
        }}></div>
        
        <h2 style={{
          color: '#92400e',
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 20px',
          background: 'linear-gradient(135deg, #92400e 0%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
        }}>
          Hola {name} 👋
        </h2>
        
        <p style={{
          color: '#92400e',
          fontSize: '18px',
          lineHeight: '28px',
          margin: '0 0 20px',
          position: 'relative',
        }}>
          Recibimos una solicitud para restablecer la contraseña de tu cuenta de WeLens.
        </p>
        
        <p style={{
          color: '#a16207',
          fontSize: '16px',
          lineHeight: '26px',
          margin: '0',
          position: 'relative',
        }}>
          Haz clic en el botón de abajo para crear una nueva contraseña segura. 🔒
        </p>
      </div>

      {/* Security Features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏱️</div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px' }}>
            Expira en 1h
          </h3>
          <p style={{ fontSize: '12px', margin: '0', opacity: '0.9' }}>
            Por seguridad
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px' }}>
            Uso único
          </h3>
          <p style={{ fontSize: '12px', margin: '0', opacity: '0.9' }}>
            Máxima protección
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛡️</div>
          <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px' }}>
            Cifrado SSL
          </h3>
          <p style={{ fontSize: '12px', margin: '0', opacity: '0.9' }}>
            Totalmente seguro
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <a
          href={resetUrl}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
            color: 'white',
            padding: '18px 48px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 12px 30px rgba(245, 158, 11, 0.4)',
            transition: 'all 0.3s ease',
            border: 'none',
            letterSpacing: '0.5px',
          }}
        >
          🔐 Restablecer mi contraseña
        </a>
      </div>

      {/* Security Warning */}
      <div style={{
        backgroundColor: '#fef3c7',
        border: '2px solid #f59e0b',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: 'linear-gradient(90deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
        }}></div>
        
        <h3 style={{
          color: '#92400e',
          fontSize: '20px',
          fontWeight: '700',
          margin: '0 0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          ⚠️ Información de seguridad
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
            }}>✓</div>
            <p style={{ color: '#92400e', fontSize: '15px', margin: '0', fontWeight: '500' }}>
              Este enlace expira en 1 hora por tu seguridad
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
            }}>✓</div>
            <p style={{ color: '#92400e', fontSize: '15px', margin: '0', fontWeight: '500' }}>
              Solo puede usarse una vez para máxima protección
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
            }}>✓</div>
            <p style={{ color: '#92400e', fontSize: '15px', margin: '0', fontWeight: '500' }}>
              Si no solicitaste esto, puedes ignorar este correo
            </p>
          </div>
        </div>
      </div>

      {/* Manual Link */}
      <div style={{
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '32px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '16px',
        padding: '24px',
        margin: '0 -24px',
      }}>
        <p style={{
          color: '#64748B',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0 0 16px',
          fontWeight: '500',
        }}>
          ¿Problemas con el botón? Copia este enlace en tu navegador:
        </p>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '12px',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          color: '#475569',
          wordBreak: 'break-all',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          {resetUrl}
        </div>
        <p style={{
          color: '#64748B',
          fontSize: '12px',
          margin: '12px 0 0 0',
        }}>
          ¿Necesitas ayuda? Responde a este correo 💬
        </p>
      </div>
    </PremiumEmailTemplate>
  );
}