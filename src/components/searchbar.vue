<template>
    <div class = "searchbar">
        
        <mt-header :title="title" class = "searchbox">
            <div @click ="getTitle" slot="left">
                 <mt-button icon="back"></mt-button>
            </div>
        </mt-header>
    </div>
</template>
<script>

export default {
    data(){
        return{
            title:this.$store.state.activeTitle,
            
        }
    },
    mounted(){
        console.log(this.$route.query.name)
        this.title = this.$route.query.name;
    },
    watch:{
        '$store.state.activeTitle':{
            handler(data){
                this.title=data;
                console.log(data)
            }
        }
    },
    methods:{
        getTitle(){
            this.$router.history.go(-1);
           
           this.title=this.$store.state.oldTitle?this.$store.state.oldTitle:this.$store.state.activeTitle;
        // location.reload();
       }
    }
    
}
</script>
<style>
  .searchbar .searchbox{
     
        color: rgb(26, 25, 25);
        height:1rem;
        font:.4rem/.6rem "微软雅黑";
         background-color:rgba(248, 248, 250, 0.1); 
        }
</style>
