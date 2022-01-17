<template>
<div class="container">
    <img id="imagemain" src="../assets/undraw_environment_iaus_1.png" alt="" />

  <div class="login">
    <form v-on:submit.prevent="processLogInUser" method="POST">
      <h2>Iniciar sesión</h2>
      <label class="inisecion" for="nombreusuario">Nombre de usuario</label>
      <input class="inisecion" v-model="user.username" type="text" placeholder="Nombre de usuario" required />
      <label class="inisecion" for="contraseña">Contraseña</label>
      <input class="inisecion" v-model="user.password" type="password" placeholder="Contraseña" required />
      <input class="boton" type="submit" value="Ingresar" />
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

.container {
  margin: 15px;
  padding: 15px;
  display: flex;
}

#imagemain{
  margin-left: 60px;
  margin-right: 120px;
  margin-bottom: 30px;
  margin-top: 30px;
  height: 450px;
  width: 450px;
}

.login h2 {
  width: 85%;
  margin-top: 60px;
  text-align: center;
  height: 50px;
  margin-bottom: 35px;
  font-size: 30px;
}

.inisecion {
  width: 85%;
  margin-bottom: 15px;
  margin-top: 8px;
  padding: 15px 10px;
  background: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid black;

}

.login input{
  margin-bottom: 30px;
}

.boton {
  width: 40%;
  height: 35px;
  margin-left: 150px;
  background: #ede6dc;
  border-radius: 7px;
  color: black;
  margin-bottom: 19px;
  font-size: 20px;
  font-style: italic;
}

.boton:hover{
  background: #93b677;
}

</style>