
<template>
    <main>
      <div class="cv mainconts">
        <div class="inner">
          <div class="heading">
            <h1>cv </h1>
          </div>
          <div class="conts" v-if="this.preview">
            <div class="inner" v-html="history.edit"></div>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      history: {},
      preview: false,      
    };
  },
  async created() {
      const query = this.$route.query;
      if (query.draftKey === undefined) {
        return;
      }
      const { data } = await axios.get(
        `https://maedamaki.microcms.io/api/v1/pagecv?draftKey=${query.draftKey}`,
        {
          headers: { 'X-MICROCMS-API-KEY': '979601df4f7940ffa39f9c5afc3cf197dd75' }
        }
      )
      this.history = data;
      this.preview = true;
  },
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
  padding-top: 0.8rem;
  .inner{
    display: flex;
  }
  h1{
    font-size: 1.4rem;
    line-height: 1.5;
    letter-spacing: .08em;
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
