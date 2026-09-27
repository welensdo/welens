import { Badge } from "@/components/ui/badge";

const benefits = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Material premium",
    description:
      "Goma de alta calidad óptica que no distorsiona la visión. Resistente a rayones y fácil de limpiar.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Reutilizable",
    description:
      "Coloca y quita tus lentillas cuantas veces quieras. Duración garantizada de más de 2 años.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Instalación instantánea",
    description:
      "No necesitas herramientas ni conocimientos especiales. Aplica en segundos sobre cualquier superficie limpia.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Universal",
    description:
      "Compatible con gafas de sol, gafas deportivas, protección industrial y cualquier montura que te guste.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Ahorra dinero",
    description:
      "Ya no necesitas gastar cientos de euros en graduar cada par de gafas que compres. Una inversión, infinitas posibilidades.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
        />
      </svg>
    ),
    title: "Portable",
    description:
      "Lleva tu graduación en el bolsillo. Perfecto para viajes, deportes o situaciones donde prefieres no llevar tus gafas graduadas.",
  },
];

export function Benefits() {
  return (
    <section className="w-full py-20 lg:py-32 bg-studio-mist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <Badge variant="secondary" className="mb-4">
            Beneficios
          </Badge>
          <h2 className="font-sf-pro-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-6 tracking-tight">
            Por qué elegir WeLens
          </h2>
          <p className="font-sf-pro-text text-feature-copy text-slate max-w-3xl mx-auto">
            Una solución innovadora que combina tecnología, practicidad y estilo
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gallery-white rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-pricing-blue/10 rounded-2xl flex items-center justify-center text-pricing-blue mb-6">
                {benefit.icon}
              </div>
              <h3 className="font-sf-pro-display text-2xl font-semibold text-ink mb-3 tracking-tight">
                {benefit.title}
              </h3>
              <p className="font-sf-pro-text text-body text-slate leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
