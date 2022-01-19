<template>
  <v-card
    max-width="700"
    class="mx-auto pb-6 lime lighten-4 rounded-xl elevation-2"
  >
    <h1 class="text-left ml-6">Tasks</h1>
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
  </v-card>
</template>

<script>
import TaskCard from '@/components/TaskCard';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    TaskCard
  },
  computed: {
    ...mapGetters({ tasks: 'getDoneTasks' })
  },
  methods: {
    ...mapActions(['fetchEvents'])
  },
  created() {
    this.fetchEvents();
  }
};
</script>

<style></style>
