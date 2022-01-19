<template>
  <v-app id="app">
    <NavBar />
    <v-main class="mt-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>

<style>
* {
  font-family: consolas, Helvetica, Arial, sans-serif;
}
a {
  text-decoration: none;
}
</style>
