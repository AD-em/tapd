<template>
  <v-card color="lime lighten-1 indigo--text rounded-xl rounded-t-0" outlined tile class="mx-auto">
    <v-card-title class="mx-auto text-64">
      <h1 class="indigo--text">{{ hours }} : {{ minutes }} : {{ seconds }}</h1>
      <h3 class="ml-3">{{ time }}</h3>
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
      <v-btn icon @click="stopWork">
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
export default {
  props: {
    actualEnd: {
      type: String,
      default: "2021-12-28T14:21:37.883Z",
    },
    start: {
      type: String,
      default: new Date().toISOString(),
    },
    task: {
      type: Object
    }
  },
  data: () => {
    return {
      end: "2022-01-15T22:40:00.000Z",
      interval: null,
      playbackIcon: "play",
      disablePlay: false,
      time: null,
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
          new Date(this.end).getTime() 
          // - 10800000 
          - new Date().getTime();

        this.hours = Math.floor((diff % 8.64e+7) / 3.6e+6);
        this.minutes = Math.floor((diff % 3.6e+6) / 6e+4);
        this.seconds = Math.floor((diff % 6e+4) / 1000);

        this.hours = this.hours < 10 ? `0${this.hours}` : this.hours;
        this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
        this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;

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
    startWork(){
      const startTime = new Date();
      this.end = moment(startTime).add(this.task.durationInMinutes, 'minutes')
      this.clock();
    },
    stopWork(){
      clearInterval(this.interval)
      this.disablePlay = true;
    }
  },
};
</script>
