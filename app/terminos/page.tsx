import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-body-large text-slate mb-4">
              Última actualización: 1 de septiembre de 2026
            </p>
            <p className="text-body text-slate">
              Por favor, lee estos términos cuidadosamente antes de usar nuestros servicios.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none space-y-8">
            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                1. Aceptación de los Términos
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Al acceder y utilizar el sitio web de WeLens y sus servicios, aceptas estar
                  sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte
                  de estos términos, no debes usar nuestros servicios.
                </p>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento.
                  Los cambios entrarán en vigor inmediatamente después de su publicación en el
                  sitio web.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                2. Descripción del Servicio
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  WeLens ofrece lentillas adhesivas personalizadas con graduación que se
                  adhieren a gafas existentes. Nuestros servicios incluyen:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Configurador online para personalizar graduación</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Fabricación y envío de lentillas personalizadas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Membresía Pro con beneficios exclusivos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Soporte técnico y atención al cliente</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                3. Registro y Cuenta de Usuario
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Para realizar pedidos, debes crear una cuenta proporcionando información
                  precisa y completa. Eres responsable de:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Mantener la confidencialidad de tu contraseña</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Todas las actividades que ocurran bajo tu cuenta</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pricing-blue mt-1">•</span>
                    <span>Notificarnos inmediatamente de cualquier uso no autorizado</span>
                  </li>
                </ul>
                <p>
                  Nos reservamos el derecho de suspender o cancelar cuentas que violen estos
                  términos.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                4. Pedidos y Pagos
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  <strong className="text-ink">4.1. Proceso de pedido:</strong> Al realizar un
                  pedido, recibirás una confirmación por email. La aceptación del pedido se
                  produce cuando enviamos la confirmación de envío.
                </p>
                <p>
                  <strong className="text-ink">4.2. Precios:</strong> Todos los precios están
                  en euros (€) e incluyen IVA. Nos reservamos el derecho de modificar precios
                  sin previo aviso, pero los cambios no afectarán pedidos ya confirmados.
                </p>
                <p>
                  <strong className="text-ink">4.3. Pago:</strong> Aceptamos tarjetas de
                  crédito/débito y PayPal. El pago se procesa de forma segura a través de
                  proveedores certificados PCI-DSS.
                </p>
                <p>
                  <strong className="text-ink">4.4. Graduación:</strong> Eres responsable de
                  proporcionar una graduación precisa y actualizada. No nos hacemos responsables
                  de errores en la graduación proporcionada por el usuario.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                5. Envíos y Entregas
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  <strong className="text-ink">5.1. Plazos:</strong> Envíos estándar 5-7 días
                  laborables. WeLens Pro 24-48h. Los plazos son estimados y no garantizados.
                </p>
                <p>
                  <strong className="text-ink">5.2. Costes:</strong> Envío gratuito en pedidos
                  superiores a €50. WeLens Pro incluye envío gratuito en todos los pedidos.
                </p>
                <p>
                  <strong className="text-ink">5.3. Responsabilidad:</strong> Una vez entregado
                  el pedido a la empresa de transporte, esta asume la responsabilidad. Debes
                  revisar el paquete en el momento de la entrega.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                6. Devoluciones y Reembolsos
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  <strong className="text-ink">6.1. Derecho de desistimiento:</strong> Tienes
                  30 días desde la recepción para devolver el producto sin dar explicaciones. El
                  producto debe estar en su estado original.
                </p>
                <p>
                  <strong className="text-ink">6.2. Proceso:</strong> Contacta con
                  soporte@welens.com para iniciar una devolución. Te proporcionaremos
                  instrucciones y etiqueta de devolución.
                </p>
                <p>
                  <strong className="text-ink">6.3. Reembolso:</strong> Procesaremos el
                  reembolso en un plazo de 14 días tras recibir la devolución, mediante el mismo
                  método de pago original.
                </p>
                <p>
                  <strong className="text-ink">6.4. Excepciones:</strong> No se aceptan
                  devoluciones de productos dañados por mal uso o productos personalizados si el
                  error fue del usuario.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                7. Garantía
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Todos los productos tienen garantía de 1 año (2 años para WeLens Pro) contra
                  defectos de fabricación. La garantía no cubre desgaste normal, mal uso o
                  daños accidentales.
                </p>
                <p>Ver la política completa de garantía en /garantia</p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                8. Membresía WeLens Pro
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  <strong className="text-ink">8.1. Suscripción:</strong> La membresía Pro es
                  una suscripción recurrente mensual o anual.
                </p>
                <p>
                  <strong className="text-ink">8.2. Renovación:</strong> Se renueva
                  automáticamente hasta que canceles. Te avisaremos 7 días antes de cada cargo.
                </p>
                <p>
                  <strong className="text-ink">8.3. Cancelación:</strong> Puedes cancelar en
                  cualquier momento desde tu panel de control. La cancelación será efectiva al
                  final del período de facturación actual.
                </p>
                <p>
                  <strong className="text-ink">8.4. Reembolsos:</strong> No se realizan
                  reembolsos proporcionales por cancelación anticipada.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                9. Propiedad Intelectual
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Todo el contenido del sitio web (textos, imágenes, logos, diseños) es
                  propiedad de WeLens Technologies S.L. y está protegido por leyes de propiedad
                  intelectual.
                </p>
                <p>
                  No puedes reproducir, distribuir, modificar o crear trabajos derivados sin
                  nuestro permiso expreso por escrito.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                10. Limitación de Responsabilidad
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  WeLens no será responsable de daños indirectos, incidentales o consecuentes
                  derivados del uso de nuestros productos o servicios.
                </p>
                <p>
                  Nuestra responsabilidad máxima se limita al importe pagado por el producto en
                  cuestión.
                </p>
                <p>
                  No garantizamos que nuestros productos sean adecuados para todas las monturas
                  de gafas ni para todas las condiciones visuales.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                11. Ley Aplicable y Jurisdicción
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Estos términos se rigen por la legislación española. Para la resolución de
                  cualquier controversia, las partes se someten a los Juzgados y Tribunales de
                  Madrid.
                </p>
              </div>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
              <h2 className="text-display-small font-semibold text-ink mb-6">
                12. Contacto
              </h2>
              <div className="space-y-4 text-body text-slate">
                <p>
                  Para cualquier pregunta sobre estos términos:
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:legal@welens.com"
                    className="text-pricing-blue hover:text-pricing-blue/80 underline"
                  >
                    legal@welens.com
                  </a>
                  <br />
                  Teléfono: +34 900 123 456
                  <br />
                  Dirección: Calle de la Innovación, 42, 28001 Madrid, España
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
