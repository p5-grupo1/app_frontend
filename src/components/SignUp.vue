<template>
<div class="container">
    <img id="imagemain1" src="../assets/Group_2.png" alt="plant draw"/>
  <div class="Registro">
    <form v-on:submit.prevent="processSignUp">
      <h2>Registro</h2>
      <label class="registrarse" for="nombreusuario">Nombre de usuario</label>
      <input class="registrarse" type="text" placeholder="Escoja un nombre de usuario" required
        v-model="user.username"/>

      <label class="registrarse" for="contraseña">Contraseña</label>
      <input class="registrarse" type="password" placeholder="Contraseña" v-model="user.password" required />

      <label class="registrarse" for="nombrecompleto">Nombre completo</label>
      <input class="registrarse" type="text" placeholder="Nombre y apellidos" v-model="user.nombre" required />

      <label class="registrarse" for="correo">Correo electrónico</label>
      <input class="registrarse" type="email" placeholder="Dirección de correo electrónico" required 
      v-model="user.email"/>

      <p>¿QUÉ DESEA HACER?</p>

      <input class="opcion" type="radio" name="escoger" v-model="user.rol_jardinero" value='true'/>
      <label class="opcion" for="jardinero">Deseo ofrecer mis servicios como jardinero</label>
      <br>
      <input class="opcion" type="radio" name="escoger" v-model="user.rol_jardinero" value='false'/>
      <label class="opcion" for="jardinero">Deseo ser cliente</label>

      <input class="boton" type="submit" value="Registrarse"/>
    </form>
  </div>
</div>
  
</template>



<script>
import gql from 'graphql-tag';
export default {
  name: "SignUp",

  data: function (){
    return {
      user: {
        "username": "",
        "password": "",
        "nombre":   "",
        "email":    "",
        "rol_jardinero": "",
        "ciudad": null,
        "telefono": null,
        "descripcion": null
      }
    }
  },

  computed: {},

  methods: {
    processSignUp: async function(){
      if(this.user.rol_jardinero == 'false'){
        this.user.rol_jardinero = false;
      } else {
        this.user.rol_jardinero = true;
      }
      await this.$apollo.mutate(
        {
          mutation: gql`
            mutation Mutation($userInput: SignUpInput){
              signUpUser(userInput: $userInput){
                refresh
                access
              }
            }
          `,
          variables:{
            userInput: this.user,
          },
        }
      ).then((result) => {
          let dataSignUp = {
            username      : this.user.username,
            пароль        : this.user.password,
            tokenRefresh  : result.data.signUpUser.refresh,
            tokenAccess   : result.data.signUpUser.access,
          };
          this.$emit("completedSignUp", dataSignUp);
      })
      .catch((error) => {
        console.log(error);
        this.$swal({
          title: 'Fallo en el registro. Intentelo de nuevo',
          icon: 'error'
        })
      });  
    }
  },

  created: function () {},
};

</script>

<style>


.Registro {
  margin-bottom: 40px;
  width: 40%;
  background: white;
  font-family: calibri;
  color: black;
}

.Registro h2 {
  font-size: 30px;
  margin: 0;
  text-align: center;
  height: 40px;
  margin-top: 25px;
  margin-bottom: 35px;
  border-bottom: 1px solid;
}

.registrarse {
  width: 100%;
  margin-bottom: 15px;
  padding: 11px 10px;
  background: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid black;
}

.Registro p{
  font-weight: bold;
  margin: 0;
  margin-bottom: 15px;
}

.opcion {
  margin: 0;
  width: 15%;
  font-size: 18px;
}

#imagemain1{
  margin-left: 60px;
  margin-right: 200px;
  margin-bottom: 10px;
  margin-top: 100px;
  height: 400px;
  width: 400px;
  
}

.Registro input{
  margin-bottom: 30px;
}
/* margin-bottom: 40px; */
</style>