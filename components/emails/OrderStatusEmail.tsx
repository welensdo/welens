import React from 'react';
import WeLensEmail, { 
  EmailHeadline, 
  EmailTitle,
  EmailBody, 
  EmailCaption, 
  EmailButton, 
  EmailSpacer,
  EmailDivider,
  EmailDesignSystem 
} from './WeLensEmailSystem';

interface OrderStatusEmailProps {
  customerName: string;
  orderNumber: string;
  status: string;
  trackingNumber?: string;
  note?: string;
}

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  processing: "En proceso",
  manufacturing: "Fabricando",
  quality_check: "Control de calidad",
  packaging: "Empacando",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export default function OrderStatusEmail({
  customerName,
  orderNumber,
  status,
  trackingNumber,
  note
}: OrderStatusEmailProps) {
  
  const statusLabel = statusLabels[status] || status;
  const isShipped = status === 'shipped' || status === 'delivered';

  return (
    <WeLensEmail previewText={`Tu orden ${orderNumber} está ${statusLabel.toLowerCase()}`}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          Actualización de orden
        </EmailHeadline>
        <EmailCaption>
          Hola {customerName}, hay novedades sobre tu orden
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
          Orden #{orderNumber}
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
            <strong>Actualización:</strong> {note}
          </EmailBody>
          <EmailSpacer size="md" />
        </>
      )}

      {/* Tracking */}
      {trackingNumber && (
        <>
          <EmailTitle>Número de seguimiento</EmailTitle>
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
      <EmailTitle>Progreso</EmailTitle>
      
      <div style={{ marginBottom: EmailDesignSystem.spacing.lg }}>
        {[
          { key: 'pending', label: 'Pendiente' },
          { key: 'processing', label: 'En proceso' },
          { key: 'manufacturing', label: 'Fabricando' },
          { key: 'shipped', label: 'Enviado' },
          { key: 'delivered', label: 'Entregado' }
        ].map((step, index, array) => {
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
        <EmailButton href={`https://welens.org/dashboard/orders/${orderNumber}`}>
          Ver detalles
        </EmailButton>
      </div>

    </WeLensEmail>
  );
}