<template>
    <view>
		
        <view v-for="(itemD,indexD) in expectInfo" :key="indexD">
           <view v-if="startType.includes('城市')">
			<view
                class="time"
               v-if="itemD.routeNodeType == '04' && itemD.sort == 0 && indexD == 0 && itemD.isRouteNode"
            >
			
				<view class="dateWeek">
                <text
                    class="date"
                >{{ getChinaLandStartTime(item && item.scFreightInfoDetail.etdTime,item.chinaLandDays).substring(5,10) }}</text>
				<text class="week">{{
					 getChinaLandStartTime(item && item.scFreightInfoDetail.etdTime,item.chinaLandDays) | returnWeek
				}}</text>
				</view>
                <text class="textTitle">预计提货日：</text>
            </view>
            </view>
			<view  v-if="startType.includes('港口')">
			<view
                class="time"
                  v-if="itemD.routeNodeType == '03' && itemD.sort == 0 && itemD.isRouteNode"  >
			
				<view class="dateWeek">
                <text
                    class="date"
                >{{ showDateExchange(item && item.scFreightInfoDetail.etdTime.replace(/\-/g, '/')) ? item.scFreightInfoDetail.etdTime.substring(5,10) : '&#45;&#45;' }}
				</text>
				<text  class="week">
				{{showDateExchange(item.scFreightInfoDetail.etdTime.replace(/\-/g, '/')) ? item.scFreightInfoDetail.etdTime.replace(/\-/g, '/'): '&#45;&#45;'| returnWeek}}
				</text>
				</view>
                <text class="textTitle">预计开船日</text>
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
		startType:{
			default:'',
			type: String
		}
    },
	watch:{
		startType(val){
			this.$props.startType = val
		}
	},
	computed:{
		
	
	},
	
	filters:{
		returnWeek(val){
			return '周'+"日一二三四五六".charAt(new Date(val).getDay())
		}
	},
    methods: {
        
         showDateExchange (value) {
                    if (value == null || value == '' || value == undefined) {
                        return false
                    } else {
                        if (parseInt(value.substring(0, 4)) < 2000) {
                            return false;
                        } else {
                            return true
                        }
                    }
                },  
				 getChinaLandStartTime (etdTime, chinaLandDays) {
					var time = new Date(new Date(etdTime.replace(/\-/g, '/')).getTime() - (chinaLandDays + 4) * 24 * 3600 * 1000)

				return time.getFullYear() + '-' + (time.getMonth() < 9 ? '0' : '') + (time.getMonth() + 1) + '-' + (time.getDate() <= 9 ? '0' : '') + time.getDate()
        },
    }
}
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
