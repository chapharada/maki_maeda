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
        <div class="mail">
          <nuxt-link to="/contact">
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

  .inner{
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toggle {
      position: relative;
      width: 90px;
      height: 90px;
      top: 0;
      right: 0;
      z-index: 40;
      transition: 0.6s ease-in-out;
      border-radius: 0 0 4px 0;
      @include mq(no){
        width: 60px;
        height: 60px;
      }
      cursor: pointer;
      span{
        width: 25px;
        height: 3px;
        position: absolute;
        left: 35px;
        background: #222;
        display: block;
        transition: opacity 0.35s ease-in-out ,transform 0.35s ease-in-out ;
        border-radius: 8px;
        @include mq(no){
          left: 18px;
        }
        &:first-child{
          top: 30px;
          @include mq(no){
            top: 18px;
          }
        }
        &:nth-child(2){
          top: 39px;
          @include mq(no){
            top: 27px;
          }
        }
        &:nth-child(3){
          top: 48px;
          @include mq(no){
            top: 36px;
          }
        }
      }
      &.on span{
        &:first-child{
          transform: rotate(45deg) translateY(7px) translateX(7.5px);
        }
        &:nth-child(2){
          opacity: 0;
        }
        &:nth-child(3){
          transform: rotate(-45deg) translateY(-5px) translateX(5px);
        }
      }
      
  }

  .logo {
    .symbol {
      border-radius: 50%;
      width: 100px;
      img {
        width: 100%;
      }
    }
  }
  .mainmenu {
    &.pc {
      display: none;
      @include mq(no) {
        display: flex;
        font-size: 1.45rem;
      }
      flex-direction: column;
      padding: 20px 0;
      a {
        line-height: 1;
        padding-left: 3rem;
        display: flex;
        align-items: center;
        transform-origin: center;
      }
      svg {
        width: 18px;
        height: 18px;
        margin-right: 1rem;
      }
    }
  }
  .instagram {
    display: none;
    @include mq(no) {
      display: block;
    }
    padding: 1.2rem 0;
    a {
      display: flex;
      align-items: center;
      height: 46px;
      padding-left: 3rem;
      span {
        font-size: 1.6rem;
      }
      svg {
        width: 18px;
        margin-right: 1rem;
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