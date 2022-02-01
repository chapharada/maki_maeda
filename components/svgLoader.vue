<template>
  <component :is="svg"/>
</template>

<script>
export default {
  name: "svgLoader",
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    svg() {
      return () => import(`~/assets/svg/${this.name}.svg`)
    }
  }
}
</script>