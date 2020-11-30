<template>
	<view class="wrap">
		<view v-show="ifNoPortData" class="noDataWrap">
				<view class="nodata">
					<text class="nodataText">暂无报价方案</text>
					<image class="nodataTip" src="../static/wbj@3x.png"></image>
					</view>
				
				<view class="tipText">
					<!-- <text class="noAdress">没有找到地点信息</text> -->
					<text class="want">想要查询此点报价？</text>
					 <text class="service">您可联系客服为您服务</text>
					<text class="tel" @click="contact">客服热线：400-691-0567</text>
				</view>
			</view>
	</view>
	
</template>

<script>
	export default{
		props:{
			ifNoPortData:{
				default:false,
				type: Boolean
			}
		},
		methods:{
			contact(){
				uni.makePhoneCall({
				 	
				 	// 手机号
				    phoneNumber: '4006910567', 
				
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},
				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					},
				})
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
	.noDataWrap{padding-top: 60rpx;
	position: relative;
	    top:17%;
	
	border-radius: 15rpx;
		background-color: #F4F6FB;
		margin:20rpx 30rpx 0 30rpx;
		display: flex;
		    flex-direction: column;
		    align-self: stretch;
		height: 68%;
	}
	.nodataTip{
		display: inline-block;
		width: 400rpx;
		height: 390rpx;
		position: relative;
		    top: 20px;
		    left: 60%;
		    transform: translateX(-50%);
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
	.noAdress{
		color: #253342;
		font-size: 28rpx;
		text-align: center;
		padding-top: 20rpx;
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
	.tel{
		 margin-top: 80rpx;
		display: inline-block;
		width: 414rpx;
		height: 88rpx;
		border-radius: 45rpx;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
		margin: 0 auto;
		padding: 20rpx 0;
		margin-top: 80rpx;
		background:linear-gradient(194deg,rgba(255,201,145,1) 0%,rgba(255,152,88,1) 100%);
	}
	.nodataText{
		color: #96A0AE;
		font-size: 28rpx;
		font-weight: bold;
		    position: absolute;
		    top: 44px;
		    left: 50%;
		    z-index: 1;
		    transform: translateX(-50%);
		
		
		
		
		

	}
	.nodata{
		position: relative;
	}
	
</style>
