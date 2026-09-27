import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: "01",
    title: "Elige tu graduación",
    description:
      "Usa nuestro selector inteligente para encontrar la graduación exacta que necesitas. Compatible con miopía y astigmatismo.",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
  },
  {
    number: "02",
    title: "Recibe tus WeLens",
    description:
      "Llegan directamente a tu puerta en un packaging premium. Cada par viene con su estuche de almacenamiento y paño de limpieza.",
    image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=800&q=80",
  },
  {
    number: "03",
    title: "Adhiere a tus gafas",
    description:
      "El material de goma flexible se adhiere perfectamente a cualquier lente. Sin burbujas, sin residuos. Se quita y se pone cuando quieras.",
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="w-full bg-gallery-white py-20 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-studio-mist text-ink border-0 mb-4">
            Proceso Simple
          </Badge>
          <h2 className="text-feature-heading font-semibold text-ink mb-4">
            Tres pasos hacia la visión perfecta
          </h2>
          <p className="text-feature-copy text-slate max-w-2xl mx-auto">
            Transformar tus gafas favoritas nunca fue tan sencillo.
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 lg:gap-20 items-center`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <p className="text-6xl font-semibold text-studio-mist">
                  {step.number}
                </p>
                <h3 className="text-3xl lg:text-4xl font-semibold text-ink tracking-tight">
                  {step.title}
                </h3>
                <p className="text-feature-copy text-slate leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-hairline-silver">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
