<template>
    <footer>
      <div class="inner">
        <div class="copyright">© maeda maki </div>
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
  max-width: $max-width;
  margin: 0 auto;
  padding: 1.6rem 0;
  
  .inner{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 1380px;
    width: calc(100% - 10vw);
    margin: 0 auto;
  }
  .copyright{
    text-align: left;
    line-height: 1;
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