import * as React from 'react';
import PremiumEmailTemplate from './PremiumEmailTemplate';

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
  const emailContent = (
    <>
      {/* Success Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        {/* Success Animation Circle */}
        <div style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '50%',
          margin: '0 auto 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)'
        }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1 style={{
          fontSize: '36px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 20px 0',
          lineHeight: '1.2'
        }}>
          ¡Pago Exitoso!
        </h1>
        
        <p style={{
          fontSize: '20px',
          lineHeight: '1.6',
          color: '#374151',
          margin: '0 0 12px 0',
          fontWeight: '500'
        }}>
          Hola <strong style={{color: '#3b82f6'}}>{customerName}</strong>, tu orden ha sido confirmada
        </p>
        
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
          padding: '12px 24px',
          borderRadius: '25px',
          border: '2px solid #3b82f6'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#3730a3',
            margin: '0',
            fontWeight: '600'
          }}>
            Orden #{orderNumber} • {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric', 
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Premium Order Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '3px solid transparent',
        backgroundClip: 'padding-box',
        borderRadius: '20px',
        padding: '40px',
        margin: '40px 0',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '6px',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981)',
          borderRadius: '20px 20px 0 0'
        }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 11H19L18 21H6L5 11Z" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0'
          }}>
            Resumen del Pedido
          </h2>
        </div>
        {/* Order Items */}
        <div style={{ marginBottom: '30px' }}>
          {items.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: index < items.length - 1 ? '2px solid #f1f5f9' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#6b7280" strokeWidth="2"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="#6b7280" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  {item.itemType === 'lens' ? (
                    <>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '16px' }}>
                        Lente {item.eye === 'left' ? 'Izquierdo' : 'Derecho'}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        {item.type} • {item.value && item.value > 0 ? '+' : ''}{item.value?.toFixed(2)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '16px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Cantidad: {item.quantity}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div style={{
                fontWeight: '700',
                color: '#3b82f6',
                fontSize: '18px',
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                padding: '8px 16px',
                borderRadius: '12px'
              }}>
                ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        {/* Total Section */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #e2e8f0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1f2937'
              }}>
                Total Pagado
              </span>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                Procesado via {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod}
              </div>
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#3b82f6',
              textShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
            }}>
              ${totalPrice.toFixed(2)} USD
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information Card */}
      <div style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
        borderRadius: '16px',
        padding: '30px',
        margin: '30px 0',
        border: '2px solid #f59e0b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16H21L19 21H7L5 16H13ZM13 16V12M13 16L9 12M13 12H9M9 12V8L11 6H15L17 8V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#92400e',
            margin: '0'
          }}>
            Información de Envío
          </h3>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <div style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#92400e'
          }}>
            <strong>{shippingAddress.name}</strong><br />
            {shippingAddress.street}<br />
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
            {shippingAddress.country}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ textAlign: 'center', margin: '50px 0' }}>
        <a 
          href="https://welens.org/dashboard" 
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            textDecoration: 'none',
            padding: '18px 36px',
            borderRadius: '16px',
            fontWeight: '700',
            fontSize: '16px',
            margin: '12px',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
          }}
        >
          🎯 Ver Estado del Pedido
        </a>
        
        <a 
          href="https://welens.org/configurador" 
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            color: '#3b82f6',
            textDecoration: 'none',
            padding: '18px 36px',
            borderRadius: '16px',
            fontWeight: '700',
            fontSize: '16px',
            margin: '12px',
            border: '3px solid #3b82f6'
          }}
        >
          ✨ Hacer Otro Pedido
        </a>
      </div>
    </>
  );

  return (
    <PremiumEmailTemplate 
      title="¡Pago Exitoso!"
      footerText="Gracias por confiar en WeLens para transformar tu visión perfecta."
    >
      {emailContent}
    </PremiumEmailTemplate>
  );
}