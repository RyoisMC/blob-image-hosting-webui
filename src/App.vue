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
    globalNav 
  },
    data: function () {
    return {
      API_BASE_URL: "https://api.blob.rocks/api/v2/",
      API_KEY: null,
      STORAGE_USAGE: null,
      STORAGE_LIMIT: null,
      SHAREX_JSON: null,
      USER_DOMAINS: null,
      USER_INFO: null,
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
}
#blob-image-hosting-webui-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
