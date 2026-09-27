import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Básico",
    price: "49.99",
    description: "Perfecto para probar WeLens",
    features: [
      "1 par de lentillas adhesivas",
      "Tu graduación personalizada",
      "Estuche de protección",
      "Garantía de 1 año",
      "Kit de limpieza incluido",
    ],
    cta: "Comprar ahora",
    popular: false,
  },
  {
    name: "Estándar",
    price: "89.99",
    description: "La opción más popular",
    features: [
      "2 pares de lentillas adhesivas",
      "Tu graduación personalizada",
      "Estuche premium",
      "Garantía de 2 años",
      "Kit de limpieza premium",
      "Envío express gratis",
    ],
    cta: "Empezar ahora",
    popular: true,
  },
  {
    name: "Pro",
    price: "149.99",
    description: "Para usuarios avanzados",
    features: [
      "4 pares de lentillas adhesivas",
      "Graduaciones múltiples",
      "Estuche de viaje premium",
      "Garantía de 3 años",
      "Kit de limpieza profesional",
      "Envío express gratis",
      "Soporte prioritario",
      "Reemplazo gratis primer año",
    ],
    cta: "Comprar Pro",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-20 lg:py-32 bg-gallery-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <Badge variant="secondary" className="mb-4">
            Precios
          </Badge>
          <h2 className="font-sf-pro-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-6 tracking-tight">
            Elige tu plan
          </h2>
          <p className="font-sf-pro-text text-feature-copy text-slate max-w-3xl mx-auto">
            Todos los planes incluyen envío gratuito y 30 días de garantía de devolución
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 lg:p-10 transition-all duration-300 ${
                plan.popular
                  ? "bg-ink text-white scale-105 shadow-2xl"
                  : "bg-studio-mist text-ink hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-pricing-blue text-white">
                    Más popular
                  </Badge>
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-sf-pro-display text-2xl font-semibold mb-2 tracking-tight">
                  {plan.name}
                </h3>
                <p
                  className={`font-sf-pro-text text-body-small ${
                    plan.popular ? "text-white/80" : "text-slate"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-sf-pro-display text-5xl lg:text-6xl font-semibold tracking-tight">
                    €{plan.price}
                  </span>
                  <span
                    className={`font-sf-pro-text text-body-small ${
                      plan.popular ? "text-white/60" : "text-slate"
                    }`}
                  >
                    / pago único
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className={`w-full mb-8 ${
                  plan.popular
                    ? "bg-white text-ink hover:bg-white/90"
                    : "bg-pricing-blue text-white hover:bg-pricing-blue/90"
                }`}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? "text-white" : "text-pricing-blue"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`font-sf-pro-text text-body-small ${
                        plan.popular ? "text-white/90" : "text-ink"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-sf-pro-text text-body-small text-slate text-center mt-12">
          ¿Tienes dudas?{" "}
          <a href="#" className="text-apple-blue hover:underline">
            Contáctanos
          </a>{" "}
          y te ayudaremos a elegir el plan perfecto
        </p>
      </div>
    </section>
  );
}
