import Vue from "vue";
import axios from 'axios'
import "core-js/stable";
import "regenerator-runtime/runtime";

new Vue({
  el: "#wrapper",
  data: {
    history:''
  },
  created(){
    this.getdata();
  },
  methods:{
    getdata:async function(){
      const data = await axios.get(
        // APIのエンドポイント名を指定
        'https://maedamaki.microcms.io/api/v1/pagecv',
        {
          // API-KEY
          headers: { 'X-API-KEY': 'e273cb7f-c91e-4fdc-9725-ad8066b475f7' }
        }
      )
      console.log(JSON.stringify(data,null,'\t'));
      this.history = data.data;
    }
  }
})