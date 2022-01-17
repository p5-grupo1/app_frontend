<template>
<div class="containerabout">
  <div class="aboutsobre">
    <img src="../assets/undraw_hello_re_3evm_1.png" alt="" />

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
  <div class="aboutsobre1">
    <img src="../assets/undraw_web_shopping_re_owap_1.png" alt="Imagen sobre">

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
  margin-bottom: 80px;
}
.aboutsobre {
  height: 300px;
  margin-top: 40px;
  margin-left: 25px;
  margin-right: 25px;  
}

.aboutsobre h1 {
  font-size: 35px;
  text-align: right;
  padding-right: 20px;
  margin: 0;
}

.aboutsobre p {
  margin: 0;
  font-size: 22px;
  text-align: justify;
  padding: 25px;
}

.aboutsobre img {
  float: left;
  padding: 50px;
  width: 500px;
  margin-top: 25px;
  margin-right: 10px;
}

/* other */

.aboutsobre1 {
  height: 420px;
  text-align: center;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 40px;

}

.aboutsobre1 h1 {
  font-size: 35px;
  text-align: left;
  padding-left: 20px;
  margin-top: 20px;
  margin: 0;
}

.aboutsobre1 p {
  margin: 0;
  font-size: 22px;
  text-align: justify;
  padding: 25px;
}

.aboutsobre1 img {
  float: right;
  padding: 50px;
  width: 450px;
  margin-left: 35px;
}
</style>