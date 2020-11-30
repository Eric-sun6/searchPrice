
<template>
    <view >
        <head-bar
            @exportannerTop="getBannnerTop"
            :showSaveTip="false"
            class="headBar"
            :showArrow="true"
			:ifLeftShow="true"
            :title="`${orderHeader}`"
            :backUrl="`../logistics/index`"
        ></head-bar>
        <view class="topContent" v-if="resData">
            <view class="updateTip">
                <text
                    class="updateText"
                >更新于：{{resData && resData.updateTime ? resData && resData.updateTime :'---'}}</text>
            </view>
            <view class="portDetailInfo">
                <view class="start portTime">
                    <text
                        class="portName"
                    >{{resData && resData.fromPort ?resData && resData.fromPort :'---'}}</text>
                    <text class="leaveTitle">离港时间</text>
                    <text class="time">{{(resData && resData.dep_time) |formatDate}}{{resData.pre_dep_time_status?resData.pre_dep_time_status:''}}</text>
                </view>
                <view class="middle">
                    <text
                        class="transTitle"
                    >{{resData && resData.transship?resData && resData.transship:'---'}}{{resData.transship ?transferDays :''}}天</text>
                    <view class="arrowLine">
                        <text class="beforeDot"></text>
                        <text class="afterDot"></text>
                    </view>
                </view>
                <view class="end portTime">
                    <text
                        class="portName"
                    >{{resData && resData.toPort? resData && resData.toPort :'---'}}</text>
                    <text class="leaveTitle">到港时间</text>
                    <text class="time">{{resData && resData.arr_time |formatDate}}{{resData.pre_arr_time_status?resData.pre_arr_time_status:''}}</text>
                </view>
            </view>
            <view class="containerInfo">
                <text class="container">箱型箱量：{{resData.cntr_vol?resData.cntr_vol : '---'}}</text>
                <!-- <text class="rely">中转/挂靠：{{resData.transfer.length}}/{{resData.affiliation.length}}</text> -->
                <text class="rely" @click="trigglePortPop" >中转/挂靠：
					<text class="rio">{{resData.transfer.length}}/{{resData.affiliation.length}}</text>
                    <text v-if="resData.transfer && resData.transfer.length !=0 || resData.affiliation &&resData.affiliation.length !=0"  class="seeTransPort" style="color: orange;">查看</text>
                </text>
            </view>
			
           <!-- <image class="halfCircle" src="../../static/priceBg.png" mode> -->
            <view class="open" v-if="showOpen && resData.course.length != 0">
                <view class="openContent" v-for="(item,index) in resData.course" v-if="item.re_vessel_name || item.re_voy">
                    <text class="specialText">{{index | returnNum}}程：</text>
                    <text class="openText">{{item.re_vessel_name}} {{`(${item.re_voy})`}}</text>
                </view>
            </view>
            <text class="arrowWrap" @click="open">
                <text :class="['arrow',{'topArrow':showOpen}]"></text>
            </text>
        </view>
		<view class="pageBg">
			
		</view>
        <view class="tableWrap" v-if="resData">
            <text class="tableTitle">状态信息</text>
            <view class="tebleContent">
             
				<view
				    class="oneStatus"
				>
				    <text
				        :class="['statusDot',{'notActiveDot':!resData.empty_container.status},{'special':resData.empty_container.status}]"
				    >
				        <text :class="['grayHr',{'hr':resData.empty_container.status}]"></text>
				    </text>
				    <view :class="['statusContent specialContent',{'activeTextColor':resData.empty_container.status}]">
				        <text :class="['statusTitle',{'activeTextColor':resData.empty_container.status}]">提空箱</text>
				        <text
				            :class="['time',{'activeTextColor':resData.empty_container.status}]"
				        >{{resData.empty_container && resData.empty_container.time | formatDate}}</text>
				    </view>
				</view>
				
				
				
                <view
                    class="oneStatus"
					 @click="triggerLoadInpop"
                >
                    <text
                        :class="['statusDot',{'notActiveDot':!resData.arrival_loaded_containers.status}]"
                    >
                        <text :class="['grayHr',{'hr':resData.arrival_loaded_containers.status}]"></text>
                    </text>
                    <text class="seeLoad" v-if="resData.arrival_loaded_containers && resData.arrival_loaded_containers.length!=0">查看</text>
                    <view :class="['statusContent',{'activeTextColor':resData.arrival_loaded_containers.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.arrival_loaded_containers.status}]">重箱进港</text>
                        <text
                            :class="['time',{'activeTextColor':resData.arrival_loaded_containers.status}]"
                        >已进场/总箱量： {{resData.arrival_loaded_containers &&resData.arrival_loaded_containers.containers.length?resData.arrival_loaded_containers.containers.length:'---'}}/{{resData.arrival_loaded_containers.cntr_vol?resData.arrival_loaded_containers.cntr_vol:'---'}}</text>
                    </view>
                </view>
                <view class="oneStatus">
                    <text :class="['statusDot',{'notActiveDot':!resData.customs_clearance.status}]">
                        <text :class="['grayHr',{'hr':resData.customs_clearance.status}]"></text>
                    </text>
                    <text
                        class="yesOrNo"
                    >{{resData.customs_clearance.re_customs_type=='Y'?'放行': ''}}</text>
                    <view :class="['statusContent',{'activeTextColor':resData.customs_clearance.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.customs_clearance.status}]">海关放行</text>
                        <text
                            :class="['time',{'activeTextColor':resData.customs_clearance.status}]"
                        >{{resData.customs_clearance && resData.customs_clearance.re_customs_time | formatDate}}</text>
                    </view>
                </view>
                <view class="oneStatus">
                    <text :class="['statusDot',{'notActiveDot':!resData.wharf_release.status}]">
                        <text :class="['grayHr',{'hr':resData.wharf_release.status}]"></text>
                    </text>
                    <view :class="['statusContent',{'activeTextColor':resData.wharf_release.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.wharf_release.status}]">码头放行
                            <text
                                :class="yesOrNo"
                            >{{resData.wharf_release.re_wharf_type=='Y'?'放行': ''}}</text>
                        </text>
                    </view>
                </view>
                <view class="oneStatus">
                    <text :class="['statusDot',{'notActiveDot':!resData.wharf_stowage.status}]">
                        <text :class="['grayHr',{'hr':resData.wharf_stowage.status}]"></text>
                    </text>
                    <text class="yesOrNo">{{resData.wharf_stowage.re_path_type=='Y'?'配载': ''}}</text>
                    <view :class="['statusContent',{'activeTextColor':resData.wharf_stowage.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.wharf_stowage.status}]">码头配载</text>
						<text
								:class="['time',{'activeTextColor':resData.wharf_stowage.status}]"
							>{{ resData.wharf_stowage && resData.wharf_stowage.re_load_time | formatDate}}</text>
					</view>
                </view>
                <view class="oneStatus">
                    <text :class="['statusDot',{'notActiveDot':!resData.sail.status}]">
                        <text :class="['grayHr',{'hr':resData.sail.status}]"></text>
                    </text>
                    <view :class="['statusContent',{'activeTextColor':resData.sail.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.sail.status}]">开航</text>
                        <text
                            :class="['time',{'activeTextColor':resData.sail.status}]"
                        >{{ resData.sail && resData.sail.dep_time | formatDate}} {{ resData.sail.pre_dep_time_status ?resData.sail.pre_dep_time_status:''}}</text>
                    </view>
                </view>
                <view class="oneStatus">
                    <text :class="['statusDot',{'notActiveDot':!resData.arrival.status}]">
                        <text :class="['grayHr',{'hr':resData.arrival.status}]"></text>
                    </text>
                    <view :class="['statusContent',{'activeTextColor':resData.arrival.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.arrival.status}]">抵港</text>
                        <text
                            :class="['time',{'activeTextColor':resData.arrival.status}]"
                        >{{resData.arrival && resData.arrival.arr_time|formatDate}} {{resData && resData.arrival.pre_arr_time_status ?resData.arrival.pre_arr_time_status:''}}</text>
                    </view>
                </view>
                <view
                    class="oneStatus"
                >
                    <text
                        :class="['statusDot',{'notActiveDot':!resData.departure_loaded_containers.status}]"
                    >
                        <text :class="['grayHr',{'hr':resData.departure_loaded_containers.status}]"></text>
                    </text>
                    <text class="seeLoad" v-if="resData.departure_loaded_containers && resData.departure_loaded_containers.containers.length !=0" @click="triggerLoadOutpop">查看</text>
                    <view :class="['statusContent',{'activeTextColor':resData.departure_loaded_containers.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.departure_loaded_containers.status}]">重箱离港</text>
                        <text
                            :class="['time',{'activeTextColor':resData.departure_loaded_containers.status}]"
                        >已离港/总箱量： {{resData.departure_loaded_containers && resData.departure_loaded_containers.containers.length?resData.departure_loaded_containers.containers.length:'0'}}/{{ resData.departure_loaded_containers.cntr_vol?resData.arrival_loaded_containers.cntr_vol:'---'}}</text>
                    </view>
                </view>
                <view class="oneStatus">
                    <text :class="['statusDot',{'notActiveDot':!resData.re_container.status},{'special':resData.re_container.status}]"></text>
                    <view :class="['statusContent specialContent',{'activeTextColor':resData.re_container.status}]">
                        <text :class="['statusTitle',{'activeTextColor':resData.re_container.status}]">还箱</text>
                        <text
                            :class="['time',{'activeTextColor':resData.re_container.status}]"
                        >{{ resData.re_container && resData.re_container.re_empty_time |formatDate}}</text>
                    </view>
                </view>
            </view>
        </view>
		<!-- 中转/挂靠弹框 -->
        <trackPop v-if="showPortpop">
			<view class="trackPopBox" slot="popContent">
				<image @click="trigglePortPop" class="closeIcon" src="../../static/gb@2x.png" mode=""></image>
				<view  class="popWrap">
				    <!-- The code below goes into the header slot -->
					<view class="trackPoPTitle">{{ resData.affiliation.length!=0 ||  resData.transfer.length!=0?'中转挂靠信息':''}}</view>
					<view class="onetrack" v-for="(item,index) in resData.transfer" :key="index">
				       <view class="trackPoPText1">{{item.re_port_name}}</view>
				       <view class="trackPoPText2">到港时间: {{item.re_arr_time | formatDate}}{{item.pre_arr_time_status?item.pre_arr_time_status:''}}</view>
				       <view class="trackPoPText2">离港时间: {{item.re_dep_time | formatDate}}{{item.pre_dep_time_status?item.pre_dep_time_status:''}}</view>
				       <view style="height: 40rpx;"></view>
					</view> 
				    <view class="onetrack" v-for="(item,index) in resData.affiliation" :key="index">
				        <view class="trackPoPText1">{{item.re_port_name}}</view>
				        <view class="trackPoPText2">到港时间: {{item.re_arr_time | formatDate}}{{item.pre_arr_time_status?item.pre_arr_time_status:''}}</view>
				        <view class="trackPoPText2">离港时间: {{item.re_dep_time | formatDate}}{{item.pre_dep_time_status?item.pre_dep_time_status:''}}</view>
				        <view style="height: 40rpx;"></view>
				    </view>
				</view>
			</view>
        </trackPop>
		<!-- 重箱进港弹框 -->
		<trackPop v-if="showLoadOutpop">
			<view class="trackPopBox" slot="popContent">
				<image @click="triggerLoadOutpop" class="closeIcon" src="../../static/gb@2x.png" mode=""></image>
				<view  class="popWrap">
				   <!-- T重箱离港 -->
					<view class="trackPoPTitle">重箱进场/出场信息</view>
					<view class="onetrack" v-for="(item,index) in resData.departure_loaded_containers && resData.departure_loaded_containers.containers " :key="index">
						<view class="trackPoPText1">{{item.cntr_num}}</view>
						<view class="trackPoPText2">进场: {{item.full_in_time | formatDate}}</view>
						<view class="trackPoPText2">出场: {{item.full_out_time | formatDate}}</view>
						<view style="height: 40rpx;"></view>
				   </view> 
				</view>
			</view>
		</trackPop>
		
		<!-- 重箱离港弹框 -->
		<trackPop v-if="showLoadInpop">
			<view class="trackPopBox" slot="popContent">
                <image @click="triggerLoadInpop" class="closeIcon" src="../../static/gb@2x.png" mode=""></image>
				<view  class="popWrap">
					<!-- T重箱进港 -->
					<view class="trackPoPTitle">重箱进场/出场信息</view>
					<view class="onetrack" v-for="(item,index) in resData.arrival_loaded_containers && resData.arrival_loaded_containers.containers " :key="index">
						<view class="trackPoPText1">{{item.cntr_num}}</view>
						<view class="trackPoPText2">{{item.full_in_time | formatDate}}</view>
						<view style="height: 40rpx;"></view>
					</view> 
				</view>
			</view>
		</trackPop>
		<!-- 没有查到相关数据 -->
		<view v-if="!resData">
			<view class="noDataWrap">
				<text class="sorry">暂无信息</text>
				<image class="nodataTip" src="../../static/wbj@3x.png"></image>
				<view class="tipText">
					<text class="noAdress">未查询到相关信息</text>
					<text class="want">请确认信息 或 稍后再试</text>
					<text class="tel" @click="contact">客服热线：400-691-0567</text>
				</view>
			</view>
		</view>
		<!-- toast提示 -->
        <toast ref="toast" :toastText="toastText"></toast>
    </view>
</template>
<script>
import trackPop from '../../components/com-trackPop.vue'
import headBar from '../../components/com-headBar.vue';
import noPlanData from '../../components/com-noPlanData.vue';
import { getLogistics } from '../../api/logistics.js'
export default {
    components: {
        headBar,
        trackPop
    },

    data () {
        return {
            trackPoPText: [],
			//弹窗显示标志
            showPortpop: false,
			showLoadOutpop:false,
            trackPoPTitle: '重箱进场/出厂信息',
			showLoadInpop:false,
            showOpen: false,
            resData: {},
            toastText: '',
			orderHeader:''
        }
    },

    computed: {
        transferDays () {
            if (this.resData.arr_time && this.resData.dep_time) {
                let numberTime = this.resData.arr_time - this.resData.dep_time
                // console.log(numberTime)
                // console.log(numberTime / (1 * 24 * 60 * 60))
                return (numberTime / (1 * 24 * 60 * 60)).toFixed(0)
            } else {
                return '0'
            }

        },
    },
    filters: {
        formatDate: function (date) {
            if (!date) return ' '
            var date = new Date(date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var year = date.getFullYear(),
                month = ("0" + (date.getMonth() + 1)).slice(-2),
                sdate = ("0" + date.getDate()).slice(-2),
                hour = ("0" + date.getHours()).slice(-2),
                minute = ("0" + date.getMinutes()).slice(-2),
                second = ("0" + date.getSeconds()).slice(-2);
            // 拼接
            var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
            // 返回
            return result;
        },
        returnNum (index) {
            switch (index) {
                case 0:
                    return '头';
                    break;
                case 1:
                    return '二';
                    break;
                case 2:
                    return '三';
                    break;
            }
        }
    },
	
	onLoad: function (options) {
		// console.log(options)
		let order = options.order
		this.orderHeader =  options.order
		// console.log('详情页面查询提单号')
		this.getLogisticsData(order)
	},
    methods: {
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
		},
		triggerLoadInpop(){
			// console.log(999999)
			this.showLoadInpop = !this.showLoadInpop
		},
		triggerLoadOutpop(){
			this.showLoadOutpop = !this.showLoadOutpop
		},
        trigglePortPop () {
			// console.log('dqqwdqd')
			// console.log(this.showPortpop)
            this.showPortpop = !this.showPortpop
        },
        //获取用户提单号物流追踪数据
        getLogisticsData (order) {
            let openid = this.$store.state.userInfoParams.openid
            // console.log(openid)
            getLogistics(order, openid).then(res => {
                // console.log('物流追踪数据')
                // console.log(res)
				this.toastText = res.data&&res.data.error && res.data.error.msg
				if(res.code == 500){
					this.toastText =res.msg
					this.$refs.toast.show = true;
					let that = this
					setTimeout(function(){
						that.$refs.toast.show = false;
					},3000)
					return
				}
				console.log(res.data.error)
				if(res.data && res.data.error){
					this.resData = false
					this.$set(this,'resData',false)
					this.toastText =res.data.error.msg
					this.$refs.toast.show = true;
					let that = this
					setTimeout(function(){
						that.$refs.toast.show = false;
					},3000)
				}else{
					 this.resData = res.data
				}
				// console.log('this.resData')
				// console.log(this.resData)
               
                // this.trackPoPText = res.data.affiliation
                // console.log(res.data.affiliation)
            })
        },

        open () {
            console.log('0000')
            this.showOpen = !this.showOpen
        },
        // 通过接受子组件的隐藏弹窗
        hidePop (data) {
            this.Isclose = data
        },
      
    }
}
</script>
<style lang="less" scoped>
	.pageBg{
		background: #1444e1;
// min-height: 100vh;
height: 100rpx;
z-index: -1;
	}
.topContent {
  position: relative;
  background-color: #1444e1;
  padding-top: 12rpx;
  border-top: 1px solid #2956d9;
}
.updateTip {
  width: 696rpx;
  margin: 0 auto;
  height: 45rpx;
  background: #173e95;
  border-radius: 4rpx;
  // margin-top: 12rpx;
  margin-bottom: 33rpx;
  display: flex;
  align-items: center;

  .updateText {
    font-size: 22rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    padding-left: 32rpx;
  }
}
.noDataWrap{
	position: relative;
}
.sorry{
	color: #96A0AE;
	font-size: 28rpx;
	font-weight: bold;
	position: absolute;
	top: 84px;
	left: 50%;
	z-index: 1;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);

}
.seeLoad{
	position: absolute;
	font-size: 26rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #49C288;
	bottom: 10rpx;
	right: 31rpx;

}
.portDetailInfo {
  display: flex;
  flex-direction: row;
  margin: 0 32rpx 0 32rpx;
  padding-bottom: 32rpx;
  align-items: center;
  justify-content: space-between;
  .middle {
    top: -38rpx;
    // left: 30rpx;
    position: relative;
  }
  .transTitle {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fff;
    line-height: 33rpx;
  }
  .arrowLine {
    width: 125rpx;
    height: 2rpx;
    background-color: #fff;
    position: relative;
    margin-top: 4px;
    left: -10rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;

    .beforeDot {
      content: '';
      width: 11rpx;
      height: 11rpx;
      background-color: #fff;
      border-radius: 50%;
      // position: absolute;
      // left: -9rpx;
      // top: -3rpx;
    }
    .afterDot {
      content: '';
      width: 11rpx;
      height: 11rpx;
      background-color: #fff;
      border-radius: 50%;
      // position: absolute;
      // right: -9rpx;
      // top: -3rpx;
    }
  }
  .portName {
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 50rpx;
    overflow: hidden;
    width:96%;
	
    height: 50rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .leaveTitle {
    padding: 18rpx 0 10rpx 0;
    font-size: 22rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ccd7fb;
    line-height: 30rpx;
	height: 30rpx;
  }
  .time {
    font-size: 22rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ccd7fb;
    position: relative;
	height: 32rpx;
  }

  .portTime {
    display: flex;
    flex-direction: column;
  }
  .start{
	 justify-content: flex-start;
	  width: 43%;
	  position: relative;
	  left: 0;
	  top: 0;
  }
  .end {
    justify-content: flex-end;
	width: 45%;
	top: 0;
	text-align: right;
	.portName{
		margin-left: 4%;
	}

  }
}
.containerInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 32rpx;
  padding-bottom: 20rpx;
  .container,
  .rely {
    height: 33rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 33rpx;
  }
}
.halfCircle {
  position: absolute;
  bottom: -86rpx;
  display: inline-block;
  width: 100%;
  height: 90rpx;
}

.arrow {
  position: absolute;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  height: 9px;
  width: 9px;
  transform: translate(2px, -2px) rotate(-45deg);
  -webkit-transform: translate(2px, -2px) rotate(-45deg);
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  display: inline-block;
  -moz-transform: translate(2px, -2px) rotate(-45deg);
  -ms-transform: translate(2px, -2px) rotate(-45deg);
  -o-transform: translate(2px, -2px) rotate(-45deg);
  bottom: 2rpx;
  margin-left: -3px;
  left: 50%;
  margin-top: 10rpx !important;
}

.topArrow {
  transform: rotate(135deg);
}
.tableWrap {
  width: 100%;
  background: #ffffff;
  border-radius: 44rpx;
  position: relative;
  z-index: 1;
  margin-top: 14rpx;
  top: -86rpx;

  .oneStatus {
    margin-top: 20rpx;
    width: 560rpx;
    padding: 10rpx 0;
    // background: #ffffff;
    // box-shadow: 0px 1rpx 13rpx 0rpx rgba(204, 206, 232, 0.54);
    // border-radius: 8rpx;
    margin-left: 131rpx;
    display: flex;
    align-items: center;
    position: relative;
  }
  .statusDot {
    width: 22rpx;
    height: 22rpx;
    background: #1444e1;
    // position: absolute;
    left: -72rpx;
    // top: 14rpx;
    position: relative;
    border-radius: 50%;
	top: -10rpx;
    .hr {
      width: 2rpx;
      height: 104rpx;
      position: absolute;
      display: inline-block;
      background: #1444e1;
      top: 20rpx;
      left: 10rpx;
    }
  }
  .notActiveDot{
	  width: 22rpx;
  height: 22rpx;
  background:  #cfd2e7;
  // position: absolute;
  left: -72rpx;
  // top: 14rpx;
  position: relative;
  border-radius: 50%;}
  .grayHr {
	  width: 2rpx;
	  height: 104rpx;
	  position: absolute;
	  display: inline-block;
	  top: 20rpx;
	  left: 10rpx;
background: #cfd2e7;
  }

  .special {
    left: -78rpx;
    border: 6rpx solid #9ecafb;
  }
  .statusTitle {
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #cfd2e7;
    line-height: 45rpx;
    margin-bottom: 10rpx;
    // padding: 33rpx 0 15rpx 22rpx;
  }
  .time {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cfd2e7;
    line-height: 33rpx;
  }
}
.activeTextColor{
	color: #132243 !important;
}
.tableWrap {
  .statusContent {
    // position: relative;
    display: flex;
    flex-direction: column;
  }
  .statusTitle {
    margin-top: -2rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    // color: #132243;
  }
}
.specialContent{
	margin-left: -12rpx;
}
.tableTitle {
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #132243;
  display: block;
  padding: 39rpx 0 29rpx 22rpx;
}
.rio{
	padding-left: 16rpx;
}
.seeTransPort {
  padding-left: 20rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #49c288;
}
.tebleContent {
  padding-bottom: 60rpx;
}
.notActive {
  
color: #cfd2e7 !important;
}
.notSpecial {
  background: #ced2e9 !important;
  border: none !important;
}

.yesOrNo {
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #132243;
  position: absolute;
  right: 24rpx;
  bottom: 8rpx;
}
.open {
  padding: 16rpx 0 38rpx 32rpx;
}
.openContent {
  display: flex;
  flex-direction: row;
  padding-top: 13rpx;
  .specialText {
    color: #89ffc6;
    font-size: 26rpx;
  }
  .openText {
    font-size: 26rpx;
    font-weight: 500;
    color: #fff;
  }
}
.arrowWrap {
  display: block;
  width: 100%;
  padding: 10rpx 0;
}
.trackPopBox {
  
 padding: 50rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  // background-color: red;
  padding-bottom:36rpx;
  transform: translate(-50%,-50%);
  .popWrap{
	 padding: 10rpx 60rpx;

	  margin: 0 auto;
	  min-height: 80rpx;
	  max-height: 625rpx;
	  background-color: white;
	  border-radius: 25rpx;
	  overflow-y: scroll;
  }
 .closeIcon{
	 display: inline-block;
	 width: 68rpx;
	 height: 68rpx;
	 position: absolute;
	 position:78 absolute;
	right: 24rpx;
	top: -29rpx;

 }
}
.trackPoPTitle {
  font-size: 30rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #1444e1;
  margin:36rpx 0 32rpx 0rpx
  
}
.onetrack{
	white-space: nowrap;
	// padding-left: 76rpx;
}
.trackPoPText1 {
  // padding-top: 30rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #1444e1;
}

.trackPoPText2 {
	padding-top: 10rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #132243;
}
.trackPoPClose {
  z-index: 1000;
  position: absolute;
  top: -39rpx;
  left: 100%;
  border: 2rpx solid white;
  border-radius: 50%;
  color: white;
  width: 40rpx;
  height: 40rpx;
  font-size: 24rpx;
  text-align: center;
  line-height: 40rpx;
}
.trackPoPClose:hover {
  cursor: pointer;
}
.img {
  margin: 82rpx 0 0 119rpx;
  width: 308rpx;
  height: 300rpx;
  background: linear-gradient(189deg, #f6f8fa 0%, #e9edf3 100%);
}
</style>

<style scoped lang="less">
	.nodataTip{
		display: inline-block;
		width: 360rpx;
		height: 380rpx;
		position: relative;
		top: 59px;
		left: 58%;
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
		text-align: center;
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