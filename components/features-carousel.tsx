"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ReactNode } from "react";
import AnimatedSection from "@/components/ui/animated-section";

interface CardItem {
  id: string;
  category: string;
  title: ReactNode;
  content: string;
  src: string;
  alt?: string;
}

const cards: CardItem[] = [
  {
    id: "1",
    category: "Tecnología Adaptativa",
    title: <>Adhesión perfecta a cualquier superficie.</>,
    content: "WeLens utiliza una tecnología patentada de adhesión que se adapta perfectamente a cualquier tipo de superficie de gafa. Nuestro material especial garantiza una unión segura y duradera sin dañar tus gafas favoritas.",
    src: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
  },
  {
    id: "2",
    category: "Graduación Personalizada",
    title: <>Tu visión exacta, en cualquier gafa.</>,
    content: "Cada WeLens se fabrica específicamente para tu graduación exacta. Nuestro proceso de personalización garantiza que obtengas la corrección visual perfecta, independientemente del tipo de gafa que uses.",
    src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
  },
  {
    id: "3",
    category: "Material Premium",
    title: <>Goma de alta calidad, transparente y duradera.</>,
    content: "Fabricamos WeLens con materiales de la más alta calidad. Nuestro polímero transparente es resistente a rayones, fácil de limpiar y diseñado para durar años manteniendo su claridad óptica perfecta.",
    src: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
  },
  {
    id: "4",
    category: "Instalación Simple",
    title: (
      <>
        Aplica en segundos,
        <br /> disfruta todo el día.
      </>
    ),
    content: "La instalación de WeLens es increíblemente simple. En solo segundos puedes transformar cualquier gafa en gafas graduadas. Sin herramientas especiales, sin complicaciones, solo resultados inmediatos.",
    src: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800&q=80",
  },
  {
    id: "5",
    category: "Compatible Universal",
    title: <>Funciona con gafas de sol, deportivas y más.</>,
    content: "WeLens es compatible con prácticamente cualquier tipo de gafa: gafas de sol, deportivas, de lectura, de seguridad y más. Una solución universal para todas tus necesidades visuales.",
    src: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80",
  },
  {
    id: "6",
    category: "Diseño Invisible",
    title: <>Nadie notará que las llevas puestas.</>,
    content: "El diseño ultra-delgado y transparente de WeLens hace que sea prácticamente invisible. Puedes usar tus gafas favoritas con corrección visual sin comprometer su estilo original.",
    src: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80",
  },
];

export default function FeaturesCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [selectedCard, setSelectedCard] = React.useState<CardItem | null>(null);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const handleCardClick = (card: CardItem) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <div className="w-full py-10 sm:py-20 bg-studio-mist" id="caracteristicas">
        {/* Animated Header */}
        <AnimatedSection animation="fade-up" className="px-4 sm:px-8 mb-8 sm:mb-12 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-feature-heading font-semibold tracking-tight text-ink">
            Conoce WeLens
          </h2>
        </AnimatedSection>

        {/* Animated Card Strip */}
        <AnimatedSection animation="fade-up" delay={200}>
          <Carousel
            setApi={setApi}
            opts={{ align: "start", dragFree: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 px-4 sm:px-8 py-4">
              {cards.map((card) => (
                <CarouselItem key={card.id} className="pl-6 basis-auto">
                  <div 
                    className="group relative w-[320px] h-[500px] sm:w-80 sm:h-[520px] lg:w-[370px] lg:h-[600px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 rounded-3xl hover:scale-102 transition-transform duration-300 cursor-pointer bg-gallery-white shadow-subtle"
                    onClick={() => handleCardClick(card)}
                  >
                    <img
                      src={card.src}
                      alt={
                        card.alt ||
                        (typeof card.title === "string"
                          ? card.title
                          : card.category)
                      }
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="relative z-10 flex flex-col gap-3 sm:gap-4 text-white">
                      <p className="text-sm sm:text-base font-medium">
                        {card.category}
                      </p>
                      <p className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                        {card.title}
                      </p>
                    </div>
                    <div className="relative z-10 flex justify-end">
                      <div className="h-10 w-10 rounded-full bg-white hover:bg-white/90 cursor-pointer flex items-center justify-center transition-colors">
                        <svg
                          className="h-5 w-5 text-black transition-transform duration-300 group-hover:rotate-45 will-change-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </AnimatedSection>

        {/* Animated Bottom-right controls */}
        <AnimatedSection animation="fade-up" delay={400} className="flex justify-end gap-2 px-4 sm:px-8 mt-6 max-w-7xl mx-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="h-10 w-10 rounded-full bg-gallery-white border-steel disabled:opacity-30"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="h-10 w-10 rounded-full bg-gallery-white border-steel disabled:opacity-30"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </AnimatedSection>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 bg-white rounded-3xl p-8 mx-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 pr-4">
                <h3 className="text-2xl font-semibold text-ink mb-2">
                  {selectedCard.category}
                </h3>
                <div className="text-xl text-slate mb-4">
                  {selectedCard.title}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Cerrar modal"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <img
                src={selectedCard.src}
                alt={selectedCard.category}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
            
            <p className="text-base leading-relaxed text-slate">
              {selectedCard.content}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
