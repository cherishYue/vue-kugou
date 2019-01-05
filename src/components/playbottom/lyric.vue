<template>
    <div class="m-lyric-area" ref="clientBox">
        <div class="m-lyric" :style="{'top':top}" >
          <p
          ref="oneline"
          v-for="(item,index) in newRic" :key="index"
          :class="{'bg':index==activeIndex}"
          >
            {{item[1]}}
          </p>
        </div>
    </div>
</template>
<script>
import {parseLyric} from '@/utils/utils'


export default {
    props:{
        lyric:{
            type:String
        },
        currentT:{
            type:Number
        }
    },
    data(){
        return {
            activeIndex:0,
            clientH:0,
            top:0
        }
    },
    computed:{
        //歌词数组 array
        ////歌词数据格式
        // let obj = [
        //     ['00:00.53','这是歌词'],
        //     ['00:01.53','这是歌词2'],
        // ]
        newRic(){
            if(!this.lyric){
                return [['0','暂无歌词']]
            }
    
            return parseLyric(this.lyric);
        }
    },
    mounted(){
       
        this.clientH= this.$refs.clientBox.clientHeight;
        //获取一行p标签的高度
        this.oneLineH=this.$refs.oneline[0].offsetHeight;

        this.showLineC=Math.ceil(this.clientH/this.oneLineH/2);
        console.log(this.showLineC)
    },
    watch:{
        currentT(n){
            for(var i = 0; i < this.newRic.length;i++){
                if(n > this.newRic[i][0]){
                    this.activeIndex = i
                }else{
                    break;
                }
            }
        },
        activeIndex(n){
            let num= n < this.showLineC?0:n - this.showLineC;
            this.top= -this.oneLineH*num+'px';
            console.log(num)
        }
    }
}
</script>
<style>
.m-lyric-area {
	height: 58%;
	overflow: hidden;
	position: relative;
  z-index: 2;
  margin-top: .6rem;
}

.m-lyric {
	width: 100%;
	position: absolute;
	left: 0;
    transition: 0.5s;
  top: 0;
}

.m-lyric-area p {
	text-align: center;
	line-height: 1rem;
	font-size: .3rem;
	
}


.m-lyric .bg {
	color: red;
	font-size: .4rem;
}
</style>
