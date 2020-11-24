<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <router-link to="/">
        <v-toolbar-title>
          Pizza Store
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
      <h5>{{ usuario.name }}</h5>
      <v-chip class="ma-2" color="primary" @click="newUserModal = true">
        Crear Usuario
      </v-chip>

      <v-chip class="ma-2" color="warning" @click="loginModal = true">
        Iniciar Sesión
      </v-chip>

      <v-chip class="ma-2" color="danger" @click="logout">
        Cerrar Sesión
      </v-chip>

      <router-link  :to="{ name: 'Carrito' }" id="Carrito" class="d-flex align-center">
        <h5 >Carritooo</h5>
        <v-icon> mdi-cart </v-icon>
      </router-link>
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

    <v-dialog v-model="newUserModal" max-width="600">
      <v-card class="pa-5">
        <v-card-title class="headline">
          Crear una nueva cuenta
        </v-card-title>

        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="newUser.name"
            :counter="10"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="newUser.email"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="newUser.direccion"
            label="Dirección"
          ></v-text-field>

          <v-text-field
            v-model="newUser.password"
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

    <v-dialog v-model="loginModal" max-width="600">
      <v-card class="pa-5">
        <v-card-title class="headline">
          Iniciar Sesión
        </v-card-title>

        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
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
          <v-btn color="green darken-1" text @click="loginUser">
            Iniciar sesión
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
    newUserModal: false,
    loginModal: false,
    show1: false,

    newUser: {
      name: "",
      email: "",
      direccion: "",
      password: "",
    },

    user: {
      email: "",
      password: "",
    },
  }),
  methods: {
    crearUsuario() {
      this.newUserModal = false;
      this.addUser(this.newUser);
    },
    async loginUser() {
      const email = this.user.email;
      const password = this.user.password;
      const respuesta = await this.login({ email, password });
      if (respuesta) {
        this.loginModal = false;
        this.$router.push("/pizzas");
      }
    },
    Logout() {
      this.logout();
    },
    ...mapActions(["addUser", "login", "logout"]),
  },
  computed: {
    ...mapState(["usuario"]),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
