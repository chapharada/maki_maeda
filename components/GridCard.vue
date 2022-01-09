<template>
  <div class="card large">
    <nuxt-link :to="`${folder}${item.id}`" >
      <div class="card-image">
        <figure class="image">
          <img :src="item.cover.url" alt="item.midashi" @load="loaded"/>
        </figure>
      </div>
      <!-- <div class="card-content content">
        <h2>{{ item.midashi }}</h2>
        <p>{{ item.caption }}</p>
      </div> -->
    </nuxt-link>
  </div>
</template>

<script>

export default {
  props: {
    item:{
      type: Object,
    },
    folder:{
      type:String,
      default:'',
      require: false
    }
  },
  data(){
    return{
      cardGet: false,
    }
  },
   methods: {
     loaded(){
       this.cardGet = true
     }
   }
};
</script>

<style lang="scss" scoped>
  .card{
    margin-bottom: 4.8rem;
    @include mq(no){
      margin-bottom: 0;
    }
    &-image{
      margin-bottom: 0.4rem;
      img{
        width: 100%;
        height: auto;
        border-radius: 12px;
      }
    }
    &-content{
      h2{
        font-weight: bold;
        font-size: 1.45rem;
      }
      p{
        color: #666;
        font-size: 1rem;
        @include mq(no){
          font-size: 1.05rem;
        }
        line-height: 1.3;
        font-weight: 400;
      }
    }
  }
</style>