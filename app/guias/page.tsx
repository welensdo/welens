import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function GuiasPage() {
  const guides = [
    {
      title: "Instalación paso a paso",
      duration: "5 min",
      steps: [
        "Limpia tus gafas con el paño de microfibra incluido",
        "Retira el protector de la lentilla WeLens",
        "Alinea la lentilla con tu lente actual",
        "Presiona suavemente desde el centro hacia los bordes",
        "Deja secar durante 2 minutos",
      ],
    },
    {
      title: "Cómo tomar tu graduación",
      duration: "3 min",
      steps: [
        "Visita a tu óptico u oftalmólogo para una revisión completa",
        "Solicita una receta con: esfera, cilindro, eje y distancia pupilar",
        "Verifica que la receta tenga menos de 2 años",
        "Introduce los valores exactos en nuestro configurador",
        "Si tienes dudas, nuestro soporte puede ayudarte a leer la receta",
      ],
    },
    {
      title: "Limpieza y mantenimiento",
      duration: "2 min",
      steps: [
        "Limpia diariamente con un paño de microfibra seco",
        "Evita productos químicos agresivos (alcohol, acetona)",
        "No uses agua caliente ni jabón",
        "Guarda tus gafas en un estuche rígido cuando no las uses",
        "Si necesitas limpieza profunda, usa nuestro spray especializado",
      ],
    },
    {
      title: "Cómo quitar y volver a colocar",
      duration: "3 min",
      steps: [
        "Para quitar: sujeta la lentilla por los bordes y levanta suavemente",
        "Limpia con paño de microfibra si es necesario",
        "Para volver a colocar: alinea nuevamente con tu lente",
        "Presiona suavemente desde el centro",
        "Las lentillas mantienen su adherencia tras múltiples usos",
      ],
    },
    {
      title: "Solución de problemas comunes",
      duration: "4 min",
      steps: [
        "Burbujas de aire: presiona suavemente desde el centro hacia fuera",
        "Pérdida de adherencia: limpia con paño seco y vuelve a colocar",
        "Visión borrosa: verifica que la graduación sea correcta",
        "Bordes levantados: asegúrate de presionar uniformemente",
        "Si el problema persiste, contacta con soporte para reemplazo gratuito",
      ],
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
              Guías de Uso
            </h1>
            <p className="text-body-large text-slate mb-12">
              Todo lo que necesitas saber para aprovechar al máximo tus lentillas WeLens.
              Desde la instalación hasta el mantenimiento diario.
            </p>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 mb-16">
            <h2 className="text-display-medium font-semibold text-ink text-center mb-6">
              Video Tutorial Completo
            </h2>
            <div className="aspect-video bg-slate/10 rounded-2xl flex items-center justify-center mb-6 border border-hairline-silver">
              <div className="text-center">
                <div className="w-16 h-16 bg-pricing-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[12px] border-l-gallery-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-body-emphasized text-ink">
                  Video de instalación paso a paso
                </p>
                <p className="text-compact text-slate mt-2">Duración: 3:45</p>
              </div>
            </div>
            <p className="text-body text-slate text-center">
              Este video se incluye automáticamente en el email de confirmación de tu pedido
            </p>
          </div>

          {/* Guides List */}
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Guías Detalladas
          </h2>

          <div className="space-y-8">
            {guides.map((guide, index) => (
              <div key={index} className="bg-studio-mist rounded-3xl p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-body-large-emphasized font-semibold text-ink mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-compact text-slate">⏱️ {guide.duration}</p>
                  </div>
                </div>

                <ol className="space-y-4">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-pricing-blue text-gallery-white rounded-full flex items-center justify-center text-compact-emphasized font-semibold">
                        {stepIndex + 1}
                      </span>
                      <p className="text-body text-slate flex-1 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-display-medium font-semibold text-ink text-center mb-12">
            Consejos Pro
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                Primer uso
              </h3>
              <p className="text-body text-slate">
                La primera vez puede tomar un poco más de tiempo. No te preocupes, es normal.
                Tómate tu tiempo y sigue las instrucciones paso a paso.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                Temperatura ambiente
              </h3>
              <p className="text-body text-slate">
                Para mejores resultados, instala las lentillas a temperatura ambiente (18-24°C).
                Evita temperaturas extremas durante la instalación.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                Manos limpias
              </h3>
              <p className="text-body text-slate">
                Asegúrate de tener las manos limpias y secas antes de manipular las lentillas.
                Esto evita huellas y suciedad en tus gafas.
              </p>
            </div>

            <div className="bg-studio-mist rounded-3xl p-8">
              <h3 className="text-body-large-emphasized font-semibold text-ink mb-3">
                Guarda el packaging
              </h3>
              <p className="text-body text-slate">
                Conserva el packaging original durante los primeros 30 días por si necesitas
                hacer una devolución o cambio.
              </p>
            </div>
          </div>
        </section>

        {/* Need Help CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pricing-blue rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-display-medium font-semibold text-gallery-white mb-4">
              ¿Necesitas ayuda personalizada?
            </h2>
            <p className="text-body-large text-gallery-white/90 mb-8">
              Nuestro equipo de soporte está disponible para ayudarte con videollamadas
              o chat en vivo durante la instalación.
            </p>
            <a
              href="/soporte"
              className="inline-block bg-gallery-white hover:bg-gallery-white/90 text-pricing-blue text-body-emphasized font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Contactar Soporte
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
