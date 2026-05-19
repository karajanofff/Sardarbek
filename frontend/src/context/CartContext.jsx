import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("bookmarket_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const sync = (next) => {
    setItems(next);
    localStorage.setItem("bookmarket_cart", JSON.stringify(next));
  };

  const addToCart = (book, quantity = 1) => {
    const exists = items.find((item) => item.id === book.id);
    const next = exists
      ? items.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item))
      : [...items, { ...book, quantity }];
    sync(next);
  };

  const removeFromCart = (id) => sync(items.filter((item) => item.id !== id));
  const updateQuantity = (id, quantity) =>
    sync(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  const clearCart = () => sync([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items, total, count, addToCart, removeFromCart, updateQuantity, clearCart }),
    [items, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
