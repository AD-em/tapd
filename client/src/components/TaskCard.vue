<template>
  <router-link :to="{ name: 'task-show', params: { task: task, id: task.id } }">
    <v-card max-width="600" class="mx-auto mb-2 rounded-xl">
      <v-card-title>
        <h3 class="text-subtitle-2 mr-1">{{ `${task.done ? '🟢' : '🔴'}` }}</h3>
        <h3>{{ task.title }}</h3>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>
        <p class="text-left">{{ task.description }}</p>
      </v-card-subtitle>
    </v-card></router-link
  >
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({
        id: '090',
        title: 'Clean the park on monday',
        description: "Pick all the trash inside the main AASTU student's park",
        done: false,
        estimatedEndTime: 'XX:XX:XX',
        actualEndTime: 'YY:YY:YY',
        breakTime: 'ZZ:ZZ:ZZ',
        startTime: 'TT:TT:TT'
      })
    }
  },
};
</script>

<style></style>
