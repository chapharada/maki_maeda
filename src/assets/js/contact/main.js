import Vue from "vue";
import axios from 'axios';

new Vue({
  el: "#wrapper",
  data: {
    form: {
      name: '',
      email: '',
      message: '',
    },
    onError: false,
    validation: {
      name: false,
      email: false,
      message: false,
    },
    isVaild:false
  },
  computed: {
    validationName(){
      if (!this.form.name) {
        this.validation.name = false;
        return '名前を入力してください';
      }else{
        this.validation.name = true;
      }
      return ''
    },
    validationEmail(){
      const emailReg = new RegExp(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
      if(!this.form.email ){
        this.validation.email = false;
        return 'メールアドレスを入力してください'
      }else if ( !emailReg.test(this.form.email)) {
        this.validation.email = false;
        return 'メールアドレスの形式で入力してください';
      }
      this.validation.email = true;
      return ''
    },
    validationMessage(){
      if (!this.form.message) {
        this.validation.message = false;
        return 'メッセージを入力してください';
      }
      this.validation.message = true;
      return ''
    },
    confirmAll () {
      var vaild = '';
      for (var key in this.validation) {
        if (!this.validation[key]) {
          vaild = 'どうしたぁ！お前の力はこんなものか！';
        }
      }
      return vaild
    }
  },
  methods:{
    validateForm() {
      //全体の結果からtrue,falseを算出
      var checkData = [];
      for(var key in this.validation){
        checkData.push(this.validation[key]);
      }
      var checkResult = checkData.every(value => value == true);
      
      //判定の結果でエラーを表示
      if(!checkResult){
        console.log('入力内容に誤りがあります。')
        this.onError = true;
      }else{
        this.submitForm()
        this.onError = false;
      }
    },
    setParams() {
      const params = new URLSearchParams() 
      params.append('form-name', 'contact')
      params.append('name', this.name);
      params.append('email', this.email);
      params.append('message', this.message);
      return params
    },
    submitForm() {
      const params = this.setParams()
      axios.post('/', params)
      .then(() => {
        sessionStorage.setItem('formcache', true);
        location.href = "/contact/success/";
      })
      .catch(function (error) {
        console.log( params.toString())
        console.log(error.response)
        console.log('エラーです。')
      })
    }
  }
});