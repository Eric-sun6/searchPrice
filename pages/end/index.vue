<template>
    <view>
        <view class="searchWrap">
            <input class="searchValue" v-model="portName" placeholder="收货地" @input="search">
            <!-- <button @click="search">搜索</button> -->
        </view>
        <!-- 港口列表 -->
		<view class="portData">
			<text v-show="!ifNoPortData && seaportListEnd && seaportListEnd.length"  class="cityTitle">港口/到港</text>
			<uni-list v-if="!ifNoPortData" class="portList">
			    <uni-list-item
			        v-for="(item, index) in seaportListEnd"
			        :class="index==choosedPortIndex ?'choosed': ''"
			        :key="index"
			        :label="`${item.seaPortName}`"
			        :value="item.value"
			        :show-arrow="false"
			        @click="choose(index,item)"
			    >
			        <text class="seaPortName">{{ item.seaPortName }}</text>
			    </uni-list-item>
			</uni-list>
		</view>
		
        <!-- 城市列表 -->
		<view class="portData">
			<text v-show="!ifNoPortData"  class="cityTitle">城市/到门</text>
			<uni-list v-if="!ifNoPortData" class="portList">
			    <uni-list-item
			        v-for="(item, index) in countryListEnd"
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
import { quicklyEndInit, quickOrderEndSite } from '../../api/interface.js';
import noDataTip from '../../components/com-noDataTip.vue';
export default {
    components: {
        uniList,
        uniListItem,
        noDataTip
    },
    data () {
        return {
            title: '出发地搜索',
            destinationList: null,
            initDestinationList: null,
            choosedPortIndex: '',
            portName: '',
            ifNoPortData: false,
            ifShowLoad: false,
			seaportListEnd: null,
			countryListEnd: null
        };
    },
    onLoad () {

    },
    mounted () {
        // console.log(quicklyBeginInit)

        //终点
        // let seaportListEnd, countryListEnd;
        quicklyEndInit().then(res => {
            this.seaportListEnd = res.bbiSeaportList.map(item => {
                return {
                    seaportType: '港口',
                    seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                    value: item.id,
					endAddress: item.seaportEng,
                    type: Number(item.seaportType),
                    alias: item.seaportAlias,
                    label: `${item.seaportEng}(${item.seaportChn})`,
                };
            });
            this.countryListEnd = res.bbiForeignDivisionList.map(item => {
                return {
                    seaportType: '城市',
                    seaPortName: item.foreignDivisionName,
                    country: '',
					endAddress: item.foreignDivisionName,
                    value: item.id,
                    type: 3,
                    alias: '',
                    label: `${item.foreignDivisionName}`
                };
            });
            this.initDestinationList = this.destinationList = this.seaportListEnd.concat(this.countryListEnd);
        }).catch(err => {
            console.log(err);
            //弹出错误提示消息
        });
    },
    methods: {
        choose (index, item) {
            // console.log(index,item);
            this.choosedPortIndex = index;
            this.$store.commit('saveEndInfo', { 'endPort': item, 'destinationList': this.destinationList })
            uni.$emit('saveEndInfo', { 'endPort': item, 'destinationList': this.destinationList })
            // uni.navigateTo({
            //     url: '/pages/index/index'
            // });

            uni.navigateBack()
        },
        search () {
            if (!this.portName) {
                this.destinationList = this.initDestinationList;
                return;
            }
            this.ifShowLoad = true;
            quickOrderEndSite(this.portName).then(res => {
                this.ifShowLoad = false;
                if (JSON.stringify(res.bbiForeignDivisionList) == '[]' && JSON.stringify(res.bbiSeaportList) == '[]') {
                    this.ifNoPortData = true;
                    return;
                }
                this.ifNoPortData = false;
                this.seaportListEnd = res.bbiSeaportList.map(item => {
                    return {
                        seaportType: '港口',
                        seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                        value: item.id,
					endAddress: item.seaportEng,
                        country: '',
                        type: Number(item.seaportType),
                        alias: item.seaportAlias,
                        label: `${item.seaportEng}(${item.seaportChn})`,
                    };
                });
                this.countryListEnd = res.bbiForeignDivisionList.map(item => {
                    return {
                        seaportType: '城市',
                        seaPortName: item.foreignDivisionName,
                        country: '',
						endAddress: item.foreignDivisionName,
                        value: item.id,
                        type: 3,
                        alias: '',
                        label: `${item.foreignDivisionName}`
                    };
                });
                this.destinationList = this.seaportListEnd.concat(this.countryListEnd);
            });


        }

    }
};
</script>

<style scoped>
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



