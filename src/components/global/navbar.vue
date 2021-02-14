<template>
<div>
  <b-navbar v-if="$auth.isAuthenticated" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">Blob Image Hosting</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ path: '/'}">Home</b-nav-item>
        <b-nav-item :to="{ path: '/files'}">My Files</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            User
          </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

</template>
<script>
export default {
  name: "navbar",
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  },
  methods: {
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
<style scoped>
.navbar.navbar-dark.bg-dark{
    background-color: #000000!important;
}
</style>