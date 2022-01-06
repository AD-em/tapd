<template>
  <v-app>
    <v-app-bar app color="indigo lighten-1" dark>
      <div class="d-flex align-center text-h4">
        <span class="amber--text text--lighten-2">+</span>Apd
      </div>

      <v-spacer></v-spacer>

      <v-btn outlined class="amber lighten-1 indigo--text">
        <span class="mr-2">Sign in</span> </v-btn
      ><v-btn text class="amber--text text--lighten-1">
        <span class="mr-2">Sign up</span>
      </v-btn>
    </v-app-bar>

    <v-main class="mt-3">
      <Timer />
      <TaskList />
    </v-main>
  </v-app>
</template>

<script>
import Timer from "@/components/Timer";
import TaskList from "@/components/TaskList";
export default {
  name: "App",

  components: { Timer, TaskList },

  data: () => ({
    //
  }),
};
</script>
