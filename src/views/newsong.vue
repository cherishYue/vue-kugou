<template>
    <div class="newsongbox">   
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>
        <mt-swipe :auto="4000" class="swiperbox">
            <mt-swipe-item><img src = "http://m.kugou.com/v3/static/images/index/banner.jpg"/></mt-swipe-item>
            <mt-swipe-item v-for="item in imgArr" :key="item.id"><img :src="item.imgurl"/></mt-swipe-item>
        </mt-swipe>
        <song-list :list="list"></song-list>
    </div>
</template>
<script>
import songList from '@/components/songlist.vue';
export default{
    data(){
        return{
            list:[],
            imgArr:[],
            isloading:true
     }
    },
    //数据和事件加载完成之后执行
    created(){
        this.$ajax('/api?json=true').then(({data})=>{
            this.list = data.data;
            // console.log(data)
            this.imgArr = data.banner;
             this.isloading=false;
            // console.log(this.imgArr)
        });
    },
     methods:{
       
    },
    components:{
        songList
    }
}
</script>
<style lang="less">
.newsongbox .swiperbox{
    height:3rem;
    margin-top: .18rem;
}
 .swiperbox img{ 
     height: 100%;
     width:100%;
}
.swiperbox .mint-swipe-indicators{
    bottom:-4px;
}
.mint-swipe-indicators .mint-swipe-indicator{
    width:12px;
    height:12px;
}
.songlist .mint-cell-title{
     width:5.5rem;
}
.songlist .mint-cell-title .mint-cell-text{
     width:5.5rem;
    font-size:.362rem;
  
    // display: inline-block;
   
} 
.songlist .mint-cell-wrapper{
   height:1.5rem; 
}
.mint-cell-value .iconfont {
   font-size:.4rem;
   
}
.loaded{
    display:none;
    position:fixed;
    top:50%;
    left:50%;
    z-index: 5;
}
.loading{
    display: block;
}
</style>