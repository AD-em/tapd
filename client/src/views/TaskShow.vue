<template>
  <v-card max-width="600" class="mx-auto mb-2 rounded-xl">
    <v-card-title>
      <router-link :to="{ name: 'task-list' }"
        ><v-btn icon class="mr-3"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        ></router-link
      >
      <h3 class="text-subtitle-2 mr-3">
        {{ `${localTask.done ? '🟢' : '🔴'}` }}
      </h3>
      <h3>{{ localTask.title }}</h3>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle>
      <p class="text-left">{{ localTask.description }}</p>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col>
          <h5>Expected Duration</h5>
          <p>{{ estimatedEndDuration }}</p>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <h5>Actual Duration</h5>
          <p>{{ actualEndDuration }}</p>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <h5>Over-estimation Factor</h5>
          <p>{{ overestimationFactor }} -> 1</p>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <h5>Break Duration</h5>
          <p>{{ breakDuration }}</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import TaskService from '@/services/TaskService.js';
import moment from 'moment';
export default {
  name: 'TaskShow',
  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({
        id: 'defaultId',
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
  data: () => ({
    localTask: undefined
  }),
  created() {
    if (this.task.id == 'defaultId') {
      TaskService.getTask(this.$route.params.id).then(
        (res) => (this.localTask = res.data.data.getTask)
      );
    } else {
      this.localTask = this.task;
    }
  },
  methods: {
    dateTimeDiffInMin(beforeDateTime, afterDateTime) {
      return moment(afterDateTime)
        .utc()
        .diff(moment(beforeDateTime).utc(), 'm', true);
    }
  },
  computed: {
    estimatedEndDuration() {
      const fullMinutes = this.dateTimeDiffInMin(
        this.localTask.startTime,
        this.localTask.estimatedEndTime
      );
      let hours = 0,
        minutes = 0;
      if (fullMinutes > 0) {
        hours = Math.floor(fullMinutes / 60);
        minutes = fullMinutes % 60;
      } else {
        hours = -1;
        minutes = -1;
        console.log('failed');
      }
      return hours
        ? `${hours} Hour${hours > 1 ? 's' : ''} and ${minutes} Minute${
            minutes > 1 ? 's' : ''
          }`
        : `${minutes} Minute${minutes > 1 ? 's' : ''}`;
    },
    actualEndDuration() {
      const fullMinutes = this.dateTimeDiffInMin(
        this.localTask.startTime,
        this.localTask.actualEndTime
      );
      let hours = 0,
        minutes = 0;
      if (fullMinutes > 0) {
        hours = Math.floor(fullMinutes / 60);
        minutes = fullMinutes % 60;
      } else {
        hours = -1;
        minutes = -1;
        console.log('failed');
      }
      return hours
        ? `${hours} Hour${hours > 1 ? 's' : ''} and ${minutes} Minute${
            minutes > 1 ? 's' : ''
          }`
        : `${minutes} Minute${minutes > 1 ? 's' : ''}`;
    },
    breakDuration() {
      const fullMinutes = this.dateTimeDiffInMin(
        this.localTask.actualEndTime,
        this.localTask.breakEndTime
      );
      let hours = 0,
        minutes = 0;
      if (fullMinutes > 0) {
        hours = Math.floor(fullMinutes / 60);
        minutes = fullMinutes % 60;
      } else {
        hours = -1;
        minutes = -1;
        console.log('failed');
      }
      return hours
        ? `${hours} Hour${hours > 1 ? 's' : ''} and ${minutes} Minute${
            minutes > 1 ? 's' : ''
          }`
        : `${minutes} Minute${minutes > 1 ? 's' : ''}`;
    },
    overestimationFactor() {
      return (
        this.dateTimeDiffInMin(
          this.localTask.startTime,
          this.localTask.actualEndTime
        ) /
        this.dateTimeDiffInMin(
          this.localTask.startTime,
          this.localTask.estimatedEndTime
        )
      ).toFixed(2);
    }
  }
};
</script>
