


<template>
  <div class="success">
    <div class="sucess-inner">
        <h1>受付完了</h1>
        <p>お問い合わせありがとうございました。</p>
        <p>2〜5日ほどで返信いたします。お手数をおかけいたしますが、少々お待ちください。</p>
        <div class="privacy">
          <h2>【個人情報の取扱いについて】</h2>
          <p>お寄せいただいた個人情報を、回答以外の目的に利用したり、第三者に提供することはございません。お預かりした個人情報は、ご質問に対する回答が済み次第、削除いたします。</p>
        </div>
        <div class="top">
          <nuxt-link to="/">トップに戻る</nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          type: 'text/javascript',
          src: "/js/form.js",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .success{
    @include mq(no){
      height: calc(100vh - 200px);
    }
    display: flex;
    align-items: center;
    p{
      font-size: 1.45rem;
    }
    h1{
      font-size: 2rem;
      @include mq(no){
        font-size: 2.4rem;
      }
      color: #27c4ac;
      border-bottom: 1px solid #d1d1d1;
      padding-bottom: 0.8rem;
      margin-bottom: 2.4rem;
    }
    .privacy{
      margin: 2.4rem 0;
      background: #f8f8f8;
      padding: 3.2rem;
      font-size: 1.25rem;
      color: #555;
      p{
        font-size: 1.25rem;
      }
    }
    .top{
      a{
        color: #fc4a2b;
        text-decoration: underline;
        font-size: 1.2rem;
      }
    }
  }
</style>