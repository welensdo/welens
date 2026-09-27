# Optimización del Video para Scroll

## Sobre el archivo lensvideo.mp4

El componente `ScrollVideoHero` está diseñado para usar el archivo `lensvideo.mp4` que ya existe en tu carpeta. Este video muestra las lentillas WeLens saliendo de su caja.

## Cómo funciona

1. **Carga del video**: El video se carga de forma invisible en el componente
2. **Canvas rendering**: Cada frame se dibuja en un canvas HTML5
3. **Sincronización con scroll**: La posición del scroll determina qué frame mostrar
4. **Altura del contenedor**: El componente tiene 300vh (3 veces la altura de la ventana)
5. **Transición suave**: Al terminar la animación, el scroll continúa normalmente

## Optimizaciones recomendadas

### 1. Comprimir el video (Opcional)

Si el video es muy pesado (>10MB), puedes comprimirlo:

```bash
# Con FFmpeg (instalar con: brew install ffmpeg)
ffmpeg -i lensvideo.mp4 -vcodec h264 -crf 28 -preset slow lensvideo_compressed.mp4
```

### 2. Convertir a WebM para mejor performance

```bash
# Crear versión WebM (mejor compresión)
ffmpeg -i lensvideo.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 lensvideo.webm
```

Luego actualiza el componente para usar ambos formatos:

```tsx
<video ref={videoRef} className="hidden" muted playsInline preload="auto">
  <source src="/lensvideo.webm" type="video/webm" />
  <source src="/lensvideo.mp4" type="video/mp4" />
</video>
```

### 3. Ajustar la duración del scroll

Si quieres que la animación sea más rápida o más lenta, modifica la altura en `scroll-video-hero.tsx`:

```tsx
// Más rápido (2x la altura de la ventana)
style={{ height: "200vh" }}

// Más lento (4x la altura de la ventana)  
style={{ height: "400vh" }}

// Actual
style={{ height: "300vh" }}
```

## Alternativa: Secuencia de imágenes

Si prefieres usar imágenes estáticas en lugar de video:

1. **Extrae frames del video**:
```bash
ffmpeg -i lensvideo.mp4 -vf "fps=30" public/frames/frame-%04d.jpg
```

2. **Actualiza el componente** para cargar la secuencia de imágenes

Ventajas:
- Mayor control sobre cada frame
- Mejor performance en algunos dispositivos
- No necesita decodificación de video

Desventajas:
- Múltiples archivos HTTP requests
- Mayor tamaño total si no se optimiza

## Performance Tips

1. **Preload**: El video usa `preload="auto"` para cargarlo inmediatamente
2. **Canvas size**: Se ajusta automáticamente al tamaño de la ventana
3. **RAF (RequestAnimationFrame)**: El componente usa scroll events que son pasivos
4. **Muted & PlayInline**: Evita problemas en móviles iOS

## Verificar que funciona

1. Abre http://localhost:3000
2. Deberías ver el hero con el texto de WeLens
3. Al hacer scroll hacia abajo, el video debería avanzar frame por frame
4. La animación debe ser suave y sincronizada con tu scroll

## Solución de problemas

### El video no se carga
- Verifica que `lensvideo.mp4` esté en `/public`
- Abre la consola del navegador para ver errores
- Verifica que el formato del video sea compatible (H.264)

### La animación está entrecortada
- El video puede ser muy grande, considera comprimirlo
- Algunos navegadores tienen límites de FPS en scroll
- Prueba reducir la resolución del video

### El video no avanza
- Verifica que el video tenga una duración válida
- Asegúrate de que `video.duration` sea > 0
- Revisa la consola para ver logs de estado

## Personalización

Puedes ajustar varios aspectos en `components/scroll-video-hero.tsx`:

```tsx
// Cambiar el punto de inicio del scroll
const scrollStart = 0; // Empezar inmediatamente

// Cambiar el punto final
const scrollEnd = containerHeight - windowHeight;

// Ajustar la velocidad
const scrollProgress = Math.max(0, Math.min(1, 
  (scrollStart - containerTop) / scrollEnd
));
```

## Estado actual

✅ El archivo `lensvideo.mp4` está presente en tu carpeta
✅ El componente `ScrollVideoHero` está configurado para usarlo
✅ El servidor de desarrollo está corriendo en http://localhost:3000
✅ La página está lista para mostrar la animación

Solo necesitas abrir el navegador y probar!
