<template>
    <view :class="['detailWrap',{priceDetailWrap: !showSeePrice}]" >
        <view class="palnItem" v-for="(itemD,indexD) in expectInfo" :key="indexD">
          
			<view v-if="itemD.bbiRouteNodeVO.resourceType!='04' && itemD.isRouteNode && (itemD.sort == 0 || itemD.sort == (item.bbiRouteDetailVOsForSeaTrans.length - 1) || itemD.sort == (item.bbiRouteDetailVOsForForeignLand.length - 1))"
                                      class="routeTimeAndNodeName" style="position: static">
                <view
                    class="time"
                     v-if="itemD.routeNodeType == '04' && itemD.sort == 0 && indexD == 0 && itemD.isRouteNode"
                                                       
                >
                    <text class="hr" v-if="indexD+1  < expectInfo.length"></text>
                    <text
                        :class="['estimate circle',{'priceEstimate priceCircle': !showSeePrice}]"
                    >预计{{ getChinaLandStartTime(item.scFreightInfoDetail.etdTime,item.chinaLandDays)}}</text>
                   <text
                        :class="['days',{'priceDays':!showSeePrice}]"
						style="margin-top: 20rpx"
                        v-if="itemD.bbiRouteNodeVO.resourceType == '02'"
                    >
					<text>陆运+港前:</text></br>
					 <text>作业{{item.chinaLandDays+4}}天</text>
					 </text>
                </view>
                <view
                    class="time"
                    v-if="itemD.routeNodeType == '03' && itemD.sort == 0 && itemD.isRouteNode"
                >
                    <text class="hr"></text>
                    <text
                        :class="['estimate',{'priceEstimate': !showSeePrice}]"
                    >预计{{ showDateExchange(item.scFreightInfoDetail.etdTime) ? item.scFreightInfoDetail.etdTime.substring(5,10) : '&#45;&#45;'}}</text>
                   <text
                        v-if="itemD.bbiRouteNodeVO.resourceType == '01' && itemD.routeNodeType != '04'"
                    >
                      <text    :class="['days',{'priceDays':!showSeePrice}]">海运{{item.scFreightInfoDetail.voyageTime}}天</text>
                    </text>
                </view>
				<!-- <view class="othreInfo"> -->
				
               <view
                    class="transfortion"
					 :key="indexD"
                     v-if="itemD.bbiRouteNodeVO.resourceType == '01' && itemD.routeNodeType != '04' && item.scFreightInfoDetail.routeType == '02' && !((item.foreignLandId != '' && itemD.routeNodeType == '04' && itemD.isRouteNode && itemD.sort == 0 && itemD.bbiRouteNodeVO.resourceType == '01') ||(itemD.routeNodeType == '03' && itemD.sort == (item.bbiRouteDetailVOsForSeaTrans.length - 1) && itemD.isRouteNode))"
                >
				<!-- 满足转的条件&&非到港 -->
                    <br>
                    <text class="transText">转</text>
                    <text :class="['transContent',{'priceRTransContent': !showSeePrice}]">{{item.scFreightInfoDetail.transportName}}</text>
                </view>
				<!-- </view> -->
                <view
                    class="time"
                   v-if="(item.foreignLandId != '' && itemD.routeNodeType == '04' && itemD.isRouteNode && itemD.sort == 0 && itemD.bbiRouteNodeVO.resourceType == '01') ||
                                                                                   (itemD.routeNodeType == '03' && itemD.sort == (item.bbiRouteDetailVOsForSeaTrans.length - 1) && itemD.isRouteNode)"
                >
                    <text class="hr" v-if="indexD+1  < expectInfo.length"></text>
                    <text  :class="['estimate',{'priceEstimate': !showSeePrice}]">预计{{ getSeaportArriveTime(item.scFreightInfoDetail)}}</text>
                   <text
                        v-if="itemD.bbiRouteNodeVO.resourceType == '01' && itemD.routeNodeType == '04' && itemD.isRouteNode && itemD.sort == 0"
                    >
                        <text    :class="['days',{'priceDays':!showSeePrice}]">陆运{{item.foreignLandDays}}天</text>
                    </text>
                </view>
                <view
                    class="time"
                    v-if="itemD.routeNodeType == '04' && itemD.sort != 0 && indexD != 0 && itemD.isRouteNode"
                >
                    <text
                        :class="['estimate circle',{'priceEstimate priceCircle': !showSeePrice}]"
                    >预计{{ getForeignLandEndTime(item.scFreightInfoDetail,item.foreignLandDays)}}</text>
                </view>
                <text :class="['name',{notbold :itemD.routeNodeType == '04' && itemD.sort != 0 && indexD != 0 && itemD.isRouteNode || itemD.routeNodeType == '04' && itemD.sort == 0 && indexD == 0 && itemD.isRouteNode },{'priceName priceNotbold': !showSeePrice} ]">{{itemD.bbiRouteNodeVO.routeNodeName}}</text>
				
				
            </view>
        </view>
		
		<view class="remarkWrap" v-if="item.scFreightInfoDetail.remark && showRemark">
			<text class="remarkText">备</text>
			<text class="remark">
				{{item.scFreightInfoDetail.remark}}
			</text>
			
		</view>
		<view :class="['seePriceWrap',{'seePriceWrapActive':!ifGotTelNum}]" v-if="showSeePrice">
			<!-- #ifdef MP-WEIXIN -->
			<button v-if="!ifUserHasGiveThePhoneNum && !ifGotTelNum" :class="{'exTop':item.scFreightInfoDetail.remark && showRemark}"   open-type="getPhoneNumber" @getphonenumber="getTelNumber" class="seePrice">查看报价单</button>
			<button v-else   @click="redictToPriceDetail" class="seePrice">查看报价单</button>
			
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<button   @click="redictToPriceDetail"  v-if="showSeePrice" class="seePrice">查看报价单</button>
			<!-- #endif -->
		</view>
		<!-- </navigator> -->
	</view>
</template>		
<script>
import {checkWechart} from '../api/wechartCheck.js'
	import{getTel} from "../api/wechart.js"
export default {
	data(){
		return{
			ifUserHasGiveThePhoneNum: false
			// ifGotTelNum: false
		}
	},
    props: {
        expectInfo: {
            default: [],
            type: Array
        },
        item: {
            default: {},
            type: Object
        },
		showSeePrice:{
			default:true,
			type: Boolean
		},
		showRemark:{
			
				default:true,
				type: Boolean
		}
		
    },
    filters: {
        dateTrans: function (val) {
            weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            let dateStr = val;
            let myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
            return val

        }
    },
    mounted () {
		wx.login({
		    success: (res) => {
			let phone = null
			let that = this
			// let wechartCode = this.$store.state.wechartCode;
			// cons;ole.log(this.$store.state)
			// console.log(wechartCode)
			if(res.code){
				checkWechart(res.code).then(res=>{
					phone = res.phone
					// console.log('planlist')
					// console.log(res)
					if(phone) {
						that.ifUserHasGiveThePhoneNum = true
					}
				})
			}
		},
		})
        // console.log(this.expectInfo)
    },
	 onLoad (option) {
		 console.log(option)
	 },
	computed:{
		ifGotTelNum(){
			return this.$store.state.ifGotTelNum
		}
	},
	watch:{
		state:{
			handler: function(){
			    this.ifGotTelNum = val.ifGotTelNum
			},
			deep: true
		},
		
			
		
	},
	
    methods: {
		saveTelNumber(){
			
		},
		getTelNumber(e){
			// console.log(e)
			if (e.detail.errMsg == 'getPhoneNumber:ok') {
			let sessionKey =  this.$store.state.userInfoParams &&  this.$store.state.userInfoParams.session_key
			let openId = this.$store.state.userInfoParams && this.$store.state.userInfoParams.openid
			let getTelParam ={
				encryptedData:e.detail.encryptedData,
				iv: e.detail.iv,   
				sessionKey:sessionKey,
				openId: openId
			}
			this.$store.commit('saveIfGotTelNum',true)
			let that = this;
			
			getTel(getTelParam).then(res=>{
				// console.log('9999')
				console.log(res)
				that.redictToPriceDetail()
				that.$store.commit('saveIfGotTelNum',res)
			})
			
			
			
			} else {
			return
			
			
			}
				
			
			
			
			
		},
		redictToPriceDetail(){
			
			let expectInfo = JSON.stringify(this.expectInfo)
			let item = JSON.stringify(this.item)
			this.$store.commit('savePlanListSelectData',{expectInfo:expectInfo,item:item})
			this.$emit('saveCheckItem',{expectInfo:expectInfo,item:item});
			
		},
        showDateExchange (value) {
            if (!value) {
                return false
            } else {
                if (parseInt(value.substring(0, 4)) < 2000) {
                    return false;
                } else {
                    return true
                }
            }
        },

        getSeaportArriveTime (scfreight) {
            var time = new Date(new Date(scfreight.etdTime.replace(/-/g, "/")).getTime() + scfreight.voyageTime * 24 * 3600 * 1000)

            return (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1) + '-' + (time.getDate() < 9 ? '0' : '') + time.getDate()
        },

        getChinaLandStartTime (etdTime, chinaLandDays) {
            var time = new Date(new Date(etdTime.replace(/-/g, "/")).getTime() - (chinaLandDays + 4) * 24 * 3600 * 1000)

            return (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1) + '-' + (time.getDate() < 9 ? '0' : '') + time.getDate()
        },

        getForeignLandEndTime (scfreight, foreignLandDays) {
            var time = new Date(new Date(scfreight.etdTime.replace(/-/g, "/")).getTime() + (scfreight.voyageTime + foreignLandDays) * 24 * 3600 * 1000)
            return (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1) + '-' + (time.getDate() < 9 ? '0' : '') + time.getDate()
        },
    }
}
</script>

<style lang="less" scoped>
.priceDetailWrap{
	background-color: #193CB0 !important;
	margin: 0 14rpx;
	border-radius:16rpx;
	margin-bottom: 60rpx;
}

.priceEstimate{
	color: white !important;
}
.priceDays{
	color: #CCD7FB !important;
}
.priceName{
	color: white;
}
.priceNotbold{
	color: white !important;
}
.priceRTransContent{
	color: white !important;
}
.priceCircle:after{
	background:white!important;
}


.routeTimeAndNodeName {
  display: flex;
  flex-direction: row;
}
.estimate {
  color: #132243;
  font-size: 24rpx;
  /* padding-right: 22rpx; */
  display: block;
  width: 150rpx;
  text-align: right;
  position: relative;
  top: -16rpx;
}

.estimate:after {
  position: absolute;
  display: inline-block;
  content: '';
  width: 16rpx;
  height: 16rpx;
  background-color: #fff;
  border: 2rpx solid #0f44c9;
  border-radius: 50%;
  margin: 0 22rpx;
  top: 6rpx;
}
.circle:after {
  position: absolute;
  display: inline-block;
  content: '';
  width: 18rpx;
  height: 18rpx;
  background-color: #0f44c9;
  border-radius: 50%;
  margin: 0 22rpx;
}
.name {
  color: #132243;
  font-size: 28rpx;
  margin-left: 32rpx;
   font-weight: bold;
   position: relative;
   margin-top: -22rpx;
}
.name:first-child{
	background-color: red;
}
.notbold {
 font-weight: 400;
  font-size: 24rpx;
}
.days {
  color: #0f46ca;
  font-size: 22rpx;
  width: 140rpx;
  display: block;
  text-align: right;
  /* background-color: red; */
  position: relative;
  top: -50%;
  transform: translateY(50%);
}
.time {
  padding-right: 30rpx;
  height: 122rpx;
  position: relative;
top:-10rpx;
  display: flex;
  flex-direction: column;
}
.hr {
  height: 122rpx;
  width: 0px;
  top: 10rpx;
  border-right: #6b80d5 1px dashed;
  display: block;
  left: 180rpx;
  position: absolute;
}
.detailWrap {
  padding: 46rpx 10rpx 20rpx 10rpx;
  background-color: #f7fafd;
}
.detailWrap .palnItem:last-child {
  height: 30rpx;
}
.date {
  display: block;
}
.palnItem {
  position: relative;
}
.transfortion {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 30%;
  left: 166rpx;
  
}
.transText {
  color: #f57b37;
  font-size: 24rpx;
  border: 1px solid #f57b37;
  border-radius: 50%;
  height: 30rpx;
  width: 30rpx;
  background-color: white;
  display: flex;
  align-items: center;
  margin-right: 8px;
  justify-content: center;
}
.remarkWrap{
	position: relative;
	display: flex;
	flex-direction: row;
	position: relative;
	top:-64rpx;
	align-items: center;
	left: 16rpx;
	

}
.remarkText{
	color: #15B7B9;
	font-size: 24rpx;
	border: 1px solid #15B7B9;
	border-radius: 50%;
	height: 36rpx;
	width: 36rpx;
	line-height: 36rpx;
	background-color: white;
	display: flex;
	align-items: center;
	margin-right: 8px;
	justify-content: center;
}
.remark{
	font-size: 22rpx;
	color: #fff;
	background:#4A68CF;
	padding: 10rpx;
	width: 82%;
	max-height: 100rpx;
	overflow-y:scroll;
	border-radius:4rpx;
}
.transContent {
  color: #132243;
  font-size: 22rpx;
}
.hasOther{
	position: relative;
	height: 250rpx;
}
.hasOtherInfoHr{
	height: 250rpx;
}
.othreInfo{
	position: absolute;
	top:50rpx;
	left:162rpx;
	// background-color: red;
}
.exTop{
	top:60rpx;
}
.seePriceWrap{
	margin-top: -30rpx;
	text-align: center;
	position: relative;
	top: -10rpx;
	
	


}
.seePriceWrapActive{
	top:-10rpx;
}
.seePrice{
	display: inline-block;
width:280rpx;
text-align: center;
height:60rpx;
line-height: 60rpx;
position: relative;
top: 3px;

background:linear-gradient(144deg,rgba(22,189,190,1) 0%,rgba(14,154,156,1) 100%);
border-radius:14rpx;
font-size:34rpx;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
margin: 0 auto;
color:rgba(255,255,255,0.9);
}
button::after{
	border: none;
}


</style>
