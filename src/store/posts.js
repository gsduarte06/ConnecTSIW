import { defineStore } from 'pinia';
import * as api from "../api/api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [],
    comments: [],
    likes: {},
    present_users:[,]
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
        const types = await api.get(`type_posts`);
        console.log(types);
        for(let post of data){
          const likes = await api.get(`posts/${post.id_post}/likes`)
          post.likes = likes.length||0;
          const presence = await api.get(`posts/${post.id_post}/present_users`)
          post.present_users = presence
          const type_name = types.find((type)=>type.id_type_post === post.id_type_post).type_post_desc
          post.type_name= type_name

        }
        this.posts = data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },
    async fetchCommentbyPost(PostId, token){
      try {
        const data = await api.get(`posts/${PostId}/comments`, token);
        for(let post of data){
          const likes = await api.get(`comments/${post.id_comment}/likes`, token);
          post.likes = likes.length||0;
        }
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

    async createPost(data,token) {
      try {
        const redata = await api.postForm(`posts`, data ,token);
        await this.fetchPosts();
      } catch (error) {
        console.error("Error in store fetching user:", error);
        throw error;
      }
    },
  },

});