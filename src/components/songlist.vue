<template>
    <div>
        <mt-cell class="songlist"
            v-for="item in list"
            :key ="item.audio_id"
            :title ="item.filename"
            @click.native="toPlay(item.hash)"
           > 
           <span>></span>

            
        </mt-cell>
   </div>     
</template>
<script>
 
import {MessageBox} from 'mint-ui';
export default{
    props:{
        list:{
            type:Array
        }
    },
    data(){
        return{
            hash:'',
        }

    },
     methods:{
         //音乐播放
         toPlay(hash1){
            //写入当前播放列表
            this.$store.commit('changeList',this.list);
             //给store写入hash值
             this.$store.commit('updateHash',hash1);
         },
      
    },
}

</script>
<style>

</style>