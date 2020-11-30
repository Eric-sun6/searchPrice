<template>
    <view >
		
        <view v-for="(itemD, indexD) in expectInfo" :key="indexD">
            <view v-if="endType.includes('港口')">
			<view
                class="time"
                v-if="
							(item.foreignLandId != '' && itemD.routeNodeType == '04' && itemD.isRouteNode && itemD.sort == 0 && itemD.bbiRouteNodeVO.resourceType == '01') ||
								(itemD.routeNodeType == '03' && itemD.sort == item.bbiRouteDetailVOsForSeaTrans.length - 1 && itemD.isRouteNode)
						"
            >
				<view class="dateWeek">
                <text
                    class="date"
                >{{ getSeaportArriveTime(item && item.scFreightInfoDetail).substring(5,10) }}</text>
				<text class="week">{{ getSeaportArriveTime(item && item.scFreightInfoDetail)  | returnWeek}}</text>
               </view>
				<text class="textTitle">预计到港日</text>
            </view>
			</view>
			<view  v-if="endType.includes('城市')">
				
            <view
                class="time"
                v-if="itemD.routeNodeType == '04' && itemD.sort != 0 && indexD != 0 && itemD.isRouteNode"
            >
				<view class="dateWeek">
                <text
                    class="date"
                >{{ getForeignLandEndTime(item &&item.scFreightInfoDetail, item.foreignLandDays).substring(5,10) }}</text>
				<text
				    class="week"
				>{{ getForeignLandEndTime(item && item.scFreightInfoDetail, item.foreignLandDays) | returnWeek}}</text>
				</view>
                <text class="textTitle">预计到达日</text>
            </view>
			</view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        expectInfo: {
            default: [],
            type: Array
        },
        item: {
            default: {},
            type: Object
        },
		endType:{
			default:'',
			type: String
		}
		
    },
	filters:{
		returnWeek(val){
			return  '周'+"日一二三四五六".charAt(new Date(val).getDay())
		}
	},
	
	computed:{
		// endType() {
		//     return this.$store.state.end.endPort.seaportType
		// }
		
			
	},
	
    methods: {
        getSeaportArriveTime (scfreight) {
		 var time = new Date(new Date(scfreight.etdTime.replace(/\-/g, '/')).getTime() + scfreight.voyageTime * 24 * 3600 * 1000)
		
		            return time.getFullYear() + '-' + (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1) + '-' + (time.getDate() <= 9 ? '0' : '') + time.getDate()
		        },

         getForeignLandEndTime (scfreight, foreignLandDays) {
            var time = new Date(new Date(scfreight.etdTime.replace(/\-/g, '/')).getTime() + (scfreight.voyageTime + foreignLandDays) * 24 * 3600 * 1000)
            return time.getFullYear() + '-' + (time.getMonth() <9 ? '0' : '') + (time.getMonth() + 1) + '-' + (time.getDate() <= 9 ? '0' : '') + time.getDate()
        },
    }
};
</script>

<style lang="less">
.textTitle {
  color: #74809c;
  font-size: 22rpx;
  margin-top: 20rpx;
  display: block;
}

.date {
  color: #132243;
  font-size: 32rpx;
  display: block;
  font-weight: bold;
}

.time {
  display: flex;
  flex-direction: column;
}

.dateWeek{
	display: flex;
	flex-direction: row;
	color: #132243;
	font-size: 32rpx;
	font-weight: bold;
}

.priceCaleWrap {
	.time{
		display: flex;
		flex-direction: row;
		margin-top:9rpx;
	}
	.textTitle{
		order: 0;
		color: #CCD7FB;
		font-size: 22rpx;
		margin-top: 0;
		margin-right: 15rpx;
	}
	.dateWeek{
		order: 1;
		
	}
	.date,.week{
		color: #CCD7FB;
		font-size: 22rpx;
	}
	.week{
		padding-left:10rpx;
	}
}
</style>
