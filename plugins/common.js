
const getImg = function(locate,name){
  return name ? require(`@/assets/img/${locate}/${name}`) : ''
}

export default ({}, inject) => {
  inject('getImg', getImg);
}