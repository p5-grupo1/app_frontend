<template>
  <div class="imagen">
    <img src="../assets/undraw_environment_iaus_1.png" alt="" />
  </div>

  <div class="login">
    <form action="">
      <h2>Iniciar sesión</h2>
      <label class="inisecion" for="nombreusuario">Nombre de usuario</label>
      <input class="inisecion" type="text" placeholder="Nombre de usuario" />

      <label class="inisecion" for="contraseña">Contraseña</label>
      <input class="inisecion" type="password" placeholder="Contraseña" />

      <input class="boton" type="submit" value="Ingresar" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>
.imagen img {
  float: left;
  padding: 30px 50px 0 100px;
  width: 30%;
}

.login {
  width: 400px;
  background: white;
  padding: 30px;
  padding-left: 800px;
  margin-top: 80px;
  margin-bottom: 250px;
  font-family: calibri;
  color: black;
}

.login h2 {
  margin: 0;
  text-align: center;
  height: 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid;
  font-size: 20px;
}

.inisecion {
  width: 80%;
  margin-bottom: 15px;
  padding: 11px 10px;
  background: white;
  font-size: 14 px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid black;
}
.boton {
  width: 100%;
  height: 40px;
  background: #ede6dc;
  border-radius: 10px;
  color: black;
  margin-bottom: 19px;
}
</style>