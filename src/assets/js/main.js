import Vue from "vue";
import MagicGrid from "vue-magic-grid";
import Cards from './components/cards.vue'
import axios from "axios";
import "core-js";
import "regenerator-runtime/runtime";

Vue.use(MagicGrid);

new Vue({
  el: "#wrapper",
  components:{
		card:Cards,
	},
  data: {
    cardsData: []
  },
  mounted: function(){
    axios.get("/assets/data/cards.json")
    .then(response => {
    	this.cardsData = response.data
    })
    .catch(function(error) {
      console.log(error);
    })
  },
  methods: {
  },
}) 