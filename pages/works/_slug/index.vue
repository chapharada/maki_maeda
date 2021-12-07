<template>
  <main class="main">
    <div class="content">
      <div class="top">
        <img :src="article.cover.url" :alt="`${article.midashi}`" />
        <h2 v-if="article.midashi">{{ article.midashi }}</h2>
        <p v-if="article.caption">{{ article.caption }}</p>
      </div>
      <div class="middle">
        <div class="list" v-for="data of article.detail" :key="data.id">
          <img :src="data.detail_img.url" />
          <div class="title" v-if="data.detail_title">
            {{ data.detail_title }}
          </div>
          <div class="caption" v-if="data.detail_caption">
            {{ data.detail_caption }}
          </div>
        </div>
      </div>
        <div class="explain" v-if="article.detail_explain">{{ article.detail_explain }}</div>
        <div class="locate" v-if="article.venue">{{article.venue}}</div>
    </div>
  </main>
</template>

<script>
export default {
  async created() {
    const query = this.$route.query;
    if (query.id === undefined || query.draftKey === undefined) {
      return;
    }
    const { data } = await axios.get(
      `https://maedamaki.microcms.io/api/v1/works/${query.id}?draftKey=${query.draftKey}`,
      {
        headers: { 'X-MICROCMS-API-KEY': '979601df4f7940ffa39f9c5afc3cf197dd75' }
      }
    )
    this.article = data;
  },
    data() {
    return {
      article: {}
    };
  },
};
</script>

<style lang="scss" scoped >
.top {
  margin-bottom: 1.6rem;
  @include mq(no) {
    max-width: 640px;
    margin-bottom: 3.2rem;
  }
  h2 {
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }
  img {
    height: auto;
    width: 100%;
  }
  p {
    font-size: 1.2rem;
    color: #666;
    line-height: 1.45;
  }
}
.middle{
  margin-bottom: 4.8rem;
  &:not(:last-child){
    margin-bottom: 8.4rem;
  }
}
.list {
  &:not(:last-child) {
    margin-bottom: 2.4rem;
  }
  @include mq(no) {
    max-width: 640px;
  }
  .title {
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }
  .caption {
    font-size: 1.2rem;
    color: #666;
    line-height: 1.45;
  }
  img {
    width: 100%;
    height: auto;
  }
}

.explain {
  max-width: 760px;
  margin-bottom: 1.2rem;
  font-size: 1.15rem;
  color: #444;
  letter-spacing: 0.06em;
}
.locate{
  font-size: 1.15rem;
  color: #444;
  letter-spacing: 0.06em;
}

</style>