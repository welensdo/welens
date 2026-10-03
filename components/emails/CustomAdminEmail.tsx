import React from 'react';
import PremiumEmailTemplate from './PremiumEmailTemplate';

interface CustomAdminEmailProps {
  subject: string;
  message: string;
}

export default function CustomAdminEmail({ subject, message }: CustomAdminEmailProps) {
  // Convert line breaks to proper formatting
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <PremiumEmailTemplate 
      previewText={subject}
      title={subject}
      subtitle="Mensaje personalizado desde WeLens"
    >
      {/* Admin Icon */}
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
          💼
        </div>
      </div>

      {/* Message Content */}
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
        
        <div style={{
          color: '#475569',
          fontSize: '18px',
          lineHeight: '32px',
          position: 'relative',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}>
          {formatMessage(message)}
        </div>
      </div>

      {/* Brand Footer */}
      <div style={{
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '32px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '16px',
        padding: '24px',
        margin: '0 -24px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>W</span>
          </div>
          <span style={{
            color: '#1E293B',
            fontSize: '18px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            WeLens Team
          </span>
        </div>
        
        <p style={{
          color: '#64748B',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0 0 12px 0',
        }}>
          Transformando la forma en que ves el mundo 👓✨
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '12px',
          color: '#94a3b8',
        }}>
          <span>📧 hola@welens.org</span>
          <span>🌐 welens.org</span>
          <span>📱 +1 809 504 2837</span>
        </div>
      </div>
    </PremiumEmailTemplate>
  );
}