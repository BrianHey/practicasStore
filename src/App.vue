<template>
  <v-app>
    <Menu />

    <v-main >
 
      <router-view></router-view>


    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import Menu from '@/components/Menu.vue'
export default {
  name: 'App',
  components:{
    Menu
  },

  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['getData'])
  },
  created(){
    this.getData()
  }
};
</script>
