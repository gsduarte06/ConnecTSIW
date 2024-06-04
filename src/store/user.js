import { defineStore } from 'pinia';
import * as api from "../api/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: null || 4,
    token: null,
    user: [],
    background: [],
    users: {},
  }),
  getters: {
    getUser() {
      return this.user;
    },
    getToken() {
      return this.token;
    },
    getBg() {
      return this.background;
    },
    getUserById: (state) => (id) => {
      return state.users[id] || {};
    }
  },
  actions: {
    async fetchUserById(userId) {
      try {
        const data = await api.get(`users/${userId}`);
        this.users[userId] = data;
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
      }
    },
    async fetchUser() {
      try {
        const data = await api.get(`users/${this.userId}`);
        this.user = data;
        console.log(this.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
    async fetchBackground(token) {
      try {
        const data = await api.get(`users/${this.userId}/backgrounds`, token);
        this.background = data;
      } catch (error) {
        console.error("Error in store fetching user:", error);
        throw error;
      }
    },

    async addBackground(data,token) {
      try {
        const redata = await api.post(`users/${this.userId}/backgrounds`, data,token);
      } catch (error) {
        console.error("Error in store registering:", error);
        throw error;
      }
    },

    async updateUser(data) {
      try {
        const redata = await api.patch(`users/${this.userId}/`, data , this.token);
        console.log(redata);
        await this.fetchUser();
        console.log(this.user);
      } catch (error) {
        console.error("Error in store fetching user:", error);
        throw error;
      }
    },

    async login(userlog) {
      try {
        const data = await api.post('users/login', userlog);
        console.log(data);
        this.userId = data.loggedUserId;
        this.token = data.accessToken;
        localStorage.setItem('userid', JSON.stringify(data.loggedUserId));
      } catch (error) {
        console.error("Error in store logging in:", error);
        throw error;
      }
    },
    async register(newUser) {
      try {
        const data = await api.post('users', newUser);
      } catch (error) {
        console.error("Error in store registering:", error);
        throw error;
      }
    },
  },
});