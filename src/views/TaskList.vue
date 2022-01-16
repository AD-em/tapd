<template>
  <v-card max-width="700" class="mx-auto pb-6 lime lighten-4 rounded-xl elevation-2">
    <h1 class="text-left ml-6">Tasks</h1>
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
  </v-card>
</template>

<script>
import TaskCard from '@/components/TaskCard';
import TaskService from '@/services/TaskService.js';
export default {
  data: () => ({ tasks: undefined }),
  components: {
    TaskCard
  },
  created() {
    TaskService.getTasks()
      .then((res) => this.tasks = res.data.data.getAllTasks)
      .catch((err) => console.error(err));
  }
};
</script>

<style></style>
