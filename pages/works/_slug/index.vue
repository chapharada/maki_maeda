<template>
  <div class="conts-inner">
    <div class="content">
      <div class="top">
        <img
          :src="require(`@/assets/img/works/${article.cover.url}`)"
          :alt="`${article.midashi}`"
          v-lazy-load
        />
        <h2 v-show="article.midashi">{{ article.midashi }}</h2>
        <p v-show="article.caption">{{ article.caption }}</p>
      </div>
      <div class="middle">
        <div class="list" v-for="data of article.detail" :key="data.id">
          <img
            :src="require(`@/assets/img/works/${data.detail_img.url}`)"
            v-lazy-load
          />
          <div class="title" v-show="data.detail_title">
            {{ data.detail_title }}
          </div>
          <div class="caption" v-show="data.detail_caption">
            {{ data.detail_caption }}
          </div>
        </div>
      </div>
      <div class="explain" v-show="article.detail_explain">
        {{ article.detail_explain }}
      </div>
      <div class="locate" v-show="article.venue">{{ article.venue }}</div>
    </div>
    <div class="pagelink">
      <ul>
        <li>
          <nuxt-link v-if="prev !== null" :to="`${prev.id}`"
            ><span class="prev"></span>prev</nuxt-link
          >
        </li>
        <li>
          <nuxt-link v-if="next !== null" :to="`${next.id}`"
            >next<span class="next"></span
          ></nuxt-link>
        </li>
      </ul>
    </div>
    <div class="back">
        <nuxt-link to="/">トップに戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const url =
      process.env.GENERATOR_MODE === "dev" ? "" : "https://maedamaki.com";
    const { data } = await app.$axios.get(
      `${url}/_nuxt/data/articles/${params.slug}.json`
    );

    const links = await app.$axios.get(
      `${url}/_nuxt/data/articles/prev_next.json`
    );
    const linkConts = links.data;

    const index = linkConts.findIndex((content) => content.id === params.slug);

    let prevLink = linkConts[index - 1];
    if (prevLink == undefined) {
      prevLink = null;
    }
    let nextLink = linkConts[index + 1];
    if (nextLink == undefined) {
      nextLink = null;
    }

    return {
      article: data,
      prev: prevLink,
      next: nextLink,
    };
  },
  created() {
    //画像のurlだけを取得
    var urlArray = this.article.cover.url.split("/");
    var captionData = urlArray.pop();
    this.article.cover.url = captionData;

    for (var el of this.article.detail) {
      var detailUrlArray = el.detail_img.url.split("/");
      var detailCaptionData = detailUrlArray.pop();
      el.detail_img.url = detailCaptionData;
    }
  },
  transition: "expandFade",
};
</script>

<style lang="scss" scoped >

$max-width:680px;

.conts-inner{
  max-width: $max-width;
  margin: 4rem auto 0;
  padding: 0 2.5rem;
  @include mq(no){
    padding: 0;
  }
}
.content {
  margin-bottom: 4.8rem;
}
.top {
  margin-bottom: 5.4rem;
  @include mq(no) {
    max-width: $max-width;
    margin: 0 auto;
    margin-bottom: 10rem;
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
.middle {
  margin-bottom: 4.8rem;
  &:not(:last-child) {
    margin-bottom: 8.4rem;
  }
}

.list {
  margin: 0 auto;
  max-width: $max-width;
  &:not(:last-child) {
    margin-bottom: 8rem;
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
  max-width: 800px;
  margin-bottom: 1.2rem;
  font-size: 1.1rem;
  color: #1a1a1a;
  text-align: justify;
}
.locate {
  font-size: 1.15rem;
  color: #444;
  letter-spacing: 0.06em;
}

.pagelink {
  ul {
    display: flex;
    justify-content: space-between;
    @include mq(no) {
      max-width: 800px;
    }
    li a {
      letter-spacing: 0px;
      color: #ff6000;
      display: flex;
      align-items: center;
      font-size: 1.3rem;
      &.is-disabled {
        cursor: default;
        color: #888;
        span {
          background-color: #888;
        }
      }
    }
    li a span {
      width: 48px;
      display: inline-block;
      margin-left: 0;
      background-color: #ff6000;
      transition-timing-function: cubic-bezier(0.83, 0, 0.17, 1);
      transition-duration: 0.3s;
      transition-property: width;
      will-change: width;
      height: 1px;
      &.next {
        margin-left: 12px;
      }
      &.prev {
        margin-right: 12px;
      }
    }
  }
}
.back{
  margin-top: 4rem;
  a{
    background: #222;
    height: 48px;
    border-radius: 8px;
    color: #fff;
    font-size: 1.2rem;
    width: 160px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
}
</style>