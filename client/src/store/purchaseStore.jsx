import { create } from "zustand";

export const usePurchaseStore = create((set) => ({
  courses: [],
  purchasedCourses: [],

  setCourses: (courses) =>
    set(() => ({ courses: [...state.courses, courses] })),
  purchaseCourses: (courseDetails) =>
    set((state) => ({ purchaseCourses: [...state, courseDetails] })),
}));
