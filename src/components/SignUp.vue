<template>
<div class="containerSigUp">
  <div class="imgSign">
    <img id="imagemain1" src="../assets/Group_2.png" alt="plant draw"/>
  </div>
  <div class="Registro">
    <form v-on:submit.prevent="processSignUp">
      <div>
      <h2>Registro</h2>
      </div>
      <div class="formsign">
        <label class="registrarse" for="nombreusuario">Nombre de usuario</label>
        <input class="registrarse" type="text" placeholder="Escoja un nombre de usuario" required
          v-model="user.username"/>
      </div>
      <div class="formsign">
        <label class="registrarse" for="contraseña">Contraseña</label>
        <input class="registrarse" type="password" placeholder="Contraseña" v-model="user.password" required />
      </div>
      <div class="formsign"> 
        <label class="registrarse" for="nombrecompleto">Nombre completo</label>
        <input class="registrarse" type="text" placeholder="Nombre y apellidos" v-model="user.nombre" required />
      </div>
      <div class="formsign">
        <label class="registrarse" for="correo">Correo electrónico</label>
        <input class="registrarse" type="email" placeholder="Dirección de correo electrónico" required 
      v-model="user.email"/>
      </div>
      <div class="formsign">
        <p>¿QUÉ DESEA HACER?</p>
      </div>
      <div class="formsign2">
        <input class="opcion" type="radio" name="escoger" v-model="user.rol_jardinero" value='true'/>
        <label class="opcion" for="jardinero">Deseo ofrecer mis servicios como jardinero</label>
      </div>
      <div class="formsign2">
        <input class="opcion" type="radio" name="escoger" v-model="user.rol_jardinero" value='false'/>
        <label class="opcion" for="jardinero">Deseo ser cliente</label>
      </div>
      <div class="botoncontain">
        <input class="boton1" type="submit" value="Registrarse"/>
      </div>
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
.containerSigUp{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3em;
  margin: 2em;
}

.imgSign{
  display: grid;
  grid-template-columns: 1fr;
  margin: auto 0 auto 0;
}

.imgSign img{
  max-width: 100%;
}

.Registro{
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 5em;
}

.Registro h2{
  text-align: center;
  font-size: 30px;
  margin: 1em;
}

.formsign{
  font-family: Arial, Helvetica, sans-serif;
  margin: auto auto 2em auto;
}

.formsign label{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  width: 95%;
  font-size: 20px;
  font-weight: bold;
}

.formsign input{
  font-family: Arial, Helvetica, sans-serif;
  padding: 0.3em;
  margin-top: 0.2em;
  width: 95%;
  height: 1.2em;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid black;
}

.formsign2{
  font-family: Arial, Helvetica, sans-serif;
  margin: auto auto 1em auto;
  font-size: 20px;
}

.boton1 {
  font-family: sans-serif;
  background: #ede6dc;
  border-radius: 0.5em;
  color: black;
  font-size: 22px;
  padding: 0.2em;
}

.boton1:hover{
  background: #93b677;
} 

</style>