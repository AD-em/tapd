<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col><img alt="Vue logo" src="/android-chrome-192x192.png" /></v-col>
        <v-col><Signin /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Signin from "@/components/Signin.vue";
export default {
  name: "Home",
  components: {
    Signin,
  },
};
</script>
