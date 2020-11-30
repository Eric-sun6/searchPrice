<template id="priceCale">
	<view class="priceCale">
		<view class="priceCaleWrap">
				<view class="portInfo">
					<view class="startInfo">
						<text class="startAdress">{{startName}}</text>
							<comExpectStart v-if="planListSelectData && planListSelectData.item" class="pageContent" :startType="planListSelectData.startType" :expectInfo="planListSelectData.expectInfo" :item="planListSelectData && planListSelectData.item"></comExpectStart>
					</view>
					
					<view class="days">
					    <view class="trailType">
					        <text>{{ routeType(planListSelectData && planListSelectData.item && planListSelectData.item.scFreightInfoDetail.routeType) }}</text>
					        <text>{{planListSelectData && planListSelectData.item &&  planListSelectData.item.scFreightInfoDetail.voyageTime }}天</text>
					    </view>
						<view class="hrWrap">
							
								<text class="hrBefore"></text>
								
								<text class="hr"></text>
								<text class="hrAfter"></text>
						</view>
						
					</view>
					<view class="endInfo">
						<text class="endAdress">
							{{endName}}
						</text>
						<comExpectEnd  v-if="planListSelectData && planListSelectData.item"  class="pageContent" :endType="planListSelectData.endType" :expectInfo="planListSelectData.expectInfo" :item="planListSelectData.item"></comExpectEnd>
								
					</view>
					
				</view>
				
				
				<view class="caleDetail">
					
					<view class="cale skeleton-rect-radius" @click="showDetail = !showDetail">
					    
					    <view>
					        <text class="band">{{planListSelectData.item.scFreightInfoDetail.shipCompanyName}}</text>
					        <text
					           v-if="planListSelectData.item.scFreightInfoDetail.isDirectSale == 1"
					            class="direct"
					        >船东直供</text>
					    </view>
					  <text class="transformContent" v-if="planListSelectData.item.scFreightInfoDetail.transportName">
					      <!-- <text class="trans"> -->
					      转：{{planListSelectData.item.scFreightInfoDetail.transportName}}
					  </text>
					  <text v-if="!showDetail" class="arrow"></text>
					</view>
					<comDetail @click="showDetail = !showDetail" v-if="showDetail" :showSeePrice="false"  :expectInfo="planListSelectData.item.bbiRouteDetailVOs" :item="planListSelectData.item">
					</comDetail>
					
					<view class="arrowWrap" @click="showDetail = !showDetail">
						<text  v-if="showDetail" class="arrow arrowTop"></text>
					</view>
					
				</view>
			
			</view>
			<view class="priceBg">
			<image class="priceBgImg" src="../static/priceBg.png"></image>
				
			</view>
				</view>
	</template>

<script>
import comExpectStart from './com-expectStart.vue';
import comExpectEnd from './com-expectEnd.vue';
import comDetail from './com-planDetail.vue';
export default {
	 // inject: ['planListSelectData'],
	components: {
		comExpectStart,
		comExpectEnd,
		comDetail
	},
	data(){
		let planListSelectData={
			expectInfo: JSON.parse(this.$store.state.param.planListSelectData.expectInfo),
			item: JSON.parse(this.$store.state.param.planListSelectData.item),
			'endType':this.$store.state.param.endType,
			'startType':this.$store.state.param.startType
		}
		return{
			caleData: null,
			showDetail: false,
			planListSelectData: planListSelectData,
		}
	},
	
	created() {
	// this.planListSelectData={
	// 	expectInfo: JSON.parse(this.$store.state.param.planListSelectData.expectInfo),
	// 	item: JSON.parse(this.$store.state.param.planListSelectData.item),
	// 	'endType': this.$store.state.param.endType,
	// 	'startType':this.$store.state.param.startType,
	// }
	console.log('priceCale planListSelectData')
	console.log(this.planListSelectData)
	},
	
	mounted() {
		
	},
 computed:{
	  startName () {
	  	
	  			return this.$store.state.param.startName
	  			
	  		
	      },
	      endName () {
	  	
	  			return this.$store.state.param.endName
	  			
	      }
	 
  },
	methods:{
		//全程还是转航
		routeType (val) {
		    if (val == '01') {
		        return '全程';
		    } else if (val == '02') {
		        return '转航';
		    }
		},
	}
};
</script>
<style lang="less" scoped>
.priceCaleWrap{
	display: flex;
	flex-direction: column;

	padding-top:30rpx;
}
.portInfo{
	display: flex;
	flex-direction: row;
	margin: 0 32rpx;
	
}
.band{
	color: white;
	font-size: 24rpx;
}
.trailType{
	color: #CCD7FB;
	font-size: 24rpx;
	text-align: center;
}

.hrWrap{
	
	    display: flex;
	    justify-content: space-between;
	    width:  130rpx;
		align-items: center;
}

.hr {
  width: 120rpx;
  border-top: 1px solid #CCD7FB;


}
.hrBefore {
  content: '';
  display: block;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background-color: #1444E1;
  
  border: 1rpx solid #CCD7FB;
}
.hrAfter {
  content: '';
  display: block;
  width: 9rpx;
  height: 9rpx;
  border-radius: 50%;
  background-color: #1444E1;
  
  border: 1rpx solid #CCD7FB;
}
.startAdress,.endAdress{
	color: #FFFFFF;
	font-size: 36rpx;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;


}
.endInfo{
	width:36%;
}
.startInfo{
	width: 40%
}
.days{
	width: 24%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

.endInfo{
	text-align: right;
}
.portInfo{
	display: flex;
	justify-content: space-between;
}
.cale{
	// margin-top: ;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 29rpx;
	position: relative;
	
	margin:34rpx 32rpx 0 32rpx;
}
.caleDetail{
	position: relative;
}
.direct{
	padding: 1rpx 20rpx;
	background:rgba(209,62,6,1);
	border-radius:4rpx;
	color: #fff;
	font-size: 24rpx;
	margin-left: 20rpx
}
.transformContent{
	color: #fff;
	font-size: 22rpx;
}
.arrow{position: absolute;
  border-left: 1px solid #CCD7FB;
  border-bottom: 1px solid #CCD7FB;
  height:9px;
  width: 9px;
  transform: translate(2px, -2px) rotate(-45deg);
  -webkit-transform: translate(2px, -2px) rotate(-45deg);
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  display: inline-block;
  -moz-transform: translate(2px, -2px) rotate(-45deg);
  -ms-transform: translate(2px, -2px) rotate(-45deg);
  -o-transform: translate(2px, -2px) rotate(-45deg);
 
     margin-left: -3px;
     left: 50%;
    margin-top: 14px;

     z-index: 1;
}
.priceCale{
	position: relative;
}
.priceBg{
	
	position: relative;
	
	margin-top: -1px;
	background-color: red;
	padding-bottom: 90rpx;
	background-color: #1444E1;
}
.priceBgImg{
	display: inline-block;
	width: 100%;
	height:139rpx;
	position: absolute;
	top: 90rpx
}
.arrowTop{
	position: absolute;
	transform: rotate(135deg);
	    margin-top: 18px;
}
.arrowWrap{
	    display: block;
	    width: 100%;
	    height: 31px;
	    position: absolute;
	    z-index: 1;
	    bottom: 3px;
}
</style>