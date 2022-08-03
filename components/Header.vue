<template>
  <header id="#topmenu">
    <div class="inner">
      <div class="logo">
        <nuxt-link to="/">
          <div class="symbol">
            <img src="~/static/img/top_logo.png" alt="" />
          </div>
        </nuxt-link>
      </div>
      <div class="icon">
        <div class="instagram">
          <a href="https://www.instagram.com/omaedao/">
            <svgLoader name="instagram" />
          </a>
        </div>
        <div class="mail">
          <nuxt-link to="/contact">
            <svgLoader name="email" />
          </nuxt-link>
        </div>
        <div class="toggle" @click="hambargarToggle" :class="{ on: isMenuActive }">
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <transition name="hamAnim">
      <ToggleMenu v-if="isMenuActive" @close="hamClose"/> 
    </transition>
  </header>
</template>
<script>
export default {
   data() {
    return {
      isMenuActive:false,
    }
  },
  methods: {
    hambargarToggle(){
      this.isMenuActive = !this.isMenuActive;
    },
    hamClose(){
      this.isMenuActive = false
      this.$router.push({ path: event.target.pathname })
    }
  },
}
</script>
<style lang="scss" scoped>
header {
  background: #F6F6F1;
  @include mq(no){
    padding: 0 1.6rem;
  }
  
  .inner{
    max-width: 960px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 2.4rem 0rem;
    @include mq(no){
      margin: 0 auto 0;
    }
  }
  .logo {
    .symbol {
      border-radius: 50%;
      width: 80px;
      @include mq(no){
        width: 90px;
      }
      img {
        width: 100%;
      }
    }
  }
  
  .inner .icon{
    display: flex;
    align-items: center;
    & > *:not(:last-child){
      margin-right: 0.6rem;
      @include mq(no){
        margin-right: 1.2rem;
      }
    }
    .instagram{
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      a{
        width: 22px;
        height: 26px;
      }
    }
    .mail{
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      a{
        display: block;
        width: 24px;
        height: 25px;
      }
    }
    .toggle {
      position: relative;
      top: 0;
      right: 0;
      z-index: 40;
      transition: 0.6s ease-in-out;
      border-radius: 0 0 4px 0;
      width: 36px;
      height: 36px;
      cursor: pointer;
      span{
        width: 22px;
        height: 3px;
        position: absolute;
        left: 8px;
        background: #222;
        display: block;
        transition: opacity 0.35s ease-in-out ,transform 0.35s ease-in-out ;
        border-radius: 8px;
        &:first-child{
          top: 7px;
        }
        &:nth-child(2){
          top: 15px;
        }
        &:nth-child(3){
          top: 23px;
        }
      }
      &.on span{
        &:first-child{
          transform: rotate(45deg) translateY(6.5px) translateX(7px);
        }
        &:nth-child(2){
          opacity: 0;
        }
        &:nth-child(3){
          transform: rotate(-45deg) translateY(-5px) translateX(5px);
        }
      }
    }
  }



}

.hamAnim-enter-active,
.hamAnim-leave-active{
  transition: opacity 0.3s;
}

.hamAnim-enter,
.hamAnim-leave-to {
  opacity: 0;
}

</style>