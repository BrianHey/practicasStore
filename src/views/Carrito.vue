<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in carrito" :key="i" cols="12">
        <v-card dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="item.name"></v-card-title>
            </div>

          </div>
           <div>
              <v-card-subtitle> Tamaño:  {{ item.size }} </v-card-subtitle>
              <v-card-subtitle> Precio: {{ item.price }} </v-card-subtitle>
              <v-card-subtitle> <v-btn fab small @click="MINUS(item.id)" > <v-icon>mdi-minus</v-icon></v-btn>  {{ item.cant }}  <v-btn fab small @click="PLUS(item.id)"><v-icon >mdi-plus</v-icon> </v-btn></v-card-subtitle>
            </div>
        </v-card>
      </v-col>
    </v-row>
    <h1>Total: {{total ? total :0 }}</h1>
    <v-btn @click="pay">Hacer la compra</v-btn>
  </v-container>
</template>
<script>
import { mapGetters, mapState,  mapMutations, mapActions } from "vuex";
export default {
  name: "Carrito",
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
  }),
  computed: {
    ...mapState("Carrito", ["carrito"]),
    ...mapGetters("Carrito",['total'])
  },
  methods:{
      ...mapMutations("Carrito",['MINUS', "PLUS"]),
      ...mapActions("Carrito", ["pay"])
  }
};
</script>

<style lang="scss" scoped></style>
