import Vue from "vue";
import axios from 'axios';

new Vue({
  el: "#wrapper",
  data: {
    name: '',
    email: '',
    message: '',
    validation: {
      name: false,
      email: false,
      validation: false,
    }
  },
  // validation
  filters: {
    nameValidator: {
      write: function (val) {
        this.validation.title = !!val
        return val
      }
    },
    emailValidator: {
      write: function (val) {
        this.validation.description = !!val
        return val
      }
    },
    descriptionValidator: {
      write: function (val) {
        this.validation.description = !!val
        return val
      }
    },
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