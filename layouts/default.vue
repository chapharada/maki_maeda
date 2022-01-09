
<template>
  <div id="wrapper" class="flex">
    <Header />
    <main>
      <div id="conts">
        <nuxt />
      </div>
      <Footer />
    </main>
  </div>
</template>
<script>
  import svgLoader from "~/components/svgLoader.vue"
  import Header from "~/components/Header.vue";
  import Footer from "~/components/Footer.vue";

  export default {
    components: {
      Header,
      Footer,
      svgLoader,
    },
  };
</script>

<style lang="scss" scoped >

</style>

