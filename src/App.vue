<script>
import { RouterLink, RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: { AppHeader, AppFooter },
};
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;600;700&family=Crimson+Pro:wght@700&display=swap");
a {
  text-decoration: underline;
  word-wrap: normal;
  height: min-content;
}
img {
  margin: auto;
}
.dark {
  background: #1b1b1f;
  color: #e4e1e6;
}

.dark input {
  background-color: transparent;
}
</style>
