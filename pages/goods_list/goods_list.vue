<template>
	<view class="goods_list">
		<!-- <view class="goods_list_header">
			<view class="icon iconfont icon-fanhui goods_list_fanhui" @click="navigateBack"></view>
			<view class="goods_list_header_title">足浴耗品</view>
			<view class="zhanwei"></view>
		</view> -->
		<tabs-swiper :subType="subType" :list="list" :subCategoryId='subCategoryId' :swiperIndex='swiperIndex' :recommendList="recommendList"></tabs-swiper>
	</view>
</template>

<script>
	export default { 
		data() {
			return {
				subType:[],
				goods:[],
				address:'',
				pagesize:10,
				goodsName:'',
				subCategoryId: '',
				hoursTo:[],
				page:1,
				list:[],
				swiperIndex:0,
				recommendList:[],
			}
		},
		onLoad(options) {
			this.subType = JSON.parse(decodeURIComponent(options.item));
			console.log("subType"+JSON.stringify(this.subType))
			this.getgoodsType()
			this.subCategoryId = JSON.stringify(this.subType[options.selectId].subId)
			console.log("123",this.subCategoryId)
			this.gethoursTo()
			this.swiperIndex = Number(this.options.selectId)
			console.log('swiperIndex',this.swiperIndex)
			this.getrecommend()
			
		},
		methods: {
			getrecommend(){
				this.loading = true
				let getRecommendParams = {
				        pagesize: 20,
				        address: this.address,
				        page: 1,
				        type: 1,
				    }
				getRecommendParams.sign = this.sign(getRecommendParams)
				this.$api.recommendList(getRecommendParams).then((res)=>{
					this.loading = false;
					// console.log('request success', res)
				
					this.recommendList = res.data.Response
					console.log('recommendList', this.recommendList)
					// this.navigation = res.data.Response.list
					// console.log('navigation', this.navigation)
					// this.res = '请求结果 : ' + JSON.stringify(res);
				}).catch((err)=>{
					this.loading = false;
					// console.log('request fail', err);
				})
			},
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
			// 24小时到
			gethoursTo() {
				this.loading = true
				let params = {
					subCategoryId: this.subCategoryId,
					userId: 0,
					address: this.address,
					pagesize: 30,
					page: this.page,
					type: 1,
					goodsName: this.goodsName
				}
				params.sign = this.sign(params)
				this.$api.hoursTo(params).then((res) => {
					this.loading = false;
					// console.log('request success', res)
			
					this.hoursTo = res.data.Response
					console.log('hoursTo', this.hoursTo)
					this.list = res.data.Response.list
					console.log("list",this.list)
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
