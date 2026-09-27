# WeLens - Landing Page

Landing page profesional para WeLens, lentillas adhesivas de goma que transforman cualquier gafa en lentes graduadas.

## 🎨 Características

- **Diseño Apple-Style**: Paleta de colores, tipografía y componentes inspirados en el diseño de Apple
- **Animación Scroll Video**: Hero con video que avanza frame por frame según el scroll
- **Selector Interactivo**: Página dedicada para seleccionar graduación de miopía y astigmatismo
- **100% Responsive**: Optimizado para móvil, tablet y desktop
- **Performance Optimizado**: Next.js 15 con App Router
- **TypeScript**: Type-safe en toda la aplicación

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
/app
  /selector          # Página del selector de graduación
  layout.tsx         # Layout principal
  page.tsx           # Página de inicio
  globals.css        # Estilos globales

/components
  /ui               # Componentes UI reutilizables
    button.tsx
    badge.tsx
    carousel.tsx
  scroll-video-hero.tsx    # Hero con animación de video
  features-carousel.tsx    # Carrusel de características
  navigation.tsx           # Barra de navegación
  how-it-works.tsx        # Sección "Cómo funciona"
  benefits.tsx            # Sección de beneficios
  footer.tsx              # Footer

/lib
  utils.ts          # Utilidades (cn para clsx)

/public
  lensvideo.mp4     # Video del producto para animación scroll
```

## 🎨 Paleta de Colores

Siguiendo la guía de estilo Apple:

- **Gallery White** (#ffffff): Canvas principal
- **Studio Mist** (#f5f5f7): Fondos alternativos
- **Ink** (#1d1d1f): Texto principal
- **Slate** (#707070): Texto secundario
- **Apple Blue** (#0066cc): Links
- **Pricing Blue** (#0071e3): CTAs principales

## 📱 Páginas

### Página Principal (`/`)
- Hero con animación scroll de video
- Carrusel de características estilo Apple
- Sección "Cómo funciona" con 4 pasos
- Grid de beneficios
- Footer completo

### Selector de Producto (`/selector`)
- Vista previa del producto en tiempo real
- Controles interactivos para:
  - Tipo de corrección (miopía, astigmatismo, ambos)
  - Nivel de miopía (-0.25 a -6.00)
  - Nivel de astigmatismo (-0.25 a -2.00)
  - Eje del astigmatismo (0° a 180°)
- Información de precio y CTA

## 🎥 Video Scroll

El componente `ScrollVideoHero` usa un canvas para renderizar frames del video `lensvideo.mp4` según la posición del scroll. 

**Requisitos del video:**
- Formato: MP4
- Ubicación: `/public/lensvideo.mp4`
- El fondo blanco será visible, el componente lo renderiza directamente

**Funcionamiento:**
1. El video se carga de forma invisible
2. Cada frame se dibuja en un canvas según el scroll
3. La animación cubre 300vh de altura
4. Cuando termina, el scroll continúa normalmente

## 🛠 Tecnologías

- **Framework**: Next.js 15.3 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con custom properties
- **Componentes**: Componentes UI personalizados
- **Carrusel**: embla-carousel-react
- **Animaciones**: Framer Motion
- **Iconos**: SVG personalizados (sin librerías externas)

## 📦 Dependencias Principales

```json
{
  "react": "^18.3.1",
  "next": "^15.3.0",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "embla-carousel-react": "^8.5.1",
  "framer-motion": "^11.18.0",
  "class-variance-authority": "^0.7.0"
}
```

## 🎯 Próximos Pasos

1. **Agregar el video**: Coloca tu archivo `lensvideo.mp4` en la carpeta `/public`
2. **Personalizar contenido**: Edita los textos y descripciones en los componentes
3. **Integrar backend**: Conectar el selector con tu sistema de pedidos
4. **SEO**: Agregar meta tags y Open Graph
5. **Analytics**: Integrar Google Analytics o similar

## 📝 Notas de Diseño

- Todos los iconos son SVG inline personalizados (no se usa lucide-react ni emojis)
- La tipografía SF Pro está especificada pero usa fallbacks del sistema
- Los componentes siguen las guías de espaciado y radios de Apple
- Todos los componentes son cliente-side cuando necesario (`"use client"`)

## 🌐 Deploy

Recomendado: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

O conecta tu repositorio a Vercel para deploys automáticos.

## 📄 Licencia

Proyecto privado de WeLens © 2026
