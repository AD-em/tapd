import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

console.log(`And our GitHub Actions CI/CD setup is complete babes.`);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
