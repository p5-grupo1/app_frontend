<template>
<div class="containerServices">
    <div class="filters">
      <div class="seleccion">
        <select v-model="destinyCity" v-on:change="reloadFilter" name="ciudad" id="ciudad">
          <option value="all" selected>Ciudades Disponibles</option>
          <option v-for="city in postRecipientCiudad" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="seleccion2">
        <select name="area" id="area" v-model="area" v-on:change="reloadFilter">
          <option value="null">Areas Disponibles</option>
          <option value="Paisajismo">Paisajismo</option>
          <option value="Jardineria">Jardineria</option>
        </select>
      </div>
    </div>

      <div id="reservprofile" v-if="key == 0">
        <div class="containertitle">
          <h4>Publicaciones</h4>
        </div>
        <div class="containertable">
        <table class="table">
          <tr v-for="post in postByAll" :key="post.idPost">
              <td><img class="imgdata1" v-bind:src="post.imagen" alt="Image referent post"></td>
              <td><b>Jardinero: </b>{{post.username}}</td>
              <td><b>Descripcion Servicio: </b>{{post.descripcionServicio}}</td>
              <td><b>Area: </b>{{post.area}}</td>
              <td><b>Ciudad: </b>{{post.ciudad}}</td>
              <td><b>Precio: </b>$ {{(new Intl.NumberFormat('en-US').format(post.precio))}}</td>
              <td><b>Fecha Publicacion: </b><label>{{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(",")[0]}} : {{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(", ")[1]}}</label></td>
              <td><i class="material-icons" style="font-size:40px" v-on:click="loadpost(post.idPost, post.username)">visibility</i></td>
          </tr>
        </table>
        </div>           
      </div>

     <!-- Contenedor de Post Filtrados. -->
     <!-- post filtrado por Ocupacion -->
      <div id="reservprofile" v-if="key == 1">
        <div class="containertitle">
          <h4>Publicaciones</h4>
        </div>
        <div class="containertable">
        <table class="table">
          <tr v-for="post in postByArea" :key="post.idPost">
            <td><img class="imgdata1" v-bind:src="post.imagen" alt="Image referent post"></td>
            <td><b>Jardinero: </b>{{post.username}}</td>
            <td><b>Descripcion Servicio: </b>{{post.descripcionServicio}}</td>
            <td><b>Area: </b>{{post.area}}</td>
            <td><b>Ciudad: </b>{{post.ciudad}}</td>
            <td><b>Precio: </b>$ {{(new Intl.NumberFormat('en-US').format(post.precio))}}</td>
            <td><b>Fecha Publicacion: </b><label>{{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(",")[0]}} : {{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(", ")[1]}}</label></td>
            <td><i class="material-icons" style="font-size:40px" v-on:click="loadpost(post.idPost, post.username)">visibility</i></td>
          </tr>
        </table> 
        </div>          
      </div>

      <!-- post filtrado por Lugar -->
      <div id="reservprofile" v-if="key == 2">
        <div class="containertitle">
          <h4>Publicaciones</h4>
        </div>
        <div class="containertable">
        <table class="table">
          <tr v-for="post in postByLugar" :key="post.idPost"> 
              <td><img class="imgdata1" v-bind:src="post.imagen" alt="Image referent post"></td>
              <td><b>Jardinero: </b>{{post.username}}</td>
              <td><b>Descripcion Servicio: </b>{{post.descripcionServicio}}</td>
              <td><b>Area: </b>{{post.area}}</td>
              <td><b>Ciudad: </b>{{post.ciudad}}</td>
              <td><b>Precio: </b>$ {{(new Intl.NumberFormat('en-US').format(post.precio))}}</td>
              <td><b>Fecha Publicacion: </b><label>{{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(",")[0]}} : {{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(", ")[1]}}</label></td>
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

export default {
  name: "Services",
  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
      usernamelocal: localStorage.getItem("username") || "none",
      postByAll: [],
      postRecipientCiudad: [],
      destinyCity: "all",
      city: "",
      area: "null",
      key: 0,
      userDetailById: {
        "rol_jardinero": "",
      },

    }
  },

  apollo: {
    postByAll : {
      query: gql`
        query PostByAll {
          postByAll {
            idPost
            area
            imagen
            ciudad
            descripcionServicio
            fechaPublicacion
            precio
            username
            }
          }
      `,
      variables(){
        return{

        }
      }
    },

    postByLugar : {
      query: gql`
      query PostByLugar($ciudad: String!) {
        postByLugar(ciudad: $ciudad) {
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
          ciudad: this.destinyCity
        }
      }
    },

    postByArea : {
      query: gql`
      query PostByArea($area: String!) {
        postByArea(area: $area) {
          idPost
          area
          imagen
          ciudad
          descripcionServicio
          fechaPublicacion
          precio
          username
        }
      }
      `,
      variables(){
        return{
          area: this.area
        }
        
      }
    },

    postRecipientCiudad: {
      query: gql`
        query citiesRecipient {
          postRecipientCiudad
        }
      `,
      variables(){
        return{

        }
      }
    },
    userDetailById : {
    query: gql`
      query Query($userId: Int!){
        userDetailById(userId: $userId){
          rol_jardinero
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


  mounted(){
    this.$apollo.queries.postByAll.refetch();
    let rol = this.userDetailById.rol_jardinero
      localStorage.setItem('roluser', rol);
    },

  methods: {

    reloadFilter: function(){
      if(this.area == "null" && this.destinyCity == "all"){
        this.key = 0;
        this.$apollo.queries.postByAll.refetch();
      } else if(this.area != "null") {
        this.key = 1;
        this.$apollo.queries.postByArea.refetch();
      } else{
        this.key = 2;
        this.$apollo.queries.postByLugar.refetch();
      }
      },

    

    loadpost: function(loadpost, jardin){
      let prueba = loadpost  
      localStorage.setItem('idPostLocal', prueba);
      let prueba1 = jardin
      localStorage.setItem('jardinName', prueba1);
      this.$router.push({ name: "post" });
    },
  },

  created: function (){
    this.$apollo.queries.postByAll.refetch();
  },
};
</script>

<style>
.containerServices{
  display: grid;
  grid-template-rows: 1fr; 
  gap: 1em;
  margin: 2em;
}

.filters{
  display: grid;
  grid-template-columns: 1fr 1fr;  
}

.filters div{
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-columns: 1fr; 
}

.filters select{
  display: grid;
  grid-template-columns: 1fr; 
  font-family: Arial, Helvetica, sans-serif;
  max-width: 50%;
  height: 2em;
  border-radius: 0.8em;
  background-color: #ede6dc;
  font-size: 15px;
  margin: auto;
} 

.imgdata1 {
  height: 300px;
  width: 380px;
  max-width: 100%;            
  display:block;
  margin: 0.8em auto 0.2em auto;
  border-radius: 5px;
}


tr i{
  cursor: pointer;
  margin: 0em 0.2em 0em auto;
  float: right;
}

.containertable{
  margin-bottom: 2em;
}




</style>