import firebase from "firebase";

export default {
  state: {
    pizzas: [],
  },
  mutations: {},
  actions: {
    setNewPizza({ commit }, pizza) {
      firebase
        .firestore()
        .collection("pizzas")
        .add(pizza).then;
    },
    deletePizzaFB({ commit }, id) {
      firebase
        .firestore()
        .collection("pizzas")
        .doc(id)
        .delete();
    },

    editPizzaFB({ commit }, pizza) {
      firebase
        .firestore()
        .collection("pizzas")
        .doc(pizza.id)
        .set(pizza);
    },
  },
};
