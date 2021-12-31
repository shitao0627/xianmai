<template>
	<view class="goods_list">
		<!-- <view class="goods_list_header">
			<view class="icon iconfont icon-fanhui goods_list_fanhui" @click="navigateBack"></view>
			<view class="goods_list_header_title">足浴耗品</view>
			<view class="zhanwei"></view>
		</view> -->
		<tabs-swiper></tabs-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navigateBack:function(){
			    uni.navigateBack()//返回上一页
			}
		}
	}
</script>

<style lang="scss">
	.goods_list{
		.goods_list_header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:10px;
			border-bottom: 1px solid #E7E7E7;
			background: #FFFFFF;
			.goods_list_fanhui{
				font-size: 38rpx;
				font-weight: bold;
				color: #444;
			}
			.goods_list_header_title{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #444;
				line-height: 25px;
			}
			.zhanwei{
				width: 15px;
			}
		}
	}
</style>
