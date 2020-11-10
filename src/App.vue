<template>
  <v-app>
    <Menu />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Menu from "@/components/Menu.vue";
export default {
  name: "App",
  components: {
    Menu,
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["getData"]),
  },
  created() {
    this.getData();
  },

  computed: {
    ...mapGetters(["getPizza"]),
    pizzita() {
      return this.getPizza("0runlwHNG1jCc3n46zet");
    },
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}

.v-application a {
  color: white !important;
}
</style>
