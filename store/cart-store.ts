import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// Store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === newItem.id
        );

        if (existingItem) {
          // If item already exists, increase quantity
          const updatedItems = currentItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          // If item is new, add to cart
          set({ items: [...currentItems, newItem] });
        }
      },

      // {quanty:5}

      removeItem: (id) => {
        const updatedItems = get()
          .items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0); // Remove item if quantity drops to 0

        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart", // name of the item in localStorage
    }
  )
);
