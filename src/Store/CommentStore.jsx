import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommentStore = create(
  persist(
    (set, get) => ({
      localComments: [],

      addComment: (newComment, userEmail) => {
        const commentToAdd = {
          ...newComment,
          id: `local-${Date.now()}`,
          email: userEmail,
          isLocal: true,
        };
        set((state) => ({
          localComments: [...state.localComments, commentToAdd],
        }));
      },

      getUserComments: (userEmail) => {
        return get().localComments.filter(
          (comment) => comment.email === userEmail
        );
      },

      editComment: (id, updatedBody, userEmail) => {
        set((state) => ({
          localComments: state.localComments.map((c) =>
            c.id === id && c.email === userEmail
              ? { ...c, body: updatedBody }
              : c
          ),
        }));
      },

      deleteComment: (id, userEmail) => {
        set((state) => ({
          localComments: state.localComments.filter(
            (c) => !(c.id === id && c.email === userEmail)
          ),
        }));
      },
    }),
    {
      name: "comment-storage",
    }
  )
);
