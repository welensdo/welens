import React from 'react';
import EmailTemplate from './EmailTemplate';
import EmailButton from './EmailButton';

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

const statusColors: Record<string, string> = {
  pending: "#F59E0B",
  processing: "#3B82F6",
  manufacturing: "#8B5CF6",
  quality_check: "#6366F1",
  packaging: "#EC4899",
  shipped: "#10B981",
  delivered: "#059669",
  cancelled: "#EF4444",
};

const statusEmojis: Record<string, string> = {
  pending: "⏳",
  processing: "🔄",
  manufacturing: "🏭",
  quality_check: "🔍",
  packaging: "📦",
  shipped: "🚚",
  delivered: "✅",
  cancelled: "❌",
};

export default function OrderStatusEmail({
  customerName,
  orderNumber,
  status,
  trackingNumber,
  note
}: OrderStatusEmailProps) {
  const statusLabel = statusLabels[status] || status;
  const statusColor = statusColors[status] || "#64748B";
  const statusEmoji = statusEmojis[status] || "📋";

  return (
    <EmailTemplate previewText={`Tu orden ${orderNumber} está ${statusLabel.toLowerCase()}`}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          backgroundColor: statusColor,
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontSize: '32px',
          }}>
            {statusEmoji}
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
          Actualización de tu orden
        </h1>
        <p style={{
          color: '#64748B',
          fontSize: '18px',
          lineHeight: '28px',
          margin: '0',
        }}>
          Tu pedido #{orderNumber} está {statusLabel.toLowerCase()}
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
          Hola {customerName},
        </h2>
        <p style={{
          color: '#475569',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0 0 16px',
        }}>
          Tenemos una actualización sobre tu orden #{orderNumber}.
        </p>
        
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: statusColor,
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: '600',
          padding: '12px 20px',
          borderRadius: '50px',
          margin: '16px 0',
        }}>
          {statusEmoji} {statusLabel}
        </div>

        {note && (
          <div style={{
            backgroundColor: '#EFF6FF',
            borderLeft: '4px solid #3B82F6',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '20px',
          }}>
            <h3 style={{
              color: '#1E293B',
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 8px',
            }}>
              Nota adicional
            </h3>
            <p style={{
              color: '#475569',
              fontSize: '14px',
              lineHeight: '20px',
              margin: '0',
            }}>
              {note}
            </p>
          </div>
        )}
      </div>

      {trackingNumber && (
        <div style={{
          backgroundColor: '#F0FDF4',
          border: '2px solid #10B981',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          textAlign: 'center',
        }}>
          <h3 style={{
            color: '#1E293B',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 12px',
          }}>
            📦 Número de rastreo
          </h3>
          <p style={{
            color: '#059669',
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '0.05em',
            margin: '0 0 16px',
            fontFamily: 'monospace',
          }}>
            {trackingNumber}
          </p>
          <p style={{
            color: '#065F46',
            fontSize: '14px',
            margin: '0',
          }}>
            Usa este número para rastrear tu paquete
          </p>
        </div>
      )}

      <EmailButton href={`https://welens.com/dashboard`}>
        Ver detalles del pedido
      </EmailButton>

      {/* Status Timeline */}
      <div style={{
        backgroundColor: '#F8FAFC',
        borderRadius: '16px',
        padding: '24px',
        marginTop: '32px',
      }}>
        <h3 style={{
          color: '#1E293B',
          fontSize: '16px',
          fontWeight: '600',
          margin: '0 0 20px',
          textAlign: 'center',
        }}>
          Progreso de tu orden
        </h3>
        
        <div style={{ position: 'relative' }}>
          {[
            { key: 'pending', label: 'Pendiente' },
            { key: 'processing', label: 'En proceso' },
            { key: 'manufacturing', label: 'Fabricando' },
            { key: 'shipped', label: 'Enviado' },
            { key: 'delivered', label: 'Entregado' },
          ].map((step, index) => {
            const isCompleted = ['pending', 'processing', 'manufacturing', 'quality_check', 'packaging', 'shipped', 'delivered'].indexOf(status) >= ['pending', 'processing', 'manufacturing', 'shipped', 'delivered'].indexOf(step.key);
            const isCurrent = step.key === status || (status === 'quality_check' && step.key === 'manufacturing') || (status === 'packaging' && step.key === 'manufacturing');
            
            return (
              <div key={step.key} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: index < 4 ? '16px' : '0',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted || isCurrent ? '#10B981' : '#E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0,
                }}>
                  {isCompleted && (
                    <div style={{
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}>
                      ✓
                    </div>
                  )}
                  {isCurrent && !isCompleted && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                    }} />
                  )}
                </div>
                <p style={{
                  color: isCompleted || isCurrent ? '#1E293B' : '#94A3B8',
                  fontSize: '14px',
                  fontWeight: isCompleted || isCurrent ? '600' : 'normal',
                  margin: '0',
                }}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </EmailTemplate>
  );
}