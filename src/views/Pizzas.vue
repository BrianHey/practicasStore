<template>
  <div>
    <v-container>
      <Form :pizza="pizza" />
      <template>
        <v-data-table
          :headers="headers"
          :items="pizzasData"
          class="elevation-1"
        >
          <template v-slot:item.img="{ item }">
            <img width="130" :src="item.img" />
          </template>
          <template v-slot:item.ingredients="{ item }">
            <ul>
              <li v-for="(ingredient, i) in item.ingredients" :key="i">
                {{ ingredient }}
              </li>
            </ul>
          </template>

          <template v-slot:item.prices="{ item }">
            <v-select
              :items="
                Object.keys(item.prices).map((p) => `${p}: ${item.prices[p]}`)
              "
              label="Precios"
            ></v-select>
          </template>
          <template v-slot:item.acciones="{ item }">
            <template>
              <v-btn
                color="warning"
                fab
                small
                dark
                @click="pizzaUpdate(item.id)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>

            <v-btn color="red" fab small dark @click="deletePizza(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </template>
      <v-dialog v-model="dialog" max-width="590">
        <v-card>
          <v-card-title class="headline">
            Editando la piiza
          </v-card-title>
          <v-card-text
            ><Form @hideDialog="dialog = false" :pizza="pizzaEdit" :edit="true"
          /></v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Form from "@/components/Pizzas/Form";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Pizzas",
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Nombre",
          align: "start",
          value: "name",
        },
        { text: "Imagen", value: "img" },
        { text: "Ingredientes", value: "ingredients" },
        { text: "Precios", value: "prices" },
        { text: "Stock", value: "stock" },
        { text: "Acciones", value: "acciones" },
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
      ],
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
      pizzaEdit: {},
    };
  },
  components: {
    Form,
  },
  methods: {
    getColor(calories) {
      if (calories > 400) return "red";
      else if (calories > 200) return "orange";
      else return "green";
    },
    ...mapActions(["deletePizzaFB"]),
    deletePizza(id) {
      this.deletePizzaFB(id);
    },

    pizzaUpdate(id) {
      const pizza = this.pizzasData.find((p) => p.id == id);
      this.pizzaEdit = Object.assign({}, pizza);
      this.dialog = true;
    },
  },
  computed: {
    ...mapGetters(["pizzasData"]),
  },
};
</script>

<style lang="scss">
ul {
  padding: 10px;
  list-style: none;
}
</style>
