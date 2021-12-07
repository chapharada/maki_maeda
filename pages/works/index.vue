

<template>
  <main>
    <div class="works" ref="grid">
      <h2 class="cap-title">Works</h2>
        <masonry-wall :items="ichiran" :ssr-columns="1" :column-width="240" :gap="16" :rtl="false" >
          <template #default="{item}" >
              <card :item="item" :folder="'/works/'" @loaded="handleLoaded"/> 
          </template>
        </masonry-wall>
    </div>
  </main>
</template>

<script>
import card from "~/components/GridCard.vue";

export default {
    async created() {
      const query = this.$route.query;
      if (query.draftKey === undefined) {
        return;
      }
      const { data } = await axios.get(
        `https://maedamaki.microcms.io/api/v1/works?draftKey=${query.draftKey}`,
        {
          headers: { 'X-MICROCMS-API-KEY': '979601df4f7940ffa39f9c5afc3cf197dd75' }
        }
      )
      this.ichiran = data.contents;
  },
  components: {
    card
  },
  data(){
    return{
      loadedCount: 0,
      gridShow:false,
      ichiran:[],
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
