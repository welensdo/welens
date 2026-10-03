"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const order = searchParams?.get("order");
    if (order) {
      setOrderNumber(order);
    } else {
      // If no order number, redirect to home
      router.push("/");
    }
    setLoading(false);
  }, [searchParams, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gallery-white flex items-center justify-center">
        <div className="text-ink">Cargando...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gallery-white">
      <Navbar />

      <div className="pt-32 pb-20 lg:pt-40 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight">
              ¡Pedido confirmado!
            </h1>
            
            {orderNumber && (
              <div className="bg-studio-mist rounded-2xl p-6 inline-block">
                <p className="text-body-small text-slate mb-2">Número de pedido</p>
                <p className="text-2xl font-semibold text-ink tracking-wider">{orderNumber}</p>
              </div>
            )}

            <p className="text-body text-slate max-w-2xl mx-auto leading-relaxed">
              Tu pedido ha sido recibido y está siendo procesado. Te hemos enviado un correo de confirmación 
              con todos los detalles. Pronto comenzaremos a fabricar tus WeLens personalizados.
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-studio-mist rounded-3xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-ink mb-8">¿Qué sigue?</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-3">
                <div className="w-8 h-8 bg-pricing-blue text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <h3 className="font-semibold text-ink">Procesamiento</h3>
                <p className="text-body-small text-slate">
                  Verificamos tu pedido y comenzamos la fabricación personalizada de tus lentes.
                </p>
                <p className="text-compact-control text-pricing-blue font-medium">1-3 días</p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 bg-pricing-blue text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <h3 className="font-semibold text-ink">Fabricación</h3>
                <p className="text-body-small text-slate">
                  Creamos tus WeLens con tu graduación exacta usando nuestro proceso patentado.
                </p>
                <p className="text-compact-control text-pricing-blue font-medium">5-10 días</p>
              </div>

              <div className="space-y-3">
                <div className="w-8 h-8 bg-pricing-blue text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <h3 className="font-semibold text-ink">Envío</h3>
                <p className="text-body-small text-slate">
                  Empaquetamos tu pedido y lo enviamos directamente a tu dirección.
                </p>
                <p className="text-compact-control text-pricing-blue font-medium">2-5 días</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Ver mi pedido
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-studio-mist hover:bg-control-gray text-ink rounded-full font-semibold transition-all"
            >
              Volver al inicio
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-16 p-6 bg-gallery-white border border-hairline-silver rounded-2xl">
            <h3 className="font-semibold text-ink mb-3">¿Necesitas ayuda?</h3>
            <p className="text-body-small text-slate mb-4">
              Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/soporte"
                className="text-pricing-blue hover:text-pricing-blue/80 font-medium transition-colors"
              >
                Centro de soporte
              </Link>
              <Link
                href="/contacto"
                className="text-pricing-blue hover:text-pricing-blue/80 font-medium transition-colors"
              >
                Contactar soporte
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}