<template>
<!-- //当前歌曲列表 
    //你点击的歌曲是哪首
-->
    <div>
        <div class="play-bottom" ref="playbox" style="bottom:-3rem;">
            <div class="play-left" @click="showPlayBox">
                <img :src="songInfo.imgUrl | imgUrl" />
                <p>
                    <span>{{songInfo.songName}}</span>
                    <span>{{songInfo.singerName}}</span>
                </p>
            </div>
            <div class="play-right">
                <!-- 上一首 -->
                <div class="iconfont  icon-shangyishou"  
                    @touchstart="prev"></div>
                    <!-- 切换 -->
                <div
                    class="iconfont play-song" 
                    :class="{'icon-bofang':!isPlay,'icon-zanting':isPlay}"
                    @touchstart="playorpause"
                    >
                </div>
                <!-- 下一首 -->
                <div class="iconfont icon-xiayishou"
                    @touchstart="next">
               </div>      
            </div>
        </div>
        <audio ref="audio" preload :src="songInfo.url" ></audio>
        <play-box
            @backTop="hidePlayBox"
            :top ="playBoxTop"
            :songInfo="songInfo"
            :isPlay="isPlay"
            @changePlay="playorpause"
            @next='next'
            @prev='prev'
            :currentTime="currentTime"
            :duration="duration"
            @dragTime="changePlayTime"
            :lyric ="lyric"
        >    
        </play-box>
    </div>
</template>
<script>
import playBox from '@/components/playbottom/playbox';

export default {
    data(){
        return {
            hash:this.$store.state.activeHash,
            list:this.$store.state.list,
            songInfo:{},
            isPlay:false,//不播放
            audio:'',
            songIndex:0,
            playBoxTop:'100rem',
            currentTime:0,
            duration:0,
            lyric:''

        }
    },
    mounted(){
        //监控播放位置发生变化
        //timeupdate 事件在音频/视频（audio/video）的播放位置发生改变时触发。
        // timeupdate 事件通常与 Audio/Video 对象的 currentTime 属性一起使用，
        //该属性返回音频/视频（audio/video）的播放位置（以秒计）。
                        
        this.$refs.audio.addEventListener('timeupdate',()=>{
            this.currentTime=this.audio.currentTime;
        })
    },
    created(){
        // console.log(this.$store.state.list);
    },
    //监控数据
    watch:{
        '$store.state.list':{
            handler:function(data){
               this.list=data;
            }
        },
        '$store.state.activeHash':{
            handler:function(data){
               this.hash=data;//当前歌曲的hash
               this.getSong();
            }
        },
        '$route.path':{
            handler(data){
                this.$refs.playbox.style.bottom ="-2rem"
                this.$refs.audio.pause()
            }
        }
    },
    components:{
        //注册
        playBox
    },
    methods:{
         //设置拖拽后播放时间
        changePlayTime(t){
            this.audio.currentTime = t;
        },
        //显示播放页
        showPlayBox(){
            this.playBoxTop = '0';
        },
        //关闭播放页
        hidePlayBox(val){
            this.playBoxTop = val;
        },
        //上一首歌曲
        prev(){
            //获取上一首的hash
            this.songIndex--;
            if(this.songIndex ==0){
                this.songIndex=this.list.length-1;
            };
            this.$store.commit('updateHash',this.list[this.songIndex].hash);

        },
        //下一曲歌曲
        next(){
            //获取下一首歌的hash
            this.songIndex++;
            if(this.songIndex==this.list.length){
                this.songIndex=0;
            }
            this.$store.commit('updateHash',this.list[this.songIndex].hash);
        },
        getSong(){
            this.$ajax({
                url:'/api/app/i/getSongInfo.php',
                params:{
                    cmd:'playInfo',
                    hash:this.hash
                }
            }).then(({data})=>{
                
                //显示播放器
                this.$refs.playbox.style.bottom=0;
                // console.log(data)//拿到当前点击的歌曲
               this.songInfo=data;
               console.log(this.songInfo)

                //切换播放状态
                this.isPlay=true;
                this.audio=this.$refs.audio;

                //资源预加载
                this.$refs.audio.addEventListener('loadeddata',()=>{
                    this.$refs.audio.play();
                    //获取音频总时间
                    this.duration = this.$refs.audio.duration;
                    // console.log(this.$refs.audio.duration)
               })

                //当播放完毕时 自动播放下一曲
                this.audio.addEventListener('ended',()=>{
                    //console.log('结束了');                   
                   this.next();
                })
                //获取当前歌曲的下标值
                //歌曲 列表  this.list
                //当前歌曲的hash值  this.hash
                this.songIndex= this.list.findIndex((e)=>{return e.hash==this.hash});
                //获取歌词
               //http://m.kugou.com/app/i/krc.php?cmd=100&hash=7A4B2B9F2F2C31205534574B3356BE76&timelength=1
               this.$ajax({
                   url:'/api/app/i/krc.php',
                   params:{
                       cmd:100,
                       hash:this.hash,
                       timelength:1
                   }
               }).then(({data})=>{
                //    console.log(data);
                   this.lyric=data;
               })
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        //播放暂停切换
        playorpause(){
           this.isPlay=!this.isPlay;
           if(this.isPlay){
               this.audio.play();
           }else{
               //暂停
               this.audio.pause();
           }
        }
    }

}
</script>

<style scoped>
  #app .play-bottom {
  width: 100%;
  height: 1.5rem;
  background-color:rgba(5, 5, 5, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: hidden;
  transition: .3s;
  z-index: 9;
}
.play-left {
  width: 55%;
  height: 100%;
  float: left;
  overflow: hidden;
  position:relative;
  box-sizing: border-box;
  display: flex;
}
.play-left img {
  width: 1.5rem;
  float: left;
}
.play-left p {
  margin: auto 0;
  width: 60%;
  color: #fff;
  float: left;
  font-size: .35rem;
  margin-left: .1rem;
}
.play-left p span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.play-left p span:nth-child(2){
  font-size: .3rem;
}
.play-right {
  position:relative;
  float: left;
  width: 40%;
  box-sizing: border-box;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: .1rem;
  height: 100%;
}
.play-right > div {
  font-size: .7rem;
  color: #fff;
}
.play-right .icon-bofang{
     font-size: 1.2rem;
}

.play-right > div:active{
  color: #e5e5e5;
}
</style>