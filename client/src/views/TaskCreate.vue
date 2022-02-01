<template>
  <v-card max-width="700" class="mx-auto elevation-0">
    <v-card-title>
      <h1>Create a Task</h1>
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="mx-3 mt-3" @submit.prevent="submitTask">
      <h4 class="mb-2">What are you planning to do?</h4>
      <v-text-field
        class="mb-n2"
        outlined
        label="Task Title"
        prepend-inner-icon="mdi-format-title"
        v-model="task.title"
      />
      <h4 class="mb-2">What are other details do you want to add?</h4>
      <v-textarea
        class="mb-n2"
        outlined
        rows="3"
        label="Task Description"
        v-model="task.description"
      />
      <h4 class="mb-2">How long do you plan to work on this?</h4>
      <v-text-field
        class="mb-n2"
        outlined
        label="Estimated Duration"
        prepend-inner-icon="mdi-timer-sand"
        v-model="task.durationInMinutes"
      />
      <v-btn class="lime" type="submit">Save</v-btn>
    </v-form>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    task: {
      title: '',
      description: '',
      durationInMinutes: ''
    }
  }),
  created() {
    this.task = this.createFreshTaskObject();
  },
  methods: {
    ...mapActions({ saveTaskAction: 'saveTask' }),
    createFreshTaskObject() {
      const userId = this.$store.state.user.id;
      return {
        userId,
        title: '',
        description: '',
        durationInMinutes: ''
      };
    },
    submitTask() {
      //   console.log(this.$store.dispatch('saveTaskAction', { ...this.task }));
      this.saveTaskAction(this.task)
        .then(() => {
            // todo find a way to redirect to newly created task with task.id
        //   const { tasks } = this.$store.state;
        //   console.log(tasks);
        //   this.$router.push({
        //     name: 'task-show',
        //     params: { id: tasks[tasks.length].id, task: tasks[tasks.length] }
        //   });
          this.createFreshTaskObject();
          this.$router.push({ name: "task-list" });
        })
        .catch((error) => {
          console.log('There was a problem creating your task.');
          console.error(error);
        });
    }
  }
};
</script>
