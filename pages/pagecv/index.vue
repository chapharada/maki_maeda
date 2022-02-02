

<template>
    <section>
      <div class="cv mainconts">
        <div class="inner">
          <div class="heading">
            <h1>cv </h1>
          </div>
          <div class="conts">
<<<<<<< HEAD
            <div class="inner" v-html="history.edit"></div>
            <!-- <div class="block autor">
              <h2 class="title">maeda maki | 前田 真喜</h2>
              <p class="explain">{{history.profile}}</p>
            </div>
            <div class="block list" v-for="(data) in history.cv" :key="data.index">
              <h2 class="title">{{data.title}}</h2>
              <dl>
                <div v-for="(act) in data.yearlist" :key="act.index">
                  <dt>{{act.year}}</dt>
                  <dd>{{act.detail}}<template v-if="act.locate"><span>（{{act.locate}}）</span></template></dd>
                </div>
              </dl>
            </div> -->
=======
            <div class="block autor">
              <h2 class="title">maeda maki / 前田 真喜</h2>
              <div class="explain" v-html="history.edit"></div>
            </div>        
>>>>>>> main_dev
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
<<<<<<< HEAD
  data() {
    return {
      history: {}
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
  },
  mounted() {
      //reverse_sort
      this.history.cv.forEach((data, index) => {
        if( data.reverse == true){
          this.history.cv[index].yearlist.sort(function(a, b) {
              return (a.year > b.year) ? -1 : 1;  //オブジェクトの昇順ソート
          }); 
        }
      })
  },
=======
  async asyncData({ $microcms ,payload}) {
    if(payload){
      return{
        history : payload,
      };
    }else if($microcms){
      const data = await $microcms.get({
        endpoint: 'pagecv',
      })
      return {
        history : data,
      }
    }
  }
>>>>>>> main_dev
}
</script>


<style lang="scss" scoped>
body{
  font-family: Noto Suns;
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
