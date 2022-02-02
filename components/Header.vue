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
<<<<<<< HEAD
      <h1 class="logo"><a href="/">maki maeda</a></h1>
      <nav class="pc">
        <ul>
          <li><a href="/info/">info</a></li>
          <li><a href="/works/">works</a></li>
          <li><a href="/pagecv/">cv</a></li>
        </ul>
        <div class="act"><a href="/contact/">contact</a></div>
=======
      <div class="logo">
        <nuxt-link to="/">
          <div class="symbol">
            <img src="~/static/img/top_logo.png" alt="" />
          </div>
          <h1>
            <svgLoader name="name" />
          </h1>
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
        <a href="https://www.instagram.com/omaedao/">
          <svgLoader name="instagram" />
          <span>instagram</span>
        </a>
>>>>>>> main_dev
      </nav>
    </div>
    <ToggleMenu v-if="isMenuActive" /> 
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
      span{
        width: 25px;
        height: 3px;
        position: absolute;
        left: 35px;
        background: #222;
        display: block;
        transition: 0.2s ease-in-out;
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
      background: #ffd67b;
      border-radius: 50%;
      width: 120px;
      img {
        width: 100%;
      }
      @include mq(no) {
        width: 160px;
      }
    }
    h1 {
      margin-top: 1.2rem;
      letter-spacing: 0.5em;
      font-size: 1.8rem;
      width: 88px;
      height: auto;
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
      // border-width: 1px 0 1px 0;
      // border-color: #d1d1d1;
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
        height: auto;
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
</style>