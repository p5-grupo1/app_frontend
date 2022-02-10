<template>
  <div id="app" class="app">
    <div id="header" class="header">
      <div id="left-header" class="left-header">
        <div>
          <img src="../src/assets/main_logo.svg"/>
        </div>
        <div>
        <h1>Soluciones Verdes</h1>
        </div>
      </div>
      <div id="right-header" class="right-header">
        <nav>
          <button v-if="isAuth" v-on:click="loadHome">Home</button>
          <button v-if="isAuth" v-on:click="loadServicios">Servicios</button>
          <button v-if="isAuth" v-on:click="loadPerfil">Perfil</button>
         
          <button v-if="isAuth" v-on:click="loadAbout">About</button>
          <button v-if="isAuth" v-on:click="logOut">Exit</button>
          
          <button v-if="!isAuth" v-on:click="loadLogin">Iniciar sesión</button>
          <button v-if="!isAuth" v-on:click="loadSignup">Registrarse</button>
        </nav>
      </div>
    </div>

  <div class="main-component">
    <router-view
      v-on:completedLogIn="completedLogIn"
      v-on:completedSignUp="completedSignUp"
      >  
    </router-view>
    </div>

      <div id="footer" class="footer">
        <h2>Universidad Nacional | Misión TIC 2021 | Ciclo 4 - Desarrollo Web | P5G1 </h2>
      </div>
  </div>
</template> 
 
<script>
export default {
  name: "App",


  computed: {
    isAuth: {
      get: function(){
        return this.$route.meta.requiresAuth;
      },
      set: function(){}
    }
  },

  methods: {

    loadHome: function () {
      this.$router.push({ name: "home" });
    },

    loadServicios: function () {
      this.$router.push({ name: "services" });
    },

    loadPerfil: function () {
      this.$router.push({ name: "clientProfile" });
    },

    loadAbout: function () {
      this.$router.push({ name: "about" });
    },

    loadSignup: function () {
      this.$router.push({ name: "signUp" });
    },

    loadLogin: function () {
      this.$router.push({ name: "logIn" });
    },

    completedLogIn: function(data){
      localStorage.setItem('username', data.username);
      localStorage.setItem('пароль', data.пароль);
      localStorage.setItem('tokenRefresh', data.tokenRefresh);
      localStorage.setItem('tokenAccess', data.tokenAccess);
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        icon: 'success',
        title: 'Autenticacion Exitosa',
      })
      this.loadHome();
    },

    completedSignUp: function(data){
      this.$swal({
          title: 'Registro Exitoso',
          icon: 'success'
        })
      this.completedLogIn(data);
    },

    logOut: function(){
      localStorage.clear();
      this.$swal({
          title: 'Sesion Terminada',
          icon: 'success'
        })
      this.loadLogin();
    },

  },

  created: function () {
  }
}


</script> 
 
<style>

html{
  min-height: 100%;
  position: relative;
}
body {
  margin: 0;
  margin-bottom: 2em;
}

.header {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 0;
  padding: 0;
  gap: 2em;
  align-items: center;
  justify-content: space-between;
  color: #ede6dc;
  background-color: #ede6dc;
}


.right-header nav{
  float: right;
  margin-right: 2em;
}

.left-header h1{
  font-family: "Raleway", "Arial", sans-serif;
  margin: 0px;
  color: #3a3b28;
  font-size: 33px;
  text-align: center;
}

.left-header {
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.2em;
  margin-left: 2em;
}


.left-header img {
  margin: 10px;
  height: 75%;
  float: left;
}

.header nav button {
  color: #3a3b28;
  background: #ede6dc;
  border: 1px solid #3a3b28;
  font-family: "Raleway", "Arial", sans-serif;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.3em;
  margin: 0.8em;
  width: 7em;
  max-width: 80%;
}

.header nav button:hover {
  color: #ede6dc;
  background: #3a3b28;
  border: 1px solid #3a3b28;
}

.footer{
  font-family: "Raleway", "Arial", sans-serif;
  color: #3a3b28;
  text-align: center;
  font-size: 85%;
  background-color: #ede6dc;
  position: absolute;
  width: 100%;
  bottom: 0;
}

</style>