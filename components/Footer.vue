<template>
    <footer>
      <div class="inner">
        <div class="copyright">© maeda maki </div>
        <div class="sns">
          <ul>
            <li><a href=""><img src="~/assets/img/instagram.svg"></a></li>
          </ul>
        </div>
      </div>
    </footer>
</template>
<style lang="scss" scoped >
footer{
  font-size: 1.2rem;
  max-width: $max-width;
  margin: 0 auto;
  
  .inner{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .copyright{
    text-align: left;
    line-height: 1;
    margin-right: 2em;
  }
  .sns{
    a{
      display: block;
      height: 16px;
      width: 16px;
      img{
        width: 100%;
        vertical-align: baseline;
      }
    }
  }
}
</style>