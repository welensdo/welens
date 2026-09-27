import { 
  SparklesIcon, 
  ArrowPathIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon,
  SunIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

const benefits = [
  {
    icon: SparklesIcon,
    title: "Material Premium",
    description: "Goma de alta calidad que no deja residuos y se mantiene transparente con el uso.",
  },
  {
    icon: ArrowPathIcon,
    title: "Reutilizable",
    description: "Quita y pon tus WeLens cuantas veces quieras. Duran meses con el cuidado adecuado.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Protección UV",
    description: "Filtro UV incorporado para proteger tus ojos incluso en tus gafas de sol sin graduación.",
  },
  {
    icon: CurrencyDollarIcon,
    title: "Ahorro Real",
    description: "Deja de comprar múltiples gafas graduadas. Una solución para todas tus monturas favoritas.",
  },
  {
    icon: SunIcon,
    title: "Para Cualquier Gafa",
    description: "Compatible con gafas de sol, monturas deportivas, lentes de moda y más.",
  },
  {
    icon: EyeIcon,
    title: "Visión Crystal Clear",
    description: "Óptica de precisión que no distorsiona. Como usar lentes graduados tradicionales.",
  },
];

export default function Benefits() {
  return (
    <section className="w-full bg-studio-mist py-20 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-feature-heading font-semibold text-ink mb-4">
            Diseñado para tu vida
          </h2>
          <p className="text-feature-copy text-slate max-w-2xl mx-auto">
            Cada detalle de WeLens ha sido pensado para darte la mejor experiencia visual posible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gallery-white rounded-3xl p-8 border border-hairline-silver hover:scale-102 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-studio-mist rounded-2xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6 text-ink" />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-3">
                {benefit.title}
              </h3>
              <p className="text-feature-copy text-slate leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
