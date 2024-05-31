<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{ toggled: $sidebar.showSidebar }">
          <button
            type="button"
            class="navbar-toggler"
            aria-label="Navbar toggle button"
            @click="toggleSidebar"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="title">ConnecTSIW</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav ml-auto">
            <base-dropdown v-if="isLoggedIn" tag="li" title-tag="a" class="nav-item">
              <a
                slot="title"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="true"
              >
                <div class="notification d-none d-lg-block d-xl-block"></div>
                <i class="tim-icons icon-bell-55"></i>
                <p class="d-lg-none">New Notifications</p>
              </a>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item"
                  >Mike John responded to your email</a
                >
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item">You have 5 more tasks</a>
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item"
                  >Your friend Michael is in town</a
                >
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item">Another notification</a>
              </li>
              <li class="nav-link">
                <a href="" class="nav-item dropdown-item">Another one</a>
              </li>
            </base-dropdown>
            <div v-if="isLoggedIn">
              <base-dropdown
                tag="li"
                title-tag="a"
                class="nav-item"
                menu-classes="dropdown-navbar"
              >
                <a
                  slot="title"
                  class="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                  aria-expanded="true"
                >
                  <div class="photo">
                    <img src="img/anime3.png" />
                  </div>
                  <b class="caret d-none d-lg-block d-xl-block"></b>
                  <p class="d-lg-none">Log out</p>
                </a>
                <li class="nav-link">
                  <router-link class="nav-item dropdown-item" to="/profile"
                    >Profile</router-link
                  >
                </li>
                <li class="nav-link">
                  <a href="#" class="nav-item dropdown-item" @click="logout">Log out</a>
                </li>
              </base-dropdown>
            </div>
            <div v-else>
              <router-link class="btn btn-primary" to="/login">Login</router-link>
            </div>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>

<script>
import { CollapseTransition } from "vue2-transitions";
import { RouterLink } from "vue-router";
import { useUserStore } from "../../store/user";
export default {
  components: {
    CollapseTransition,
    RouterLink,
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isLoggedIn() {
      return this.userStore.getToken != null;
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      userStore: useUserStore(),
    };
  },
  methods: {
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      localStorage.setItem("isLoggedIn", "false");
      if (this.$route.name != "dashboard") this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>

<style>
/* Estilos personalizados específicos para este componente */
</style>
