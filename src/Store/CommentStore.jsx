import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useCommentStore = create(
  persist(
    (set, get) => ({
      comments: [],
      loading: false,

      fetchComments: async (postId) => {
        set({ loading: true });
        try {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
          );
          const apiComments = res.data.map((apiComment) => ({
            ...apiComment,
            isLocal: false,
          }));

          set((state) => {
            const existingIds = new Set(state.comments.map((c) => c.id));
            const newComments = apiComments.filter(
              (c) => !existingIds.has(c.id)
            );
            return { comments: [...state.comments, ...newComments] };
          });
        } catch (err) {
          console.error("Failed to fetch comments:", err);
        } finally {
          set({ loading: false });
        }
      },

      addComment: (newComment, userEmail) => {
        const commentToAdd = {
          ...newComment,
          id: `local-${Date.now()}`,
          email: userEmail,
          isLocal: true,
        };
        set((state) => ({
          comments: [...state.comments, commentToAdd],
        }));
      },

      getUserComments: (userEmail) => {
        return get().comments.filter(
          (comment) => comment.isLocal && comment.email === userEmail
        );
      },

      editComment: (id, updatedBody, userEmail) => {
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === id && c.email === userEmail
              ? { ...c, body: updatedBody }
              : c
          ),
        }));
      },

      deleteComment: (id, userEmail) => {
        set((state) => ({
          comments: state.comments.filter(
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
