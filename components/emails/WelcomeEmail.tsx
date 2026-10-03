import React from 'react';
import PremiumEmailTemplate from './PremiumEmailTemplate';

interface WelcomeEmailProps {
  name: string;
  email: string;
}

export default function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <PremiumEmailTemplate 
      previewText="¡Bienvenido a WeLens! Tu cuenta ha sido creada exitosamente."
      title="¡Bienvenido a WeLens!"
      subtitle="Tu cuenta ha sido creada exitosamente"
    >
      {/* Hero Icon */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '48px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        margin: '0 auto 48px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
      }}>
        <div style={{
          fontSize: '48px',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        }}>
          👓
        </div>
      </div>

      {/* Welcome Message */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '40px',
        border: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
        }}></div>
        
        <h2 style={{
          color: '#1E293B',
          fontSize: '28px',
          fontWeight: '700',
          margin: '0 0 20px',
          background: 'linear-gradient(135deg, #1E293B 0%, #475569 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
        }}>
          Hola {name} 👋
        </h2>
        
        <p style={{
          color: '#475569',
          fontSize: '18px',
          lineHeight: '28px',
          margin: '0 0 20px',
          position: 'relative',
        }}>
          Gracias por unirte a WeLens. Estamos emocionados de tenerte con nosotros y de ser parte de tu transformación visual.
        </p>
        
        <p style={{
          color: '#475569',
          fontSize: '16px',
          lineHeight: '26px',
          margin: '0',
          position: 'relative',
        }}>
          Con WeLens, ahora puedes transformar cualquier gafa en tu graduación perfecta. 
          ¡Es hora de descubrir una nueva forma de ver el mundo! ✨
        </p>
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px' }}>
            Graduación Precisa
          </h3>
          <p style={{ fontSize: '14px', margin: '0', opacity: '0.9' }}>
            Medición exacta
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px' }}>
            Proceso Rápido
          </h3>
          <p style={{ fontSize: '14px', margin: '0', opacity: '0.9' }}>
            Resultados inmediatos
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>💎</div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px' }}>
            Calidad Premium
          </h3>
          <p style={{ fontSize: '14px', margin: '0', opacity: '0.9' }}>
            Materiales de lujo
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          borderRadius: '16px',
          padding: '24px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 8px 25px rgba(67, 233, 123, 0.3)',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚚</div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px' }}>
            Envío Gratis
          </h3>
          <p style={{ fontSize: '14px', margin: '0', opacity: '0.9' }}>
            A todo el país
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
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
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        }}></div>
        
        <h3 style={{
          color: '#1E293B',
          fontSize: '24px',
          fontWeight: '700',
          margin: '0 0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          🎯 ¿Qué hacer ahora?
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>1</div>
            <p style={{ color: '#475569', fontSize: '16px', margin: '0', fontWeight: '500' }}>
              Configura tu graduación personalizada
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>2</div>
            <p style={{ color: '#475569', fontSize: '16px', margin: '0', fontWeight: '500' }}>
              Explora nuestra colección de accesorios premium
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>3</div>
            <p style={{ color: '#475569', fontSize: '16px', margin: '0', fontWeight: '500' }}>
              Realiza tu primer pedido con envío gratis
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <a
          href="https://welens.org/configurador"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '18px 48px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            border: 'none',
            letterSpacing: '0.5px',
          }}
        >
          🚀 Configurar mis lentes ahora
        </a>
      </div>

      {/* Account Info */}
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
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0',
        }}>
          Tu cuenta está asociada con: 
          <span style={{
            color: '#1E293B',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginLeft: '8px',
          }}>
            {email}
          </span>
        </p>
        <p style={{
          color: '#64748B',
          fontSize: '14px',
          margin: '12px 0 0 0',
        }}>
          ¿Necesitas ayuda? Responde a este correo y te ayudaremos 💬
        </p>
      </div>
    </PremiumEmailTemplate>
  );
}