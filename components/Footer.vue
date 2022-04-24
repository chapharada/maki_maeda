<template>
    <footer>
      <div class="inner">
        <div class="copyright">©2022 maedamaki.All rights reserved.</div>
      </div>
    </footer>
</template>

<script>
import instagram from '@/assets/svg/instagram.svg';

export default {
  components:{
    instagram
  }
}
</script>

<style lang="scss" scoped >

footer{
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 3.2rem 0 4.8rem;
  background: #F7D80A;
  
  .inner{
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }
  .copyright{
    text-align: center;
    line-height: 1;
    font-size: 1rem;
    letter-spacing: .02em;
  }
  .sns{
    a{
      display: block;
      height: 16px;
      width: 16px;
      svg{
        width: 100%;
        height: auto;
        vertical-align: baseline;
      }
    }
  }
}
</style>