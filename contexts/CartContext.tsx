"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  leftEye: {
    type: 'miopia' | 'hipermetropia' | 'presbicia' | null;
    value: number;
  };
  rightEye: {
    type: 'miopia' | 'hipermetropia' | 'presbicia' | null;
    value: number;
  };
  price: number;
}

interface CartContextType {
  cart: CartItem | null;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('welens-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem('welens-cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('welens-cart');
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(item);
  };

  const clearCart = () => {
    setCart(null);
  };

  const cartCount = cart ? 1 : 0;

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
