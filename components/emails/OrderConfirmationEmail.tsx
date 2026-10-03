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
  language?: SupportedLanguage;
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
  estimatedDelivery,
  language = 'es'
}: OrderConfirmationEmailProps) {
  
  const translations = getEmailTranslations(language);
  
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  
  const formatDate = (dateString: string) => {
    const locale = language === 'en' ? 'en-US' : 'es-ES';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLensDescription = (item: OrderItem) => {
    if (language === 'en') {
      return (
        <>
          {item.eye} Lens - {item.type}
          {item.value !== undefined && (
            <EmailCaption style={{ margin: 0 }}>
              Prescription: {item.value > 0 ? '+' : ''}{item.value}
            </EmailCaption>
          )}
        </>
      );
    } else {
      return (
        <>
          Lente {item.eye} - {item.type}
          {item.value !== undefined && (
            <EmailCaption style={{ margin: 0 }}>
              Graduación: {item.value > 0 ? '+' : ''}{item.value}
            </EmailCaption>
          )}
        </>
      );
    }
  };

  const orderUrl = language === 'en' 
    ? `https://welens.org/en/dashboard/orders/${orderNumber}`
    : `https://welens.org/dashboard/orders/${orderNumber}`;

  return (
    <WeLensEmail 
      previewText={translations.orderConfirmation.headline(orderNumber)}
      language={language}
    >
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: EmailDesignSystem.spacing.xl }}>
        <EmailHeadline>
          {translations.orderConfirmation.headline(orderNumber)}
        </EmailHeadline>
        <EmailCaption>
          {language === 'es' 
            ? `Hola ${customerName}, ${translations.orderConfirmation.thankYou.toLowerCase()}`
            : `Hello ${customerName}, ${translations.orderConfirmation.thankYou.toLowerCase()}`
          }
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
              <EmailCaption style={{ margin: 0 }}>{translations.orderConfirmation.orderNumber}</EmailCaption>
              <EmailBody style={{ margin: 0, fontWeight: '500' }}>#{orderNumber}</EmailBody>
            </td>
            <td align="right">
              <EmailCaption style={{ margin: 0 }}>{translations.orderConfirmation.orderDate}</EmailCaption>
              <EmailBody style={{ margin: 0, fontWeight: '500' }}>{formatDate(orderDate)}</EmailBody>
            </td>
          </tr>
        </table>
      </div>

      {/* Items */}
      <EmailTitle>{translations.orderConfirmation.items}</EmailTitle>
      
      {items.map((item, index) => (
        <div key={index}>
          <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: EmailDesignSystem.spacing.sm }}>
            <tr>
              <td style={{ verticalAlign: 'top' }}>
                <EmailBody style={{ margin: 0 }}>
                  {item.itemType === 'lens' ? getLensDescription(item) : item.name}
                  {item.quantity && item.quantity > 1 && (
                    <EmailCaption style={{ margin: 0 }}>
                      {language === 'es' ? `Cantidad: ${item.quantity}` : `Quantity: ${item.quantity}`}
                    </EmailCaption>
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
          <td><EmailBody style={{ margin: 0 }}>{translations.orderConfirmation.subtotal}</EmailBody></td>
          <td align="right"><EmailBody style={{ margin: 0 }}>{formatCurrency(subtotal)}</EmailBody></td>
        </tr>
        <tr>
          <td><EmailBody style={{ margin: 0 }}>{translations.orderConfirmation.shipping}</EmailBody></td>
          <td align="right"><EmailBody style={{ margin: 0 }}>{formatCurrency(shipping)}</EmailBody></td>
        </tr>
        <tr>
          <td><EmailBody style={{ margin: 0 }}>{translations.orderConfirmation.tax}</EmailBody></td>
          <td align="right"><EmailBody style={{ margin: 0 }}>{formatCurrency(tax)}</EmailBody></td>
        </tr>
        <tr style={{ borderTop: `1px solid ${EmailDesignSystem.colors.divider}` }}>
          <td style={{ paddingTop: EmailDesignSystem.spacing.sm }}>
            <EmailBody style={{ margin: 0, fontWeight: '600' }}>{translations.orderConfirmation.total}</EmailBody>
          </td>
          <td align="right" style={{ paddingTop: EmailDesignSystem.spacing.sm }}>
            <EmailBody style={{ margin: 0, fontWeight: '600' }}>{formatCurrency(total)}</EmailBody>
          </td>
        </tr>
      </table>

      <EmailSpacer size="lg" />

      {/* Shipping */}
      <EmailTitle>{translations.orderConfirmation.shippingAddress}</EmailTitle>
      <EmailBody style={{ margin: 0 }}>
        {shippingAddress.name}<br />
        {shippingAddress.street}<br />
        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
        {shippingAddress.country}
      </EmailBody>

      <EmailSpacer size="md" />

      <EmailCaption>
        {translations.orderConfirmation.estimatedDelivery}: {formatDate(estimatedDelivery)}
      </EmailCaption>

      <EmailSpacer size="md" />

      <EmailCaption>
        {translations.orderConfirmation.trackingInfo}
      </EmailCaption>

      <EmailSpacer size="lg" />

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <EmailButton href={orderUrl}>
          {language === 'es' ? 'Ver orden' : 'View order'}
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