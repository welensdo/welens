"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ScrollVideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!video || !container || !isVideoReady) return;

      const containerRect = container.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the container
      const containerTop = scrollPosition + containerRect.top;
      const scrollStart = containerTop - windowHeight;
      const scrollEnd = containerTop + containerRect.height - windowHeight;
      const scrollRange = scrollEnd - scrollStart;
      const scrollProgress = (scrollPosition - scrollStart) / scrollRange;

      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Update video time based on scroll progress
      if (video.duration && isFinite(video.duration) && video.readyState >= 2) {
        const newTime = clampedProgress * video.duration;
        // Update video time - removed the threshold check to allow backwards scrolling
        try {
          video.currentTime = newTime;
        } catch (error) {
          console.error("Error updating video time:", error);
        }
      }

      // Check if video animation is complete (at 95% to allow smooth transition)
      if (clampedProgress >= 0.95) {
        setIsVideoComplete(true);
      } else {
        setIsVideoComplete(false);
      }

      ticking = false;
    };

    // Use requestAnimationFrame for smoother updates
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // Load video metadata and data
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      setIsVideoReady(true);
      handleScroll();
    };

    const handleLoadedData = () => {
      console.log("Video data loaded");
      setIsVideoReady(true);
      handleScroll();
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      setIsVideoReady(true);
      handleScroll();
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setIsVideoReady(false);
    };

    // Add all event listeners
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial call with a small delay to ensure layout is ready
    const timeoutId = setTimeout(handleScroll, 100);

    // Force load the video
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isVideoReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gallery-white"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Product Label */}
        <div className="absolute top-32 sm:top-40 text-center z-10 px-4">
          <div className="mb-2 sm:mb-4 flex justify-center relative">
            <img src="/logo4.PNG" alt="WeLens" className="h-[250px] w-auto" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight sm:whitespace-nowrap -mt-16">
            Cualquier gafa, adaptada a ti.
          </h1>
          <p className="text-body-small sm:text-body text-slate mt-6 max-w-2xl mx-auto">
            Lentillas adhesivas de goma que transforman cualquier lente o gafa de sol
            <br className="hidden sm:block" />
            en tu graduación perfecta. Pre-orden desde $50
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full h-full flex items-center justify-center mt-8">
          <video
            ref={videoRef}
            className="w-full max-w-5xl h-auto object-contain"
            playsInline
            muted
            preload="auto"
            crossOrigin="anonymous"
          >
            <source src="/lensvideo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Floating Pricing Callout */}
        <div
          className={`absolute bottom-12 sm:bottom-20 bg-gallery-white rounded-full px-6 py-3 sm:px-8 sm:py-4 shadow-subtle transition-opacity duration-500 ${
            isVideoComplete ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div>
              <p className="text-body-small font-semibold text-ink">
                Desde $50
              </p>
              <p className="text-compact-control text-slate">
                Con entrega sin costo. Disponible en 1-2 semanas.
              </p>
            </div>
            <button className="bg-pricing-blue hover:bg-pricing-blue/90 text-gallery-white text-compact-control font-normal px-5 py-2 rounded-full transition-colors">
              <Link href="/configurador">Comprar</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
