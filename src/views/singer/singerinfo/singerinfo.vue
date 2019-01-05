<template>
<div class = "info">
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>

    <div class = "infoBox">
        <div class="imgBox">
            <img :src="info.imgurl | imgUrl" alt="" width="100%" />
        </div>
        <div class = "introduceBox" :class ="{'show':flag}">
            <div class = "introduce"> {{info.intro}}</div>
            <i class = "iconfont icon-xiangxiajiantou"  @click="showIn"></i>
        </div>

        <song-list :list="list"></song-list>
    </div>
 </div>   
</template>
<script>
import songList from '@/components/songlist';
export default {
    data(){
        return {
            list:[],
            info:{},
            flag:false,
            isloading:true,
        }
    },
    methods:{
        showIn(){
            this.flag=!this.flag;
            
            
        }
    },
    async created(){
        let str= `/api/singer/info/${this.$route.params.singerId}?json=true`;
        let {data}  = await this.$ajax(str);

        this.info=data.info;
        this.list=data.songs.list;
        this.isloading = false;

        // console.log(this.list);
    },
    components:{
        songList
    }
}
</script >
<style scoped>
.info{
      position: relative;
}
.info .infoBox{
    width: 100%;
    position: absolute;
    top:-1rem;
    overflow: hidden; 
}
    .imgBox{ 
        width: 100%;
        height: 5rem;
       
        }
    .imgBox img{
        width: 100%;
        height: 5rem;
    
    }
   
    .introduceBox{
        padding:.4rem;
        padding-right: .8rem;
        font-size:.4rem;
        line-height: .8rem;
        font-family: "宋体";
        position: relative;
        height:.35rem;
    }
    .introduce{
        display: inline-block;
    }
    .show{
         height:auto;
    }
    .introduceBox .icon-xiangxiajiantou{
        position: absolute;
        top:.38rem;
        right:.2rem;
        font-size: .5rem;
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
