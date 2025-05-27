import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export const useCommentStore = create(
  persist(
    (set, get) => ({
      comments: [],
      loading: false,

      fetchComments: async (postId) => {
        set({ loading: true });
        try {
          const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
          // Merge API comments with existing ones, avoiding duplicates
          set((state) => {
            const apiComments = res.data.filter(apiComment => 
              !state.comments.some(localComment => localComment.id === apiComment.id)
            );
            return { comments: [...state.comments, ...apiComments] };
          });
        } catch (err) {
          console.error('Failed to fetch comments:', err);
          // Don't clear comments on error - keep existing ones
        } finally {
          set({ loading: false });
        }
      },

      addComment: (newComment) => {
        const commentToAdd = {
          ...newComment,
          id:  Date.now(),// More unique ID
        };
        set((state) => ({
          comments: [...state.comments, commentToAdd],
        }));
      },
      editComment: (id, updatedBody) => {
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === id ? { ...c, body: updatedBody } : c
      )
    }));
  },

  deleteComment: (id) => {
    set((state) => ({
      comments: state.comments.filter(c => c.id !== id)
    }));
  },
    }),
    {
      name: 'comment-storage',
      // Persist the entire state (though in this case comments is all we care about)
    }
  )
);