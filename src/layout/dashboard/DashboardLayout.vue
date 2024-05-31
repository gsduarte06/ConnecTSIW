<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/dashboard"
          :name="$t('sidebar.dashboard')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          v-if="isLoggedUser"
          to="/classification"
          name="Classification"
          icon="tim-icons icon-trophy"
        />
        <sidebar-link
          v-if="isLoggedUser"
          to="/profile"
          :name="$t('sidebar.userProfile')"
          icon="tim-icons icon-single-02"
        />
        <sidebar-link
          v-if="isLoggedUser"
          to="/admin"
          name="Admin"
          icon="tim-icons icon-single-02"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <div class="content">
        <fade-transition :duration="100" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import { useUserStore } from "../../store/user";
import { FadeTransition } from "vue2-transitions";
export default {
  data() {
    return {
      userStore: useUserStore(),
    };
  },
  components: {
    TopNavbar,
    FadeTransition,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    getStatus() {
      if (this.userStore.getToken != null) return true;
      return false;
    },
  },
  computed: {
    isLoggedUser() {
      return this.getStatus();
    },
  },
};
</script>
