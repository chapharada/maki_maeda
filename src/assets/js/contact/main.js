import Vue from "vue";
import axios from 'axios';

new Vue({
  el: "#wrapper",
  data: {
    errors: [],
    form: {
      name: null,
      email: null,
      message: null
    }
  }
});