import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTitle:'',
    activeHash:'',
    oldTitle:'',
    list:[]
  },
  mutations: {
    changeTit(state,val){
      state.activeTitle = val;
      // console.log(val)
     
    },
    changeOldTit(state,val){
      // console.log(val)
      state.oldTitle = val;
    },
    updateHash(state,val){
      // console.log(val);
      state.activeHash = val;
    },
    changeList(state,arr){
      // console.log(arr);
      state.list=arr;
    },
   
  },
  actions: {

  }
});
