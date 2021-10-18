

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
import card from "~/components/GridCard.vue";

export default {
    async asyncData({ $microcms }) {
    try{
      const data = await $microcms.get({
        endpoint: 'works',
      })
      return {
        ichiran: data.contents
      }
    } catch(err){
      console.log('だめだ〜')
    }
  },
  components: {
    card
  },
}
</script>

<style lang="scss" scoped>
  
</style>
