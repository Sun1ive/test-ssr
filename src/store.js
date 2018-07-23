import Vue from 'vue';
import Vuex from 'vuex';
import { fetchItems } from './api';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
    },
    actions: {
      async fetchItems({ commit }) {
        // возвращаем Promise через `store.dispatch()`
        // чтобы мы могли понять когда данные будут загружены
        // return fetchItems().then(items => {
        //   commit('setItems', items);
        // });
        const data = await fetchItems();
        commit('setItems', data);
        return data;
      },
    },
    mutations: {
      setItems(state, payload) {
        state.items = payload;
      },
    },
  });
}
