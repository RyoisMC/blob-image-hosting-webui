<template>
  <div>
    <b-jumbotron :header="LANG_WELCOME">
      <b-button variant="primary" @click="API_sharex_file">Setup ShareX</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  components: {},
  data: function () {
    return {
      LANG_WELCOME: `Hello, ${this.$auth.user.nickname}`,
    };
  },
  methods: {
    async getAuthToken() {
      this.$parent.JWT_TOKEN = await this.$auth.getTokenSilently();
    },
    API_sharex_file: async function () {
      const vm = this;
      const { data } = await axios.get(
        `${vm.$parent.API_BASE_URL}/sharex`,
        {
          headers: {
            Authorization: `Bearer ${vm.$parent.JWT_TOKEN}`,
          },
        }
      );
      let blob = new Blob([data.file], { type: 'application/octet-stream' }),
      url = window.URL.createObjectURL(blob);
      let tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = url;
      tempLink.setAttribute('download', data.fileName);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(url);
    },
  },
  created() {
    this.getAuthToken();
  },
};
</script>
<style scoped>
.jumbotron {
    background-color: #212121 !important;
}

.jumbotron h1.display-3, .jumbotron p.lead {
    color: #ffffff !important;
}
</style>