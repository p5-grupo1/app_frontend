<template>
<div class="containerLogin">
  <div class="imgLog">
    <img src="../assets/undraw_environment_iaus_1.png" alt="" />
  </div>

  <div class="login">
    <form v-on:submit.prevent="processLogInUser" method="POST">
      <div>
        <h2>Iniciar sesión</h2>
      </div>
      <div class="inisecion1">
        <label class="inisecion" for="nombreusuario">Nombre de usuario</label>
        <input class="inisecion" v-model="user.username" type="text" placeholder="Nombre de usuario" required />
      </div>
      <div class="inisecion1">
        <label class="inisecion" for="contraseña">Contraseña</label>
        <input class="inisecion" v-model="user.password" type="password" placeholder="Contraseña" required />
      </div>
      <div class="botoncontain">
        <input class="boton" type="submit" value="Ingresar" />
      </div>
    </form>
  </div>
</div>
  
</template>

<script>
import gql from 'graphql-tag';
export default {
  name: "Login",

  data: function (){
    return {
      user: {
        username:"",
        password:""
      }
    }
  },

  methods: {
    processLogInUser: async function(){
      await this.$apollo.mutate(
        {
          mutation: gql`
            mutation LogIn($credentials: CredentialsInput!){
              logIn(credentials: $credentials){
                refresh
                access
              }
            }
          `,
          variables:{
            credentials: this.user,
          }
        }
      )
      .then((result) => {
          let dataLogin = {
            username      : this.user.username,
            пароль        : this.user.password,
            tokenRefresh  : result.data.logIn.refresh,
            tokenAccess   : result.data.logIn.access,
          };
          this.$emit("completedLogIn", dataLogin);
      })
      .catch((error) => {
        console.log(error);
        this.$swal({
          title: 'Credenciales Incorrectas',
          icon: 'error'
        })
      }); 
    }
  },

  created: function () {},
};
</script>

<style>

.containerLogin {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3em;
  margin: 2em;
}

.imgLog{
  display: grid;
  grid-template-columns: 1fr;
  margin: auto 0 auto 0;
}

.imgLog img {
  max-width: 110%;
}

.login {
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 4em;
}

.login h2 {
  text-align: center;
  font-size: 30px;
  margin: 1.5em auto 2em auto;
}

.inisecion1{
  font-family: Arial, Helvetica, sans-serif;
 /*  margin: auto auto 2em auto; */
  margin: 2.5em;
}

.inisecion1 label{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  width: 95%;
  font-size: 20px;
  font-weight: bold;
}


.inisecion1 input{
  font-family: "Raleway", "Arial", sans-serif;
  /* font-family: Arial, Helvetica, sans-serif; */
  padding: 0.3em;
  margin-top: 0.5em;
  width: 95%;
  height: 1.2em;
  font-size: 18px;
  border: none;
  border-bottom: 1px solid black;
}

/* boton */

.botoncontain{
  display: flex;
  justify-content: center;
}

.boton {
  background: #ede6dc;
  border-radius: 0.5em;
  color: black;
  font-size: 22px;
  padding: 0.2em;
}

.boton:hover{
  background: #93b677;
} 

</style>