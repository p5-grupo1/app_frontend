<template>
        <div id="principal">
        <h1>Información de la cuenta</h1>

        <div id="usr_profile" class="usr_profile">
            <img src="../assets/user.png"/>
            <h4>Nombre de usuario</h4>
            <h5>Rol de usuario</h5>
            <img src="../assets/edit.png"/>
        </div>

        <h3>POSTS CREADOS</h3>
        <div id="post" class="post">
            <!-- <img src="../src/assets/imagenpost.png" alt="Título del post"> -->
            <h4>Título del post</h4>
            <h5>Valor del servicio</h5>
            <h6>Descripción</h6>
            <img src="../assets/delete.png" alt="Eliminar Post">
            <img src="../assets/edit.png" alt="Editar Post">
        </div>
        <div id="addpost" class="addpost">
            <!-- <img src="addpost" alt="Agregar Post"> -->
            <h5>Crear Post</h5>
        </div>

        <h3>RESERVAS</h3>
        <div id="reserva" class="reserva">
            <h4>Título</h4>
            <h5>Ciudad</h5>
            <h6>Fecha</h6>
            <img src="../assets/delete.png" alt="Eliminar servicio">
        </div>
    </div>
</template>

<script>
export default {
  name: "GardenerProfile",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>

</style>