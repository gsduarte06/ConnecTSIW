import { defineStore } from 'pinia';
import * as api from "../api/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: null,
    token:null,
    users: [],
  }),
  getters: {},
  actions: {
    async fetchUser() {
      try {
        const data = await api.get('users');
        this.user = Object.keys(data.message);
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
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data));
      } catch (error) {
        console.error("Error in store registering:", error);
        throw error;
      }
    },
  },
});