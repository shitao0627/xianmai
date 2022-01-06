<template>
	<!-- 商品评价 -->
	<view >
		<scroll-view class="nav-scroll" :enable-flex="true" scroll-with-animation :throttle="false"
			:scroll-left="scrollToLeft" scroll-x @scroll="handleScroll">
			<view class="nav uni-nav" style="height: 80rpx;">
				<view class="nav-item" :class="swiperIndex == index ? 'nav-item-act' : ''" :key="index"
					v-for="(item, index) in list" @click="taggleNav(index)">
					{{ item.title }}
				</view>
			</view>
		</scroll-view>
		<view class="swiper">
			<swiper :current="swiperIndex" :duration="300" class="swiper-1" easing-function="linear"
				@change="swiperChange">
				<swiper-item v-for="(item, index) in list" :key="index">
					 :refresher-enabled="true"
					<scroll-view :lower-threshold="80" :refresher-triggered="refreStatus"
						@refresherrefresh="handleRefre" class="swiper-scroll" scroll-y="true"
						@scrolltolower="swiperScrollLower">
						<view>
							<!-- <view class="swiper-item-list" v-for="sub_item in item.content" :key="sub_item">
								{{ sub_item }}</view> -->
							<!-- <speityn></speityn> -->
							<commentlist></commentlist>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view> 
	</view>
</template>

<script>
	import commentlist from "../commentlist/index.vue"
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
				list: [
					{ title: '全部', content: ['首页-1', '首页-2', '首页-3', '首页-4'] },
					{ title: '有图', content: ['测试-1', '测试-2', '测试-3', '测试-4', '测试-5'] },
				],
				refreStatus: false
			};
		},
		computed: {
			// style() {
			// 	return `width:${this.navItemWidth}px; left:${this.navItemLeft}px`;
			// }
		},
		components:{commentlist},
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
			// tabs-scrollview触底
			handleScroll(e) {
				this.scrollDom();
			},
			// swiper-ScrollLower触底
			swiperScrollLower() {
				uni.showToast({
					icon: 'none',
					title: `此时为${this.list[this.swiperIndex].title}触底`
				});
				setTimeout(() => {
					this.getData();
				}, 500);
			},
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
			// 下拉事件
			handleRefre() {
				this.refreStatus = true;
				uni.showLoading({
					title: '下拉加载中'
				});
				setTimeout(() => {
					this.list[this.swiperIndex].content = [];
					for (var i = 0; i < 5; i++) {
						this.list[this.swiperIndex].content.push([this.list[this.swiperIndex].title + '下拉-' + i]);
					}
					uni.hideLoading();
				}, 1000);
				setTimeout(() => {
					this.refreStatus = false;
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.nav-item {
		width: 50%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		display: inline-block;
		// margin: 0 16upx;
		text-align: center;
		transition: color 0.3s ease;
		font-size: 28rpx;
		font-weight: 400;
		font-family: PingFang SC;
		color: #999999;
	}
	.nav-scroll{
		margin-bottom: 10px;
		background: #FFFFFF;
	}
	.nav {
		white-space: nowrap;
		position: relative;
		height: 80rpx;
		padding: 4rpx 0;
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
		border-bottom:4rpx transparent solid;
		border-image:linear-gradient(to right,#46E3BC ,#32AADF) 1 10;
	}

	

	swiper {
		height: calc(100vh - 80upx);
		
	}

	swiper-item {
		margin-top: -40rpx;
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
