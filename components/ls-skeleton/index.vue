<template>
	<view v-if="isShow" catchtouchmove=true class="container" :style="{backgroundColor:bgcolor, width:screenInfo.width+'px', height:screenInfo.height+'px'}">
		<!-- 阴影块 -->
		<view class="shadow" v-for="(s,sIndex) in shadowList" :key='sIndex+1' :style="{top:s.top+'px', left:s.left+'px', width:s.width+'px', height:s.height+'px'}"></view>
		<!-- 矩形 -->
		<view class="rect" v-for="(r,rIndex) in rectList" :key='rIndex+10' :style="{top:r.top+'px', left:r.left+'px', width:r.width+'px', height:r.height+'px'}">
			
		</view>
		<!-- 圆角矩形 -->
		<view class="rect radius"  v-for="(rr,rrIndex) in rectRadiusList" :key='rrIndex+100' :style="{top:rr.top+'px', left:rr.left+'px', width:rr.width+'px', height:rr.height+'px'}"></view>
		<!-- 圆形 -->
		<view class="round" v-for="(rd,rdIndex) in roundList" :key='rdIndex' :style="{top:rd.top+'px', left:rd.left+'px', width:rd.width+'px', height:rd.height+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			bgcolor: {
				type: String,
				default: '#fff'
			},
		},
		data() {
			return {
				isShow: false,
				screenInfo: {},
				shadowList: [],
				rectList: [],
				rectRadiusList: [],
				roundList: []
			}
		},
		watch: {
			show: {
				handler(flag) {
					this.isShow = flag
					if (flag) {
						this.getScreenInfo()
						this.draws()
					}
				},
				immediate: true,
			},
		},
		methods: {
			getScreenInfo() {
				const info = uni.getSystemInfoSync()
				this.screenInfo = {
					width: info.windowWidth,
					height: info.windowHeight
				}
			},
			draws() {
				let _this = this
				this.$nextTick(function() {
					_this.drawShadow()
					_this.drawRect()
					_this.drawRectRadius()
					_this.drawRound()

				})
			},
			// 绘制矩形
			drawRect() {
				uni.createSelectorQuery().selectAll('.skeleton-rect').boundingClientRect().exec(rects => {
					this.rectList = rects[0]
				})
			},
			// 绘制圆角矩形
			drawRectRadius() {
				uni.createSelectorQuery().selectAll('.skeleton-rect-radius').boundingClientRect().exec(rects => {
					this.rectRadiusList = rects[0]
				})
			},
			// 绘制圆形
			drawRound() {
				uni.createSelectorQuery().selectAll('.skeleton-round').boundingClientRect().exec(rects => {
					this.roundList = rects[0]
				})
			},
			// 绘制阴影块
			drawShadow() {
				uni.createSelectorQuery().selectAll('.skeleton-shadow').boundingClientRect().exec(rects => {
					// console.log(rects)
					this.shadowList = rects[0]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		left: 0;
		top:0;
		z-index: 8;
		overflow: hidden;
		// background-color: #1444E1 !important;

  background-color: #0b46d8 !important;

		.shadow {
			position: absolute;
			background: #F2F3F5;
		}

		.rect {
			position: absolute;
			background: #fff;
			border-radius:12rpx;
			
		}

		.round {
			position: absolute;
			background: #F8F9FB;
			border-radius: 50%;
		}

		.radius {
			border-radius:12rpx;
			overflow: hidden;
			background-color: #F4F7FB;
		}

	}
</style>
