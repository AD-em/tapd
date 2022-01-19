<template>
  <v-app-bar app color="indigo lighten-1" dark>
    <div
      class="d-flex align-center text-h4"
      @click="$router.push({ name: 'home' })"
    >
      <span class="lime--text text--lighten-2">+</span>Apd
    </div>

    <router-link :to="{ name: 'task-list' }" class="ml-16 pl-16">
      <v-btn outlined class="ml-16 lime lighten-1 indigo--text">
        <span class="mr-2">Task List</span>
      </v-btn></router-link
    >
    <router-link :to="{ name: 'task-create' }">
      <v-btn text class="ml-3 lime--text text--lighten-1">
        <span class="mr-2">Create Task</span>
      </v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn outlined class="lime lighten-1 indigo--text" @click="signin()">
      <span class="mr-2">Sign in</span>
    </v-btn>

    <!-- Authentication<v-btn text class="lime--text text--lighten-1">
        <span class="mr-2">Sign up</span> -->
  </v-app-bar>
</template>
<script>
import TaskService from '@/services/TaskService.js';
export default {
  methods: {
    signin() {
      TaskService.signin()
        .then((res) => {
          if (res.data.data) this.$store.state.user = res.data.data.signin;
          // throw new Error(
          else console.debug(res.data.errors);
          // [0].message.message);
          console.dir(this.$store.state.user.email);
        })
        .catch((err) => console.error(err));
    }
  }
};
</script>
