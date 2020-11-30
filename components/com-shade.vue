<template>
  <view 
	
    class="shadeWrap">
    <view class="shade">
     
    </view>
	<view class="tipWrap">
		<view >
			
			<image class="close" src="../static/close.jpeg"  @click="closeShade"></image>
			<text class="title"  @click="closeShade">
				<text>{{titleText}}</text>
			</text>
			<text class="duty" :style="{fontSize:textStyle.fontSize,
					fontWeight:textStyle.fontWeight,
					color:textStyle.color,
					lineHeight:textStyle.lineHeight}">
					i. 为了保持报价清晰简洁，这里的报价只包含最基本的服务费用，如有其他服务（比如报检、查验代理、仓储等），将会在最终的账单中体现。 
			</text>
			<text class="duty" :style="{fontSize:textStyle.fontSize,
					fontWeight:textStyle.fontWeight,
					color:textStyle.color,
					lineHeight:textStyle.lineHeight}">
					ii. 上述费用可能会在执行中因为实际情况发生价格调整，平台会尽早通知到客户，最终费用请以最后账单为准。
			</text>
			<text class="duty" :style="{fontSize:textStyle.fontSize,
					fontWeight:textStyle.fontWeight,
					color:textStyle.color,
					lineHeight:textStyle.lineHeight}">
		 iii. 上述费用不含海关验货费、目的港税费、目的港部分船公司/码头收费等费用，具体金额会按照凭证实报实销。
			</text>
			 <text class="duty" :style="{fontSize:textStyle.fontSize,
					fontWeight:textStyle.fontWeight,
					color:textStyle.color,
					lineHeight:textStyle.lineHeight}">
					iv. 滞箱费、堆存费、超时卸车费、商业区运输费、人工费等额外费用会根据实际发生情况收取，以最后账单为准。
			</text>
			<text class="duty" :style="{fontSize:textStyle.fontSize,
					fontWeight:textStyle.fontWeight,
					color:textStyle.color,
					lineHeight:textStyle.lineHeight}">
					 v. 陆运费（国内、国外）默认为提箱和还箱在同一地点，如果地点不同可能会造成成本差异，以最终账单为准。
			</text>
		</view>
		
	</view>
   
  </view>
  
</template>
<script>
	export default{
		data(){
			return{
				ifshowShade: false
			}
		},
		props:{
			titleText: {
				default: '',
				type: String
			},
			textStyle: {
				default: {}
			},
			// text: {
			// 	default: '',
			// 	type: String
			// },
			
			
		},
		computed:{
			
		},
		methods:{
			closeShade(){
				this.$emit('closeTheshade',false)
			}
		}
	};
</script>
<style scoped lang="less">
	.shadeWrap{
		width: 100%;
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
	.duty{
		display: block;
	}
	.close{
		display: inline-block;
		;
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		z-index: 1000;
		top: 60rpx;
		right: 38rpx;
	}
	.tipWrap{
		position: absolute;
		    bottom: 0;
		    left: 0;
			right: 0;
			background-color: white;
			padding: 40rpx 36rpx 160rpx 36rpx;
			border-radius:20rpx 20rpx 0px 0px;
			    text-align: justify;
	}
	.title{
		
		padding-bottom: 37rpx;
		display: block;
		text-align: center;
		text{
			color: #132243;
			font-size: 32rpx;
		}
	}
</style>
