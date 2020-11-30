<template>
	<view id="logisticsWrap">
		<headBar  :headBarBg="false" :showArrow="false" :showSaveTip="false" title="物流追踪"></headBar>
		<image class="wjbg" src="../../static/wjbg.png" mode=""></image>
		<view class="topImg">
			<image src="../../static/logisticstTop.png"></image>
		</view>

		<view class="serch">
			<view class="searchWrap">
				<view class="searchIconWrap">
					<image class="searchIcon" src="../../static/orderSearchIcon.png"></image>
				</view>
				<!-- <text>{{ifUserHasGiveThePhoneNum}}</text>
				<text>{{ifGotTelNum}}</text> -->
				<input type="text" @input="typeIn" @focus="showTheHistory" :value="theValue" placeholder="请输入提单号" />
				<button class="serchButton"  v-if="!ifUserHasGiveThePhoneNum && !ifGotTelNum"  open-type="getPhoneNumber" @getphonenumber="getTelNumber">查询</button>
				<button class="serchButton"  v-else   @click="gotoLogisticsDetail">查询</button>
				
			</view>
		</view>

		<view class="history" v-if="historyOrders.length!=0">
			<view class="historyTitle">
				历史查询
			</view>
			<view class="historyText">
				<view v-for="(item,index) in historyOrders" :key="index" @tap="choseHistory" :data-text="item">{{item}}</view>
				<!-- <view @tap="choseHistory" data-text="2">ONEYTS9QC1422400</view>
				<view @tap="choseHistory" data-text="3">ONEYTS9QC1422400</view> -->
			</view>
		</view>
		<!-- 页面中加入获取用户信息校验 -->
		<comWXLogin ref="login" @changeUserInfoGotFlag="changeUserFlag" v-if="!this.$store.state.userInfoFlag"></comWXLogin>
           
		<tabBar :tabName="`logistics`"></tabBar>
		<toast ref="toast" :toastText="toastText"></toast>
	</view>
</template>


<script>
	import {checkWechart} from '../../api/wechartCheck.js'
	import headBar from '../../components/com-headBar.vue';
	import {getLogistics,getHistoryQueryBlNum} from '../../api/logistics.js'
	import{getTel} from "../../api/wechart.js"
	export default {
		components: {
			headBar,
		},
		data() {
			return {
ifUserHasGiveThePhoneNum: false,
				// 是否显示历史记录的标志
				showHistory: true,

				// 是否正在查询
				isSerching: false,
				toastText: '',
				changedOrderNum: '',
				theValue: '',
				historyOrders:[],
				userFlag: null
			}
		},
		computed:{
			ifGotTelNum(){
				console.log('ifGotTelNum')
				console.log(this.$store.state.ifGotTelNum)
				return this.$store.state.ifGotTelNum
			}
		},
		created() {

		},
		mounted() {
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
						this.userFlag = res.user
						// console.log('是否获取了手机号码')
						// console.log(res)
						if(res.user){
							this.userFlag = true
						}
						if(phone) {
							let openid = res.data.data.openid
							this.getHistoryOrder(openid)
							that.ifUserHasGiveThePhoneNum = true
						}
					})
				}
			},
		})
        // console.log(this.expectInfo)
    
		},
		methods: {
			changeUserFlag(){
				this.userFlag= true
			},
			getHistoryOrder(val){
				getHistoryQueryBlNum(val).then(res=>{
					// console.log('历史单号')
					// console.log(res)
					this.historyOrders = res.data
				})
			},
			choseHistory(e) {
				this.theValue = this.changedOrderNum =e.currentTarget.dataset.text
				// console.log(e.currentTarget.dataset.text)
			},
			typeIn(e) {
				this.changedOrderNum = e.target.value
			},
			showTheHistory() {
				this.showHistory = true;
			},
			gotoLogisticsDetail() {
				if (!this.changedOrderNum) {
					this.toastText = '提单号不可为空'
					this.$refs.toast.show = true;
					let that = this
					setTimeout(function() {
						that.$refs.toast.show = false;
					}, 1000)
					return
				}
				if(!this.userFlag){
					this.toastText = '请您授权用户信息'
					this.$refs.toast.show = true;
					let that = this
					setTimeout(function() {
						that.$refs.toast.show = false;
						that.$refs.login.showPopup = true;
					}, 1000)
					return
				}else{
					uni.redirectTo({
						url: `../logisticsDetail/index?order=`+this.changedOrderNum
					})
				}
				
			},
			getTelNumber(e){
				
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
					// console.log(res)
					// that.redictToPriceDetail()
					if(res.code==200){
						that.$store.commit('saveIfGotTelNum',res)
						
					}else{
						that.$store.commit('saveIfGotTelNum',false)
					}
					
				})
				
				
				
				} else {
				return
				
				
				}
				
			}
		}
	};
</script>

<style lang="less" scoped>
	#logisticsWrap {
		width: 100%;
		height: 100vh;
		// background-image: url('../../static/searchBg.png');
		// background-size: 100%;
		// background-repeat: no-repeat;
		#headBar .headBar{
			background-color: none !important;
		}
		.wjbg{
			width: 100%;
			position: absolute;
			top: 0;
			z-index: -1;
			height: 36%;
		}
		.topImg {
			margin: 44rpx 0 0 168rpx;
			width: 425rpx;
			height: 159rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
		.serch {
			overflow: hidden;
			width: 690rpx;
			height: 190rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 37rpx 0rpx rgba(159, 158, 221, 0.5);
			border-radius: 20rpx;
			margin: 0 auto;
			margin-top: 40rpx;

			.searchWrap {
				margin: 50rpx 0 0 18rpx;
				width: 660rpx;
				height: 95rpx;
				border-radius: 14rpx;
				border: 1rpx solid #b5b9bb;
				display: flex;
				align-items: center;
				position: relative;
				.searchIcon {
					display: inline-block;
				    margin-right: 16rpx;
					margin-top: 10rpx;
					width: 40rpx;
					height: 41rpx;
					margin-left: 30rpx;
					
				}

				input {
					display: inline-block;
					
					font-size: 34rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #b9bcbe;
					
				}

				.serchButton {
					outline: none;
					border: none;
					:after{
						outline: none;
						border: none;
					}
					position: absolute;
					right: 0;
					top: 0;
					display: inline-block;
					float: right;
					width: 134rpx;
					height: 95rpx;
					background: #15B7B9;
					border-radius: 0rpx 14rpx 14rpx 0rpx;
					color: white;
					text-align: center;
					line-height: 95rpx;
					font-size: 34rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
				}
				.serchButton::after{ border: none; }
			}
		}

		.history {
			margin: 58rpx 0 0 40rpx;

			.historyTitle {
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #132243;
				line-height: 40rpx;
			}

			.historyText {
				padding: 11rpx 0 0 17rpx;

				view {
					margin-top: 25rpx;
					display: inline-block;
					white-space: nowrap;
					width: 275rpx;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #253342;
					line-height: 40rpx;

					&:nth-of-type(even) {
						margin-left: 90rpx;
					}
				}
			}
		}
	}
</style>
