<template>
  <view :class="{'headBar':headBarBg}">
    <!-- status-bar -->
    <view class="status-bar" :style="statusBarStyle"/>
    <!-- navigation-bar -->
    <view class="navigation-bar" :style="navigationBarStyle"  @click="goback">
	  <text class="arrow" v-if="showArrow"></text>
      <view class="navigation" :style="navigationStyle">
       <text :class="['titleText',{'leftShow':ifLeftShow}]"> {{title}}</text>
      </view>
    </view>
	<view class="savetip" :style="{top:(saveTipTop+2)+'px'}" v-if="showSaveTip && showSaveTipFlag" @click="closeSaveTip">
		<image class="topArrow" :style="{right:arrowLeft*0.78+'px'}" src="../static/sj@2x.png" mode=""></image>
		<view class="savaTipContent">
			
			
			<text class="savetiptext">点击</text>
			<image class="tipDot" src="../static/sd@2x.png" mode=""></image>
			<text class="savetiptext">「添加到我的小程序」或「浮窗」更方便</text>
			<image class="close" src="../static/close.png" mode=""></image>
		</view>
	</view>
    <!-- menu -->
    <!-- <view class="menu" :style="menuStyle"/> -->
  </view>
  </template>

<script>
export default {
  
   
  
     data() {
		
		 const systemInfo= wx.getSystemInfoSync()
		 return{
			 statusBarStyle: '',
			 navigationBarStyle: '',
			 navigationStyle: '',
			 menuStyle: '',
			systemInfo: null,
			showSaveTipFlag: true,
			saveTipTop:0,
			arrowLeft:0
		 }
      
     },
	props:{
		ifLeftShow:{
			default: false,
			type: Boolean
		 },
		 headBarBg:{
			 default:true,
			 type:Boolean
		 },
		 title:{
			 default:'',
			 type: String
		 },
		 showArrow:{
			 default: false,
			 type: Boolean
		 },
		 showSaveTip:{
			 default: true,
			 type:Boolean
		 },
		 ifShareIn:{
			 default: false,
			 // type:String
		 },
		 backUrl:{
			 default: ''
		 }
	 },
	 created () {
	        this.getStatusBarStyle()
	       this.getNavigationBarStyle()
	        this.getNavigationStyle()
	      this.getMenuStyle()
		  // #ifdef MP-WEIXIN
		  this.wxgetMenuButtonBoundingClientRect()
		  // #endif
		
	   },
	   methods:{
		   wxgetMenuButtonBoundingClientRect(){
			   let menuButton=wx.getMenuButtonBoundingClientRect()
			   this.arrowLeft = menuButton.width
		   },
		   closeSaveTip(){
			   this.showSaveTipFlag = false;
		   },
		   goback () {
			   // console.log(this.ifShareIn)
			  if(this.ifShareIn){
				  uni.redirectTo({
				  	 url: '/pages/index/index'
				  })
			  }else{
				     // let pages = getCurrentPages(); 
					  // 获取当前页面栈层数     例如16
					let backUrl = this.backUrl
					  
				  console.log(!backUrl)
				  if(!backUrl){
						this.$emit('gotoPrePage')
				  }else{
					  uni.redirectTo({ url: backUrl})   
				  }
				
			  }
			  
		      
		   },
		   /**
		      * 获取胶囊按钮位置
		      */
		     getMenuPosition () {
				 const systemInfo= wx.getSystemInfoSync()
		       let top = 4
		       let right = 7
		       let width = 87
		       let height = 32
		       if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') === -1) {
		         top = 6
		         right = 10
		       }
		       else if (systemInfo.platform === 'devtools' && systemInfo.system.indexOf('Android') != -1) {
		         top = 8
		         right = 10
		       }
		       else if (systemInfo.system.indexOf('Android') != -1) {
		         top = 8
		         right = 10
		         width = 95
		       }
		       return {
		         top: systemInfo.statusBarHeight + top,
		         left: systemInfo.windowWidth - width - right,
		         width: width,
		         height: height
		       }
		     },
		     /**
		      * 获取状态栏样式
		      */
		     getStatusBarStyle () {
				  const systemInfo= wx.getSystemInfoSync()
		       let statusBarPosition = {
		         top: 0,
		         left: 0,
		         width: systemInfo.windowWidth,
		         height: systemInfo.statusBarHeight
		       }
			   // console.log(statusBarPosition)
		       this.statusBarStyle= this.formatStyle(statusBarPosition)
		     },
		     /**
		      * 获取导航栏样式
		      */
		     getNavigationBarStyle () {
				 const systemInfo= wx.getSystemInfoSync()
		       let menuPosition = this.getMenuPosition()
		       let navigationBarPosition = {
		         top: systemInfo.statusBarHeight,
		         left: 0,
		         width:systemInfo.windowWidth,
				 
		         height: (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height
		       }
			   this.saveTipTop =  (menuPosition.top - systemInfo.statusBarHeight) * 2 + menuPosition.height + systemInfo.statusBarHeight
			   
			   this.$emit('exportBannerTop',this.saveTipTop)
		       this.navigationBarStyle=  this.formatStyle(navigationBarPosition)
		     },
		     /**
		      * 获取导航样式
		      */
		     getNavigationStyle () {
				 const systemInfo= wx.getSystemInfoSync()
		       let menuPosition = this.getMenuPosition()
		       let padding = systemInfo.windowWidth - menuPosition.left - menuPosition.width
		       let navigationPosition = {
		         top: menuPosition.top,
		         left: padding,
		         // width: systemInfo.windowWidth - padding * 3 - menuPosition.width,
		         height: menuPosition.height
				

		       }
		      this.navigationStyle= this.formatStyle(navigationPosition)
		     },
		     /**
		      * 获取胶囊按钮样式
		      */
		     getMenuStyle() {
		        this.menuStyle=  this.formatStyle(this.getMenuPosition())
		     },
		     /**
		      * 格式化Style
		      */
		     formatStyle (position) {
		       let styles = []
		       for (let key in position) {
		         styles.push(`${key}: ${position[key]}px;`)
		       }
		       return styles.join(' ')
		     }
	   }
    
     

};
</script>
<style>
	
	.navigation-bar{
		display: flex;
		align-items: center;
		justify-content: center;
		/* position: fixed;
		z-index: 99999;
 */

	}
	.navigation{
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 34rpx;
		text-align: center;
	}
	.titleText{
	
	width: 340rpx;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    
	

	}
	.arrow {
	  position: absolute;
	  border-left: 2px solid white;
	  border-bottom: 2px solid white;
	  height: 30rpx;
	  width: 30rpx;
	  transform: translate(2px, -2px) rotate(45deg);
	  -webkit-transform: translate(2px, -2px) rotate(45deg);
	  border-top: 2px solid transparent;
	  border-right: 2px solid transparent;
	  display: inline-block;
	  -moz-transform: translate(2px, -2px) rotate(45deg);
	  -ms-transform: translate(2px, -2px) rotate(45deg);
	  -o-transform: translate(2px, -2px) rotate(45deg);
	  /* // bottom: 40rpx; */
	  margin-left: -3px;
	  left: 40rpx;
	  position: absolute;
	  z-index: 2;
	}
	.headBar{
	/* 	z-index: 9;
		    position: relative; */
		background-color: #0b46d8;
	}
	
	.savetip{
		z-index: 1;
		width: 100%;
		position: fixed;
		top:3px;
	
	}
	
	.savaTipContent{
		height: 84rpx;
		text-align: left;
		border-radius: 12rpx;
		margin: 0 30rpx;
		
		display: flex;
		flex-direction: row;
		/* justify-content: center; */
		align-items: center;
		background:#15B7B9FF;

		position: relative;
		top: -5rpx;
	}
	.savetiptext{
		color: #fff;
		font-size: 28rpx;
		
	}
	.savetiptext:first-child{
		margin-left:20rpx;
	}
	.topArrow{    width: 12px;
		height: 12px;
		position: absolute;
		top: -13px;
		right: 22%;
	}


	.tipDot{
	
	    width: 18px;
	    height: 6px;
	    position: relative;
	    top: -1px;
	    margin-left:4px;
	}
	.close{
		width: 11px;
	    height: 11px;
	    position: absolute;
	    top: 12px;
	   right: 12px;
	}
	.leftShow{
		text-align: left;
		margin-left: -40px;
	
	}
</style>


