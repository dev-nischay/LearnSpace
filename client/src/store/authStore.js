import { create } from "zustand";

export const useAuthStore = create((set) => ({
  username: "",
  login: (username) => {
    set(() => ({ username: username }));
    localStorage.setItem("username", username);
  },
}));
