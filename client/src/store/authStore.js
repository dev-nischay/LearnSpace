import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      creds: {
        username: "",
        password: "",
      },

      setToken: (token) => {
        // Update store
        set({ token });
        // Update Authorization header in localStorage for API calls
        localStorage.setItem("Authorization", `Bearer ${token}`);
      },

      setCreds: (details) => {
        set({ creds: details });
      },

      logout: () => {
        set({ token: "", creds: { username: "", password: "" } });
        // Clear Authorization from localStorage
        localStorage.removeItem("Authorization");
      },
    }),
    {
      name: "auth-storage", // name in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        creds: { username: state.creds.username },
      }),

      onRehydrateStorage: (state) => {
        if (state?.token) {
          localStorage.setItem("Authorization", `Bearer ${state.token}`);
        }
      },
    }
  )
);
