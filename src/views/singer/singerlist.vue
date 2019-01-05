<template>
    <div>
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>

        <mt-cell
            class="singerList"
            v-for="item in list"
            :key="item.singerid"
            :title="item.singername"
            is-link
            @click.native="goSingerInfo(item)"
        >
            <img slot="icon" :src="item.imgurl | imgUrl" height="60px"/>
        </mt-cell>
    </div>
</template>
<script >
export default{
    data(){
        return{
            list:[],
            isloading:true
        }
    },
    async created(){
        //获取地址栏的动态参数
        console.log(this.$route);
        let str = `/api/singer/list/${this.$route.params.id}?json=true`; 
        let {data} = await this.$ajax(str);
        this.list=data.singers.list.info;
        //  console.log(this.list)
        this.isloading=false;
  },
  methods:{
    goSingerInfo(item){
        this.$router.push({
            name:'singerInfo',
            params:{
                singerId:item.singerid
            },
            query:{
                name:item.singername
            }
        });
        this.$store.commit("changeTit",item.singername)
    }
  }
}
</script>
<style scoped>
.singerList{ 
    border-bottom: 1px solid #EEE; 
    margin-top: 0.2rem;
    margin-bottom: 0.2rem; 
    padding: 10px;
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