<template>
  <div>
    <b-jumbotron header="Error 404" lead="Route not found">
      <b-button variant="primary" :to="{ path: '/' }">Go Home</b-button>
    </b-jumbotron>
  </div>
</template>
<style scoped>
.jumbotron {
  background-color: #212121 !important;
}

.jumbotron h1.display-3,
.jumbotron p.lead {
  color: #ffffff !important;
}
</style>