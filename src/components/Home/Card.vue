<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="pizza.data.img"
    ></v-img>

    <v-card-title>{{pizza.data.name}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
   
      </v-row>


      <div>
        <ul>
          <li :key="i" v-for="(ingredientes,i) in pizza.data.ingredients">{{ingredientes}}</li>
        </ul>

      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

      <v-select
          :items="opciones"
          label="Seleccione su tamaño"
          solo
          v-model="selected"
        ></v-select>

    
    
    <v-card-text>{{precio}}</v-card-text>

    
    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Agregar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['pizza'],
    data: () => ({
      loading: false,
      selection: 1,
      selected: ''
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
    
    computed:{
      opciones(){
        return Object.keys(this.pizza.data.prices)
      },

      precio(){
        return this.pizza.data.prices[this.selected] || this.pizza.data.prices.large
      }
    }
  }
</script>