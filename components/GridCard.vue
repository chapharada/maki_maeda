<template>
  <div class="card large">
    <nuxt-link :to="`${folder}${item.id}`" >
      <div class="card-image">
        <figure class="image">
          <img :data-src="getImgBindPass('works',item.cover.url)" @load="loaded" v-lazy-load />
        </figure>
      </div>
      <div class="card-content content">
        <span class="text">{{ item.midashi }}</span>
      </div>
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
     },
    getImgBindPass: function(locate,name){
      return name ? require(`@/assets/img/${locate}/${name}`) : ''
    }
   }
};
</script>

<style lang="scss" scoped>
  .card{
    margin-bottom: 0rem;
    position: relative;
    @include mq(no){
      margin-bottom: 0;
    }
    &:hover{
      img{
        opacity: 0.1;
      }
      .card-content{
        opacity: 1;
      }

    }

    &-image{
      margin-bottom: 0.4rem;
      img{
        width: 100%;
        height: auto;
        // border-radius: 12px;
      }
    }
    &-content{
      opacity: 0;
      text-align: center;
      margin: auto;
      position: absolute;
      white-space: nowrap;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 20px;
      height: 24px;
      filter: alpha(opacity=00);
      transition: opacity .3s ease-in-out;
      span{
        font-size: 1.2rem;
        letter-spacing: .02em;
      }
    }
  }
</style>