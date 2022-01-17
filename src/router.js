import gql                                    from 'graphql-tag'
import { createRouter, createWebHashHistory } from "vue-router";
import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client/core'

import Home                                   from "./components/Home.vue";
import SignUp                                 from "./components/SignUp.vue";
import LogIn                                  from "./components/LogIn.vue";
import Services                               from "./components/Services.vue";
import About                                  from "./components/About.vue";
import ClientProfile                          from "./components/ClientProfile.vue";
import GardenerProfile                        from "./components/GardenerProfile.vue";
import CreatePost                             from "./components/CreatePost.vue";
import EditPost                               from "./components/EditPost.vue";
import Post                                   from "./components/Post.vue";

const routes = [

  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: "/signup",
    name: "signUp",
    component: SignUp,
    meta: {
      requiresAuth: false,
    }
  },

  {
    path: "/login",
    name: "logIn",
    component: LogIn,
    meta: {
      requiresAuth: false,
    }
  },

  {
    path: "/services",
    name: "services",
    component: Services,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: "/clientprofile",
    name: "clientProfile",
    component: ClientProfile,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: "/gardenerprofile",
    name: "gardenerProfile",
    component: GardenerProfile,
    meta: {
      requiresAuth: true,
    }
  },

  /* {
    path: "/createpost",
    name: "createPost",
    component: CreatePost,
  }, */

  {
    path: "/editpost",
    name: "editPost",
    component: EditPost,
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: "/post",
    name: "post",
    component: Post,
    meta: {
      requiresAuth: true,
    }
  },

];


const apolloClient = new ApolloClient({
  link: createHttpLink({uri: 'https://soluciones-verdes-apigateway.herokuapp.com/'}),
  cache: new InMemoryCache() 
});


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

async function isAuth(){
  if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null){
    return false;
  }
  try{
    var result = await apolloClient.mutate(
      {
        mutation: gql`
        mutation RefreshToken($token: Refresh!) {
          refreshToken(token: $token) {
            access
          }
        }
      `,
      variables: {
        token: {
          refresh: localStorage.getItem("tokenRefresh"),
        }
      }
      }
    )
    localStorage.setItem("tokenAccess", result.data.refreshToken.access);
    return true;
  }
  catch{
    localStorage.clear();
    alert("Su sesion ha expirado, Por favor, vuelva a inicar Sesion ");
    return false;
  }
}

router.beforeEach(async (to, from) =>{
  var is_auth = await isAuth();
  
  if(is_auth == to.meta.requiresAuth)
    return true;


  if(is_auth){
    return {name : "home"};
  }
  else {
    return {name: "logIn"};
  }
})

export default router;
