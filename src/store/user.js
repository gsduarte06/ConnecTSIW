import { defineStore } from 'pinia';
import * as api from "../api/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: JSON.parse(sessionStorage.getItem("userID"))|| null,
    token:JSON.parse(sessionStorage.getItem("token")) || null,
    user:JSON.parse(sessionStorage.getItem("user"))|| [],
    background: [],
    users: {},
  }),
  async mounted () {
    console.log(userId);
    if(userId != null){
      await this.fetchUser()
    }
  },
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
        sessionStorage.setItem("user", JSON.stringify(data))
        console.log(this.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },

    async fetchAllUsers(){
      try {
        const data = await api.get(`users/`);
        this.users = data;
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
    async updateBackground(BgId,data,token) {
      try {
        const redata = await api.patch(`backgrounds/${BgId}`, data,token);
        console.log(redata);
        return redata
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

    async updateUserForm(data) {
      try {
        const redata = await api.patchForm(`users/${this.userId}/`, data , this.token);
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
        sessionStorage.setItem('userID', JSON.stringify(data.loggedUserId));
        sessionStorage.setItem('token', JSON.stringify(data.accessToken));
        await this.fetchUser()
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


    async deleteUser(id) {
      try {
        const data = await api.del(`users/${id}`,this.token);
        await this.fetchAllUsers()
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
  },
});