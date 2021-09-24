import Vue from "vue";
import axios from 'axios';

new Vue({
  el: "#wrapper",
  data: {
    name: '',
    email: '',
    message: '',
    isError: false
  },
  computed: {
  },
  methods:{
    validateForm() {
      this.submitForm()
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
        location.href = "/contact/success/";
        sessionStorage.setItem('formcache', true);
      })
      .catch(function (error) {
        console.log( params.toString())
        console.log(error)
        console.log('エラーです。')
      })
    }
  }
});