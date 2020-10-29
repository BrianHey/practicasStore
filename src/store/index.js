import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import Pizzas from './Pizzas/index'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pizzas: [],
  },
  mutations: {
    GET_DATA(state, pizzas) {
      state.pizzas = pizzas;
    },
  },
  actions: {
    getData({ commit }) {
      firebase
        .firestore()
        .collection("pizzas")
        .onSnapshot((snapshot) => {
          let pizzas = [];
          snapshot.forEach((p) => {
            pizzas.push({ id: p.id, data: p.data() });
          });
          commit("GET_DATA", pizzas);
        });
    },
  },

  getters: {
    pizzasData: (state) => {
      return state.pizzas.map((p) => {
        const data = p.data
        data.id = p.id
        return data
      });
    },
  },
  modules: {
    Pizzas
  },
});
