# WeLens - Landing Page

Landing page completa para WeLens, marca de lentillas adhesivas de goma que se adhieren a cualquier gafa.

## 🎨 Características de Diseño

- **Estilo Apple Premium**: Diseño minimalista inspirado en las páginas de producto de Apple
- **Paleta de Colores**: Gallery White (#ffffff), Ink (#1d1d1f), Pricing Blue (#0071e3)
- **Tipografía**: SF Pro Display y SF Pro Text
- **Animación Scroll-Video**: El video de producto se anima frame por frame según el scroll
- **100% Responsive**: Optimizado para todos los dispositivos

## 🚀 Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling con sistema de diseño Apple
- **Framer Motion** - Animaciones fluidas
- **Embla Carousel** - Carrusel de características

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

## 📂 Estructura del Proyecto

```
lens/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Estilos globales
│   └── configurator/
│       └── page.tsx            # Página del configurador
├── components/
│   ├── ui/                     # Componentes UI base
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   └── carousel.tsx
│   ├── scroll-video-hero.tsx   # Hero con animación de video
│   ├── product-selector.tsx    # Selector interactivo
│   ├── features-carousel.tsx   # Carrusel de características
│   ├── navigation.tsx          # Barra de navegación
│   ├── footer.tsx              # Footer
│   ├── how-it-works.tsx        # Sección Cómo funciona
│   ├── benefits.tsx            # Sección Beneficios
│   ├── pricing.tsx             # Sección Precios
│   ├── testimonials.tsx        # Testimonios
│   └── cta-section.tsx         # Call to action final
├── public/
│   └── lensvideo.mp4           # Video del producto
└── lib/
    └── utils.ts                # Utilidades
```

## 🎬 Componente Scroll-Video

El componente más innovador es el `ScrollVideoHero` que:

1. Carga el video `lensvideo.mp4` en un elemento oculto
2. Extrae frames del video y los dibuja en un canvas
3. Sincroniza el progreso del video con el scroll del usuario
4. Ocupa 300vh de altura para dar espacio suficiente al scroll
5. Cuando termina la animación, continúa con el resto de la página

### Cómo Funciona

```typescript
// El scroll controla el tiempo del video
const scrollProgress = -containerRect.top / (containerRect.height - window.innerHeight);
video.currentTime = scrollProgress * video.duration;
```

## 🎯 Configurador de Producto

La página `/configurator` incluye:

- Selector de tipo de corrección (Miopía, Astigmatismo, Ambos)
- Sliders interactivos para ajustar dioptrías
- Selector de eje para astigmatismo
- Mockup 3D del producto que cambia según la selección
- Precio flotante
- Botón de compra

## 🎨 Paleta de Colores Apple

```css
--color-gallery-white: #ffffff;  /* Canvas principal */
--color-studio-mist: #f5f5f7;    /* Secciones alternadas */
--color-ink: #1d1d1f;            /* Texto principal */
--color-slate: #707070;          /* Texto secundario */
--color-apple-blue: #0066cc;     /* Links */
--color-pricing-blue: #0071e3;   /* CTAs */
```

## 📱 Secciones de la Landing

1. **Scroll Video Hero**: Animación del producto con texto superpuesto
2. **Features Carousel**: Carrusel horizontal con tarjetas de características
3. **How It Works**: 4 pasos con imágenes y descripciones alternadas
4. **Benefits**: Grid de 6 beneficios con iconos personalizados
5. **Pricing**: 3 planes de precios con el plan popular destacado
6. **Testimonials**: Grid de testimonios con fotos y ratings
7. **CTA Section**: Llamado a la acción final con estadísticas

## 🎭 Iconos

Todos los iconos son **SVG personalizados** (NO lucide-react ni emojis) para mantener el diseño premium y minimalista.

## 🔗 Navegación

- `/` - Homepage con todas las secciones
- `/configurator` - Página dedicada al selector de producto
- Smooth scroll para navegación interna (#features, #how-it-works, #pricing)

## 🌐 Deployment

### Vercel (Recomendado)

```bash
# Conecta tu repositorio con Vercel
vercel

# O deploya directamente
vercel --prod
```

### Otros Hosts

```bash
npm run build
# Sube la carpeta .next/ y public/ a tu servidor
```

## 📝 Notas Importantes

1. **Video**: El archivo `lensvideo.mp4` debe estar en `/public/` para que funcione la animación scroll
2. **Fuentes**: SF Pro Display y SF Pro Text se cargan del sistema operativo (macOS) o fallback a Inter/Helvetica
3. **Imágenes**: Actualmente usando Unsplash placeholders - reemplazar con imágenes reales del producto
4. **Responsive**: Todo está optimizado para mobile-first design

## 🎯 Próximos Pasos

1. Reemplazar imágenes placeholder de Unsplash con fotos reales del producto
2. Conectar el configurador con un backend/API para procesar pedidos
3. Añadir animaciones adicionales con Framer Motion
4. Implementar sistema de pagos (Stripe, PayPal, etc.)
5. Añadir Google Analytics y tracking de conversiones
6. SEO optimization y meta tags
7. Implementar sistema de reviews real

## 🆘 Soporte

Para cualquier duda o problema:
- Revisa la documentación de Next.js: https://nextjs.org/docs
- Revisa la documentación de Tailwind: https://tailwindcss.com/docs

---

Desarrollado con ❤️ para WeLens
