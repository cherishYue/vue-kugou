<template>
<div class = "info">
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>

    <div class = "infoBox">
        <div class = "imgBoxs">
            <img :src="info.imgurl |imgUrl" width="100%"/>
        </div>
         <div class = "introduceBox" :class="{'show':flag}">
            <div class = "introduce">{{info.intro}}</div>
             <i class = "iconfont icon-xiangxiajiantou"  @click="showIn"></i>
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
            flag:false,
            info:{},
            isloading:true
        }
    },
    methods:{
        showIn(){
            this.flag=!this.flag;
        }

    },
    async created(){
        let str=`/api/plist/list/${this.$route.params.specialid}?json=true`;
        let {data} = await this.$ajax(str);
        this.info=data.info.list;
        this.list=data.list.list.info;
        this.isloading = false;
        // console.log(this.list)
        console.log(this.info)
    },
    components:{
        songList
    }

}
</script>
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
    .imgBoxs{ 
        width: 100%;
        height: 5rem;
       
        }
    .imgBoxs img{
        width: 100%;
        height: 5rem;
    
    }
   
    .introduceBox{
        padding:.4rem;
        padding-right: .7rem;
        font-size:.4rem;
        line-height: 1.8;
        font-family: "宋体";
        position: relative;
        height:.5rem;
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
        right:.3rem;
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
