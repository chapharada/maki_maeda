

<template>
  <main>
    <div class="works" ref="grid">
      <h2>Works</h2>
      <masonry-wall :items="ichiran" :ssr-columns="1" :column-width="240" :gap="16" :rtl="false" >
        <template #default="{item}" >
            <card :item="item" @loaded="handleLoaded"/> 
        </template>
      </masonry-wall>
      <div class="pagelink">
      <nuxt-link to="#">
        <div class="text">すべて見る</div>
        <arrow />
      </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import card from "../components/GridCard.vue";
import arrow from '@/assets/svg/arrow.svg';

// var allLoaded = document.getElementsByClassName('card-image').getElementsByTagName('img');
// consoel.log(allLoaded)

export default {
  async asyncData({ $microcms }) {
    try {
      const data = await $microcms.get({
        endpoint: "works",
        queries: {
          limit: 10,
        },
      });
      return {
        ichiran: data.contents,
      };
    } catch (err) {
      console.log("だめだ〜");
    }
  },
  name: "index",
  components: {
    card,
    arrow
  },
  data(){
    return{
      loadedCount: 0,
      gridShow:false
    }
  },
  mounted() {
     this.$nextTick(function () {
    })
  },
  methods:{
    handleLoaded:function(){
      this.loadedCount++
      if( this.ichiran.length = this.loadedCount){
        this.gridShow = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .works{
    margin-bottom: 4rem;
  }
  .works > h2 {
      font-weight: bold;
      letter-spacing: .08em;
      padding-bottom: 0.2rem;
      margin-bottom: 2.4rem;
      border-bottom: 1px solid #d1d1d1;
      font-size: 1.5rem;
      color: #27c4ac;
  }
  .card-image{
    margin-bottom: 0.4rem;
    img{
      width: 100%;
      height: auto;
      border-radius: 12px;
    }
  }
  .card-content{
    h2{
      font-weight: bold;
      letter-spacing: .05em;
      font-size: 1.45rem;
    }
    p{
      color: #666;
      font-size: 1.05rem;
      line-height: 1.3;
      letter-spacing: .08em;
    }
  }
  .masonry-wall{
    margin-bottom: 1.6rem;
  }
  .works .pagelink{
    display: flex;
    justify-content: flex-end;
    a{
      background: #fff;
      border: 2px solid #fc4a2b;
      border-radius: 32px;
      height: 48px;
      letter-spacing: .05em;
      color: #fc492b;
      display: inline-flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      padding: 0px 4.8rem 0px 4.8rem;
      width: auto;
    }
    .text{
      display: flex;
      width: auto;
      flex-basis: auto;
      font-size: 1.4rem;
    }
    svg{
      width: 15px;
      margin: 0px 0px 0px 12px;
      height: auto;
    }
  }
</style>
