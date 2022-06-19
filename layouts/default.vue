
<template>
  <div id="wrapper" class="flex">
    <Header />
    <main>
      <nuxt />
    </main>
    <Footer />
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
    data() {
      return {
        displaySidenav: false,
      }
    }
  };
</script>

<style lang="scss" scoped >
</style>

