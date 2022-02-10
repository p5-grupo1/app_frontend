<template>
  <div class="containerpersonal">
    <div id="infouser">
      <div class="containertitle">
        <h4>Informacion Del Jardinero {{userpost}}</h4>
      </div>
      <div class="containertable">
        <table class="tableinfo">
          <tr v-for="infouser in userByUsername" :key="infouser.username">
            <td><b>Nombre del Jardinero:  </b>{{infouser.nombre}}</td>
            <td><b>Email:  </b>{{infouser.email}}</td>
            <td><b>Ciudad Residencia:  </b>{{infouser.ciudad}}</td>
            <td><b>Telefono:  </b>{{infouser.telefono}}</td>
            <td><b>Descripcion:  </b>{{infouser.descripcion}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div id="reservprofile">
      <div class="containertitle">
        <h4>Servicios</h4> 
      </div>
      <div class="containertable">
        <table class="table">
          <tr v-for="post in postByUsername" :key="post.idPost">
            <td><img class="imgdata1" v-bind:src="post.imagen" alt="Image referent post" style="height: 200px; width: 310px"></td>
            <td><b>Área: </b>{{post.area}}</td>
            <td><b>Ciudad: </b>{{post.ciudad}}</td>
            <td><b>Descripción Servicio: </b>{{post.descripcionServicio}}</td>
            <td><b>Precio: </b>$ {{(new Intl.NumberFormat('en-US').format(post.precio))}}</td>
            <td><b>Publicadó: </b>{{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(",")[1]}} - 
            {{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(", ")[0]}}</td>
            <td><i class="material-icons" style="font-size:40px" v-on:click="loadpost(post.idPost, post.username)">visibility</i></td>
          </tr>
        </table>
      </div>              
    </div>
  </div>
</template>



<script>
import gql from 'graphql-tag';
import jwt_decode from 'jwt-decode';
export default{
    name: "PersonalPosts",
    data: function (){
        return{
            userId: jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
            usernamelocal: localStorage.getItem("username") || "none",
            userpost: localStorage.getItem("postu") || "none",
            postByUsername: [],
            userByUsername: [],
        }
    },

    apollo: {
    userByUsername : {
      query: gql`
      query UserByUsername($username: String!) {
        userByUsername(username: $username) {
          nombre
          email
          ciudad
          telefono
          descripcion
        }
      }
      `,
      variables(){
        return {
          username: this.userpost
        }
      }
    },

    postByUsername : {
    query: gql`
      query PostByUsername($username: String!) {
        postByUsername(username: $username) {
          idPost
          area
          ciudad
          imagen
          descripcionServicio
          fechaPublicacion
          precio
          username
        }
      }
      `,
      variables(){
        return{
          username: this.userpost,
        }
      }
    },
  },
  methods: {

    loadpost: function(loadpost, jardin){
      let prueba = loadpost  
      localStorage.setItem('idPostLocal', prueba);
      let prueba1 = jardin
      localStorage.setItem('jardinName', prueba1);
      this.$router.push({ name: "post" });
    },

  },

  created: function(){
      
  }
}




</script>



<style>

.containerpersonal{
  margin: 4em 3em 7em 3em;
}


</style>