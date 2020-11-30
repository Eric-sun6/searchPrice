<template>
  <view 
	v-if="showChoseBox"
    class="checkWrap">
    <view class="shade">
     
    </view>
	<view class="tipWrap">
	<view>
		<slot name="chekboxChoose"></slot>
	</view>
		
	</view>
   
  </view>
  
</template>
<script>
	export default{
		props:{
			
			showChoseBox:{
				default: false,
				type: Boolean
			}
			
		},
		computed:{
			
		}
	};
</script>
<style scoped lang="less">
	.checkWrap{
		idth: 100%;
		height: 100%;
		position: fixed;
		
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;

	}
	.shade{
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.5;
		
		
		

	}
	.close{
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		    position: relative;
		    z-index: 1000;
		    top: 5rpx;
		    left: 264rpx;
	}
	.tipWrap{
		position: absolute;
		    bottom: 0;
		    left: 0;
			background-color: white;
			// padding: 40rpx 36rpx 160rpx 36rpx;
			border-radius:20rpx 20rpx 0px 0px;
			    text-align: justify;
				right: 0;
	}
	
</style>
