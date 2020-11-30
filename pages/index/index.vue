<template>
    <view class="container">
		<headBar :showSaveTip="true" :showArrow="false" title="全程物流"></headBar>
        <image class="bg" src="../../static/bg.png"></image>
		<view style="height: 80rpx"></view>
        <view class="contentWrap">
            <image class="imgShape" src="../../static/shape.png">
            <image class="imgTruck" src="../../static/truck.png">
            <view class="mainContent">
                <!-- 发货地收货地 -->
                <!-- <view class="title">
                    <text class="start">出发地</text>
                    <text class="end">收货地</text>
                </view> -->
                <view class="choosePortWrap">
					<image class="verticalLine" src="../../static/verticalLine.png" mode=""></image>
                    <navigator url="/pages/start/index">
                        <view class="circleWrap">
                        	<text class="startcircle"></text>
                            <text class="port startPort">{{startPort}}</text>
                        </view>
                    </navigator>
					<!-- <image class="jticon" src="../../static/jticon.png"></image> -->
                    <navigator url="/pages/end/index">
                        <view class="circleWrap">
							<text class="endcircle"></text>
                            <text class="port endPort">{{endPort}}</text>
                        </view>
                    </navigator>
                </view>
                <!-- 日期 -->
                <text class="shapeStart">开船日</text>
				
                <view @click="showCalendar">
                    <view class="dateChooseWrap">
						
                        <view class="startDate">
                           
                           
								 <view  class="dateValue">{{ startDateValue }}</view>
                           
                        </view>
                        <text class="to">至</text>
                        <view class="endDate">
                           
                             
									 <view class="dateValue">{{ endDateValue }}</view>
                             
                        
                        </view>
                    </view>
                </view>            <!-- 箱吨选择 -->
                <view>
					<!-- <view>{{JSON.stringify(ton)}}</view> -->
                    <text class="shapeType">箱型</text>
                    <checkbox-group class="checkbox" @change="changeShipType">
                        <label class="checkWrap">
                           
                                <checkbox class="checkItem" value="check20GP" :checked="ton.includes('check20GP')" />
								<text :class="[{'choosedDot': ton.includes('check20GP')},'dot']"></text>
                                <text class="checkboxName">20GP</text>
                            
                        </label>
						<label class="checkWrap">
						   
						        <checkbox class="checkItem" value="check40GP" :checked="ton.includes('check40GP')" />
								<text :class="[{'choosedDot': ton.includes('check40GP')},'dot']"></text>
						        <text class="checkboxName">40GP</text>
						    
						</label>
						<label class="checkWrap">
						   
						        <checkbox class="checkItem" value="check40HC" :checked="ton.includes('check40HC')" />
								<text :class="[{'choosedDot': ton.includes('check40HC')},'dot']"></text>
						        <text class="checkboxName">40HC</text>
						    
						</label>
                    </checkbox-group>
                </view>
                <button class="search" @click="gotoPlanSearch">查询</button>
            </view>
            <comWXLogin  @changeSaveTipFlag="changeSaveTipFlag" :isHomePage="true" @authorize="allown" ref="login"></comWXLogin>
			 <!-- @changeSaveTipFlag="changeSaveTipFlag" -->
        </view>
		<view v-show="ifShowCalendarflag" class="calendarWrap" ref="calendar">
			
				<rangeCalendar class="rangeCalendar" :betweenStart="`${calendarStartDate}`" :betweenEnd="`${calendarEndDate}`" :start-date="startDateValue" :end-date="endDateValue" mode="4" @callback="gatThedatevalue" >
					
					 <template v-slot:header>
						 <view class="calendarButtonWrap">
						 	<text @click="fadeCalendar" class="btnCancleCalendar">取消</text>
						 	<text @click="confirmChangedDate" class="btnConfirmCalendar">确认</text>
						 </view>
					 </template>
				</rangeCalendar>
		</view>
		
		<toast ref="toast" :toastText="toastText"></toast>
		<tabBar :tabName="`index`"></tabBar>
    </view>
</template>

<script>

import uniCalendar from '../../components/uni-calendar/uni-calendar.vue'
	import {checkWechart} from '../../api/wechartCheck.js'
import rangeCalendar from '../../components/mobile-calendar-simple/Calendar.vue'
import headBar from '../../components/com-headBar.vue';
export default {
    components: {
		headBar,
		uniCalendar,
		rangeCalendar
    },
    data () {

        const currentDate = this.getDate({
            format: true
        });
        return {
            title: 'picker',
            index: 0,
            endDateValue:  this.getDate ('end'),
            startDateValue: this.getDate('start'),
            startPort: '',
            endPort: '',
            ton: ['check20GP'],
            startInfo: {},
            endInfo: {},
            userInfoParams: {},
            authorizeFlag: false,
			userInfoFlag: null,
			calendarEndDate: '',
			ifShowCalendarflag:false,
			calendarStartDate:'',
			changedDateObj: null,
			// showToastFlag: false,
			toastText:'',
			userFlag:false
			// showSaveTip:false
        };

    },
    onShow () {

    },
    created () {
		
		// #ifdef MP-WEIXIN
			//先从缓存中把数据取一下，如果有数据就代表是从列表页面返回的，否则就是初次进页面初始化数据
			let dataFromPlanListBack= {}//列表页面返回要存储的数据
			try{
		     dataFromPlanListBack= wx.getStorageSync('dataFromPlanListBack');
		    }catch (e) {
		     dataFromPlanListBack= wx.getStorage('dataFromPlanListBack');
		    }
			// console.log('dataFromPlanListBack')
			// console.log(dataFromPlanListBack)
			if(dataFromPlanListBack && dataFromPlanListBack.endPort){
				this.$store.commit('saveEndInfo', {
				    'endPort':dataFromPlanListBack.endPort,
				    'destinationList': {}
				})
			}else{
				this.$store.commit('saveEndInfo', {
				    'endPort':
				        {
				            alias: "@LOS ANGELES@USLAX@LAX@USLSA@",
							endAddress: 'LOS ANGELES,CA ',
				            label: "LOS ANGELES,CA(洛杉矶)",
				            seaPortName: "LOS ANGELES,CA(洛杉矶)",
				            seaportType: "港口",
				            type: 2,
				            value: "B5DD9083A7B84D15B2B13959ED9709CC"
				        },
				    'destinationList': {}
				})
			}
			if(dataFromPlanListBack && dataFromPlanListBack.startPort){
				this.$store.commit('saveStartInfo', {
				    'startPort':dataFromPlanListBack.startPort,
				    'departureList': {}
				})
			}else{
				this.$store.commit('saveStartInfo', {
				    'startPort': {
				        alias: "@@",
				        country: "",
						startAdress: 'XINGANG',
				        label: "XINGANG(天津新港)",
				        seaPortName: "XINGANG(天津新港)",
				        seaportType: "港口",
				        type: 1,
				        value: "F12358AF9C134C9ABD0B1C3AAA826842"
				    },
				    'departureList': {}
				})
			}
		
		// console.log(dataFromPlanListBack)
			if(dataFromPlanListBack && dataFromPlanListBack.ton ){
				this.ton =  dataFromPlanListBack.ton 
			}
			
			if(dataFromPlanListBack && dataFromPlanListBack.dateStartValue){
				this.startDateValue = dataFromPlanListBack.dateStartValue
			}
			if(dataFromPlanListBack && dataFromPlanListBack.dateEndValue){
				this.endDateValue = dataFromPlanListBack.dateEndValue
			}
			
		// #endif
       // #ifdef H5
	   this.$store.commit('saveStartInfo', {
	       'startPort': {
	           alias: "@@",
	           country: "",
	   		startAdress: 'XINGANG',
	           label: "XINGANG(天津新港)",
	           seaPortName: "XINGANG(天津新港)",
	           seaportType: "港口",
	           type: 1,
	           value: "F12358AF9C134C9ABD0B1C3AAA826842"
	       },
	       'departureList': {}
	   })
       this.$store.commit('saveEndInfo', {
           'endPort':
               {
                   alias: "@LOS ANGELES@USLAX@LAX@USLSA@",
       			endAddress: 'LOS ANGELES,CA ',
                   label: "LOS ANGELES,CA(洛杉矶)",
                   seaPortName: "LOS ANGELES,CA(洛杉矶)",
                   seaportType: "港口",
                   type: 2,
                   value: "B5DD9083A7B84D15B2B13959ED9709CC"
               },
           'destinationList': {}
       })
       // #endif
       

    },

    watch: {
		
		'$store.state'(val){
			this.userInfoFlag = val.userInfoFlag
		},
        '$store.state.start' (val) {
            this.startInfo = val
            this.startPort = val.startPort.label
			
        },
        '$store.state.end' (val) {
            this.endInfo = val
            this.endPort = val.endPort.label
        },
    },

 
	mounted() {
	// this.calendarEndDate = 
		this.calendarEndDate= this.getDateRange(this.getDate('end'),60);
		this.calendarStartDate =this.getDate('start')
		// console.log(this.endDateValue)	
	},

    methods: {
		// resetShowToastFlag(){
		// 	this.showToastFlag = false
		// },
		confirmChangedDate(){
			// console.log(this.changedDateObj)
			if(this.changedDateObj){
				if( !this.changedDateObj.endDateValue){
					//自定义时间
					let startTime,  endTime;
					startTime= this.changedDateObj.startDateValue.replace("-","/");//替换字符，变成标准格式
					startTime= new Date(Date.parse(startTime));
					endTime= this.getDate ('end').replace("-","/");//替换字符，变成标准格式
					endTime= new Date(Date.parse(endTime));
					let that = this
					if(endTime < startTime){
						this.toastText = '发货日期不得晚于收货日期，请您重新选择'
						this.$refs.toast.show = true;
						this.endDateValue = this.getDate ('end')
						this.startDateValue = this.getDate ('start')
						
						setTimeout(function(){
							// console.log('0909')
							that.$refs.toast.show = false;
						},1000)
						
					}else{
						this.toastText = '请选择收货日期'
							this.$refs.toast.show = true;
						this.endDateValue = this.getDate ('end')
						
						setTimeout(function(){
							// console.log('222')
							that.$refs.toast.show = false;
						},1000)
					}
					
					
					
				}
			
				
			}
			// console.log(this.showToastFlag)
			this.fadeCalendar()
			
		},
		showCalendar(){
			this.ifShowCalendarflag = true
		},
		fadeCalendar(){
			this.ifShowCalendarflag = false
		},
		changeSaveTipFlag(){
			this.userFlag = true
			console.log('save userinfo')
			console.log(this.userFlag)
			this.showSaveTip = true
		},
        allown (val) {
            console.log(val)
            this.authorizeFlag = val
        },
        onShareAppMessage () {
            return {
                title: '一键获取供应链全程物流报价方案，省力、省时！',
                path: '/pages/index/index', 
				 imageUrl: '../../static/share.jpg',
                success: function (res) {
                    console.log('分享成果')
                }

            }
        },
        gotoPlanSearch () {
			if(!this.ton.length){
				this.toastText = '请选择箱型！'
				this.$refs.toast.show = true;
			
				let that = this
				setTimeout(function(){
					that.$refs.toast.show = false;
				},1000)
				return
			}
            // #ifdef H5
            this.loadSearchInfo()
            // #endif
            // #ifdef MP-WEIXIN
			// console.log(this.$store.state)
			
						
						
						
						
            if (this.showSaveTip || this.$store.state.userInfoFlag) {//已经同意授权
              this.$store.commit('savePlanSearchInfo', { ton: this.ton, endDateValue: this.endDateValue, startDateValue: this.startDateValue,'startPort': this.startPort,'endPort': this.endPort})
              uni.redirectTo({
                  url: '/pages/planList/index'
              });
            } else {
				//已经获取过用户信息就不再弹提示框
				if(!this.userFlag){
					   this.$refs.login.showPopup = true
				}
             
            }
            // #endif

        },
        loadSearchInfo () {
            this.$store.commit('savePlanSearchInfo', { ton: this.ton, endDateValue: this.endDateValue, startDateValue: this.startDateValue,'startPort': this.startPort,'endPort': this.endPort})
            uni.navigateTo({
                url: '/pages/planList/index'
            });
        },
        changeShipType (e) {
			// console.log(e.detail.value)
            this.ton = e.detail.value
			// console.log(this.ton)
        },
		gatThedatevalue(e){
			// console.log(e)
			 this.endDateValue  = e.endStr && e.endStr.dateStr;
			 this.startDateValue=e.startStr && e.startStr.dateStr;
			 
			 this.changedDateObj = {
			 	'endDateValue':this.endDateValue,
			 	'startDateValue':this.startDateValue
			 }
			 // console.log(this.startDateValue)
		},
        getDate (type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year;
            } else if (type === 'end') {
                year = year;
				month = month + 1
            }
            month = month > 9 ? month : '0' + month;;
            day = day > 9 ? day : '0' + day;
            return `${year}-${month}-${day}`;
        }
    }
};
</script>
<style>
	/* page {
	  background: linear-gradient(
	    rgba(11, 70, 216, 1),
		
		  rgba(11, 70, 216, 1),
	    rgba(1, 70, 216, 0.8),
	    rgba(1, 70, 216, 0.2),
	    rgba(1, 70, 216, 0)
	  );
	  
	} */
</style>
<style scoped lang="less">
	.container{ 
		    width: 100%;
		    height: 100vh;background: linear-gradient(
	    rgba(11, 70, 216, 1),
		
		  rgba(11, 70, 216, 1),
	    rgba(1, 70, 216, 0.8),
	    rgba(1, 70, 216, 0.2),
	    rgba(1, 70, 216, 0)
	  );}
	.jticon{
		position: relative;
		top: 18rpx;
		width: 40rpx;
		height: 12rpx;
		left: -14rpx;
	}
.head {
 height: 130rpx;
 line-height: 130rpx;
 text-align: center;
 color: white;
 font-size: 34rpx;
 padding-top: 60rpx;

}

.bg {
 width: 100%;
 position: absolute;
 top: 0;
}
.contentWrap {
	margin-top: 100rpx;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 20rpx;
  margin: 0 30rpx;
  margin-top: 120rpx;
  position: relative;
  
}
.mainContent {
  width: 100%;
}
.circleWrap{
	position: relative;
}
.startcircle{
	width: 17rpx;
	height: 17rpx;
	border: 2rpx solid #0F40E1;
	display: inline-block;
	border-radius: 50%;
	position: absolute;
	top: 15rpx;
	background-color: white;

}
.endcircle{
	width: 17rpx;
	height: 17rpx;
	border: 2rpx solid #15B7B9;
	display: inline-block;
	border-radius: 50%;
	position: absolute;
	top: 70rpx;
	background-color: white;

}
.port {
	font-size: 34rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #253342;
	padding-left:50rpx;
}
.end {
  margin-left: 260rpx;
}
.text-area {
  display: flex;
  justify-content: center;
}

.title {
  margin: 30rpx 40rpx 50rpx 30rpx;
  text {
    color: #989db2;
    font-size: 24rpx;
  }
}
.pleaseLogin .uni-popup__wrapper-box {
  background: white;
  height: 300rpx;
}
.choosePortWrap {
  display: flex;
  flex-direction: column;
  padding: 56rpx 30rpx 50rpx 50rpx;
  justify-content: space-between;
  border-bottom: 1px solid #f5f8fd;
  margin-bottom: 20rpx;
  position: relative;
  .verticalLine{
	  display: inline-block;
	  width:14rpx;
	  top: 61rpx;
	  left: 54rpx;

	  height: 134rpx;
	  position: absolute;
	                  
  }
  .port {
    width: 93%;
	text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
  .startPort {
    text-align: left;
  }
  .endPort {
	  padding-top:54rpx;
    // text-align: right;
  }
}
.imgShape {
  width: 256rpx;
  height: 70rpx;
  position: absolute;
  top: -70rpx;
  right: -12rpx;
}
.imgTruck {
  width: 146rpx;
  height: 34rpx;
  position: absolute;
  top: -34rpx;
  left: 10rpx;
}
.shapeStart,
.shapeType {
  
  font-size: 29rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #253342;
  padding: 32rpx 30rpx 25rpx 40rpx;
 
}
.shapeType{
	padding-top: 114rpx;
	padding-bottom: 30rpx;
}
.dateChooseWrap {
  margin: 0 40rpx;
  padding-bottom: 30rpx;
  padding-top: 25rpx;
  border-bottom: 2rpx solid #F5F8FDFF;
  display: flex;
  margin-bottom: 30rpx;
  flex-direction: row;
  justify-content: space-between;
}
.dateValue {
font-size: 36rpx;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #253342;

}
.to {
  
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #253342;
  align-items: center;
  display: flex;
}
.checkbox{
	display: flex;
	flex-direction: row;
	margin: 0 40rpx;
	justify-content: space-between;
}
.search{
	margin: 60rpx 30rpx 70rpx 30rpx;
	font-size: 40rpx;
	background: #15B7B9;
	color: white;
	letter-spacing: 17rpx;

}

button::after {
  border: none;
}
.checkboxName{
	font-size: 34rpx;;
}
.checkWrap{
	padding-top:25rpx;
	position: relative;
	display: flex;
	flex-direction: row;
}
.checkItem{
	width: 80rpx;
	height:80rpx;
	border: 50%;
	background-color: red;
	position: absolute;
	opacity: 0;
}
.dot{
	width: 26rpx;
	height: 26rpx;
	border-radius: 3rpx;
	border: 2rpx solid #D8D8D8;
	display: block;
	position: relative;
	top: 8rpx;
	margin-right: 20rpx;
}
.choosedDot{
	width: 26rpx;
	height: 26rpx;
	background: #3754D3;
	border: none;
	border-radius: 3rpx;
	position: relative;
	border: 2rpx solid #fff;
	&::before{
		
		content: '';
		width: 12rpx;
		height: 12rpx;
		position: absolute;
		display: inline-block;
		border-color: #fff;
		border-style: solid;
		border-width: 0 2rpx 3rpx 0;
		transform: rotate(45deg);
		left: 6rpx;
		top: 3rpx;
	}
			
	
}
.calendarWrap{
	position: fixed;
	    left: 0;
	    right: 0;
	    z-index: 999;
		bottom: -40%;
		
		background-color: red;
		overflow: hidden;
    box-shadow: 0 2px 15px rgba(100, 100, 100, 0.1);
}
.rangeCalendar{
	padding-bottom: 50%;
}
.calendarButtonWrap{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding:0 30rpx;
}
.btnConfirmCalendar{
	
	font-size:28rpx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(21,183,185,1);
	line-height:40px;
}
.btnCancleCalendar{
	
	font-size:28rpx;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:#808080;
	line-height:40px;
}
</style>
