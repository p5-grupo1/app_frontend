import { createRouter, createWebHashHistory } from "vue-router";
import App                                    from "./App.vue";
import Home                                   from "./Home.vue";
import SignUp                                 from "./SignUp.vue";
import LogIn                                  from "./LogIn.vue";
import Services                               from "./Services.vue";
import About                                  from "./About.vue";
import ClientProfile                          from "./ClientProfile.vue";
import GardenerProfile                        from "./GardenerProfile.vue";
import CreatePost                             from "./CreatePost.vue";
import EditPost                               from "./EditPost.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: App,
  },

  {
    path: "/home",
    name: "home",
    component: Home,
  },

  {
    path: "/signup",
    name: "signUp",
    component: SignUp,
  },

  {
    path: "/login",
    name: "logIn",
    component: LogIn,
  },

  {
    path: "/services",
    name: "services",
    component: Services,
  },

  {
    path: "/about",
    name: "about",
    component: About,
  },

  {
    path: "/clientprofile",
    name: "clientProfile",
    component: ClientProfile,
  },

  {
    path: "/gardenerprofile",
    name: "gardenerProfile",
    component: GardenerProfile,
  },

  {
    path: "/createpost",
    name: "createPost",
    component: CreatePost,
  },

  {
    path: "/editpost",
    name: "editPost",
    component: EditPost,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
