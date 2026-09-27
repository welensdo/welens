"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ReactNode } from "react";

interface CardItem {
  id: string;
  category: string;
  title: ReactNode;
  src: string;
  alt?: string;
}

const cards: CardItem[] = [
  {
    id: "1",
    category: "Libertad Visual",
    title: <>Cualquier gafa, tu visión perfecta.</>,
    src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
  },
  {
    id: "2",
    category: "Tecnología",
    title: <>Material flexible que se adapta a ti.</>,
    src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
  },
  {
    id: "3",
    category: "Diseño",
    title: <>Invisible. Ligero. Revolucionario.</>,
    src: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=800&q=80",
  },
  {
    id: "4",
    category: "Sostenible",
    title: (
      <>
        Una solución,
        <br /> infinitas posibilidades.
      </>
    ),
    src: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80",
  },
  {
    id: "5",
    category: "Precisión",
    title: <>Graduación exacta en cada lente.</>,
    src: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=80",
  },
  {
    id: "6",
    category: "Comodidad",
    title: <>Tan cómodo que olvidarás que está ahí.</>,
    src: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
  },
];

const AppleCardCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

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

  return (
    <div className="w-full py-5 sm:py-10">
      {/* Header */}
      <div className="px-4 sm:px-8 mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink">
          Descubre WeLens
        </h2>
      </div>

      {/* Card Strip */}
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-6 px-4 sm:px-8 py-4">
          {cards.map((card) => (
            <CarouselItem key={card.id} className="pl-6 basis-auto">
              <div className="group relative w-[280px] h-[460px] sm:w-[320px] sm:h-[520px] lg:w-[370px] lg:h-[600px] border border-hairline-silver overflow-hidden flex flex-col justify-between p-6 sm:p-8 rounded-3xl hover:scale-102 transition-transform duration-300 cursor-pointer">
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
                <div className="relative z-10 flex flex-col gap-3 sm:gap-4 text-white">
                  <p className="text-sm sm:text-base font-medium">
                    {card.category}
                  </p>
                  <p className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                    {card.title}
                  </p>
                </div>
                <div className="relative z-10 flex justify-end">
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-full shadow-xs bg-white hover:bg-white/80 cursor-pointer flex items-center justify-center"
                  >
                    <ArrowUpRightIcon className="h-4 w-4 text-black transition-transform duration-300 group-hover:rotate-45 will-change-transform" />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bottom-right controls */}
      <div className="flex justify-end gap-2 px-4 sm:px-8 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="h-10 w-10 rounded-full bg-gallery-white shadow-subtle border-steel"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="h-10 w-10 rounded-full bg-gallery-white shadow-subtle border-steel"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppleCardCarousel;
