<template>
  <header id="#topmenu">
    <div class="toggle" @click="hambargarToggle" :class="{ on: isMenuActive }">
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="inner">
      <div class="logo">
        <nuxt-link to="/">
          <div class="symbol">
            <img src="~/static/img/top_logo.png" alt="" />
          </div>
        </nuxt-link>
      </div>
      <nav class="pc mainmenu">
        <nuxt-link to="/pagecv/">
          <svgLoader name="document" />
          <span>cv</span>
        </nuxt-link>
        <nuxt-link to="/works/">
          <svgLoader name="corn" />
          <span>works</span>
        </nuxt-link>
        <div class="act">
          <nuxt-link to="/contact/">
            <svgLoader name="email" />
            <span>contact</span>
          </nuxt-link>
        </div>
      </nav>
      <nav class="instagram">
        <a href="https://www.instagram.com/omaedao/" target="_blank">
          <svgLoader name="instagram" />
          <span>instagram</span>
        </a>
      </nav>
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
  @include mq(no){
    width: 270px;
    align-self: center;
    height: 100%;
  }
  .inner {
    @include mq(no) {
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      width: 270px;
      background: url('~/static/img/border_a.png') 100% center/contain no-repeat
    }
  }

  .toggle {
      width: 90px;
      height: 90px;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 40;
      transition: 0.6s ease-in-out;
      border-radius: 0 0 4px 0;
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
        &:first-child{
          top: 30px;
        }
        &:nth-child(2){
          top: 39px;
        }
        &:nth-child(3){
          top: 48px;
        }
      }
      &.on span{
        &:first-child{
          transform: rotate(45deg) translateY(7px) translateX(8px);
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
    padding-top: 2.4rem;
    @include mq(no) {
      height: auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex: 2;
      padding: 50px 40px 32px 40px;
    }
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .symbol {
      border-radius: 50%;
      width: 120px;
      img {
        width: 100%;
      }
      @include mq(no) {
        width: 160px;
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
      background: url('~/static/img/border_b.png') 100% 0 / contain no-repeat,
                  url('~/static/img/border_b.png') 0 100% / contain no-repeat;
      flex-direction: column;
      padding: 20px 0;
      a {
        height: 60px;
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