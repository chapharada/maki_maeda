import { debounce } from 'lodash'

export default {
  data(){
    return{
      resizeWidth: 0,
    }
  },
  methods: {
    onResize:debounce(function(){
      this.resizeWidth = window.innerWidth;
    },300)
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    console.log(this.resizeWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
};