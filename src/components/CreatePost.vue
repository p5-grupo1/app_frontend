<template>
  <div>
        <h1>Publicar un nuevo servicio</h1>
    <form id="createpost" v-on:submit.prevent="proccessPost" method="POST">
        <textarea required rows="4" cols="50" v-model="post.descripcionServicio" name="description" form="createpost" placeholder="Descripción del servicio"></textarea>
        <input required type="number" id="precio" v-model="post.precio" name="precio" placeholder="Precio">
        <input required type="text" id="ciudad" v-model="post.ciudad" name="ciudad" placeholder="Ciudad">
        <input required type="text" id="area" v-model="post.area" name="area" placeholder="Área">
        <input required type="text" id="foto" v-model="post.imagen" name="foto" placeholder="Enlazar una fotografía">
        <input type="submit">
        <input type="reset">
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  name: "CreatePost",

  data: function (){
    return{
      post: {
        "imagen": "",
        "username": localStorage.getItem("username"),
        "precio": 0,
        "descripcionServicio": "",
        "ciudad": "",
        "area": "",
      }
    }
  },

  methods: {
    proccessPost: async function(){
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

      await this.$apollo.mutate()(
        {
          mutation: gql`
            mutation Mutation($post: PostInput!) {
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
          variables: {
            post: this.post,
          }
        }
      )
      .then((result) => {
          console.log(result);
          alert("Servicio Creado de manera Correcta")
      })
      .catch((error) => {
          console.log(error);
          alert("Error Al crear el Post")
      })
    }
  },

  created: function () {},

};
</script>

<style>

</style>