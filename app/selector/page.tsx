"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type VisionType = "miopia" | "astigmatismo" | "ambas";

export default function SelectorPage() {
  const [visionType, setVisionType] = useState<VisionType>("miopia");
  const [leftEye, setLeftEye] = useState(-1.0);
  const [rightEye, setRightEye] = useState(-1.0);
  const [leftCylinder, setLeftCylinder] = useState(0);
  const [rightCylinder, setRightCylinder] = useState(0);

  const miopiaValues = [
    -0.25, -0.5, -0.75, -1.0, -1.25, -1.5, -1.75, -2.0, -2.25, -2.5, -2.75,
    -3.0, -3.25, -3.5, -3.75, -4.0, -4.5, -5.0, -5.5, -6.0,
  ];

  const astigmatismoValues = [
    -0.25, -0.5, -0.75, -1.0, -1.25, -1.5, -1.75, -2.0, -2.25, -2.5,
  ];

  return (
    <div className="min-h-screen bg-gallery-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gallery-white/80 backdrop-blur-xl border-b border-hairline-silver">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            <Link
              href="/"
              className="flex items-center gap-2 text-global-nav text-ink hover:text-slate transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Volver
            </Link>
            <p className="text-global-nav font-semibold text-ink">
              Selector de Producto
            </p>
            <div className="w-16" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Product Preview */}
            <div className="flex items-center justify-center sticky top-24 h-[600px]">
              <div className="relative w-full h-full bg-studio-mist rounded-3xl overflow-hidden border border-hairline-silver flex items-center justify-center">
                <div className="relative w-3/4 h-3/4">
                  <Image
                    src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80"
                    alt="WeLens Product"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* Info overlay */}
                <div className="absolute bottom-8 left-8 right-8 bg-gallery-white/90 backdrop-blur-sm rounded-2xl p-6 border border-hairline-silver">
                  <p className="text-body-small font-semibold text-ink mb-2">
                    Tu Selección
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-compact-control text-slate">
                    <div>
                      <p className="mb-1">Ojo Izquierdo:</p>
                      <p className="text-ink font-semibold">
                        {leftEye.toFixed(2)}
                        {visionType !== "miopia" && ` | Cil: ${leftCylinder.toFixed(2)}`}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1">Ojo Derecho:</p>
                      <p className="text-ink font-semibold">
                        {rightEye.toFixed(2)}
                        {visionType !== "miopia" && ` | Cil: ${rightCylinder.toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Selectors */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-semibold text-ink mb-4 tracking-tight">
                  Configura tus WeLens
                </h1>
                <p className="text-feature-copy text-slate">
                  Personaliza tu graduación para obtener la visión perfecta.
                </p>
              </div>

              {/* Vision Type Selector */}
              <div className="space-y-4">
                <label className="text-body-small font-semibold text-ink">
                  Tipo de Corrección
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["miopia", "astigmatismo", "ambas"] as VisionType[]).map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setVisionType(type)}
                        className={`py-3 px-4 rounded-full text-compact-control font-medium transition-all border ${
                          visionType === type
                            ? "bg-ink text-white border-ink"
                            : "bg-gallery-white text-ink border-steel hover:border-ink"
                        }`}
                      >
                        {type === "miopia"
                          ? "Miopía"
                          : type === "astigmatismo"
                          ? "Astigmatismo"
                          : "Ambas"}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Left Eye */}
              <div className="space-y-4">
                <label className="text-body-small font-semibold text-ink">
                  Ojo Izquierdo - Esfera (Dioptrías)
                </label>
                <input
                  type="range"
                  min="0"
                  max={miopiaValues.length - 1}
                  step="1"
                  value={miopiaValues.indexOf(leftEye)}
                  onChange={(e) =>
                    setLeftEye(miopiaValues[parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-studio-mist rounded-full appearance-none cursor-pointer accent-ink"
                />
                <div className="flex justify-between text-compact-control text-slate">
                  <span>{miopiaValues[0]}</span>
                  <span className="text-ink font-semibold text-lg">
                    {leftEye.toFixed(2)}
                  </span>
                  <span>{miopiaValues[miopiaValues.length - 1]}</span>
                </div>
              </div>

              {/* Left Eye Cylinder (if astigmatism) */}
              {visionType !== "miopia" && (
                <div className="space-y-4">
                  <label className="text-body-small font-semibold text-ink">
                    Ojo Izquierdo - Cilindro (Astigmatismo)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={astigmatismoValues.length - 1}
                    step="1"
                    value={astigmatismoValues.indexOf(leftCylinder)}
                    onChange={(e) =>
                      setLeftCylinder(
                        astigmatismoValues[parseInt(e.target.value)]
                      )
                    }
                    className="w-full h-2 bg-studio-mist rounded-full appearance-none cursor-pointer accent-ink"
                  />
                  <div className="flex justify-between text-compact-control text-slate">
                    <span>{astigmatismoValues[0]}</span>
                    <span className="text-ink font-semibold text-lg">
                      {leftCylinder.toFixed(2)}
                    </span>
                    <span>
                      {astigmatismoValues[astigmatismoValues.length - 1]}
                    </span>
                  </div>
                </div>
              )}

              {/* Right Eye */}
              <div className="space-y-4">
                <label className="text-body-small font-semibold text-ink">
                  Ojo Derecho - Esfera (Dioptrías)
                </label>
                <input
                  type="range"
                  min="0"
                  max={miopiaValues.length - 1}
                  step="1"
                  value={miopiaValues.indexOf(rightEye)}
                  onChange={(e) =>
                    setRightEye(miopiaValues[parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-studio-mist rounded-full appearance-none cursor-pointer accent-ink"
                />
                <div className="flex justify-between text-compact-control text-slate">
                  <span>{miopiaValues[0]}</span>
                  <span className="text-ink font-semibold text-lg">
                    {rightEye.toFixed(2)}
                  </span>
                  <span>{miopiaValues[miopiaValues.length - 1]}</span>
                </div>
              </div>

              {/* Right Eye Cylinder (if astigmatism) */}
              {visionType !== "miopia" && (
                <div className="space-y-4">
                  <label className="text-body-small font-semibold text-ink">
                    Ojo Derecho - Cilindro (Astigmatismo)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={astigmatismoValues.length - 1}
                    step="1"
                    value={astigmatismoValues.indexOf(rightCylinder)}
                    onChange={(e) =>
                      setRightCylinder(
                        astigmatismoValues[parseInt(e.target.value)]
                      )
                    }
                    className="w-full h-2 bg-studio-mist rounded-full appearance-none cursor-pointer accent-ink"
                  />
                  <div className="flex justify-between text-compact-control text-slate">
                    <span>{astigmatismoValues[0]}</span>
                    <span className="text-ink font-semibold text-lg">
                      {rightCylinder.toFixed(2)}
                    </span>
                    <span>
                      {astigmatismoValues[astigmatismoValues.length - 1]}
                    </span>
                  </div>
                </div>
              )}

              {/* Price and CTA */}
              <div className="pt-8 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-ink">$29.99</span>
                  <span className="text-feature-copy text-slate">por par</span>
                </div>
                <button className="w-full bg-pricing-blue text-white rounded-full py-4 text-body-small font-medium hover:bg-opacity-90 transition-all">
                  Añadir al Carrito
                </button>
                <p className="text-compact-control text-slate text-center">
                  Envío gratis en pedidos superiores a $50
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
