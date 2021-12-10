<template>
  <div class="buscar">
    <input type="buscar" placeholder="buscar" />
    <input class="bus" type="submit" value="Buscar" />
  </div>

  <div class="principal">
    <div class="seleccion">
      <select name="ciudad" id="ciudad">
        <option value="0">Ciudad</option>
        <option value="1">Bogotá</option>
        <option value="2">pereira</option>
        <option value="4">Villavicencio</option>
      </select>
    </div>
    <div class="seleccion">
      <select name="area" id="area">
        <option value="0">Area</option>
        <option value="1">5 metros cuadrados</option>
        <option value="2">2 metros cuadrados</option>
        <option value="4">10 metros cuadrados</option>
      </select>
    </div>
    <div class="seleccion">
      <select name="precios" id="precios">
        <option value="0">Precios</option>
        <option value="1">$ 55.000</option>
        <option value="2">$ 100.000</option>
        <option value="4">150.000</option>
      </select>
    </div>
  </div>

  <section>
    <div class="conPrincipal">
      <div class="col">
        <!--1 división de texto-->
        <div class="imagen">
          <img src="../assets/jardineria.jpg" alt="" />
        </div>

        <div class="text">
          <h1>potenti est</h1>
          <p>7.500 m2</p>
          <p>Morbi vestibulum elit nunc etiam</p>
        </div>
      </div>

      <div class="col">
        <div class="imagen">
          <img src="../assets/jardineria3.jpg" alt="" />
        </div>

        <div class="text">
          <h1>potenti est</h1>
          <p>7.500 m2</p>
          <p>Morbi vestibulum elit nunc etiam</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Services",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>
section {
  background: white;
  width: 100%;
  display: flex;
}

.principal {
  display: flex;
  padding-left: 900px;
}
.buscar {
  margin: 10px;
  padding: 20px;
}

.imagen img {
  width: 30%;
  margin: 0px;
}
.text {
  padding-right: 80px;
  text-align: left;
}

.seleccion {
  padding: 10px;
}

.conPrincipal {
  display: flex;
  margin: 20px;
}

.col {
  display: flex;
  background: #ede6dc;
  margin: 50px;
  font-family: Alice;
  align-items: center;
}
</style>