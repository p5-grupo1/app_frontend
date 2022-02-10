<template>
<div class="containerabout">
  <div class="aboutsobre">
    <div class="imageabout1">
      <img src="../assets/undraw_hello_re_3evm_1.png" alt="" />
    </div>

    <div>
      <h1>Información acerca de lo creadores</h1>
      <p>
        Nuestro equipo de trabajo es un apasionado a la tecnologia, el desarrollo
        y la innovacion son nuestro combustible diario. Cada uno de los integrantes
        del equipo cuenta con habilidades y experiencia para desarrollar tareas concretas,
        que hacen que este proyecto se pueda llevar a cabo. <br>
        Mision Tic 2022 ha sido para nosotros una fuente de aprendizaje importante para nuestra
        evolucion como programadores, sin duda alguna este programa nos deja mas que maravillados 
        con este extenso mundo de la programacion. Esperamos que este proyecto sea de su agrado.
      </p>
    </div>
  </div>

  <div class="aboutsobre1">
    <div>
      <h1>Iniciativa del proyecto</h1>

      <p>
        El grupo de trabajo se reunio para buscar proyectos que generaran empleabilidad, 
        ademas de prestar un servicio especifico a la comunidad, discutimos cual es el area
        de empleo que menos se tiene en cuenta a la hora de emplear aplicacion web, y decidimos
        que el area de jardineria y paisajismo seria la indicada. A diario miles de personas aprenden
        o se envueven en esta area, muchos encuentran pocas oportunidades laborales y se frustran mucho,
        desde la perspectiva del cliente le es dificil encontrar una persona capacitada para realizar estos
        deberes, y recurren a viejas metodologias para encontrar el personal capacitado. <br>
        Con nuestra aplicacion web lo tendras todo al alcance de un Click.
      </p>
    </div>
    <div class="imageabout2">
      <img src="../assets/undraw_web_shopping_re_owap_1.png" alt="Imagen sobre">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "About",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>
.containerabout{
  display: grid;
  grid-template-rows: 2;
  gap: 1em;
  margin: 2em;
}

.aboutsobre {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 3em;
}

.imageabout1{
  display: block;
  margin: auto 0 auto 0;
}

.aboutsobre img {
  max-width: 110%;
  float: left;
}

.aboutsobre h1 {
  font-size: 35px;
  text-align: right;
  padding-right: 20px;
  padding-top: 20px;
  margin: 0px;
}

.aboutsobre p {
  font-size: 25px;
  text-align: justify;
  padding: 1em;
  margin: 0;
}


.aboutsobre1 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: 4em;
  gap: 3em;
}

.aboutsobre1 h1 {
  font-size: 35px;
  text-align: left;
  padding-left: 20px;
  padding-top: 20px;
  margin: 0px;
}

.aboutsobre1 p {
  font-size: 25px;
  text-align: justify;
  padding: 1em;
  margin: 0;
}

.aboutsobre1 img {
  max-width: 110%;
  float: right;
}

.imageabout2{
  display: block;
  margin: auto 0 auto 0;
}


</style>