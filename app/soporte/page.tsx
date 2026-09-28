"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-hairline-silver">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-pricing-blue transition-colors"
      >
        <span className="text-body-emphasized font-semibold text-ink pr-8">
          {question}
        </span>
        <span className="text-pricing-blue text-xl flex-shrink-0">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-compact text-slate">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function SoportePage() {
  const faqs = [
    {
      category: "Pedidos y Envíos",
      questions: [
        {
          q: "¿Cuánto tarda en llegar mi pedido?",
          a: "Los pedidos estándar tardan 1 a 3 semanas. Los miembros WeLens Pro reciben envío prioritario en 1 semana.",
        },
        {
          q: "¿Cómo puedo rastrear mi pedido?",
          a: "Una vez que tu pedido sea enviado, recibirás un email con el número de seguimiento. También puedes ver el estado en tiempo real desde tu panel de control.",
        },
        {
          q: "¿Puedo cambiar mi dirección de envío?",
          a: "Sí, puedes cambiar la dirección antes de que el pedido sea procesado. Contacta con soporte lo antes posible.",
        },
      ],
    },
    {
      category: "Producto y Graduación",
      questions: [
        {
          q: "¿Cómo sé mi graduación exacta?",
          a: "Necesitas una receta actualizada de tu óptico u oftalmólogo. La receta debe incluir esfera, cilindro, eje y distancia pupilar.",
        },
        {
          q: "¿Las lentillas se adaptan a cualquier montura?",
          a: "Sí, WeLens funciona con cualquier tipo de montura de gafas. Nuestras lentillas adhesivas se adaptan perfectamente a todo tipo de lentes y monturas.",
        },
        {
          q: "¿Cuánto duran las lentillas WeLens?",
          a: "Con el cuidado adecuado, las lentillas WeLens duran hasta 12 meses. Recomendamos limpiarlas diariamente con un paño de microfibra.",
        },
        {
          q: "¿Puedo usarlas con gafas de sol?",
          a: "Sí, WeLens funciona perfectamente con gafas de sol. Incluso puedes pedir graduación para tus gafas de sol favoritas.",
        },
      ],
    },
    {
      category: "Instalación y Uso",
      questions: [
        {
          q: "¿Es difícil instalar las lentillas?",
          a: "No, la instalación es muy sencilla y toma menos de 5 minutos. Incluimos un video tutorial paso a paso con cada pedido.",
        },
        {
          q: "¿Puedo quitarlas y volver a ponerlas?",
          a: "Sí, las lentillas WeLens son reutilizables. Puedes quitarlas y volver a colocarlas cuando quieras sin perder adherencia.",
        },
        {
          q: "¿Qué hago si se despegan?",
          a: "Si una lentilla se despega, simplemente límpiala con un paño seco y vuelve a colocarla. Si el problema persiste, contacta con soporte para un reemplazo gratuito.",
        },
      ],
    },
    {
      category: "Garantía y Devoluciones",
      questions: [
        {
          q: "¿Ofrecen garantía?",
          a: "Sí, todos los productos WeLens tienen garantía de 1 año (2 años para miembros Pro). Si hay algún defecto de fabricación, lo reemplazamos sin coste.",
        },
        {
          q: "¿Puedo devolver mi pedido?",
          a: "Tienes 30 días para devolver tu pedido si no estás satisfecho. Los productos deben estar en condiciones originales.",
        },
        {
          q: "¿Qué pasa si me equivoco en la graduación?",
          a: "Si introduces una graduación incorrecta, puedes solicitar un reemplazo a mitad de precio dentro de los primeros 30 días.",
        },
      ],
    },
    {
      category: "Cuenta y Pagos",
      questions: [
        {
          q: "¿Qué métodos de pago aceptan?",
          a: "Aceptamos todas las tarjetas de crédito/débito principales (Visa, Mastercard, Amex), PayPal y transferencia bancaria.",
        },
        {
          q: "¿Es seguro pagar online?",
          a: "Sí, todos los pagos están encriptados y procesados de forma segura. No almacenamos datos de tarjetas en nuestros servidores.",
        },
        {
          q: "¿Cómo cancelo mi membresía Pro?",
          a: "Puedes cancelar tu membresía Pro en cualquier momento desde tu panel de control. No hay permanencia ni penalizaciones.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Centro de Soporte
            </h1>
            <p className="text-body-large text-slate mb-12">
              Encuentra respuestas a las preguntas más frecuentes o contacta con nuestro equipo
              de soporte para ayuda personalizada.
            </p>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-studio-mist rounded-3xl p-6">
                <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                  Chat en vivo
                </h3>
                <p className="text-compact text-slate mb-4">Lun-Vie, 9:00-18:00</p>
                <button className="text-pricing-blue hover:text-pricing-blue/80 text-compact-emphasized font-semibold">
                  Iniciar chat
                </button>
              </div>

              <div className="bg-studio-mist rounded-3xl p-6">
                <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                  Email
                </h3>
                <p className="text-compact text-slate mb-4">Respuesta en 24h</p>
                <Link
                  href="/contacto"
                  className="text-pricing-blue hover:text-pricing-blue/80 text-compact-emphasized font-semibold"
                >
                  soporte@welens.com
                </Link>
              </div>

              <div className="bg-studio-mist rounded-3xl p-6">
                <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                  Teléfono
                </h3>
                <p className="text-compact text-slate mb-4">Lun-Vie, 9:00-18:00</p>
                <a
                  href="tel:+18095042837"
                  className="text-pricing-blue hover:text-pricing-blue/80 text-compact-emphasized font-semibold"
                >
                  +1 809 504 2837
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-16">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-12">
            {faqs.map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="text-body-large-emphasized font-semibold text-ink mb-6 pb-3 border-b border-hairline-silver">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((item, qIndex) => (
                    <FAQItem
                      key={qIndex}
                      question={item.q}
                      answer={item.a}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still Need Help */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-8">
              Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta o problema.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Contactar Soporte
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
