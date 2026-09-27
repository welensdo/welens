import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CarrerasPage() {
  const positions = [
    {
      title: "Abogado Corporativo",
      department: "Legal",
      location: "Remote / US",
      type: "Full-time",
    },
    {
      title: "Ejecutivo de Ventas",
      department: "Ventas",
      location: "Remote / US",
      type: "Full-time",
    },
    {
      title: "Encargado de Marketing",
      department: "Marketing",
      location: "Remote / US",
      type: "Full-time",
    },
  ];

  const values = [
    {
      title: "Innovación constante",
      description:
        "Trabajamos con las últimas tecnologías y siempre buscamos nuevas formas de mejorar.",
    },
    {
      title: "Colaboración",
      description:
        "Creemos en el poder del trabajo en equipo y la comunicación abierta.",
    },
    {
      title: "Crecimiento personal",
      description:
        "Invertimos en el desarrollo profesional de cada miembro del equipo.",
    },
    {
      title: "Impacto real",
      description:
        "Nuestro trabajo mejora la vida de miles de personas cada día.",
    },
  ];

  const benefits = [
    "Salario competitivo y equity",
    "25 días de vacaciones + festivos",
    "Seguro médico privado",
    "Equipo de última generación",
    "Trabajo remoto flexible",
    "Presupuesto para formación",
    "Comida en la oficina",
    "Team building events",
  ];

  return (
    <div className="min-h-screen bg-gallery-white">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-large lg:text-display-xlarge font-semibold text-ink mb-6">
              Únete al equipo WeLens
            </h1>
            <p className="text-body-large text-slate mb-8">
              Estamos revolucionando la forma en que las personas usan gafas graduadas.
              Si quieres ser parte de esta revolución, estamos buscando talento excepcional.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Nuestros valores
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-studio-mist rounded-3xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                  {value.title}
                </h3>
                <p className="text-body text-slate">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Beneficios
          </h2>

          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-pricing-blue mt-1">•</span>
                  <span className="text-body text-ink">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Posiciones abiertas
          </h2>

          <div className="space-y-4">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-compact text-slate">
                      <span>📂 {position.department}</span>
                      <span>📍 {position.location}</span>
                      <span>⏰ {position.type}</span>
                    </div>
                  </div>
                  <button className="bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-compact-control font-normal px-6 py-2.5 rounded-full transition-colors whitespace-nowrap">
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Proceso de selección
          </h2>

          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
            <div className="space-y-8">
              <div className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  1
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Aplicación
                  </h3>
                  <p className="text-body text-slate">
                    Envía tu CV y carta de presentación a careers@welens.com
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  2
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Entrevista inicial
                  </h3>
                  <p className="text-body text-slate">
                    Llamada de 30 minutos con nuestro equipo de People para conocerte mejor
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  3
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Prueba técnica
                  </h3>
                  <p className="text-body text-slate">
                    Un pequeño proyecto o challenge relacionado con el puesto (para roles técnicos)
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  4
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Entrevista final
                  </h3>
                  <p className="text-body text-slate">
                    Reunión con el equipo y founders para asegurarnos de que encajas con la cultura
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <span className="flex-shrink-0 w-12 h-12 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-body-emphasized font-semibold">
                  5
                </span>
                <div className="flex-1 pt-2">
                  <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                    Oferta
                  </h3>
                  <p className="text-body text-slate">
                    Si todo va bien, te haremos una oferta y ¡bienvenido al equipo! 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              ¿No ves la posición perfecta?
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-8">
              Siempre estamos buscando talento excepcional. Envíanos tu CV y te contactaremos
              cuando tengamos una posición que encaje contigo.
            </p>
            <a
              href="mailto:careers@welens.com"
              className="inline-block bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
            >
              careers@welens.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
