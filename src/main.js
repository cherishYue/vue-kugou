import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import mint from 'mint-ui';
import 'mint-ui/lib/style.min.css';
import axios from "axios";
import jsonp from "vue-jsonp";
import '@/assets/font/iconfont.css';
Vue.config.productionTip = false;
//这时候如果在其它的组件中，是无法使用 axios 命令的。但如果将 axios 改写为 Vue 的原型属性,就能直接在组件的 methods 中使用 $ajax 命令
//将axios注册成为vue下的实例化方法
Vue.prototype.$ajax = axios;
Vue.use(jsonp);

//注册过滤器
Vue.filter('imgUrl',(data,size=240)=>{
  //{size} = > 240
  if(data){
    return data.replace('{size}',size);
  }else{
    return data;
  }
})

Vue.use(mint);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
