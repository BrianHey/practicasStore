<template>
  <v-form ref="form">
    <v-text-field v-model="pizza.name" label="Nombre" required></v-text-field>

    <v-text-field
      v-model="pizza.img"
      label="Dirección de la imagen"
      required
    ></v-text-field>

    <h3>Ingredientes:</h3>
    <v-text-field
      v-for="(ingrediente, i) in pizza.ingredients"
      :key="i"
      v-model="pizza.ingredients[i]"
      label="Ingrediente"
      required
    ></v-text-field>
    <v-btn class="mx-2" fab small dark color="success" @click="add">
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

    <v-btn class="mx-2" fab small dark color="red" @click="Delete">
      <v-icon dark>
        mdi-delete
      </v-icon>
    </v-btn>

    <br />
    <br />

    <v-text-field label="Stock" v-model="pizza.stock" required></v-text-field>

    <h3>Precios</h3>
    <v-text-field
      label="Individual"
      v-model="pizza.prices.individual"
    ></v-text-field>
    <v-text-field label="Medium" v-model="pizza.prices.medium"></v-text-field>
    <v-text-field label="Large" v-model="pizza.prices.large"></v-text-field>
    <v-text-field label="XL" v-model="pizza.prices.XL"></v-text-field>

    <v-btn v-show="!edit" color="primary" class="mr-4" @click="nuevaPizza">
      Agregar pizza
    </v-btn>
    <v-btn v-show="edit" color="yellow" class="mr-4" @click="editPizza">
      editar pizza
    </v-btn>
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["pizza", "edit"],
  data: () => ({
    pizza: {
      name: "",
      img: "",
      prices: {
        individual: "",
        medium: "",
        large: "",
        XL: "",
      },
      ingredients: [""],
    },
  }),

  methods: {
    ...mapActions(["setNewPizza", "editPizzaFB"]),
    add() {
      this.pizza.ingredients.push("");
    },

    Delete() {
      this.pizza.ingredients.pop();
    },

    nuevaPizza() {
      this.setNewPizza(this.pizza);
    },

    editPizza() {
      this.pizza.stock = Number(this.pizza.stock);

      this.editPizzaFB(this.pizza);
    },
  },
};
</script>
