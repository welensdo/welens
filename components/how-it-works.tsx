"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import AnimatedSection from "@/components/ui/animated-section";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Selecciona tu graduación",
      description:
        "Usa nuestro configurador online para elegir tu nivel exacto de miopía o astigmatismo.",
      image: "/itself.PNG",
    },
    {
      number: "02",
      title: "Recibe tus WeLens",
      description:
        "Te enviamos tus lentillas adhesivas personalizadas en un elegante estuche protector.",
      image: "/incase.PNG",
    },
    {
      number: "03",
      title: "Aplica en segundos",
      description:
        "Coloca las WeLens en la parte interior de tus gafas. La adhesión es instantánea y segura.",
      image: "/inglass.PNG",
    },
  ];

  return (
    <div className="w-full py-20 lg:py-40 bg-gallery-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="flex flex-col gap-4 mb-16 text-center">
          <div className="flex justify-center">
            <Badge variant="secondary">Proceso</Badge>
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight font-semibold text-ink">
            Cómo funciona
          </h2>
          <p className="text-body max-w-2xl mx-auto text-slate">
            Tres pasos simples para transformar cualquier gafa en tu visión perfecta.
          </p>
        </AnimatedSection>

        <div className="space-y-20 lg:space-y-32">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <AnimatedSection 
                animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                delay={200}
                className="flex-1 space-y-4"
              >
                <p className="text-6xl sm:text-7xl font-semibold text-studio-mist">
                  {step.number}
                </p>
                <h3 className="text-2xl sm:text-4xl font-semibold text-ink tracking-tight">
                  {step.title}
                </h3>
                <p className="text-body text-slate leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </AnimatedSection>
              
              <AnimatedSection 
                animation={index % 2 === 0 ? "fade-left" : "fade-right"}
                delay={400}
                className="flex-1 w-full"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-studio-mist">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
