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
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-slate max-w-none space-y-12 text-body text-slate">
            
            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                1. Responsable del Tratamiento
              </h2>
              <p>
                <strong className="text-ink">Identidad:</strong> WeLens Technologies Inc.
                <br />
                <strong className="text-ink">EIN:</strong> XX-XXXXXXX
                <br />
                <strong className="text-ink">Dirección:</strong> 123 Innovation Drive, San Francisco, CA 94102, United States
                <br />
                <strong className="text-ink">Email:</strong> privacidad@welens.com
                <br />
                <strong className="text-ink">Teléfono:</strong> +1 (415) 123-4567
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                2. Datos que Recopilamos
              </h2>

              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3 mt-6">
                2.1. Datos de registro
              </h3>
              <p className="mb-4">
                Cuando creas una cuenta, recopilamos: nombre completo, dirección de email,
                contraseña (encriptada), dirección de envío, número de teléfono.
              </p>

              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                2.2. Datos de pedido
              </h3>
              <p className="mb-4">
                Graduación óptica (esfera, cilindro, eje, distancia pupilar), preferencias
                de producto, historial de pedidos, información de pago (procesada por terceros).
              </p>

              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                2.3. Datos de navegación
              </h3>
              <p className="mb-4">
                Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia,
                cookies y tecnologías similares.
              </p>

              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                2.4. Comunicaciones
              </h3>
              <p>
                Emails, mensajes de chat, llamadas telefónicas, feedback y valoraciones.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                3. Finalidad del Tratamiento
              </h2>
              <p className="mb-4">Utilizamos tus datos para:</p>
              <ul className="space-y-2 ml-6">
                <li>• Procesar y gestionar tus pedidos, incluyendo fabricación personalizada</li>
                <li>• Gestionar tu cuenta de usuario y membresía Pro</li>
                <li>• Proporcionar atención al cliente y soporte técnico</li>
                <li>• Enviar comunicaciones transaccionales (confirmaciones, envíos)</li>
                <li>• Mejorar nuestros productos y servicios mediante análisis de uso</li>
                <li>• Enviar comunicaciones comerciales (solo con tu consentimiento previo)</li>
                <li>• Cumplir con obligaciones legales y fiscales</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                4. Base Legal
              </h2>
              <p className="mb-4">El tratamiento de tus datos se basa en:</p>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-ink">Ejecución de contrato:</strong> para procesar pedidos y prestar servicios</li>
                <li>• <strong className="text-ink">Consentimiento:</strong> para comunicaciones comerciales y cookies no esenciales</li>
                <li>• <strong className="text-ink">Interés legítimo:</strong> para análisis, mejora de servicios y seguridad</li>
                <li>• <strong className="text-ink">Obligación legal:</strong> para cumplir con normativas fiscales y contables</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                5. Compartir Datos con Terceros
              </h2>
              <p className="mb-4">Compartimos tus datos únicamente con:</p>
              <ul className="space-y-2 ml-6 mb-4">
                <li>• <strong className="text-ink">Procesadores de pago:</strong> Stripe, PayPal (datos de pago encriptados)</li>
                <li>• <strong className="text-ink">Empresas de logística:</strong> para gestionar envíos</li>
                <li>• <strong className="text-ink">Proveedores de servicios:</strong> hosting, email, análisis (AWS, Google Analytics)</li>
                <li>• <strong className="text-ink">Autoridades:</strong> cuando lo requiera la ley</li>
              </ul>
              <p>
                Todos nuestros proveedores están sujetos a acuerdos de confidencialidad y cumplen con las regulaciones de privacidad aplicables.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                6. Conservación de Datos
              </h2>
              <ul className="space-y-2 ml-6">
                <li>• <strong className="text-ink">Datos de cuenta:</strong> hasta que solicites la eliminación</li>
                <li>• <strong className="text-ink">Datos de pedidos:</strong> 7 años (por obligaciones fiscales)</li>
                <li>• <strong className="text-ink">Cookies:</strong> según tipo (ver Política de Cookies)</li>
                <li>• <strong className="text-ink">Marketing:</strong> hasta que retires el consentimiento</li>
              </ul>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                7. Tus Derechos
              </h2>
              <p className="mb-4">Tienes derecho a:</p>
              <ul className="space-y-2 ml-6 mb-4">
                <li>• <strong className="text-ink">Acceso:</strong> saber qué datos tenemos sobre ti</li>
                <li>• <strong className="text-ink">Rectificación:</strong> corregir datos inexactos o incompletos</li>
                <li>• <strong className="text-ink">Supresión:</strong> solicitar la eliminación de tus datos</li>
                <li>• <strong className="text-ink">Oposición:</strong> oponerte al tratamiento de tus datos</li>
                <li>• <strong className="text-ink">Limitación:</strong> restringir el tratamiento</li>
                <li>• <strong className="text-ink">Portabilidad:</strong> recibir tus datos en formato estructurado</li>
                <li>• <strong className="text-ink">Retirar consentimiento:</strong> en cualquier momento</li>
              </ul>
              <p className="mb-4">
                Para ejercer tus derechos, contacta con:{" "}
                <a
                  href="mailto:privacidad@welens.com"
                  className="text-pricing-blue hover:text-pricing-blue/80 underline"
                >
                  privacidad@welens.com
                </a>
              </p>
              <p>
                También puedes presentar una queja ante la autoridad de protección de datos competente en tu jurisdicción.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                8. Seguridad
              </h2>
              <p>
                Implementamos medidas técnicas y organizativas para proteger tus datos:
                encriptación SSL/TLS, contraseñas hasheadas con bcrypt, acceso restringido
                basado en roles, copias de seguridad regulares, y auditorías de seguridad periódicas.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                9. Menores de Edad
              </h2>
              <p>
                Nuestros servicios no están dirigidos a menores de 16 años. Si descubrimos
                que hemos recopilado datos de un menor sin consentimiento parental,
                eliminaremos esa información inmediatamente.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                10. Transferencias Internacionales
              </h2>
              <p className="mb-4">
                Tus datos pueden ser transferidos y procesados en servidores ubicados en Estados Unidos y otros países donde operan nuestros proveedores de servicios.
              </p>
              <p>
                Nos aseguramos de que estas transferencias cumplan con las leyes de protección de datos aplicables mediante el uso de cláusulas contractuales estándar y otras salvaguardas apropiadas.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                11. Cambios a esta Política
              </h2>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos de cualquier cambio significativo mediante un aviso en el sitio web o por email. La fecha de "última actualización" al principio del documento indica cuándo se realizó la revisión más reciente.
              </p>
            </div>

            <div>
              <h2 className="text-display-small font-semibold text-ink mb-6">
                12. Ley Aplicable
              </h2>
              <p>
                Esta Política de Privacidad se rige por las leyes del Estado de California y las leyes federales de Estados Unidos. Para la resolución de disputas relacionadas con esta política, las partes se someten a la jurisdicción exclusiva de los tribunales estatales y federales ubicados en el Condado de San Francisco, California.
              </p>
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
