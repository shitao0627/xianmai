<template>
	<view>
		<!-- header -->
		<view class="header">
			<location></location>
			<navigator url="../search/index" class="search_home">
				<view class="search_box">
					<view class="icon iconfont icon-sousuo"></view>
					<view>毛巾、精油</view>
				</view>
				<view class="search_button">搜索</view>
			</navigator>
			<view class="message">
				<view class="icon iconfont icon-tixing message_icon"></view>
			</view>
		</view>
		<!--背景色-->
		<view class="background">
			<!-- banner -->
			<banner :swiperInfo="swiperInfo"></banner>
			<!--导航card-->
			<view class="navigation">
				<view class="navigation_card">
					<view class="navigation_card_icon" v-for="item in navigation">
						<image :src="item.img_url"></image>
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
			<!--商品分类-->
			<view class="goods_category">
				<view class="goods_category_card">
					<view class="goods_category_card_icon" v-for="(name,index) in category.slice(1)" :key="index" @tap="goClassify(name,index)">
						<image :src="name.categoryUrl"></image>
						<view>{{name.categoryName}}</view>
					</view>
				</view>
			</view>
		</view>
		<!--背景色 end-->
		<!---->
		<view class="ensure">
			<view class="ensure_card">
				<text class="icon iconfont icon-car"></text>
				<text class="ensure_card_text">12仓发货隔日达</text>
			</view>
			<view class="ensure_card">
				<text class="icon iconfont icon-zhi"></text>
				<text class="ensure_card_text">下单立返3%</text>
			</view>
			<view class="ensure_card" @tap="cslogin">
				<text class="icon iconfont icon-tuihuobaozhang"></text>
				<text class="ensure_card_text">退货顺丰包邮</text>
			</view>
		</view>
		<!--优惠活动-->
		<view class="activity">
			<view class="favourable_activity">
				<view class="favourable_activity_left">
					<text>免费用品</text>
					<image src="https://m.xianmaiyangsheng.com/xcxImg/image/zuliaoren/freetrial1.png"></image>
				</view>
				<view class="favourable_activity_center ">
					<text>技师用品</text>
					<image src="https://m.xianmaiyangsheng.com/xcxImg/image/zuliaoren/freetrial2.png"></image>
				</view>
				<view class="favourable_activity_right">
					<view class="favourable_activity_right_title">
						<text class="title_left">限时抢购</text>
						<text class="title_right">
							<text class="">00</text>:
							<text class="">00</text>:
							<text class="">00</text>
						</text>
					</view>
					<view class="snap_up" v-for="(item,index) in snapList.slice(1)" :key="index">
						<image :src="item.goods_image"></image>
						<text class="activity_present_price">&yen;{{item.flash_price}}</text>
						<text class="activity_original_price">&yen;{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!--技师服务-->
		<technician style="margin: 30rpx 0;"></technician>
		<!--首页商品列表-->
		<view class="speity">
			<speity 
			:recommendList="recommendList"
			></speity>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperInfo:[],
				navigation:[],
				productClassify:[],
				category: [],
				recommendList:[],
				pagesize:10,
				address: '',
				snapList:[],
			}
		},
		onLoad() {
			this.sendRequest()
			this.getcategory()
			this.getrecommend()
			this.getsnap()
		},
		methods: {
			sendRequest: function() {
				this.loading = true
				let banner = {
					rnd: 123
				}
				banner.sign = this.sign(banner)
				this.$api.banner(banner).then((res)=>{
					this.loading = false;
					// console.log('request success', res)
					
					// 轮播图信息
					this.swiperInfo = res.data.Response.shuffling_list
					// console.log('banner', this.swiperInfo)
					this.navigation = res.data.Response.list
					// console.log('navigation', this.navigation)
					// this.res = '请求结果 : ' + JSON.stringify(res);
				}).catch((err)=>{
					this.loading = false;
					// console.log('request fail', err);
				})
			},
			getcategory(){
				this.loading = true
				let params = {
					rnd: 123
				}
				params.sign = this.sign(params)
				this.$api.category(params).then((res)=>{
					this.loading = false;
					// console.log('request success', res)

					this.category = res.data.Response
					// console.log('category', this.category)
					// this.navigation = res.data.Response.list
					// console.log('navigation', this.navigation)
					// this.res = '请求结果 : ' + JSON.stringify(res);
				}).catch((err)=>{
					this.loading = false;
					// console.log('request fail', err);
				})
			},
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
			getsnap(){
				this.loading = true
				let snap = {
					address: this.address
				}
				snap.sign = this.sign(snap)
				this.$api.snap(snap).then((res)=>{
					this.loading = false;
					// console.log('request success', res)
				
					this.snapList = res.data.Response.flash_list
					console.log('snapList', this.snapList)
					// this.navigation = res.data.Response.list
					// console.log('navigation', this.navigation)
					// this.res = '请求结果 : ' + JSON.stringify(res);
				}).catch((err)=>{
					this.loading = false;
					// console.log('request fail', err);
				})
			},
			goClassify(name,index){
				console.log(name)
				console.log(index)
				uni.reLaunch({
					url: '/pages/classify/index?index='+(index+1)
				})
			},
			cslogin(){
				uni.navigateTo({
					url:'../cslogin/cslogin'
				})
			}
		}
	}
</script>

<style lang="scss">
	 .header {
	 	display: flex;
	 	justify-content: space-between;
	 	align-items: center;
	 	padding: 20rpx 0 10rpx 0;
	 	position: fixed;
	 	top: 0;
	 	left: 0;
	 	z-index: 999;
	 	width: 100%;
	 	background: #4FE6C4;
	 
	 	.search_home {
	 		position: relative;
	 		width: 70%;
	 		border: 1px solid #FFFFFF;
	 		height: 30px;
	 		background: #FFFFFF;
	 		border-radius: 30px;
	 		
	 
	 		.search_box {
	 			display: flex;
	 			width: 100%;
	 			height: 30px;
	 			padding-left: 10px;
	 			line-height: 30px;
	 			font-size: .9rem;
	 			color: #999;
	 			background: #FFFFFF;
	 			border-radius: 20px;
	 
	 			.icon-sousuo {
	 				padding-right: 5px;
	 				font-weight: bold;
	 			}
	 		}
	 
	 		.search_button {
	 			background: #4FE6C4;
	 			border-radius: 20px;
	 			color: #FFFFFF;
	 			font-size: 1rem;
	 			width: 65px;
	 			height: 30px;
	 			text-align: center;
	 			line-height: 30px;
	 			position: absolute;
	 			right: -9px;
	 			top: 0;
	 
	 		}
	 	}
	 
	 	.message {
	 		padding: 0 10px;
	 
	 		.message_icon {
	 			font-size: 1.7rem;
	 			color: #FFFFFF;
	 		}
	 	}
	 }
	.background {
		// height: 450px;
		margin-top: 90rpx;
		padding-top: 8rpx;
		background: -webkit-gradient(linear, 0 0, 0 bottom, from(#4FE6C4), to(#f9f9f9));
		// background:-moz-linear-gradient(top, #4FE6C4, rgba(0, 0, 255, 0));
		// background: linear-gradient(to bottom, #4FE6C4, rgba(255, 255, 255, 0));

		// background: linear-gradient(to right, #4FE6C4 , #40C3DA);

		.banner {
			
		}

		.navigation {
			width: 100%;
			height: 170rpx;
		
			.navigation_card {
				height: 170rpx;
				background: #FFFFFF;
				border-radius: 8px;
				margin: 34rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.navigation_card_icon {
					width: 150rpx;
					padding: 18rpx 10rpx;
					text-align: center;

					// height: 50rpx;
					image {
						width: 90rpx;
						height: 90rpx;
					}

					view {
						font-size: 26rpx;
						padding-top: 2px;
					}
				}
			}
		}

		.goods_category {
			width: 100%;

			.goods_category_card {
				background: #FFFFFF;
				border-radius: 8px;
				margin: 30rpx 20rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				padding: 5px 0;

				.goods_category_card_icon {
					width: 124rpx;
					padding: 16rpx 8rpx;
					text-align: center;

					// height: 50rpx;
					image {
						width: 90rpx;
						height: 90rpx;
					}

					view {
						font-size: 26rpx;
						padding-top: 2px;
					}
				}
			}
		}

	}

	.ensure {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0rpx 20rpx 20rpx 20rpx;
		// margin-top: 10rpx;

		.ensure_card {
			font-size: 26rpx;

			.icon {
				color: #46E3BC;
				font-size: 32rpx;
				padding: 0 2px;
			}

			.ensure_card_text {
				font-size: 26rpx;
				color: #333333;
			}
		}
	}

	.activity {
		width: 100%;

		.favourable_activity {
			background: #FFFFFF;
			border-radius: 8px;
			margin: 0 10px;
			height: 120px;
			display: flex;
			margin: 0 10px;
			padding-top: 8px;

			.favourable_activity_left {
				width: 25%;
				margin: 0 auto;
				text-align: center;

				text {
					font-size: 1.15rem;
					font-weight: bold;
					color: #39B216;
				}

				image {
					width: 45px;
					height: 70px;
					margin-top: 10px;
				}
			}

			.favourable_activity_center {
				width: 25%;
				text-align: center;
				margin: 0 auto;
				border-left: 2px solid #f3f3f3;
				border-right: 2px solid #f3f3f3;

				text {
					font-size: 1.15rem;
					font-weight: bold;
					color: #FC7233;
				}

				image {
					width: 45px;
					height: 70px;
					margin-top: 10px;
				}
			}

			.favourable_activity_right {
				width: 50%;

				.favourable_activity_right_title {
					padding: 0 5px;

					.title_left {
						font-size: 1.15rem;
						font-weight: bold;
						padding-right: 5px;
					}

					.title_right {
						text {
							font-size: .8rem;
							font-weight: bold;
							border-radius: 3px;
							background: #FF2324;
							color: #FFFFFF;
							margin: 0px 3px;
							padding: 1px 2px;
						}
					}

				}

				.snap_up {
					background: #f3f3f3;
					margin: 5px 10px;
					padding: 3px 8px;
					border-radius: 3px;
					display: flex;
					align-items: center;

					image {
						width: 20px;
						height: 30px;
						margin-right: 10px;
					}

					.activity_present_price {
						border: 2px solid #FF2324;
						border-radius: 12px;
						padding: 0px 5px;
						font-size: .8rem;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FF2324;
						margin: 0 8px;
					}

					.activity_original_price {
						font-size: .7rem;
						font-family: PingFang SC;
						font-weight: 500;
						text-decoration: line-through;
						color: #999999;
					}
				}

			}
		}
	}

	// .speity_header {
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	padding: 10px 0;
	// 	.speity_header_line {
	// 		width: 30px;
	// 		border: 1px solid #666;
	// 	}

	// 	.speity_header_point {
	// 		width: 3px;
	// 		height: 3px;
	// 		background: #666;
	// 		border-radius: 50%;
	// 		margin: 0 10px;
	// 	}

	// 	.speity_header_title {
	// 		font-size: 1.3rem;
	// 		font-family: PingFang SC;
	// 		font-weight: 500;
	// 		color: #666;
	// 	}
	// }
</style>
