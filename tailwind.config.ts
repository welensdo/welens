import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // WeLens/Apple Style Colors
        "gallery-white": "#ffffff",
        "studio-mist": "#f5f5f7",
        "paper-frost": "#fafafc",
        "hairline-silver": "#d6d6d6",
        "control-gray": "#e6e6e8",
        ink: "#1d1d1f",
        slate: "#707070",
        steel: "#86868b",
        "apple-blue": "#0066cc",
        "accent-blue": "#0066cc", // Same as apple-blue for consistency
        "pricing-blue": "#0071e3",
        "launch-orange": "#b64400",
      },
      fontFamily: {
        "sf-pro-display": [
          "SF Pro Display",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        "sf-pro-text": [
          "SF Pro Text",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "hero-display": ["80px", { lineHeight: "1.05", letterSpacing: "-1.2px" }],
        "feature-heading": ["40px", { lineHeight: "1", letterSpacing: "0px" }],
        "product-kicker": ["21px", { lineHeight: "1", letterSpacing: "0.231px" }],
        "product-nav-title": ["19px", { lineHeight: "1.21", letterSpacing: "0.228px" }],
        "feature-copy": ["17px", { lineHeight: "1.24", letterSpacing: "-0.374px" }],
        body: ["17px", { lineHeight: "1.47", letterSpacing: "-0.374px" }],
        "body-small": ["14px", { lineHeight: "1.29", letterSpacing: "-0.224px" }],
        "compact-control": ["12px", { lineHeight: "1.33", letterSpacing: "-0.12px" }],
        "global-nav": ["12px", { lineHeight: "1", letterSpacing: "-0.12px" }],
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "28px",
      },
      scale: {
        "102": "1.02",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
