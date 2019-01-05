<template>
    <div class="m-main" :style ="{'top':top}">
        <!-- 显示歌名 -->
        <mt-header class="hide-player" :title="songInfo.songName">
            <div slot="left">
                <mt-button icon="back" @click="backTop"></mt-button>  
            </div>
        </mt-header>
        <div class="bg-overlay"></div>
        <div class="play-overlay"></div>
        <!-- 子组件 -->
        <lyric :lyric="lyric" :currentT="currentTime"></lyric>
        <control
            :isPlay="isPlay"
            @changePlay="()=>{$emit('changePlay')}"
            @next="()=>{$emit('next')}"
            @prev="()=>{$emit('prev')}"
            :songInfo="songInfo"
            :currentTime="currentTime"
            :duration ="duration"
            @dragTime ="(t)=>{$emit('dragTime',t)}"
            
        />
    </div>
</template>
<script>
// 引入子组件
import control  from '@/components/playbottom/control'
import lyric from '@/components/playbottom/lyric';
export default{
    // data(){
    //     return{
    //         imgUrl: this.songInfo.imgUrl | imgUrl
    // :style ="{'backgroundImage':url({imgUrl})}
    //     }
    // },
    props:{
        top:{
            type:String,
            default:'0'
        },
        songInfo:{
            type:Object,
        },
        isPlay:{
            type:Boolean,
        },
        currentTime:{
            type:Number
        },
        duration:{
            type:Number
        },
        lyric:{
            type:String
        }
    },
    methods:{
        backTop(){
            this.$emit('backTop','100rem');
        }
    },
    // 注册子组件
    components:{
        control,
        lyric,
    }
}
</script>
<style scoped>
.clear:after {
	display: block;
	content: "";
	clear: both;
}

.m-main {
  width: 100%;
	height: 100%;
	position: fixed;
  left: 0;
  top: 100rem;
	box-sizing: border-box;
	color: #fff;
	background: rgba(0,0,0,.6);
	z-index: 10;
	transition: .5s;
}
.bg-overlay {
	background: url(http://singerimg.kugou.com/uploadpic/softhead/240/20180119/20180119175122445.jpg) no-repeat;
	background-size: cover;
	filter: blur(10px);
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.play-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
}


#app .hide-player {
  background: rgba(255,255,255,0);
  color: #fff;
  z-index: 999;
  height: 1rem;
  font-size:.5rem;;
}
</style>