import { resend, EMAIL_ALIASES } from './resend';
import React from 'react';

// Render email templates to string (server-side only)
async function renderEmailToString(element: React.ReactElement): Promise<string> {
  if (typeof window === 'undefined') {
    const { renderToString } = await import('react-dom/server');
    return renderToString(element);
  }
  throw new Error('Email rendering should only happen on server side');
}

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

export const emailService = {
  async sendWelcomeEmail({ to, name }: { to: string; name: string }) {
    try {
      const { default: WelcomeEmailComponent } = await import('@/components/emails/WelcomeEmail');
      const html = await renderEmailToString(
        React.createElement(WelcomeEmailComponent, { name, email: to })
      );

      const { data, error } = await resend.emails.send({
        from: EMAIL_ALIASES.data,
        to: [to],
        subject: '¡Bienvenido a WeLens! Tu cuenta ha sido creada',
        html,
      });

      if (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
      }

      console.log('Welcome email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Welcome email service error:', error);
      throw error;
    }
  },

  async sendOrderConfirmationEmail({
    to,
    name,
    orderNumber,
    orderDate,
    items,
    subtotal,
    shipping,
    tax,
    total,
    shippingAddress,
    estimatedDelivery,
  }: {
    to: string;
    name: string;
    orderNumber: string;
    orderDate: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    shippingAddress: ShippingAddress;
    estimatedDelivery: string;
  }) {
    try {
      const { default: OrderConfirmationEmailComponent } = await import('@/components/emails/OrderConfirmationEmail');
      const html = await renderEmailToString(
        React.createElement(OrderConfirmationEmailComponent, {
          customerName: name,
          customerEmail: to,
          orderNumber,
          orderDate,
          items,
          subtotal,
          shipping,
          tax,
          total,
          shippingAddress,
          estimatedDelivery,
        })
      );

      const { data, error } = await resend.emails.send({
        from: EMAIL_ALIASES.shipping, // Confirmaciones de orden desde shipping@welens.org
        to: [to],
        subject: `Orden ${orderNumber} confirmada - WeLens`,
        html,
      });

      if (error) {
        console.error('Error sending order confirmation email:', error);
        throw new Error('Failed to send order confirmation email');
      }

      console.log('Order confirmation email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Order confirmation email service error:', error);
      throw error;
    }
  },

  async sendOrderStatusEmail({
    to,
    name,
    orderNumber,
    status,
    trackingNumber,
    note,
  }: {
    to: string;
    name: string;
    orderNumber: string;
    status: string;
    trackingNumber?: string;
    note?: string;
  }) {
    try {
      const { default: OrderStatusEmailComponent } = await import('@/components/emails/OrderStatusEmail');
      const html = await renderEmailToString(
        React.createElement(OrderStatusEmailComponent, {
          customerName: name,
          orderNumber,
          status,
          trackingNumber,
          note,
        })
      );

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

      const statusLabel = statusLabels[status] || status;

      const { data, error } = await resend.emails.send({
        from: EMAIL_ALIASES.shipping, // Status updates desde shipping@welens.org
        to: [to],
        subject: `Actualización: Tu orden ${orderNumber} está ${statusLabel.toLowerCase()}`,
        html,
      });

      if (error) {
        console.error('Error sending order status email:', error);
        throw new Error('Failed to send order status email');
      }

      console.log('Order status email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Order status email service error:', error);
      throw error;
    }
  },

  async sendPasswordResetEmail(to: string, name: string, resetToken: string) {
    try {
      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
      
      const { default: PasswordResetEmailComponent } = await import('@/components/emails/PasswordResetEmail');
      const html = await renderEmailToString(
        React.createElement(PasswordResetEmailComponent, {
          name,
          resetUrl,
        })
      );

      const { data, error } = await resend.emails.send({
        from: EMAIL_ALIASES.support, // Password reset desde support@welens.org
        to: [to],
        subject: 'Restablecer contraseña - WeLens',
        html,
      });

      if (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
      }

      console.log('Password reset email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Password reset email service error:', error);
      throw error;
    }
  },
};

// Función adicional exportada para uso directo de la API admin
export async function sendCustomAdminEmail({
  to,
  from,
  subject,
  message,
}: {
  to: string;
  from: string;
  subject: string;
  message: string;
}) {
  try {
    const { default: CustomAdminEmailComponent } = await import('@/components/emails/CustomAdminEmail');
    
    const html = await renderEmailToString(
      React.createElement(CustomAdminEmailComponent, {
        subject,
        message,
      })
    );

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Error sending custom admin email:', error);
      throw new Error('Failed to send custom admin email');
    }

    console.log('Custom admin email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Custom admin email service error:', error);
    throw error;
  }
}