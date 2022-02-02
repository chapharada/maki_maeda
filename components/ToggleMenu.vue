<template>
  <div  class="toggle-menu">
    <div class="toggle-menu--content">
      <div class="toggle-menu--inner">
          <nav>
            <nuxt-link to="/">home</nuxt-link>
            <nuxt-link to="/pagecv/">cv</nuxt-link>
            <nuxt-link to="/works/">works</nuxt-link>
            <nuxt-link to="/contact/">contact</nuxt-link>
          </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .toggle-menu{
    height: 100%;
    width: 100%;
    background: #bce9ec;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    &--content{
      height: 100%;
      overflow-y: auto; 
    }
    &--inner{
      padding: 115px 0 135px;
      min-height: 100%;
      position: relative;
    }
    nav{
      a{
        display: flex;
        justify-content: center;
        margin-top: 15px;
        &:nth-child(2){
          margin-top: 50px;
        }
      }
    }
  }
</style>