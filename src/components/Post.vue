<template>
  <div class="descripcion">

		<img src="../assets/jardineria4.jpg" alt="">
		
		<h1>Titulo</h1>

		<h3>Area</h3>
		<h3>Ciudad</h3>
		<h3>7.500m2</h3>

		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus blanditiis necessitatibus laboriosam iste dolore et est ullam, corporis nobis perferendis nam, ducimus, laborum temporibus, dicta ut debitis? Ut et, molestias.
		A sint, pariatur adipisci eaque rerum aperiam dignissimos numquam labore impedit totam nulla obcaecati, dolor facere ipsa modi illum beatae, quisquam enim. Autem architecto dolores voluptatibus perspiciatis deserunt, corrupti. Animi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut, consequatur asperiores ratione maxime veritatis. Autem repudiandae obcaecati repellat, placeat ipsum amet eveniet iste quis eligendi fugit, sunt rerum et reiciendis?
		Quibusdam eos dignissimos, tenetur officiis aut recusandae odio obcaecati possimus quasi, reiciendis quisquam quaerat laboriosam accusantium sint voluptatem, placeat vero ab! Neque illo unde ratione quibusdam dolorum qui aliquid aperiam?
		Quae ullam obcaecati placeat? Aliquam, cum voluptatibus fuga esse porro consequuntur doloribus, eius, asperiores, iure nemo illo. Rem omnis fuga aspernatur voluptas, reprehenderit, dolorem libero unde odio accusamus quod, exercitationem.
		Veniam temporibus voluptatem soluta, nulla quibusdam.</p>

	</div>

	<div class="botones">
		<input class="des" type="submit" value="Reservar">
		<input class="des" type="submit" value="Volver">
	</div>
</template>

<script>
export default {
  name: "Post",

  data: function () {},

  methods: {},

  created: function () {},
};
</script>

<style>
.descripcion img{
  width: 50%;
  float: left;
  padding: 30px;
}

.descripcion h1{
  text-align: left;

}
.descripcion  h3{
  text-align: left;
  padding-right: 40px;
}
.descripcion  p{
  text-align: left;
  padding: 30px;
}

.botones{
  display: flex;
  justify-content: center;
}
.botones .des{
  padding: 5px;
  margin: 1%;
  background:  #ede6dc;
}
.botones .des:hover{
  background: black;
  color: white;

}
</style>