<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="NIF" placeholder="NIF" v-model="nif"> </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="First Name" placeholder="First Name" v-model="firstName">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Last Name" placeholder="Last Name" v-model="lastName">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Username" placeholder="Username" v-model="username">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label for="about">Sobre</label>
          <div>
            <textarea
              rows="4"
              class="form-control"
              id="about"
              placeholder="Update description here"
              v-model="about"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <div class="form-group">
          <label>Experiência</label>
          <div>
            <span>{{ user.xp }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-6 pl-md-1">
        <div class="form-group">
          <label>Data de criação</label>
          <div>
            <span>{{ user.create_date.split("T")[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <router-link class="btn btn-primary" to="/historicoprofissional"
          >Historico Profissional</router-link
        >
      </div>
      <div class="col-md-6 pl-md-1 d-flex justify-content-end align-items-center">
        <base-button type="primary" fill @click="updateInfo">Save</base-button>
      </div>
    </div>
  </card>
</template>

<script>
import { RouterLink } from "vue-router";
import { useUserStore } from "../store/user";
import * as api from "../api/api";
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      userStore: useUserStore(),
      firstName: "",
      lastName: "",
      username: "",
      nif: "",
      about: "",
    };
  },
  mounted() {
    this.firstName = this.userStore.getUser.first_name || "";
    this.lastName = this.userStore.getUser.last_name || "";
    this.nif = this.userStore.getUser.nif || "";
    this.username = this.userStore.getUser.username || "";
    this.about = this.userStore.getUser.about || "";
  },
  methods: {
    viewProfessionalHistory() {
      this.$router.push("/professional-history");
    },

    async updateInfo() {
      let addXp = 0;
      const data = {};
      if (this.validator(this.firstName, this.user.first_name)) {
        data.first_name = this.firstName;
        addXp += 100;
      }
      if (this.validator(this.lastName, this.user.last_name)) {
        data.last_name = this.lastName;
        addXp += 100;
      }
      if (this.validator(this.nif, this.user.nif)) {
        data.nif = this.nif;
        addXp += 100;
      }
      if (this.validator(this.about, this.user.about)) {
        data.about = this.about;
        addXp += 100;
      }
      if (this.validator(this.username, this.user.username)) {
        data.username = this.username;
        addXp += 100;
      }

      let oldxp = await api.get(
        `users/${this.userStore.userId}/xp`,
        this.userStore.token
      );
      console.log(oldxp[0].xp);
      addXp += parseInt(oldxp[0].xp);
      data.xp = addXp;
      console.log(data);
      await this.userStore.updateUser(data);
    },

    validator(input, compare) {
      if (input != "" && input != compare) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style></style>
