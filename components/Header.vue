<template>
  <header>
    <div class="inner">
      <div class="logo">
          <nuxt-link to="/">
          <div class="symbol">
            <img src="~/static/img/logo.png" alt="">
          </div>
          <h1>前田真喜</h1>
          </nuxt-link>
      </div>
      <nav class="pc mainmenu">
         <nuxt-link to="/works/">これまでの作品</nuxt-link>
         <nuxt-link to="/pagecv/">まえだ？</nuxt-link>
        <div class="act"><nuxt-link to="/contact/">お問い合わせ</nuxt-link></div>
      </nav>
      <nav class="instagram">
        <a href="https://www.instagram.com/omaedao/">
          <svgLoader name="instagram" />
          <span>instagram</span>
        </a>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>

header {
  .inner {
    @include mq(no){
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      width: 270px;
      border-right: 1px solid #d1d1d1;
    }
  }
  .logo{
    padding-top: 2.4rem;
    @include mq(no){
      height: auto;
      display: flex;
      justify-content: left;
      align-items: flex-start;
      flex: 2;
      padding: 50px 0 32px 40px;
    }
    a{
      display: flex;
      flex-direction: column;      
      align-items: center;
    }
    .symbol{
      width: 120px;
      img{
        width: 100%;
      }
      @include mq(no){
        width: 160px;
      }
    }
    h1{
      margin-top: 1.2rem;
      letter-spacing: .5em;
      font-size: 1.8rem;
    }
  }
  .mainmenu{
    &.pc{
      display: none;
      @include mq(no){
        display: flex;
        font-size: 1.45rem;
      }
      border-width: 1px 0 1px 0;
      border-color: #d1d1d1;
      flex-direction: column;
      padding: 20px 0;
      a{
        height: 46px;
        line-height: 1;
        padding-left: 3rem;
        display: flex;
        align-items: center;
        transform-origin: center;      
      }
    }
  }
  .instagram{
    display: none;
    @include mq(no){
      display: block;
    }
    padding: 1.2rem 0;
    a{
      display: flex;
      align-items: center;
      height: 46px;
      padding-left: 3rem;
      span{
        font-size: 1.6rem;
      }
      svg{
        width: 18px;
        margin-right: 1rem;
      }
    }
  }
}
</style>