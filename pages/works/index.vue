

<template>
  <section>
    <div class="works" ref="grid">
      <h2 class="cap-title">works</h2>
        <masonry-wall :items="ichiran" :ssr-columns="1" :column-width="320" :gap="8" :rtl="false" >
          <template #default="{item}" >
              <card :item="item" :folder="'/works/'" @loaded="handleLoaded"/> 
          </template>
        </masonry-wall>
    </div>
  </section>
</template>

<script>
import card from "~/components/GridCard.vue";

export default {
  //   async asyncData({ $microcms,payload}) {
  //     if(payload){
  //       return{
  //         ichiran: payload.contents
  //       };
  //     }else if($microcms){      
  //       const data = await $microcms.get({
  //         endpoint: 'works',
  //       })
  //       return {
  //         ichiran: data.contents
  //       }
  //     }
  // },
  async asyncData({ app, params }) {
    const url = process.env.GENERATOR_MODE === 'dev' ? '' : 'https://maedamaki.com'
    const {data} = await app.$axios.get(
      `${url}/_nuxt/data/ichiran/index.json`
    )
    return { 
      ichiran: data 
    }
  },
  components: {
    card
  },
  transition: "expandFade",
  data(){
    return{
      loadedCount: 0,
      gridShow:false
    }
  },
    created() {
    for( var el of this.ichiran){
      var urlArray = el.cover.url.split('/'); 
      var captionData = urlArray.pop()
      el.cover.url = captionData;
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
    margin-bottom: 1.6rem;
    font-size: 1.5rem;
    color: #27c4ac;
  }
</style>
