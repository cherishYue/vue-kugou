<template>
    <div>
        <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>
       <mt-cell
       class="ranklist"
           v-for='item in list'
           :key ='item.rankid'
           :title='item.rankname'
           is-link
           @click.native="goRankinfo(item)"
                >
                <img slot='icon' :src='item.imgurl | imgUrl' height="80px"/>
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
        let {data} = await this.$ajax('/api/rank/list?json=true');
        this.list = data.rank.list;
        this.isloading=false;
        // console.log(this.list)
    },
    methods:{
        goRankinfo(item){
            this.$router.push({
                name:"rankinfo",
                params:{
                    rankid:item.rankid
                },
                query:{
                    name:item.rankname
                }
            })
            this.$store.commit('changeTit',item.rankname);
            this.$store.commit('changeOldTit',item.rankname);
        }
    }

}
</script >

<style>
 .mint-cell-title{
    margin:.2rem;

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