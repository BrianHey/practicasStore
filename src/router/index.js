import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/pizzas",
    name: "Pizzas",
    meta: {
      auth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pizzas.vue"),
  },
  {
    path: "/pizza/:id",
    name: "Pizza",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pizza.vue"),
  },
  {
    path: "/carrito",
    name: "Carrito",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Carrito.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let autorizacion = to.matched.some((ruta) => ruta.meta.auth);

  if (autorizacion && !usuario) {
    next("/");
  } else if (!autorizacion && usuario) {
    next();
  }
  next();
});

export default router;
