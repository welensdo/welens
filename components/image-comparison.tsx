"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ImageComparison() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setInset(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="w-full py-20 lg:py-40 bg-gallery-white" id="como-funciona">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="secondary">Versátil</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl sm:text-5xl tracking-tight lg:max-w-xl font-semibold text-ink">
              Visión perfecta, ahora en cualquier gafa
            </h2>
            <p className="text-body max-w-xl lg:max-w-xl leading-relaxed text-slate">
              Compara la diferencia. Desliza para ver cómo WeLens transforma
              tus gafas favoritas sin graduación en lentes perfectos para tu visión.
            </p>
          </div>
          <div className="pt-12 w-full">
            <div
              className="relative aspect-video w-full h-full overflow-hidden rounded-3xl select-none bg-studio-mist"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-ink/20 h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-gallery-white rounded-full hover:scale-110 transition-all w-10 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-5 z-30 cursor-ew-resize flex justify-center items-center shadow-subtle-2"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <svg
                    className="h-5 w-5 text-ink select-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </button>
              </div>
              <Image
                src="/after.png"
                alt="Con WeLens"
                width={1920}
                height={1080}
                priority
                className="absolute left-0 top-0 z-10 w-full h-full object-cover rounded-3xl select-none"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                }}
              />
              <Image
                src="/before.jpg"
                alt="Sin WeLens"
                width={1920}
                height={1080}
                priority
                className="absolute left-0 top-0 w-full h-full object-cover rounded-3xl select-none"
              />
              
              {/* Labels */}
              <div className="absolute top-6 left-6 bg-gallery-white/90 backdrop-blur-sm px-4 py-2 rounded-full z-15">
                <p className="text-compact-control font-semibold text-ink">Sin WeLens</p>
              </div>
              <div className="absolute top-6 right-6 bg-gallery-white/90 backdrop-blur-sm px-4 py-2 rounded-full z-15">
                <p className="text-compact-control font-semibold text-ink">Con WeLens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
