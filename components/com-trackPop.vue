<template>
	<view class="trackWrap">
		<slot name="popContent">
			
		</slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					// 是否有信息展示的标记
			};
		},
		methods:{
			hide(){
				this.$emit('hidePop',false)
			}
		},
	}
</script>

<style>
	.trackWrap{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0,0,0,0.5);
		z-index: 10;
	}
	
</style>

