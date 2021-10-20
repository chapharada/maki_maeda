

<template>
  <main>
    <magic-grid>
      <card
        v-for="(cap, data) in ichiran"
        :key="data"
        :image="cap.cover.url"
        :title="cap.midashi"
        :link="`/works/${cap.id}`"
        :body="cap.caption" />
    </magic-grid>
  </main>
</template>

<script>
import card from "../components/GridCard.vue";

export default {
  async asyncData({ $microcms }) {
    try{
      const data = await $microcms.get({
        endpoint: 'works',
        queries: {
          limit:6,
        },
      })
      return {
        ichiran: data.contents
      }
    } catch(err){
      console.log('だめだ〜')
    }
  },
  name: 'index',
  components: {
    card
  },
};
</script>

<style lang="scss" scoped>
  .gridsystem{
    visibility: hidden;
    &.active{
      visibility: visible;
    }
  }
</style>
