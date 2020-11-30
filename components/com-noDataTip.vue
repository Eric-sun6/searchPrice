<template>
	<view v-show="ifNoPortData" class="noDataWrap">
		<image class="nodataTip" src="../static/noData.png"></image>
		<view class="tipText">
			<text class="noAdress">没有找到地点信息</text>
			<text class="want">想要询问此点报价，您可联系客服为您服务</text>
			<text class="tel" @click="contact">客服热线：400-691-0567</text>
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
	.nodataTip{
		display: inline-block;
		width: 360rpx;
		height: 380rpx;
		
		position: relative;
		    top: 20px;
		    left: 50%;
		    transform: translateX(-50%);
	}
	.wrap{
		    height: calc(100vh - 105px);
		background:linear-gradient(    rgba(11, 70, 216, 1),    rgba(1, 70, 216, 0.8),    rgba(1, 70, 216, 0.2),    rgba(1, 70, 216, 0)  ) !important;
	}
	.tipText{
		width: 540rpx;
		height: 120rpx;
		margin: 0 auto;
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
	}
	.noAdress{
		color: #253342;
		font-size: 28rpx;
		text-align: center;
		padding-top: 20rpx;
	}
	.want{
		color: #506273;
		font-size: 28rpx;
		padding-top: 20rpx;
	}
	.tel{
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
</style>
