"use client";

import { useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  totalPrice: number;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export default function PayPalCheckout({
  totalPrice,
  onSuccess,
  onError,
  disabled = false
}: PayPalCheckoutProps) {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMethod, setProcessingMethod] = useState<'paypal' | 'card' | null>(null);

  const handleError = (error: any, method: 'paypal' | 'card') => {
    console.error(`${method} error:`, error);
    setIsProcessing(false);
    setProcessingMethod(null);
    
    // Try to extract meaningful error message
    if (error?.message) {
      onError(error.message);
    } else if (typeof error === 'string') {
      onError(error);
    } else {
      onError(`Error en el proceso de pago con ${method === 'paypal' ? 'PayPal' : 'tarjeta'}`);
    }
  };

  if (disabled) {
    return (
      <div className="w-full py-4 bg-studio-mist rounded-2xl text-center text-slate">
        Complete la información de envío para continuar
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="w-full py-4 bg-studio-mist rounded-2xl text-center text-slate animate-pulse">
        Cargando PayPal...
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="w-full py-4 bg-red-50 border border-red-200 rounded-2xl text-center text-red-600">
        Error cargando PayPal. Verifique su conexión.
      </div>
    );
  }

  if (!isResolved) {
    return (
      <div className="w-full py-4 bg-studio-mist rounded-2xl text-center text-slate">
        Inicializando PayPal...
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 border-4 border-pricing-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-ink mb-2">Procesando pago</h3>
            <p className="text-body-small text-slate">
              {processingMethod === 'paypal' ? 'Validando con PayPal...' : 'Procesando tarjeta...'}
            </p>
            <p className="text-compact-control text-slate mt-2">
              Por favor no cierres esta ventana
            </p>
          </div>
        </div>
      )}

      {/* PayPal Button - White style */}
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "white",
          shape: "rect",
          label: "paypal",
          height: 55,
        }}
        disabled={isProcessing}
        fundingSource="paypal"
        createOrder={async () => {
          try {
            // NO ponemos loading aquí, solo cuando se crea la orden
            const response = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: totalPrice }),
            });
            
            if (!response.ok) {
              throw new Error('Error creando la orden de PayPal');
            }
            
            const data = await response.json();
            return data.orderID;
          } catch (error) {
            console.error('Error creating PayPal order:', error);
            onError('Error al crear el pedido de PayPal');
            throw error;
          }
        }}
        onApprove={async (data) => {
          try {
            // AQUÍ sí ponemos loading, cuando el usuario ya aprobó el pago
            setIsProcessing(true);
            setProcessingMethod('paypal');
            
            const captureResponse = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderID: data.orderID }),
            });
            
            const captureData = await captureResponse.json();
            
            if (captureResponse.ok && captureData.success) {
              onSuccess(captureData);
            } else {
              throw new Error(captureData.error || 'Error procesando el pago');
            }
          } catch (error: any) {
            handleError(error, 'paypal');
          }
        }}
        onError={(err) => {
          handleError(err, 'paypal');
        }}
        onCancel={() => {
          console.log('PayPal payment cancelled by user');
          setIsProcessing(false);
          setProcessingMethod(null);
        }}
      />
      
      {/* Credit/Debit Card Button - Black style */}
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "black",
          shape: "rect", 
          label: "pay",
          height: 55,
        }}
        disabled={isProcessing}
        fundingSource="card"
        createOrder={async () => {
          try {
            // NO ponemos loading aquí, solo cuando se crea la orden para tarjeta
            const response = await fetch('/api/paypal/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: totalPrice }),
            });
            
            if (!response.ok) {
              throw new Error('Error creando la orden');
            }
            
            const data = await response.json();
            return data.orderID;
          } catch (error) {
            console.error('Error creating PayPal order:', error);
            onError('Error al crear el pedido');
            throw error;
          }
        }}
        onApprove={async (data) => {
          try {
            // AQUÍ sí ponemos loading, cuando el usuario ya envió el form de tarjeta
            setIsProcessing(true);
            setProcessingMethod('card');
            
            const captureResponse = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderID: data.orderID }),
            });
            
            const captureData = await captureResponse.json();
            
            if (captureResponse.ok && captureData.success) {
              onSuccess(captureData);
            } else {
              throw new Error(captureData.error || 'Error procesando el pago con tarjeta');
            }
          } catch (error: any) {
            handleError(error, 'card');
          }
        }}
        onError={(err) => {
          handleError(err, 'card');
        }}
        onCancel={() => {
          console.log('Card payment cancelled by user');
          setIsProcessing(false);
          setProcessingMethod(null);
        }}
      />

      <div className="text-center">
        <p className="text-compact-control text-slate">
          Paga de forma segura con PayPal o cualquier tarjeta de crédito/débito
        </p>
        {isProcessing && (
          <p className="text-compact-control text-pricing-blue mt-2 font-medium">
            Procesando pago, por favor espera...
          </p>
        )}
      </div>
    </div>
  );
}