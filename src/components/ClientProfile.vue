<template>
  <div class="containerprofile">
    <div class="infoprofile">
      <div class="infotitle">
        <h4>Informacion del perfil</h4>
      </div>
      <div class="containerallinfo">
        <div>
          <h4>Nombre de usuario:</h4>
          <label>{{userDetailById.nombre}}</label>

          <h4>Username:</h4>
          <label>{{userDetailById.username}}</label>

          <h4>Email:</h4>
          <label>{{userDetailById.email}}</label>

          <h4>Rol de usuario:</h4>
          <template v-if="userDetailById.rol_jardinero == false">
            <label>Cliente</label>
          </template>
          <template v-else>
            <label>Jardinero</label>
          </template>
        </div>
        <div>
          <h4>Descripcion:</h4>
          <label>{{userDetailById.descripcion}}</label>

          <h4>Ciudad:</h4>
          <label>{{userDetailById.ciudad}}</label>

          <h4>Telefono:</h4>
          <label>{{userDetailById.telefono}}</label>
          <div  class="botoncontainer">
          <td><i id="editbot" class="material-icons" style="font-size: 60px" v-on:click="preloadform()">edit</i></td>
          </div>
        </div>
      </div>
    </div>

      <!-- Parte de reservas valido: Clientes -->

    <div class="reservprofile" v-if="userDetailById.rol_jardinero == false">
      <div class="containertitle">
      <h4>Reservas</h4>
      </div>
      <div class="containertable">
      <table class="table">
        <tr v-for="reserva in ReservasByClient" :key="reserva.idReserva">
          <td><b>Id Reserva: </b>{{reserva.idReserva}}</td>
          <td><b>Cuenta Jardinero: </b>{{reserva.cuentaJardinero}}</td>
          <td><b>Cuenta Cliente: </b>{{reserva.cuentaCliente}}</td>
          <td><b>Fecha Reserva: </b>{{(new Date(reserva.fechaReserva)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(",")[0]}}</td>
          <td><b>Hora Reserva: </b>{{(new Date(reserva.fechaReserva)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(", ")[1]}}</td>
          <td><i class="material-icons" style="font-size:40px" v-on:click="preloadbutton(reserva.idReserva)">delete</i>
              <i class="material-icons" style="font-size:40px" v-on:click="loadpost(reserva.idPublicacion, reserva.cuentaJardinero)">visibility</i></td>
        </tr>
      </table>
      </div>           
    </div>

    <!-- Parte de posts  valido: Jardineros-->
    <div class="reservprofile" v-if="userDetailById.rol_jardinero == true">  
      <div class="containertitle">
        <h4>Servicios </h4> 
        <i id="botonclassnew" class="material-icons" style="font-size:60px; margin: 0px; margin-right: 20px;" v-on:click="preloadformpost()">addchart</i>
      </div>

      <div class="containertable">
      <table class="table">
        <tr v-for="post in postByUsername" :key="post.idPost">
            <td><img class="imgdata" v-bind:src="post.imagen" alt="Image referent post" style="height: 200px; width: 310px"></td>
            
              <td><b>Área: </b>{{post.area}}</td>
            
              <td><b>Ciudad: </b>{{post.ciudad}}</td>
           
              <td><b>Descripción Servicio: </b>{{post.descripcionServicio}}</td>
            
              <td><b>Precio: </b>$ {{(new Intl.NumberFormat('en-US').format(post.precio))}}</td>
            
              <td><b>Publicadó: </b>{{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(",")[1]}} - 
                  {{(new Date(post.fechaPublicacion)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(", ")[0]}}</td>
              <td><i class="material-icons" style="font-size:40px" v-on:click="preloadbuttonpost(post.idPost)">delete</i>
                  <i class="material-icons" style="font-size:40px" v-on:click="formpostupdate(post.idPost, post.ciudad, post.area, post.descripcionServicio, post.username, post.precio, post.imagen)">edit</i>
                  <i class="material-icons" style="font-size:40px" v-on:click="loadpost(post.idPost, post.username)">visibility</i>
                  </td>
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
  name: "ClientProfile",

  data: function (){
    return {
      userId: jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
      usernamelocal: localStorage.getItem("username") || "none",
      пароль: localStorage.getItem("пароль" || "none"),

      userDetailById: {
        "username": "",
        "nombre": "",
        "email": "",
        "rol_jardinero": "",
        "descripcion": "",
        "ciudad": "",
        "telefono": "",
      },
      ReservasByClient: [],
      postByUsername: [],
      name: "", descrip: "",  ciudad: "", telefono: "",
      parea: "", pciudad: "", pdescripcion: "", pprecio:0, pimagen:"",
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
          username: this.usernamelocal,
        }
      }
  },

  ReservasByClient : {
    query: gql`
    query ReservasByClient($cuentaCliente: String!) {
    ReservasByClient(cuentaCliente: $cuentaCliente) {
      idReserva
      cuentaJardinero
      idPublicacion
      cuentaCliente
      fechaReserva
          }
        }
      `,
      variables(){
        return {
          cuentaCliente: this.usernamelocal,
        }
      }
    }
},

  mounted(){
    loadprofile();
    this.$apollo.queries.ReservasByClient.refetch();
    this.$apollo.queries.postByUsername.refetch();
    this.$apollo.queries.postByUsername.refetch();

    },

  methods: {

    loadprofile: function(){
      let rol = this.userDetailById.rol_jardinero
      localStorage.setItem('roluser', rol);
    },

    loadpost: function(loadpost, jardin){  
      let prueba = loadpost  
      localStorage.setItem('idPostLocal', prueba);
      let prueba1 = jardin
      localStorage.setItem('jardinName', prueba1);
      this.$router.push({ name: "post" });
    },

    /* Formulario actualizacion datos del usuario */
    preloadform: async function(){
      const { value: formValues } = await this.$swal({
        title: 'Formulario de Actualizacion',
        html:
          '<label class="lavel">Nombre del Usuario</label>' +
          '<input id="swal-input1" class="window" placeholder="Nombre del usuario">' +
          '<br>' +
          '<label class="lavel">Descripcion</label>' +
          '<textarea id="swal-input2" rows="5" cols="21" class="window"></textarea>' +
          '<br>' +
          '<label class="lavel">Ciudad</label>' +
          '<input id="swal-input3" class="window" placeholder="Ciudad">' +
          '<br>' +
          '<label class="lavel">Telefono</label>' +
          '<input id="swal-input4" class="window" placeholder="Telefono">',
          
        focusConfirm: false,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        preConfirm: () => {
          return [
            this.name = document.getElementById('swal-input1').value,
            this.descrip = document.getElementById('swal-input2').value,
            this.ciudad = document.getElementById('swal-input3').value,
            this.telefono = document.getElementById('swal-input4').value,
          ]
        }
      })
      if(formValues){
          this.updateinfo()
          this.$swal("Actualizado", "Informacion Actualizada", "success")
      } else {
        this.$swal("Cancelado", "Proceso Cancelado", "info")
      }
    },

    updateinfo: async function(){
      await this.proccessInfo()
      if(localStorage.getItem("tokenAccess")!="" && localStorage.getItem("tokenAccess")!=null) {
      if(this.name == ''){
        this.name = this.userDetailById.nombre;
      } 
      if(this.descrip == ''){
        this.descrip = this.userDetailById.descripcion;
      } 
      if(this.ciudad == ''){
        this.ciudad = this.userDetailById.ciudad;
      }
      if(this.telefono == ''){
        this.telefono = this.userDetailById.telefono;
      }
      await this.$apollo.mutate(
        {
          mutation: gql`
          mutation UpdateUser($user: UserUpdate!) {
            updateUser(user: $user) {
              id
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
          variables:{
            user: {
              "id": this.userId,
              "username": this.usernamelocal,
              "password": this.пароль,
              "nombre": this.name,
              "email": this.userDetailById.email,
              "rol_jardinero": this.userDetailById.rol_jardinero,
              "descripcion": this.descrip,
              "ciudad": this.ciudad,
              "telefono": this.telefono,
            }
          }
        }
      ).then((result) => {
      })
      .catch((error) => {
      })
      }
      this.$apollo.queries.userDetailById.refetch();
    },


    /* Formulario de Creacion Servicio */
    preloadformpost: async function(){
      const { value: formValues } = await this.$swal({
        title: 'Crear Servicio',
        html:
          '<label class="lavel">Area</label>' +
          '<div class="lavel">' +
          '<select class="select-css" name="area" id="swal-input1">' +
          '<option value="Paisajismo">Paisajismo</option>' +
          '<option value="Jardineria">Jardineria</option>' +
          '</select>' +
          '</div>' +
          '<br>' +
          '<label class="lavel">Descripcion</label>' +
          '<textarea id="swal-input2" rows="5" cols="21" class="window" required></textarea>' +
          '<br>' +
          '<label class="lavel">Ciudad</label>' +
          '<input id="swal-input3" class="window" placeholder="Ciudad" required>' +
          '<br>' +
          '<label class="lavel">Precio</label>' +
          '<input id="swal-input4" class="window" placeholder="Precio" required>' +
          '<br>' +
          '<label class="lavel">Link Imagen</label>' +
          '<input id="swal-input5" class="window" placeholder="Url" required>',
          
        focusConfirm: false,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        preConfirm: () => {
          return [
            this.parea = document.getElementById('swal-input1').value,
            this.pdescripcion = document.getElementById('swal-input2').value,
            this.pciudad = document.getElementById('swal-input3').value,
            this.pprecio = document.getElementById('swal-input4').value,
            this.pimagen = document.getElementById('swal-input5').value,
          ]
        }
      })
      if(formValues){
          await this.createpost();
      } else {
        this.$swal("Cancelado", "Proceso Cancelado", "info")
      }
    },

    createpost: async function(){
      await this.proccessInfo()
      if(localStorage.getItem("tokenAccess")!="" && localStorage.getItem("tokenAccess")!=null) {
      await this.$apollo.mutate(
        {
          mutation: gql`
            mutation CreatePost($post: PostInput!) {
            postCreate(post: $post) {
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
          variables:{
            post: {
              "area": this.parea,
              "ciudad": this.pciudad,
              "descripcionServicio": this.pdescripcion,
              "precio": parseInt(this.pprecio),
              "username": this.usernamelocal,
              "imagen": this.pimagen
            }
          }
        }
      ).then((result) =>{
          this.$swal("Creado", "Servicio Creado", "success")
        return;
      }). catch((error) =>{
        alert(error)
        return;
      })
       this.$apollo.queries.postByUsername.refetch();
    }
    },

    /* Funcion para formulario de actualizacion del Servicio */

    formpostupdate: async function(id_, city, area, descrip, username, price, image){
      const { value: formValues } = await this.$swal({
        title: 'Editar Servicio',
        html:
          '<label class="lavel">Area</label>' +
          '<div class="lavel">' +
          '<select class="select-css" name="area" id="swal-input1">' +
          '<option value="Paisajismo">Paisajismo</option>' +
          '<option value="Jardineria">Jardineria</option>' +
          '</select>' +
          '</div>' +
          '<br>' +
          '<label class="lavel">Descripcion</label>' +
          '<textarea id="swal-input2" rows="5" cols="21" class="window" required></textarea>' +
          '<br>' +
          '<label class="lavel">Ciudad</label>' +
          '<input id="swal-input3" class="window" placeholder="Ciudad" required>' +
          '<br>' +
          '<label class="lavel">Precio</label>' +
          '<input id="swal-input4" class="window" placeholder="Precio" required>' +
          '<br>' +
          '<label class="lavel">Link Imagen</label>' +
          '<input id="swal-input5" class="window" placeholder="Url" required>',
          
        focusConfirm: false,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('swal-input3').value,
            document.getElementById('swal-input4').value,
            document.getElementById('swal-input5').value,         
          ]
        }
      })
      if(formValues){
          if(document.getElementById('swal-input1').value === ''){
            this.parea = area;
          } else {
            this.parea = document.getElementById('swal-input1').value;
          }
          if(document.getElementById('swal-input2').value === ''){
            this.pdescripcion = descrip;
          } else {
            this.pdescripcion = document.getElementById('swal-input2').value;
          }
          if(document.getElementById('swal-input3').value === ''){
            this.pciudad = city;
          } else {
            this.pciudad = document.getElementById('swal-input3').value;
          }
          if(document.getElementById('swal-input4').value === ''){
            this.pprecio = price;
          } else {
            this.pprecio = document.getElementById('swal-input4').value;
          }
          if(document.getElementById('swal-input5').value === ''){
            this.pimagen = image;
          } else {
            this.pimagen = document.getElementById('swal-input5').value
          }
          await this.updateservicio(id_, username);
      } else {
        this.$swal("Cancelado", "Proceso Cancelado", "info")
      }
    },

    updateservicio: async function(id_, username){
        await this.$apollo.mutate(
          {
          mutation: gql`
            mutation Mutation($post: PostUpdate) {
              postUpdateInput(post: $post) {
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
          variables: {
            post: {
              "idPost": id_,
              "ciudad": this.pciudad,
              "area": this.parea,
              "descripcionServicio": this.pdescripcion,
              "username": username,
              "precio": parseInt(this.pprecio),
              "imagen": this.pimagen,
              }
            }
          }
        ).then((result) =>{
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
        this.$apollo.queries.postByUsername.refetch();
    },


    /* Alerta de Eliminacion de reserva */
    preloadbutton: async function(id_){
          this.$swal({
        title: '¿Esta seguro de borrar la reserva?',
        type: "warning",
        icon: "question",
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3885d6',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if(result.value){
        this.deleteReservas(id_)
        this.$swal("Eliminado", "La reserva ha sido eliminada", "success")
      } else {
        this.$swal("Cancelado", "Proceso Cancelado", "info")
      }
      })
    },

    deleteReservas: async function(id_){
      await this.proccessInfo()
      if(localStorage.getItem("tokenAccess")!="" && localStorage.getItem("tokenAccess")!=null) {
      await this.$apollo.mutate(
        {
          mutation: gql`
            mutation ReservasDelete($idReserva: Int!) {
              ReservasDelete(idReserva: $idReserva)
                }
          `,
          variables: {
            idReserva: id_
          }
        }
      )
      .then((result) => {
      })
      .catch((error) => {
      })
      }
      this.$apollo.queries.ReservasByClient.refetch();
    },


    /* Alerta de Eliminacion de Servicio */
     preloadbuttonpost: async function(id_){
          this.$swal({
        title: '¿Esta seguro de borrar el Servicio?',
        type: "warning",
        icon: "question",
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3885d6',
        showLoaderOnConfirm: true
      }).then(async (result) => {
        if(result.value){
        this.deletePost(id_)
      } else {
        this.$swal("Cancelado", "Proceso Cancelado", "info")
      }
      })
    },

    deletePost: async function(id_){
      await this.proccessInfo()
      if(localStorage.getItem("tokenAccess")!="" && localStorage.getItem("tokenAccess")!=null) {
      await this.$apollo.mutate(
        {
          mutation: gql`
            mutation Mutation($idPost: String!) {
              postDelete(idPost: $idPost)
            }
          `,
          variables: {
            idPost: id_
          }
        }
      ).then((result) => {
        this.$swal("Eliminado", "El Servicio ha sido eliminado", "success")
        this.$apollo.queries.postByUsername.refetch();
      })
      .catch((error) => {
      })
      this.$apollo.queries.postByUsername.refetch();
      }
    },


    /* Funcion para la verificacion del Token del usuario */
    proccessInfo: async function(){
      if(localStorage.getItem("tokenRefresh") === null || localStorage.getItem("tokenAccess") === null){
        this.$emit("logOut");
        return;
      }
      localStorage.setItem("tokenAccess", "");
      await this.$apollo.mutate(
        {
        mutation: gql`
          mutation RefreshToken($token: Refresh!) {
          refreshToken(token: $token) {
            access
          }
        }
        `,
        variables: {
          token: {
            refresh: localStorage.getItem("tokenRefresh"),
          }
        }
      }
      )
      .then((result) =>{
          localStorage.setItem("tokenAccess", result.data.refreshToken.access);
      })
      .catch((error) => {
          console.log(error)
          this.$emit("logOut");
          return;
      })
  },

   created: function(){
    this.$apollo.queries.ReservasByClient.refetch();
    this.$apollo.queries.userDetailById.refetch();
    this.$apollo.queries.postByUsername.refetch();
    
  },
}
};
</script>

<style>
/* Ventanas adicionales */
.lavel {
  font-family: calibri;
  width: 40%;
  float: left;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  margin-top: 20px;
}

.select-css {
  display: block;
  font-size: 16px;
  font-family: 'Verdana', sans-serif;
  font-weight: 400;
  color: #444;
  padding: .4em 1.4em .3em .8em;
  width: 400px;
  max-width: 143%; 
  border-radius: .3em;
  background-color: #fff;
} 

.window {
  font-family: calibri;
  float: center;
  font-size: 20px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 5px;
  margin-top: 15px;
}

/* Seccion general*/

.containerprofile{
  display: grid;
  grid-template-rows: 1fr; 
  gap: 3em;
  margin: 2em;
}


/* Seccion info perfil */

.infoprofile{
  display: grid;
  grid-template-rows: repeat(2,auto);
  border-radius: 10px;
  border: 2px solid black;
  font-size: 25px;
}


.containerallinfo{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1em;
}

.containerallinfo div{
  display: grid;
  grid-template-rows: auto;
  margin: 0px;
}

.infotitle h4{
  margin: 0.2em auto 0.2em auto;
  text-align: center;
  font-size: 45px;
  font-style: italic;
}

.containerallinfo label{
  margin: 0.1em auto 1em 0.2em;
} 

.containerallinfo h4{
 margin: 0.2em auto 0.2em 0.2em;

} 

.infoprofile div{ 
  margin: 0.5em;
  padding: 0.2em;
}

#editbot{
  float: right;
  cursor: pointer;
  margin: 0px;
}



/* contenedores para reservas y servicios */

.reservprofile{
  display: grid;
  grid-template-rows: repeat(2,auto);
  gap: 0.5em;
  border-radius: 10px;
  border: 2px solid black;
  font-size: 25px;
  margin-bottom: 3em;
} 


.containertitle h4{
  margin: 0.5em auto 0.2em auto;
  text-align: center;
  font-size: 45px;
  font-style: italic;
}


.containertable{
  display: grid;
  grid-template-columns: repeat(1,1fr);
  padding: 1em;

}

.table{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 2em;
  margin-bottom: 1em;
}

.table tr{
  display: grid;
  grid-template-columns: 1fr;
  background-color: #ede6dc;
  font-size: 22px;
  border-radius: 10px;
  float: left;
}

.table td{
  padding: 0.5em;
  float: left;
} 

.imgdata {
  max-width: 100%;
  display:block;
  margin: 0.8em auto 0.2em auto;
  border-radius: 5px;
}

.reservprofile i{
  cursor: pointer;
  margin: 0;
  float: right;
}
</style>
