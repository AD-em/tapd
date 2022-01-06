<template>
  <v-list max-width="400" class="mx-auto teal lighten-5">
    Task List
    <TaskCard />
  </v-list>
</template>

<script>
import TaskCard from "@/components/TaskCard";
export default {
  components: {
    TaskCard,
  },
};
</script>

<style></style>
