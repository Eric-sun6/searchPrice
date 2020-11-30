<template>
    <view class="content" @touchmove="moveIng" @touchstart="moveStart" @touchend="moveEnd">
        <view class="topTitle">
            <headBar
			@gotoPrePage = "goToPreIndex"
                :ifShareIn="shareInFlag"
                :showSaveTip="false"
                class="headBar"
                :showArrow="true"
				
                :title="`${startName}-${endName}`"
            ></headBar>
            <!-- 骨架屏 -->
            <view class="dateTitle">
                <text class="chooseDate">{{catchStartDate}} 至 {{catchEndDate}}</text>
            </view>
        </view>
        <comLoading v-if="showLoading"></comLoading>
        <ls-skeleton v-if="showskeleton" :show="showskeleton" ref="skeleton"></ls-skeleton>
        <reload @reloadPlanData="reloadThePlan" :ifreload="ifShowReload" v-if="ifShowReload"></reload>
        <view class="planConentWrap" v-if="!showNodata && !ifShowReload">
            <view style="height: 2%;"></view>
            <view class="planList">
                <view
                    v-for="(item, index) in list"
                    :key="index"
                    :label="`${item.seaPortName}`"
                    :value="index"
                    :show-arrow="false"
                    class="planCale"
                    hover-class="none"
                >
                    <view class="planWrap skeleton-rect" hover-class="none">
                        <view class="planInfo skeleton-rect-radius" @click.stop="showPlan(index)">
                            <view class="dateCharge">
                                <view class="date">
                                    <comExpectStart
                                        class="sailDate"
                                        :expectInfo="item.bbiRouteDetailVOs"
                                        :item="item"
                                        :startType="startType"
                                    ></comExpectStart>
                                    <view class="days">
                                        <view class="trailType">
                                            <text>{{ routeType(item.scFreightInfoDetail.routeType) }}</text>
                                            <text>{{ item.scFreightInfoDetail.voyageTime }}天</text>
                                        </view>
                                        <view class="hrWrap">
                                            <text class="hrBefore"></text>
                                            <text class="hr"></text>
                                            <text class="hrAfter"></text>
                                        </view>
                                    </view>
                                    <comExpectEnd
                                        class="arrivalDate"
                                        :expectInfo="item.bbiRouteDetailVOs"
                                        :item="item"
                                        :endType="endType"
                                    ></comExpectEnd>
                                    <!-- <view>{{typeof(this.option)}}</view> -->
                                </view>
                                <view class="charge">
                                    <text class="dollar">
                                        <text class="itl">$</text>
                                        {{ item.usdFee.toFixed(2) }}
                                    </text>
                                    <text class="rmb">
                                        <text class="itl">￥</text>
                                        {{ item.rmbFee.toFixed(2) }}
                                    </text>
                                </view>
                            </view>
                            <view class="companyType"></view>
                        </view>
                        <view class="cale skeleton-rect-radius" @click.stop="showPlan(index)">
                            <text v-if="showPlanIndex != index" class="arrow"></text>
                            <text
                                v-if="showPlanIndex == index ? true :false"
                                class="arrow arrowTop"
                            ></text>
                            <view>
                                <text class="band">{{item.scFreightInfoDetail.shipCompanyName}}</text>
                                <text
                                    v-if="item.scFreightInfoDetail.isDirectSale == 1"
                                    class="direct"
                                >船东直供</text>
                            </view>
                            <text
                                class="transformContent"
                                v-if="item.scFreightInfoDetail.transportName"
                            >
                                <!-- <text class="trans"> -->
                                转：{{item.scFreightInfoDetail.transportName}}
                            </text>
                        </view>
                        <view class="planDetail" v-if="showPlanIndex == index ? true :false">
                            <comPlanDetail
                                :showRemark="false"
                                @saveCheckItem="savePlanListCheckbox"
                                :expectInfo="item.bbiRouteDetailVOs"
                                :item="item"
                            ></comPlanDetail>
                        </view>
                    </view>
                </view>
                <view style="height: 160rpx;" v-if="list.length>1"></view>
                <!-- background: #1444e1; -->
            </view>
            <comWXLogin v-if="list.length != 0 && !this.$store.state.userInfoFlag"></comWXLogin>
            <view v-show="showCheckoutWrap">
                <view class="choose" @click="controlShapTye">
                    <button class="choseButton">
                        <image class="xxicon" src="../../static/xxicon.png">箱型/服务
                    </button>
                </view>
                <view class="bg" v-show="showPopup">
                    <view class="shade"></view>
                    <view class="pop" type="bottom">
                        <view class="buttonWrap">
                            <button class="cancle" @click="cancleCheck">取消</button>
                            <text class="buttomTitle">箱型/服务</text>
                            <button class="confirm" @click="confirm">确认</button>
                        </view>
                        <view class="serviceType">
                            <text class="serviceTitle">箱型</text>
                            <checkbox-group @change="selectShapType" class="checkWrap">
                                <label class="typeWrap">
                                    <checkbox
                                        class="checks"
                                        value="check20GP"
                                        :checked="tonChecked.includes('check20GP')"
                                    />
                                    <text
                                        :class="[{'choosedType': tonChecked.includes('check20GP')},'type']"
                                    >20GP</text>
                                </label>
                                <label class="typeWrap">
                                    <checkbox
                                        class="checks"
                                        value="check40GP"
                                        :checked="tonChecked.includes('check40GP')"
                                    />
                                    <text
                                        :class="[{'choosedType': tonChecked.includes('check40GP')},'type']"
                                    >40GP</text>
                                </label>
                                <label class="typeWrap">
                                    <checkbox
                                        class="checks"
                                        value="check40HC"
                                        :checked="tonChecked.includes('check40HC')"
                                    />
                                    <text
                                        :class="[{'choosedType': tonChecked.includes('check40HC')},'type']"
                                    >40HC</text>
                                </label>
                            </checkbox-group>
                        </view>
                        <view class="serviceType">
                            <text class="serviceTitle">服务</text>
                            <checkbox-group @change="selectServiceType" class="checkWrap">
                                <label class="typeWrap">
                                    <checkbox
                                        class="checks"
                                        value="smStack"
                                        :disabled="notCanStack"
                                        :checked="tonChecked.includes('smStack')"
                                    />
                                    <text
                                        :class="[{'choosedType': serviceTypeChecked.includes('smStack')},'type',{'disabled':notCanStack}]"
                                    >起运港堆装</text>
                                </label>
                                <label class="typeWrap">
                                    <checkbox
                                        class="checks"
                                        value="smClear"
                                        :checked="tonChecked.includes('smClear')"
                                    />
                                    <text
                                        :class="[{'choosedType': serviceTypeChecked.includes('smClear')},'type']"
                                    >起运港报关</text>
                                </label>
                                <label class="typeWrap">
                                    <checkbox
                                        class="checks"
                                        value="dmClear"
                                        :checked="tonChecked.includes('dmClear')"
                                    />
                                    <text
                                        :class="[{'choosedType': serviceTypeChecked.includes('dmClear')},'type']"
                                    >目的港清关</text>
                                </label>
                            </checkbox-group>
                            <text v-if="notCanStack" class="announce">※ 平台不提供零担车服务，不支持货物拉到港口后堆装服务</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <noPlanData v-else :ifNoPortData="showNodata"></noPlanData>
    </view>
</template>

<script>

import json from '../../utils/skelon.js';
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
// import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
// import uniPopupMessage from '@dcloudio/uni-ui/lib/uni-popup/uni-popup-message.vue';
import noPlanData from '../../components/com-noPlanData.vue';
import headBar from '../../components/com-headBar.vue';
import lsSkeleton from '../../components/ls-skeleton/index.vue'

import comExpectStart from '../../components/com-expectStart.vue';
import reload from '../../components/com-reload.vue';
import comExpectEnd from '../../components/com-expectEnd.vue';
import comLoading from '../../components/com-loading.vue';
import comPlanDetail from '../../components/com-planDetail.vue';
import { getQuickPlanList } from '../../api/interface.js';
export default {
    components: {
        uniList,
        uniListItem,
        noPlanData,
        comExpectStart,
        comExpectEnd,
        comPlanDetail,
        comLoading,
        lsSkeleton,
        headBar,
        reload
    },
    data () {
        return {
            title: 'picker',
            index: 0,
            current: 1,
            startPortType: '',
            endPortType: '',
            smStack: false,
            smClear: false,
            dmClear: false,
            showskeleton: true,
            // currentPage: '',
            startInfo: {},
            endInfo: {},
            list: json.skelonJson,
            startPortId: '',
            endPortId: '',
            flag: true,
            planSearchInfo: null,
            statePortInfo: null,
            notCanStack: false,// 起运港堆装不可点击
            serviceType: [],//服务类型
            selectFlag: false,//是否根据条件筛选
            ton: ['check20GP'],//箱型数组
            showLoading: false,
            clearChecked: false,//初始化选项未选中
            showPlanIndex: null,
            showPopup: false,
            // listLength: 0,
            showNodata: false,
            height: null,//标题栏高度
            option: {},
            serviceCode: '1',
            tonChecked: [],
            serviceTypeChecked: [],
            ifShowReload: false,
			moveflag: 0,
			lastX:0,
			lastY:0,
			text: ''
        };
    },
    computed: {
		shareInFlag(){
			 if (JSON.stringify(this.option) == '{}') {
				 return false
			 }else{
				 return true
			 }
		},
        showCheckoutWrap () {
            if (this.list.length != 0) {
                return true
            } else {
                return false
            }
        },
        endType () {
            // console.log('endtype option')
            if (JSON.stringify(this.option) == '{}') {
                // console.log('空endtype')
                // console.log(this.$store.state)
                return this.$store.state.end.endPort.seaportType;
            } else if (JSON.stringify(this.option) != '{}') {
                return JSON.parse(this.option.statePortInfo).end.endPort.seaportType
            } else {
                return []
            }

        },
        startType () {
            if (JSON.stringify(this.option) == '{}') {
                return this.$store.state.start.startPort.seaportType
            } else if (JSON.stringify(this.option) != '{}') {
                return JSON.parse(this.option.statePortInfo).start.startPort.seaportType

            } else {
                return []
            }

        },
        catchStartDate () {
            if (JSON.stringify(this.option) == '{}') {
                return this.$store.state.planSearchInfo.startDateValue

            } else if (JSON.stringify(this.option) != '{}') {
                return JSON.parse(this.option.planSearchInfo).startDateValue
            } else {
                return ' '
            }
        },
        catchEndDate () {
            if (JSON.stringify(this.option) == '{}') {
                return this.$store.state.planSearchInfo.endDateValue

            } else if (JSON.stringify(this.option) != '{}') {
                return JSON.parse(this.option.planSearchInfo).endDateValue
            } else {
                return ' '
            }
        },
        startName () {
            if (JSON.stringify(this.option) == '{}') {

                let arrayStart = this.$store.state.start.startPort.startAdress.split(' ')
                return arrayStart[0]

            } else if (JSON.stringify(this.option) != '{}') {
                return JSON.parse(this.option.statePortInfo).start.startPort.startAdress
            } else {
                return ' '
            }



        },
        endName () {
            if (JSON.stringify(this.option) == '{}') {
                let arrayEnd = this.$store.state.end.endPort.endAddress.split('-')

                return arrayEnd[0]

            } else if (JSON.stringify(this.option) != '{}') {
                return JSON.parse(this.option.statePortInfo).end.endPort.endAddress
            }
            else {
                return ' '
            }
        }

    },

    onLoad (option) {
        // #ifdef MP-WEIXIN
        var _this = this;
        // 获取手机状态栏高度
        uni.getSystemInfo({
            success: function (data) {
                // 将其赋值给this
                _this.height = data.statusBarHeight;
            }
        })
        // #endif

        if (JSON.stringify(option) == "{}") {//路径无参数
            this.statePortInfo = this.$store.state;
            this.tonChecked = this.$store.state.planSearchInfo.ton;
        } else {
            this.option = option
            this.statePortInfo = JSON.parse(option.statePortInfo)
            this.planSearchInfo = JSON.parse(option.planSearchInfo)
            this.tonChecked = this.planSearchInfo.ton
        }

        this.startInfo = this.statePortInfo.start;
        this.endInfo = this.statePortInfo.end;
        this.startPortType = this.statePortInfo.start.startPort.type;
        this.endPortType = this.statePortInfo.end.endPort.type;
        this.startPortId = this.statePortInfo.start.startPort.value;
        this.endPortId = this.statePortInfo.end.endPort.value;

        // }

        this.$nextTick(function () {
            this.$refs.skeleton.draws()
        })
        this.planSearch();

    },
    mounted () {
        // console.log(this.$store.state)
    },
    // filters:{
    // 	returnEndAddress(val){
    // 		let arrayEnd = val.split(' ')
    // 		return arrayEnd[0]
    // 	}
    // },
    watch: {
        startPortId () {
            //起运港堆装逻辑
            if (this.startPortType == 0) {
                this.smStack = false
                this.notCanStack = true
            } else if (this.startPortType == 1) {
                this.notCanStack = false
            }
            // console.log(this.notCanStack)
        },

    },
    // onReachBottom () {
    //     this.current = this.current + 1
    //     //uniapp 监听下拉加载生命周期
    //     this.planSearch();
    // },
    created () {
        // this.tonChecked = this.$store.state.planSearchInfo.ton;
        // this.$nextTick(function(){
        // 	this.$refs.skeleton.draws()
        // })

    },
    methods: {
		goToPreIndex(){
			// #ifdef MP-WEIXIN
			console.log(this.catchStartDate)
			if(JSON.stringify(this.option) == "{}"){
				let dataFromPlanListBack={}
				 dataFromPlanListBack.startPort =  this.$store.state.start.startPort
				 dataFromPlanListBack.endPort = this.$store.state.end.endPort
				dataFromPlanListBack.ton =this.$store.state.planSearchInfo.ton
				dataFromPlanListBack.dateStartValue = this.catchStartDate;
				dataFromPlanListBack.dateEndValue = this.catchEndDate;
					try{
					  wx.setStorageSync('dataFromPlanListBack', dataFromPlanListBack);
					} catch (e) {
					  wx.setStorage('dataFromPlanListBack', dataFromPlanListBack);
					}
			}
			
			// #endif
			uni.redirectTo({ url: `../index/index`}) 
		},
		reachBottomLoadList(){
			console.log(this.pageInitNum)
			if (this.current >=this.pageInitNum) {
			    this.flag = false
				return 
			}else{
				
				this.current = this.current + 1;
				console.log('current')
				console.log(this.current)
				this.planSearch();
			}
		},
		moveIng(event){
			// console.log(22)
			this.handletouchmove(this,event,true)
		},
		moveStart(event){
			this.handletouchstart(this,event)
		},
		moveEnd(event){
			this.handletouchend(this,event)
		},
        //点击重新加载
        reloadThePlan () {
            this.planSearch();
        },
        cancleCheck () {
            this.showPopup = false;
            // this.ton = this.$store.state.planSearchInfo.ton
        },

        returnServiceCode (smClear, smStack, dmClear) {
            this.serviceCode = '1'
            //报关
            if (smClear) {
                this.serviceCode = this.serviceCode + '1'
            } else {
                this.serviceCode = this.serviceCode + '0'
            }
            //堆装
            if (this.startPortType == 1 && smStack) {
                this.serviceCode = this.serviceCode + '1'
            } else {
                this.serviceCode = this.serviceCode + '0'
            }
            //产装
            if (this.startPortType == 0) {
                this.serviceCode = this.serviceCode + '1'
            } else {
                this.serviceCode = this.serviceCode + '0'
            }
            //海外
            if (this.endPortType == 3) {
                this.serviceCode = this.serviceCode + '1'
            } else if (this.endPortType == 2 && dmClear) {
                this.serviceCode = this.serviceCode + '1'
            } else {
                this.serviceCode = this.serviceCode + '0'
            }
            return this.serviceCode
        },
        savePlanListCheckbox (val) {

            this.$store.commit('savePlanListCheckbox', { 'ton': this.ton, 'serviceType': this.serviceType })
            // console.log('item')

            let smStack = this.serviceType.includes('smStack');
            let smClear = this.serviceType.includes('smClear');
            let dmClear = this.serviceType.includes('dmClear');
            let serviceCode = this.returnServiceCode(smClear, smStack, dmClear)
            console.log(serviceCode)
            let params = {
                item: JSON.parse(val.item),
                check20GP: this.ton.includes('check20GP'),
                check40GP: this.ton.includes('check40GP'),
                check40HC: this.ton.includes('check40HC'),
                smStack: smStack,
                smClear: smClear,
                dmClear: dmClear,
                serviceCode: serviceCode,
                destationType: this.endPortType,
                planListSelectData: val,
                endType: this.endType,
                startType: this.startType,
                startName: this.startName,
                endName: this.endName,
                catchStartDate: this.catchStartDate,
                catchEndDate: this.catchEndDate,
            }
            this.$store.commit('saveParam', params)
            uni.redirectTo({
                url: '/pages/priceDetail/index'
            })
        },
        showPlan (index) {
			console.log('showplan')
            if (this.showPlanIndex == index) {
                this.showPlanIndex = -1
            } else {
                this.showPlanIndex = index
            }

        },
        selectShapType (type) {
            this.tonChecked = type.detail.value; //tonChecked  serviceTypeChecked
        },
        selectServiceType (type) {
            this.serviceTypeChecked = type.detail.value; //serviceType
        },

        confirm () {
            this.selectFlag = true;
            this.showPopup = false
            this.flag = true
            this.ton = this.tonChecked;
            this.serviceType = this.serviceTypeChecked
            // console.log(this.ton)
            this.list = []
            this.planSearch();
        },
        controlShapTye () {
            this.clearChecked = false
            this.showPopup = true
        },
        onShareAppMessage () {
            this.statePortInfo = this.$store.state;
            this.planSearchInfo = this.$store.state.planSearchInfo;

            return {
                title: '一键获取供应链全程物流报价方案，省力、省时！',
                path: `pages/planList/index?statePortInfo=${JSON.stringify(this.statePortInfo)}&planSearchInfo=${JSON.stringify(this.planSearchInfo)}`,
                // imageUrl: '../../static/share.jpg',
                success: function (res) {
                    console.log('分享成果')
                    // this.statePortInfo = this.planSearchInfo = null
                }

            }
        },
        //全程还是转航
        routeType (val) {
            if (val == '01') {
                return '全程';
            } else if (val == '02') {
                return '转航';
            }
        },

        planSearch (option) {
            this.showLoading = true
            // console.log(this.flag)
			
            if (!this.flag) return
            //转换地点ID
            let planSearchInfo

            if (JSON.stringify(this.option) == '{}') {
                planSearchInfo = this.$store.state.planSearchInfo;
            } else {
                planSearchInfo = JSON.parse(this.option.planSearchInfo);

            }

            let divisionId = this.startPortType == 0 ? this.startPortId : '';
            let sport = this.startPortType == 1 ? this.startPortId : this.endPortType == 1 ? this.endPortId : '';
            let dport = this.startPortType == 2 ? this.startPortId : this.endPortType == 2 ? this.endPortId : '';
            let fcity = this.endPortType == 3 ? this.endPortId : '';
            let startDateValue = planSearchInfo.startDateValue;
            let endDateValue = planSearchInfo.endDateValue;
            if (!this.selectFlag) {//没选择筛选条件
                this.ton = planSearchInfo.ton;

            } else {//选择了筛选条件

                this.showPopup = false
                // this.$refs.popup.close()
                this.smStack = this.serviceType.includes('smStack');
                this.smClear = this.serviceType.includes('smClear');
                this.dmClear = this.serviceType.includes('dmClear');
                this.current = 1;//初始化页数
            }
            let check20GP = this.ton.includes('check20GP');
            let check40GP = this.ton.includes('check40GP');
            let check40HC = this.ton.includes('check40HC');
            let params = {
                divisionId: divisionId,
                shipportId: sport,
                destportId: dport,
                destinationId: fcity,
                startTime: startDateValue, //'2020-06-08T16:00:00.872Z',//
                endTime: endDateValue, //'2020-07-08T16:00:00.872Z',//
                check20GP: check20GP,
                check40GP: check40GP,
                check40HC: check40HC,
                smStack: this.smStack,
                smClear: this.smClear,
                dmClear: this.dmClear,
                currentPage: this.current,
				openId: this.$store.state.userInfoParams.openid
            };
            getQuickPlanList(params).then(res => {
                this.showskeleton = false
                // this.$nextTick(function(){
                // 	 this.showskeleton = false
                // })
                // console.log('list success')
                if (res.code == 501) {
                    this.ifShowReload = true
                    console.log(res)
                    return
                }
                // console.log(res.list);
                // this.list = res.list;
                // this.listLength = res.list.length
                if (!res.list.length) {
                    this.showNodata = true
                } else {
                    this.showNodata = false
                }
                if (this.current == 1) {
                    this.list = res.list
                } else {
                    this.list = this.list.concat(res.list); //将数据拼接在一起

                }

                this.showLoading = false
                this.pageInfo = {
                    pageNumber: res.pageNumber,
                    pageSize: res.pageSize,
                    pages: res.pages
                };
				this.pageInitNum =  res.pages
				
            }).catch(err => {
                this.ifShowReload = true
                console.log(err)
            })
        }
    }
};
</script>
<style>
</style>
<style scoped lang="less">
.head {
  position: relative;
  align-items: center;
  display: flex;
  justify-content: center;
  // background-color: green;
}
.headText {
  // height: 65px;
  // line-height: 65px;
  color: white;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
.transformContent {
  color: #74809c;
  font-size: 22rpx;
  padding-top: 5px;
}
.arrow {
  position: absolute;
  border-left: 1px solid #74809c;
  border-bottom: 1px solid #74809c;
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
  bottom: 8px;
  margin-left: -3px;
  left: 50%;
}

.arrowTop {
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  position: absolute;
  top: 3rpx;
  top: 68rpx;
}
// .arrow:after{
//    content: '';
//    bottom: 2px;
//    left: 50%;
//    margin-left: -8px;
//    position: relative;
//    width: 0;
//    height: 0;
//    border-width: 8px;
//    border-style: solid;
//    border-color: #0099CC transparent transparent transparent;
// }

.content {
  // background:#0b46d8;
  height: 100vh;
}
.planList {
  width: 100%;
  padding: 0px;
  padding: 10rpx 0rpx;
  padding-top: 220rpx;
  background: #0b46d8;
  // padding-bottom: 160rpx;
  // background-color: rgb(11, 70, 216);
  // background:linear-gradient(    rgba(11, 70, 216, 1),    rgba(1, 70, 216, 0.8),    rgba(1, 70, 216, 0.2),    rgba(1, 70, 216, 0)  );
}
.headBar {
  position: relative;
  z-index: 11;
}
.planConentWrap {
  height: 100vh;
  background: #0b46d8;
  // padding-bottom: 160rpx;
}
.uni-list-item {
  padding: 0 !important;
}
.dateCharge {
  justify-content: space-between;
}
.date,
.dateCharge {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.charge {
  text-align: right;
}
.sailDate,
.arrivalDate,
.charge,
.days {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.days {
  align-items: center;
  justify-content: center;
}
.date {
  flex: 4;
  /* background-color: red; */
  justify-content: space-between;
  margin-right: 30rpx;
}
.charge {
  flex: 1;
}
.arrivalDate {
  text-align: right;
}
.choose {
  button {
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 1px 5px 3px #b6bdd8;
    border-radius: 46rpx;
    width: 90%;
    height: 96rpx;
    left: 5%;
    position: fixed;
    bottom: 60rpx;
    color: #132243;
    font-size: 28rpx;
    line-height: 96rpx;
    background-color: white;
  }
}
.checkWrap {
  background-color: white;
  // padding: 40rpx;
}
.dollar,
.rmb {
  color: #f23d1e;
  font-size: 32rpx;
  font-weight: bold;
  .itl {
    color: #f23d1e;
    font-size: 24rpx;
    font-weight: bold;
  }
}
.trailType {
  color: #74809c;
  font-size: 24rpx;
  position: relative;
  top: -4rpx;
}
.direct {
  color: #fff;
  font-size: 24rpx;
  padding: 2rpx 26rpx;
  border-radius: 8rpx;
  margin-left: 24rpx;
  background: rgba(209, 62, 6, 1);
}
.cale {
  position: relative;
  padding: 0 16rpx;

  padding-bottom: 50rpx;
  display: flex;
  justify-content: space-between;
  /* background-color: #007AFF; */
}
.planInfo {
  margin: 0 0 26rpx 0;

  padding: 0 16rpx;
  padding-top: 36rpx;
}
.planCale {
  background-color: white;
  border-radius: 15rpx;
  margin: 20rpx 20rpx;
}
.planWrap {
  align-items: center;
  background-color: white;
  // padding: 0 16rpx;
  border-radius: 10rpx;
  overflow: hidden;
  margin: 10rpx 0rpx 10rpx 0rpx;
  &:active {
    background-color: none;
  }
}
.band {
  color: #15b7b9;
  font-size: 24rpx;
}
.trans {
  color: #74809c;
  font-size: 22rpx;
}
.planDetail {
  // display: none;
  border-top: 1px solid #e8f0fc;
}
.cancle {
  color: #8e8f90;
  font-size: 28rpx;
  background-color: white;
  width: 120rpx;

  border: none !important;
  margin: 0;
}
button::after {
  border: none;
}
.confirm {
  color: #15b7b9;
  width: 120rpx;
  border: none !important;

  font-size: 28rpx;
  background-color: white;
  margin: 0;
}
.buttonWrap {
  padding: 40rpx 5rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.dateTitle {
  position: relative;
  z-index: 9;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  padding-top: 40rpx;
  padding-bottom: 26rpx;
  background-color: rgba(11, 70, 216, 1);
}
.chooseDate {
  color: white;
  font-size: 28rpx;
}
.serviceType {
  padding: 10rpx 30rpx;
  padding-bottom: 70rpx;
}
.serviceTitle,
.buttomTitle {
  font-size: 32rpx;
  color: #132243;
}
.checks {
  width: 120px;
  height: 60px;
  background: red;
  opacity: 0;
  position: absolute;
}

.type {
  width: 206rpx;
  height: 84rpx;
  line-height: 84rpx;
  background: rgba(243, 245, 248, 1);
  border-radius: 12rpx;
  display: block;
  color: #74809c;
  font-size: 32rpx;
  text-align: center;

  border: 1px solid white;
}
.choosedType {
  width: 206rpx;
  height: 84rpx;
  line-height: 84rpx;
  background: rgba(243, 255, 255, 1);

  border-radius: 12rpx;
  border: 1px solid rgba(21, 183, 185, 1);
  display: block;

  font-size: 32rpx;
  text-align: center;
  color: #15b7b9;
}
.checkWrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30rpx 0;
}
.typeWrap {
  position: relative;
}
.announce {
  color: #f45c42;
  font-size: 24rpx;
  padding: 20rpx 0 50rpx 0;
  display: block;
  width: 100%;
  text-align: center;
}
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.shade {
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
}
.pop {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  right: 0;
  border-top-left-radius: 25rpx;
  border-top-right-radius: 25rpx;
  opacity: 1;
}
.resetBG {
  background-color: white !important;
}
.noPlan {
  padding-top: 140rpx;
}
.choseButton {
  position: relative;
}
.xxicon {
  display: inline-block;
  width: 30rpx;
  height: 20rpx;
  position: absolute;
  top: 38rpx;
  left: 240rpx;
}
.hrWrap {
  display: flex;
  justify-content: space-between;
  width: 130rpx;
  align-items: center;
}

.hr {
  width: 120rpx;
  border-top: 1px solid #74809c;
}
.hrBefore {
  content: '';
  display: block;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background-color: white;

  border: 1rpx solid #74809c;
}
.hrAfter {
  content: '';
  display: block;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background-color: white;

  border: 1rpx solid #74809c;
}
.disabled {
  color: #c2c4c8;
  border: 1px solid rgba(234, 238, 243, 1);
}
.topTitle {
  position: fixed;
  background-color: #0b46d8;
  z-index: 11;
}
</style>
