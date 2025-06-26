import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      userEmail: null,
      isLoggedIn: false,
      isAdmin: false,
      isBlocked: false,
      adminEmails: ["admin@gmail.com"],
      blockedEmails: [],
      registeredEmails: [],

      login: (email) => {
        const isBlocked = get().blockedEmails.includes(email);

        // Add to registered emails if not already there
        if (!get().registeredEmails.includes(email)) {
          set((state) => ({
            registeredEmails: [...state.registeredEmails, email],
          }));
        }

        return set({
          userEmail: email,
          isLoggedIn: true,
          isAdmin: get().adminEmails.includes(email),
          isBlocked: isBlocked,
        });
      },

      logout: () =>
        set({
          userEmail: null,
          isLoggedIn: false,
          isAdmin: false,
          isBlocked: false,
        }),

      // Admin management functions
      addAdmin: (email) => {
        if (!get().adminEmails.includes(email)) {
          set((state) => ({
            adminEmails: [...state.adminEmails, email],
            isAdmin: state.userEmail === email ? true : state.isAdmin,
          }));
          return true;
        }
        return false;
      },

      removeAdmin: (email) => {
        set((state) => ({
          adminEmails: state.adminEmails.filter((e) => e !== email),
          isAdmin: state.userEmail === email ? false : state.isAdmin,
        }));
      },

      blockUser: (email) => {
        if (!get().blockedEmails.includes(email)) {
          set((state) => ({
            blockedEmails: [...state.blockedEmails, email],
          }));
          return true;
        }
        return false;
      },

      unblockUser: (email) => {
        set((state) => ({
          blockedEmails: state.blockedEmails.filter((e) => e !== email),
        }));
      },

      // Get all registered users with their status
      getAllUsers: () => {
        const { adminEmails, blockedEmails, registeredEmails } = get();
        return registeredEmails.map((email) => ({
          email,
          isAdmin: adminEmails.includes(email),
          isBlocked: blockedEmails.includes(email),
          isCurrentUser: email === get().userEmail,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
