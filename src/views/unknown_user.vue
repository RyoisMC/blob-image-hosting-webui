<template>
  <div>
    <b-jumbotron header="Error 403" lead="Unknown User">
      <b-button variant="primary" @click="logout">Logout</b-button>
    </b-jumbotron>
  </div>
</template>
<script>
export default {
    name: "unknown_user",
    methods: {
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin,
            });
        },
    },
};
</script>
<style scoped>
.jumbotron {
  background-color: #212121 !important;
}

.jumbotron h1.display-3,
.jumbotron p.lead {
  color: #ffffff !important;
}
</style>