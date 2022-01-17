<template>
  <div id="containerprofile">
    <div id="infoprofile">
      <h1>Información de la Cuenta</h1>
      <div id="info1">
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

      <div id="info2">
      <h4>Descripcion:</h4>
      <label>{{userDetailById.descripcion}}</label>

      <h4>Ciudad:</h4>
      <label>{{userDetailById.ciudad}}</label>

      <h4>Telefono:</h4>
      <label>{{userDetailById.telefono}}</label>
      <br>
      <i id="editbot" class="material-icons" style="font-size: 60px" v-on:click="preloadform()">edit</i>
      </div>
    </div>
      <!-- Parte de reservas -->

      
    <div id="reservprofile">
      <h4>RESERVAS</h4>
      <table class="table">
        <tr>
          <div v-for="reserva in ReservasByClient" :key="reserva.idReserva">
          <td><b>Id Reserva: </b>{{reserva.idReserva}}</td>
          <td><b>Cuenta Jardinero: </b>{{reserva.cuentaJardinero}}</td>
          <!-- <td>{{reserva.idPublicacion}}</td> -->
          <td><b>Cuenta Cliente: </b>{{reserva.cuentaCliente}}</td>
          <td><b>Fecha Reserva: </b>{{(new Date(reserva.fechaReserva)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(" ")[0]}}</td>
          <td><b>Hora Reserva: </b>{{(new Date(reserva.fechaReserva)).toLocaleString("es-ES", {timeZone:"America/Bogota"}).split(" ")[1]}}</td>
          <td><i class="material-icons" style="font-size:40px" v-on:click="preloadbutton(reserva.idReserva)">delete</i>
              <i class="material-icons" style="font-size:40px" v-on:click="loadpost(reserva.idPublicacion, reserva.cuentaJardinero)">visibility</i></td>
          </div>
        </tr>
      </table>           
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
      name: "",
      descrip: "",
      ciudad: "",
      telefono: "",
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
  methods: {
    loadpost: function(loadpost, jardin){
      let prueba = loadpost  
      localStorage.setItem('idPostLocal', prueba);
      let prueba1 = jardin
      localStorage.setItem('jardinName', prueba1);
      this.$router.push({ name: "post" });
    },

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
          this.$swal(JSON.stringify(formValues))
          this.updateinfo()
          this.$swal("Actualizado", "Informacion Actualizada", "success")
      } else {
        this.$swal("Cancelado", "Proceso Cancelado", "info")
      }
    },
/* Amante a la jardineria y sus derivaciones. */
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
  }
  }
};

</script>

<style>

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

.window {
  font-family: calibri;
  float: center;
  font-size: 20px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 5px;
  margin-top: 15px;
}

#containerprofile{
  margin: 0;
  padding: 50px;
}


#infoprofile{
  height: 450px;
  font-size: 20px;
  margin: 0px;
  margin-bottom: 50px;
  border-radius: 10px;
  border: 2px solid black;
}

#infoprofile h1{
  margin: 0;
  width: 100%;
  text-align: center;
  padding: 18px;
}

#info1{
  font-size: 22px;
  float: left;
  width: 48%;
  padding: 10px;
  margin: 0px;
}

#editbot{
  cursor: pointer;
}

#info1 label, h4, img{
  margin: 15px;
} 

#editbot {
  float: right;
  margin-top: 30px;
  margin-right: 50px;
}

#info2{
  font-size: 22px;
  float: right;
  width: 48%;
  padding: 10px;
}

#info2 label, h4{
  margin: 15px;
}

#info2 img{
  margin: 0px;
  height: 45px;
  float: right;
  padding: 13px;
}

#reservprofile {
  font-size: 20px;
  margin: 0px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid black;
}

#reservprofile h4{
  margin: 0px;
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 35px;
  font-style: italic;
}

#reservprofile i{
  cursor: pointer;
  margin: 0;
  float: right;
}

.table{
  width: 100%;
  margin-left: 8px;  
  margin-bottom: 15px;  
}

.table div{
  margin: 18px;
  width: 30%;
  background-image: radial-gradient(circle at 50% -20.71%, #fff964 0, #f5fa62 7.14%, #e0fb61 14.29%, #c9fb63 21.43%, #b0fa66 28.57%, #93f86a 35.71%, #70f570 42.86%, #3cf278 50%, #00ee81 57.14%, #00ea8d 64.29%, #00e79a 71.43%, #00e3a9 78.57%, #00e0b9 85.71%, #00ddca 92.86%, #00dadb 100%);
  font-size: 20px;
  border-radius: 10px;
  float: left;
}
.table td {
  width: 90%;
  padding: 10px;
  margin: 5px;
  float: left;
}

</style>