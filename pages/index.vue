

<template>
    <section>
      <div id="info">
        <h2 class="cap-title">お知らせ</h2>
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
                <dl class="price">
                  <dt>観覧料</dt>
                  <dd>一般　1,200円（1,000円）、高・大生　800円（600円）、小・中学生　600円（450円）
                    <span class="atn">※身体障害者手帳等をお持ちの方は無料</span>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="type">exibition</div>
            <div class="arrow">
              <span>
                <svgLoader name="arrow"/>
              </span>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="works" ref="grid">
        <h2 class="cap-title">これまでの作品</h2>
          <masonry-wall :items="ichiran" :ssr-columns="1" :column-width="320" :gap="16" :rtl="false" transition-duration="0.3s">
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
    </section>
</template>

<script>
import card from "../components/GridCard.vue";
import arrow from '@/assets/svg/arrow.svg';

export default {
  async asyncData({ $microcms,payload }) {
    if(payload){
      return{
        ichiran: payload.contents
      };
    }else if($microcms){
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
    .data a {
      position: relative;
      display: flex;
      border-width: 1px;
      border-color: #d1d1d1;
      border-radius: 12px;
      padding: 3.6rem 6.4rem 3.6rem 4.8rem;
      .caption{
        width: 180px;
        justify-content: center;
        display: flex;
        align-items: center;
        @include mq(pc){
          width: 300px;
        }
        img{
          width: 100%;
          max-width: 180px;
          margin-bottom: auto;
        }
      }
      .detail{
        width: calc(100% - 180px);
        padding: 0 2.4rem 0 4rem;
        word-wrap: break-word;
        display: flex;
        flex-direction: column;
        justify-content: top;
        .title{
          margin-bottom: 1.6rem;
          .midashi{
            font-size: 2.2rem;
            font-weight: bold;
            letter-spacing: .05rem;
            line-height: 1;
            margin-bottom: 0.8rem;
          }
          .cap{
            letter-spacing: .05rem;
            font-size: 1.2rem;
            color: #666;
          }
        }
        .tb{
            dl{
              display: flex;
              letter-spacing: .08em;
              font-size: 1.4rem;
              align-items: center;
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
        .price{
          dd{
            max-width: 400px;
          }
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
  }
  .works{
    margin-bottom: 4rem;
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
