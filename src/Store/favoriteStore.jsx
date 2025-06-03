import { create } from "zustand";
import { persist } from "zustand/middleware";

const EMPTY_ARRAY = Object.freeze([]);

export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favoritesByUser: {},
      toggleFavorite: (email, postId) => {
        const currentFavorites = get().favoritesByUser; // Structure: { userEmail: [postId1, postId2, ...] }
        const prev = currentFavorites[email] ?? EMPTY_ARRAY;

        // Skip if no change would occur
        const alreadyFavorited = prev.includes(postId);
        if (alreadyFavorited && prev.length === 0) return;

        const updated = alreadyFavorited
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]; // Add if not favorited

        set({
          favoritesByUser: {
            ...currentFavorites,
            [email]: updated,
          },
        });
      },
    }),
    {
      name: "favorites-store",
    }
  )
);
