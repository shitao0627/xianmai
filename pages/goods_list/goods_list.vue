<template>
	<view class="container-wrapper">
		<view class="goods-wrapper">
			<scroll-view scroll-x scroll-with-animation class="navbar" :scroll-left="navScrollLeft"
				style="100%" v-if="isSubClassify">
				<view v-for="(i,index) in subType" :key="index" class="navbar-item"
					:class="currentSelect === index?'active':''" @click="switchNav($event,index)">
					<view>
						{{i.subCategoryName}}
					</view>
					<view :class="currentSelect === index?'border':''">
					</view>
				</view>
			</scroll-view>

			<swiper :class="isSubClassify?'sub-classify':''" class="tab-box" duration="300" :current="currentTab"
				@change="switchTab" v-if="isSubClassify">
				<swiper-item v-for="(i,j) in subType" :key="j" class="tab-content">
					<scroll-view scroll-y scroll-with-animation class="swiper-scroll"
						@scrolltolower="tolower">
						<!-- @scrolltoupper="toupper" -->
						<view class="lists">
							<view v-if="goods.length > 0 &&  subCategoryId === i.subId" class="list-wrap">
								<view class="list" v-for="(item, index) in goods" :key="index">
									<good_list @popGobuy="popGobuy" :name="item.goods_name" :cashback="item.cashback"
										:channCashback="item.chann_cashback" :oldPrice="item.original_price"
										:address="item.addresss" :price="item.price" :persionNum="item.sales_volume"
										:express="item.baoyou === 1 ? true : false" :img="item.goods_image"
										:id="item.goods_id" >
									</good_list>
								</view>
								<view>
									<view class="load-more" v-if="!isToLower">
										<view class="weui-loading"></view>
										<view class="weui-loadmore__tips">正在加载</view>
									</view>
									<view class="goods-list_bottom" v-if="isToLower">已经到底了哦！！</view>
								</view>
							</view>
							<view v-if="goods.length <= 0" class="null">
								这里什么都没有~
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>

			<scroll-view scroll-y scroll-with-animation scroll-left class="swiper-scroll normal-buy"
				@scrolltolower="tolower" v-else>
				<!-- @scrolltoupper="toupper" -->
				<view class="lists">
					<view v-if="goods.length > 0 " class="list-wrap">
						<view class="list" v-for="(item, index) in goods" :key="index">
							<good_list @popGobuy="popGobuy" :name="item.goods_name" :cashback="item.cashback"
								:channCashback="item.chann_cashback" :oldPrice="item.original_price"
								:address="item.addresss" :price="item.price" :persionNum="item.sales_volume"
								:express="item.baoyou === 1 ? true : false" :img="item.goods_image"
								:id="item.goods_id">
							</good_list>
						</view>
						<view>
							<view class="load-more" v-if="!isToLower">
								<view class="weui-loading"></view>
								<view class="weui-loadmore__tips">正在加载</view>
							</view>
							<view class="goods-list_bottom" v-if="isToLower">已经到底了哦！！</view>
						</view>
					</view>
					<view v-if="goods.length <= 0" class="null">
						这里什么都没有~
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navScrollLeft: 0,
				currentTab: 0,
				currentSelect: 0,
				left: 0,
				goods: [],
				isHideLoadMore: true,
				subType: [],
				subCategoryId: '0',
				page: 1,
				isToLower: false,
				goodsName: '',
				showSpec: false,
				goods_id: 0,
				address: '全国',
				isSubClassify: false,
				showClassifyPopup: false,
				showNewUserJoin: false,
				shareImage: '',
				navData: [{
						text: '首页'
					},
					{
						text: '健康首'
					},
					{
						text: '情感首页首'
					},
					{
						text: '职场'
					},
					{
						text: '育儿'
					},
					{
						text: '纠纷'
					},
					{
						text: '青葱'
					},
					{
						text: '上课'
					},
					{
						text: '下课'
					}
				]
			}
		},
		methods: {
			
			popGobuy(id) {
				this.goods_id = id
				this.showSpec = true
			},
			tolower() {
				this.page++
				this._GetGoods()
				// if (this.options.title === '推荐商品') {
				// 	this._getRecommend()
				// } else {
				// 	this._GetGoods()
				// }
			},
			// toupper() {
			//   this.page = 1
			//   this.goods = []
			//   this._GetGoods()
			// },
			search() {
				this.goods = []
				this._GetGoods()
				this.page = 1
			},
			_GetGoods() {
				this.loading = true
				let goodList = {
					subCategoryId: this.subCategoryId,
					userId: 0,
					address: this.address,
					pagesize: 10,
					page: this.page,
					type: 1,
					goodsName: this.goodsName
				}
				goodList.sign = this.sign(goodList)
				this.$api.hoursTo(goodList).then((res) => {
					this.loading = false;
					// console.log('request success', res)
							
					let list = res.data.Response.list
					console.log('list', res.data.Response.list)
					if (list.length < 10 && list.length >= 0) {
						this.goods.push(...list)
						this.isToLower = true
					} else {
						this.goods.push(...list)
					}
				}).catch((err) => {
					this.loading = false;
					// console.log('request fail', err);
				})
			},
			switchTab(e) {
				this.currentSelect = e.target.current
				this.currentTab = e.target.current
				this.goodsName = ''
				let _this = this
				let center = 187.5
				let halfWidth = 0
				this.left = 0
				wx.createSelectorQuery()
					.selectAll('.navbar-item')
					.boundingClientRect(function(rect) {
						rect.forEach((item, index) => {
							// console.log(item)
							if (index <= _this.currentSelect) {
								_this.left += item.width
							}
							if (index === _this.currentSelect) {
								halfWidth = item.width / 2
							}
						})
						_this.navScrollLeft = _this.left - center - halfWidth
					})
					.exec()
				this.goods = []
				this.page = 1
				this.isToLower = false
				this.subCategoryId = this.subType[e.target.current].subId
				this._GetGoods()
				console.log(this.subCategoryId)
			},
			switchNav(e, i) {
				console.log(e)
				console.log(e.target.offsetLeft)
				let center = 187.5
				let halfWidth = 0
				wx.createSelectorQuery()
					.selectAll('.navbar-item')
					.boundingClientRect(function(rect) {
						halfWidth = rect[i].width / 2
					})
					.exec()
				this.navScrollLeft = e.target.offsetLeft - center + halfWidth
				this.currentSelect = i
				this.currentTab = i
			},

			// _getRecommend() {
				
			// 	this.loading = true
			// 	let recommend = {
			// 	        pagesize: 10,
			// 	        address: this.address,
			// 	        page: 1,
			// 	        type: 1,
			// 	    }
			// 	recommend.sign = this.sign(recommend)
			// 	this.$api.recommendList(recommend).then((res)=>{
			// 		this.loading = false;
			// 		// console.log('request success', res)
					
			// 		let list = res.data.Response
			// 		console.log('list', res.data.Response)
			// 		if (list.length < 10 && list.length >= 0) {
			// 			this.goods.push(...list)
			// 			this.isToLower = true
			// 		} else {
			// 			this.goods.push(...list)
			// 		}
			// 		// this.navigation = res.data.Response.list
			// 		// console.log('navigation', this.navigation)
			// 		// this.res = '请求结果 : ' + JSON.stringify(res);
			// 	}).catch((err)=>{
			// 		this.loading = false;
			// 		// console.log('request fail', err);
			// 	})
			// },

		},
		
		onLoad(options) {
			this.currentSelect = Number(options.selectId)
			this.currentTab = Number(options.selectId)
			this.subType = JSON.parse(options.item)
			this.subCategoryId = this.subType[options.selectId].subId
			this.isSubClassify = true
			this._GetGoods()
			// this._getRecommend()
		},
	}
</script>

<style scoped lang="scss">
	.container-wrapper {
		height: 100vh;
		background: #f3f5f7;

		.fixed {
			position: fixed;
			top: 0px;
			left: 0px;
			width: 100%;
			z-index: 200;
			padding: 0 10px 10px;
			box-sizing: border-box;

			.top {
				background: #ffffff;

				.input-wrap {
					display: flex;
					height: 32px;
					line-height: 32px;
					position: relative;

					.icon {
						position: absolute;
						left: 12px;
						font-size: 13px;
						top: 1px;
						color: #999999;
					}

					.input {
						flex: 1;
						background: #f3f4f6;
						height: 32px;
						line-height: 32px;
						border-radius: 32px;
						padding-left: 30px;
						font-size: 13px;
					}

					.cancel {
						flex: 0 0 45px;
						text-align: center;
						font-size: 13px;
					}
				}
			}
		}

		.goods-wrapper {
			width: 100vw;
			white-space: nowrap; //这个属性很重要
			height: 100%;
			display: flex;
			flex-direction: column;
		}

		.navbar {
			position: fixed;
			width: 100vw;
			z-index: 100;
			background: #ffffff;
			border-top: 1px solid #f3f5f7;

			::-webkit-scrollbar {
				width: 0;

				height: 0;

				color: transparent;
			}

			.navbar-item {
				padding: 5px 10px;
				display: inline-block;
				color: #666666;

				.border {
					width: 25px;
					height: 2px;
					background: linear-gradient(to right, #46e3bc, #32aadf);
					margin: 0 auto;
				}
			}

			.active {
				color: #46e3bc;
			}
		}

		.tab-box {
			width: 100%;
			height: calc(100vh - 42px);
			white-space: nowrap; //这个属性很重要
			display: flex;
			flex-direction: column;
		}

		.sub-classify {
			margin-top: 38px;
			height: 100vh !important;
		}

		.normal-buy {
			height: 100vh !important;
		}

		.tab-content {
			width: 100vw;
			height: auto;
		}

		.swiper-scroll {
			height: calc(100vh - 42px);

			.lists {
				.list-wrap {
					display: flex;
					flex-wrap: wrap;
					padding: 0 5px;
					box-sizing: border-box;

					.list {
						width: 50%;
						display: flex;
						justify-content: center;
						margin-top: 10px;
					}

					.load-more {
						font-size: 15px;
						width: 100vw;
						text-align: center;
						height: 40px;
						line-height: 40px;
					}

					.goods-list_bottom {
						display: block;
						width: 100vw;
						text-align: center;
						box-sizing: border-box;
						padding: 10px;
						font-size: 12px;
						color: #cccccc;
					}
				}
			}

			.null {
				color: #cccccc;
				text-align: center;
				margin-top: 50px;
				font-size: 16px;
			}
		}

		.suspend {
			position: fixed;
			width: 75px;
			height: 75px;
			bottom: 75px;
			right: 30px;

			img {
				width: 75px;
				height: 75px;
			}

			.point {
				position: relative;
				top: 20px;
				left: 50px;
				color: #ffffff;
				text-align: center;
				border-radius: 50%;
				background-color: red;
				width: 15px;
				font-size: 12px;
				height: 15px;
				line-height: 15px;
				font-weight: bold;
			}
		}
	}

	.sigin-popup-wrap {
		position: relative;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 200;

		.x {
			width: 40px;
			height: 40px;
			position: absolute;
			right: 0;
			top: 80px;
			right: 20px;
			z-index: 999;

			.x-img {
				width: 100%;
				height: 100%;
			}
		}

		.sigin-popup {
			position: relative;
			margin: 0 auto;
			margin-top: 150px;
			// margin-top: 200px;
			// width: 300px;
			// height: 230px;
			width: 250px;
			height: 545 rpx;
			border-radius: 5px;
			// background: url('./pop.png');
			// background: url('http://m.xianmaiyangsheng.com/xcxImg/image/sigin_popup.png');
			// background: url('http://m.xianmaiyangsheng.com/xcxImg/activity/yiqing.jpg?temp='+$randomNumber);
			background-size: 100% 100%;

			.sigin-popup-img {
				width: 250px;
				// height: 545rpx;
			}

			.title {
				width: 100%;
				text-align: center;
				font-size: 23px;
				color: #f13637;
				position: absolute;
				top: 28px;

				text {
					color: #f7d153;
				}
			}

			.desc {
				text-align: center;
				font-size: 25px;
				padding-top: 105px;
				color: #ffffff;
			}

			.money {
				color: #e21212;
				font-size: 31px;
				text-align: center;
			}

			.to {
				font-size: 13px;
				color: #fff;
				text-align: center;
				padding-top: 15px;
			}

			.btn {
				width: 270px;
				height: 44px;
				background: url('http://m.xianmaiyangsheng.com/xcxImg/image/sigin_popup_btn.png');
				background-size: 100% 100%;
				margin: 0 auto;
				text-align: center;
				line-height: 44px;
				margin-top: 15px;
				font-size: 16px;
				color: #be3600;
				border: none;
			}

			.btn {
				height: 44px;
			}
		}

		.commission-popup {
			background: url('http://m.xianmaiyangsheng.com/xcxImg/activity12/activity-share2.png?rnd=1');
			background-size: 100% 100%;
			margin-top: 130px;
			width: 250px;
			height: 300px;
		}

		.newuser {
			background: url('http://m.xianmaiyangsheng.com/xcxImg/image/newuser_join.png');
			background-size: 100% 100%;
		}

		button::after {
			border: none;
			padding: 0;
		}
	}

	.category_coupon {
		width: 60px;
		height: 60px;
		position: fixed;
		right: 20px;
		bottom: 150px;
		animation: popup-min 2s infinite;
		animation-iteration-count: 10;

		img {
			width: 100%;
			height: 100%;
			filter: drop-shadow(0px 5rpx 5rpx rgba(255, 0, 0, 0.5));
		}
	}


	@keyframes popup-min {
		10% {
			transform: rotate(15deg);
		}

		20% {
			transform: rotate(-10deg);
		}

		30% {
			transform: rotate(5deg);
		}

		40% {
			transform: rotate(-5deg);
		}

		50%,
		100% {
			transform: rotate(0deg);
		}
	}
</style>
