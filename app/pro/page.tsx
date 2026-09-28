import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function ProPage() {
  const benefits = [
    {
      title: "Descuentos exclusivos",
      description: "20% de descuento en todos tus pedidos de lentillas WeLens",
    },
    {
      title: "Soporte premium",
      description: "Atención prioritaria por chat, email y teléfono",
    },
    {
      title: "Reposiciones automáticas",
      description: "Recibe tus lentillas automáticamente cada 6 meses o cuando las necesites",
    },
    {
      title: "Garantía extendida",
      description: "Garantía de 2 años en lugar de 1 año estándar",
    },
    {
      title: "Acceso anticipado",
      description: "Prueba nuevos productos y tecnologías antes que nadie",
    },
    {
      title: "Cambios gratuitos",
      description: "Cambio de graduación sin coste adicional durante todo el año",
    },
    {
      title: "Sin permanencia",
      description: "Cancela cuando quieras sin penalizaciones ni ataduras",
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
              WeLens Pro
            </h1>
            <p className="text-body-large text-slate mb-12">
              Únete a WeLens Pro y disfruta de beneficios exclusivos, descuentos permanentes
              y prioridad en todos nuestros servicios.
            </p>

            <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-8">
              <div className="flex flex-col items-center mb-8">
                <div className="text-display-large font-semibold text-ink mb-2">
                  $60<span className="text-body-large text-slate">/año</span>
                </div>
                <p className="text-body text-slate">Membresía anual</p>
              </div>

              <Link
                href="/auth"
                className="inline-block bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
              >
                Únete a WeLens Pro
              </Link>
            </div>

            <p className="text-compact-emphasized text-slate">
              Cancela cuando quieras. Sin permanencia.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-16">
            Beneficios de WeLens Pro
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-studio-mist rounded-3xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                  {benefit.title}
                </h3>
                <p className="text-compact text-slate">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Preguntas frecuentes
          </h2>

          <div className="space-y-6">
            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ¿Puedo cancelar en cualquier momento?
              </h3>
              <p className="text-body text-slate">
                Sí, puedes cancelar tu membresía Pro en cualquier momento desde tu panel de control.
                No hay permanencia ni penalizaciones.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                ¿El descuento se aplica automáticamente?
              </h3>
              <p className="text-body text-slate">
                Sí, el 20% de descuento se aplica automáticamente en el checkout cuando eres miembro Pro.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
