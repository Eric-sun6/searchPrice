
<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="bgWrap" v-show="showPopup">
			<view class="shade"></view>
			<view class="pleaseLogin" type="bottom">
			    <text class="plaeseText">请授权登录</text>
			    <text class="tipLogin">为了更好的为你提供服务，请允许微信授权</text>
			    <button class="agree" open-type="getUserInfo" @getuserinfo="getWxUserInfo">
				<image class="wxicon" src="../static/wxicon.png"></image>
				<text class="agreeText">同意授权信息</text>
				</button>
			</view>
		</view>
		<errorTip :showErrorTip="ifshowErrorTip"></errorTip>
		<!-- #endif -->
	</view>
	
</template>
<script>
	import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@dcloudio/uni-ui/lib/uni-popup/uni-popup-message.vue'
	// import errorTip from './com-errorTip.vue'
import { saveCode, saveUserInfo } from '../api/wechart.js';
export default {
	data(){
		return{
			showPopup: false,
			userInfoParams: null,
			getUserinfoFlag: false,
			ifshowErrorTip: false,
			
		}
	},
	props:{
		isHomePage: {
			default: false,
			type: Boolean
		}
	},
	components:{
		uniPopup,
		uniPopupMessage,
		// errorTip
	},
    created  () {
		//#ifdef MP-WEIXIN
		if(this.$store.state.userInfoFlag) return
		this.loginWX()
		//#endif
    },
mounted() {
	// this.$refs.popup.open()
},

    onShow: function () {
		
        // console.log('App Show')
    },
    onHide: function () {
        // console.log('App Hide')
    },
	methods:{
		//#ifdef MP-WEIXIN
		//授权登录微信
		loginPremission () {
		    let that = this
		    wx.checkSession({
		        success () {
		            //登录过就把港口信息状态存储，并跳转
		          // console.log('session_key 未过期，并且在本生命周期一直有效')
				  that.userInfoParams  = that.$store.state.userInfoParams
				 
				 
		            //session_key 未过期，并且在本生命周期一直有效
		        },
		        fail () {
		            // session_key 已经失效，需要重新执行登录流程
		            that.loginWX() //重新登录
		        }
		    })
		},
		
		
		loginWX () {
			if(this.$store.state.userInfoFlag)return 
		    wx.login({
		        success: (res) => {
		            let that = this
					console.log(res)
					console.log('得到code微信')
		            //调用得到code的接口
					// this.$store.commit('saveWechartCode',res.code)
		            saveCode(res.code).then(res => {
		                that.userInfoParams = res.data.data
						// console.log('获取用户信息')
						// console.log( that.userInfoParams )
						this.$store.commit('saveUserInfoParams',res.data.data)
						
						//如果授权过一次
						if(res.user){
							this.$emit('changeUserInfoGotFlag',true)
							this.$store.commit('saveUserInfoFlag',true)
						}else{
							if(this.isHomePage){
								that.showPopup= false
							}else{
								that.showPopup= true
							}
						}
						
		            }).catch(err=>{
						console.log(err)
						// this.ifshowErrorTip = true
					})
		        },
		        fail: (err) => {
					this.ifshowErrorTip = true
		            console.log('失败')
		        }
		    })
		},
		//微信获取用户信息
		getWxUserInfo:function (event) {
			this.$emit('changeSaveTipFlag',false)
			this.$emit('changeUserInfoGotFlag',true)
			// console.log(event)
		    let userInfo = event.detail.userInfo;
		    this.showPopup = false
		    let info = { "openId": this.userInfoParams && this.userInfoParams.openid, "unionId": this.userInfoParams && this.userInfoParams.unionid }
			// console.log(info)
			this.$store.commit('saveOpenidSessionKey',{'sessionKey':this.userInfoParams && this.userInfoParams.session_key,'openid':this.userInfoParams && this.userInfoParams.openid})
			if(!userInfo){
				 this.$store.commit('changeErrorTipFlag',true)
				// this.showPopup= true
				return 
			}
		    let params = Object.assign(userInfo, info)
		    // console.log(params)
		
		    saveUserInfo(params).then(res => {
				console.log('已经得到用户信息')
				// this·.loadSearchInfo()
				// console.log('saveuserinfo')
		  //       console.log(res)
				this.$store.commit('saveUserInfoFlag',res)
				// this.authorizeFlag = true
				// this.$emit('authorize',true)
								
		    }).catch(err=>{
				console.log(err)
			})
		},
		
		//#endif
	}
}
</script>

<style scoped>
	.tipLogin{
		color: #253342;
		font-size: 28rpx;
		padding: 10rpx
	}
	.agree{
		width:70%;
		height:80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		text-align: center;
		background:rgba(0,194,95,1);
		border-radius:4px;
		
		display: flex;
		align-items: center;
		justify-content: center;

	}
	.agreeText{
		color: #FFFFFF;
		font-size: 28rpx;
	}
	
button::after {
  border: none;
}
	.pleaseLogin{
		height: 300rpx;
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;
		padding-bottom: 60rpx;
		position: fixed;
		left: 0;
		right: 0;
		background-color: white;
		bottom: 0;
		z-index: 10;
	}
	.plaeseText{
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		padding: 40rpx 36rpx 0 36rpx;
		display: block;
	}
	.tipLogin{
		display: block;
		font-size:28rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		padding: 26rpx 36rpx 60rpx 36rpx;
	}
	.shade{
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.5;
	}
	.bgWrap{    
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.wxicon{
		width: 40rpx;
		height: 30rpx;
margin-right: 5px;
	}
/*每个页面公共css */
</style>
