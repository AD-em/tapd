import Vue from 'vue';
import Vuex from 'vuex';
import TaskService from '@/services/TaskService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: undefined,
    tasks: []
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    }
  },
  actions: {
    saveTask({ commit }, task) {
      return TaskService.saveTask(task)
        .then((res) => {
          if (res.data.data) {
            const newTask = res.data.data.createTask;
            commit('ADD_TASK', newTask);
          } else throw new Error(res.data.errors);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchEvents({ commit }) {
      TaskService.getTasks()
        .then((res) => commit('SET_TASKS', res.data.data.getAllTasks))
        .catch((err) => console.error(err));
    }
  },
  getters: {
    getDoneTasks(state){
      return state.tasks.filter((task)=> !task.done)
    }
  },
  modules: {}
});
