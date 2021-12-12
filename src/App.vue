<template>
  <div id="app" class="app">
    <div id="header" class="header">
      <div id="left-header" class="left-header">
        <img src="../src/assets/main_logo.svg" />Soluciones Verdes
      </div>
      <div id="right-header" class="right-header">
        <nav>
          <button v-on:click="loadHome">Home</button>
          <button v-on:click="loadServicios">Servicios</button>
          <button v-on:click="loadPerfil">Perfil</button>
          <button v-on:click="loadAbout">About</button>
          <button v-on:click="loadLogin">Iniciar sesión</button>
          <button v-on:click="loadSignup">Registrarse</button>
        </nav>
      </div>
    </div>



    <router-view></router-view>

      <div id="footer" class="footer">
    <h2>Universidad Nacional | Misión TIC 2021 | Ciclo 4 - Desarrollo Web | P5G1 </h2>
  </div>
  </div>
</template> 
 
<script>
export default {
  name: "App",

  data: function () {
    return {
      renderComponent: true,
    };
  },

  methods: {
    loadHome: function () {
      this.$router.push({ name: "home" });
    },

    loadServicios: function () {
      this.$router.push({ name: "services" });
    },

    loadPerfil: function () {
      this.$router.push({ name: "perfil" });
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
  },

  created: function () {},
};
</script> 
 
<style>
body {
  margin: 0 0 0 0;
}

.header {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 50px;
  background-color: #ede6dc;
  color: #ede6dc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-header {
  height: 10vh;
  width: 40%;
  line-height: 70px;
  font-family: "Alice", "Times New Roman", Times, serif;
  color: #3a3b28;
  font-size: 270%;
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
  font-weight: bold;
  border-radius: 5px;
  padding: 7px 30px;
  margin-right: 10px;
}

.header nav button:hover {
  color: #ede6dc;
  background: #3a3b28;
  border: 1px solid #3a3b28;
}

.footer{
  background-color: #ede6dc;
  height: 10vh;
  width: 100%;
  line-height: 70px;
  font-family: "Raleway", "Arial", sans-serif;
  color: #3a3b28;
  text-align: center;
  font-size: 75%;

}
</style>