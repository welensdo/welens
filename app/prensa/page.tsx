import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrensaPage() {
  const pressReleases = [
    {
      date: "15 Septiembre 2026",
      title: "WeLens cierra ronda de financiación Serie A de €10M",
      excerpt:
        "La startup española revoluciona el mercado de gafas graduadas con su innovadora tecnología de lentillas adhesivas.",
    },
    {
      date: "22 Agosto 2026",
      title: "WeLens lanza membresía Pro con beneficios exclusivos",
      excerpt:
        "La nueva suscripción ofrece descuentos permanentes, envío prioritario y soporte premium.",
    },
    {
      date: "10 Julio 2026",
      title: "WeLens alcanza 10,000 clientes satisfechos",
      excerpt:
        "La compañía celebra un hito importante con una tasa de satisfacción del 98% y 4.9 estrellas de valoración.",
    },
    {
      date: "5 Junio 2026",
      title: "Expansión internacional: WeLens llega a Portugal",
      excerpt:
        "La empresa española expande sus operaciones al mercado portugués tras el éxito en España.",
    },
  ];

  const mediaKit = [
    {
      name: "Logo Pack",
      description: "Logos en diferentes formatos y variaciones",
      size: "2.5 MB",
      type: "ZIP",
    },
    {
      name: "Brand Guidelines",
      description: "Guía completa de identidad visual",
      size: "8.3 MB",
      type: "PDF",
    },
    {
      name: "Product Images",
      description: "Fotos de producto en alta resolución",
      size: "45 MB",
      type: "ZIP",
    },
    {
      name: "Fact Sheet",
      description: "Información corporativa y datos clave",
      size: "156 KB",
      type: "PDF",
    },
  ];

  const coverage = [
    {
      outlet: "TechCrunch",
      title: "Spanish startup WeLens reimagines prescription eyewear",
      date: "Agosto 2026",
    },
    {
      outlet: "El País",
      title: "La revolución de las gafas graduadas llega desde España",
      date: "Julio 2026",
    },
    {
      outlet: "Wired",
      title: "How WeLens is disrupting the $140B eyewear market",
      date: "Junio 2026",
    },
    {
      outlet: "Expansión",
      title: "WeLens levanta €10M para expandirse por Europa",
      date: "Septiembre 2026",
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
              Sala de Prensa
            </h1>
            <p className="text-body-large text-slate mb-8">
              Últimas noticias, recursos para medios y contacto de prensa.
            </p>
          </div>
        </section>

        {/* Press Contact */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center mb-16">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              Contacto de Prensa
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-6">
              Para consultas de prensa, entrevistas o información adicional
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:prensa@welens.org"
                className="text-body-emphasized text-gallery-white hover:text-gallery-white/80"
              >
                📧 prensa@welens.org
              </a>
              <a
                href="tel:+34900123456"
                className="text-body-emphasized text-gallery-white hover:text-gallery-white/80"
              >
                📞 +34 900 123 456
              </a>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Comunicados de Prensa
          </h2>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow"
              >
                <p className="text-compact text-slate mb-2">{release.date}</p>
                <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                  {release.title}
                </h3>
                <p className="text-body text-slate mb-4">{release.excerpt}</p>
                <button className="text-compact-emphasized text-pricing-blue hover:text-pricing-blue/80 font-semibold">
                  Leer más →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Media Coverage */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Cobertura en Medios
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {coverage.map((item, index) => (
              <div
                key={index}
                className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow"
              >
                <p className="text-compact-emphasized font-semibold text-pricing-blue mb-2">
                  {item.outlet}
                </p>
                <h3 className="text-body-emphasized font-semibold text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-compact text-slate">{item.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Facts */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Datos Clave
          </h2>

          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-display-large font-semibold text-ink mb-2">
                  10k+
                </div>
                <p className="text-body text-slate">Clientes activos</p>
              </div>
              <div className="text-center">
                <div className="text-display-large font-semibold text-ink mb-2">98%</div>
                <p className="text-body text-slate">Satisfacción</p>
              </div>
              <div className="text-center">
                <div className="text-display-large font-semibold text-ink mb-2">
                  4.9★
                </div>
                <p className="text-body text-slate">Valoración media</p>
              </div>
            </div>

            <div className="space-y-4 text-body text-slate">
              <div className="flex items-start gap-3">
                <span className="text-pricing-blue mt-1">•</span>
                <p>
                  <strong className="text-ink">Fundación:</strong> 2024, Madrid, España
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pricing-blue mt-1">•</span>
                <p>
                  <strong className="text-ink">Misión:</strong> Hacer las gafas graduadas
                  accesibles y personalizables para todos
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pricing-blue mt-1">•</span>
                <p>
                  <strong className="text-ink">Tecnología:</strong> Lentillas adhesivas
                  hipoalergénicas con graduación personalizada
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pricing-blue mt-1">•</span>
                <p>
                  <strong className="text-ink">Financiación:</strong> €10M Serie A (2026)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-pricing-blue mt-1">•</span>
                <p>
                  <strong className="text-ink">Equipo:</strong> 45 personas en España y
                  Portugal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Kit de Medios
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {mediaKit.map((item, index) => (
              <div
                key={index}
                className="bg-studio-mist rounded-3xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                      {item.name}
                    </h3>
                    <p className="text-body text-slate mb-2">{item.description}</p>
                    <p className="text-compact text-slate">
                      {item.type} • {item.size}
                    </p>
                  </div>
                </div>
                <button className="bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-compact-control font-normal px-6 py-2.5 rounded-full transition-colors">
                  Descargar
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-compact text-slate">
              ¿Necesitas algo más? Contacta con nuestro equipo de prensa
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
