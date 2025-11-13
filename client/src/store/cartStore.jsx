import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      itemsCount: 0,

      addToCart: (course) =>
        set((state) => ({
          cart: [...state.cart, course],
          itemsCount: state.cart.length + 1,
        })),

      removeFromCart: (courseId) =>
        set((state) => ({
          cart: state.cart.filter((e) => e.courseId != courseId),
          itemsCount: state.cart.length - 1,
        })),

      clearCart: () => set(() => ({ cart: [], itemsCount: 0 })),
    }),

    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: [...state.cart],
        itemsCount: state.itemsCount,
      }),
    }
  )
);
