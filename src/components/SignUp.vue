<template>
  <div class="imagen">
    <img src="../assets/Group_2.png" alt="" />
  </div>

  <div class="Registro">
    <form action="">
      <h2>Registro</h2>
      <label class="registrarse" for="nombreusuario">NOMBRE DE USUARIO</label>
      <input
        class="registrarse"
        type="text"
        placeholder="Escoja un nombre de usuario"
      />

      <label class="registrarse" for="contraseña">Contraseña</label>
      <input class="registrarse" type="password" placeholder="Contraseña" />

      <label class="registrarse" for="nombrecompleto">Nombre completo</label>
      <input class="registrarse" type="text" placeholder="Nombre y apellidos" />

      <label class="registrarse" for="correo">Correo electrónico</label>
      <input
        class="registrarse"
        type="text"
        placeholder="Dirección de correo electrónico"
      />

      <p>¿QUÉ DESEA HACER?</p>

      <input class="opcion" type="radio" name="escoger" />
      <label class="opcion" for="jardinero"
        >Deseo ofrecer mis servicios como jardinero</label
      >

      <input class="opcion" type="radio" name="escoger" />
      <label class="opcion" for="cliente"
        >deseo contratar servicios de jardinería</label
      >

      <input
        class="boton"
        type="submit"
        value="
      Registrarse"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",

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

.Registro {
  width: 400px;
  background: white;
  padding: 30px;
  padding-left: 700px;
  margin-bottom: 250px;
  font-family: calibri;
  color: black;
}

.Registro h2 {
  margin: 0;
  text-align: center;
  height: 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid;
  font-size: 20px;
}

.registrarse {
  width: 100%;
  margin-bottom: 15px;
  padding: 11px 10px;
  background: white;
  font-size: 14 px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid black;
}
.opcion {
  width: 15%;
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