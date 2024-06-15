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
            <base-dropdown
              v-if="isLoggedIn"
              tag="li"
              title-tag="a"
              class="nav-item dropdown-left"
              menu-classes="dropdown-navbar"
            >
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

              <li class="nav-link" v-for="not in notifications" :key="not.id_post">
                <router-link
                  :to="`/post/${not.id_post}`"
                  class="nav-item dropdown-item"
                  v-if="not.post"
                  >{{ not.msg }}</router-link
                >
                <p class="nav-item dropdown-item" v-else>{{ not.msg }}</p>
              </li>
            </base-dropdown>
            <div v-if="isLoggedIn">
              <base-dropdown
                tag="li"
                title-tag="a"
                class="nav-item dropdown-left"
                menu-classes="dropdown-navbar"
              >
                <a
                  slot="title"
                  class="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                  aria-expanded="true"
                >
                  <div class="photo">
                    <img :src="profileImg" />
                  </div>
                  <b class="caret d-none d-lg-block d-xl-block"></b>
                  <p class="d-lg-none">Log out</p>
                </a>
                <li class="nav-link">
                  <router-link class="nav-item dropdown-item" to="/profile">
                    Profile
                  </router-link>
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
import { usePostsStore } from "../../store/posts";
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
      postStore: usePostsStore(),
      notifications: [],
      profileImg: "img/anime6.png",
    };
  },
  async mounted() {
    if (this.isLoggedIn) {
      await usePostsStore().fetchPosts();
      let userId = useUserStore().userId;
      const posts = usePostsStore().getAllPosts;
      console.log(posts);
      let newPosts = posts.filter(
        (post) =>
          post.date_post.toString().split("-")[1] === "0" + (new Date().getMonth() + 1) ||
          post.date_post.toString().split("-")[0] === new Date().getFullYear()
      );

      for (let post of newPosts) {
        this.notifications.push({
          msg: "You got a new Post, Click Here",
          post: true,
          id_post: post.id_post,
        });
      }

      const now = new Date();
      const twoDaysAfter = new Date(new Date(now).setDate(now.getDate() + 2));

      let newEvent = posts.filter(
        (post) =>
          post.id_type_post == 1 &&
          new Date(post.begin_date.toString()).getDate() <= twoDaysAfter.getDate() &&
          post.present_users.some((presence) => presence.id_user == userId)
      );
      console.log(newEvent);

      for (let post of newEvent) {
        this.notifications.push({
          msg: "The event you apllied is starting in 2 days",
          post: true,
          id_post: post.id_post,
        });
      }

      let endVacancy = posts.filter(
        (post) =>
          post.id_type_post == 2 &&
          new Date(post.end_date.toString()).getDate() <= twoDaysAfter.getDate()
      );
      console.log(endVacancy);

      for (let post of endVacancy) {
        this.notifications.push({
          msg: "The vacancy admin posted is ending in less then 2 days",
          post: true,
          id_post: post.id_post,
        });
      }

      this.profileImg = this.userStore.user.foto || "img/anime6.png";
    }
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
      sessionStorage.clear();
      if (this.$route.name != "dashboard") this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>

<style>
.nav-item.dropdown-left .dropdown-menu {
  right: 0;
  left: auto;
}
</style>
