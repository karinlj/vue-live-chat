import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  //arguments from vue-router
  //we only want current user
  let user = projectAuth.currentUser;
  console.log("current user", user);
  if (!user) {
    next({ name: "Welcome" });
  }
  next(); //allows vue-router to go where it was going
};

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  console.log("current user", user);
  if (user) {
    next({ name: "Chatroom" });
  }
  next();
};
const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,
    beforeEnter: requireAuth,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
