

<template>
    <main>
      <div class="cv mainconts">
        <div class="inner">
          <div class="heading">
            <h1>cv </h1>
          </div>
          <div class="conts">
            <div class="block autor">
              <h2 class="title">maeda maki | 前田 真喜</h2>
              <div id="edit">
              <div class="inner" v-html="history.edit"></div>
              </div>
              <!-- <p class="explain">{{history.profile}}</p> -->
            </div>
            <!-- <div class="block list" v-for="(data) in history.cv" :key="data.index">
              <h2 class="title">{{data.title}}</h2>
              <dl>
                <div v-for="(act) in data.yearlist" :key="act.index">
                  <dt>{{act.year}}</dt>
                  <dd>{{act.detail}}<span v-show="act.locate">（{{act.locate}}）</span></dd>
                </div>
              </dl>
            </div> -->
          </div>
        </div>
      </div>
    </main>
</template>

<script>

export default {
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
  },
  created :function(){
    //reverse_sort
    this.history.cv.forEach((data, index) => {
      if( data.reverse == true){
        this.history.cv[index].yearlist.sort(function(a, b) {
            return (a.year > b.year) ? -1 : 1;  //オブジェクトの昇順ソート
        }); 
      }
    })
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
    font-size: 1.2rem;
    line-height: 2.5rem;
    margin-bottom: 2.4rem;
  }
  .conts{
    .block{
      &:not(:last-child){
        margin-bottom: 3.2rem;
      }
      p + p{
        margin-top: 1.6rem;
      }
    }
    .title{
      font-weight: bold;
      margin-bottom:1.6rem;
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
