<template>
	<view class="wrap">
		<view v-if="ifreload" class="reloadWrap">
				<view class="netBreak">
					<image class="netBreakTip" src="../static/reload.jpeg"></image>
				</view>
				<view class="tipText" @click="reloadPlanList">
					<text class="ops">出了点状况 请检查网络后<text class="reloadText">重试</text></text>
				
				</view>
			</view>
	</view>
	
</template>

<script>
	export default{
		props:{
			ifreload:{
				default:false,
				type: Boolean
			}
		},
		methods:{
			reloadPlanList(){
				this.$emit('reloadPlanData',true)
			}
		}
	}
</script>

<style scoped lang="less">
	.wrap{
		overflow: hidden;
		    position: absolute;
		    top: 0;
		   background: 
		   linear-gradient(
		     rgba(11, 70, 216, 1),
		   	 rgba(11, 70, 216, 1),
		     rgba(1, 70, 216, 0.8),
		     rgba(1, 70, 216, 0.2),
		     rgba(1, 70, 216, 0)
		   );
		 
		    bottom: 0;
		    left: 0;
		    right: 0;
		overflow: hidden;
	}
	.reloadWrap{padding-top: 60rpx;
	position: relative;
	    top:17%;
	z-index: 99;
	border-radius: 15rpx;
		background-color: #F4F6FB;
		margin:20rpx 30rpx 0 30rpx;
		display: flex;
		    flex-direction: column;
		    align-self: stretch;
		height: 68%;
	}
	
	.tipText{
		width: 540rpx;
		height: 120rpx;
		margin: 0 auto;
		margin-top: -20rpx;
		// padding-top: 80rpx;
		display: flex;
		text-align: center;
		flex-direction: column;
	}
	.ops{
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(116,128,156,1);
		padding-top: 20rpx;
	}
	.reloadText{
		color: #477EFF;
		font-size: 32rpx;;
	}
	.want{
		color: #74809C;
		font-size: 28rpx;
		padding-top: 20rpx;
		// padding-bottom: 80rpx;
	}
	.service{
		color: #74809C;
		font-size: 28rpx;
		 padding-bottom: 80rpx;
	}
	
	.netBreak{
		position: relative;
	}
	.netBreakTip{
		width: 387rpx;
		display: block;
		margin: 0 auto;
		margin-top: 180rpx;
	}
	
</style>
