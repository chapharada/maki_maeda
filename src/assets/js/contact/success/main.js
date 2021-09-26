import Vue from "vue";

new Vue({ 
    el: "#wrapper",
    created:function(){
        if(sessionStorage.getItem('formcache')){
            sessionStorage.removeItem('formcache');
        }else{
            window.location.href = "/contact/" 
        }
    }
});