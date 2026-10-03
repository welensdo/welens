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

interface OrderItem {
  itemType: 'lens' | 'accessory';
  eye?: string;
  type?: string;
  value?: number;
  name?: string;
  quantity?: number;
  price: number;
}

interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderConfirmationEmailProps {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
}

export default function OrderConfirmationEmail({
  customerName,
  orderNumber,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
  estimatedDelivery
}: OrderConfirmationEmailProps) {
  
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <WeLensEmail previewText={`Tu orden ${orderNumber} ha sido confirmada`}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          Orden confirmada
        </EmailHeadline>
        <EmailCaption>
          Hola {customerName}, hemos recibido tu orden
        </EmailCaption>
      </div>

      {/* Order Details */}
      <div style={{ 
        backgroundColor: EmailDesignSystem.colors.surface,
        padding: EmailDesignSystem.spacing.md,
        borderRadius: '8px',
        marginBottom: EmailDesignSystem.spacing.lg
      }}>
        <table width="100%" cellPadding="0" cellSpacing="0">
          <tr>
            <td>
              <EmailCaption style={{ margin: 0 }}>Número de orden</EmailCaption>
              <EmailBody style={{ margin: 0, fontWeight: '500' }}>#{orderNumber}</EmailBody>
            </td>
            <td align="right">
              <EmailCaption style={{ margin: 0 }}>Fecha</EmailCaption>
              <EmailBody style={{ margin: 0, fontWeight: '500' }}>{formatDate(orderDate)}</EmailBody>
            </td>
          </tr>
        </table>
      </div>

      {/* Items */}
      <EmailTitle>Artículos</EmailTitle>
      
      {items.map((item, index) => (
        <div key={index}>
          <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: EmailDesignSystem.spacing.sm }}>
            <tr>
              <td style={{ verticalAlign: 'top' }}>
                <EmailBody style={{ margin: 0 }}>
                  {item.itemType === 'lens' ? (
                    <>
                      Lente {item.eye} - {item.type}
                      {item.value !== undefined && (
                        <EmailCaption style={{ margin: 0 }}>
                          Graduación: {item.value > 0 ? '+' : ''}{item.value}
                        </EmailCaption>
                      )}
                    </>
                  ) : (
                    item.name
                  )}
                  {item.quantity && item.quantity > 1 && (
                    <EmailCaption style={{ margin: 0 }}>Cantidad: {item.quantity}</EmailCaption>
                  )}
                </EmailBody>
              </td>
              <td align="right" style={{ verticalAlign: 'top' }}>
                <EmailBody style={{ margin: 0, fontWeight: '500' }}>
                  {formatCurrency(item.price)}
                </EmailBody>
              </td>
            </tr>
          </table>
        </div>
      ))}

      <EmailDivider />

      {/* Totals */}
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td><EmailBody style={{ margin: 0 }}>Subtotal</EmailBody></td>
          <td align="right"><EmailBody style={{ margin: 0 }}>{formatCurrency(subtotal)}</EmailBody></td>
        </tr>
        <tr>
          <td><EmailBody style={{ margin: 0 }}>Envío</EmailBody></td>
          <td align="right"><EmailBody style={{ margin: 0 }}>{formatCurrency(shipping)}</EmailBody></td>
        </tr>
        <tr>
          <td><EmailBody style={{ margin: 0 }}>Impuestos</EmailBody></td>
          <td align="right"><EmailBody style={{ margin: 0 }}>{formatCurrency(tax)}</EmailBody></td>
        </tr>
        <tr style={{ borderTop: `1px solid ${EmailDesignSystem.colors.divider}` }}>
          <td style={{ paddingTop: EmailDesignSystem.spacing.sm }}>
            <EmailBody style={{ margin: 0, fontWeight: '600' }}>Total</EmailBody>
          </td>
          <td align="right" style={{ paddingTop: EmailDesignSystem.spacing.sm }}>
            <EmailBody style={{ margin: 0, fontWeight: '600' }}>{formatCurrency(total)}</EmailBody>
          </td>
        </tr>
      </table>

      <EmailSpacer size="lg" />

      {/* Shipping */}
      <EmailTitle>Dirección de envío</EmailTitle>
      <EmailBody style={{ margin: 0 }}>
        {shippingAddress.name}<br />
        {shippingAddress.street}<br />
        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
        {shippingAddress.country}
      </EmailBody>

      <EmailSpacer size="md" />

      <EmailCaption>
        Entrega estimada: {formatDate(estimatedDelivery)}
      </EmailCaption>

      <EmailSpacer size="lg" />

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <EmailButton href={`https://welens.org/dashboard/orders/${orderNumber}`}>
          Ver orden
        </EmailButton>
      </div>

    </WeLensEmail>
  );
}