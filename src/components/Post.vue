<template>
<div class="containerpost">
  <div class="descripcionpost">
    <div class="imageinfo">
      <div class="imagecontainerpost">
        <img v-bind:src="postById.imagen" alt="Image referent post">
      </div>

      <div class="infocontent">
        <h3>Jardinero</h3>
        <label>{{postById.username}}</label>
        
        <h3>Descripcion Servicio</h3>
        <p>{{postById.descripcionServicio}}</p>

        <h3>Area</h3>
        <label>{{postById.area}}</label>

        <h3>Ciudad</h3>
        <label>{{postById.ciudad}}</label>

        <h3>Precio</h3>
        <label>{{(new Intl.NumberFormat('en-US').format(postById.precio))}} $</label>
        
        <h3>Fecha Publicacion</h3>
        <label>{{(new Date(postById.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(",")[0]}} : 
              <i>{{(new Date(postById.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(", ")[1]}}</i></label>
      </div>
    </div>

    <div id="botonclass">
      <button class="button-18" role="button" v-if="rol == 'false'" v-on:click="reservar()">Reservar</button>
      <button class="button-19" role="button" v-on:click="back()">Volver</button> 
    </div>
  </div>

    <!-- informacion del Jardinero -->
  <div id="infouser">
    <div class="containertitle">
      <h4>Informacion Del Jardinero</h4>
    </div>
    <div class="containertable">
      <table class="tableinfo">
        <tr v-for="infouser in userByUsername" :key="infouser.username">
          <td><b>Nombre del Jardinero:  </b>{{infouser.nombre}}</td>
          <td><b>Email:  </b>{{infouser.email}}</td>
          <td><b>Ciudad Residencia:  </b>{{infouser.ciudad}}</td>
          <td><b>Telefono:  </b>{{infouser.telefono}}</td>
          <td><b>Descripcion:  </b>{{infouser.descripcion}}</td>
          <td><b>Ver Todos Sus Servicios:</b><i class="material-icons" style="font-size:40px" v-on:click="loadPersonalPosts(postById.username)">visibility</i></td>
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
  name: "Post",
  data: function (){
    return {
      userId: jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
      usernamelocal: localStorage.getItem("username") || "none",
      postLocal: localStorage.getItem("idPostLocal") || "none",
      jardinLocal: localStorage.getItem("jardinName") || "none",
      rol: localStorage.getItem("roluser") || "none",

      PostById: {
        area: "",
        ciudad: "",
        imagen: "",
        descripcionServicio: "",
        fechaPublicacion: "",
        precio: 0,
        username: "",
      },
      userByUsername: [],
    }
  },
  apollo: {
    postById : {
      query: gql`
      query PostById($idPost: String!) {
        postById(idPost: $idPost) {
          username
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
        return {
          idPost: this.postLocal,
        }
      }
    },

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
          username: this.jardinLocal,
        }
      }
    }
  },
  
  methods: {
    back: function (){
      this.$router.push({ name: "services" });
    },

    loadPersonalPosts: function (user){
      localStorage.setItem('postu', user);
      this.$router.push({ name: "PersonalPosts" });
    },

    reservar: async function(){ 
      
      await this.$apollo.mutate(
        {
          mutation: gql`
            mutation Mutation($reservas: ReservasInput!) {
              ReservasCreate(reservas: $reservas)
            }
          `,
          variables:{
            reservas: {
              "cuentaJardinero": this.jardinLocal,
              "idPublicacion": this.postLocal,
              "cuentaCliente": this.usernamelocal,
            }
          }
        })
        .then((result) => {
          this.$swal("Reservado", "Servicio Reservado", "success");
        })
        .catch((error) => {
          this.$swal("Error", "Su reserva ya ha sido creada anteriormente", "error");
          return;
        })
    },

  created: function(){
    this.$apollo.queries.PostById.refetch();
    this.$apollo.queries.userByUsername.refetch();
  }
}
};
</script>


<style>

.containerpost{
  display: grid;
  grid-template-rows: 1fr; 
  gap: 3em;
  margin: 2em;
}

.descripcionpost{
  display: grid;
  grid-template-rows: repeat(2,auto);
  border-radius: 10px;
  border: 2px solid black;
  font-size: 25px;
}

.imageinfo{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 0.8em;
}


.imagecontainerpost{
  display:block;
  margin: auto;
  padding: 1em;
}

.imagecontainerpost img{
  width: 600px;
  height: 480px;
  max-width: 100%;
  border-radius: 1em;
}

.infocontent{
  padding: 1em;
  margin: 0px;
}

.infocontent h3{
  font-size: 25px;
  margin: 0px;
  margin-bottom: 0.2em;
  margin-top: 0.8em;
}

.infocontent label{
  text-align: justify;
  font-size: 22px;
  margin: 0px;
  margin-top: 1em;
}

.infocontent p{
  text-align: justify;
  font-size: 22px;
  margin: 0px;
} 

#infouser{
  display: grid;
  grid-template-rows: repeat(2,auto);
  margin-bottom: 3em;
  border-radius: 10px;
  border: 2px solid black;
}

.tableinfo{
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 1em;
}

.tableinfo tr{
  display: grid;
  grid-template-columns: repeat(2, auto);
  font-size: 24px;
  border-radius: 10px;
}

.tableinfo td{
  padding: 0.5em;
} 

#botonclass{
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 0.5em auto 0.5em auto;
}


/* CSS */
.button-18 {
  margin: 5px;
  align-items: center;
  background-color: #006eff;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
}

.button-18:hover,
.button-18:focus, .button-19:hover, .button-19:focus { 
  background-color: #16437E;
  color: #ffffff;
}

.button-18:active, .button-19:active {
  background: #09223b;
  color: rgb(255, 255, 255, .7);
}

.button-18:disabled, .button-19:disabled { 
  cursor: not-allowed;
  background: rgba(0, 0, 0, .08);
  color: rgba(0, 0, 0, .3);
}

.button-19{
  margin: 5px;
  align-items: center;
  background-color: #000000;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 480px;
  min-height: 40px;
  min-width: 0px;
  overflow: hidden;
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  user-select: none;
  -webkit-user-select: none;
}

</style> 