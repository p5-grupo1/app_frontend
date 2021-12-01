<template>

  <div id="app" class="app">
    <div class="header">
      <img 
      src="../src/assets/main_logo.svg" 
      alt="Logotipo Soluciones Verdes"
      />
      <h1>Soluciones Verdes</h1>
    </div>
  </div>
</template> 
 
<script>
export default {
  name: "App",

  data: function () {},

  methods: {},

  created: function () {},
};
</script> 
 
<style>
@import url('https://fonts.googleapis.com/css?family=Alice');
body {
  margin: 0 0 0 0;
}

.header {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 50px;
  background-color: #EDE6DC;
  color: #e5e7e9;
  display: flex;
  /* justify-content: space-between;*/
  align-items: center; 
}

.header h1 {
  text-align: center;
  color: #3A3B28;
  font-family: 'Alice', 'Times New Roman', Times, serif;
  }

.header img {
  margin: 10px;
  height: 75%;
}
</style>