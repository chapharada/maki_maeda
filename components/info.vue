<template>
    <div class="info">
      <div class="info-inner">
        <h2>Infomation</h2>
        <div class="info-conts">
          <div class="inner">
            <div class="rgt">
              <img :src="getImgBindPass('info',info.infoImage)" />
            </div>
            <div class="lft">
              <div class="midashi">
                <h2>{{ info.infoMidashi }}</h2>
                  <span>{{ info.infoCaption }}</span>
              </div>
              <div class="detail" v-html="info.infoExplain"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  async fetch( context) {
    const url = process.env.GENERATOR_MODE === "dev" ? "" : "https://maedamaki.com";
    const info = await this.$axios.get(
      `${url}/_nuxt/data/pagecv/infomation.json`
    );
    // this.info = info.data[0] 
    await context.store.commit('setInfomation', info.data[0])
    
  },
  data() {
    return {
      info: []
    };
  },
  mounted: function(){
  },
  methods: {
    getImgBindPass: function(locate,name){
      return name ? require(`@/assets/img/${locate}/${name}`) : ''
    }
  },
}
</script>

<style lang="scss" scoped >
.info {
  max-width: 960px;
  margin: 0 auto;
  margin-bottom: 4.8rem;
  &-conts {
    background: #fff;
    padding: 4.8rem 3.2rem;
    @include mq(no) {
      padding: 4.8rem 4rem;
    }
    .inner {
      @include mq(no) {
        display: flex;
        align-items: top;
        justify-content: space-between;
        flex-direction: row-reverse;
      }
    }
    .lft {
      width: 100%;
      @include mq(no) {
        width: calc(62% - 48px);
      }
      .midashi {
        margin-bottom: 2.4rem;
        line-height: 1.2;
        @include mq(no) {
          line-height: 1.3;
        }

        h2 {
          font-size: 2.2rem;
          margin-bottom: 0;
          @include mq(no) {
            font-size: 2.4rem;
          }
        }

        span {
          font-size: 1rem;
          line-height: 1;
          @include mq(no) {
            font-size: 1.1rem;
          }
        }
      }
      .comment {
        font-size: 1.3rem;
        a {
          color: #2b5ad4;
          text-decoration: underline;
          letter-spacing: 0.01em;
        }
      }
    }
    .rgt {
      margin-bottom: 4.8rem;
      @include mq(tb) {
        margin-bottom: 4.8rem;
      }
      @include mq(no) {
        width: 38%;
        margin-bottom: 0rem;
      }
      img {
        width: 100%;
      }
    }
  }
}

</style>