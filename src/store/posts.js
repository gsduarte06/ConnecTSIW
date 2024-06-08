import { defineStore } from 'pinia';
import * as api from "../api/api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    comments: [],
    likes: {},
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
    async fetchCommentbyPost(PostId, token){
      try {
        const data = await api.get(`posts/${PostId}/comments`, token);
        this.comments = data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    async createComment(PostId, commentData, token) {
      try {
        await api.post(`posts/${PostId}/comments`, commentData, token);
        await this.fetchCommentbyPost(PostId); 
      } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
      }
    },
    async fetchLikebyComment(CommentID, token) {
      try {
        const data = await api.get(`comments/${CommentID}/likes`, token);
        return data.length;
      } catch (error) {
        console.error("Error fetching likes:", error);
        throw error;
      }
    }
  },
});