<template>
	<view>
		<scroll-view class="nav-scroll" :enable-flex="true" scroll-with-animation :throttle="false"
			:scroll-left="scrollToLeft" scroll-x @scroll="handleScroll">
			<view class="nav uni-nav">
				<view class="nav-item" :class="swiperIndex == index ? 'nav-item-act' : ''" :key="index"
					v-for="(item, index) in subType" @click="taggleNav(index)">
					{{ item.subCategoryName }}
				</view>
				<view class="nav-line" :style="style">
					<view class="nav-lines"></view>
				</view>
				
			</view>
		</scroll-view>
		<view class="swiper">
			<swiper :current="swiperIndex" :duration="300" class="swiper-1" easing-function="linear"
				@change="swiperChange">
				<swiper-item v-for="(item, index) in list" :key="index">
					 <!-- :refresher-enabled="true" -->
					<scroll-view :lower-threshold="80" :refresher-triggered="refreStatus"
						@refresherrefresh="handleRefre" class="swiper-scroll" scroll-y="true"
						>
						<!-- @scrolltolower="swiperScrollLower" -->
						<view>
							<!-- <view class="swiper-item-list" v-for="sub_item in item.content" :key="sub_item">
								{{ sub_item }}</view> -->
							<speityn :list="list" :recommendList='recommendList'></speityn>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperIndex: 0, //当前的swiperindex
				navItemWidth: '', //选中下划线的宽度
				navItemLeft: 0, //选中下划线的显示位置
				scrollToLeft: 0, //scrollview需要滚动的距离
				navInfos: [], //所有navitem的节点信息
				parentLeft: 0, //nav盒子的节点信息
				componentWidth: 0, //nav盒子的宽度
				// list: [
				// 	{ title: '足浴耗足浴耗', content: ['首页-1', '首页-2', '首页-3', '首页-4'] },
				// 	{ title: '足浴耗', content: ['测试-1', '测试-2', '测试-3', '测试-4', '测试-5'] },
				// 	{ title: '足浴耗品3', content: [] },
				// 	{ title: '足浴耗品4', content: ['hello-1', 'hello-2', 'hello-3', 'hello-4', 'hello-5'] },
				// 	{ title: '足浴耗品5', content: ['测试-1-1', '测试-1-2', '测试-1-3', '测试-1-4', '测试-1-5'] },
				// 	{ title: '足浴耗品6', content: ['测试-2-1', '测试-2-2', '测试-2-3', '测试-2-4', '测试-2-5'] },
				// 	{ title: '足浴耗品7', content: ['测试-3-1', '测试-3-2', '测试-3-3', '测试-3-4', '测试-3-5'] },
				// 	{ title: '足浴耗品8', content: ['测试-4-1', '测试-4-2', '测试-4-3', '测试-4-4', '测试-4-5'] },
				// 	{ title: '足浴耗品9', content: ['测试-5-1', '测试-5-2', '测试-5-3', '测试-5-4', '测试-5-5'] }
				// ],
				refreStatus: false
			};
		},
		props:{
			subType: {
				type: Array,
				default: []
			},
			list: {
				type: Array,
				default: []
			},
			subCategoryId:{
				type: String,
				default: ''
			},
			recommendList: {
				type: Array,
				default: () => []
			},
		},

		computed: {
			style() {
				return `width:${this.navItemWidth}px; left:${this.navItemLeft}px`;
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			// 获取dom信息
			init() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.uni-nav').fields({ rect: true, size: true }, res => {
					this.parentLeft = res.left;
					this.componentWidth = res.width;
					console.log('res==>', res);
				});
				query.selectAll('.nav-item').fields({ rect: true, size: true }, data => {
					data.forEach((item, index) => {
						if (index == 0) {
							this.navItemWidth = item.width;
							this.navItemLeft = item.left;
						}
						this.navInfos.push({ width: item.width, left: item.left });
					});
				});
				query.exec();
			},
			// 点击导航切换swiper
			taggleNav(val) {
				this.swiperIndex = val;
			},
			// 滚动tabs以及移动下划线
			scrollDom() {
				let info = this.navInfos[this.swiperIndex];
				let offsetLeft = info.left - this.parentLeft;
				let scrollLeft = offsetLeft - (this.componentWidth - info.width) / 2;
				this.scrollToLeft = scrollLeft < 0 ? 0 : scrollLeft;
				this.navItemLeft = this.navInfos[this.swiperIndex].left;
				setTimeout(() => {
					this.navItemWidth = info.width;
				}, 50);
			},
			// swiper的index变动
			swiperChange(e) {
				this.swiperIndex = e.detail.current;
				this.scrollDom();
				this.$emit('currentIndex', this.swiperIndex);
			},
			// // tabs-scrollview触底
			// handleScroll(e) {
			// 	this.scrollDom();
			// },
			// // swiper-ScrollLower触底
			// swiperScrollLower() {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: `此时为${this.list[this.swiperIndex].title}触底`
			// 	});
			// 	setTimeout(() => {
			// 		this.getData();
			// 	}, 500);
			// },
			// 生成列表数据
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(() => {
					for (let index = 0; index < 10; index++) {
						let arr = this.list[this.swiperIndex].content;
						this.$set(arr, arr.length, Math.random() + '-' + index + this.list[this.swiperIndex]
						.title);
					}
					uni.hideLoading();
				}, 1000);
				console.log(this.list[this.swiperIndex]);
			},
			
		}
	};
</script>

<style lang="scss" scoped>
	.nav-item {
		display: inline-block;
		margin: 0 16upx;
		text-align: center;
		transition: color 0.3s ease;
		font-size: 30rpx;
		font-weight: 400;
		font-family: PingFang SC;
		color: #666666;
	}
	.nav-scroll{
		margin-bottom: 10px;
		background: #FFFFFF;
	}
	.nav {
		white-space: nowrap;
		position: relative;
		height: 40upx;
		padding: 25upx 0;
		
	}

	/* #ifndef APP-NVUE */
	::-webkit-scrollbar {
		display: none;
	}

	/* #endif */

	/* #ifdef H5 */
	// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
	scroll-view ::v-deep ::-webkit-scrollbar {
		display: none;
	}

	/* #endif */

	.nav-item-act {
		color: #46E3BC;
		// font-weight: bolder;
		font-size: 30rpx;
		font-weight: 400;
	}

	.nav-line {
		position: absolute;
		bottom: 0;
		height: 6upx;
		transition: left 0.3s ease;
		.nav-lines{
			background-color: #32AADF;
			border-radius: 5upx;
			height: 6upx;
			width: 50rpx;
			text-align: center;
			margin: 0 auto;
		}
	}

	swiper {
		height: calc(100vh - 80upx);
	}

	swiper-item {
		text-align: center;
		color: #000;
		position: relative;
		color: #fff;
	}

	.swiper-item {
		overflow-y: scroll;
		background-color: #FFFFFF;
	}

	.swiper-item-list {
		height: 400upx;
		border-bottom: 2upx solid pink;
		line-height: 400upx;
	}

	.swiper-scroll {
		height: 100%;
	}
</style>
