<template>
    <div class="songlists">
     <mt-spinner :type="3" color='#26a2ff' :size='40' :class ="{'loading':isloading}" class="loaded" ></mt-spinner>
        
        <mt-cell
            v-for ='item in list'
            :key='item.playcount'
            :title="item.specialname"
            is-link
            @click.native="goListinfo(item)"
            >
            <p class='p'>
                <i class= "iconfont icon-icon-test"></i>
                <span class="num">{{item.playcount}}</span>
            </p>
            <img slot='icon' :src='item.imgurl | imgUrl' height= "80px"/>
            
          
        
        </mt-cell>

       
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            isloading:true
        }
    },
    async created(){
        let {data} = await this.$ajax('/api/plist/index?json=true');
        this.list = data.plist.list.info;
        this.isloading = false;
        // console.log(this.list)
    },
    methods:{
        goListinfo(item){
            this.$router.push({
                name:'listinfo',
                params:{
                    specialid:item.specialid
                },
                query:{
                    name:item.specialname
                }
            })
            this.$store.commit('changeTit',item.specialname);
            this.$store.commit('changeOldTit',item.specialname);

        }
    }
    
}
</script>
<style lang="less" >
.songlists .mint-cell-wrapper {
    height: 2.5rem;
    position: relative;
    // margin: .2rem;
    }
.songlists .mint-cell .mint-cell-wrapper .mint-cell-title .mint-cell-text{
    width:3rem;
     display: block;
    position: absolute;
    top: 0.7rem;
    left: 2.4rem;


}

.songlists .mint-cell .mint-cell-wrapper .mint-cell-value .p{
    display: block;
    position: absolute;
    bottom: 0.5rem;
    left: 2.4rem;
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
