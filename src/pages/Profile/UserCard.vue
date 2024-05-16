<template>
  <card type="user">
    <p class="card-text"></p>
    <div class="author" @click="openFileInput">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
      <img class="avatar" :src="avatarSrc" alt="..." />
      <h5 class="title">{{ user.fullName }}</h5>
      <p class="description">
        {{ user.title }}
      </p>
    </div>
    <p></p>
    <p class="card-description">
      {{ user.description }}
    </p>
  </card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      avatarSrc: "img/anime6.png" // Avatar source, set default image
    };
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click(); // Trigger file input click
    },
    handleFileChange(event) {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader(); // Create a FileReader object
        reader.onload = () => {
          this.avatarSrc = reader.result; // Set the avatar source to the selected image
        };
        reader.readAsDataURL(file); // Read the selected file as a data URL
      }
    }
  }
};
</script>

<style></style>