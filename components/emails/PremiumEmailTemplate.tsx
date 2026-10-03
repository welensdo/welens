import * as React from 'react';

export interface PremiumEmailTemplateProps {
  title: string;
  subtitle?: string;
  previewText?: string;
  children: React.ReactNode;
  footerText?: string;
}

export default function PremiumEmailTemplate({
  title,
  subtitle,
  previewText,
  children,
  footerText = "¡Gracias por elegir WeLens!"
}: PremiumEmailTemplateProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            margin: 0;
            padding: 0;
          }
          
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border-radius: 16px;
            overflow: hidden;
            margin-top: 40px;
            margin-bottom: 40px;
          }
          
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            padding: 40px 40px 60px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
            50% { transform: translateX(-10px) translateY(-10px) rotate(1deg); }
          }
          
          .logo {
            width: 120px;
            height: auto;
            margin: 0 auto 20px;
            display: block;
            position: relative;
            z-index: 2;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
          }
          
          .header-title {
            color: white;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            position: relative;
            z-index: 2;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          
          .content {
            padding: 50px 40px;
            background: #ffffff;
          }
          
          .content-inner {
            max-width: 480px;
            margin: 0 auto;
          }
          
          .highlight-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .highlight-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
          }
          
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          }
          
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.5);
          }
          
          .footer {
            background: #1f2937;
            color: #9ca3af;
            text-align: center;
            padding: 40px;
          }
          
          .footer-logo {
            width: 80px;
            height: auto;
            margin: 0 auto 20px;
            display: block;
            opacity: 0.8;
            border-radius: 8px;
          }
          
          .social-links {
            margin: 20px 0;
          }
          
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #9ca3af;
            text-decoration: none;
            font-size: 14px;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          
          .social-links a:hover {
            background: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
            margin: 30px 0;
          }
          
          .text-small {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.5;
          }
          
          .text-large {
            font-size: 18px;
            line-height: 1.6;
            color: #374151;
          }
          
          .icon {
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
          }
          
          @media only screen and (max-width: 640px) {
            .email-wrapper {
              margin: 20px 10px;
              border-radius: 12px;
            }
            
            .header {
              padding: 30px 20px 40px;
            }
            
            .header-title {
              font-size: 24px;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .footer {
              padding: 30px 20px;
            }
            
            .logo {
              width: 100px;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="email-wrapper">
          <div className="header">
            <img 
              src="https://welens.org/logo3.PNG" 
              alt="WeLens" 
              className="logo"
            />
            <h1 className="header-title">{title}</h1>
          </div>
          
          <div className="content">
            <div className="content-inner">
              {children}
            </div>
          </div>
          
          <div className="footer">
            <img 
              src="https://welens.org/logo3.PNG" 
              alt="WeLens" 
              className="footer-logo"
            />
            
            <p style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#d1d5db' }}>
              {footerText}
            </p>
            
            <div className="divider"></div>
            
            <div className="social-links">
              <a href="https://welens.org/soporte">Soporte</a>
              <a href="https://welens.org/configurador">Configurador</a>
              <a href="https://welens.org">Sitio Web</a>
            </div>
            
            <div className="divider"></div>
            
            <p className="text-small" style={{ margin: '0', opacity: '0.7' }}>
              © 2024 WeLens. Todos los derechos reservados.<br />
              Transforma cualquier gafa en tu graduación perfecta.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}