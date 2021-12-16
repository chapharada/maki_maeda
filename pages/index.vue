

<template>
  <main>
    <div id="info">
      <h2 class="cap-title">Info</h2>
      <div class="data">
      <nuxt-link to="#">
        <div class="caption">
          <img src="~/assets/img/info/flyer_sample.jpg" alt="">
        </div>
        <div class="detail">
          <h3 class="title">
            <div class="midashi">なんぼのもんじゃい展</div>
            <div class="cap">〜テキストテキストテキストテキストテキスト〜</div>
          </h3>
          <div class="tb">
            <dl>
              <dt>会期</dt>
              <dd>2021.08.29(土) ~ 2021.09.31(土)</dd>
            </dl>
            <dl>
              <dt>会館時間</dt>
              <dd>9:30-17:00（入館は16:30まで）</dd>
            </dl>
            <dl>
              <dt>会場</dt>
              <dd>苔むしたさざれ石</dd>
            </dl>
            <dl>
              <dt>観覧料</dt>
              <dd>一般　1,200円（1,000円）、高・大生　800円（600円）、小・中学生　600円（450円）
                <span class="atn">※身体障害者手帳等をお持ちの方は無料</span>
              </dd>
            </dl>
          </div>
        </div>
      </nuxt-link>
      </div>
    </div>
    <div class="works" ref="grid">
      <h2 class="cap-title">Works</h2>
        <masonry-wall :items="ichiran" :ssr-columns="1" :column-width="240" :gap="16" :rtl="false" >
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
  </main>
</template>

<script>
import card from "../components/GridCard.vue";
import arrow from '@/assets/svg/arrow.svg';

export default {
  async asyncData({ $microcms,payload }) {
    try {
      if(payload){
        return{
          ichiran: payload.contents
        };
      }else{
        const data = await $microcms.get({
          endpoint: "works",
          queries: {
            limit: 10,
          },
        });
        return {
          ichiran: data.contents,
        };
      }
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
  .cap-title{
    font-weight: bold;
    letter-spacing: .08em;
    padding-bottom: 0.2rem;
    margin-bottom: 3.2rem;
    border-bottom: 1px solid #d1d1d1;
    font-size: 1.5rem;
    color: #27c4ac;
  }
  #info{
    margin-bottom: 4.8rem;
  }
  .works{
    margin-bottom: 4rem;
  }
  .data a {
    display: flex;
    border: 1px solid #d1d1d1;
    padding: 3.2rem 6.5rem 3.2rem 2.4rem;
    .caption{
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100%;
        max-width: 180px;
        margin-bottom: auto;
      }
    }
    .detail{
      width: calc(100% - 300px);
      padding-left: 3.2rem;
      .title{
        margin-bottom: 1.6rem;
        .midashi{
          font-size: 2.1rem;
          font-weight: bold;
          letter-spacing: .05rem;
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .cap{
          letter-spacing: .05rem;
          font-size: 1.2rem;
          color: #666;
        }
      }
    }
    .tb{
      dl{
        display: flex;
        letter-spacing: .08em;
        font-size: 1.4rem;
        &+ dl{
          margin-top: 0.6rem;
        }
        dt{
          color: #888;
          width: 120px;
        }
        dd{
          width: calc(100% - 120px)
        }
      }
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
