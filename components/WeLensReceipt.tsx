import * as React from "react";
import { cn } from "@/lib/utils";

// --- SVG Icons ---
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="36"
    height="24"
  >
    <path fill="#003087" d="M8.5 2h7c3.5 0 6 2.5 6 6 0 4.5-3.5 8-8 8h-2l-1 5H7l3-15z"/>
    <path fill="#009cde" d="M6.5 7h7c3.5 0 6 2.5 6 6 0 4.5-3.5 8-8 8h-2l-1 5H5l3-15z"/>
  </svg>
);

// --- Helper Components ---
const DashedLine = () => (
  <div
    className="w-full my-2 border-t-2 border-dashed border-black/70"
    aria-hidden="true"
  />
);

const Barcode = ({ value }: { value: string }) => {
  const hashCode = (s: string) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const seed = hashCode(value);
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const bars = Array.from({ length: 50 }).map((_, index) => {
    const rand = random(seed + index);
    const width = rand > 0.7 ? 2 : 1;
    return { width };
  });

  const spacing = 1;
  const totalWidth = bars.reduce((acc, bar) => acc + bar.width + spacing, 0) - spacing;
  const svgWidth = 200;
  const svgHeight = 50;
  let currentX = (svgWidth - totalWidth) / 2;

  return (
    <div className="flex flex-col items-center py-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        aria-label={`Barcode for order ${value}`}
        className="fill-current text-black"
      >
        {bars.map((bar, index) => {
          const x = currentX;
          currentX += bar.width + spacing;
          return (
            <rect
              key={index}
              x={x}
              y="8"
              width={bar.width}
              height="34"
            />
          );
        })}
      </svg>
      <p className="text-xs text-black/60 tracking-[0.2em] mt-1 font-mono">{value}</p>
    </div>
  );
};

// --- Main WeLens Receipt Component ---
export interface WeLensReceiptProps {
  orderNumber: string;
  customerName: string;
  totalPrice: number;
  items: Array<{
    itemType: 'lens' | 'accessory';
    eye?: string;
    type?: string;
    value?: number;
    name?: string;
    quantity?: number;
    price: number;
  }>;
  date: Date;
  paymentMethod: string;
  last4Digits?: string;
}

const WeLensReceipt = React.forwardRef<HTMLDivElement, WeLensReceiptProps>(
  ({
    orderNumber,
    customerName,
    totalPrice,
    items,
    date,
    paymentMethod,
    last4Digits,
  }, ref) => {
    
    const formattedAmount = `$${totalPrice.toFixed(2)} USD`;
    const formattedDate = new Intl.DateTimeFormat("es-MX", {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);

    const getItemDisplay = (item: any) => {
      if (item.itemType === 'lens') {
        const eyeLabel = item.eye === 'left' ? 'Izquierdo' : 'Derecho';
        const valueStr = item.value && item.value > 0 ? `+${item.value.toFixed(2)}` : item.value?.toFixed(2) || '0.00';
        return {
          name: `Lente ${eyeLabel}`,
          detail: `${item.type} • ${valueStr}`,
          price: item.price
        };
      } else {
        return {
          name: item.name || 'Accesorio',
          detail: `Cantidad: ${item.quantity || 1}`,
          price: item.price
        };
      }
    };

    return (
      <div
        ref={ref}
        className="receipt-printer-pixel flex h-full flex-col px-8 pb-6 pt-6 text-[0.83rem] leading-tight bg-[#fffefb] text-black"
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-center mb-0">
          <img 
            src="/logo2.PNG" 
            alt="WeLens" 
            className="h-24 w-auto object-contain"
          />
        </div>

        <div className="flex items-baseline justify-center gap-4 mb-3 -mt-4">
          <span className="text-[0.6rem] uppercase tracking-[0.15em] text-black font-bold text-center">RECIBO DE COMPRA</span>
        </div>

        <p className="text-[0.8rem] text-black/65 mb-5 text-center">welens.org • Orden #{orderNumber}</p>

        {/* Customer Info */}
        <div className="mb-4">
          <p className="text-[0.65rem] text-black/60 uppercase tracking-wide">CLIENTE</p>
          <p className="font-semibold text-[0.85rem]">{customerName}</p>
          <p className="text-[0.7rem] text-black/65">{formattedDate}</p>
        </div>

        <DashedLine />

        {/* Items */}
        <div className="my-3">
          <p className="text-[0.65rem] text-black/60 uppercase tracking-wide mb-2">PRODUCTOS</p>
          {items.map((item, index) => {
            const display = getItemDisplay(item);
            return (
              <div key={index} className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="font-medium text-[0.8rem]">{display.name}</p>
                  <p className="text-[0.68rem] text-black/65">{display.detail}</p>
                </div>
                <p className="font-semibold text-[0.8rem] ml-4">${display.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>

        <DashedLine />

        {/* Total */}
        <div className="flex items-baseline justify-between gap-5 text-[1.1rem] font-semibold mt-3 mb-3">
          <span>Total</span>
          <span>{formattedAmount}</span>
        </div>

        {/* Payment Method - muy pequeño */}
        <div className="bg-black/5 p-1.5 rounded-md flex items-center justify-center space-x-2 mb-4">
          <PayPalIcon />
          <div>
            <p className="font-semibold text-[0.6rem]">{paymentMethod}</p>
            {last4Digits && (
              <p className="text-black/60 font-mono text-[0.55rem] tracking-wider">•••• {last4Digits}</p>
            )}
          </div>
        </div>

        <p className="text-center text-[0.9rem] text-black/65 mb-0">
          ¡Gracias por tu compra!
        </p>

        {/* Barcode */}
        <div className="mt-0">
          <Barcode value={orderNumber} />
        </div>

        <p className="text-center text-[0.6rem] text-black/50 mt-3 mb-2">
          Conserva este recibo para seguimiento y garantía
        </p>
      </div>
    );
  }
);

WeLensReceipt.displayName = "WeLensReceipt";

export { WeLensReceipt };