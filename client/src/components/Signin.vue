<template>
  <v-form class="ml-n16">
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field v-model="password" label="Password" required></v-text-field>
    <v-btn class="mr-4 indigo lighten-1 white--text" @click="signin">
      Sign in
    </v-btn>
  </v-form>
</template>

<script>
import TaskService from "@/services/TaskService.js";
export default {
  data: () => ({
    email: undefined,
    password: undefined,
  }),
  methods: {
    signin() {
      TaskService.signin(this.email, this.password)
        .then((res) => {
          if (res.data.data) {
            this.$store.state.user = res.data.data.signin;
            sessionStorage.setItem("user", this.$store.state.user);
            this.$router.push({ name: "task-list" });
          } else console.debug(res.data.errors);
          console.dir(this.$store.state.user.email);
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style></style>
