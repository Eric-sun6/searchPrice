<template >
    <view class="content" @touchmove="moveIng" @touchstart="moveStart" @touchend="moveEnd">
        <view class="topTitle">
            <!-- <navigator url="../planList/index"> -->
            <head-bar
                @exportBannerTop="getBannnerTop"
                :showSaveTip="false"
                class="headBar"
                :showArrow="true"
                :title="`报价单`"
                :backUrl="`../planList/index`"
            ></head-bar>
            <!-- </navigator> -->
            <!-- 骨架屏 -->
            <!-- <view class="dateTitle">
            </view>-->
        </view>
        <view class="priceCaleWrap">
            <view :style="{height:bannerTop+'px'}"></view>
            <view class="priceCaleContent">
                <comPriceDetailCale
                    :item="priceDetailCaleData.item"
                    :priceDetailCaleData="priceDetailCaleData"
                ></comPriceDetailCale>
                <!-- <text class="chooseDate">{{catchStartDate}} 至 {{catchEndDate}}</text> -->
            </view>
            <view class="chooseBox" @click="showChoseBox = true">
                <view class="hasChoosed">
                    <text class="choosedText">已选</text>
                    <text class="rightArrow"></text>
                </view>
                <view class="shapeWeight">
                    <view>
                        <text class="weight">20GP</text>
                        <text class="multiplication">x</text>
                        <text v-if="firstLoadData" class="weight">{{check20GP}}</text>
                        <text v-else class="weight">{{check20GPNum}}</text>
                    </view>
                    <view>
                        <text class="weight">40GP</text>
                        <text class="multiplication">x</text>
                        <text v-if="firstLoadData" class="weight">{{check40GP}}</text>
                        <text v-else class="weight">{{check40GPNum}}</text>
                    </view>
                    <view>
                        <text class="weight">40HC</text>
                        <text class="multiplication">x</text>
                        <text v-if="firstLoadData" class="weight">{{check40HC}}</text>
                        <text v-else class="weight">{{check40HCNum}}</text>
                    </view>
                </view>
                <view class="goodstype">
                    <text class="typeText normalPro" v-if="checkShowHidden('QU_GOODS_TYPE')">普货</text>
                    <text class="typeText kind" v-if="checkShowHidden('QU_CUSTOMS_CLEARANCE')">一般贸易</text>
                    <text
                        class="typeText num"
                        v-if="checkShowHidden('QU_CUSTOMS_CLEARANCE')"
                    >品名数量{{productNumNew}}个</text>
                </view>
            </view>
            <view class="proposal">
                <view class="proposalTitle">
                    <view class="feeInfoTitle">
                        <text class="title">报价单</text>
                        <view class="total">
                            <text class="totalText">合计金额</text>
                            <text class="usd">USD&nbsp&nbsp{{feeUSDTotal.toFixed(2)}}</text>
                            <text class="rmb">CNY&nbsp&nbsp{{feeCNYTotal.toFixed(2)}}</text>
                        </view>
                    </view>
                    <view class="proposalContent">
                        <view class="feeContent">
                            <view class="feeInfo">
                                <!-- 订舱费用集合 -->
                                <view class="fee" v-if="orderShipFee && orderShipFee.length != 0">
                                    <view class="feeTitle">
                                        <text class="feeType">
                                            <text>订舱</text>
                                        </text>
                                        <text
                                            class="orderNum"
                                        >{{param && param.item.scFreightInfoDetail.freightDetailNo}}</text>
                                    </view>
                                    <view
                                        class="feeItem"
                                        v-for="(listItem,index) in orderShipFee"
                                        :key="index"
                                    >
                                        <view class="feeDetailItem">
                                            <text
                                                class="feeName firstfieeName"
                                            >{{returnFeeName(listItem.feeName)}}&nbsp&nbsp{{`(${returnUnitType(listItem.measurementUnit)})`}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.unitPrice.toFixed(2)}} × {{listItem.number}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.currency=='01'? 'CNY' : 'USD'}}&nbsp&nbsp{{returnTotal(listItem.unitPrice,listItem.number)}}</text>
                                        </view>
                                    </view>
                                    <view class="feeItemTotal">
                                        <text class="count">小计：</text>
                                        <view
                                            class="itemTotal dollar"
                                            v-if="orderShipFeeUSDTotal"
                                        >USD&nbsp&nbsp{{orderShipFeeUSDTotal.toFixed(2)}}</view>
                                        <view
                                            class="itemTotal"
                                            v-if="orderShipFeeCNYTotal"
                                        >CNY&nbsp&nbsp{{orderShipFeeCNYTotal.toFixed(2)}}</view>
                                    </view>
                                </view>
                                <!-- 产装费用集合 -->
                                <view class="fee" v-if="cZFeeList && cZFeeList.length != 0">
                                    <view class="feeTitle">
                                        <text class="feeType">
                                            <text>产装</text>
                                        </text>
                                        <text class="orderNum">{{czQuoteNum}}</text>
                                    </view>
                                    <view class="feeItem" v-for="listItem in cZFeeList">
                                        <view class="feeDetailItem">
                                            <text
                                                class="feeName firstfieeName"
                                            >{{returnFeeName(listItem.feeName)}}&nbsp&nbsp{{`(${returnUnitType(listItem.measurementUnit)})`}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.unitPrice.toFixed(2)}} × {{listItem.number}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.currency=='01'? 'CNY' : 'USD'}}&nbsp&nbsp{{returnTotal(listItem.unitPrice,listItem.number)}}</text>
                                        </view>
                                    </view>
                                    <view class="feeItemTotal">
                                        <text class="count">小计：</text>
                                        <view
                                            class="itemTotal dollar"
                                            v-if="czFeeUSDTotal"
                                        >USD&nbsp&nbsp{{czFeeUSDTotal.toFixed(2)}}</view>
                                        <view
                                            class="itemTotal"
                                            v-if="czFeeCNYTotal"
                                        >CNY&nbsp&nbsp{{czFeeCNYTotal.toFixed(2)}}</view>
                                    </view>
                                </view>
                                <!-- 堆装费用集合 -->
                                <view class="fee" v-if="dzFeeList && dzFeeList.length != 0">
                                    <view class="feeTitle">
                                        <text class="feeType">
                                            <text>堆装</text>
                                        </text>
                                        <text class="orderNum">{{dzQuoteNum}}</text>
                                    </view>
                                    <view class="feeItem" v-for="listItem in dzFeeList">
                                        <view class="feeDetailItem">
                                            <text
                                                class="feeName firstfieeName"
                                            >{{returnFeeName(listItem.feeName)}}&nbsp&nbsp{{`(${returnUnitType(listItem.measurementUnit)})`}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.unitPrice.toFixed(2)}} × {{listItem.number}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.currency=='01'? 'CNY' : 'USD'}}&nbsp&nbsp{{returnTotal(listItem.unitPrice,listItem.number)}}</text>
                                        </view>
                                    </view>
                                    <view class="feeItemTotal">
                                        <text class="count">小计：</text>
                                        <view
                                            class="itemTotal dollar"
                                            v-if="dzFeeUSDTotal"
                                        >USD&nbsp&nbsp{{dzFeeUSDTotal.toFixed(2)}}</view>
                                        <view
                                            class="itemTotal"
                                            v-if="dzFeeCNYTotal"
                                        >CNY&nbsp&nbsp{{dzFeeCNYTotal.toFixed(2)}}</view>
                                    </view>
                                </view>
                                <!-- 报关费用集合 -->
                                <view
                                    class="fee"
                                    v-if="declareFeeObj && declareFeeObj.bgFee && param.smClear"
                                >
                                    <view class="feeTitle">
                                        <text class="feeType">
                                            <text>报关费</text>
                                        </text>
                                        <text
                                            class="orderNum"
                                        >{{declareFeeObj.bgQuoteNum?declareFeeObj.bgQuoteNum: ' '}}</text>
                                    </view>
                                    <view class="feeItem">
                                        <view class="feeDetailItem">
                                            <text
                                                class="feeName firstfieeName"
                                            >{{ returnFeeName( declareFeeObj && declareFeeObj.bgFee.feeName)}}&nbsp&nbsp{{`(${returnUnitType(declareFeeObj && declareFeeObj.bgFee.measurementUnit)})`}}</text>
                                            <text
                                                class="feeName"
                                            >{{declareUnitPrice}} × {{reload?productNumNew : declareFeeObj&& declareFeeObj.bgFee.number}}</text>
                                            <text
                                                class="feeName"
                                            >{{declareFeeObj && declareFeeObj.bgFee.currency=='01'?'CNY' :'USD'}}&nbsp&nbsp{{declareTotal}}</text>
                                        </view>
                                    </view>
                                    <view class="feeItemTotal">
                                        <text class="count">小计：</text>
                                        <view
                                            class="itemTotal dollar"
                                            v-if="declareFeeObj && declareFeeObj.bgFee.currency=='02'"
                                        >USD&nbsp&nbsp{{declareTotal}}</view>
                                        <view
                                            class="itemTotal"
                                            v-if="declareFeeObj && declareFeeObj.bgFee.currency=='01'"
                                        >CNY&nbsp&nbsp{{declareTotal}}</view>
                                    </view>
                                </view>
                                <!-- 海外费用集合 -->
                                <view class="fee" v-if="hwFeeList && hwFeeList.length != 0">
                                    <view class="feeTitle">
                                        <text class="feeType">
                                            <text>海外</text>
                                        </text>
                                        <text class="orderNum">{{hwQuoteNum}}</text>
                                    </view>
                                    <view class="feeItem" v-for="listItem in hwFeeList">
                                        <view class="feeDetailItem">
                                            <text
                                                class="feeName firstfieeName"
                                            >{{returnFeeName(listItem.feeName)}}&nbsp&nbsp{{`(${returnUnitType(listItem.measurementUnit)})`}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.unitPrice.toFixed(2)}} × {{listItem.number}}</text>
                                            <text
                                                class="feeName"
                                            >{{listItem.currency=='01'? 'CNY' : 'USD'}}&nbsp&nbsp{{returnTotal(listItem.unitPrice,listItem.number)}}</text>
                                        </view>
                                    </view>
                                    <view class="feeItemTotal">
                                        <text class="count">小计：</text>
                                        <view
                                            class="itemTotal dollar"
                                            v-if="hwFeeUSDTotal"
                                        >USD&nbsp&nbsp{{hwFeeUSDTotal.toFixed(2)}}</view>
                                        <view
                                            class="itemTotal"
                                            v-if="hwFeeCNYTotal"
                                        >CNY&nbsp&nbsp{{hwFeeCNYTotal.toFixed(2)}}</view>
                                    </view>
                                </view>
                                <view class="tipProposal">
                                    <text class="notCountIn">※ 星号费用按照实际发生账单为准，暂不计入合计金额</text>
                                </view>
                            </view>
                        </view>
                        <view
                            :class="['freeDuty',{'freeDutyActive':feeList.length==1}]"
                            @click="showtheShade"
                        >
                            <text>智全程全程物流</text>
                            <text class="freeDutyBtn">《免责声明》</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <comShade
            :textStyle="shadeTextStyle"
            :titleText="`免责声明`"
            @closeTheshade="closeTheshade"
            v-if="ifshowShade"
        ></comShade>
        <comChoseBox class="comChoseBox" :showChoseBox="showChoseBox">
            <view slot="chekboxChoose" style="padding-bottom: 100rpx;
">
                <view class="titleBtn">
                    <text class="calcle" @click="checkCancle">取消</text>
                    <text class="checkTitle">箱型/服务</text>
                    <text class="confirm" @click="reloadFeeInfo">确认</text>
                </view>
                <view class="choseTyp">
                    <text class="choseTitle">箱型</text>
                    <view class="choseTiem">
                        <text class="shapWeight">20GP</text>
                        <uniNumberBox
                            :disabled="!Boolean(this.$store.state.param.check20GP)"
                            :value="GP20NumL? GP20NumL: check20GP"
                            @change="change20GP"
                            :class="['numchange',{'numberCheckDisable':!Boolean(this.$store.state.param.check20GP)}]"
                        ></uniNumberBox>
                    </view>
                    <view class="choseTiem">
                        <text class="shapWeight">40GP</text>
                        <uniNumberBox
                            :disabled="!Boolean(this.$store.state.param.check40GP)"
                            :value="GP40Num? GP40Num:check40GP"
                            @change="change40GP"
                            :class="['numchange',{'numberCheckDisable':!Boolean(this.$store.state.param.check40GP)}]"
                        ></uniNumberBox>
                    </view>
                    <view class="choseTiem">
                        <text class="shapWeight">40HC</text>
                        <uniNumberBox
                            :disabled="!Boolean(this.$store.state.param.check40HC)"
                            :value="HC40Num? HC40Num:check40HC"
                            @change="change40HC"
                            :class="['numchange',{'numberCheckDisable':!Boolean(this.$store.state.param.check40HC)}]"
                        ></uniNumberBox>
                    </view>
                </view>
                <view
                    class="choseTyp extralMargin nomargin"
                    v-if="checkShowHidden('QU_GOODS_TYPE')"
                >
                    <text class="choseTitle">货物类型</text>
                    <text class="productType normal">普货</text>
                    <text style="display: none;" class="disabled">危品</text>
                </view>
                <view class="choseTyp extralMargin" v-if="checkShowHidden('QU_CUSTOMS_CLEARANCE')">
                    <text class="choseTitle">贸易方式</text>
                    <text class="productType normal">一般贸易</text>
                    <text style="display: none;" class="disabled">其他</text>
                </view>
                <view
                    class="choseTyp nums extralMargin"
                    v-if="checkShowHidden('QU_CUSTOMS_CLEARANCE')"
                >
                    <text class="choseTitle">品名数量</text>
                    <uniNumberBox
                        @change="changeProduct"
                        v-model="productNum"
                        :value="productNum"
                        :max="50"
                        :min="1"
                        class="productNum numchange"
                    ></uniNumberBox>
                </view>
            </view>
        </comChoseBox>
		<view class="askWrap">
			<button class="askBtn" @click="askThePrice">
				<image class="askImg" src="../../static/ask.png"></image>
				<text class="askText">咨询报价</text>
			</button>
		</view>
		
		<toast ref="toast" :toastText="toastText"></toast>
    </view>
</template>

<script>
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"

import json from '../../utils/skelon.js';
// import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';
// import uniPopupMessage from '@dcloudio/uni-ui/lib/uni-popup/uni-popup-message.vue';
import noPlanData from '../../components/com-noPlanData.vue';
import headBar from '../../components/com-headBar.vue';
import comPriceDetailCale from '../../components/com-priceCale.vue';
import lsSkeleton from '../../components/ls-skeleton/index.vue'
import comShade from '../../components/com-shade.vue'
import comChoseBox from '../../components/com-choseBox.vue'
import comExpectStart from '../../components/com-expectStart.vue';
import {    declareFee, getUnit, getBbiExpense, getFeeAttribute, getCurrency, getmanyFee, checkBlockAll, getSheetByCode, getSimpleSheetStatus,saveQuoteConsult,saveUserAction
} from '../../api/price.js';
import {showToast} from '../../utils/index.js'
import {getIp} from "../../api/wechart.js"
export default {
    components: {
        comPriceDetailCale,
        lsSkeleton,
        headBar,
        comShade,
        comChoseBox,
        uniNumberBox
    },

    data () {

        return {

            showskeleton: true,
            expectInfo: {},
            bannerTop: 0,
            item: {},
            priceDetailCaleData: {},
            ifshowShade: false,
            shadeTextStyle: {
                'fontSize': '26rpx',
                'fontWeight': 400,
                'color': 'rgba(116,128,156,1)',
                'lineHeight': '61rpx'
            },
            showChoseBox: false,
            // freedutyText: ,
            productNum: 1,
            productNumNew: 1,
            declareFeeObj: null,//报关费用对象
            hasDeclareFee: false,
            unit: null,//计量单位集合
            feeNameObj: null,
            feeAttributeObj: null,
            currencyObj: null,
            param: null,
            GP20NumL: 0,
            GP40Num: 0,
            HC40Num: 0,
            firstLoadData: true,
            orderShipFee: [],//订舱费用集合
            dzQuoteNum: '',
            dzFeeList: [],
            czQuoteNum: '',
            cZFeeList: [],
            hwQuoteNum: '',
            hwFeeList: [],    
            feeCNYTotal: 0,
            feeUSDTotal: 0,
            feeList: [],
            manyFeeList: [],
            newFeeList: [],
            buSheetNodeBlock: [],
            check20GPNum: 0,
            check40GPNum: 0,
            check40HCNum: 0,
			showToastFlag: false,
			window: null,
			toastText: '',
			header:{},
			screenSizes:''
        };
    },

    onLoad (option) {
        this.param = this.$store.state.param
        let planListSelectData = this.$store.state.param.planListSelectData
        this.expectInfo = JSON.parse(planListSelectData.expectInfo)
        this.item = JSON.parse(planListSelectData.item)
        this.priceDetailCaleData = {
            'expectInfo': this.expectInfo,
            'item': this.item,
			'endType': this.$store.state.param.endType,
			'startType':this.$store.state.param.startType,
        }

    },
    mounted () {
		let that = this
		uni.getSystemInfo({
			success(res) {
				that.window = res
				
			}
		})
        this.showServiceItem()
		
		setTimeout(()=>{
			that.userActionSave()
		},2000)
        // console.log('params')
        // console.log(this.$store.state.param)
        // this.savePlanListCheckbox = this.$store.state.planListCheckbox
    },

    computed: {
        //返回海外费用小计总价
        hwFeeCNYTotal () {
            let cnyTotal = Array.from(this.hwFeeList).map(item => {
                if (item.currency == '01') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })

            return cnyTotal.reduce(this.sum, 0.00);
        },
        hwFeeUSDTotal () {
            let usdTotal = Array.from(this.hwFeeList).map(item => {
                if (item.currency == '02') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })
            return usdTotal.reduce(this.sum, 0.00);
        },
        //返回产装费用小计总价
        czFeeCNYTotal () {
            let cnyTotal = this.cZFeeList.map(item => {
                if (item.currency == '01') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })
            return cnyTotal.reduce(this.sum, 0.00);
        },
        czFeeUSDTotal () {
            let usdTotal = this.cZFeeList.map(item => {
                if (item.currency == '02') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })
            return usdTotal.reduce(this.sum, 0.00);
        },
        //返回堆装费用小计总价
        dzFeeCNYTotal () {
            let cnyTotal = Array.from(this.dzFeeList).map(item => {
                if (item.currency == '01') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })
            return cnyTotal.reduce(this.sum, 0.00);
        },
        dzFeeUSDTotal () {
            let usdTotal = Array.from(this.dzFeeList).map(item => {
                if (item.currency == '02') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })
            return usdTotal.reduce(this.sum, 0.00);
        },
        //返回订舱费用小计总价
        orderShipFeeCNYTotal () {
            let cnyTotal = Array.from(this.orderShipFee).map(item => {
                if (item.currency == '01') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })
            return cnyTotal.reduce(this.sum, 0.00);
        },
        orderShipFeeUSDTotal () {

            let usdTotal = Array.from(this.orderShipFee).map(item => {
                if (item.currency == '02') {
                    let total = item.unitPrice * item.number
                    return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/))
                } else {
                    return 0
                }

            })

            return usdTotal.reduce(this.sum, 0.00);
        },
        declareTotal () {
            if (this.declareFeeObj) {
                let number = this.reload ? this.productNumNew : this.declareFeeObj && this.declareFeeObj.bgFee.number
                let total = this.declareFeeObj.bgFee.unitPrice * number
                return Number(total.toString().match(/^\d+(?:\.\d{0,2})?/)).toFixed(2)
            } else {
                return ''
            }
        },
        declareUnitPrice () {
            if (this.declareFeeObj) {
                return this.declareFeeObj.bgFee.unitPrice.toFixed(2)
            } else {
                return ''
            }

        },
        check20GP () {
            return this.$store.state.param.check20GP ? '1' : '0'
            // return this.$store.state.planListCheckbox.ton.includes('check20GP') ? '1' : '0'
        },
        check40GP () {

            return this.$store.state.param.check40GP ? '1' : '0'
            // return this.$store.state.planListCheckbox.ton.includes('check40GP') ? '1' : '0'
        },
        check40HC () {
            return this.$store.state.param.check40HC ? '1' : '0'
            // return this.$store.state.planListCheckbox.ton.includes('check40HC') ? '1' : '0'
        }
    },

    async created () {
		// #ifdef MP-WEIXIN
		let ip;
		 await getIp().then(res=>{
			 console.log(res)
			 let resData = res && res[1] && res[1].data
			ip = resData ? resData.split('=')[1] :''
			ip = ip ? ip.replace(';','') :'';
		})
		ip =ip ? ip && JSON.parse(ip).cip :''
		let width = this.window && this.window.windowWidth
		let height = this.window && this.window.windowHeight;  
		
	 
		this.screenSizes =width + 'x' + height;  
		console.log(this.window)
		this.header ={
			"Content-type": "application/x-www-form-urlencoded",
			"ipAddr": ip,
			"screenSize":this.screenSizes
		};
		// #endif
        this.param = this.$store.state.param
        // console.log('priceparams')
        // console.log(this.$store.state.param)
        //获取费用属性
        await getFeeAttribute().then(res => {
            this.feeAttributeObj = res
        })
        //获取费用名称集合
        await getBbiExpense().then(res => {
            this.feeNameObj = res
        })
        //获取计量单位哦
        await getUnit().then(res => {
            this.unit = res
        })
        //获取报关费用
        await this.getDeclareFee(this.param)

        this.reload = false
        await this.getManyfeeList(this.reload)

    },
	
    watch: {
        hwFeeCNYTotal (val, oldval) {
        },
        hwFeeList: {
            handler (val) {
                this.hwFeeList = val
            },
            immediate: true, deep: true
        },
        cZFeeList: {
            handler (val) {

                this.cZFeeList = val
            },
            immediate: true,
            deep: true
        },
        dzFeeList: {
            handler (val) {

                this.dzFeeList = val
            },
            immediate: true,
            deep: true
        },
        orderShipFee: {
            handler (val) {

                this.orderShipFee = val
            },
            immediate: true, deep: true
        },
        feeList: {
            handler (val) {
                //总计 人民币
                this.feeList = val
                if (this.manyFeeList && this.manyFeeList.length != 0) {
                    let cnyTotal = this.manyFeeList.map(item => {
                        if (item.currency == '01') {
                            return item.unitPrice * item.number
                        } else {
                            return 0
                        }

                    })

                    let totalcny = cnyTotal.reduce(this.sum, 0);
                    if (this.declareFeeObj && this.declareFeeObj.bgFee.currency == '01' && this.param.smClear) {
                        this.feeCNYTotal = totalcny + Number(this.declareTotal)
                        // console.log(this.feeCNYTotal)
                    } else {
                        this.feeCNYTotal = totalcny
                    }
                    let usdTotal = this.manyFeeList.map(item => {
                        if (item.currency == '02') {
                            return item.unitPrice * item.number
                        } else {
                            return 0
                        }

                    })
                    let total = usdTotal.reduce(this.sum, 0);
                    if (this.declareFeeObj && this.declareFeeObj.bgFee.currency == '02' && this.param.smClear) {
                        this.feeUSDTotal = total + Number(this.declareTotal)
                    } else {
                        this.feeUSDTotal = total
                    }

                } else {
                    this.feeUSDTotal = this.feeCNYTotal = 0
                }
            },
            immediate: true, deep: true


        }
    },

    methods: {
		userActionSave(){
			let declareFeeNo
			if(this.declareFeeObj && this.declareFeeObj.bgFee && this.param.smClear){
				declareFeeNo = this.declareFeeObj.bgQuoteNum?this.declareFeeObj.bgQuoteNum: ''
			}else{
				declareFeeNo = ''
			}
			
			let params ={
				declareFeeNo : declareFeeNo,//报关费编号
				productionFeeNo:this.czQuoteNum ? this.czQuoteNum: '',//产装费编号
				stackingChargeNo  : this. dzQuoteNum ? this. dzQuoteNum : '',//堆装费编号
				bookingFeeNo :  this.param && this.param.item.scFreightInfoDetail.freightDetailNo,//订舱费用
				overseasBillNo : this.hwQuoteNum? this.hwQuoteNum: '',//海外费编号
				openId :this.$store.state.userInfoParams.openid
			}
			saveUserAction(params,this.header).then(res=>{
				
			})
		},
	 async	askThePrice(){
			let declareFeeNo
			if(this.declareFeeObj && this.declareFeeObj.bgFee && this.param.smClear){
				declareFeeNo = this.declareFeeObj.bgQuoteNum?this.declareFeeObj.bgQuoteNum: ''
			}else{
				declareFeeNo = ''
			}
			console.log(this.param)
			let params ={
				openId :this.$store.state.userInfoParams.openid,//用户openid
				declareFeeNo : declareFeeNo,//报关费编号
				productionFeeNo:this.czQuoteNum ? this.czQuoteNum: '',//产装费编号
				stackingChargeNo  : this. dzQuoteNum ? this. dzQuoteNum : '',//堆装费编号
				bookingFeeNo :  this.param && this.param.item.scFreightInfoDetail.freightDetailNo,//订舱费用
				overseasBillNo : this.hwQuoteNum? this.hwQuoteNum: '',//海外费编号
				twentyGP :!this.reload?(this.param.check20GP? 1 : 0): this.check20GPNum,
				fortyGP : !this.reload? (this.param.check40GP ? 1: 0):this.check40GPNum,
				fortyHC : !this.reload?(this.param.check40HC? 1: 0) :this.check40HCNum,
			
				
				goodsType : this.checkShowHidden('QU_GOODS_TYPE'),
				businessType :	this.checkShowHidden('QU_CUSTOMS_CLEARANCE'),
				descriptionNum:this.param.smClear?this.productNumNew:''
			}
			saveQuoteConsult(params,this.header).then(res=>{
				console.log(res)
				if(res.data.code == 200){
					this.toastText = '您的咨询信息已经发送给专属客服！'
						this.$refs.toast.show = true;
						let that = this
						setTimeout(function(){
							// console.log('0909')
							that.$refs.toast.show = false;
						},1000)
				}
			})
		},
		moveIng(event){
		
			this.handletouchmove(this,event)
		},
		moveStart(event){
			this.handletouchstart(this,event)
		},
		moveEnd(event){
			this.handletouchend(this,event)
		},
			goToPreIndex(){
				 uni.redirectTo({ url: `../planList/index`}) 
			},
        async showServiceItem () {

            let res = await getSheetByCode('0003')

            let sheetStatus = await getSimpleSheetStatus(this.param.serviceCode, '01', res.id);

            let sheetStatusId = sheetStatus.id;

            this.buSheetNodeBlock = await checkBlockAll(sheetStatusId);

        },
        checkShowHidden (dictValue) {
            for (let index in this.buSheetNodeBlock) {
                if (dictValue == this.buSheetNodeBlock[index].blockId) {
                    return true;
                }
            }
            return false;
        },
        getManyfeeList (reload) {
            let isSeaLand = this.param.endType.includes('城市') ? true : false
            let bbiRouteQuickOrderVO = this.param.item;
            let feeparams
            // console.log(reload)

            if (reload) {
                feeparams = {
                    bbiRouteQuickOrderVO: bbiRouteQuickOrderVO,
                    smStack: this.param.smStack,
                    smClear: this.param.smClear,
                    dmClear: this.param.dmClear,
                    serviceCode: this.param.serviceCode,
                    isSeaLand: isSeaLand,
                    check20GP: Number(this.check20GPNum),
                    check40GP: Number(this.check40GPNum),
                    check40HC: Number(this.check40HCNum)

                }
            } else {
                feeparams = {
                    bbiRouteQuickOrderVO: bbiRouteQuickOrderVO,
                    smStack: this.param.smStack,
                    smClear: this.param.smClear,
                    dmClear: this.param.dmClear,
                    serviceCode: this.param.serviceCode,
                    isSeaLand: this.param.serviceCode, isSeaLand,
                    check20GP: this.param.check20GP,
                    check40GP: this.param.check40GP,
                    check40HC: this.param.check40HC,
                }
            }
            // console.log(reload)
            // console.log(feeparams)

            getmanyFee(feeparams).then(res => {
                // console.log('manyList')
                // console.log(res)
                let data = res

                let dcFeeList = data && data.dcFeeList ? data.dcFeeList : [];//订舱海运费用
                let dcSellerTemplateFeeList = data && data.dcSellerTemplateFeeList ? data.dcSellerTemplateFeeList : [];//订舱平台模板费
                let dcChargeFeeList = data && data.dcChargeFeeList ? data.dcChargeFeeList : [];//订舱附加费

                let czLandFeeList = data && data.czLandFeeList ? data.czLandFeeList : []; //产装陆运费
                let czChargeFeeList = data && data.czChargeFeeList ? data.czChargeFeeList : [];//产装附加费

                let hwQuoteNum = data && data.hwQuoteNum; //海外费用编号
                let hwLandTransportFeeList = data && data.hwLandTransportFeeList ? data.hwLandTransportFeeList : []; //海外陆运费
                let hwDestportClearFeeList = data && data.hwDestportClearFeeList ? data.hwDestportClearFeeList : []; //目的港清关费
                let hwDestportServiceFeeList = data && data.hwDestportServiceFeeList ? data.hwDestportServiceFeeList : []; //目的港服务费


                //订舱费用集合
                this.orderShipFee = [...dcFeeList, ...dcSellerTemplateFeeList, ...dcChargeFeeList]
                //堆装费用集合和费用编码
                this.dzQuoteNum = data && data.dzQuoteNum ? data.dzQuoteNum : ''; //		堆装费用编号
                this.dzFeeList = data && data.dzFeeList ? data.dzFeeList : ''; //堆装费用
                //产装费用集合和费用编码
                this.czQuoteNum = data && data.czQuoteNum ? data.czQuoteNum : ''; //产装费用编号
                this.cZFeeList = [...czLandFeeList, ...czChargeFeeList]
                //海外运输费用集合和费用编码
                this.hwQuoteNum = data && data.hwQuoteNum ? data.hwQuoteNum : ''; //海外费用编号
                this.hwFeeList = [...hwLandTransportFeeList, ...hwDestportClearFeeList, ...hwDestportServiceFeeList]

                this.feeList = []
                // let listMap =[...this.orderShipFee,...this.dzFeeList,...this.cZFeeList,...this.hwFeeList]

                this.feeList = this.manyFeeList = [...this.orderShipFee, ...this.dzFeeList, ...this.cZFeeList, ...this.hwFeeList]


            })
        },
        sum (total, num) {
            return total + num;
        },

        closeTheshade () {
            this.ifshowShade = false
        },
        showtheShade () {
            // console.log(this.ifshowShade)
            this.ifshowShade = true
        },
        change40GP (val) {
            this.GP40Num = val
        },
        change40HC (val) {
            this.HC40Num = val
        },
        change20GP (val) {
            this.GP20NumL = val

        },
        changeProduct (val) {
            this.productNum = val


        },
        reloadFeeInfo () {
            this.showChoseBox = false
            this.firstLoadData = false
            // console.log(this.productNum)
            this.reload = true
            this.check20GPNum = this.GP20NumL;
            this.check40GPNum = this.GP40Num;
            this.check40HCNum = this.HC40Num;
            this.productNumNew = this.productNum
            this.getDeclareFee(this.param)
            this.getManyfeeList(this.reload)
        },
        //获取报关费用
        getDeclareFee (param) {
            declareFee(this.productNumNew, param.item.scFreightInfoDetail.shippmentPortId)
                .then(res => {
                    if (res.bgFee) {
                        this.declareFeeObj = res
                        let list = res.bgFee
                        this.feeList = this.manyFeeList.concat(list)
                        // this.declareFeeName = this.returnFeeName(res.bgFee.feeName);
                        // this.declareFeeUnit =this.returnUnitType(res.bgFee.measurementUnit) 
                        // this.declareFeeCurrency = this.returnCurrency(res.bgFee.currency)
                        // this.declareFeeTotal = (res.bgFee.unitPrice *res.bgFee.number).toFixed(2)
                        // console.log(this.declareFeeName)
                    }
                    // console.log(' this.feeList')
                    // console.log(this.feeList)
                })
        },

        returnFeeName (id) {
            let name
            if (this.feeNameObj) {
                this.feeNameObj.filter(item => {
                    if (item.id == id) {
                        name = item.expenseNameChn
                    }
                })
                return name
            }

        },
        //每个费用项目，单价乘以数量返回总价
        returnTotal (unit, number) {
            let total = unit * number

            return total.toFixed(2)
        },
        //根据计量单位id返回计量单位类型
        returnUnitType (id) {
            let unit
            if (this.unit) {
                this.unit.filter((item) => {
                    if (item.dictValue == id) {
                        unit = item.name
                    }

                })
                return unit
            }



        },
        //根据费用id返回费用名称
        returnFeeName (id) {
            let name
            if (this.feeNameObj) {
                this.feeNameObj.filter(item => {
                    if (item.id == id) {
                        name = item.expenseNameChn
                    }
                })
                return name
            }



        },
        //根据费用currency筛选币种字典集
        returnCurrency (currency) {
            let currencyType
            if (this.currencyObj) {
                this.currencyObj.filter(item => {
                    if (item.dictValue == currency) {
                        currencyType = item.name
                    }
                })
                return currencyType
            }
        },
        checkCancle () {
            this.showChoseBox = false
        },
        getBannnerTop (val) {
            this.bannerTop = val
        },

    }
};
</script>
<style>
</style>
<style scoped lang="less">
.page {
  background-color: #eff2fa !important;
}
.content {
  background: #eff2fa;
}
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
.chekboxChoose {
  padding-bottom: 20rpx;
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
  margin-top: 10rpx !important;
}

.content {
  // background:#0b46d8;
  // height: 100vh;
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
.comChoseBox{
	z-index: 99999;
}
.topTitle {
  position: fixed;
  background-color: #0b46d8;
  z-index: 11;
}
.priceCaleWrap {
  // height: 444rpx;
  z-index: 1;
  position: relative;
  // padding-bottom: 40px;
  background-color: #eff2fa;
  // background-color: #1444E1;
}
.priceCaleContent {
  border-top: 1px solid #2154df;
  // padding: 30rpx 0;
  background-color: #1444e1;
}

.chooseBox {
  padding: 23rpx 46rpx 30rpx 23rpx;
  height: 186rpx;
  background-color: white;
  position: relative;
  margin: 0 14rpx;
  border-radius: 12rpx;
  z-index: 1;
  top: -78rpx;

  .hasChoosed {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 21rpx;
    .choosedText {
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(19, 34, 67, 1);
    }
    .rightArrow {
      border-left: 1px solid #ccd7fb;
      border-bottom: 1px solid #ccd7fb;
      height: 18rpx;
      width: 18rpx;
      transform: translate(2px, -2px) rotate(-45deg);
      -webkit-transform: translate(2px, -2px) rotate(-45deg);
      border-right: 1px solid transparent;
      border-top: 1px solid transparent;
      display: inline-block;
      -moz-transform: translate(2px, -2px) rotate(-45deg);
      -ms-transform: translate(2px, -2px) rotate(-45deg);
      -o-transform: translate(2px, -2px) rotate(-45deg);
      transform: rotate(-135deg);
      margin-left: -3px;
      left: 50%;

      z-index: 1;
    }
  }
  .shapeWeight {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 39rpx;
    .weight {
      color: #132243;
      font-size: 32rpx;
    }
    .multiplication {
      color: #132243;
      font-size: 32rpx;
      margin: 0 12rpx;
    }
  }
  .goodstype {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .typeText {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(14, 165, 255, 1);
      background-color: #e8f5ff;
      border-radius: 21rpx;
      height: 43rpx;
      line-height: 43rpx;
    }
    .normalPro {
      padding: 2rpx 52rpx;
    }
    .kind {
      padding: 2rpx 26rpx;
    }
    .num {
      padding: 2rpx 29rpx;
    }
  }
}
.feeTitle {
  display: flex;
  align-items: center;
}
.proposal {
  // background: red;
  position: relative;
  top: -54rpx;

  background-color: white;
  .feeInfoTitle {
    margin: 0 14rpx;
    height: 191rpx;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(232, 245, 255, 1) 100%
    );
  }
  .proposalTitle {
    background-color: #eff2fa;

    .title {
      color: #132243;
      font-size: 32rpx;
      padding-top: 36rpx;
      text-align: center;
      display: block;
    }
  }
  .total {
    height: 80rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 24rpx;
    margin-top: 36rpx;
  }
  .totalText {
    color: #132243;
    font-size: 32rpx;
  }
  .usd,
  .rmb {
    font-size: 36rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(242, 61, 30, 1);
  }
}
.proposalContent {
  background-color: #eff2fa;
}
.feeContent {
  margin: 0 14rpx;
  min-height: 28vh;
}
.tipProposal {
  height: 98rpx;
  line-height: 98rpx;
  margin: 0 23rpx;
  border-top: 1px dashed #979797;
  .notCountIn {
    color: #f45c42;
    font-size: 24rpx;
    text-align: left;
  }
}
.feeInfo {
  background-color: white;
  border-bottom-left-radius: 12rpx;
  border-bottom-right-radius: 12rpx;
  overflow: hidden;
}
.fee {
  border-top: #15b6c0 1px solid;
  position: relative;

  .feeType {
    display: inline-block;

    width: 159rpx;
    height: 53rpx;
    background: #15b7b9;
    border-bottom-right-radius: 33rpx;
    text {
      color: #ffffff;
      font-size: 32rpx;
      position: relative;
      top: -4rpx;
      left: 28rpx;
      display: inline-block;
      height: 53rpx;
      line-height: 53rpx;
    }
  }
}
.orderNum {
  color: #74809c;
  font-size: 24rpx;
  margin-left: 34rpx;
}
.feeDetailItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25rpx;
  margin-left: 35rpx;
  margin-right: 35rpx;
  .feeName:last-child {
    padding-left: 3%;
    // background-color: green;
  }
}
.feeDetailItem:first-child {
  margin-top: 34rpx;
}
.feeName {
  width: 27%;
  color: #132243;
  font-size: 26rpx;
  padding: 0 1%;
}
.firstfieeName {
  width: 31% !important;
  margin-right: 4.5%;
  white-space: pre-wrap;
  word-wrap: break-word;
  // background-color: red;
}
.feeItemTotal {
  margin-bottom: 35rpx;
  justify-content: flex-end;
  margin-right: 35rpx;
  color: #132243;
  font-size: 32rpx;
  display: flex;
  flex-direction: row;
  margin-top: 51rpx;
  font-weight: 500;
}
.dollar {
  margin-right: 18rpx;
}
.freeDuty {
  padding: 31rpx 0 110rpx 0;
  text-align: center;
  background: #eff2fa;
  text {
    color: #132243;
    font-size: 24rpx;
  }
}
.freeDutyActive {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.freeDutyActive {
  text-align: center;
  background: #eff2fa;
  position: fixed;
  bottom: 34rpx;
  width: 100%;
}
.freeDutyBtn {
  color: #3754d3 !important;
}
//筛选框
.titleBtn {
  padding: 40rpx 30rpx;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
  .checkTitle {
    color: #132243;
    font-size: 32rpx;
  }
  .calcle,
  .confirm {
    color: #8e8f90;
    font-size: 28rpx;
    display: blcok;
    background: none;
  }
  .confirm {
    color: #15b7b9;
  }
}

.choseTyp {
  padding: 30rpx 0 0 30rpx;
  .choseTitle {
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(19, 34, 67, 1);
	oadding-left: 20rpx;
  }
}
.productType {
  padding: 5rpx 40rpx;
  height: 43rpx;
  line-height: 43rpx;
  background: rgba(232, 245, 255, 1);
  border-radius: 22rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(14, 165, 255, 1);
}
.normal {
  margin-left: 133rpx;
  margin-right: 25rpx;
}
.disabled {
  padding: 5rpx 40rpx;
  height: 43rpx;
  line-height: 43rpx;
  border-radius: 22rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #c2c4c8;
  background: rgba(243, 245, 248, 1);
}
.extralMargin {
  margin-top: 20rpx;
  display: flex;
  flex-direction: row;
  .productNum {
    margin-left: 132rpx;
  }
}
.nomargin {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
.nums {
  margin-bottom: 92rpx;
}
.choseTiem {
  display: flex;
  flex-direction: row;
  padding-left: 98rpx;
  margin-bottom: 40rpx;
  align-items: center;
}
.shapWeight {
  color: #132243;
  font-size: 32rpx;
  margin-right: 75rpx;
}
.numchange {
  width: 366rpx !important;
  display: flex;
  justify-content: space-between;
  background-color: rgba(249, 250, 251, 1);
}
.askWrap{
	width: 100%;
	height:130rpx;
	position: fixed;
	bottom: 0;
	left:0;
	right:0;z-index: 1;

	display: flex;
	align-items: center;
	background:rgba(255,255,255,1);
	box-shadow:0px -6px 26px 0px rgba(59,62,136,0.28);
}
.askBtn{
	width:322rpx;
	
	background:linear-gradient(280deg,rgba(255,201,145,1) 0%,rgba(255,152,88,1) 100%);
	border-radius:14rpx;
	line-height: 74rpx;
	position: relative;
	height:74rpx;

}
.askText{
margin-left: 40rpx;
font-size: 28rpx;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #ffffff;
position: relative;
top: -6rpx;

}
.askImg{
	display:inline-block;
	width: 44rpx;
	height: 40rpx;
	position: absolute;
	top: 17rpx;
	left:74rpx;
	
}
button::after{
	border: none;
}
</style>


<style>
.uni-numbox {
  background: rgba(249, 250, 251, 1);
}
.uni-numbox__minus,
.uni-numbox__plus,
.uni-numbox__value {
  border: none;
  margin-top: -1px;
}
.uni-numbox__minus,
.uni-numbox__plus {
  background: white !important;
}
.uni-numbox__value {
  background-color: red;
  border: none;
}
.uni-numtext {
  margin-top: -6px;
}
.numberCheckDisable {
  color: #c1c1c1;
}

</style>
<style>
page {
  background-color: #eff2fa;
}
</style>
