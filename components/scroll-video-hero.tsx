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

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get the absolute position of the video container
      const containerRect = container.getBoundingClientRect();
      const containerTop = scrollPosition + containerRect.top;
      
      // START ANIMATION EARLIER so video reaches frame 0 sooner
      const animationStart = Math.max(0, containerTop - (windowHeight * 1.5));
      const animationEnd = containerTop + (windowHeight * 2);
      const animationRange = animationEnd - animationStart;
      
      // ALWAYS calculate progress based on current scroll position (not conditional)
      let scrollProgress = 0;
      if (animationRange > 0) {
        scrollProgress = (scrollPosition - animationStart) / animationRange;
      }

      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // ALWAYS update video time regardless of direction (up or down scroll)
      if (video.duration && isFinite(video.duration) && video.readyState >= 2) {
        const newTime = clampedProgress * video.duration;
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

    // Use requestAnimationFrame for smoother updates AND ensure scroll always works
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // MULTIPLE scroll event listeners to ensure it never loses reception
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true }); // For mobile
    document.addEventListener("scroll", onScroll, { passive: true }); // Backup
    window.addEventListener("resize", handleScroll, { passive: true });

    // Load video metadata and data
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      setIsVideoReady(true);
      // Set video to start at time 0 (case closed) and keep it there
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleLoadedData = () => {
      console.log("Video data loaded");
      setIsVideoReady(true);
      // Set video to start at time 0 (case closed) and keep it there
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
    };

    const handleCanPlay = () => {
      console.log("Video can play");
      setIsVideoReady(true);
      // Set video to start at time 0 (case closed) and keep it there
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = 0;
      }
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

    // Force load the video and set initial time
    video.load();
    video.addEventListener('loadstart', () => {
      console.log("Video load started");
      video.currentTime = 0;
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
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
        <div className="absolute top-20 sm:top-24 text-center z-10 px-4">
          <div className="mb-2 sm:mb-4 flex justify-center relative -mt-8">
            <img src="/logo4.PNG" alt="WeLens" className="h-[250px] w-auto" />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight sm:whitespace-nowrap -mt-20">
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
            <source src="/product-new.mp4" type="video/mp4" />
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
