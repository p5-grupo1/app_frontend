<template>
<div class="containerpost">
  <div class="descripcion">
    <div class="infopost">
		<img v-bind:src="postById.imagen" alt="Image referent post">

		
    <h3>Jardinero</h3>
    <label>{{postById.username}}</label>
    
    <h3>Descripcion Servicio</h3>
    <p>{{postById.descripcionServicio}}</p>

		<h3>Area</h3>
    <label>{{postById.area}}</label>

		<h3>Ciudad</h3>
    <label>{{postById.ciudad}}</label>

    <h3>Precio</h3>
    <label>{{postById.precio}} $</label>
    

    <h3>Fecha Publicacion</h3>
    <label>{{(new Date(postById.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(" ")[0]}} : 
          <i>{{(new Date(postById.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(" ")[1]}}</i></label>
    <br><br><br>
    

    <div id="botonclass">
      <button class="button-18" role="button">Reservar</button>
      <button class="button-19" role="button" v-on:click="back()">Volver</button> 
    </div>
    </div>

    <!-- informacion del Jardinero -->
  <div id="infouser">
    <h4>Informacion Del Jardinero</h4>
    <table id="tableinfo">
      <tr>
      <div v-for="infouser in userByUsername" :key="infouser.username">
      <td><b>Nombre del Jardinero:  </b>{{infouser.nombre}}</td>
      <td><b>Email:  </b>{{infouser.email}}</td>
      <td><b>Ciudad Residencia:  </b>{{infouser.ciudad}}</td>
      <td><b>Telefono:  </b>{{infouser.telefono}}</td>
      <td><b>Descripcion:  </b>{{infouser.descripcion}}</td>
      <td><b>Ver Todos Sus Servicios:</b><i class="material-icons" style="font-size:40px">visibility</i></td>
      </div>
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

    /* deletereserva: async function(){
      await this.$apollo.mutate(
        {
          
        }
      )
    }, */

  created: function(){
    this.$apollo.queries.PostById.refetch();
    this.$apollo.queries.userByUsername.refetch();
  }
}
};
</script>



<style>


.descripcion {
  padding: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 80px;
  margin-right: 80px;
}

.infopost{
  height: 555px;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-image: radial-gradient(circle at 50% -20.71%, #fff964 0, #f5fa62 7.14%, #e0fb61 14.29%, #c9fb63 21.43%, #b0fa66 28.57%, #93f86a 35.71%, #70f570 42.86%, #3cf278 50%, #00ee81 57.14%, #00ea8d 64.29%, #00e79a 71.43%, #00e3a9 78.57%, #00e0b9 85.71%, #00ddca 92.86%, #00dadb 100%);
  border: 2px solid black;
}


.infopost img{
  width: 600px;
  height: 480px;
  float: left;
  border-radius: 8px;
  margin-right: 40px;
}

.infopost  h3{
  text-align: left;
  font-size: 25px;
  margin: 0px;
  margin-top: 20px;
  margin-bottom: 8px;


}
.infopost  p{
  text-align: justify;
  font-size: 20px;
  margin: 0px;

}

.infopost  label{
  font-size: 20px;
  text-align: justify;  
  margin: 0px;
}


#infouser{
  margin-bottom: 15px;
  border-radius: 10px;
  background-image: radial-gradient(circle at 50% -20.71%, #fff964 0, #f5fa62 7.14%, #e0fb61 14.29%, #c9fb63 21.43%, #b0fa66 28.57%, #93f86a 35.71%, #70f570 42.86%, #3cf278 50%, #00ee81 57.14%, #00ea8d 64.29%, #00e79a 71.43%, #00e3a9 78.57%, #00e0b9 85.71%, #00ddca 92.86%, #00dadb 100%);
  border: 2px solid black;
}

#infouser h4{
  margin: 0px;
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 30px;
  font-style: italic;
}
#infouser i{
  cursor: pointer;
  margin: 0;
  float: right;
}

#tableinfo div{
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-right: 270px;
  margin-left: 270px; */
  width: 100%;
  font-size: 20px;
  border-radius: 10px;
  /* float:left; */
  text-align: center;
}

#tableinfo td {
  font-size: 23px;
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  float: left;
}

#botonclass{
  display: flex;
  align-items: center;
  justify-content: center;
  flex: center;
  width: 100%;
  align-items: center;
  height: 40px;
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