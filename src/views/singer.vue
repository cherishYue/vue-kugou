<template>
   <div class = "singerbox">
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>

      <mt-cell
        v-for="item in list"
        :key="item.classid"
        class="list"
        :title="item.classname"
        is-link
        @click.native="goSingerList(item)"
      >     
     </mt-cell>
   </div>
</template>
<script>
export default{
    data(){
        return{
            list:[],
            isloading:true
        }
    },
    async created(){
        // console.log(this.$ajax);
        let {data}=await this.$ajax('/api/singer/class?json=true');
        //存入歌手分类
        this.list = data.list;
        // console.log(this.list)
        this.isloading =false;
    },
    methods:{
       goSingerList(item){
           this.$router.push({
               name:'singerList',
               params:{
                   id:item.classid
               },
               query:{
                   name:item.classname
               }
           })
           this.$store.commit('changeTit',item.classname);
           this.$store.commit('changeOldTit',item.classname);
       }
    }
}
</script>
<style lang = "less">
 .singerbox .list{
        background: #FBFBFB;
        display: block;
        font-size: 1rem;
        color: #333;
        border:1px solid #CCC;
        border-radius: 5px;
        margin: 0.2rem;
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