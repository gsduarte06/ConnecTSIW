<template>
  <card type="user" v-if="user">
    <p class="card-text"></p>
    <div class="author" @click="openFileInput">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileChange"
      />
      <img class="avatar" :src="avatarSrc" alt="..." />
      <h5 class="title" v-if="user.first_name">
        {{ user.first_name }} {{ user.last_name }}
      </h5>
      <h5 class="title" v-else>Your Name</h5>
      <p class="description" v-if="position">
        {{ this.position }}
      </p>
    </div>
    <p></p>
    <p class="card-description">
      {{ user.about }}
    </p>
  </card>
</template>

<script>
import { usePositionStore } from "../store/positions";
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
      avatarSrc: "img/anime6.png", // Avatar source, set default image
      positionStore: usePositionStore(),
      userStore: useUserStore(),
      position: "",
    };
  },
  async mounted() {
    await this.userStore.fetchBackground(this.userStore.getToken);
    let bg = this.userStore.getBg;
    if (bg.length == 0) {
      this.position = "Unemployed";
      return;
    }
    console.log(bg);
    let id_position = bg.find((bg) => bg.end_date == null).id_position;
    await this.positionStore.fetchPositions(this.userStore.getToken);
    let positions = this.positionStore.getPositions;
    this.position = positions.find((pos) => pos.id_position == id_position).position_desc;
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
    },
  },
};
</script>

<style></style>
