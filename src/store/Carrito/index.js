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
    MINUS(state, id) {
      const cant = state.carrito.find((p) => p.id == id).cant;
      cant > 1
        ? (state.carrito = state.carrito.map((p) => {
            if (p.id == id) {
              p.cant = p.cant - 1;
              return p;
            }
            return p;
          }))
        : (state.carrito = state.carrito.filter((p) => p.id !== id));
    },
    PLUS(state, id) {
      state.carrito = state.carrito.map((p) => {
        if (p.id == id) {
          p.cant = p.cant + 1;
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
    addToCart({ commit }, pizza) {
      pizza.cant = 1;
      commit("ADD_TO_CART", pizza);
    },
    pay({ commit, state }) {
      state.carrito
        
        .forEach((p) => {
          firebase
            .firestore()
            .collection("pizzas")
            .doc(p.id)
            .update({ stock: p.stock - p.cant });
        })
      
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
