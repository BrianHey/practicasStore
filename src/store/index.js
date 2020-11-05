import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import Pizzas from "./Pizzas/index";

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

    login({ commit }, user) {
      console.log(user);
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .where("email", "==", user.email)
            .get()
            .then((snapshot) => {
              if (snapshot.empty) {
                console.log("No matching documents.");
                return;
              }

              snapshot.forEach((doc) => {
                commit("LOGIN", doc.data());
              });
            })
            .catch((err) => {
              console.log("Error getting documents", err);
            });
        });
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
  },
  modules: {
    Pizzas,
  },
});
