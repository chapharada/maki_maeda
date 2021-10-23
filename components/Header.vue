<template>
  <header>
    <div class="inner">
      <h1 class="logo"><NuxtLink to="/">maki maeda</NuxtLink></h1>
      <nav class="pc">
        <ul>
          <li><NuxtLink to="/works/">works</NuxtLink></li>
          <li><NuxtLink to="/pagecv/">cv</NuxtLink></li>
        </ul>
        <div class="act"><NuxtLink to="/contact/">contact</NuxtLink></div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  h1 a{
    font-size: 1.45rem;
  }
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