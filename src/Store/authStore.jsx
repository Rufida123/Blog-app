import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      userEmail: null,
      isLoggedIn: false,

      login: (email) => set({ userEmail: email, isLoggedIn: true }),
      logout: () => set({ userEmail: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
