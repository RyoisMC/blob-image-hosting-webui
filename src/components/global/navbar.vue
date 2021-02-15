<template>
  <div>
    <b-navbar
      v-if="$auth.isAuthenticated"
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand :to="{ path: '/' }"
        ><b-img-lazy
          src="/assets/blobcamera.png"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt="Blob Holding Camera"
        ></b-img-lazy>
        Blob Image Hosting</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ path: '/' }" :active="$route.name == 'Home'"
            >Home</b-nav-item
          >
          <b-nav-item
            :to="{ path: '/files' }"
            :active="$route.name == 'My Files'"
            >My Files</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item active>{{ LANG_STORAGE_USAGE }}</b-nav-item>
          <b-nav-item @click="logout">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "navbar",
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
  data: function () {
    return {
      LANG_STORAGE_USAGE: `Calculating...`,
    };
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
    API_me: async function () {
      const vm = this;
      const { data } = await axios.get(`${vm.$parent.API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${vm.$parent.JWT_TOKEN}`,
        },
      });
      vm.$parent.USER_INFO = data.me;
      vm.$parent.STORAGE_USAGE = data.me.current_storage_usage;
      vm.$parent.STORAGE_LIMIT = data.me.storage_limit;
      vm.$parent.API_KEY = data.me.api_key;
      if (vm.$parent.STORAGE_LIMIT == "unlimited") {
        this.LANG_STORAGE_USAGE = `You are using ${vm.$parent.$options.filters.prettyBytes(
          vm.$parent.STORAGE_USAGE
        )} out of unlimited storage.`;
      } else {
        this.LANG_STORAGE_USAGE = `You are using ${vm.$parent.$options.filters.prettyBytes(
          vm.$parent.STORAGE_USAGE
        )} out of ${vm.$parent.$options.filters.prettyBytes(
          vm.$parent.STORAGE_LIMIT
        )}.`;
      }
    },
    API_domains: async function () {
      const vm = this;
      const { data } = await axios.get(`${vm.$parent.API_BASE_URL}/domains`, {
        headers: {
          Authorization: `Bearer ${vm.$parent.JWT_TOKEN}`,
        },
      });
      vm.$parent.USER_DOMAINS = data.domains;
      vm.$parent.USER_DEFAULT_DOMAIN = data.default_domain;
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      window.setInterval(() => {
        this.API_me();
        this.API_domains();
      }, this.$parent.REFRESH_INTERVAL);
    });
  },
};
</script>
<style scoped>
.navbar.navbar-dark.bg-dark {
  background-color: #000000 !important;
}
</style>