import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Load from '@/components/Load.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('@/components/Home.vue'),
        // component: Home,
      },
      {
        path: '/load',
        component: () => import('@/components/Load.vue'),
        // component: Load,
      },
    ],
  });
}
