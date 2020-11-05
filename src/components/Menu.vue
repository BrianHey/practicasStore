<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Pizza Store</v-toolbar-title>

      <v-spacer></v-spacer>
      <h5>{{usuario.name}}</h5>
      <v-chip class="ma-2" color="primary" @click="dialog = true">
        Crear Usuario
      </v-chip>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item :to="{ name: 'Home' }">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Pizzas' }">
            <v-list-item-title>Pizzas</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-5">
        <v-card-title class="headline">
          Crear una nueva cuenta
        </v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="user.name"
            :counter="10"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.direccion"
            label="Dirección"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="Contraseña"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="crearUsuario">
            Crear cuenta
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    drawer: false,
    group: null,
    dialog: false,
    show1: false,

    user: {
      name: "",
      email: "",
      direccion: "",
      password: "",
    },
  }),
  methods: {
    crearUsuario() {
      this.dialog = false;
      this.addUser(this.user);
    },

    ...mapActions(["addUser"]),
  },
  computed: {
    ...mapState(["usuario"])
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
