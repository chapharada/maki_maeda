
<template>
  <div id="wrapper">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
  import Header from "~/components/Header.vue";
  import Footer from "~/components/Footer.vue";

  export default {
    components: {
      Header,
      Footer,
    },
  };
</script>

<style lang="scss" scoped >
  #wrapper{
    max-width: $max-width;
    margin: 0 auto;
  }
</style>

