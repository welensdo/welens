"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";

type CorrectionType = "miopia" | "hipermetropia" | "presbicia" | null;

export default function ConfiguradorPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [leftEye, setLeftEye] = useState<{
    type: CorrectionType;
    value: number;
  }>({
    type: null,
    value: 0,
  });

  const [rightEye, setRightEye] = useState<{
    type: CorrectionType;
    value: number;
  }>({
    type: null,
    value: 0,
  });

  const miopiaOptions = [-1.0, -1.5, -2.0, -2.5, -3.0, -3.5, -4.0, -4.5, -5.0, -5.5, -6.0];
  const hipermetropiaOptions = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0];
  const presbiciaOptions = [1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 2.75, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0];

  const calculateExtraCost = (value: number): number => {
    const absValue = Math.abs(value);
    if (absValue <= 4.0) return 0;
    
    // Por cada 1.0 que pase de 4.0, cobramos $12
    const unitsOver = Math.ceil(absValue - 4.0);
    return unitsOver * 12;
  };

  const calculateTotalPrice = (): number => {
    const basePrice = 50;
    const leftExtraCost = leftEye.type ? calculateExtraCost(leftEye.value) : 0;
    const rightExtraCost = rightEye.type ? calculateExtraCost(rightEye.value) : 0;
    return basePrice + leftExtraCost + rightExtraCost;
  };

  const getOptionsForType = (type: CorrectionType) => {
    switch (type) {
      case "miopia":
        return miopiaOptions;
      case "hipermetropia":
        return hipermetropiaOptions;
      case "presbicia":
        return presbiciaOptions;
      default:
        return [];
    }
  };

  const resetEye = (eye: "left" | "right") => {
    if (eye === "left") {
      setLeftEye({ type: null, value: 0 });
    } else {
      setRightEye({ type: null, value: 0 });
    }
  };

  return (
    <main className="min-h-screen bg-gallery-white">
      <Navbar />

      <div className="pt-24 pb-20 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-12 text-center">
            <div className="flex justify-center">
              <Badge variant="secondary">Configurador</Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-hero-display font-semibold text-ink tracking-tight">
              Tu graduación perfecta
            </h1>
            <p className="text-body max-w-2xl mx-auto text-slate">
              Selecciona el tipo de corrección y la graduación para cada ojo.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Product Preview */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-24">
                <div className="bg-studio-mist rounded-3xl p-8 lg:p-12 w-full aspect-[16/9] flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Mockup 3D placeholder */}
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-2/3 h-2/3 text-ink/20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={0.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xl lg:text-2xl font-semibold text-ink mb-1">
                            WeLens Preview
                          </p>
                          <p className="text-compact-control text-slate">
                            Modelo 3D interactivo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Selection Summary */}
                <div className="mt-6 bg-gallery-white border border-hairline-silver rounded-3xl p-6">
                  <h3 className="text-xl font-semibold text-ink mb-4">
                    Tu configuración
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-body-small mb-6">
                    <div>
                      <p className="text-slate mb-1">Ojo izquierdo</p>
                      {leftEye.type ? (
                        <>
                          <p className="text-ink font-medium capitalize">
                            {leftEye.type}
                          </p>
                          <p className="text-ink font-semibold text-lg">
                            {leftEye.value > 0 ? "+" : ""}
                            {leftEye.value.toFixed(2)}
                          </p>
                          {calculateExtraCost(leftEye.value) > 0 && (
                            <p className="text-compact-control text-pricing-blue mt-1">
                              +${calculateExtraCost(leftEye.value)} extra
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-slate italic">No configurado</p>
                      )}
                    </div>
                    <div>
                      <p className="text-slate mb-1">Ojo derecho</p>
                      {rightEye.type ? (
                        <>
                          <p className="text-ink font-medium capitalize">
                            {rightEye.type}
                          </p>
                          <p className="text-ink font-semibold text-lg">
                            {rightEye.value > 0 ? "+" : ""}
                            {rightEye.value.toFixed(2)}
                          </p>
                          {calculateExtraCost(rightEye.value) > 0 && (
                            <p className="text-compact-control text-pricing-blue mt-1">
                              +${calculateExtraCost(rightEye.value)} extra
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-slate italic">No configurado</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Price Breakdown */}
                  {(leftEye.type || rightEye.type) && (
                    <div className="pt-4 border-t border-hairline-silver space-y-2">
                      <div className="flex justify-between text-body-small">
                        <span className="text-slate">Precio base</span>
                        <span className="text-ink font-medium">$50</span>
                      </div>
                      {(calculateExtraCost(leftEye.value) > 0 || calculateExtraCost(rightEye.value) > 0) && (
                        <div className="flex justify-between text-body-small">
                          <span className="text-slate">Graduación alta</span>
                          <span className="text-ink font-medium">
                            +${calculateExtraCost(leftEye.value) + calculateExtraCost(rightEye.value)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-body font-semibold pt-2 border-t border-hairline-silver">
                        <span className="text-ink">Total</span>
                        <span className="text-ink">${calculateTotalPrice()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Configuration Form */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                {/* Left Eye */}
                <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-6 lg:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-semibold text-ink mb-1">
                        Ojo izquierdo
                      </h3>
                      {leftEye.type && (
                        <p className="text-body-small text-slate capitalize">
                          {leftEye.type} • {leftEye.value > 0 ? "+" : ""}
                          {leftEye.value.toFixed(2)}
                        </p>
                      )}
                    </div>
                    {leftEye.type && (
                      <button
                        onClick={() => resetEye("left")}
                        className="text-compact-control text-slate hover:text-ink transition-colors underline"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* Type Selection - Pills */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setLeftEye({ type: "miopia", value: -1.0 })}
                        className={`flex-1 min-w-[140px] px-5 py-4 rounded-full text-center transition-all font-medium ${
                          leftEye.type === "miopia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Miopía
                      </button>
                      <button
                        onClick={() => setLeftEye({ type: "hipermetropia", value: 1.0 })}
                        className={`flex-1 min-w-[140px] px-5 py-4 rounded-full text-center transition-all font-medium ${
                          leftEye.type === "hipermetropia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Hipermetropía
                      </button>
                      <button
                        onClick={() => setLeftEye({ type: "presbicia", value: 1.0 })}
                        className={`flex-1 min-w-[140px] px-5 py-4 rounded-full text-center transition-all font-medium ${
                          leftEye.type === "presbicia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Presbicia
                      </button>
                    </div>

                    {/* Value Slider */}
                    {leftEye.type && (
                      <div className="pt-4">
                        <div className="flex justify-between items-baseline mb-6">
                          <span className="text-body-small text-slate">Graduación</span>
                          <div className="text-right">
                            <span className="text-3xl font-semibold text-ink">
                              {leftEye.value > 0 ? "+" : ""}
                              {leftEye.value.toFixed(2)}
                            </span>
                            {calculateExtraCost(leftEye.value) > 0 && (
                              <p className="text-compact-control text-pricing-blue mt-1">
                                +${calculateExtraCost(leftEye.value)} extra
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max={getOptionsForType(leftEye.type).length - 1}
                            step="1"
                            value={getOptionsForType(leftEye.type).indexOf(leftEye.value)}
                            onChange={(e) => {
                              const options = getOptionsForType(leftEye.type);
                              setLeftEye({ ...leftEye, value: options[parseInt(e.target.value)] });
                            }}
                            className="w-full h-2 bg-studio-mist rounded-full appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between mt-3 text-compact-control text-slate">
                            <span>
                              {getOptionsForType(leftEye.type)[0] > 0 ? "+" : ""}
                              {getOptionsForType(leftEye.type)[0].toFixed(2)}
                            </span>
                            <span>
                              {getOptionsForType(leftEye.type)[getOptionsForType(leftEye.type).length - 1] > 0 ? "+" : ""}
                              {getOptionsForType(leftEye.type)[getOptionsForType(leftEye.type).length - 1].toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Eye */}
                <div className="bg-gallery-white border border-hairline-silver rounded-3xl p-6 lg:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-semibold text-ink mb-1">
                        Ojo derecho
                      </h3>
                      {rightEye.type && (
                        <p className="text-body-small text-slate capitalize">
                          {rightEye.type} • {rightEye.value > 0 ? "+" : ""}
                          {rightEye.value.toFixed(2)}
                        </p>
                      )}
                    </div>
                    {rightEye.type && (
                      <button
                        onClick={() => resetEye("right")}
                        className="text-compact-control text-slate hover:text-ink transition-colors underline"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* Type Selection - Pills */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setRightEye({ type: "miopia", value: -1.0 })}
                        className={`flex-1 min-w-[140px] px-5 py-4 rounded-full text-center transition-all font-medium ${
                          rightEye.type === "miopia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Miopía
                      </button>
                      <button
                        onClick={() => setRightEye({ type: "hipermetropia", value: 1.0 })}
                        className={`flex-1 min-w-[140px] px-5 py-4 rounded-full text-center transition-all font-medium ${
                          rightEye.type === "hipermetropia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Hipermetropía
                      </button>
                      <button
                        onClick={() => setRightEye({ type: "presbicia", value: 1.0 })}
                        className={`flex-1 min-w-[140px] px-5 py-4 rounded-full text-center transition-all font-medium ${
                          rightEye.type === "presbicia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Presbicia
                      </button>
                    </div>

                    {/* Value Slider */}
                    {rightEye.type && (
                      <div className="pt-4">
                        <div className="flex justify-between items-baseline mb-6">
                          <span className="text-body-small text-slate">Graduación</span>
                          <div className="text-right">
                            <span className="text-3xl font-semibold text-ink">
                              {rightEye.value > 0 ? "+" : ""}
                              {rightEye.value.toFixed(2)}
                            </span>
                            {calculateExtraCost(rightEye.value) > 0 && (
                              <p className="text-compact-control text-pricing-blue mt-1">
                                +${calculateExtraCost(rightEye.value)} extra
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max={getOptionsForType(rightEye.type).length - 1}
                            step="1"
                            value={getOptionsForType(rightEye.type).indexOf(rightEye.value)}
                            onChange={(e) => {
                              const options = getOptionsForType(rightEye.type);
                              setRightEye({ ...rightEye, value: options[parseInt(e.target.value)] });
                            }}
                            className="w-full h-2 bg-studio-mist rounded-full appearance-none cursor-pointer slider"
                          />
                          <div className="flex justify-between mt-3 text-compact-control text-slate">
                            <span>
                              {getOptionsForType(rightEye.type)[0] > 0 ? "+" : ""}
                              {getOptionsForType(rightEye.type)[0].toFixed(2)}
                            </span>
                            <span>
                              {getOptionsForType(rightEye.type)[getOptionsForType(rightEye.type).length - 1] > 0 ? "+" : ""}
                              {getOptionsForType(rightEye.type)[getOptionsForType(rightEye.type).length - 1].toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    className={`flex-1 text-center py-5 rounded-full font-semibold transition-all text-lg ${
                      leftEye.type && rightEye.type
                        ? "bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white shadow-lg hover:shadow-xl cursor-pointer"
                        : "bg-studio-mist text-slate cursor-not-allowed"
                    }`}
                    disabled={!leftEye.type || !rightEye.type}
                    onClick={() => {
                      if (leftEye.type && rightEye.type) {
                        addToCart({
                          id: `lens-${Date.now()}`,
                          type: 'lens',
                          leftEye,
                          rightEye,
                          price: calculateTotalPrice(),
                          quantity: 1,
                        });
                        router.push("/checkout");
                      }
                    }}
                  >
                    Continuar al checkout • ${calculateTotalPrice()}
                  </button>
                  <button
                    onClick={() => {
                      setLeftEye({ type: null, value: 0 });
                      setRightEye({ type: null, value: 0 });
                    }}
                    className="sm:w-auto px-8 py-5 bg-gallery-white border-2 border-hairline-silver hover:border-steel text-ink text-center rounded-full font-medium transition-colors"
                  >
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1c1c1e;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .slider::-webkit-slider-thumb:active {
          transform: scale(1.05);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #1c1c1e;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .slider::-moz-range-thumb:active {
          transform: scale(1.05);
        }
      `}</style>
    </main>
  );
}
