import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json();
    console.log('Capturing PayPal order:', orderID);

    if (!orderID) {
      console.error('No orderID provided');
      return NextResponse.json(
        { error: 'OrderID is required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();
    console.log('Access token obtained successfully');

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const captureData = await response.json();
    console.log('PayPal capture response:', JSON.stringify(captureData, null, 2));

    if (!response.ok) {
      console.error('PayPal API error:', response.status, captureData);
      
      // Handle specific PayPal errors with clear Spanish messages
      if (captureData.name === 'UNPROCESSABLE_ENTITY' && captureData.details?.[0]) {
        const details = captureData.details[0];
        switch (details.issue) {
          case 'INSTRUMENT_DECLINED':
            return NextResponse.json(
              { 
                error: '[TARJETA RECHAZADA] Tu tarjeta fue rechazada. Verifica los datos o usa otra tarjeta.',
                errorType: 'CARD_DECLINED'
              },
              { status: 422 }
            );
          case 'INSUFFICIENT_FUNDS':
            return NextResponse.json(
              { 
                error: '[FONDOS INSUFICIENTES] Tu cuenta no tiene saldo suficiente para esta compra.',
                errorType: 'INSUFFICIENT_FUNDS'
              },
              { status: 422 }
            );
          case 'CARD_EXPIRED':
            return NextResponse.json(
              { 
                error: '[TARJETA VENCIDA] Tu tarjeta ha expirado. Por favor usa una tarjeta válida.',
                errorType: 'CARD_EXPIRED'
              },
              { status: 422 }
            );
          case 'INVALID_CARD':
          case 'INVALID_CARD_NUMBER':
            return NextResponse.json(
              { 
                error: '[TARJETA INVÁLIDA] Número de tarjeta inválido. Verifica que esté correcto.',
                errorType: 'INVALID_CARD'
              },
              { status: 422 }
            );
          case 'CARD_TYPE_NOT_SUPPORTED':
            return NextResponse.json(
              { 
                error: '[TARJETA NO SOPORTADA] Tipo de tarjeta no soportado. Usa Visa, Mastercard o American Express.',
                errorType: 'CARD_NOT_SUPPORTED'
              },
              { status: 422 }
            );
          case 'CURRENCY_NOT_SUPPORTED':
            return NextResponse.json(
              { 
                error: '[ERROR DE MONEDA] Moneda no soportada por tu tarjeta.',
                errorType: 'CURRENCY_ERROR'
              },
              { status: 422 }
            );
          case 'DUPLICATE_TRANSACTION':
            return NextResponse.json(
              { 
                error: '[PAGO DUPLICADO] Transacción duplicada. Ya procesaste este pago anteriormente.',
                errorType: 'DUPLICATE_PAYMENT'
              },
              { status: 422 }
            );
          case 'TRANSACTION_LIMIT_EXCEEDED':
            return NextResponse.json(
              { 
                error: '[LÍMITE EXCEDIDO] Límite de transacción excedido. El monto supera tu límite diario.',
                errorType: 'LIMIT_EXCEEDED'
              },
              { status: 422 }
            );
          case 'CARD_SECURITY_CODE_INVALID':
          case 'CVV_FAILURE':
            return NextResponse.json(
              { 
                error: '[CVV INVÁLIDO] Código de seguridad (CVV) inválido. Verifica los 3 dígitos.',
                errorType: 'CVV_INVALID'
              },
              { status: 422 }
            );
          case 'FRAUD_DETECTED':
          case 'SUSPECTED_FRAUD':
            return NextResponse.json(
              { 
                error: '[FRAUDE DETECTADO] Actividad sospechosa detectada. Contacta tu banco para autorizar el pago.',
                errorType: 'FRAUD_DETECTED'
              },
              { status: 422 }
            );
          case 'BILLING_ADDRESS_INVALID':
            return NextResponse.json(
              { 
                error: '[DIRECCIÓN INVÁLIDA] Dirección de facturación inválida. Verifica tus datos.',
                errorType: 'ADDRESS_ERROR'
              },
              { status: 422 }
            );
          case 'CARD_BLOCKED':
            return NextResponse.json(
              { 
                error: '[TARJETA BLOQUEADA] Tu tarjeta está bloqueada. Contacta tu banco.',
                errorType: 'CARD_BLOCKED'
              },
              { status: 422 }
            );
          case 'ISSUER_UNAVAILABLE':
            return NextResponse.json(
              { 
                error: '[BANCO NO DISPONIBLE] Tu banco no está disponible temporalmente. Intenta más tarde.',
                errorType: 'BANK_UNAVAILABLE'
              },
              { status: 422 }
            );
          case 'PROCESSING_FAILURE':
            return NextResponse.json(
              { 
                error: '[ERROR DE PROCESAMIENTO] Error procesando el pago. Intenta nuevamente en unos minutos.',
                errorType: 'PROCESSING_ERROR'
              },
              { status: 422 }
            );
          default:
            return NextResponse.json(
              { 
                error: `[ERROR DE PAGO] Problema con el método de pago: ${details.description || 'Error desconocido'}`,
                errorType: 'PAYMENT_ERROR'
              },
              { status: 422 }
            );
        }
      }
      
      // Handle other PayPal error types
      if (captureData.name === 'RESOURCE_NOT_FOUND') {
        return NextResponse.json(
          { error: '[ORDEN NO ENCONTRADA] Orden de pago no encontrada. Intenta crear una nueva orden.' },
          { status: 404 }
        );
      }
      
      if (captureData.name === 'INVALID_REQUEST') {
        return NextResponse.json(
          { error: '[SOLICITUD INVÁLIDA] Solicitud inválida. Verifica los datos del pago.' },
          { status: 400 }
        );
      }
      
      // Generic PayPal error
      return NextResponse.json(
        { error: `[ERROR PAYPAL] Error de PayPal: ${captureData.message || 'Error desconocido'}` },
        { status: response.status }
      );
    }

    if (captureData.status === 'COMPLETED') {
      const result = { 
        success: true, 
        captureID: captureData.id,
        payerEmail: captureData.payer?.email_address,
        amount: captureData.purchase_units[0]?.payments?.captures[0]?.amount
      };
      console.log('Payment captured successfully:', result);
      return NextResponse.json(result);
    } else {
      console.error('Payment not completed, status:', captureData.status);
      return NextResponse.json(
        { error: `Payment status: ${captureData.status}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('PayPal capture order error:', error);
    return NextResponse.json(
      { error: `Error capturing PayPal payment: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}