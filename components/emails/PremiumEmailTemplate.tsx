import * as React from 'react';

export interface PremiumEmailTemplateProps {
  title: string;
  subtitle?: string;
  previewText?: string;
  children: React.ReactNode;
}

export default function PremiumEmailTemplate({
  title,
  subtitle,
  previewText,
  children,
}: PremiumEmailTemplateProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #ffffff;
            color: #1d1d1f;
            line-height: 1.47;
            font-size: 17px;
            letter-spacing: -0.374px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
          }
          
          .header {
            padding: 40px 40px 0 40px;
            text-align: center;
          }
          
          .logo {
            margin-bottom: 32px;
          }
          
          .content {
            padding: 0 40px 40px 40px;
          }
          
          .footer {
            border-top: 1px solid #d6d6d6;
            padding: 32px 40px;
            text-align: center;
            background-color: #f5f5f7;
          }
          
          h1 {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 40px;
            font-weight: 600;
            line-height: 1.1;
            letter-spacing: 0px;
            margin: 0 0 16px 0;
            color: #1d1d1f;
          }
          
          h2 {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 28px;
            font-weight: 500;
            line-height: 1.21;
            letter-spacing: -0.374px;
            margin: 0 0 24px 0;
            color: #1d1d1f;
          }
          
          .subtitle {
            font-size: 21px;
            line-height: 1.19;
            letter-spacing: 0.231px;
            color: #707070;
            margin: 0 0 32px 0;
          }
          
          .button {
            display: inline-block;
            background-color: #0071e3;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 17px;
            font-weight: 500;
            letter-spacing: -0.374px;
            margin: 24px 0;
          }
          
          .button:hover {
            background-color: #0066cc;
          }
          
          .text-small {
            font-size: 14px;
            line-height: 1.29;
            letter-spacing: -0.224px;
            color: #86868b;
          }
          
          @media (max-width: 600px) {
            .header, .content, .footer {
              padding-left: 20px;
              padding-right: 20px;
            }
            
            h1 {
              font-size: 32px;
            }
            
            h2 {
              font-size: 24px;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <div className="logo">
              <img 
                src="https://welens.org/og-image.png" 
                alt="WeLens" 
                style={{ height: '120px', width: 'auto' }}
              />
            </div>
            <h1>{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </div>
          
          <div className="content">
            {children}
          </div>
          
          <div className="footer">
            <p className="text-small">
              © {new Date().getFullYear()} WeLens. Todos los derechos reservados.
            </p>
            <p className="text-small" style={{ margin: '8px 0 0 0' }}>
              Transformando la forma en que ves el mundo.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}