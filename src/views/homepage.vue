<template>
<div>
  <h1>Authenticated</h1>
    <button @click="callApi">Call</button>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "home",
  components: {},
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
    async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();

      // Use Axios to make a call to the API
      const { data } = await axios.get("https://api.blob.rocks/api/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
        },
      });

      this.apiMessage = data;
    },
  },
};
</script>