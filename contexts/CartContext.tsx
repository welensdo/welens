"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LensCartItem {
  id: string;
  type: 'lens';
  leftEye: {
    type: 'miopia' | 'hipermetropia' | 'presbicia' | null;
    value: number;
  };
  rightEye: {
    type: 'miopia' | 'hipermetropia' | 'presbicia' | null;
    value: number;
  };
  price: number;
  quantity: number;
}

export interface AccessoryCartItem {
  id: string;
  type: 'accessory';
  name: string;
  price: number;
  quantity: number;
}

export type CartItemType = LensCartItem | AccessoryCartItem;

interface CartContextType {
  cart: LensCartItem | null; // Mantener compatibilidad con código existente
  items: CartItemType[];
  addToCart: (item: LensCartItem) => void;
  addAccessory: (accessory: Omit<AccessoryCartItem, 'id' | 'type'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<LensCartItem | null>(null);
  const [items, setItems] = useState<CartItemType[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('welens-cart');
    const savedItems = localStorage.getItem('welens-cart-items');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
    
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Error loading items:', e);
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

  // Save items to localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('welens-cart-items', JSON.stringify(items));
    } else {
      localStorage.removeItem('welens-cart-items');
    }
  }, [items]);

  const addToCart = (item: LensCartItem) => {
    setCart(item); // Legacy compatibility
    // Don't add to items array to prevent duplication
    // setItems([...items, item]); 
  };

  const addAccessory = (accessory: Omit<AccessoryCartItem, 'id' | 'type'>) => {
    const existingItem = items.find(
      (item) => item.type === 'accessory' && item.name === accessory.name
    );

    if (existingItem && existingItem.type === 'accessory') {
      setItems(
        items.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: AccessoryCartItem = {
        id: `acc-${Date.now()}-${Math.random()}`,
        type: 'accessory',
        ...accessory,
      };
      setItems([...items, newItem]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart(null);
    setItems([]);
  };

  const cartCount = (cart ? 1 : 0) + items.filter(item => item.type === 'accessory').reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = 
    (cart?.price || 0) + 
    items.filter(item => item.type === 'accessory').reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      items,
      addToCart, 
      addAccessory,
      removeItem,
      clearCart, 
      cartCount,
      totalPrice 
    }}>
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
