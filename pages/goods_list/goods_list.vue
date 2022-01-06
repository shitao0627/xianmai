<template>
	<view class="goods_list">
		<!-- <view class="goods_list_header">
			<view class="icon iconfont icon-fanhui goods_list_fanhui" @click="navigateBack"></view>
			<view class="goods_list_header_title">足浴耗品</view>
			<view class="zhanwei"></view>
		</view> -->
		<tabs-swiper :subCategoryName="subCategoryName"></tabs-swiper>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				subCategoryName:[],
			}
		},
		onLoad(options) {
			this.subCategoryName = JSON.parse(decodeURIComponent(options.item));
			console.log("subCategoryName"+this.subCategoryName)
			this.getgoodsType()
		},
		methods: {
			getgoodsType() {
				this.loading = true
				let params = {
					rnd: 123
				}
				params.sign = this.sign(params)
				this.$api.goodsType(params).then((res) => {
					this.loading = false;
					// console.log('request success', res)
			
					this.goodsType = res.data.Response
					console.log('goodsType', this.goodsType)
					// this.navigation = res.data.Response.list
					// console.log('navigation', this.navigation)
					// this.res = '请求结果 : ' + JSON.stringify(res);
				}).catch((err) => {
					this.loading = false;
					// console.log('request fail', err);
				})
			},
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
