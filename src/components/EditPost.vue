<template>
<div class="imagen">
  	<img src="../assets/undraw_environment_iaus_2.png" alt="">
  </div>
  <div class="publicar">
  	<h1>Publicar un nuevo servicio</h1>

  	<textarea name="comentarios" id="" cols="30" rows="10">Descripción del servicio</textarea>

  	<input class="public" type="number" placeholder="precio">
  	<input class="public" type="text" placeholder="Ciudad">

  	<input class="public" type="text" placeholder="Area">

  	<input class="public" type="file">

  	<input class="publicarser" type="submit" value="Publicar">
  </div>
</template>

<script>
export default {
  name: "EditPost",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>
.publicar{
  padding: 100px;
  width: 400px;
  background: white;
  margin-top: 80px;
  margin-bottom: 250px;
  font-family: calibri;
  color: black;
}

.publicar h1{
  margin: 0;
  text-align: center;
  height: 40px;
  margin-bottom: 30px;
  border-bottom: 1px solid;
  font-size: 20px;
}

.public{
  width: 80%;
  margin-bottom:15px;
  padding: 11px 10px;
  background: white;
  font-size: 14 px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid black; 
}
.publicarser{
  width: 100%;
  height: 40px;
  background: #ede6dc;
  border-radius: 10px;
  color: black;
  margin-bottom: 19px;
}
.imagen{
  float: right;
  padding-right: 200px;
  padding-top: 200px;
}
</style>