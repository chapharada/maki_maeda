import Vue from "vue";
import axios from 'axios';

new Vue({
  el: "#wrapper",
  data: {
    errorName: "名前を入力してください",
    errorEmail: "メールアドレスの形式で入力してください",
    errorMessage: "メッセージを入力してください"
  }
});