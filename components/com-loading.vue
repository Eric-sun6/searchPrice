<template>
  <view 
    v-show="ifShowLoad" 
    class="loadWrap">
    <view class="loading">
      <text></text>
      <text></text>
      <text></text>
      <text></text>
      <text></text>
    </view>
    <text class="loadText">loading...</text>
  </view>
  
</template>
<script>
	export default{
		props:{
			ifShowLoad: {
				default: false,
				type: Boolean
			}
		},
		computed:{
			
		}
	};
</script>
<style>
	.loadWrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.loadText{
		color: black;
	}
	.loading{
	    width: 60px;
	    height:30px;
	    margin: 0 auto;
		display: flex;
		justify-content: center;
	}
	.loading text{
	    display: inline-block;
	    width: 8px;
		margin-right: 2px;
	    height: 100%;
	    border-radius: 4px;
	    background: lightgreen;
	    -webkit-animation: load 1s ease infinite;
	}
	@-webkit-keyframes load{
	    0%,100%{
			height: 10px;
			background: lightgreen;
	    }
	    50%{
	        height: 40px;
	        margin: -15px 0;
	        background: lightblue;
	    }
	}
	.loading text:nth-child(2){
	    -webkit-animation-delay:0.2s;
	}
	.loading text:nth-child(3){
	    -webkit-animation-delay:0.4s;
	}
	.loading text:nth-child(4){
	    -webkit-animation-delay:0.6s;
	}
	.loading text:nth-child(5){
	    -webkit-animation-delay:0.8s;
	}
</style>
