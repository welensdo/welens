import React from 'react';
import PremiumEmailTemplate from './PremiumEmailTemplate';

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
  pending: "#f59e0b",
  processing: "#3b82f6",
  manufacturing: "#8b5cf6",
  quality_check: "#6366f1",
  packaging: "#ec4899",
  shipped: "#10b981",
  delivered: "#059669",
  cancelled: "#ef4444",
};

const statusGradients: Record<string, string> = {
  pending: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
  processing: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  manufacturing: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
  quality_check: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  packaging: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
  shipped: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  delivered: "linear-gradient(135deg, #059669 0%, #047857 100%)",
  cancelled: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
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
  const statusGradient = statusGradients[status] || "linear-gradient(135deg, #64748B 0%, #475569 100%)";
  const statusEmoji = statusEmojis[status] || "📋";

  return (
    <PremiumEmailTemplate 
      previewText={`Tu orden ${orderNumber} está ${statusLabel.toLowerCase()}`}
      title="Actualización de tu orden"
      subtitle={`Tu pedido #${orderNumber} está ${statusLabel.toLowerCase()}`}
    >
      {/* Status Icon */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '48px',
        background: statusGradient,
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        margin: '0 auto 48px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 20px 40px ${statusColor}30`,
      }}>
        <div style={{
          fontSize: '48px',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        }}>
          {statusEmoji}
        </div>
      </div>

      {/* Order Status */}
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
          background: `radial-gradient(circle, ${statusColor}20 0%, transparent 70%)`,
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
          Hola {customerName} 👋
        </h2>
        
        <p style={{
          color: '#475569',
          fontSize: '18px',
          lineHeight: '28px',
          margin: '0 0 24px',
          position: 'relative',
        }}>
          Tenemos una actualización emocionante sobre tu orden #{orderNumber}.
        </p>
        
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: statusGradient,
          color: '#FFFFFF',
          fontSize: '18px',
          fontWeight: '700',
          padding: '16px 32px',
          borderRadius: '50px',
          boxShadow: `0 8px 20px ${statusColor}40`,
          position: 'relative',
        }}>
          <span style={{ marginRight: '8px', fontSize: '20px' }}>{statusEmoji}</span>
          {statusLabel}
        </div>

        {note && (
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: '1px solid #3b82f6',
            borderRadius: '16px',
            padding: '24px',
            marginTop: '24px',
            position: 'relative',
          }}>
            <h3 style={{
              color: '#1e40af',
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              💬 Nota especial
            </h3>
            <p style={{
              color: '#1e40af',
              fontSize: '16px',
              lineHeight: '24px',
              margin: '0',
            }}>
              {note}
            </p>
          </div>
        )}
      </div>

      {trackingNumber && (
        <div style={{
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          border: '2px solid #10b981',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%)',
          }}></div>
          
          <h3 style={{
            color: '#065f46',
            fontSize: '24px',
            fontWeight: '700',
            margin: '0 0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            📦 Número de rastreo
          </h3>
          
          <div style={{
            background: '#ffffff',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '20px',
            margin: '0 0 16px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
          }}>
            <p style={{
              color: '#059669',
              fontSize: '24px',
              fontWeight: '700',
              letterSpacing: '2px',
              margin: '0',
              fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            }}>
              {trackingNumber}
            </p>
          </div>
          
          <p style={{
            color: '#065f46',
            fontSize: '16px',
            margin: '0',
            fontWeight: '500',
          }}>
            🔍 Usa este número para rastrear tu paquete en tiempo real
          </p>
        </div>
      )}

      {/* Progress Timeline */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '40px',
        border: '1px solid #e2e8f0',
      }}>
        <h3 style={{
          color: '#1E293B',
          fontSize: '24px',
          fontWeight: '700',
          margin: '0 0 32px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}>
          🚀 Progreso de tu orden
        </h3>
        
        <div style={{ position: 'relative' }}>
          {[
            { key: 'pending', label: 'Pendiente', icon: '⏳' },
            { key: 'processing', label: 'En proceso', icon: '🔄' },
            { key: 'manufacturing', label: 'Fabricando', icon: '🏭' },
            { key: 'shipped', label: 'Enviado', icon: '🚚' },
            { key: 'delivered', label: 'Entregado', icon: '✅' },
          ].map((step, index) => {
            const stepOrder = ['pending', 'processing', 'manufacturing', 'quality_check', 'packaging', 'shipped', 'delivered'];
            const currentStepIndex = stepOrder.indexOf(status);
            const thisStepIndex = stepOrder.indexOf(step.key);
            
            const isCompleted = currentStepIndex > thisStepIndex;
            const isCurrent = step.key === status || 
              (status === 'quality_check' && step.key === 'manufacturing') || 
              (status === 'packaging' && step.key === 'manufacturing');
            
            return (
              <div key={step.key} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: index < 4 ? '20px' : '0',
                position: 'relative',
              }}>
                {/* Connector Line */}
                {index < 4 && (
                  <div style={{
                    position: 'absolute',
                    left: '19px',
                    top: '40px',
                    width: '2px',
                    height: '20px',
                    background: isCompleted ? 'linear-gradient(to bottom, #10b981, #059669)' : '#e2e8f0',
                  }} />
                )}
                
                {/* Step Circle */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: isCompleted || isCurrent 
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                    : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                  flexShrink: 0,
                  boxShadow: isCompleted || isCurrent 
                    ? '0 4px 12px rgba(16, 185, 129, 0.3)' 
                    : '0 2px 4px rgba(0,0,0,0.1)',
                  border: '2px solid',
                  borderColor: isCompleted || isCurrent ? '#10b981' : '#e2e8f0',
                }}>
                  {isCompleted && (
                    <div style={{
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}>
                      ✓
                    </div>
                  )}
                  {isCurrent && !isCompleted && (
                    <div style={{
                      fontSize: '16px',
                    }}>
                      {step.icon}
                    </div>
                  )}
                  {!isCompleted && !isCurrent && (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#94a3b8',
                    }} />
                  )}
                </div>
                
                {/* Step Label */}
                <div>
                  <p style={{
                    color: isCompleted || isCurrent ? '#1E293B' : '#94A3B8',
                    fontSize: '16px',
                    fontWeight: isCompleted || isCurrent ? '600' : 'normal',
                    margin: '0',
                  }}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p style={{
                      color: '#10b981',
                      fontSize: '14px',
                      fontWeight: '500',
                      margin: '4px 0 0 0',
                    }}>
                      Estado actual
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <a
          href="https://welens.org/dashboard"
          style={{
            display: 'inline-block',
            background: statusGradient,
            color: 'white',
            padding: '18px 48px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: `0 12px 30px ${statusColor}40`,
            transition: 'all 0.3s ease',
            border: 'none',
            letterSpacing: '0.5px',
          }}
        >
          👀 Ver detalles del pedido
        </a>
      </div>

      {/* Support */}
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
          margin: '0 0 8px 0',
          fontWeight: '500',
        }}>
          ¿Tienes preguntas sobre tu orden? 
        </p>
        <p style={{
          color: '#64748B',
          fontSize: '14px',
          margin: '0',
        }}>
          Responde a este correo y te ayudaremos inmediatamente 💬
        </p>
      </div>
    </PremiumEmailTemplate>
  );
}