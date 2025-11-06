import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  // Just store the token
  token: "",
  creds: {
    username: "",
    password: "",
  },

  // Set token on login
  setToken: (token) => {
    set(() => ({ token }));
    localStorage.setItem("Authorization", `Bearer ${token}`);
  },

  setCreds: (details) => {
    set(() => ({ creds: details }));
    console.log();
  },

  // Clear token on logout
  logout: () => {
    set({ token: "" });
    localStorage.removeItem("token");
  },
}));
