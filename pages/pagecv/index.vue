

<template>
    <section>
      <div class="cv mainconts">
        <div class="inner">
          <div class="conts">
            <div class="block autor">
              <h2 class="title">maeda maki / 前田 真喜</h2>
              <div class="explain" v-html="history.edit"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>

export default {
  async asyncData({ app, params }) {
    const url = process.env.GENERATOR_MODE === 'dev' ? '' : 'https://maedamaki.com'
    const {data} = await app.$axios.get(
      `${url}/_nuxt/data/pagecv/index.json`
    )
    return { 
      history: data 
    }
  },
  transition: "expandFade",
}
</script>


<style lang="scss" scoped>
body{
  font-family: Noto Suns;
}
.block{
  .title{
    margin-bottom: 1.6rem;
  }
}

.cv{
  max-width: 580px;
  margin: 0 auto;
  max-width: 960px;
  width: calc(100% - 5rem);
  @include mq(tb){
    width: calc(100% - 7.2rrem);
  }
  @include mq(no){
    width: calc(100% - 3.2rem);
  }
  h1{
    font-size: 1.4rem;
    line-height: 1.5;
    letter-spacing: .08em;
    margin-bottom: 5.4rem;
    @include mq(no){
      margin-bottom: 0;
    }
  }
  h2{
    margin-bottom: 2.4rem;
  }
  .heading{
    width: 10%;
    min-width: 100px;
  }
  .conts{
    width: 90%;
    font-size: 1.3rem;
    line-height: 2.5rem;
    margin-bottom: 2.4rem;
  }
  .conts{
    .block{
      &:not(:last-child){
        margin-bottom: 7.2rem;
      }
      p + p{
        margin-top: 1.6rem;
      }
    }
    .title{
      font-weight: bold;
      margin-bottom:2.4rem;
    }
    .list{
      dl div{
        display: flex;
        line-height: 2;
        dt{
          word-wrap: nowrap;
          margin-right: 4rem;
        } 
        dd span{
          font-size: 1rem;
          color: #565656;
        }
      }
    }
  } 
}
</style>
