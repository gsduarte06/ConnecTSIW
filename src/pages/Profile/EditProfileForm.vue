<template>

  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="NIF" placeholder="NIF">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="First Name" placeholder="First Name">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Last Name" placeholder="Last Name">
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Username" placeholder="Username">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label for="about">Sobre</label>
          <div @click="editAbout">
            <textarea rows="4" class="form-control" id="about" placeholder="Here can be your description" :readonly="!aboutEditable"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <div class="form-group">
          <label>Experiência</label>
          <div> <span>{{ model.xp }}</span></div>
        </div>
      </div>
      <div class="col-md-6 pl-md-1">
        <div class="form-group">
          <label>Data de criação</label>
          <div><span>{{ model.createdAt }}</span></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <router-link class="btn btn-primary" to="/historicoprofissional">Historico Profissional</router-link>
      </div>
      <div class="col-md-6 pl-md-1 d-flex justify-content-end align-items-center">
        <base-button type="primary" fill>Save</base-button>
      </div>
    </div>
  </card>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      aboutEditable: false,
    };
  },
  methods: {
    editAbout() {
      this.aboutEditable = !this.aboutEditable;
    },
    viewProfessionalHistory() {
      this.$router.push('/professional-history');
    }
  },
};
</script>

<style></style>
