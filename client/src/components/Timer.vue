<template>
  <v-card color="amber" outlined tile max-width="400" class="mx-auto">
    <v-card-title class="mx-auto text-64">
      <h1 class="indigo--text">{{ hours }} : {{ minutes }} : {{ seconds }}</h1>
      <h3 class="ml-3">{{ time }}</h3>
      <v-spacer></v-spacer>
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
      </v-dialog>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn icon color="indigo">
        <v-icon>mdi-{{ playbackIcon }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-restart</v-icon>
      </v-btn>
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
    end: {
      type: String,
      default: "2022-01-15T22:40:00.000Z",
    },
  },
  data: () => {
    return {
      interval: null,
      playbackIcon: "play",
      time: null,
      menu: false,
      modal: false,
      hours: null,
      minutes: null,
      seconds: null,
    };
  },
  created() {
    this.clock();
  },
  methods: {
    moment,
    saveTime() {
      this.modal = false;
    },
    clock() {
      this.interval = setInterval(() => {
        const diff =
          new Date(this.end).getTime() - 10800000 - new Date().getTime();

        this.hours = Math.floor((diff % 86400000) / 3600000);
        this.minutes = Math.floor((diff % 3600000) / 60000);
        this.seconds = Math.floor((diff % 60000) / 1000);

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
          console.log("time ends");
        }
      }, 1000);
    },
  },
};
</script>
