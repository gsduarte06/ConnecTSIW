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
      <div class="col-md-6 pr-md-1">
        <base-input label="Email" placeholder="Email" v-model="email"> </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Password"
          placeholder="Password"
          v-model="password"
          type="password"
        >
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
      <div class="form-group">
        <input
          type="file"
          class="form-control-file"
          id="image"
          ref="imageInput"
          accept="application/pdf"
          @change="onImageChange"
        />
        <button type="button" class="btn btn-secondary mt-2" @click="onImageChange">
          Add CV
        </button>
        <span v-if="fileName">{{ fileName }}</span>
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
        <base-button type="secundary" fill @click="clearForm">Cancel</base-button>
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
      password: "",
      about: "",
      email: "",
      cv: null,
      fileName: "",
    };
  },
  mounted() {
    this.clearForm();
  },
  methods: {
    clearForm() {
      this.firstName = this.userStore.getUser.first_name || "";
      this.lastName = this.userStore.getUser.last_name || "";
      this.nif = this.userStore.getUser.nif || "";
      this.username = this.userStore.getUser.username || "";
      this.about = this.userStore.getUser.about || "";
      this.filename = "";
      this.email = this.userStore.getUser.email || "";
      this.password = "";
    },
    viewProfessionalHistory() {
      this.$router.push("/professional-history");
    },
    onImageChange(event) {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader(); // Create a FileReader object
        reader.onload = () => {
          this.imagePresent = reader.result; // Set the avatar source to the selected image
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL

        this.cv = file;
        this.fileName = file.name;
      }
    },
    async updateInfo() {
      let addXp = 0;
      let formData = new FormData();
      if (this.validator(this.firstName, this.user.first_name)) {
        formData.append("first_name", this.firstName);
        addXp += 100;
      }
      if (this.validator(this.lastName, this.user.last_name)) {
        formData.append("last_name", this.lastName);
        addXp += 100;
      }
      if (this.validator(this.nif, this.user.nif)) {
        formData.append("nif", this.nif);
        addXp += 100;
      }
      if (this.validator(this.about, this.user.about)) {
        formData.append("about", this.about);
        addXp += 100;
      }
      if (this.validator(this.username, this.user.username)) {
        formData.append("username", this.username);
        addXp += 100;
      }
      if (this.validator(this.email, this.user.email)) {
        formData.append("email", this.email);
        addXp += 100;
      }

      if (this.cv != null) {
        formData.append("pdf", this.cv);
      }

      if (this.password != null) {
        formData.append("password", this.password);
      }

      let oldxp = await api.get(
        `users/${this.userStore.userId}/xp`,
        this.userStore.token
      );
      addXp += parseInt(oldxp[0].xp);
      formData.append("xp", addXp);
      await this.userStore.updateUserForm(formData);
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
