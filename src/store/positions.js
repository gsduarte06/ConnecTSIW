import { defineStore } from 'pinia';
import * as api from "../api/api";

export const usePositionStore = defineStore("position", {
  state: () => ({
    positions: [],
  }),
  getters: {
    getPositions(){
      return this.positions
    }
  },
  actions: {
    async fetchPositions(token) {
      try {
        const data = await api.get(`positions`, token);
        this.positions = data.sort((a, b) => a.position_desc.localeCompare(b.position_desc));
        
      } catch (error) {
        console.error("Error in store fetching user:", error);
        throw error;
      }
    },

    

    async addPosition(data,token) {
      try {
        const redata = await api.post('positions', data ,token);
      } catch (error) {
        console.error("Error in store registering:", error);
        throw error;
      }
    },
  },
});