

<template>
  <section>
    <info />
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
import info from "../components/info.vue";
import card from "../components/GridCard.vue";
import arrow from "@/assets/svg/arrow.svg";

export default {
  async asyncData({ app, params , context }) {
    const url = await process.env.GENERATOR_MODE === "dev" ? "" : "https://maedamaki.com";

    const { data } = await app.$axios.get(
      `${url}/_nuxt/data/ichiran/index.json`
    );

    return {
      ichiran: data,
    };
  },
  name: "index",
  components: {
    card,
    arrow,
    info,
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
