import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Información Legal
            </h1>
            <p className="text-body-large text-slate mb-8">
              Información corporativa y documentos legales de WeLens
            </p>
          </div>
        </section>

        {/* Company Information */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-12">
            <h2 className="text-display-small font-semibold text-ink mb-8">
              Datos de la Empresa
            </h2>

            <div className="space-y-6 text-body text-slate">
              <div>
                <p className="text-body-emphasized font-semibold text-ink mb-2">
                  Denominación Social
                </p>
                <p>WeLens Technologies S.L.</p>
              </div>

              <div>
                <p className="text-body-emphasized font-semibold text-ink mb-2">
                  Número de Identificación Fiscal (NIF)
                </p>
                <p>B-12345678</p>
              </div>

              <div>
                <p className="text-body-emphasized font-semibold text-ink mb-2">
                  Domicilio Social
                </p>
                <p>
                  Calle de la Innovación, 42
                  <br />
                  28001 Madrid, España
                </p>
              </div>

              <div>
                <p className="text-body-emphasized font-semibold text-ink mb-2">
                  Registro Mercantil
                </p>
                <p>
                  Inscrita en el Registro Mercantil de Madrid
                  <br />
                  Tomo 40.123, Folio 89, Hoja M-712345
                </p>
              </div>

              <div>
                <p className="text-body-emphasized font-semibold text-ink mb-2">
                  Contacto
                </p>
                <p>
                  Email: legal@welens.com
                  <br />
                  Teléfono: +34 900 123 456
                </p>
              </div>

              <div>
                <p className="text-body-emphasized font-semibold text-ink mb-2">
                  Actividad
                </p>
                <p>
                  Desarrollo, fabricación y comercialización de productos ópticos y
                  accesorios relacionados con la corrección visual.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Documents */}
          <h2 className="text-display-small font-semibold text-ink mb-8">
            Documentos Legales
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/privacidad"
              className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2 group-hover:text-pricing-blue transition-colors">
                    Política de Privacidad
                  </h3>
                  <p className="text-body text-slate">
                    Cómo recopilamos, usamos y protegemos tus datos personales
                  </p>
                </div>
                <span className="text-pricing-blue text-xl">→</span>
              </div>
            </Link>

            <Link
              href="/terminos"
              className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2 group-hover:text-pricing-blue transition-colors">
                    Términos y Condiciones
                  </h3>
                  <p className="text-body text-slate">
                    Condiciones generales de uso y contratación
                  </p>
                </div>
                <span className="text-pricing-blue text-xl">→</span>
              </div>
            </Link>

            <Link
              href="/cookies"
              className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2 group-hover:text-pricing-blue transition-colors">
                    Política de Cookies
                  </h3>
                  <p className="text-body text-slate">
                    Información sobre el uso de cookies en nuestro sitio web
                  </p>
                </div>
                <span className="text-pricing-blue text-xl">→</span>
              </div>
            </Link>

            <Link
              href="/accesibilidad"
              className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2 group-hover:text-pricing-blue transition-colors">
                    Declaración de Accesibilidad
                  </h3>
                  <p className="text-body text-slate">
                    Nuestro compromiso con la accesibilidad web
                  </p>
                </div>
                <span className="text-pricing-blue text-xl">→</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Additional Information */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
            <h2 className="text-display-small font-semibold text-ink mb-6">
              Propiedad Intelectual
            </h2>
            <div className="space-y-4 text-body text-slate">
              <p>
                Todos los contenidos de este sitio web, incluyendo textos, imágenes, logotipos,
                iconos, diseños, código fuente y cualquier otro material, son propiedad de
                WeLens Technologies S.L. o de sus proveedores de contenidos y están protegidos
                por las leyes españolas e internacionales de propiedad intelectual e industrial.
              </p>
              <p>
                La marca "WeLens" y todos los logotipos relacionados son marcas registradas de
                WeLens Technologies S.L. Queda prohibido su uso sin autorización expresa por
                escrito.
              </p>
              <p>
                Está prohibida la reproducción, distribución, comunicación pública y
                transformación de cualquier contenido de este sitio web sin autorización previa
                y por escrito de WeLens Technologies S.L.
              </p>
            </div>
          </div>
        </section>

        {/* Dispute Resolution */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
            <h2 className="text-display-small font-semibold text-ink mb-6">
              Resolución de Conflictos
            </h2>
            <div className="space-y-4 text-body text-slate">
              <p>
                En cumplimiento de la Ley de Resolución Alternativa de Litigios, informamos
                que, en caso de que exista una controversia derivada de la prestación de
                nuestros servicios, el Cliente podrá recurrir a la presentación de reclamaciones
                ante los organismos de resolución de conflictos competentes.
              </p>
              <p>
                Para la resolución de controversias en línea puede acudir a la plataforma de
                resolución de litigios en línea de la Unión Europea disponible en:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pricing-blue hover:text-pricing-blue/80 underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p>
                Las partes se someten, a su elección, para la resolución de los conflictos y con
                renuncia a cualquier otro fuero, a los juzgados y tribunales de Madrid.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              ¿Tienes alguna pregunta legal?
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-8">
              Para consultas legales, contacta con nuestro departamento legal
            </p>
            <a
              href="mailto:legal@welens.com"
              className="inline-block bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
            >
              legal@welens.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
