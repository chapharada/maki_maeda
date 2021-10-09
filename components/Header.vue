<template>
  <header>
    <div class="inner">
      <h1><a href="/">maki maeda</a></h1>
      <nav class="pc">
        <ul>
          <li><a href="#">works</a></li>
          <li><a href="/pagecv/">cv</a></li>
        </ul>
        <div class="act"><a href="/contact/">contact</a></div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  .inner {
    max-width: $max-width;
    margin: 0 auto;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-weight: bold;
      font-size: 1.1rem;
      letter-spacing: 0.008em;
    }
    nav {
      display: flex;
      font-size: 1.2rem;
      a {
        padding: 1.6rem 0;
      }
      ul {
        display: flex;
        margin-right: 3.2rem;
        li {
          & + li {
            margin-left: 3.2em;
          }
        }
      }
    }
  }
}
</style>