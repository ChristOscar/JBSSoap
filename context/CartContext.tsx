"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { CartItem, SoapShape } from "@/types";

// Cart key = productId + optional shape (e.g. "seed-1:Rectangle")
function cartKey(productId: string, shape?: SoapShape) {
  return shape ? `${productId}:${shape}` : productId;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QTY"; payload: { key: string; qty: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextValue extends CartState {
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
  getKey: (productId: string, shape?: SoapShape) => string;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const key = cartKey(action.payload.productId, action.payload.shape);
      const existing = state.items.find(
        (i) => cartKey(i.productId, i.shape) === key
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            cartKey(i.productId, i.shape) === key
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => cartKey(i.productId, i.shape) !== action.payload
        ),
      };

    case "UPDATE_QTY":
      if (action.payload.qty <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => cartKey(i.productId, i.shape) !== action.payload.key
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          cartKey(i.productId, i.shape) === action.payload.key
            ? { ...i, qty: action.payload.qty }
            : i
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("jbs-cart");
      if (stored) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(stored) });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("jbs-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const addItem = (item: Omit<CartItem, "qty">) =>
    dispatch({ type: "ADD_ITEM", payload: { ...item, qty: 1 } });

  const removeItem = (key: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: key });

  const updateQty = (key: string, qty: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { key, qty } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        totalItems,
        subtotal,
        getKey: cartKey,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
