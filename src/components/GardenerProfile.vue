<template>
        <div id="principal">
        <h1>Información de la cuenta</h1>

        <div id="usr_profile" class="usr_profile">
            <img src="../assets/user.png"/>
            <h4>Nombre de usuario</h4>
            <label>{{userDetailById.nombre}}</label>

            <h4>Username: </h4>
            <label>{{userDetailById.username}}</label>

            <h4>Email: </h4>
            <label>{{userDetailById.email}}</label>
            
           <h4>Rol de usuarioHola: </h4>
            <label>{{rol}}</label>

            <h4>Descripcion: </h4>
            <label>{{userDetailById.descripcion}}</label>

            <h4>Ciudad: </h4>
            <label>{{userDetailById.ciudad}}</label>

            <h4>Telefono: </h4>
            <label>{{userDetailById.telefono}}</label>

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
import gql from 'graphql-tag';
import jwt_decode from 'jwt-decode';
export default {
  name: "GardenerProfile",

  data: function (){
      return {
      userId: jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
      userDetailById: {
        username: "",
        nombre: "",
        email: "",
        rol_jardinero: null,
        rol: "",
        descripcion: "",
        ciudad: "",
        telefono: ""
      }
    }
  },
  apollo: {
  userDetailById : {
    query: gql`
      query Query($userId: Int!){
        userDetailById(userId: $userId){
          username
          nombre
          email
          rol_jardinero
          descripcion
          ciudad
          telefono
        }
      }
      `,
      variables(){
        return {
          userId: this.userId,
        }
      }
    }
  },

  methods: {},

  created: function(){
  },
};
</script>

<style>

</style>