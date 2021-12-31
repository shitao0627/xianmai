<template>
	<view>
		<!-- <page-head title="swiper,可滑动视图"></page-head> -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in banner">
					<view class="swiper-item">
						<image :src="item.src"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- <view class="swiper-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">指示点</view>
				<switch :checked="indicatorDots" @change="changeIndicatorDots" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">自动播放</view>
				<switch :checked="autoplay" @change="changeAutoplay" />
			</view>
		</view>

		<view class="uni-padding-wrap">
			<view class="uni-common-mt">
				<text>幻灯片切换时长(ms)</text>
				<text class="info">{{duration}}</text>
			</view>
			<slider @change="durationChange" :value="duration" min="500" max="2000" />
			<view class="uni-common-mt">
				<text>自动播放间隔时长(ms)</text>
				<text class="info">{{interval}}</text>
			</view>
			<slider @change="intervalChange" :value="interval" min="2000" max="10000" />
		</view> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				banner:[{
					src:'../../static/img/banner14.png'
				},{
					src:'../../static/img/banner.jpg'
				},{
					src:'../../static/img/banner14.png'
				}],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500
			}
		},
		methods: {
			getList() {
				uni.request({
					url: "apis/news",
					method: 'get',
					dataType: 'json',
					success: (res) => {
						console.log(res.data);
						this.productList = res.data;
					},
				});
			},
		}
	}
</script>

<style lang="scss">
	.uni-margin-wrap {
		width: 100%;;
	}
	.swiper {
		height: 300rpx;
		margin: 8px 10px;
		border-radius: 8px;
		.uni-swiper-wrapper{
			border-radius: 8px;
		}
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		
	}
	uni-image{
		height: 300rpx;
	}
	.swiper-item image{
		width: 100%;
		border-radius: 8px;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt{
		margin-top:60rpx;
		position:relative;
	}

	.info {
		position: absolute;
		right:20rpx;
	}

    .uni-padding-wrap {
        width:550rpx;
        padding:0 100rpx;
    }
</style>
