<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :user="user" v-if="user"></edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="user" v-if="user"></user-card>
    </div>
  </div>
</template>

<script>
import EditProfileForm from "./EditProfileForm";
import UserCard from "./UserCard";
import { useUserStore } from "../store/user";

export default {
  components: {
    EditProfileForm,
    UserCard,
  },
  data() {
    return {
      userStore: useUserStore(),
    };
  },
  computed: {
    user() {
      return this.userStore.getUser;
    },
  },
};
</script>
