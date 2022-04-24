

<template>
    <section>
      <div class="works" ref="grid">
        <div class="works-inner">
          <masonry-wall :items="ichiran" :ssr-columns="1" :column-width="300" :gap="12" :rtl="false" transition-duration="0.3s">
            <template #default="{item}" >
                <card :item="item"  :folder="'/works/'" @loaded="handleLoaded"/> 
            </template>
          </masonry-wall>
          <div class="pagelink">
          <nuxt-link to="/works/">
            <div class="text">すべて見る</div>
            <arrow />
          </nuxt-link>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import card from "../components/GridCard.vue";
import arrow from '@/assets/svg/arrow.svg';

export default {
  async asyncData({ app, params }) {
    const url = process.env.GENERATOR_MODE === 'dev' ? '' : 'https://maedamaki.com'
    const {data} = await app.$axios.get(
      `${url}/_nuxt/data/ichiran/index.json`
    )
    return { 
      ichiran: data 
    }
  },
  name: "index",
  transition: "expandFade",
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
  created() {
    for( var el of this.ichiran){
      var urlArray = el.cover.url.split('/'); 
      var captionData = urlArray.pop()
      el.cover.url = captionData;
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


  .cap-title{
    font-weight: bold;
    letter-spacing: 0.08em;
    padding-bottom: 0.2rem;
    margin-bottom: 0.6rem;
    @include mq(no){
      margin-bottom: 1.2rem;
    }
    font-size: 1.8rem;
    color: #27c4ac;
  }
  #info{
    margin-bottom: 4.8rem;
    @include mq(pc){
      margin-bottom: 11.4rem;
    }
    .data{
      max-width: 720px;
      margin: 0 auto;
      h2{
        text-align: left;
        font-weight: bold;
        margin-bottom: 0.4rem;
        font-size:1.4rem ;
        @include mq(no){
          font-size:1.8rem ;
        }
      }
      .caption{
        margin: 0 auto 0.8rem;
        img{
          display: block;
          width: 100%;
          margin: 0 auto;
        }
      }
      .type {
        position: absolute;
        -ms-writing-mode: tb-rl;
        writing-mode: vertical-rl;
        top: 40px;
        right: 26px;
        font-size: 1.1rem;
        font-weight: 600;
        color: #fc492b;
        letter-spacing: 0.15em;
      }      
      .arrow{
        position: absolute;
        bottom: 36px;
        right: 20px;
        width: 30px;
        height: 30px;
        span{
          width: 30px;
          height: 30px;
          position: relative;
          display: flex;
          background: #fc492b;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          svg{
            width: 11px;
            height: auto;
            fill: #fff;
          }   
        }
      }    
    }
    .detail{
      font-size: 1.4rem;
    }
  }
  .works{
    margin-bottom: 4rem;
    &-inner{
      max-width: 960px;
      margin: 0 auto;
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
