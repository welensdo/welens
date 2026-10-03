"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Envelope, 
  Package, 
  Truck,
  Phone,
  Headphones
} from '@phosphor-icons/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Badge } from '@/components/ui/badge';

export default function ThankYouPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order number from URL manually to avoid Suspense issues
    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get('order');
    setOrderNumber(orderParam);

    if (orderParam) {
      // Fetch order details
      fetch(`/api/orders/${orderParam}`)
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
          }
        })
        .catch(err => {
          console.error('Error fetching order:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Prevent any automatic redirects
  useEffect(() => {
    console.log('Thank you page loaded with order:', orderNumber);
  }, [orderNumber]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-gallery-white overflow-hidden">
      <Navbar />
      
      <div className="pt-24 pb-20 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Section */}
            <motion.div className="mb-12" variants={itemVariants}>
              <Badge variant="secondary" className="mb-4">
                Pedido confirmado
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-semibold text-ink tracking-tight mb-6">
                ¡Gracias por tu pedido!
              </h1>
              <p className="text-body text-slate mb-8">
                Tu pedido ha sido procesado exitosamente. Te enviaremos un correo con los detalles y el seguimiento.
              </p>
            </motion.div>

            {/* Loading State */}
            {loading ? (
              <motion.div 
                className="mb-12"
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-studio-mist rounded-3xl p-8">
                  <motion.div 
                    className="w-16 h-16 bg-pricing-blue/20 rounded-full mx-auto mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <h3 className="font-semibold text-ink mb-2">Cargando detalles del pedido...</h3>
                </div>
              </motion.div>
            ) : (
              /* Order Confirmation */
              <motion.div 
                className="bg-studio-mist rounded-3xl p-8 mb-12"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center justify-center mb-6"
                  variants={iconVariants}
                >
                  <div className="w-16 h-16 bg-pricing-blue rounded-full flex items-center justify-center">
                    <CheckCircle size={32} weight="fill" className="text-gallery-white" />
                  </div>
                </motion.div>
                
                <motion.h2 
                  className="text-2xl font-semibold text-ink mb-4"
                  variants={itemVariants}
                >
                  Número de pedido
                </motion.h2>
                
                <motion.p 
                  className="text-3xl font-bold text-pricing-blue mb-6"
                  variants={itemVariants}
                >
                  {orderNumber || 'WL' + Date.now().toString().slice(-8)}
                </motion.p>
                
                <motion.div 
                  className="space-y-3 text-left max-w-md mx-auto"
                  variants={itemVariants}
                >
                  <div className="flex justify-between">
                    <span className="text-slate">Total:</span>
                    <span className="font-semibold text-ink">${order?.totalPrice?.toFixed(2) || '50.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Envío:</span>
                    <span className="text-pricing-blue font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate">Tiempo estimado:</span>
                    <span className="text-ink">1-3 semanas</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Process Steps */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mb-12"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-gallery-white border border-hairline-silver rounded-2xl p-6"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="w-12 h-12 bg-pricing-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Envelope size={24} weight="duotone" className="text-pricing-blue" />
                </motion.div>
                <h3 className="font-semibold text-ink mb-2">Confirmación por email</h3>
                <p className="text-compact-control text-slate">
                  Recibirás un correo con todos los detalles de tu pedido
                </p>
              </motion.div>

              <motion.div 
                className="bg-gallery-white border border-hairline-silver rounded-2xl p-6"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="w-12 h-12 bg-pricing-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Package size={24} weight="duotone" className="text-pricing-blue" />
                </motion.div>
                <h3 className="font-semibold text-ink mb-2">Preparación</h3>
                <p className="text-compact-control text-slate">
                  Comenzamos a preparar tus lentes personalizados
                </p>
              </motion.div>

              <motion.div 
                className="bg-gallery-white border border-hairline-silver rounded-2xl p-6"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="w-12 h-12 bg-pricing-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Truck size={24} weight="duotone" className="text-pricing-blue" />
                </motion.div>
                <h3 className="font-semibold text-ink mb-2">Envío gratuito</h3>
                <p className="text-compact-control text-slate">
                  Enviamos gratis a todo el Caribe en 1-3 semanas
                </p>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="space-y-4 mb-12"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/configurador"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Crear otro pedido
                </Link>
              </motion.div>
              
              <div className="text-center">
                <Link 
                  href="/"
                  className="text-pricing-blue hover:text-pricing-blue/80 font-medium transition-colors"
                >
                  Volver al inicio
                </Link>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div 
              className="p-6 bg-pricing-blue/5 rounded-2xl"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Headphones size={24} weight="duotone" className="text-pricing-blue" />
                <h3 className="font-semibold text-ink">¿Necesitas ayuda?</h3>
              </div>
              <p className="text-body-small text-slate mb-4">
                Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
              </p>
              <div className="flex items-center justify-center gap-6 text-body-small text-slate">
                <div className="flex items-center gap-1">
                  <Envelope size={16} className="text-pricing-blue" />
                  <strong>soporte@welens.com</strong>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={16} className="text-pricing-blue" />
                  <strong>+1 (809) 555-0123</strong>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}