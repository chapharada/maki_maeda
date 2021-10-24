

<template>
  <main>
    <div class="works" ref="grid">
      <h2 class="cap-title">Works</h2>
        <masonry-wall :items="ichiran" :ssr-columns="1" :column-width="240" :gap="16" :rtl="false" >
          <template #default="{item}" >
              <card :item="item" @loaded="handleLoaded"/> 
          </template>
        </masonry-wall>
    </div>
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
  data(){
    return{
      loadedCount: 0,
      gridShow:false
    }
  },
  methods:{
    handleLoaded:function(){
      this.loadedCount++
    },
    allReload:function(){
      if( this.ichiran.length = this.loadedCount){
        this.gridShow = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .cap-title{
    font-weight: bold;
    letter-spacing: .08em;
    padding-bottom: 0.2rem;
    margin-bottom: 3.2rem;
    border-bottom: 1px solid #d1d1d1;
    font-size: 1.5rem;
    color: #27c4ac;
  }
</style>
