<template>
        <h1>Publicar un nuevo servicio</h1>
    <form id="createpost">
        <input type="text" id="titulo" name="titulo" placeholder="Título">
        <textarea rows="4" cols="50" name="description" form="createpost" placeholder="Descripción del servicio"></textarea>
        <input type="number" id="precio" name="precio" placeholder="Precio">
        <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad">
        <input type="text" id="area" name="area" placeholder="Área">
        <input type="text" id="foto" name="foto" placeholder="Enlazar una fotografía">
        <input type="submit">
        <input type="reset">
    </form>
</template>

<script>
export default {
  name: "CreatePost",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>

</style>