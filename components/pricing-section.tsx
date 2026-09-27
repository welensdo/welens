import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "Básico",
      price: "50",
      period: "por mes",
      description: "Perfecto para probar WeLens",
      features: [
        "1 par de WeLens graduadas",
        "Estuche protector incluido",
        "Garantía de 30 días",
        "Soporte por email",
      ],
      cta: "Empezar",
      popular: false,
    },
    {
      name: "Premium",
      price: "120",
      period: "pago único",
      description: "La mejor relación calidad-precio",
      features: [
        "3 pares de WeLens graduadas",
        "Estuche premium magnético",
        "Garantía de 1 año",
        "Soporte prioritario",
        "Kit de limpieza incluido",
      ],
      cta: "Comprar ahora",
      popular: true,
    },
    {
      name: "Profesional",
      price: "200",
      period: "pago único",
      description: "Para quien lo quiere todo",
      features: [
        "5 pares de WeLens graduadas",
        "Estuche premium magnético",
        "Garantía de 2 años",
        "Soporte prioritario 24/7",
        "Kit de limpieza premium",
        "Reemplazo gratuito anual",
      ],
      cta: "Comprar ahora",
      popular: false,
    },
  ];

  return (
    <div className="w-full py-20 lg:py-40 bg-gallery-white" id="precios">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-16 text-center">
          <div className="flex justify-center">
            <Badge variant="secondary">Precios</Badge>
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight font-semibold text-ink">
            Elige tu plan
          </h2>
          <p className="text-body max-w-2xl mx-auto text-slate">
            Planes flexibles para cada necesidad. Todos incluyen envío gratuito.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gallery-white rounded-3xl p-8 flex flex-col ${
                plan.popular
                  ? "border-2 border-pricing-blue shadow-lg scale-105"
                  : "border border-hairline-silver"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="px-4 py-1">
                    Más popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-ink mb-2">
                  {plan.name}
                </h3>
                <p className="text-body-small text-slate">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-semibold text-ink">
                    ${plan.price}
                  </span>
                  <span className="text-body-small text-slate">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-pricing-blue flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-body-small text-ink">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/configurador"
                className={`w-full py-3 rounded-full text-center font-medium transition-colors ${
                  plan.popular
                    ? "bg-pricing-blue text-gallery-white hover:bg-pricing-blue/90"
                    : "bg-studio-mist text-ink hover:bg-control-gray"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
