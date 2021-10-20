

<template>
  <main>
    <div class="gridconts" ref="grid">
      <div class="item">
        <div class="content blue-box tp-box">
          <h2>works</h2>
          <p>これまでの作品</p>
        </div>
      </div>
      <div class="item" v-for="(cap, data) in ichiran" :key="data" ref="item" >
        <div class="content art-box">
          <nuxt-link to="`/works/${cap.id}`">
            <img :src="cap.cover.url" :alt="cap.midashi">
            <h3>{{cap.midashi}}</h3>
            <p>{{cap.caption}}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import card from "../components/GridCard.vue";
import resize from "../plugins/resize";

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
  },
  data(){
    return{
      gridLoading:false,
      loadCount: 0,
    }
  },
  mixins:[resize],
  mounted() {
      this.resizeAllGridItems();
  },
  methods:{
    resizeGridItem(item){
      var grid = this.$refs.grid;
      var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      var rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap ) / ( rowHeight + rowGap ) );
        item.style.gridRowEnd = "span " + rowSpan;
    },
    resizeAllGridItems(){
      var allItems = this.$el.getElementsByClassName("item");
      for( var item of allItems ){
        console.log(item)
        this.resizeGridItem(item);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
    .gridconts{
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(410px,1fr));
      grid-auto-rows: 20px;
      @include mq(tb){
        grid-template-columns: repeat(auto-fill, minmax(360px,1fr));
      }
      @include mq(no){
        grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
      }
    }
    .content.blue-box.tp-box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 140px 0;
        background: #afdce0;
        color: #fff;
    }
    .item{
      img{
        border-radius: 8px;
        width: 100%;
      }
    }
    h3{
      font-weight: bold;
      color: #e04aa6;
      letter-spacing: 0.05em;
    }
    p{
      line-height: 1.45;
      font-size: 1.1rem;
      color: #047183;
    }
    .art-box{
      display: flex;
      border: 1px solid #000;
      border-radius: 8px;
      padding: 20px;
    }
</style>
