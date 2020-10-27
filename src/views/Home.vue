<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col md="3" v-for="(pizza,i) in pizzas" :key="i"><Card :pizza="pizza" /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Home/Card.vue";
import { mapState} from 'vuex'
export default {
  name: "Home",
  computed:{
    ...mapState(['pizzas'])
  },
  components: {
    Card,
  },
  data(){
    return{
      name: 'Gio'
    }
  }
};
</script>
