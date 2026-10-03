import React from 'react';

interface EmailTemplateProps {
  children: React.ReactNode;
  previewText?: string;
}

export default function EmailTemplate({ children, previewText }: EmailTemplateProps) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>WeLens</title>
        {previewText && (
          <div style={{ display: 'none', overflow: 'hidden', lineHeight: '1px', opacity: 0, maxHeight: 0, maxWidth: 0 }}>
            {previewText}
          </div>
        )}
      </head>
      <body style={{
        backgroundColor: '#F7F8FA',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}>
        <div style={{
          backgroundColor: '#F7F8FA',
          margin: 0,
          padding: '40px 0',
          width: '100%',
        }}>
          {/* Header */}
          <table width="100%" cellPadding="0" cellSpacing="0" style={{ margin: 0, padding: 0 }}>
            <tr>
              <td align="center">
                <table width="600" cellPadding="0" cellSpacing="0" style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px 24px 0 0',
                  maxWidth: '600px',
                  width: '100%',
                }}>
                  <tr>
                    <td style={{ padding: '40px 40px 30px', textAlign: 'center' }}>
                      <img 
                        src="https://welens.org/favicon.png" 
                        alt="WeLens" 
                        width="120" 
                        height="120"
                        style={{ 
                          display: 'block', 
                          margin: '0 auto',
                          maxWidth: '120px',
                          height: 'auto'
                        }} 
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          {/* Content */}
          <table width="100%" cellPadding="0" cellSpacing="0" style={{ margin: 0, padding: 0 }}>
            <tr>
              <td align="center">
                <table width="600" cellPadding="0" cellSpacing="0" style={{
                  backgroundColor: '#FFFFFF',
                  maxWidth: '600px',
                  width: '100%',
                }}>
                  <tr>
                    <td style={{ padding: '0 40px 40px' }}>
                      {children}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          {/* Footer */}
          <table width="100%" cellPadding="0" cellSpacing="0" style={{ margin: 0, padding: 0 }}>
            <tr>
              <td align="center">
                <table width="600" cellPadding="0" cellSpacing="0" style={{
                  backgroundColor: '#1E293B',
                  borderRadius: '0 0 24px 24px',
                  maxWidth: '600px',
                  width: '100%',
                }}>
                  <tr>
                    <td style={{ padding: '40px', textAlign: 'center' }}>
                      <h3 style={{
                        color: '#F1F5F9',
                        fontSize: '20px',
                        fontWeight: '600',
                        letterSpacing: '-0.025em',
                        margin: '0 0 16px',
                        lineHeight: '28px',
                      }}>
                        WeLens
                      </h3>
                      <p style={{
                        color: '#94A3B8',
                        fontSize: '14px',
                        lineHeight: '20px',
                        margin: '0 0 24px',
                      }}>
                        Cualquier gafa. Tu graduación.
                      </p>
                      
                      {/* Social Links */}
                      <div style={{ marginBottom: '24px' }}>
                        <a href="https://welens.org" style={{
                          color: '#3B82F6',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                        }}>
                          Visitar welens.org
                        </a>
                      </div>

                      <p style={{
                        color: '#64748B',
                        fontSize: '12px',
                        lineHeight: '16px',
                        margin: '0',
                      }}>
                        © 2024 WeLens. Todos los derechos reservados.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  );
}