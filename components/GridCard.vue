<template>
  <div class="card large">
    <nuxt-link :to="`${link}`" >
      <div class="card-image">
        <figure class="image">
          <img v-bind:src="image" alt="Image" />
        </figure>
      </div>
      <div class="card-content content">
        <h2>{{ title }}</h2>
        <p>{{ body }}</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    body: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
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