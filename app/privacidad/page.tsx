import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Política de Privacidad
            </h1>
            <p className="text-body-large text-slate mb-4">
              Última actualización: 1 de septiembre de 2026
            </p>
            <p className="text-body text-slate">
              En WeLens nos tomamos muy en serio la privacidad de tus datos personales.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none">
            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                1. Responsable del Tratamiento
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  <strong className="text-ink">Identidad:</strong> WeLens Technologies S.L.
                  <br />
                  <strong className="text-ink">NIF:</strong> B-12345678
                  <br />
                  <strong className="text-ink">Dirección:</strong> Calle de la Innovación, 42,
                  28001 Madrid, España
                  <br />
                  <strong className="text-ink">Email:</strong> privacidad@welens.com
                  <br />
                  <strong className="text-ink">Teléfono:</strong> +34 900 123 456
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                2. Datos que Recopilamos
              </h2>
              <div className="space-y-6 text-body text-slate">
                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    2.1. Datos de registro
                  </h3>
                  <p>
                    Cuando creas una cuenta, recopilamos: nombre completo, dirección de email,
                    contraseña (encriptada), dirección de envío, número de teléfono.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    2.2. Datos de pedido
                  </h3>
                  <p>
                    Graduación óptica (esfera, cilindro, eje, distancia pupilar), preferencias
                    de producto, historial de pedidos, información de pago (procesada por
                    terceros).
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    2.3. Datos de navegación
                  </h3>
                  <p>
                    Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia,
                    cookies y tecnologías similares.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    2.4. Comunicaciones
                  </h3>
                  <p>
                    Emails, mensajes de chat, llamadas telefónicas, feedback y valoraciones.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                3. Finalidad del Tratamiento
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Utilizamos tus datos para:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Procesar y gestionar tus pedidos, incluyendo fabricación personalizada
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Gestionar tu cuenta de usuario y membresía Pro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Proporcionar atención al cliente y soporte técnico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Enviar comunicaciones transaccionales (confirmaciones, envíos)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Mejorar nuestros productos y servicios mediante análisis de uso
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Enviar comunicaciones comerciales (solo con tu consentimiento previo)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Cumplir con obligaciones legales y fiscales</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                4. Base Legal
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>El tratamiento de tus datos se basa en:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Ejecución de contrato:</strong> para
                      procesar pedidos y prestar servicios
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Consentimiento:</strong> para comunicaciones
                      comerciales y cookies no esenciales
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Interés legítimo:</strong> para análisis,
                      mejora de servicios y seguridad
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Obligación legal:</strong> para cumplir con
                      normativas fiscales y contables
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                5. Compartir Datos con Terceros
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Compartimos tus datos únicamente con:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Procesadores de pago:</strong> Stripe,
                      PayPal (datos de pago encriptados)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Empresas de logística:</strong> para
                      gestionar envíos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Proveedores de servicios:</strong> hosting,
                      email, análisis (AWS, Google Analytics)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Autoridades:</strong> cuando lo requiera la
                      ley
                    </span>
                  </li>
                </ul>
                <p className="mt-4">
                  Todos nuestros proveedores están sujetos a acuerdos de confidencialidad y
                  cumplen con el RGPD.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                6. Conservación de Datos
              </h2>
              <div className="space-y-4 text-body text-slate">
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Datos de cuenta:</strong> hasta que
                      solicites la eliminación
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Datos de pedidos:</strong> 6 años (por
                      obligaciones fiscales)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Cookies:</strong> según tipo (ver Política
                      de Cookies)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Marketing:</strong> hasta que retires el
                      consentimiento
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                7. Tus Derechos
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Tienes derecho a:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Acceso:</strong> saber qué datos tenemos
                      sobre ti
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Rectificación:</strong> corregir datos
                      inexactos o incompletos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Supresión:</strong> solicitar la
                      eliminación de tus datos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Oposición:</strong> oponerte al tratamiento
                      de tus datos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Limitación:</strong> restringir el
                      tratamiento
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Portabilidad:</strong> recibir tus datos en
                      formato estructurado
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Retirar consentimiento:</strong> en
                      cualquier momento
                    </span>
                  </li>
                </ul>
                <p className="mt-4">
                  Para ejercer tus derechos, contacta con:{" "}
                  <a
                    href="mailto:privacidad@welens.com"
                    className="text-pricing-blue hover:text-pricing-blue/80 underline"
                  >
                    privacidad@welens.com
                  </a>
                </p>
                <p>
                  También puedes presentar una reclamación ante la Agencia Española de
                  Protección de Datos (AEPD):{" "}
                  <a
                    href="https://www.aepd.es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pricing-blue hover:text-pricing-blue/80 underline"
                  >
                    www.aepd.es
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                8. Seguridad
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Implementamos medidas técnicas y organizativas para proteger tus datos:
                  encriptación SSL/TLS, contraseñas hasheadas con bcrypt, acceso restringido
                  basado en roles, copias de seguridad regulares, y auditorías de seguridad
                  periódicas.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                9. Menores de Edad
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Nuestros servicios no están dirigidos a menores de 16 años. Si descubrimos
                  que hemos recopilado datos de un menor sin consentimiento parental,
                  eliminaremos esa información inmediatamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              ¿Tienes preguntas sobre tu privacidad?
            </h2>
            <a
              href="mailto:privacidad@welens.com"
              className="inline-block bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
            >
              privacidad@welens.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
