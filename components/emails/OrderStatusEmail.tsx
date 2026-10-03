import React from 'react';
import WeLensEmail, { 
  EmailHeadline, 
  EmailTitle,
  EmailBody, 
  EmailCaption, 
  EmailButton, 
  EmailSpacer,
  EmailDivider,
  EmailDesignSystem,
  EmailFooterLinks
} from './WeLensEmailSystem';
import { SupportedLanguage, getEmailTranslations } from '@/lib/email-i18n';

interface OrderStatusEmailProps {
  customerName: string;
  orderNumber: string;
  status: string;
  trackingNumber?: string;
  note?: string;
  language?: SupportedLanguage;
}

export default function OrderStatusEmail({
  customerName,
  orderNumber,
  status,
  trackingNumber,
  note,
  language = 'es'
}: OrderStatusEmailProps) {
  
  const translations = getEmailTranslations(language);
  const statusLabel = translations.orderStatus.statusMessages[status as keyof typeof translations.orderStatus.statusMessages] || status;
  const isShipped = status === 'shipped' || status === 'delivered';
  
  const orderUrl = language === 'en' 
    ? `https://welens.org/en/dashboard/orders/${orderNumber}`
    : `https://welens.org/dashboard/orders/${orderNumber}`;

  const progressSteps = language === 'en' ? [
    { key: 'pending', label: 'Pending' },
    { key: 'processing', label: 'Processing' },
    { key: 'manufacturing', label: 'Manufacturing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ] : [
    { key: 'pending', label: 'Pendiente' },
    { key: 'processing', label: 'En proceso' },
    { key: 'manufacturing', label: 'Fabricando' },
    { key: 'shipped', label: 'Enviado' },
    { key: 'delivered', label: 'Entregado' }
  ];

  return (
    <WeLensEmail 
      previewText={translations.orderStatus.subject(orderNumber, statusLabel)}
      language={language}
    >
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          {language === 'es' ? 'Actualización de orden' : 'Order Update'}
        </EmailHeadline>
        <EmailCaption>
          {language === 'es' 
            ? `Hola ${customerName}, hay novedades sobre tu orden`
            : `Hello ${customerName}, there's an update on your order`
          }
        </EmailCaption>
      </div>

      {/* Status */}
      <div style={{ 
        backgroundColor: EmailDesignSystem.colors.surface,
        padding: EmailDesignSystem.spacing.md,
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: EmailDesignSystem.spacing.lg
      }}>
        <EmailCaption style={{ margin: `0 0 ${EmailDesignSystem.spacing.xs} 0` }}>
          {language === 'es' ? `Orden #${orderNumber}` : `Order #${orderNumber}`}
        </EmailCaption>
        <EmailTitle style={{ 
          margin: 0,
          color: isShipped ? EmailDesignSystem.colors.brand : EmailDesignSystem.colors.primary
        }}>
          {statusLabel}
        </EmailTitle>
      </div>

      {/* Note */}
      {note && (
        <>
          <EmailBody>
            <strong>
              {language === 'es' ? 'Actualización:' : 'Update:'}
            </strong> {note}
          </EmailBody>
          <EmailSpacer size="md" />
        </>
      )}

      {/* Tracking */}
      {trackingNumber && (
        <>
          <EmailTitle>{translations.orderStatus.trackingNumber}</EmailTitle>
          <div style={{ 
            backgroundColor: EmailDesignSystem.colors.surface,
            padding: EmailDesignSystem.spacing.md,
            borderRadius: '8px',
            marginBottom: EmailDesignSystem.spacing.lg,
            textAlign: 'center'
          }}>
            <EmailBody style={{ 
              margin: 0,
              fontFamily: 'Monaco, Consolas, monospace',
              fontSize: '16px',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              {trackingNumber}
            </EmailBody>
          </div>
        </>
      )}

      {/* Progress */}
      <EmailTitle>
        {language === 'es' ? 'Progreso' : 'Progress'}
      </EmailTitle>
      
      <div style={{ marginBottom: EmailDesignSystem.spacing.lg }}>
        {progressSteps.map((step, index, array) => {
          const stepOrder = ['pending', 'processing', 'manufacturing', 'quality_check', 'packaging', 'shipped', 'delivered'];
          const currentStepIndex = stepOrder.indexOf(status);
          const thisStepIndex = stepOrder.indexOf(step.key);
          
          const isCompleted = currentStepIndex > thisStepIndex;
          const isCurrent = step.key === status || 
            (status === 'quality_check' && step.key === 'manufacturing') || 
            (status === 'packaging' && step.key === 'manufacturing');
          
          return (
            <div key={step.key} style={{ marginBottom: index < array.length - 1 ? EmailDesignSystem.spacing.sm : 0 }}>
              <table width="100%" cellPadding="0" cellSpacing="0">
                <tr>
                  <td style={{ width: '24px', verticalAlign: 'top', paddingTop: '2px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted || isCurrent ? EmailDesignSystem.colors.primary : EmailDesignSystem.colors.tertiary
                    }} />
                  </td>
                  <td style={{ paddingLeft: EmailDesignSystem.spacing.sm, verticalAlign: 'top' }}>
                    <EmailBody style={{ 
                      margin: 0,
                      color: isCompleted || isCurrent ? EmailDesignSystem.colors.primary : EmailDesignSystem.colors.secondary,
                      fontWeight: isCurrent ? '500' : '400'
                    }}>
                      {step.label}
                    </EmailBody>
                  </td>
                </tr>
              </table>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <EmailButton href={orderUrl}>
          {language === 'es' ? 'Ver detalles' : 'View details'}
        </EmailButton>
      </div>

      <EmailSpacer size="lg" />

      {/* Footer Links */}
      <EmailFooterLinks 
        language={language}
        supportUrl={language === 'en' ? 'https://welens.org/en/support' : 'https://welens.org/soporte'}
      />

    </WeLensEmail>
  );
}