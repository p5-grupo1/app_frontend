<template>
      <div id="principal">
        <h1>Información de la cuenta</h1>

        <div id="usr_profile" class="usr_profile">
            <img src="../assets/user.png"/>
            <h4>Nombre de usuario</h4>
            <h5>Rol de usuario</h5>
            <img src="../assets/edit.png" alt="Editar">
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
  name: "ClientProfile",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>

</style>