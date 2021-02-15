<template lang="pug">
#blob-image-hosting-webui-app
  globalNav
  router-view
</template>

<script>
import globalNav from "./components/global/navbar.vue";

export default {
  name: 'blob-image-hosting-webui-app',
  components: {
    globalNav,
  },
  data: function () {
    return {
      API_BASE_URL: "https://api.blob.rocks/api/v2",
      API_KEY: null,
      STORAGE_USAGE: null,
      STORAGE_LIMIT: null,
      USER_DOMAINS: null,
      USER_DEFAULT_DOMAIN: null,
      USER_INFO: null,
      JWT_TOKEN: null,
      REFRESH_INTERVAL: 10 * 1000,
    }
  },
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background-color: #121212 !important;
}
</style>
