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
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      nif: "",
      about: "",
      userStore: useUserStore(),
    };
  },

  methods: {
    viewProfessionalHistory() {
      this.$router.push("/professional-history");
    },

    async updateInfo() {
      const data = {};
      if (this.validator(this.firstName, this.user.first_name)) {
        data.first_name = this.firstName;
      }
      if (this.validator(this.lastName, this.user.last_name)) {
        data.last_name = this.lastName;
      }
      if (this.validator(this.nif, this.user.nif)) {
        data.nif = this.nif;
      }
      if (this.validator(this.about, this.user.about)) {
        data.about = this.about;
      }
      if (this.validator(this.username, this.user.username)) {
        data.username = this.username;
      }
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
