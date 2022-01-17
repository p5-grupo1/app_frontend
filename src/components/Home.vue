<template>
<div class="containerhome">
  <div class="homesobre">
    <img src="../assets/undraw_playing_fetch_cm19_1.png" alt="">

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
    
  <div class="homesobre1">
    <img src="../assets/undraw_flowers_vx06_1.png" alt="">

    <h1>Objetivos de la pagina</h1>

    <p> Lograr que toda la comunidad de jardineros y paisajistas del país, puedan
        ofrecer sus servicios de manera rápida y eficiente con la ayuda de las herramientas
        tecnológicas. Además de permitir a clientes amantes a la jardinería encontrar personas
        capacitadas para realizar sus labores de jardinería y paisajismo. De acuerdo a sus
        preferencias y necesidades. 
    </p>
  </div>
</div>

</template>

<script>
export default {
  name: "Home",

  data: function () {},

  methods: {

      loadPost: function () {
      this.$router.push({ name: "createPost" });
    }
  },

  created: function () {},
};
</script>

<style>
.containerhome{
  margin-bottom: 40px;
}
.homesobre {
  height: 285px;
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px; 
  margin-bottom: 10px;
}

.homesobre h1 {
  font-size: 35px;
  text-align: right;
  padding-right: 20px;
  padding-top: 20px;
  margin: 0px;
}

.homesobre p{
  font-size: 22px;
  text-align: justify;
  padding: 25px;
  margin: 0;
}

.homesobre img{
  float: left;
  padding: 60px;
  width: 450px;
  margin-right: 20px;
}

/* other */

.homesobre1 {
  height: 300px;
  padding-top: 20px ;
  margin-top: 150px;
  margin-left: 25px;
  margin-right: 25px;  
  margin-bottom: 20px;  
}

.homesobre1 h1 {
  width: 50%;
  font-size: 35px;
  text-align: left;
  padding-left: 20px;
  margin: 0;
}

.homesobre1 p {
  font-size: 22px;
  text-align: justify;
  padding: 25px;
  margin: 0;
}

.homesobre1 img{
  margin: 0;
  float: right;
  width: 480px;
  height: 250px;
  margin-left: 50px;
}

</style>