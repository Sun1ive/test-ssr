import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import './style.css';

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      this.$data = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
});

export function createApp() {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
