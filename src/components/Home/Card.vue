<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <router-link :to="'/pizza/' + pizza.id">
      <v-img height="250" :src="pizza.data.img"></v-img>
    </router-link>

    <v-card-title class="nombre_Pizza">{{ pizza.data.name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0"> </v-row>

      <div>
        <ul>
          <li :key="i" v-for="(ingredientes, i) in pizza.data.ingredients">
            {{ ingredientes }}
          </li>
        </ul>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-select
      :items="opciones"
      label="Seleccione su tamaño"
      solo
      v-model="size"
      :rules="[(v) => !!v || 'Item is required']"
      required
      class="select_size"
    ></v-select>

    <v-card-text>{{ precio }}</v-card-text>

    <v-card-actions>
      <v-btn class="agregar_pizza" color="deep-purple lighten-2" text @click="add_To_Cart">
        Agregar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["pizza"],
  data: () => ({
    loading: false,
    selection: 1,
    size: "",
  }),

  methods: {
    ...mapActions("Carrito", ["addToCart"]),
    add_To_Cart() {
      this.size == ""
        ? alert("Seleccione un tamaño")
        : this.addToCart({
            img: this.pizza.data.img,
            name: this.pizza.data.name,
            price: this.precio,
            size: this.size,
            id: this.pizza.id,
            stock: this.pizza.data.stock,
          });
    },
  },

  computed: {
    opciones() {
      return Object.keys(this.pizza.data.prices);
    },

    precio() {
      return (
        this.pizza.data.prices[this.selected] || this.pizza.data.prices.large
      );
    },
  },
};
</script>
