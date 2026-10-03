"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

  const calculateExtraCost = useCallback((value: number): number => {
    const absValue = Math.abs(value);
    if (absValue <= 4.0) return 0;
    
    const unitsOver = Math.ceil(absValue - 4.0);
    return unitsOver * 12;
  }, []);

  const calculateTotalPrice = useCallback((): number => {
    const basePrice = 50;
    const leftExtraCost = leftEye.type ? calculateExtraCost(leftEye.value) : 0;
    const rightExtraCost = rightEye.type ? calculateExtraCost(rightEye.value) : 0;
    return basePrice + leftExtraCost + rightExtraCost;
  }, [leftEye, rightEye, calculateExtraCost]);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-gallery-white">
      <Navbar />

      <motion.div 
        className="pt-24 pb-20 lg:pt-32 lg:pb-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="flex flex-col gap-3 mb-8 text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center">
              <Badge variant="secondary">Configurador</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
              Tu graduación perfecta
            </h1>
            <p className="text-body max-w-2xl mx-auto text-slate">
              Selecciona el tipo de corrección y la graduación para cada ojo.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Product Preview */}
            <motion.div 
              className="order-2 lg:order-1"
              variants={itemVariants}
            >
              <div className="sticky top-24">
                <div className="bg-studio-mist rounded-3xl p-6 lg:p-8 w-full aspect-[16/9] flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
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
                <motion.div 
                  className="mt-6 bg-gallery-white border border-hairline-silver rounded-3xl p-6"
                  variants={cardVariants}
                >
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
                  {(leftEye.type || rightEye.type) && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-body-small">
                        <span className="text-slate">Lentes base (par)</span>
                        <span className="text-ink">$50.00</span>
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
                </motion.div>
              </div>
            </motion.div>

            {/* Configuration Form */}
            <motion.div 
              className="order-1 lg:order-2"
              variants={itemVariants}
            >
              <div className="space-y-6">
                {/* Left Eye */}
                <motion.div 
                  className="bg-gallery-white border border-hairline-silver rounded-3xl p-5 lg:p-6"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ink mb-1">
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

                  <div className="space-y-6">
                    {/* Type Selection - Pills */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setLeftEye({ type: "miopia", value: -1.0 })}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-full text-center transition-all font-medium text-sm ${
                          leftEye.type === "miopia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Miopía
                      </button>
                      <button
                        onClick={() => setLeftEye({ type: "hipermetropia", value: 1.0 })}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-full text-center transition-all font-medium text-sm ${
                          leftEye.type === "hipermetropia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Hipermetropía
                      </button>
                      <button
                        onClick={() => setLeftEye({ type: "presbicia", value: 1.0 })}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-full text-center transition-all font-medium text-sm ${
                          leftEye.type === "presbicia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Presbicia
                      </button>
                    </div>

                    {/* Value Selection */}
                    {leftEye.type && (
                      <div>
                        <label className="block text-body-small font-medium text-ink mb-4">
                          Graduación: {leftEye.value > 0 ? "+" : ""}{leftEye.value.toFixed(2)}
                        </label>
                        
                        {/* Slider */}
                        <div className="mb-6">
                          <input
                            type="range"
                            min={leftEye.type === "miopia" ? -6.0 : leftEye.type === "hipermetropia" ? 1.0 : 1.0}
                            max={leftEye.type === "miopia" ? -1.0 : leftEye.type === "hipermetropia" ? 6.0 : 6.0}
                            step="0.25"
                            value={leftEye.value}
                            onChange={(e) =>
                              setLeftEye({ ...leftEye, value: parseFloat(e.target.value) })
                            }
                            className="slider w-full h-2 bg-studio-mist rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-compact-control text-slate mt-2">
                            <span>{leftEye.type === "miopia" ? "-6.0" : "+1.0"}</span>
                            <span>{leftEye.type === "miopia" ? "-1.0" : "+6.0"}</span>
                          </div>
                        </div>

                        {/* Quick Options */}
                        <div className="grid grid-cols-4 gap-2">
                          {getOptionsForType(leftEye.type).slice(0, 8).map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                setLeftEye({ ...leftEye, value: option })
                              }
                              className={`px-3 py-3 rounded-2xl text-compact-control font-medium transition-all ${
                                Math.abs(leftEye.value - option) < 0.01
                                  ? "bg-pricing-blue text-gallery-white shadow-lg"
                                  : "bg-studio-mist text-ink hover:bg-control-gray"
                              }`}
                            >
                              {option > 0 ? "+" : ""}
                              {option.toFixed(2)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Right Eye */}
                <motion.div 
                  className="bg-gallery-white border border-hairline-silver rounded-3xl p-5 lg:p-6"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-ink mb-1">
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

                  <div className="space-y-6">
                    {/* Type Selection - Pills */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setRightEye({ type: "miopia", value: -1.0 })}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-full text-center transition-all font-medium text-sm ${
                          rightEye.type === "miopia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Miopía
                      </button>
                      <button
                        onClick={() => setRightEye({ type: "hipermetropia", value: 1.0 })}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-full text-center transition-all font-medium text-sm ${
                          rightEye.type === "hipermetropia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Hipermetropía
                      </button>
                      <button
                        onClick={() => setRightEye({ type: "presbicia", value: 1.0 })}
                        className={`flex-1 min-w-[120px] px-4 py-3 rounded-full text-center transition-all font-medium text-sm ${
                          rightEye.type === "presbicia"
                            ? "bg-ink text-gallery-white shadow-lg"
                            : "bg-studio-mist text-ink hover:bg-control-gray"
                        }`}
                      >
                        Presbicia
                      </button>
                    </div>

                    {/* Value Selection */}
                    {rightEye.type && (
                      <div>
                        <label className="block text-body-small font-medium text-ink mb-4">
                          Graduación: {rightEye.value > 0 ? "+" : ""}{rightEye.value.toFixed(2)}
                        </label>
                        
                        {/* Slider */}
                        <div className="mb-6">
                          <input
                            type="range"
                            min={rightEye.type === "miopia" ? -6.0 : rightEye.type === "hipermetropia" ? 1.0 : 1.0}
                            max={rightEye.type === "miopia" ? -1.0 : rightEye.type === "hipermetropia" ? 6.0 : 6.0}
                            step="0.25"
                            value={rightEye.value}
                            onChange={(e) =>
                              setRightEye({ ...rightEye, value: parseFloat(e.target.value) })
                            }
                            className="slider w-full h-2 bg-studio-mist rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-compact-control text-slate mt-2">
                            <span>{rightEye.type === "miopia" ? "-6.0" : "+1.0"}</span>
                            <span>{rightEye.type === "miopia" ? "-1.0" : "+6.0"}</span>
                          </div>
                        </div>

                        {/* Quick Options */}
                        <div className="grid grid-cols-4 gap-2">
                          {getOptionsForType(rightEye.type).slice(0, 8).map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                setRightEye({ ...rightEye, value: option })
                              }
                              className={`px-3 py-3 rounded-2xl text-compact-control font-medium transition-all ${
                                Math.abs(rightEye.value - option) < 0.01
                                  ? "bg-pricing-blue text-gallery-white shadow-lg"
                                  : "bg-studio-mist text-ink hover:bg-control-gray"
                              }`}
                            >
                              {option > 0 ? "+" : ""}
                              {option.toFixed(2)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  variants={itemVariants}
                >
                  <motion.button
                    className={`flex-1 text-center py-5 rounded-full font-semibold transition-all text-lg ${
                      leftEye.type && rightEye.type
                        ? "bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white shadow-lg hover:shadow-xl cursor-pointer"
                        : "bg-studio-mist text-slate cursor-not-allowed"
                    }`}
                    disabled={!leftEye.type || !rightEye.type}
                    whileHover={leftEye.type && rightEye.type ? { scale: 1.02 } : {}}
                    whileTap={leftEye.type && rightEye.type ? { scale: 0.98 } : {}}
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
                  </motion.button>
                  <button
                    onClick={() => {
                      setLeftEye({ type: null, value: 0 });
                      setRightEye({ type: null, value: 0 });
                    }}
                    className="sm:w-auto px-8 py-5 bg-gallery-white border-2 border-hairline-silver hover:border-steel text-ink text-center rounded-full font-medium transition-colors"
                  >
                    Reiniciar
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

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