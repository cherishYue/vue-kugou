<template>
<div class= "info">
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>

    <div class="infoBox">
        <div class = "imgBoxs">
            <img :src="info.imgurl | imgUrl" width="100%"/>
        </div>
        <song-list :list="list"></song-list>
    </div>
</div>    
</template>
<script>
import songList from '@/components/songlist';
export default{
    data(){
        return{
            list:[],
            info:{},
            isloading:true

        }
    },
    async created(){
        let str = `/api/rank/info/${this.$route.params.rankid}?json=true`;
        let {data} = await this.$ajax(str);
        console.log(data)
          this.info=data.info;
        this.list=data.songs.list;
        this.isloading = false;
    },
    components:{
        songList
    }
}
</script>
<style>
.info{
      position: relative;
}
.info .infoBox{
    width: 100%;
    position: absolute;
    top:-1rem;
    overflow: hidden; 
}
    .imgBoxs{ 
        width: 100%;
        height: 5rem;
       
        }
    .imgBoxs img{
        width: 100%;
        height: 5rem;
    
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