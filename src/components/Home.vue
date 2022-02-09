<template>
<div class="containerhome">
  <div class="homesobre">
    <div class="imagehome1">
    <img src="../assets/undraw_playing_fetch_cm19_1.png" alt="">
    </div>

    <div>
    <h1>Información acerca de la pagina </h1>

    <p>Después de realizar un análisis a los sectores de trabajo
      que menos implementan herramientas tecnológicas,
      decidimos apoyar a jardineros y paisajistas para que
      estos pudieran compartir sus trabajos y servicios a la
      comunidad de manera fácil y efectiva. <br>
      Nuestra aplicación esta enfocada en todo tipo de
      publico amante a la naturaleza, desde las personas
      que tienen su pequeños jardines, hasta las grandes
      comunidades que tienen cientos de kilómetros en
      áreas verdes que deseen que están luzcan de manera
      increíble.
      También a aquellas personas que trabajen en esta
      área, desde aquellos que hacen pequeños e
      impecables trabajos de jardinería, hasta a aquellos
      que realizan obras de arte en áreas extensas.</p>
      </div>
  </div>
    
  <div class="homesobre1">
    <div>
    <h1>Objetivos de la pagina</h1>

    <p> Lograr que toda la comunidad de jardineros y paisajistas del país, puedan
        ofrecer sus servicios de manera rápida y eficiente con la ayuda de las herramientas
        tecnológicas. Además de permitir a clientes amantes a la jardinería encontrar personas
        capacitadas para realizar sus labores de jardinería y paisajismo. De acuerdo a sus
        preferencias y necesidades. 
    </p>
    </div>
    <div class="imagehome2">
    <img src="../assets/undraw_flowers_vx06_1.png" alt="">
    </div>
  </div>
</div>

</template>

<script>
import gql from 'graphql-tag';
import jwt_decode from 'jwt-decode';

export default {
  name: "Home",
  data: function() {
    return{
      userId: jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
      usernamelocal: localStorage.getItem("username") || "none",

      userDetailById: {
        "rol_jardinero": "",
      },
    }
  },
  apollo: {
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
    let rol = this.userDetailById.rol_jardinero
      localStorage.setItem('roluser', rol);
  },



  created: function() {
    this.$apollo.queries.userDetailById.refetch();
  },
};
</script>

<style>
.containerhome {
  display: grid;
  grid-template-rows: 2;
  gap: 2em;
  margin: 2em;
}

.homesobre {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 2em;
}

.homesobre img{
  max-width: 110%;
  float: left;
}

.imagehome1 {
  display: block;
  margin: auto 0 auto 0;
}

.homesobre h1 {
  font-size: 35px;
  text-align: right;
  padding-right: 20px;
  padding-top: 20px;
  margin: 0px;
}

.homesobre p{
  font-size: 25px;
  text-align: justify;
  padding: 1em;
  margin: 0;
}

.homesobre1 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: 4em;
  gap: 3em;
}

.homesobre1 h1 {
  font-size: 35px;
  text-align: left;
  padding-left: 20px;
  padding-top: 20px;
  margin: 0px;
}

.homesobre1 p{
  font-size: 25px;
  text-align: justify;
  padding: 1em;
  margin: 0;
}

.homesobre1 img{
  max-width: 110%;
  float: right;
}

.imagehome2 {
  display: block;
  margin: auto 0 auto 0;
}
</style>