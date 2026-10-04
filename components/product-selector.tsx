"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type PrescriptionType = "myopia" | "astigmatism" | "both";

interface PrescriptionValues {
  myopia: number;
  astigmatism: number;
  axis: number;
}

export function ProductSelector() {
  const router = useRouter();
  const [prescriptionType, setPrescriptionType] =
    useState<PrescriptionType>("myopia");
  const [values, setValues] = useState<PrescriptionValues>({
    myopia: -2.0,
    astigmatism: -0.5,
    axis: 90,
  });

  const myopiaRange = Array.from({ length: 17 }, (_, i) => -0.5 - i * 0.5);
  const astigmatismRange = Array.from({ length: 13 }, (_, i) => -0.25 - i * 0.25);
  const axisRange = Array.from({ length: 19 }, (_, i) => i * 10);

  const handleAddToCart = () => {
    // Aquí iría la lógica para añadir al carrito
    // Por ahora redirigimos directamente a checkout
    router.push('/checkout');
  };

  return (
    <div className="w-full min-h-screen bg-gallery-white py-2 sm:py-12 lg:py-32">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-12 lg:mb-16">
          <Badge variant="default" className="mb-1.5 sm:mb-4 text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
            Personaliza tu visión
          </Badge>
          <h2 className="font-sf-pro-display text-xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-ink mb-1.5 sm:mb-4 tracking-tight px-2">
            Selecciona tu graduación
          </h2>
          <p className="font-sf-pro-text text-xs sm:text-lg text-slate max-w-2xl mx-auto px-2">
            Configura tus lentillas adhesivas con tu prescripción exacta
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          {/* Producto 3D Mockup */}
          <div className="relative aspect-square bg-studio-mist rounded-xl sm:rounded-3xl overflow-hidden flex items-center justify-center order-1 lg:order-1">
            <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-8 lg:p-12">
              <Image
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80"
                alt="WeLens Product"
                width={600}
                height={600}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            {/* Floating info card */}
            <div className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full px-2.5 sm:px-6 py-1 sm:py-3 shadow-lg">
              <p className="font-sf-pro-text text-[10px] sm:text-base font-semibold text-ink">
                Desde €49.99
              </p>
            </div>
          </div>

          {/* Selectores */}
          <div className="space-y-3 sm:space-y-8 order-2 lg:order-2">
            {/* Tipo de prescripción */}
            <div>
              <label className="block font-sf-pro-display text-sm sm:text-xl font-medium text-ink mb-1.5 sm:mb-4">
                Tipo de corrección
              </label>
              <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3">
                <Button
                  variant={prescriptionType === "myopia" ? "default" : "outline"}
                  onClick={() => setPrescriptionType("myopia")}
                  className="flex-1 h-10 sm:h-auto text-xs sm:text-base py-2"
                >
                  Miopía
                </Button>
                <Button
                  variant={
                    prescriptionType === "astigmatism" ? "default" : "outline"
                  }
                  onClick={() => setPrescriptionType("astigmatism")}
                  className="flex-1 h-10 sm:h-auto text-xs sm:text-base py-2"
                >
                  Astigmatismo
                </Button>
                <Button
                  variant={prescriptionType === "both" ? "default" : "outline"}
                  onClick={() => setPrescriptionType("both")}
                  className="flex-1 h-10 sm:h-auto text-xs sm:text-base py-2"
                >
                  Ambos
                </Button>
              </div>
            </div>

            {/* Miopía Slider */}
            {(prescriptionType === "myopia" || prescriptionType === "both") && (
              <div className="bg-white rounded-lg sm:rounded-2xl p-2.5 sm:p-6 shadow-sm border border-hairline-silver">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <label className="font-sf-pro-display text-xs sm:text-lg font-medium text-ink">
                    Miopía (Dioptrías)
                  </label>
                  <span className="font-sf-pro-text text-base sm:text-2xl font-semibold text-pricing-blue">
                    {values.myopia.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="-8.5"
                  max="-0.5"
                  step="0.5"
                  value={values.myopia}
                  onChange={(e) =>
                    setValues({ ...values, myopia: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 sm:h-3 bg-control-gray rounded-full appearance-none cursor-pointer accent-pricing-blue"
                />
                <div className="flex justify-between mt-1.5 sm:mt-2">
                  <span className="font-sf-pro-text text-[10px] sm:text-sm text-slate">
                    -8.5
                  </span>
                  <span className="font-sf-pro-text text-[10px] sm:text-sm text-slate">
                    -0.5
                  </span>
                </div>
              </div>
            )}

            {/* Astigmatismo Slider */}
            {(prescriptionType === "astigmatism" ||
              prescriptionType === "both") && (
              <div className="bg-white rounded-lg sm:rounded-2xl p-2.5 sm:p-6 shadow-sm border border-hairline-silver">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <label className="font-sf-pro-display text-xs sm:text-lg font-medium text-ink">
                    Astigmatismo (Dioptrías)
                  </label>
                  <span className="font-sf-pro-text text-base sm:text-2xl font-semibold text-pricing-blue">
                    {values.astigmatism.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="-3.25"
                  max="-0.25"
                  step="0.25"
                  value={values.astigmatism}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      astigmatism: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 sm:h-3 bg-control-gray rounded-full appearance-none cursor-pointer accent-pricing-blue"
                />
                <div className="flex justify-between mt-1.5 sm:mt-2">
                  <span className="font-sf-pro-text text-[10px] sm:text-sm text-slate">
                    -3.25
                  </span>
                  <span className="font-sf-pro-text text-[10px] sm:text-sm text-slate">
                    -0.25
                  </span>
                </div>
              </div>
            )}

            {/* Eje (solo para astigmatismo) */}
            {(prescriptionType === "astigmatism" ||
              prescriptionType === "both") && (
              <div className="bg-white rounded-lg sm:rounded-2xl p-2.5 sm:p-6 shadow-sm border border-hairline-silver">
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <label className="font-sf-pro-display text-xs sm:text-lg font-medium text-ink">
                    Eje
                  </label>
                  <span className="font-sf-pro-text text-base sm:text-2xl font-semibold text-pricing-blue">
                    {values.axis}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="10"
                  value={values.axis}
                  onChange={(e) =>
                    setValues({ ...values, axis: parseInt(e.target.value) })
                  }
                  className="w-full h-2 sm:h-3 bg-control-gray rounded-full appearance-none cursor-pointer accent-pricing-blue"
                />
                <div className="flex justify-between mt-1.5 sm:mt-2">
                  <span className="font-sf-pro-text text-[10px] sm:text-sm text-slate">
                    0°
                  </span>
                  <span className="font-sf-pro-text text-[10px] sm:text-sm text-slate">
                    180°
                  </span>
                </div>
              </div>
            )}

            {/* Botón de compra */}
            <div className="pt-2 sm:pt-6">
              <Button 
                size="lg" 
                className="w-full font-medium text-sm sm:text-base h-11 sm:h-12"
                onClick={handleAddToCart}
              >
                Añadir al carrito - €49.99
              </Button>
              <p className="font-sf-pro-text text-[10px] sm:text-sm text-slate text-center mt-1.5 sm:mt-4">
                Envío gratuito • Garantía de 2 años
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
