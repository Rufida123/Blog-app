import { createContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState([]);
  const categories = ["Technology", "Travel", "Food", "Lifestyle", "Business"];
  const LOCAL_STORAGE_KEY = "posts";

  const getLocalPosts = () => {
    const localPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localPosts ? JSON.parse(localPosts) : [];
  };

  const savePostsToLocal = (postsToSave) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(postsToSave));
  };

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/posts"),
          axios.get("https://jsonplaceholder.typicode.com/users"),
        ]);

        setUsers(usersRes.data);

        const localPosts = getLocalPosts();

        const apiPosts = postsRes.data.map((post) => ({
          ...post,
          category: categories[Math.floor(Math.random() * categories.length)],
          creatorEmail: "api@gmail.com",
          isLocalPost: false,
        }));

        // Create a map of local post IDs for quick lookup
        const localPostIds = new Set(localPosts.map((post) => post.id));

        // Merge posts - keep original local posts and add non-duplicate API posts
        const mergedPosts = [
          ...localPosts,
          ...apiPosts.filter((apiPost) => !localPostIds.has(apiPost.id)),
        ];

        savePostsToLocal(mergedPosts);
        return mergedPosts;
      } catch (error) {
        console.error("Failed to fetch data:", error);
        return getLocalPosts();
      }
    },
  });

  // Mutation for adding a new post
  const addPostMutation = useMutation({
    mutationFn: async ({ newPost, creatorEmail }) => {
      const newId = Date.now() + Math.floor(Math.random() * 1000);
      const postToAdd = {
        id: newId,
        userId: users.length > 0 ? users[0].id : 11,
        creatorEmail,
        ...newPost,
        isLocalPost: true,
      };
      return postToAdd;
    },
    onSuccess: (postToAdd) => {
      queryClient.setQueryData(["posts"], (oldPosts) => {
        const updatedPosts = [postToAdd, ...oldPosts];
        savePostsToLocal(updatedPosts);
        return updatedPosts;
      });
    },
  });

  // Mutation for updating a post
  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, updatedData, currentUserEmail }) => {
      return { postId, updatedData, currentUserEmail };
    },
    onSuccess: ({ postId, updatedData }) => {
      queryClient.setQueryData(["posts"], (oldPosts) => {
        const postIndex = oldPosts.findIndex((post) => post.id === postId);

        if (postIndex === -1) return oldPosts;

        const updatedPosts = [...oldPosts];
        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],
          ...updatedData,
        };

        savePostsToLocal(updatedPosts);
        return updatedPosts;
      });
    },
  });

  // Wrapper functions for mutations
  const addNewPost = (newPost, creatorEmail) => {
    addPostMutation.mutate({ newPost, creatorEmail });
  };

  const updatePost = (postId, updatedData, currentUserEmail) => {
    updatePostMutation.mutate({ postId, updatedData, currentUserEmail });
  };

  const getPostsByUser = (email) => {
    return posts.filter((post) => post.creatorEmail === email);
  };

  const deletePostMutation = useMutation({
    mutationFn: async (postId) => {
      return postId;
    },
    onSuccess: (postId) => {
      queryClient.setQueryData(["posts"], (oldPosts) => {
        const updatedPosts = oldPosts.filter((post) => post.id !== postId);
        savePostsToLocal(updatedPosts);
        return updatedPosts;
      });
    },
  });

  const deletePost = (postId) => {
    deletePostMutation.mutate(postId);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        users,
        loading: isLoading,
        categories,
        addNewPost,
        updatePost,
        getPostsByUser,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
