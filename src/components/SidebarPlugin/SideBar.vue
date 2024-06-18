<template>
  <div class="sidebar" :data="backgroundColor">
    <!--
            Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black | darkblue"
            Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
        -->
    <!-- -->
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a
          href="http://www.creative-tim.com"
          aria-label="sidebar mini logo"
          class="simple-text logo-mini"
        >
          <div class="logo-img">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
        </a>
        <a href="" class="simple-text logo-normal">
          {{title}}
        </a>
      </div>
      <slot> </slot>
      <ul class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot name="links">
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="index"
            :to="link.path"
            :name="link.name"
            :icon="link.icon"
          >
          </sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink";

export default {
  props: {
    title: {
      type: String,
      default: "ConnecTsiw",
    },
    backgroundColor: {
      type: String,
      default: "vue",
    },
    activeColor: {
      type: String,
      default: "success",
      validator: (value) => {
        let acceptedValues = [
          "primary",
          "info",
          "success",
          "warning",
          "danger",
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink,
    };
  },
  components: {
    SidebarLink,
  },
  computed: {
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    },
    shortTitle() {
      return this.title
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
    },
  },
  data() {
    return {
      linkHeight: 65,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: [],
    };
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    addLink(link) {
      const index = this.$slots.links.indexOf(link.$vnode);
      this.links.splice(index, 0, link);
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
    },
  },
  mounted() {
    this.$watch("$route", this.findActiveLink, {
      immediate: true,
    });
  },
};
</script>
