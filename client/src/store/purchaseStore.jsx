import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePurchaseStore = create(
  persist(
    (set) => ({
      courses: [],
      purchasedCourses: [],
      setCourses: (courses) => set(() => ({ courses: courses })),
      purchaseCourses: (courseDetails) =>
        set((state) => ({
          purchasedCourses: [...state.purchasedCourses, ...courseDetails],
        })),
    }),
    {
      name: "purchases",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        purchasedCourses: [...state.purchasedCourses],
      }),
    }
  )
);
