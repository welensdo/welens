/**
 * Utilidades para optimizar la carga y reproducción del video scroll
 */

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
}

/**
 * Obtiene metadata completa del video
 */
export async function getVideoMetadata(videoUrl: string): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;

    video.onloadedmetadata = () => {
      const metadata: VideoMetadata = {
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        fps: 30, // Asumimos 30fps, ajustar según tu video
        totalFrames: Math.ceil(video.duration * 30),
      };
      resolve(metadata);
    };

    video.onerror = () => {
      reject(new Error("Error cargando metadata del video"));
    };
  });
}

/**
 * Precarga el video completo antes de la animación
 */
export async function preloadVideo(videoUrl: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;

    video.oncanplaythrough = () => {
      resolve(video);
    };

    video.onerror = () => {
      reject(new Error("Error precargando el video"));
    };

    // Forzar la carga
    video.load();
  });
}

/**
 * Calcula el frame actual basado en el progreso del scroll
 */
export function calculateCurrentFrame(
  scrollProgress: number,
  totalFrames: number
): number {
  return Math.min(Math.floor(scrollProgress * totalFrames), totalFrames - 1);
}

/**
 * Convierte progreso de scroll a tiempo de video
 */
export function scrollToVideoTime(
  scrollProgress: number,
  videoDuration: number
): number {
  return Math.max(0, Math.min(scrollProgress * videoDuration, videoDuration));
}

/**
 * Suaviza la transición entre frames usando interpolación
 */
export function smoothVideoSeek(
  video: HTMLVideoElement,
  targetTime: number,
  smoothFactor: number = 0.1
): void {
  const currentTime = video.currentTime;
  const diff = targetTime - currentTime;
  
  // Si la diferencia es pequeña, usar interpolación suave
  if (Math.abs(diff) < 0.1) {
    video.currentTime = currentTime + diff * smoothFactor;
  } else {
    // Si la diferencia es grande, saltar directamente
    video.currentTime = targetTime;
  }
}

/**
 * Optimiza el video para reproducción scroll
 */
export function optimizeVideoForScroll(video: HTMLVideoElement): void {
  // Desactivar audio
  video.muted = true;
  video.volume = 0;
  
  // Configurar para reproducción inline en iOS
  video.playsInline = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  
  // Prevenir controles nativos
  video.controls = false;
  
  // Optimizar buffering
  video.preload = "auto";
}

/**
 * Hook personalizado para detectar capacidades del dispositivo
 */
export function getDeviceCapabilities() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  // Detectar si el dispositivo soporta requestVideoFrameCallback
  const supportsVideoFrameCallback = "requestVideoFrameCallback" in HTMLVideoElement.prototype;
  
  // Detectar soporte de hardware acceleration
  const supportsHardwareAcceleration = (() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  })();

  return {
    isMobile,
    isIOS,
    isSafari,
    supportsVideoFrameCallback,
    supportsHardwareAcceleration,
  };
}

/**
 * Calcula el tamaño óptimo del video según el viewport
 */
export function getOptimalVideoSize(
  videoWidth: number,
  videoHeight: number,
  maxWidth: number = window.innerWidth,
  maxHeight: number = window.innerHeight * 0.8
): { width: number; height: number } {
  const aspectRatio = videoWidth / videoHeight;
  
  let width = maxWidth;
  let height = width / aspectRatio;
  
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }
  
  return {
    width: Math.floor(width),
    height: Math.floor(height),
  };
}
