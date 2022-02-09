<template>
  <v-card
    color="lime lighten-1 indigo--text rounded-xl rounded-t-0"
    outlined
    tile
    class="mx-auto"
  >
    <v-card-title class="mx-auto text-64">
      <h1 class="indigo--text">{{ hours }} : {{ minutes }} : {{ seconds }}</h1>
      <!-- <h3 class="ml-3">{{ time }}</h3> -->
      <!-- <v-spacer></v-spacer>
      <v-dialog ref="dialog" v-model="modal" persistent width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            icon
            v-bind="attrs"
            v-on="on"
            v-model="time"
            prepend-icon="mdi-pen"
          >
            <v-icon>mdi-pen</v-icon>
          </v-text-field>
        </template>
        <v-time-picker
          v-if="modal"
          v-model="time"
          full-width
          format="24hr"
          dark
          use-seconds
          class="amber amber--text"
        >
          <v-spacer></v-spacer>
          <v-btn text color="grey darken-3" @click="modal = false">
            Cancel
          </v-btn>
          <v-btn text color="grey darken-3" @click="saveTime"> OK </v-btn>
        </v-time-picker>
      </v-dialog> -->
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn icon color="indigo" @click="startWork" :disabled="disablePlay">
        <v-icon>mdi-{{ playbackIcon }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon color="indigo" @click="stopWork" :disabled="disableStop">
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
        <v-icon>mdi-restart</v-icon>
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";
import TaskService from "@/services/TaskService.js";
export default {
  props: {
    actualEnd: {
      type: String,
      default: "2021-12-28T14:21:37.883Z",
    },
    task: {
      type: Object,
    },
  },
  data: () => {
    return {
      endTime: "2022-01-15T22:40:00.000Z",
      startTime: new Date().toISOString(),
      interval: null,
      playbackIcon: "play",
      disablePlay: false,
      disableStop: true,
      elapsedTime: null,
      menu: false,
      modal: false,
      hours: null,
      minutes: null,
      seconds: null,
    };
  },
  methods: {
    moment,
    saveTime() {
      this.modal = false;
    },
    clock() {
      this.interval = setInterval(() => {
        const diff =
          // new Date(this.endTime).getTime() -
          // // - 10800000
          // new Date().getTime();
          moment(this.endTime).diff(moment(), "milliseconds");

        this.hours = Math.floor((diff % 8.64e7) / 3.6e6);
        this.minutes = Math.floor((diff % 3.6e6) / 6e4);
        this.seconds = Math.floor((diff % 6e4) / 1000);

        this.hours = this.hours < 10 ? `0${this.hours}` : this.hours;
        this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

        this.elapsedTime =
          moment(this.endTime).diff(moment(this.startTime), "minutes") -
          moment(this.endTime).diff(moment(), "minutes");

        if (
          diff < 0 ||
          (this.hours == 0 && this.minutes == 0 && this.seconds == 0)
        ) {
          this.hours = "00";
          this.minutes = "00";
          this.seconds = "00";

          clearInterval(this.interval);
        }
      }, 1000);
    },
    startWork() {
      for (let i = 0; i < 4000; i++) clearInterval(i);
      this.disablePlay = true;
      this.disableStop = false;
      this.startTime = new Date();
      this.endTime = moment(this.startTime).add(
        this.task.estimatedDurationInMinutes,
        "minutes"
      );
      this.clock();
    },
    stopWork() {
      this.disableStop = true;
      for (let i = 0; i < 4000; i++) clearInterval(i);
      const task = {
        id: this.task.id,
        startTime: this.startTime,
        durationInMinutes: this.elapsedTime,
        breakDurationInMinutes: Math.round(this.elapsedTime / 4),
      };
      console.log(task);
      // TODO re-route to break page
      TaskService.finalizeTask(task)
        .then((res) => console.log(res.data))
        .catch((err) =>
          console.log("There was a problem finishing the task " + err)
        );
      clearInterval(this.interval);
      this.disablePlay = true;
    },
  },
};
</script>
