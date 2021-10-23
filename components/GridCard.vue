<template>
  <div class="card large" >
    <nuxt-link :to="`works/${item.id}`" >
      <div class="card-image">
        <figure class="image">
          <img :src="item.cover.url" alt="item.midashi" @load="loaded"/>
        </figure>
      </div>
      <div class="card-content content">
        <h2>{{ item.midashi }}</h2>
        <p>{{ item.caption }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>

export default {
  props: {
    item:{
      type: Object,
      countUp:Function,
    },
  },
  data(){
    return{
      cardGet: false,
    }
  }
};
</script>

<style lang="scss" scoped>
  .card-image{
    margin-bottom: 0.4rem;
    img{
      width: 100%;
      height: auto;
      border-radius: 12px;
    }
  }
  .card-content{
    h2{
      font-weight: bold;
      letter-spacing: .05em;
      font-size: 1.45rem;
    }
    p{
      color: #666;
      font-size: 1.05rem;
      line-height: 1.3;
      letter-spacing: .08em;
    }
  }
</style>