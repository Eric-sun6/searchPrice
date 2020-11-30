<template id="errortip">
  <view 
	v-if="showErrorTip"
    class="errorWrap">
    <view class="shade">
     
    </view>
	<view class="tipWrap">
		 <text class="errorText">{{errorText}}</text>
	</view>
   
  </view>
  
</template>
<script>
	export default{
		props:{
			errorText: {
				default: '',
				type: String
			},
			showErrorTip:{
				default: false,
				type: Boolean
			},
			
		},
		computed:{
			
		}
	};
</script>
<style>
	.errorWrap{
		idth: 100%;
		height: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

	}
	.shade{
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.5;
		
		

	}
</style>
