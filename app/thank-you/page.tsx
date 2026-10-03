"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Headphones
} from '@phosphor-icons/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WeLensReceiptPrinter from '@/components/WeLensReceiptPrinter';
import type { WeLensReceiptProps } from '@/components/WeLensReceipt';



function ThankYouPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [receiptData, setReceiptData] = useState<WeLensReceiptProps | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printComplete, setPrintComplete] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);

  useEffect(() => {

    if (orderNumber) {
      // Fetch order details
      fetch(`/api/orders/${orderNumber}`)
        .then(res => {
          if (!res.ok) {
            console.error('Failed to fetch order:', res.status);
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data?.order) {
            setOrder(data.order);
            
            // Prepare receipt data
            const receipt: WeLensReceiptProps = {
              orderNumber: data.order.orderNumber,
              customerName: data.order.userId?.name || 'Cliente',
              totalPrice: data.order.totalPrice,
              items: data.order.items,
              date: new Date(data.order.createdAt),
              paymentMethod: 'PayPal',
              last4Digits: '0000' // We don't store real card numbers
            };
            
            setReceiptData(receipt);
          }
        })
        .catch(err => {
          console.error('Error fetching order:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Fallback data if no order number
      const fallbackReceipt: WeLensReceiptProps = {
        orderNumber: 'WL' + Date.now().toString().slice(-8),
        customerName: 'Cliente',
        totalPrice: 50.00,
        items: [
          {
            itemType: 'lens',
            eye: 'left',
            type: 'miopía',
            value: -2.5,
            price: 25.00
          },
          {
            itemType: 'lens', 
            eye: 'right',
            type: 'miopía',
            value: -2.0,
            price: 25.00
          }
        ],
        date: new Date(),
        paymentMethod: 'PayPal',
        last4Digits: '0000'
      };
      
      setReceiptData(fallbackReceipt);
      setLoading(false);
    }
  }, [orderNumber]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (loading || !receiptData) {
    return (
      <main className="min-h-screen bg-gallery-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-pricing-blue/20 rounded-full mx-auto mb-4 animate-pulse" />
          <p className="text-slate">Cargando tu recibo...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gallery-white relative overflow-hidden">
      <Navbar />
      
      <div className="pt-24 pb-20 lg:pt-32 lg:pb-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Section */}
            <motion.div className="mb-0" variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight mb-4">
                ¡Pago exitoso!
              </h1>
              <p className="text-lg sm:text-xl text-slate mb-0 max-w-2xl mx-auto">
                Tu pedido ha sido procesado correctamente. Aquí tienes tu recibo oficial.
              </p>
            </motion.div>

            {/* Receipt Printer */}
            <motion.div 
              className="flex justify-center mb-4 -mt-6"
              variants={itemVariants}
            >
              <WeLensReceiptPrinter
                receiptData={receiptData}
                autoStart={true}
                onPrintComplete={() => {
                  console.log('Recibo impreso completamente');
                  setPrintComplete(true);
                  setIsPrinting(false);
                }}
                onTearComplete={() => {
                  console.log('Recibo arrancado completamente');
                }}
              />
            </motion.div>

            {/* Action Buttons - solo aparecen cuando el recibo está completo */}
            {printComplete && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 mt-40"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href="/configurador"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl text-sm"
                  >
                    Crear otro pedido
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gallery-white border-2 border-pricing-blue text-pricing-blue hover:bg-pricing-blue hover:text-gallery-white rounded-full font-medium transition-all text-sm"
                  >
                    Ver mis pedidos
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {/* Contact Section - solo aparece cuando el recibo está completo */}
            {printComplete && (
              <motion.div 
                className="bg-pricing-blue/5 rounded-xl p-4 max-w-lg mx-auto"
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Headphones size={16} weight="duotone" className="text-pricing-blue" />
                  <h3 className="text-base font-semibold text-ink">¿Necesitas ayuda?</h3>
                </div>
                <p className="text-slate text-xs mb-3 text-center">
                  Si tienes alguna pregunta sobre tu pedido o necesitas soporte,{' '}
                  <Link 
                    href="/soporte" 
                    className="text-pricing-blue font-bold hover:text-pricing-blue/80 transition-colors underline"
                  >
                    estamos aquí para ayudarte
                  </Link>
                  .
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gallery-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-pricing-blue/20 rounded-full mx-auto mb-4 animate-pulse" />
          <p className="text-slate">Cargando...</p>
        </div>
      </main>
    }>
      <ThankYouPageContent />
    </Suspense>
  );
}