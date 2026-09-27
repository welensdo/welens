import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function GarantiaPage() {
  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Garantía WeLens
            </h1>
            <p className="text-body-large text-slate mb-8">
              Tu satisfacción es nuestra prioridad. Todos los productos WeLens están respaldados
              por nuestra garantía de calidad y satisfacción garantizada.
            </p>
          </div>
        </section>

        {/* Warranty Types */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-studio-mist rounded-3xl p-8 lg:p-10">
              <h2 className="text-display-small font-semibold text-ink mb-4">
                Garantía Estándar
              </h2>
              <p className="text-body-large-emphasized font-semibold text-pricing-blue mb-4">
                1 año de cobertura completa
              </p>
              <ul className="space-y-3 text-body text-slate">
                <li className="flex items-start gap-3">
                  <span className="text-pricing-blue mt-1">✓</span>
                  <span>Defectos de fabricación</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pricing-blue mt-1">✓</span>
                  <span>Pérdida de adherencia prematura</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pricing-blue mt-1">✓</span>
                  <span>Problemas de graduación</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pricing-blue mt-1">✓</span>
                  <span>Materiales defectuosos</span>
                </li>
              </ul>
            </div>

            <div className="bg-pricing-blue rounded-3xl p-8 lg:p-10 text-gallery-white">
              <h2 className="text-display-small font-semibold mb-4">Garantía Pro</h2>
              <p className="text-body-large-emphasized font-semibold mb-4">
                2 años de cobertura extendida
              </p>
              <ul className="space-y-3 text-body">
                <li className="flex items-start gap-3">
                  <span className="mt-1">✓</span>
                  <span>Todo lo incluido en Garantía Estándar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✓</span>
                  <span>Reemplazos prioritarios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✓</span>
                  <span>Soporte técnico 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">✓</span>
                  <span>Daños accidentales (1 reemplazo/año)</span>
                </li>
              </ul>
              <Link
                href="/pro"
                className="inline-block mt-6 bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Únete a WeLens Pro
              </Link>
            </div>
          </div>
        </section>

        {/* What's Covered */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Qué cubre nuestra garantía
          </h2>

          <div className="space-y-6">
            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ✅ Defectos de fabricación
              </h3>
              <p className="text-body text-slate">
                Si tus lentillas WeLens tienen algún defecto de fábrica (burbujas, imperfecciones,
                materiales defectuosos), las reemplazamos sin coste alguno.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ✅ Problemas de adherencia
              </h3>
              <p className="text-body text-slate">
                Si las lentillas pierden adherencia de forma prematura o no se adhieren
                correctamente desde el principio, te enviamos un reemplazo gratuito.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ✅ Graduación incorrecta
              </h3>
              <p className="text-body text-slate">
                Si introduces una graduación incorrecta en tu primer pedido, te ofrecemos un
                reemplazo gratuito dentro de los primeros 30 días (una sola vez).
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ✅ Envío defectuoso
              </h3>
              <p className="text-body text-slate">
                Si tu pedido llega dañado o con productos incorrectos, lo reemplazamos
                inmediatamente con envío prioritario sin coste.
              </p>
            </div>
          </div>
        </section>

        {/* What's NOT Covered */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Qué NO cubre la garantía
          </h2>

          <div className="space-y-6">
            <div className="bg-studio-mist rounded-3xl p-8 border-l-4 border-slate">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ❌ Daño por mal uso
              </h3>
              <p className="text-body text-slate">
                Daños causados por limpieza inadecuada, uso de productos químicos agresivos,
                o no seguir las instrucciones de instalación.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 border-l-4 border-slate">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ❌ Desgaste normal
              </h3>
              <p className="text-body text-slate">
                El desgaste normal después de 12 meses de uso. Las lentillas están diseñadas
                para durar un año con el cuidado adecuado.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 border-l-4 border-slate">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ❌ Pérdida o robo
              </h3>
              <p className="text-body text-slate">
                Pérdida, robo o extravío de las lentillas no está cubierto por la garantía
                estándar (solo para miembros Pro con cobertura de daños accidentales).
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 border-l-4 border-slate">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ❌ Modificaciones
              </h3>
              <p className="text-body text-slate">
                Cualquier modificación, alteración o intento de reparación por terceros
                anula automáticamente la garantía.
              </p>
            </div>
          </div>
        </section>

        {/* How to Claim */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Cómo solicitar un reemplazo
          </h2>

          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
            <ol className="space-y-6">
              <li className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  1
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Contacta con soporte
                  </h3>
                  <p className="text-body text-slate">
                    Envía un email a garantia@welens.com o contacta por chat en vivo desde tu
                    panel de control. Incluye tu número de pedido.
                  </p>
                </div>
              </li>

              <li className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  2
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Describe el problema
                  </h3>
                  <p className="text-body text-slate">
                    Explica el problema y adjunta fotos si es posible. Nuestro equipo evaluará
                    tu caso en menos de 24 horas.
                  </p>
                </div>
              </li>

              <li className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  3
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Recibe tu reemplazo
                  </h3>
                  <p className="text-body text-slate">
                    Una vez aprobado, te enviamos el reemplazo en 5-7 días (24-48h para Pro).
                    No necesitas devolver el producto defectuoso.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              ¿Tienes algún problema?
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-8">
              Nuestro equipo está aquí para ayudarte. Contacta con nosotros y te responderemos
              lo antes posible.
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
