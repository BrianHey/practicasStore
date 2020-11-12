import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import Pizzas from "./Pizzas/index";
import Carrito from "./Carrito/index";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pizzas: [],
    usuario: {},
  },
  mutations: {
    GET_DATA(state, pizzas) {
      state.pizzas = pizzas;
    },
    LOGIN(state, usuario) {
      state.usuario = usuario;
    },
    LOGOUT(state) {
      state.usuario = {};
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

    addUser(context, user) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const usuario = Object.assign({}, user);
          delete usuario.password;
          firebase
            .firestore()
            .collection("users")
            .add(usuario)
            .then(() => {
              context.dispatch("login", user);
            });
        });
    },

    async login({ commit }, usuario) {
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(usuario.email, usuario.password);

        const snapshot = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", usuario.email)
          .get();

        snapshot.forEach((doc) => {
          commit("LOGIN", doc.data());
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    async logout({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("LOGOUT");
        return true;
      } catch (e) {
        return false;
      }
    },
  },

  getters: {
    pizzasData: (state) => {
      return state.pizzas.map((p) => {
        const data = p.data;
        data.id = p.id;
        return data;
      });
    },
    getPizza: (state) => (id) => {
      return state.pizzas.find((pizza) => pizza.id === id);
    },
  },

  modules: {
    Pizzas,
    Carrito,
  },

  plugins: [createPersistedState()],
});
