import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AccesibilidadPage() {
  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Declaración de Accesibilidad
            </h1>
            <p className="text-body-large text-slate mb-4">
              Última actualización: 1 de septiembre de 2026
            </p>
            <p className="text-body text-slate">
              WeLens está comprometido con hacer su sitio web accesible para todas las personas.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none space-y-8">
            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Nuestro Compromiso
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  En WeLens creemos que todos deberían poder acceder y disfrutar de nuestros
                  productos y servicios. Nos esforzamos por cumplir con las{" "}
                  <strong className="text-ink">
                    Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 nivel AA
                  </strong>
                  , que son el estándar internacional para la accesibilidad web.
                </p>
                <p>
                  Trabajamos continuamente para mejorar la accesibilidad de nuestro sitio web y
                  garantizar que sea utilizable por el mayor número de personas posible,
                  independientemente de sus capacidades o tecnología.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Características de Accesibilidad
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    ♿ Navegación por teclado
                  </h3>
                  <p className="text-body text-slate">
                    Todas las funcionalidades principales son accesibles mediante teclado.
                    Puedes navegar por el sitio usando Tab, Enter, Espacio y las teclas de
                    flecha.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    👁️ Lectores de pantalla
                  </h3>
                  <p className="text-body text-slate">
                    Nuestro sitio está optimizado para lectores de pantalla como JAWS, NVDA y
                    VoiceOver. Utilizamos etiquetas ARIA apropiadas y textos alternativos
                    descriptivos para todas las imágenes.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    🎨 Contraste de colores
                  </h3>
                  <p className="text-body text-slate">
                    Todos los textos cumplen con los requisitos de contraste WCAG AA (mínimo
                    4.5:1 para texto normal y 3:1 para texto grande). Nuestros colores
                    principales (ink sobre gallery-white) superan estos estándares.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    📏 Texto redimensionable
                  </h3>
                  <p className="text-body text-slate">
                    El texto puede ampliarse hasta un 200% sin pérdida de funcionalidad o
                    contenido. Utilizamos unidades relativas (rem, em) en lugar de píxeles fijos.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    🔗 Enlaces descriptivos
                  </h3>
                  <p className="text-body text-slate">
                    Todos los enlaces tienen texto descriptivo que explica su destino. Evitamos
                    enlaces genéricos como "haz clic aquí".
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    📱 Diseño responsive
                  </h3>
                  <p className="text-body text-slate">
                    El sitio se adapta a diferentes tamaños de pantalla y funciona bien en
                    dispositivos móviles, tablets y ordenadores.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    ⌨️ Indicadores de foco
                  </h3>
                  <p className="text-body text-slate">
                    Los elementos interactivos muestran un indicador visual claro cuando reciben
                    el foco del teclado, facilitando la navegación sin ratón.
                  </p>
                </div>

                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                    📝 Formularios accesibles
                  </h3>
                  <p className="text-body text-slate">
                    Todos los campos de formulario tienen etiquetas claras y mensajes de error
                    descriptivos. Los errores se anuncian a los lectores de pantalla.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Tecnologías Compatibles
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Nuestro sitio web funciona correctamente con:</p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gallery-white rounded-2xl p-6">
                    <h4 className="text-body-emphasized font-semibold text-ink mb-3">
                      Navegadores
                    </h4>
                    <ul className="space-y-1 text-compact">
                      <li>• Chrome (últimas 2 versiones)</li>
                      <li>• Firefox (últimas 2 versiones)</li>
                      <li>• Safari (últimas 2 versiones)</li>
                      <li>• Edge (últimas 2 versiones)</li>
                    </ul>
                  </div>
                  <div className="bg-gallery-white rounded-2xl p-6">
                    <h4 className="text-body-emphasized font-semibold text-ink mb-3">
                      Lectores de pantalla
                    </h4>
                    <ul className="space-y-1 text-compact">
                      <li>• JAWS (Windows)</li>
                      <li>• NVDA (Windows)</li>
                      <li>• VoiceOver (macOS/iOS)</li>
                      <li>• TalkBack (Android)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Limitaciones Conocidas
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  A pesar de nuestros esfuerzos, puede haber algunas limitaciones en la
                  accesibilidad de nuestro sitio:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Algunos contenidos de terceros (videos, widgets) pueden no ser totalmente
                      accesibles
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      PDFs antiguos pueden no estar optimizados para lectores de pantalla
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Algunos elementos visuales complejos (gráficos, diagramas) pueden requerir
                      descripciones adicionales
                    </span>
                  </li>
                </ul>
                <p className="mt-4">
                  Trabajamos activamente para resolver estas limitaciones en futuras
                  actualizaciones.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Evaluación y Pruebas
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Evaluamos la accesibilidad de nuestro sitio mediante:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Auditorías automáticas:</strong> usando
                      herramientas como axe, Lighthouse y WAVE
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Pruebas manuales:</strong> navegación por
                      teclado, lectores de pantalla
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Usuarios reales:</strong> feedback de
                      personas con diferentes capacidades
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Revisiones periódicas:</strong> evaluación
                      trimestral de accesibilidad
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Atajos de Teclado
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>Puedes usar los siguientes atajos de teclado en nuestro sitio:</p>
                <div className="bg-gallery-white rounded-2xl p-6 mt-4">
                  <table className="w-full text-compact">
                    <thead>
                      <tr className="border-b border-hairline-silver">
                        <th className="text-left pb-3 text-ink font-semibold">Atajo</th>
                        <th className="text-left pb-3 text-ink font-semibold">Función</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate">
                      <tr className="border-b border-hairline-silver">
                        <td className="py-3">
                          <code className="bg-studio-mist px-2 py-1 rounded">Tab</code>
                        </td>
                        <td className="py-3">Navegar al siguiente elemento</td>
                      </tr>
                      <tr className="border-b border-hairline-silver">
                        <td className="py-3">
                          <code className="bg-studio-mist px-2 py-1 rounded">
                            Shift + Tab
                          </code>
                        </td>
                        <td className="py-3">Navegar al elemento anterior</td>
                      </tr>
                      <tr className="border-b border-hairline-silver">
                        <td className="py-3">
                          <code className="bg-studio-mist px-2 py-1 rounded">Enter</code>
                        </td>
                        <td className="py-3">Activar enlace o botón</td>
                      </tr>
                      <tr className="border-b border-hairline-silver">
                        <td className="py-3">
                          <code className="bg-studio-mist px-2 py-1 rounded">Espacio</code>
                        </td>
                        <td className="py-3">Activar botón o checkbox</td>
                      </tr>
                      <tr className="border-b border-hairline-silver">
                        <td className="py-3">
                          <code className="bg-studio-mist px-2 py-1 rounded">Esc</code>
                        </td>
                        <td className="py-3">Cerrar modal o menú</td>
                      </tr>
                      <tr>
                        <td className="py-3">
                          <code className="bg-studio-mist px-2 py-1 rounded">↑ ↓</code>
                        </td>
                        <td className="py-3">Navegar en menús desplegables</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Reportar Problemas de Accesibilidad
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Si encuentras alguna barrera de accesibilidad en nuestro sitio web, por favor
                  háznoslo saber. Tu feedback es valioso para ayudarnos a mejorar.
                </p>
                <p>Puedes contactarnos mediante:</p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Email:</strong>{" "}
                      <a
                        href="mailto:accesibilidad@welens.com"
                        className="text-pricing-blue hover:text-pricing-blue/80 underline"
                      >
                        accesibilidad@welens.com
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Teléfono:</strong> +1 809 504 2837
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      <strong className="text-ink">Formulario:</strong>{" "}
                      <a
                        href="/contacto"
                        className="text-pricing-blue hover:text-pricing-blue/80 underline"
                      >
                        Página de contacto
                      </a>
                    </span>
                  </li>
                </ul>
                <p className="mt-4">
                  Intentaremos responder en un plazo de 3 días laborables y proporcionar una
                  solución o alternativa cuando sea posible.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Mejora Continua
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  La accesibilidad es un proceso continuo. Nos comprometemos a:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Realizar auditorías de accesibilidad trimestrales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Formar a nuestro equipo en prácticas de accesibilidad</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Incluir pruebas de accesibilidad en nuestro proceso de desarrollo
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Consultar con usuarios con discapacidades para mejorar la experiencia
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>
                      Actualizar esta declaración cuando realicemos mejoras significativas
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                Conformidad Formal
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Esta declaración de accesibilidad se aplica a{" "}
                  <strong className="text-ink">welens.com</strong>
                </p>
                <p>
                  Declaramos que nuestro sitio web es{" "}
                  <strong className="text-ink">parcialmente conforme</strong> con las WCAG 2.1
                  nivel AA. "Parcialmente conforme" significa que algunas partes del contenido no
                  cumplen totalmente con el estándar, pero estamos trabajando activamente para
                  alcanzar la conformidad completa.
                </p>
                <p>
                  Esta declaración fue preparada el 1 de septiembre de 2026 y fue revisada por
                  última vez el 1 de septiembre de 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              ¿Necesitas ayuda con la accesibilidad?
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-8">
              Estamos aquí para ayudarte. Contacta con nuestro equipo de accesibilidad.
            </p>
            <a
              href="mailto:accesibilidad@welens.com"
              className="inline-block bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
            >
              accesibilidad@welens.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
