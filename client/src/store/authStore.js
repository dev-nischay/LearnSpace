import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  // Just store the token
  token: "",

  // Set token on login
  setToken: (token) => {
    set({ token });
    localStorage.setItem("token", token);
  },

  // Get current token
  getToken: () => get().token,

  // Clear token on logout
  logout: () => {
    set({ token: "" });
    localStorage.removeItem("token");
  },
}));
