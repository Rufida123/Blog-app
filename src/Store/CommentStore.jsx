import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useNotificationStore } from "./notificationStore";

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
          replies: [],
          parentId: null,
          likes: [],
          dislikes: [],
        };
        set((state) => ({
          localComments: [...state.localComments, commentToAdd],
        }));
      },

      addReply: (parentId, newReply, userEmail) => {
        const replyToAdd = {
          ...newReply,
          id: `local-${Date.now()}`,
          email: userEmail,
          isLocal: true,
          replies: [],
          parentId,
          likes: [],
          dislikes: [],
        };

        const addReplyToComment = (comments) => {
          return comments.map((comment) => {
            // Found the parent comment
            if (comment.id === parentId) {
              // Get notification store and add notification
              const notificationStore = useNotificationStore.getState();
              if (comment.email !== userEmail) {
                notificationStore.addNotification({
                  id: `notif-${Date.now()}`,
                  type: "reply",
                  commentId: parentId,
                  replyId: replyToAdd.id,
                  fromUser: userEmail,
                  toUser: comment.email,
                  message: `${newReply.name} replied to your comment`,
                  read: false,
                  timestamp: new Date().toISOString(),
                });
              }

              return {
                ...comment,
                replies: [...(comment.replies || []), replyToAdd],
              };
            }

            // Check replies recursively
            if (comment.replies?.length > 0) {
              return {
                ...comment,
                replies: addReplyToComment(comment.replies),
              };
            }

            return comment;
          });
        };

        set((state) => ({
          localComments: addReplyToComment(state.localComments),
        }));
      },

      getUserComments: (userEmail) => {
        const { localComments } = get();

        // Filter comments and replies by user email
        const getUserCommentsRecursive = (comments) => {
          return comments.reduce((acc, comment) => {
            if (comment.email === userEmail) {
              acc.push(comment);
            }
            if (comment.replies?.length > 0) {
              acc.push(...getUserCommentsRecursive(comment.replies));
            }
            return acc;
          }, []);
        };

        return getUserCommentsRecursive(localComments);
      },
      deleteComment: (commentId) => {
        const deleteCommentRecursive = (comments) => {
          return comments.reduce((acc, comment) => {
            // If this is not the comment to delete
            if (comment.id !== commentId) {
              const newComment = {
                ...comment,
                replies: comment.replies
                  ? deleteCommentRecursive(comment.replies)
                  : [],
              };
              acc.push(newComment);
            }
            return acc;
          }, []);
        };

        set((state) => ({
          localComments: deleteCommentRecursive(state.localComments),
        }));
      },
      editComment: (commentId, newBody, userEmail) => {
        const editCommentRecursive = (comments) => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              // Return updated comment
              return {
                ...comment,
                body: newBody,
                editedAt: new Date().toISOString(), // Add edit timestamp
              };
            }

            // edite of the replies
            if (comment.replies?.length > 0) {
              return {
                ...comment,
                replies: editCommentRecursive(comment.replies),
              };
            }
            return comment;
          });
        };

        set((state) => ({
          localComments: editCommentRecursive(state.localComments),
        }));
      },
      likeComment: (commentId, userEmail) => {
        const updateLikes = (comments) => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              const likes = comment.likes || [];
              const dislikes = comment.dislikes || [];

              // Get notification store
              const notificationStore = useNotificationStore.getState();

              // If user already liked, remove like
              if (likes.includes(userEmail)) {
                return {
                  ...comment,
                  likes: likes.filter((email) => email !== userEmail),
                };
              }
              // If user disliked, remove dislike and add like
              else if (dislikes.includes(userEmail)) {
                // Notify owner if it's not themselves
                if (comment.email !== userEmail) {
                  notificationStore.addNotification({
                    id: `notif-${Date.now()}`,
                    type: "like",
                    commentId,
                    fromUser: userEmail,
                    toUser: comment.email,
                    message: `${userEmail.split("@")[0]} liked your comment`,
                    read: false,
                    timestamp: new Date().toISOString(),
                  });
                }

                return {
                  ...comment,
                  dislikes: dislikes.filter((email) => email !== userEmail),
                  likes: [...likes, userEmail],
                };
              }
              // Else add like
              else {
                // Notify owner if it's not themselves
                if (comment.email !== userEmail) {
                  notificationStore.addNotification({
                    id: `notif-${Date.now()}`,
                    type: "like",
                    commentId,
                    fromUser: userEmail,
                    toUser: comment.email,
                    message: `${userEmail.split("@")[0]} liked your comment`,
                    read: false,
                    timestamp: new Date().toISOString(),
                  });
                }

                return {
                  ...comment,
                  likes: [...likes, userEmail],
                };
              }
            }

            // Process replies recursively
            if (comment.replies?.length > 0) {
              return {
                ...comment,
                replies: updateLikes(comment.replies),
              };
            }

            return comment;
          });
        };

        set({ localComments: updateLikes(get().localComments) });
      },

      dislikeComment: (commentId, userEmail) => {
        const updateDislikes = (comments) => {
          return comments.map((comment) => {
            if (comment.id === commentId) {
              // Initialize likes/dislikes if they don't exist
              const likes = comment.likes || [];
              const dislikes = comment.dislikes || [];

              // Get notification store
              const notificationStore = useNotificationStore.getState();

              // If user already disliked, remove dislike
              if (dislikes.includes(userEmail)) {
                return {
                  ...comment,
                  dislikes: dislikes.filter((email) => email !== userEmail),
                };
              }
              // If user liked, remove like and add dislike
              else if (likes.includes(userEmail)) {
                // Notify owner if it's not themselves
                if (comment.email !== userEmail) {
                  notificationStore.addNotification({
                    id: `notif-${Date.now()}`,
                    type: "dislike",
                    commentId,
                    fromUser: userEmail,
                    toUser: comment.email,
                    message: `${userEmail.split("@")[0]} disliked your comment`,
                    read: false,
                    timestamp: new Date().toISOString(),
                  });
                }

                return {
                  ...comment,
                  likes: likes.filter((email) => email !== userEmail),
                  dislikes: [...dislikes, userEmail],
                };
              }
              // Else add dislike
              else {
                // Notify owner if it's not themselves
                if (comment.email !== userEmail) {
                  notificationStore.addNotification({
                    id: `notif-${Date.now()}`,
                    type: "dislike",
                    commentId,
                    fromUser: userEmail,
                    toUser: comment.email,
                    message: `${userEmail.split("@")[0]} disliked your comment`,
                    read: false,
                    timestamp: new Date().toISOString(),
                  });
                }

                return {
                  ...comment,
                  dislikes: [...dislikes, userEmail],
                };
              }
            }

            // Process replies recursively
            if (comment.replies?.length > 0) {
              return {
                ...comment,
                replies: updateDislikes(comment.replies),
              };
            }

            return comment;
          });
        };

        set({ localComments: updateDislikes(get().localComments) });
      },
    }),
    {
      name: "comment-storage",
    }
  )
);
