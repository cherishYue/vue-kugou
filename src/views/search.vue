<template>
<div class= "secTitle">
     <div class="search-box">
       <div  class="searchform">
            <mt-button icon = "search" class = "icon" ></mt-button>
            <input type = "text"
                placeholder="歌手/歌名/拼音" 
                v-model="value"  
               
                class ="input"/>
            <input type="submit" value="搜索" class="searchBar" @click = "searchSong" >
        </div>
      </div>
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>

      <div class = "list">
      <p class = "hot">最近热门</p>
        <mt-cell
            v-for="(item,index) in list"
            :key ="index"
            :title="item.keyword?item.keyword:item.filename"
            @click.native="getSong(item)"
        ></mt-cell>
  </div>
</div>   
</template>
<script>

export default {
    data(){
        return{
            list:[],
            value:'',
            isloading:true

        }
    },
    mounted(){
        this.$jsonp(`http://mobilecdn.kugou.com/api/v3/search/hot`,{
            format:"jsonp", plat:"0", count:"30", callbackQuery:"callback", callbackName:'cd'
        }).then((data)=>{
            this.list=data.data.info
             this.isloading=false;
            // console.log(this.list)   
        }).catch(err=>{
            console.log(err)
        });
    },
    methods:{
        searchSong(){
            this.$jsonp(`http://mobilecdn.kugou.com/api/v3/search/song`,{
                    format:"jsonp", keyword:this.value, page:"1",pagesize:"30", showtype:"1", callbackQuery:"callback", callbackName:'cd'
                }).then((data)=>{
                 console.log(data)
                this.list=data.data.info;
                })
        },
        getSong(item){
            if(item.keyword){
                this.value = item.keyword;
                console.log(this.value)
                this.searchSong();
               
            }else{
                this.$store.commit("updateHash",item.hash);
                this.$store.commit("changeList",item.list);
            }
            
        }
    
    }
 
}
</script>
<style scoped>
.search-box {
    display:flex;
    padding: .3rem;
    background: #fbfbfb;
    height:.8rem;
    justify-content: center;
}
.searchform{
    display:flex;
    background: #fbfbfb;
    height:.8rem;
    justify-content: center;
  

}
.searchform input{
    outline: none;
    border:.01rem solid #eee;
   
}
.input{
    padding-left: .1rem;
    font-size:.35rem;
}
.mint-button--normal, .mint-button--small{
     padding:0;
     height:.8rem;
}
.searchBar{
  width:1.4rem;
  height:.8rem;
  background:#2ca2f9;
  color:#fff;
  font-size:.36rem;
  margin-left:.3rem;
  border:.1rem solid #2ca2f9;
  border-radius: .1rem;
  
}
.hot{
    font:.4rem/1.2rem "微软雅黑";
    color:#2ca2f9;
    padding-left: .3rem;
     border-bottom: .01rem solid #cacaca;
}
.secTitle .list .mint-cell{
  height:1.3rem;
   
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
