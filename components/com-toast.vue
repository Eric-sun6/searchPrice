
<template>
	<view  v-if="show || showToast">
		
		<view class="bgWrap">
			<text>{{showToast}}</text>
			<view class="shade"></view>
			<view class="toast">
			   <text class="tosatText">{{toastText}}</text> 
			</view>
		</view>
	</view>
	
</template>
<script>
export default {
	data(){
		return{
			
			show: false
			
		}
	},
	props:{
		toastText: {
			default: ''
		},
		showToast:{
			default: false
		}
	},
	created() {
	
			
		
		
	},
	mounted() {
		let that = this
		setTimeout(function(){
			that.show = false
		}, 1000)
		
	},
	methods:{
	
	}
}
</script>

<style scoped>
	.toast{
		/* height: 34rpx;
		line-height: 34rpx; */
		/* width: 360rpx; */
		padding:30rpx;
		text-align: center;
		border-radius: 25rpx;
		position: fixed;
		background-color: white;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		margin-top: -17rpx;
		z-index: 10;
		color: #808080;
		min-width: 340rpx;


	}
	.tosatText{
		align-items: center;
		width: 100%;
		height: 100%;
		line-height: 45rpx;
		display: block;
		white-space: pre-line;

	}
	
	
	.shade{
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.5;
	}
	.bgWrap{    
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
/*每个页面公共css */
</style>
