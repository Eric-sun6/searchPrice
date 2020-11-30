<template>
    <view>
        <view class="searchWrap">
            <input class="searchValue" v-model="portName" placeholder="发货地" @input="search">
            <!-- <button @click="search">搜索</button> -->
        </view>
        <!-- 港口列表 -->
		<view class="portData">
			<text v-show="!ifNoPortData"  class="cityTitle">港口</text>
			<uni-list v-if="!ifNoPortData" class="portList">
			    <uni-list-item
			        v-for="(item, index) in seaportList"
			        :class="index==choosedPortIndex ?'choosed': ''"
			        :key="index"
			        :label="`${item.seaPortName}`"
			        :value="item.value"
			        :show-arrow="false"
			        @click="choose(index,item)"
			    >
			        <text class="seaPortName">{{ item.seaPortName }}</text>
			    </uni-list-item>
			    <!-- <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12" :show-arrow="false"></uni-list-item> -->
			</uni-list>
		</view>
		
        <!-- 城市列表 -->
		<view class="portData">
			<text v-show="!ifNoPortData"  class="cityTitle">城市</text>
			<uni-list v-if="!ifNoPortData" class="portList">
			    <uni-list-item
			        v-for="(item, index) in countryList"
			        :class="index==choosedPortIndex ?'choosed': ''"
			        :key="index"
			        :label="`${item.seaPortName}`"
			        :value="item.value"
			        :show-arrow="false"
			        @click="choose(index,item)"
			    >
			        <text class="seaPortName">{{ item.seaPortName }}</text>
			    </uni-list-item>
			    <!-- <uni-list-item title="标题文字" note="描述信息" :show-badge="true" badge-text="12" :show-arrow="false"></uni-list-item> -->
			</uni-list>
		</view>
        
        <noDataTip :if-no-port-data="ifNoPortData"/>
        <loading :if-show-load="ifShowLoad"/>
    </view>
</template>


<script>
import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
import { quicklyBeginInit, quickOrderBeginSite } from '../../api/interface.js';
import noDataTip from '../../components/com-noDataTip.vue';
export default {
    components: {
        uniList,
        uniListItem,
        noDataTip,
    },
    data () {
        return {
            title: '出发地搜索',
            departureList: null,
            initDepartureList: null,
            choosedPortIndex: '',
            portName: '',
            ifNoPortData: false,
            ifShowLoad: false,
			seaportList: null,
			countryList: null,
        };
    },
    onLoad () {

    },
    mounted () {
        // console.log(quicklyBeginInit)
        //起点
        // let seaportList, countryList;
        quicklyBeginInit().then(res => {
            this.seaportList = res.bbiSeaportList.map(item => {
                return {
                    seaportType: '港口',
                    seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                    value: item.id,
                    country: '',
					startAdress: `${item.seaportEng}`,
                    type: Number(item.seaportType),
                    alias: item.seaportAlias,
                    label: `${item.seaportEng}(${item.seaportChn})`,
                };
            });
            this.countryList = res.bbiChinaDivisionList.map(item => {
                return {
                    seaportType: '城市',
                    seaPortName: `${item.fullName}`,
                    country: '中国',
					startAdress:`${item.divisionName}`,
                    value: item.id,
                    type: 0,
                    alias: '',
                    label: item.fullName
                };
            });
            this.initDepartureList = this.departureList = [...this.seaportList, ...this.countryList];
        }).catch(err => {
            console.log(err);
            //弹出错误提示消息
        });

    },
    methods: {
        choose (index, item) {
            // console.log(item);
            this.portName = item.seaPortName
            this.choosedPortIndex = index;
            this.$store.commit('saveStartInfo', { 'startPort': item, 'departureList': this.departureList })
            // console.log(this.$store.state)
            uni.$emit('saveStartInfo', { 'startPort': item, 'departureList': this.departureList })
            // uni.navigateTo({
            //     url: '/pages/index/index'
            // });
            uni.navigateBack()
        },
        search () {
            if (!this.portName) {
                this.departureList = this.initDepartureList;
                return;
            }
            this.ifShowLoad = true;
            quickOrderBeginSite(this.portName).then(res => {

                this.ifShowLoad = false;
                if (JSON.stringify(res.bbiSeaportList) == '[]' && JSON.stringify(res.bbiChinaDivisionList) == '[]') {
                    this.ifNoPortData = true;
                    return;
                }
                this.ifNoPortData = false;
                this.seaportList = res.bbiSeaportList.map(item => {
                    // console.log(item)
                    return {
                        seaportType: '港口',
                        seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                        country: '',
						startAdress: `${item.seaportEng}`,
                        value: item.id,
                        type: Number(item.seaportType),
                        alias: item.seaportAlias,
                        label: `${item.seaportEng}(${item.seaportChn})`,
                    };
                });

                this.countryList = res.bbiChinaDivisionList.map(item => {
                    return {
                        seaportType: '城市',
                        seaPortName: `${item.fullName}`,
                        country: '中国',
                        value: item.id,
						startAdress:`${item.divisionName}`,
                        type: 0,
                        alias: '',
                        label: item.fullName
                    };
                });
                this.departureList = [...this.seaportList, ...this.countryList];
				console.log( this.departureList)
            });
        }
    }
};
</script>

<style  scoped>
.choosed {
  border: 1px #007aff solid;
}
.searchWrap{
	padding-top:16rpx;
	padding-bottom: 40rpx;
}
.searchValue{
	margin: 4rpx 30rpx 0 30rpx;
	background-color: #F1F2F3;
	color: #253342;
	font-size: 32rpx;
	height: 82rpx;
	border-radius:38rpx;
	padding-left: 80rpx;
	
}
.cityTitle, .portTitle{
	background-color: #F0F1F6;
	display: block;
	font-size: 24rpx;
	height: 40rpx;
	line-height: 40rpx;
	padding-left: 40rpx;
	color: #253342;
}
.seaPortName{
	padding:32rpx 0 32rpx 30rpx;
	color: #253342;
	font-size: 28rpx;
}
.uni-list-item{
	padding: 0 40rpx
}
.choosed{
	border: none !important;
}
</style>
