<template>
  <div>
    <h1>{{pizza.name}}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Pizza",
  props: ["id"],
  computed: {
    ...mapGetters(["getPizza"]),
    pizza() {
      const id = this.id;
      return this.getPizza(id).data;
    },
  },
};
</script>
