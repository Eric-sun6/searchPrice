<template>
	<view class="tabBarWrap">
		<view class="tab" @tap = "goToIndex">
			<image v-if="tabName=='index'" class="icon" src="../static/selectedTabbar1.png" ></image>
			<image v-else class="icon" src="../static/tabBar1.png" ></image>
			<view :class="['tabItem',{'active':tabName=='index'}]">询价</view>
		</view>
		
		<view class="tab" @tap="goToLogistics">
			<image v-if="tabName =='index'"class="icon" src="../static/tabBar2.png" ></image>
			<image  v-else  class="icon" src="../static/dd.png" ></image>
			
			<view :class="['tabItem',{'active':tabName=='logistics'}]">追踪</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			// // 通过获取上级页面传递过来的参数判断哪一个页面被选择
			tabName:{
				type : String,
				default : 'index'
			}
		},
		
		data() {
			return {
				// tabName:''
			};
		},
		onLoad: function (options) {
			// console.log(options)
		},
		watch:{
			tabName:function(val){
				this.$props.tabName = val
			}
		},
		methods:{
			// 跳转到首页
			goToIndex(e){
			
				uni.redirectTo({
					url:"/pages/index/index?tabName=index"
				})
			},
			
			// 跳转到查询页面
			goToLogistics(e){ 
				
				uni.redirectTo({
				    url: "/pages/logistics/index?tabName=logistics"
				});
			},
		},
		
		mounted() {
		console.log(this.tabName)
		}
	}
</script>

<style lang="scss">
	.tabBarWrap{
		position: fixed;
		bottom: 0;
		width: 748rpx;
		height: 100rpx;
		background: #FFFFFF;
		box-shadow: 0rpx -6rpx 26rpx 0rpx rgba(0, 0, 0, 0.05);
		display: flex;
		.tab{
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon{
				margin-top: 10rpx;
				margin-bottom: 4rpx;
				width: 47rpx;
				height: 47rpx;
			}
			.tabItem{
				width: 100%;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #9BA0A3;
				line-height: 33rpx;
				text-align: center;
			}
			.active{
				color: #3754D3;
			}
		}
	}
</style>
