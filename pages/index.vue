

<template>
  <section>
    <div class="info" v-if="info.infoBtn">
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
    <div class="works" ref="grid">
      <div class="works-inner">
        <h2>Works</h2>
        <masonry-wall
          :items="ichiran"
          :ssr-columns="3"
          :column-width="300"
          :gap="12"
          :rtl="false"
          transition-duration="0.3s"
        >
          <template #default="{ item }">
            <card :item="item" :folder="'/works/'" @loaded="handleLoaded" />
          </template>
        </masonry-wall>
      </div>
    </div>
  </section>
</template>

<script>
import card from "../components/GridCard.vue";
import arrow from "@/assets/svg/arrow.svg";

export default {
  async asyncData({ app, params }) {
    const url = process.env.GENERATOR_MODE === "dev" ? "" : "https://maedamaki.com";

    const info = await app.$axios.get(
      `${url}/_nuxt/data/pagecv/infomation.json`,
      {
        proxy: {
          host: 'wgproxy',
          port: 8080,
        }
      }
    );
    
    const { data } = await app.$axios.get(
      `${url}/_nuxt/data/ichiran/index.json`,
      {
        proxy: {
          host: 'wgproxy',
          port: 8080,
        }
      }
    );

    return {
      ichiran: data,
      info: info.data[0],
    };
  },
  name: "index",
  components: {
    card,
    arrow,
  },
  data() {
    return {
      loadedCount: 0,
      gridShow: false,
      dataInfoLoaded: false,
    };
  },
  created() {
    for (var el of this.ichiran) {
      var urlArray = el.cover.url.split("/");
      var captionData = urlArray.pop();
      el.cover.url = captionData;
    }
  },
  methods: {
    handleLoaded: function () {
      this.loadedCount++;
      if ((this.ichiran.length = this.loadedCount)) {
        this.gridShow = true;
      }
    },
    getImgBindPass: function(locate,name){
      return name ? require(`@/assets/img/${locate}/${name}`) : ''
    }
  },
  computed:{
    passInfoLoaded(){
      if(!this.info){
        return 
      }else{
        var data = this.info
        return data
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  padding: 0 2.5rem;
}

.cap-title {
  font-weight: bold;
  letter-spacing: 0.08em;
  padding-bottom: 0.2rem;
  margin-bottom: 0.6rem;
  @include mq(no) {
    margin-bottom: 1.2rem;
  }
  font-size: 1.8rem;
  color: #27c4ac;
}

.info h2,
.works h2 {
  font-size: 2.2rem;
  letter-spacing: 0.02em;
  margin-bottom: 1.2rem;
}

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

.works {
  margin-bottom: 4rem;
  &-inner {
    max-width: 960px;
    margin: 0 auto;
  }
}

.masonry-wall {
  margin-bottom: 1.6rem;
}
.works .pagelink {
  display: flex;
  justify-content: flex-end;
  a {
    background: #fff;
    border: 2px solid #fc4a2b;
    border-radius: 32px;
    height: 48px;
    letter-spacing: 0.05em;
    color: #fc492b;
    display: inline-flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 0px 4.8rem 0px 4.8rem;
    width: auto;
  }
  .text {
    display: flex;
    width: auto;
    flex-basis: auto;
    font-size: 1.4rem;
  }
  svg {
    width: 15px;
    margin: 0px 0px 0px 12px;
    height: auto;
  }
}


::v-deep .detail {
  &:not(:last-child) {
    margin-bottom: 2.4rem;
  }
  
  p{
    font-size: 1.2rem;
    &:not(:last-child){
      margin-bottom: 0.4rem;
    }
  }
  img {
    width: 80%;
  }

  dl {
    display: flex;
    font-size: 1.2rem;
    line-height: 1.6;
    &:not(:last-child) {
      margin-bottom: 0.6rem;
      @include mq(no) {
        margin-bottom: 0.4rem;
      }
    }
    span {
      display: block;
      color: #777;
      font-size: 0.9em;
    }
    dt {
      width: 90px;
      flex: 0 0 auto;
    }
    dd {
      flex: 1 1 auto;
      word-break: break-all;
    }
  }
}
</style>
