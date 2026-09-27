import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const testimonials = [
  {
    name: "María González",
    role: "Diseñadora",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    content:
      "WeLens cambió completamente mi forma de usar gafas. Ahora puedo usar mis gafas de sol favoritas con mi graduación. Es simplemente genial.",
    rating: 5,
  },
  {
    name: "Carlos Ruiz",
    role: "Fotógrafo",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    content:
      "Como fotógrafo necesito cambiar entre diferentes gafas constantemente. WeLens me permite hacerlo sin sacrificar mi visión. Increíble producto.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    role: "Atleta",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    content:
      "Uso WeLens en mis gafas deportivas y la diferencia es notable. Perfecta adhesión, cero distorsión y super cómodas. Las recomiendo al 100%.",
    rating: 5,
  },
  {
    name: "David López",
    role: "Arquitecto",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    content:
      "La calidad óptica es impresionante. No esperaba que unas lentillas adhesivas pudieran funcionar tan bien. Ahorro mucho dinero graduando mis gafas.",
    rating: 5,
  },
  {
    name: "Ana Torres",
    role: "Abogada",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    content:
      "Elegante, práctica y efectiva. WeLens es la solución perfecta para quienes valoramos tanto la funcionalidad como el estilo.",
    rating: 5,
  },
  {
    name: "Miguel Sánchez",
    role: "Ingeniero",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    content:
      "La instalación es super fácil y el resultado es perfecto. Uso WeLens en mis gafas de seguridad en el trabajo y funcionan de maravilla.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="w-full py-20 lg:py-32 bg-studio-mist">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <Badge variant="secondary" className="mb-4">
            Testimonios
          </Badge>
          <h2 className="font-sf-pro-display text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-6 tracking-tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="font-sf-pro-text text-feature-copy text-slate max-w-3xl mx-auto">
            Miles de personas ya disfrutan de la libertad que ofrece WeLens
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gallery-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-sf-pro-display text-lg font-semibold text-ink">
                    {testimonial.name}
                  </h4>
                  <p className="font-sf-pro-text text-body-small text-slate">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-pricing-blue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="font-sf-pro-text text-body text-ink leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
