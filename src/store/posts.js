import { defineStore } from 'pinia';
import * as api from "../api/api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getAllPosts() {
      return this.posts;
    },
  },
  actions: {
    async fetchPosts() {
      try {
        const data = await api.get('posts');
        this.posts = data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
  },
});