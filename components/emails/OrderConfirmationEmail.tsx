import React from 'react';
import EmailTemplate from './EmailTemplate';
import EmailButton from './EmailButton';

interface OrderItem {
  itemType: 'lens' | 'accessory';
  eye?: string;
  type?: string;
  value?: number;
  name?: string;
  quantity?: number;
  price: number;
}

interface OrderConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  totalPrice: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export default function OrderConfirmationEmail({
  customerName,
  orderNumber,
  totalPrice,
  items,
  shippingAddress,
  paymentMethod
}: OrderConfirmationEmailProps) {
  return (
    <EmailTemplate previewText={`Orden ${orderNumber} confirmada - WeLens`}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          backgroundColor: '#10B981',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            color: '#FFFFFF',
            fontSize: '32px',
            fontWeight: 'bold',
          }}>
            ✓
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
          ¡Pago exitoso!
        </h1>
        <p style={{
          color: '#64748B',
          fontSize: '18px',
          lineHeight: '28px',
          margin: '0',
        }}>
          Tu orden ha sido confirmada y procesada
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
          ¡Gracias por tu compra! Hemos recibido tu pago y tu orden está siendo procesada.
        </p>
        <p style={{
          color: '#475569',
          fontSize: '16px',
          lineHeight: '24px',
          margin: '0',
        }}>
          Te notificaremos cuando tu orden esté lista para envío.
        </p>
      </div>

      {/* Factura */}
      <div style={{
        border: '2px solid #E2E8F0',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '32px',
      }}>
        {/* Header de factura */}
        <div style={{
          backgroundColor: '#1E293B',
          color: '#FFFFFF',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0',
            }}>
              Factura
            </h3>
            <div style={{ textAlign: 'right' }}>
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: '0 0 4px',
              }}>
                Orden #{orderNumber}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#94A3B8',
                margin: '0',
              }}>
                {new Date().toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        {/* Detalles de la orden */}
        <div style={{ padding: '32px' }}>
          <h4 style={{
            color: '#1E293B',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 16px',
          }}>
            Detalles del pedido
          </h4>
          
          <div style={{ marginBottom: '24px' }}>
            {items.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '12px 0',
                borderBottom: index < items.length - 1 ? '1px solid #F1F5F9' : 'none',
              }}>
                <div style={{ flex: 1 }}>
                  {item.itemType === 'lens' ? (
                    <>
                      <p style={{
                        color: '#1E293B',
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: '0 0 4px',
                      }}>
                        Lente {item.eye === 'left' ? 'izquierdo' : 'derecho'}
                      </p>
                      <p style={{
                        color: '#64748B',
                        fontSize: '14px',
                        margin: '0',
                      }}>
                        {item.type} • {item.value && item.value > 0 ? '+' : ''}{item.value?.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p style={{
                        color: '#1E293B',
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: '0 0 4px',
                      }}>
                        {item.name}
                      </p>
                      <p style={{
                        color: '#64748B',
                        fontSize: '14px',
                        margin: '0',
                      }}>
                        Cantidad: {item.quantity}
                      </p>
                    </>
                  )}
                </div>
                <p style={{
                  color: '#1E293B',
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0',
                }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <p style={{
                color: '#1E293B',
                fontSize: '18px',
                fontWeight: '600',
                margin: '0',
              }}>
                Total pagado
              </p>
              <p style={{
                color: '#1E293B',
                fontSize: '24px',
                fontWeight: '700',
                margin: '0',
              }}>
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Dirección de envío */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              color: '#1E293B',
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px',
            }}>
              Dirección de envío
            </h4>
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              padding: '16px',
            }}>
              <p style={{
                color: '#475569',
                fontSize: '14px',
                lineHeight: '20px',
                margin: '0',
              }}>
                {shippingAddress.name}<br />
                {shippingAddress.street}<br />
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                {shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Método de pago */}
          <div>
            <h4 style={{
              color: '#1E293B',
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 12px',
            }}>
              Método de pago
            </h4>
            <p style={{
              color: '#475569',
              fontSize: '14px',
              margin: '0',
            }}>
              {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod}
            </p>
          </div>
        </div>
      </div>

      <EmailButton href={`https://welens.com/dashboard`}>
        Ver mi pedido
      </EmailButton>

      <div style={{
        backgroundColor: '#EFF6FF',
        borderLeft: '4px solid #3B82F6',
        borderRadius: '8px',
        padding: '24px',
        marginTop: '32px',
      }}>
        <h3 style={{
          color: '#1E293B',
          fontSize: '16px',
          fontWeight: '600',
          margin: '0 0 12px',
        }}>
          ¿Qué sigue?
        </h3>
        <p style={{
          color: '#475569',
          fontSize: '14px',
          lineHeight: '20px',
          margin: '0',
        }}>
          • Procesaremos tu orden en las próximas 24 horas<br />
          • Te enviaremos actualizaciones del estado por email<br />
          • Tiempo estimado de entrega: 1-3 semanas
        </p>
      </div>
    </EmailTemplate>
  );
}