import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Política de Cookies
            </h1>
            <p className="text-body-large text-slate mb-4">
              Última actualización: 1 de septiembre de 2026
            </p>
            <p className="text-body text-slate">
              Información sobre cómo utilizamos cookies y tecnologías similares.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none space-y-8">
            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                ¿Qué son las cookies?
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
                  cuando visitas un sitio web. Se utilizan ampliamente para que los sitios web
                  funcionen de manera eficiente y proporcionen información a los propietarios del
                  sitio.
                </p>
                <p>
                  Las cookies pueden ser "persistentes" o "de sesión". Las persistentes
                  permanecen en tu dispositivo durante un período determinado. Las de sesión se
                  eliminan cuando cierras el navegador.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Cookies que utilizamos
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-4">
                    1. Cookies estrictamente necesarias
                  </h3>
                  <p className="text-body text-slate mb-4">
                    Estas cookies son esenciales para el funcionamiento del sitio web. Sin
                    ellas, no podrías utilizar funciones básicas como iniciar sesión o realizar
                    pedidos.
                  </p>
                  <div className="bg-gallery-white rounded-2xl p-6">
                    <table className="w-full text-compact">
                      <thead>
                        <tr className="border-b border-hairline-silver">
                          <th className="text-left pb-3 text-ink font-semibold">Cookie</th>
                          <th className="text-left pb-3 text-ink font-semibold">Propósito</th>
                          <th className="text-left pb-3 text-ink font-semibold">Duración</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate">
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">session_token</td>
                          <td className="py-3">Mantiene tu sesión iniciada</td>
                          <td className="py-3">7 días</td>
                        </tr>
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">cart_id</td>
                          <td className="py-3">Guarda los productos en tu carrito</td>
                          <td className="py-3">30 días</td>
                        </tr>
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">csrf_token</td>
                          <td className="py-3">Protección contra ataques CSRF</td>
                          <td className="py-3">Sesión</td>
                        </tr>
                        <tr>
                          <td className="py-3">cookie_consent</td>
                          <td className="py-3">Guarda tus preferencias de cookies</td>
                          <td className="py-3">1 año</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-compact text-slate mt-4">
                    ⚠️ Estas cookies no pueden desactivarse ya que el sitio no funcionaría
                    correctamente.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-4">
                    2. Cookies de rendimiento y análisis
                  </h3>
                  <p className="text-body text-slate mb-4">
                    Estas cookies nos ayudan a entender cómo los usuarios interactúan con
                    nuestro sitio web, permitiéndonos mejorar la experiencia.
                  </p>
                  <div className="bg-gallery-white rounded-2xl p-6">
                    <table className="w-full text-compact">
                      <thead>
                        <tr className="border-b border-hairline-silver">
                          <th className="text-left pb-3 text-ink font-semibold">Cookie</th>
                          <th className="text-left pb-3 text-ink font-semibold">Propósito</th>
                          <th className="text-left pb-3 text-ink font-semibold">Duración</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate">
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">_ga</td>
                          <td className="py-3">Google Analytics - ID único de usuario</td>
                          <td className="py-3">2 años</td>
                        </tr>
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">_ga_*</td>
                          <td className="py-3">Google Analytics - Estado de sesión</td>
                          <td className="py-3">2 años</td>
                        </tr>
                        <tr>
                          <td className="py-3">_gid</td>
                          <td className="py-3">Google Analytics - ID de sesión</td>
                          <td className="py-3">24 horas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-compact text-slate mt-4">
                    ✓ Puedes desactivar estas cookies desde el panel de preferencias.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-4">
                    3. Cookies de funcionalidad
                  </h3>
                  <p className="text-body text-slate mb-4">
                    Estas cookies permiten que el sitio web recuerde tus preferencias y
                    proporcione funciones mejoradas.
                  </p>
                  <div className="bg-gallery-white rounded-2xl p-6">
                    <table className="w-full text-compact">
                      <thead>
                        <tr className="border-b border-hairline-silver">
                          <th className="text-left pb-3 text-ink font-semibold">Cookie</th>
                          <th className="text-left pb-3 text-ink font-semibold">Propósito</th>
                          <th className="text-left pb-3 text-ink font-semibold">Duración</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate">
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">language</td>
                          <td className="py-3">Guarda tu idioma preferido</td>
                          <td className="py-3">1 año</td>
                        </tr>
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">theme</td>
                          <td className="py-3">Guarda tu preferencia de tema</td>
                          <td className="py-3">1 año</td>
                        </tr>
                        <tr>
                          <td className="py-3">recent_products</td>
                          <td className="py-3">Productos vistos recientemente</td>
                          <td className="py-3">30 días</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-compact text-slate mt-4">
                    ✓ Puedes desactivar estas cookies, pero algunas funciones no estarán
                    disponibles.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-4">
                    4. Cookies de publicidad y marketing
                  </h3>
                  <p className="text-body text-slate mb-4">
                    Estas cookies se utilizan para mostrar anuncios relevantes y medir la
                    efectividad de nuestras campañas.
                  </p>
                  <div className="bg-gallery-white rounded-2xl p-6">
                    <table className="w-full text-compact">
                      <thead>
                        <tr className="border-b border-hairline-silver">
                          <th className="text-left pb-3 text-ink font-semibold">Cookie</th>
                          <th className="text-left pb-3 text-ink font-semibold">Propósito</th>
                          <th className="text-left pb-3 text-ink font-semibold">Duración</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate">
                        <tr className="border-b border-hairline-silver">
                          <td className="py-3">_fbp</td>
                          <td className="py-3">Facebook Pixel - Seguimiento</td>
                          <td className="py-3">3 meses</td>
                        </tr>
                        <tr>
                          <td className="py-3">_gcl_au</td>
                          <td className="py-3">Google Ads - Conversiones</td>
                          <td className="py-3">3 meses</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-compact text-slate mt-4">
                    ✓ Puedes desactivar estas cookies en cualquier momento.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Cookies de terceros
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Utilizamos servicios de terceros que pueden establecer sus propias cookies:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Google Analytics:</strong> para análisis de
                      tráfico y comportamiento
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Stripe/PayPal:</strong> para procesar pagos
                      de forma segura
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Facebook/Google Ads:</strong> para publicidad
                      dirigida
                    </span>
                  </li>
                </ul>
                <p>
                  Estas cookies están sujetas a las políticas de privacidad de cada proveedor.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Cómo gestionar las cookies
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Puedes controlar y gestionar las cookies de varias maneras:</p>

                <div>
                  <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                    1. Panel de preferencias de WeLens
                  </h3>
                  <p className="mb-4">
                    Puedes ajustar tus preferencias de cookies en cualquier momento:
                  </p>
                  <button className="bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-compact-control font-normal px-6 py-2.5 rounded-full transition-colors">
                    Gestionar preferencias de cookies
                  </button>
                </div>

                <div>
                  <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                    2. Configuración del navegador
                  </h3>
                  <p>Puedes configurar tu navegador para rechazar cookies:</p>
                  <ul className="space-y-1 ml-6 mt-2">
                    <li className="flex items-start gap-3">
                      <span className="text-pricing-blue mt-1">•</span>
                      <span>
                        <strong className="text-ink">Chrome:</strong> Configuración &gt;
                        Privacidad y seguridad &gt; Cookies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pricing-blue mt-1">•</span>
                      <span>
                        <strong className="text-ink">Firefox:</strong> Opciones &gt; Privacidad
                        y seguridad
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pricing-blue mt-1">•</span>
                      <span>
                        <strong className="text-ink">Safari:</strong> Preferencias &gt;
                        Privacidad
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                    3. Herramientas de exclusión
                  </h3>
                  <p>Puedes optar por no recibir cookies de publicidad en:</p>
                  <ul className="space-y-1 ml-6 mt-2">
                    <li className="flex items-start gap-3">
                      <span className="text-pricing-blue mt-1">•</span>
                      <a
                        href="https://www.youronlinechoices.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pricing-blue hover:text-pricing-blue/80 underline"
                      >
                        Your Online Choices
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pricing-blue mt-1">•</span>
                      <a
                        href="https://www.networkadvertising.org/choices/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pricing-blue hover:text-pricing-blue/80 underline"
                      >
                        Network Advertising Initiative
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Actualizaciones de esta política
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Podemos actualizar esta Política de Cookies ocasionalmente. Te notificaremos
                  de cualquier cambio significativo mediante un aviso en el sitio web o por
                  email.
                </p>
                <p>
                  Te recomendamos revisar esta página periódicamente para estar al tanto de
                  cualquier cambio.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">Contacto</h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Si tienes preguntas sobre nuestra Política de Cookies:
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:privacidad@welens.com"
                    className="text-pricing-blue hover:text-pricing-blue/80 underline"
                  >
                    privacidad@welens.com
                  </a>
                  <br />
                  Teléfono: +1 809 504 2837
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
