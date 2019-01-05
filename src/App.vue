<template>
    <div id = "app">
        <div class = "tot">
            <mt-header class = "header">
                
                <router-link to = "/" slot = "left">
                    <img class = "logo" src = "./assets/images/logo.png"/>
                    
                </router-link>
                <mt-button icon = "search" class = "icon" slot = "right" @click ="getSearch"></mt-button>
            </mt-header>
            <router-view name = "navbar"/>
        </div>
        <div class ="top"></div>
        <router-view/>
        <player></player>
    </div>
</template>
<script>
import player from '@/components/playbottom';
export default {
 components:{
   player
 },
 methods:{
     getSearch(){
         this.$router.push({name:'search',query:{name:"搜索"}});
        this.$store.commit('changeTit',"搜索");

     }
 }
}
</script>
<style lang = "less" scope>
*{
    margin:0;
    padding:0;
}
#app{
    position: relative;
}
a{
    text-decoration:none;
}
img{
    vertical-align: middle;
}
#app .header{
   width: 100%;
  height: 1.3rem;
}
#app .top{
  width: 100%;
  height: 2.3rem;
}
#app .tot{
  width: 100%;
  height: 3rem;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index:6;
 
}
.logo{
    width:3rem;
}

.icon{
    font-size:.3rem;
}
.mint-button-icon .mintui{
    font-size: .5rem;
}
</style>