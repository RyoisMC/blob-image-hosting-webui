<template lang="pug">
#blob-image-hosting-webui-app
  globalNav
  router-view
</template>

<script>
const globalNav = () => import(/* webpackChunkName: "globalNav" */ './components/global/navbar.vue');

export default {
  name: "blob-image-hosting-webui-app",
  components: {
    globalNav,
  },
  data: function () {
    return {
      API_BASE_URL: "https://image-host-api.ryois.net/api/v2",
      API_KEY: null,
      STORAGE_USAGE: null,
      STORAGE_LIMIT: null,
      USER_DOMAINS: null,
      USER_DEFAULT_DOMAIN: null,
      USER_INFO: null,
      JWT_TOKEN: this.$parent.token,
      REFRESH_INTERVAL: 5 * 1000,
      USER_AUTHORIZED: true,
    };
  },
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #121212 !important;
}
</style>
