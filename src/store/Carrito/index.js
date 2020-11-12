import firebase from "firebase";
import store from "../index";

export default {
  namespaced: true,
  state: {
    carrito: [],
  },
  mutations: {
    ADD_TO_CART(state, pizza) {
      state.carrito.push(pizza);
    },
    MINUS(state, pizza) {
      const cant = state.carrito.find((p) => p.id == pizza.id && p.size == pizza.size).cant;
      console.log(cant);
      cant > 1
        ? (state.carrito = state.carrito.map((p) => {
            if (p.id == pizza.id && p.size == pizza.size) {
              p.cant = p.cant - 1;
              return p;
            }
            return p;
          }))
        : (state.carrito = state.carrito.filter((p) => p.id === pizza.id  && p.size !== pizza.size));
    },
    PLUS(state, pizza) {
      state.carrito = state.carrito.map((p) => {
        if (p.id == pizza.id && p.size == pizza.size) {
          p.cant++;
          return p;
        }
        return p;
      });
    },
    PAY(state) {
      state.carrito = [];
    },
  },
  actions: {
    addToCart({ commit, state }, pizza) {
      pizza.cant = 1;

      const Pizza = state.carrito.find(
        (p) => p.id == pizza.id && p.size == pizza.size
      );
      Pizza ? commit("PLUS", pizza) : commit("ADD_TO_CART", pizza);
    },
    pay({ commit, state }) {
      state.carrito.forEach((p) => {
        firebase
          .firestore()
          .collection("pizzas")
          .doc(p.id)
          .update({ stock: p.stock - p.cant });
      });
    },
  },
  getters: {
    total: (state) => {
      const pizzas =
        state.carrito.length > 0
          ? state.carrito.map((p) => p.price * p.cant)
          : [0];
      return pizzas.reduce((a, c) => a + c);
    },
  },
};
