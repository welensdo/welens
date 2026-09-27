import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="w-full py-20 lg:py-32 bg-gallery-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pricing-blue/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-sf-pro-display text-4xl md:text-5xl lg:text-7xl font-semibold text-ink mb-6 tracking-tight">
            Transforma tus gafas hoy
          </h2>
          <p className="font-sf-pro-text text-feature-copy text-slate max-w-2xl mx-auto mb-12">
            Únete a miles de personas que ya disfrutan de la libertad de usar cualquier gafa con su graduación perfecta
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-base font-medium">
              Comprar WeLens
            </Button>
            <Button size="lg" variant="outline" className="text-base font-medium">
              Ver el configurador
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-3xl mx-auto pt-12 border-t border-hairline-silver">
            <div>
              <p className="font-sf-pro-display text-4xl md:text-5xl font-semibold text-ink mb-2">
                10k+
              </p>
              <p className="font-sf-pro-text text-body-small text-slate">
                Clientes satisfechos
              </p>
            </div>
            <div>
              <p className="font-sf-pro-display text-4xl md:text-5xl font-semibold text-ink mb-2">
                98%
              </p>
              <p className="font-sf-pro-text text-body-small text-slate">
                Tasa de satisfacción
              </p>
            </div>
            <div>
              <p className="font-sf-pro-display text-4xl md:text-5xl font-semibold text-ink mb-2">
                2 años
              </p>
              <p className="font-sf-pro-text text-body-small text-slate">
                Garantía incluida
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
