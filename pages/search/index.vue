<template>
	<view>
		<trackPop id = 'first'>
			<view slot = "trackPoPText1">
				TCLU6662595
			</view>
		</trackPop>
		<headBar :showSaveTip="false" :showArrow="true" title="物流追踪" ></headBar>
		<view class = 'searchBox'> 
			<image src="../../static/orderSearchIcon.png" title = '搜索'></image>
			<input type="text" value = '' placeholder="请输入提单号" />	
		</view>
		
		<view class="searchContainer" v-if="Isnothing">
			<image src="../../static/searOrder.png"></image>
			<view class="searchP">
				<view class="p1">暂无数据&nbsp;&nbsp;空空如也</view>
				<view class='p2'>即可查询&nbsp;&nbsp;及时掌握货箱信息</view>
			</view>
		</view>
		<view class="searchContainer" v-if="!Isnothing">
			<view class="searchHistory">
				历史记录
			</view>
			<view v-for="(item,index) in historyData" :key="index" class="searchHistoryList">
				{{item}}
			</view>
		</view>
		
	</view>
</template>

<script>
	import headBar from '@/components/com-headBar'
	import viewPop from '../../components/com-viewPop.vue'
	
	export default{
		components:{
			headBar,
			viewPop
		},
		data(){
			return({
				Isnothing:false,
				historyData:[12312312312312,123123123123123,1231231231231555]
			})
		}
	}
</script>

<style>
	.searchBox{
		display: flex;
		margin:16px auto;
		width: 680rpx;
		height: 82rpx;
		border: 1px solid #F1F2F3;
		background-color: #F8F9FA;
		border-radius: 40rpx;
		position: relative;
	}
	.searchBox>image{
		position: absolute;
		top: 30rpx;
		left: 26px;
		width: 30rpx;
		height: 30rpx;
	}
	.searchBox>input{
		position: absolute;
		top: 15rpx;
		left: 44px;
		font-weight: regular;
		line-height: 45rpx;
		color: #767F87;
		font-size: 32rpx;
		
	}
	
	
	.searchContainer>image{
		margin: 79rpx 0 0 261rpx;
		width: 225rpx;
		height: 231rpx;
	}
	.p1,.p2{
		height: 58.5rpx;
		text-align: center;
		line-height: 58.5rpx;
	}
	.p1{
		font-weight: regular;
		color: #253342;
		margin-top: 55rpx;
	}
	
	.searchHistory{
		width: 118rpx;
		height: 42rpx;
		margin: 32rpx 0 47rpx 23rpx;
		font-weight: Medium;
		text-align: center;
		line-height: 42rpx;
		color: #253342;
		font-size: 30rpx;
	}
	
	.searchHistoryList{
		margin-left:32rpx;
		margin-bottom: 18rpx;
		float: left;
		width: 319rpx;
		height: 82rpx;
		text-align: left;
		line-height: 82rpx;
		color: #253342;
		font-size: 28rpx;
	}
	.searchHistoryList:nth-of-type(obb){
		margin-left: 44rpx;
	}
</style>
