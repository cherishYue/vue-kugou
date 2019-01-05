<template>
    <div class="m-bottom">
        <div class="m-progress-box">
            <span class="current-time">{{newCurrentTime}}</span>
            <div class="m-progress" ref="allLine">
                <div class="m-progress-line">
					<!-- 当前进度 -->
                <div ref="lined" class="m-progress-lineed" 
				:style="{'width':endX}"></div>
                </div>
				<!-- 点 -->
                <div ref="circle" class="m-progress-circle"
				:style="{'left':endX}"
				@touchstart ='start'
				@touchmove ='move'
				@touchend ='end'
				
				></div>
            </div>
			<!-- 显示总时间 -->
            <span class="total-time">{{totalTime}}</span>
        </div>
        <div class="m-play-control">
            <div class="m-play-btn iconfont icon-shangyishou"
                @touchstart="()=>{$emit('prev')}"></div>
            <div class="m-play-play-btn iconfont play-song"
                :class ="{'icon-bofang':!isPlay,'icon-zanting':isPlay}"
                @touchstart="()=>{$emit('changePlay')}"></div>
            <div class="m-play-btn iconfont  icon-xiayishou"
                @touchstart="()=>{$emit('next')}"></div>
        </div>
  </div>
</template>
<script>
//引入把秒转换为分
import {sToM} from '@/utils/utils.js';

export default{
    props:{
        isPlay:{
            type:Boolean
		},
		currentTime:{
			type:Number
		},
		duration:{
			type:Number
		},
		songInfo:{
			type:Object
		}
		
	},
	data(){
		return{
			lineW:0,//播放条总宽度
			linedW:0,
			circleLeft:0,
			maxX:0,
			darg:false,
            dragedTime:0,// 拖拽后的时间位置
		}
	},
	mounted(){
		//获取进度条的宽度
		this.lineW = this.$refs.allLine.offsetWidth;
		//获取当前进度条做大值
		this.maxX = this.lineW - this.$refs.circle.offsetWidth;

	},
	computed:{
		//获取当前播放时间转化成分
		newCurrentTime(){
			return sToM(this.currentTime)
		},
		//获取总时间转化成分
		totalTime(){
			return sToM(this.duration)
		},
		//获取当前进度条宽度
		endX(){
			if(this.linedW<0){
				this.linedW = 0;
			}else if(this.linedW>this.maxX){
				this.lineW = this.maxX;
			}
			return this.linedW + 'px';
		}


	},
	watch:{
		currentTime:{
			handler(data){
				  if(this.drag)return;
              //比例 当前播放时间/总时间 * line.width = 当前lined.width
				this.linedW = data/this.duration*this.lineW;
			}
		}
	},
	methods:{
		start(){
			this.drag = true;
		},
		move(e){
			let allLineL = this.$refs.allLine.getBoundingClientRect().left;
			this.circleLeft=this.linedW=e.changedTouches[0].pageX-allLineL;
		},
		end(){
			this.drag = false;
			//获取拖拽后的播放时间
			this.dragedTime = this.linedW/this.lineW*this.duration;
			//发送拖拽后时间给父级
			this.$emit('dragTime',this.dragedTime);
		},

		
	}

}
</script>
<style scoped>
    .m-play-control .iconfont{
        font-size: .5rem;
     }
     .m-play-control .icon-bofang{
        font-size: 1rem;
     }

    .m-bottom {
	width: 100%;
	position: absolute;
	bottom: .5rem;
	left: 0;
}
.m-play-control .m-play-btn:before{
    font-size: .5rem;
}
.m-progress-box {
	padding: 0 .2rem;
	box-sizing: border-box;
	font-size: .3rem;
	display: flex;
	align-items: center;

}

.m-progress-box span {
	width: 1rem;
}

.m-progress {
	width: 7rem;
	height: .44rem;
	margin: 0 .1rem;
	display: flex;
	align-items: center;
	position: relative;
	-overflow: hidden;
}

.m-progress-line {
	width: 100%;
	background:#9c8d88;
	height: .06rem;
	position: relative;
}

.m-progress-lineed {
	width: 0;
	background: #d23d43;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
}

.m-progress-circle {
	width: .4rem;
	height: .4rem;
	background: #fff;
	position: absolute;
	left: 0;
	top: 0;
	border-radius: 50%;
	z-index: 2;
}

.m-play-control {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: .1rem;
}

.m-play-play-btn {
	width: 1rem;
	height: 1rem;
	background: #c84040;
	border-radius: 50%;
	margin: 0px .56rem;
	

}

.m-play-btn:before {
	font-size: .4rem;
	color: #fff;
	display: block;
	text-align: center;
	line-height: .85rem;
}

.m-play-play-btn {
	font-size: .8rem;
	color: #fff;
	display: block;
	text-align: center;
	line-height: 1rem;
}

.m-play-btn {
	width: .85rem;
	height: .85rem;
	background: #c84040;
	border-radius: 50%;
}
</style>
