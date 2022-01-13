<template>
	<view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">

				<view class="box" @tap="toChat">
					<view class="icon iconfont icon-kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep">
					<view class="icon iconfont" :class="[isKeep?'icon-shoucang2':'icon-shoucang1']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
				<view class="box" @tap="toshoping">
					<view class="icon iconfont icon-31gouwuche"></view>
					<view class="text">购物车</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>

		<!-- 单规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass0" @touchmove.stop.prevent="discard" @tap="hideSpec0">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="specification_information">
						<view class="specification_information_left">
							<view class="specification_information_img">
								<image :src="checkedItem.images"></image>
							</view>
							<view class="price_inventory">
								<view class="price">&yen;{{checkedItem.price}}</view>
								<view class="inventory">库存{{checkedItem.stock}}件</view>
							</view>
						</view>
						<view class="specification_information_right">
							<view class="icon iconfont icon-guanbi1" @tap="hideSpec0"></view>
						</view>
					</view>
					<view class="specification_information_title">选择规格：</view>
					<view class="sp">
						<div class="specificationWrap" v-for="(item,index) in specificationTitle " :key="index">
							<div class="specificationTitle">{{item.name}}</div>
							<div class="specificationTextWrap specificationTextWrap-single">
								<div class="specificationText"
									:class="{'specificationTextActive':specificationIndex==flag}"
									v-for="(specification,specificationIndex) in item.value" :key="specificationIndex"
									@click="chooseFirst(specification,specificationIndex)">
									{{specification}}
								</div>
							</div>
						</div>

					</view>
					<!--购买数量-->
					<div class="buyCountWrap singleBuyCountWrap">
						<div class="buyNumber">购买数量</div>
						<div class="countWrap">
							<div class="count">库存:{{checkedItem.stock}}</div>
							<div class="zan-card__detail-row zan-c-gray-darker">
								<div class="zan-card__right-col zan-stepper">
									<div @click="subSingle" class="zan-stepper__minus"
										:class="{'zan-stepper--disabled': number <= min}">-</div>
									<div class="counts">
										<input type="number" @input="setNumber" v-model="number">
									</div>
									<div @click="addSingle" class="zan-stepper__plus">+</div>
								</div>
							</div>
						</div>
					</div>
				</view>
				<!-- <view class="btn"><view class="button" @tap="hideSpec">完成</view></view> -->
				<view class="layer_buttom">
					<view class="shujia">
						<view class="shujia_left" style="display: flex;">已选<input type="number"
								style="width: 60rpx;text-align: center;" v-model="number" />个</view>
						<view class="shujia_right">商品金额 <text style="color: #EA473F;">
								&yen;{{checkedItem.price*number}}</text></view>
					</view>
					<view class="button_btn">
						<view class="button_btn_right" @tap="joinCart">加入购物车</view>
						<view class="button_btn_left" @tap="toConfirmation">立即购买</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="specification_information">
						<view class="specification_information_left">
							<view class="specification_information_img">
								<image :src="checkedItem.images"></image>
							</view>
							<view class="price_inventory">
								<view class="price">&yen;{{checkedItem.price}}</view>
								<view class="inventory">库存{{checkedItem.stock}}件</view>
							</view>
						</view>
						<view class="specification_information_right">
							<view class="icon iconfont icon-guanbi1" @tap="hideSpec"></view>
						</view>
					</view>
					<view class="specification_information_title">选择规格：</view>
					<view class="sp">
						<!-- 多规格标题-->
						<div class="specificationWrap" v-for="(item, index) in specificationTitle" :key="index">
							<div class="specificationTitle">{{item.name}}</div>
							<div class="specificationTextWrap">
								<div class="specificationText"
									:class="{'specificationTextActive':specificationIndex==flag}"
									v-for="(specification,specificationIndex) in item.value" :key="specificationIndex"
									@click="chooseSecond(specification,specificationIndex)">
									{{specification}}
								</div>
							</div>

						</div>
						<!--第二个规格-->
						<div>
							<div class="specificationWrap" v-for="(item, index) in specificationTitle2" :key="index">
								<div class="specificationTitle">{{item.name}}</div>
								<div class="specificationContent" style='display: flex;'>
									<div class="buyCountWrap secondCountWrap"
										v-for="(specification,specificationIndex) in checkedItems"
										:key="specificationIndex">
										<div @click="goodsImg = specification.images" class="secondSpecification">
											{{specification.value}}
										</div>
										<div class="specificationPrice">￥{{specification.price}}</div>
										<div class="countWrap">
											<div class="count">库存:{{specification.stock}}</div>
											<div class="zan-card__detail-row zan-c-gray-darker">
												<div class="zan-card__right-col zan-stepper">
													<div @click="sub(specification)" class="zan-stepper__minus"
														:class="{'zan-stepper--disabled': specification.number <= min}">
														-</div>
													<div class="counts">
														<input type="number"
															@input="setMoreNumber(specification,$event)"
															v-model="specification.number">
													</div>
													<div @click="add(specification)" class="zan-stepper__plus"
														:class="{'zan-stepper--disabled': specification.number >= specification.stock}">
														+</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</view>
				</view>
				<!-- <view class="btn"><view class="button" @tap="hideSpec">完成</view></view> -->
				<view class="layer_buttom">
					<view class="shujia">
						<view class="shujia_left" style="display: flex;">已选{{buyNumber}}个</view>
						<view class="shujia_right">商品金额 <text style="color: #EA473F;">
								&yen;{{buyPrice}}</text></view>
					</view>
					<view class="button_btn">
						<view class="button_btn_right" @tap="joinCart">加入购物车</view>
						<view class="button_btn_left" @tap="toConfirmation">立即购买</view>
					</view>
				</view>

			</view>
		</view>



		<!-- 服务-规则选择 -->
		<view class="info-box spec">

			<view class="row" @tap="showSpec(false)">
				<view class="text">规格</view>
				<!-- <view class="content">
					<view>选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</view>
					</view>
				</view> -->
				<view class="arrow">
					<view class="icon iconfont icon-right"></view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11, //层级
				afterHeaderzIndex: 10, //层级
				beforeHeaderOpacity: 1, //不透明度
				afterHeaderOpacity: 0, //不透明度
				//是否显示返回按钮
				// #ifndef MP
				showBack: true,
				// #endif
				// 商品信息
				goodsData: {
					id: 1,
					name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
					price: "127.00",
					number: 1,
					img: '../../static/img/goods2.png',
					inventory: '1651',
					service: [{
							name: "极速退货",
							description: "卖家将在消费者提出退货申请的24小时内进行处理。"
						},
						{
							name: "24小时发货",
							description: "卖家将在订单完成付款后的24小时内发货，特殊情况除外。"
						},
					],
					spec: ["100ml", "200ml", "300ml", "400ml"],
					comment: {
						number: 102,
						userface: '../../static/img/goods2.png',
						username: '大黑哥',
						content: '很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
					}
				},
				//轮播图下标
				currentSwiper: 0,
				anchorlist: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: '', //服务弹窗css类，控制开关动画
				specClass: '', //规格弹窗css类，控制开关动画
				specClass0: '',
				shareClass: '', //分享弹窗css类，控制开关动画
				// 商品信息

				selectSpec: null, //选中规格
				isKeep: false, //收藏
				address: '',
				goodsdetails: [], //产品详情
				recommend: [], //上个页面携带参数
				recommendList: [], //特色推荐
				pagesize: 10,


				shareBg: '',
				shareBgB: '',
				showShareBgB: false,
				showSharePopup: false,
				customStyle: 'position: absolute; top:-9999px',
				template: null,
				templateB: null,
				haveLogin: Boolean,
				isShowSharePopup: false,
				isIphoneX: false,
				goodFrameStatus: false,
				goodsDetails: [],
				imgList: [{
					img_url: ''
				}],
				rescommendInfo: {},
				showCouponStatus: false,
				showServicesStatus: false,
				showProductParamsStatus: false,
				showSpecificationsStatus: false,
				showMoreSpecificationsStatus: false,
				productBySpecificationInfo: {},
				number: 0,
				min: 0,
				max: 999,
				specificationTitle: [],
				specificationTitle2: [],
				checkedItem: {},
				checkedItems: [],
				postTwoFourOrderShow: {},
				specificationInfo: {},
				flag: 0,
				productParameterInfo: {},
				numberTest: 0,
				itemStatus: false,
				couponRedemptionInfo: [],
				goodsImg: '',
				goodsStock: 0,
				goodsPrice: '',
				collectionInfo: '',
				resGetCollectionStatus: false,
				address: '全国发货',
				// showSpec: false,
				type: Number,
				goodsInfo: {
					name: '',
					address: '',
					persionNum: ''
				},
				userInfo: {},
				deliveryStation: ''
			};
		},
		onLoad(option) {
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数

			this.recommend = JSON.parse(JSON.stringify(option))
			console.log('recommend' + this.recommend); //打印出上个页面传递的参数。
			this.getspecification()

		},


		mounted() {

		},
		methods: {

			hideShare() {
				this.shareClass = 'hide';
				setTimeout(() => {
					this.shareClass = 'none';
				}, 150);
			},
			//收藏
			keep() {
				this.isKeep = this.isKeep ? false : true;
			},
			// 加入购物车
			joinCart() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						uni.showToast({
							title: "请选择规格"
						});
					});
				}

				// let tmpList = [];
				// let goods = {
				// 	id: this.goodsData.id,
				// 	img: '../../static/img/goods2.png',
				// 	name: this.goodsData.name,
				// 	spec: '规格:' + this.goodsData.spec[this.selectSpec],
				// 	price: this.goodsData.price,
				// 	number: this.goodsData.number,
				// 	selected: false
				// };
				// tmpList.push(goods);
				uni.setStorage({
					key: 'buylist',
					data: tmpList,
					success: () => {
						this.specClass = 'hide';
						//回调

						this.selectSpec && this.specCallback && this.specCallback();
						this.specCallback = false;
						setTimeout(() => {
							this.specClass = 'none';
						}, 200);
						uni.showToast({
							title: "已加入购物车"
						});
					}
				})
			},
			//立即购买
			buy() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						this.toConfirmation();
					});
				}
				this.toConfirmation();
			},

			//跳转确认订单页面
			toConfirmation() {
				let tmpList = [];
				let goods = {
					id: this.goodsdetails.goods_id,
					img: this.goodsdetails.goods_image,
					name: this.goodsdetails.goods_name,
					// spec: '规格:' + this.goodsdetails.spec[this.selectSpec],
					price: this.goodsdetails.price,
					// number: this.goodsData.number,
					selected: false,
					coupons: this.goodsdetails.coupons_list
				};
				tmpList.push(goods);
				uni.setStorage({
					key: 'buylist',
					data: tmpList,
					success: () => {
						uni.navigateTo({
							url: '../order/order'
						})
					}
				})
			},

			//选择规格
			setSelectSpec(index) {
				this.selectSpec = index;
			},

			//服务弹窗
			showService() {
				console.log('show');
				this.serviceClass = 'show';
			},
			//关闭服务弹窗
			hideService() {
				this.serviceClass = 'hide';
				setTimeout(() => {
					this.serviceClass = 'none';
				}, 200);
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				if (this.productBySpecificationInfo.data.length == 1) {
					this.specClass0 = 'show';
				} else if (this.productBySpecificationInfo.data.length > 1) {
					this.specClass = 'show';
					this.specCallback = fun;
				}
			},
			specCallback() {
				return;
			},
			//关闭规格弹窗(多规格)
			hideSpec() {
				this.specClass = 'hide';
				//回调

				this.selectSpec && this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			//关闭规格弹窗(单规格)
			hideSpec0() {
				this.specClass0 = 'hide';
				//回调

				this.selectSpec && this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass0 = 'none';
				}, 200);
			},
			discard() {
				//丢弃
			},

			/*
			 *  商品规格
			 * */
			getspecification() {
				let productBySpecification = {
					goodsId: this.recommend.goods_id
				}
				productBySpecification.sign = this.sign(productBySpecification)
				this.$api.specification(productBySpecification).then((resProductBySpecification) => {
					this.loading = false;
					this.productBySpecificationInfo = resProductBySpecification.data.Response
					console.log('0', this.productBySpecificationInfo)
					switch (this.productBySpecificationInfo.data.length) {
						case 1: {
							this.checkedItem = this.productBySpecificationInfo.spList[0]
							this.goodsImg = this.checkedItem.images
							this.goodsStock = this.checkedItem.stock
							this.goodsPrice =
								this.goodsDetails.price === this.goodsDetails.max_price ?
								this.goodsDetails.price :
								`${this.goodsDetails.price}~${this.goodsDetails.max_price}`
							this.specificationTitle = this.productBySpecificationInfo.data
							console.log('1', this.checkedItem)
							console.log('2', this.goodsImg)
							console.log('3', this.goodsStock)
							// console.log('4',this.goodsDetails.price)
							// console.log('5',`${this.goodsDetails.price}~${this.goodsDetails.max_price}`)
							console.log('4', this.specificationTitle)
							console.log('5', this.specificationTitle[0].value)
							break
						}
						case 2: {
							// 多规格
							this.specificationTitle[0] = this.productBySpecificationInfo.data[0]
							// 选中第一个
							console.log('5', this.specificationTitle[0])
							this.checkedItem = this.productBySpecificationInfo.spList[0]
							console.log('6', this.checkedItem)
							this.specificationTitle2[0] = this.productBySpecificationInfo.data[1]
							// 默认循环第一数据
							this.productBySpecificationInfo.spList.map(item => {
								let specificationIdDouble =
									`${this.specificationTitle[0].value[0]}：${item.value}`
								if (item.specification == specificationIdDouble) {
									this.checkedItems.push(item)
									console.log('7', this.checkedItems)
								}
							})
							//  商品图片显示第一个  价格显示区间  库存显示总库存
							this.goodsImg = this.checkedItems[0].images
							this.checkedItems.map(item => {
								this.goodsStock += parseInt(item.stock)
								console.log('8', this.goodsStock)
							})
							this.goodsPrice =
								this.goodsDetails.price === this.goodsDetails.max_price ?
								this.goodsDetails.price :
								`${this.goodsDetails.price}~${this.goodsDetails.max_price}`
							break
						}
					}
				}).catch((err) => {
					this.loading = false;
				})
			},
			addSingle() {
				if (this.number < this.checkedItem.stock) {
					this.number++
				} else {
			  this.number = this.checkedItem.stock
				}
				this.goodsStock = this.checkedItem.stock
				this.goodsImg = this.checkedItem.images
				this.goodsPrice = this.checkedItem.price
			},
			subSingle() {
				if (this.number > this.min) {
					this.number--
				} else {
					this.number = this.min
				}
			 this.goodsStock = this.checkedItem.stock
				this.goodsImg = this.checkedItem.images
				this.goodsPrice = this.checkedItem.price
			},
			add(specification) {
				if (specification.number < specification.stock) {
					specification.number++
				} else {
			  specification.number = specification.stock
				}
			 //  在数量加减是显示当前的库存
				this.goodsStock = specification.stock
				this.goodsImg = specification.images
				this.goodsPrice = specification.price
			},
			sub(specification) {
				if (specification.number > this.min) {
					specification.number--
				} else {
					specification.number = this.min
				}
				this.goodsStock = specification.stock
				this.goodsImg = specification.images
			},
			setNumber (e) {
			      if (this.checkedItem.stock >= e.mp.detail.value) {
			        this.number = e.mp.detail.value
			      } else {
			        uni.showToast({
			          title: '已经是最大库存了哦！',
			          icon: 'none',
			          duration: 2000,
			          mask: true
			        })
			        this.number = this.checkedItem.stock
			      }
			    },
			chooseSecond (specification, specificationIndex) {
			      this.checkedItems = []
			      // 切换标题的时候需要将重置一下
			      this.flag = specificationIndex
			      // 看选中的是哪个
			      this.productBySpecificationInfo.spList.map(item => {
			        item.number = 0
			        let specificationIdDouble = `${specification}：${item.value}`
			        if (item.specification == specificationIdDouble) {
			          this.checkedItems.push(item)
			        }
			      })
			      //  商品图片显示第一个  价格显示区间  库存显示总库存
			      this.goodsImg = this.checkedItems[0].images
			      this.goodsPrice = this.checkedItems[0].price
			      this.checkedItems.map(item => {
			        this.goodsStock = parseInt(item.stock)
			      })
			    },
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.icon {
		font-size: 26upx;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		background-color: #f1f1f1;
		transition: opacity 0.05s linear;
	}

	.header {
		width: 100%;

		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			transition: opacity 0.05s linear;

			.back {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;

				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 66upx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding-left: 8rpx;
					font-size: 40upx;
				}
			}

			.middle {
				width: 100%;
			}

			.icon-btn {
				width: 60upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;

				.icon {
					&:first-child {
						margin-right: 5upx;
					}

					width: 66upx;
					height: 66upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 44upx;
				}
			}
		}

		.before {
			.back {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
				}
			}

			.icon-btn {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;

				}
			}
		}

		.after {
			background-color: #f1f1f1;

			.back {
				.icon {
					color: #666;
				}
			}

			.icon-btn {
				.icon {
					color: #666;
				}
			}

			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 7%;

				view {
					width: (100%/3);
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;

					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;

		.goods-info-card {
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				font-size: 28upx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #999999;
			}
		}
	}

	.goods-info {
		.price {
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #EA473F;
			line-height: 100upx;
		}

		.title {
			font-size: 32rpx;
			font-family: PingFangSC;
			font-weight: 600;
			color: #333333;
			line-height: 48upx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
	}

	.spec {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 20upx 0;
			border-bottom: 1px solid #e7e7e7;

			.text {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
				line-height: 60rpx;
				width: 80rpx;
			}

			.content {
				font-size: 30upx;
				display: flex;
				flex-wrap: wrap;

				.serviceitem {
					margin-right: 10upx;
					font-size: 30rpx;
				}

				.sp {
					width: 100%;
					display: flex;

					view {
						background-color: #f6f6f6;
						padding: 5upx 10upx;
						color: #999;
						margin-right: 10upx;
						font-size: 20upx;
						border-radius: 5upx;

						&.on {
							border: solid 1upx #f47952;
							padding: 4upx 8upx;
						}
					}
				}
			}

			.coupons {
				.coupons_button {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					background: linear-gradient(0deg, #FF6465, #FF1D35, #FF142E);
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					padding-top: 4rpx;
				}
			}

			.arrow {
				position: absolute;
				right: 4%;

				.icon {
					color: #ccc;
				}
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 30upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;

					.icon {
						color: #17e6a1;
					}
				}
			}
		}

		.evaluation {
			margin-right: 10px;
			border-radius: 8px;
			display: flex;
			// white-space: nowrap;
			/*overflow-x: scroll;*/
			overflow-y: hidden;
			height: 280upx;
			width: 100%;

			.evaluation_card {
				display: flex;
				width: 500upx;
				margin: 10px;
				box-shadow: 10upx 10upx 10upx #E7E7E7;

				.evaluation_card_left {
					width: 250upx;
					padding: 15upx;

					.evaluation_card_left_top {
						display: flex;
						align-items: center;

						image {
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}

						view {
							width: 180upx;
						}
					}

					.content {
						width: 250upx;
					}
				}

				.evaluation_card_right {
					width: 250upx;
					height: 240upx;

					image {
						width: 250upx;
						height: 240upx;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;

				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}

				.username {
					font-size: 24upx;
					color: #999;
				}
			}

			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #666;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 100%;
		// padding: 0 4%;
		height: 100upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 80upx;
			// margin-left: -4%;

			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				padding: 0 6rpx;

				.icon-shoucang1 {
					color: #828282;
					// background: linear-gradient(0deg, #46E3BC, #32AADF);
				}

				.icon-shoucang2 {
					color: #46E3BC;
				}

				.icon {
					font-size: 40upx;
					// color: #828282;
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.btn {
			height: 100upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;


			.joinCart,
			.buy {
				height: 100upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
				width: 150rpx;
				justify-content: center;
			}

			.joinCart {
				background-color: #555555;
			}

			.buy {
				background: linear-gradient(90deg, #46E3BC, #32AADF);
			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 100%;
			// padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 30rpx;

				.service_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #e7e7e7;
					// padding: 0 20rpx;

					.service_title_text {
						font-size: 40rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #333333;
						line-height: 100rpx;
					}

					.icon {
						font-size: 60rpx;
						font-weight: 400;
						color: #999999;
					}

					.zhan {
						width: 50rpx;
					}
				}

				.specification_information {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					padding-bottom: 20rpx;

					// padding: 0 30rpx;
					.specification_information_left {
						display: flex;
						align-items: flex-end;

						.specification_information_img {
							width: 200rpx;
							height: 120rpx;
							position: relative;

							image {
								position: absolute;
								top: -80rpx;
								left: 0;
								height: 200rpx;
								width: 200rpx;
								border-radius: 10rpx;
							}
						}

						.price_inventory {
							padding: 0 30rpx;

							.price {
								font-size: 40rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #EA473F;
								padding-bottom: 10rpx;
							}

							.inventory {
								font-size: 26rpx;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #666666;
							}
						}
					}

					.specification_information_right {
						.icon {
							font-size: 60rpx;
							color: #999999;
						}
					}
				}

				.specification_information_title {
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
					padding: 30rpx 0;
					border-top: 1px solid #e7e7e7;
				}
			}

			.layer_buttom {
				width: 100%;

				.shujia {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30rpx;
					border-top: 1px solid #e7e7e7;

					.shujia_left {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 60rpx;
						display: flex;
					}

					.shujia_right {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 60rpx;

						text {
							font-size: 28rpx;
						}
					}
				}

				.button_btn {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.button_btn_left {
						width: 50%;
						text-align: center;
						line-height: 110rpx;
						background: #555555;
						color: #FFFFFF;
						font-size: 32rpx;
						background: linear-gradient(90deg, #46E3BC, #32AADF);
					}

					.button_btn_right {
						width: 50%;
						font-size: 32rpx;
						text-align: center;
						line-height: 110rpx;
						background: #555555;
						color: #FFFFFF;
					}
				}
			}


			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
				}

				.description {
					font-size: 30upx;
					color: #999;
					padding: 0 48rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #7F7E7F;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 30upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;
					line-height: 50rpx;

					&.on {
						background: linear-gradient(90deg, #46E3BC, #32AADF);
						color: #FFFFFF;
						font-size: 28upx;
						padding: 5upx 30upx;
						border-radius: 8upx;
						margin: 0 30upx 20upx 0;
					}
				}
			}

			.length {
				margin-top: 30upx;
				// border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 0;
				border-bottom: 1px solid #e7e7e7;
				border-top: 1px solid #e7e7e7;

				.text {
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
				}

				.price {
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #EA473F;
				}

				.number {
					display: flex;
					justify-content: center;
					align-items: flex-end;

					.input {
						width: 70upx;
						height: 55upx;
						margin: 0upx;
						background-color: #FFFFFF;
						border-top: 1px solid #666666;
						border-bottom: 1px solid #666666;

						input {
							width: 70upx;
							height: 50upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 30upx;
							color: #333333;
						}
					}

					.sub,
					.add {
						width: 80upx;
						height: 55upx;
						background-color: #FFFFFF;
						border-radius: 5upx;
						border: 1px solid #7F7F7F;
						font-size: 40upx;
						text-align: center;
						line-height: 50upx;

						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}

		}
	}

	.share {
		display: none;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.15s linear both;
			}

			.layer {
				animation: showLayer 0.15s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.15s linear both;
			}

			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			background-color: rgba(0, 0, 0, .5);
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			z-index: 11;
		}

		.layer {
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255, 255, 255, 1);

			.list {
				width: 100%;
				display: flex;
				padding: 10upx 0 30upx 0;

				.box {
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					image {
						width: 13.8vw;
						height: 13.8vw;
					}

					.title {
						margin-top: 10upx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 26upx;
					}
				}
			}

			.btn {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				border-top: solid 1upx #666666;
			}

			.h1 {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
			}
		}

	}

	.coupons_row {
		display: flex;
		align-items: center;

		.coupons_img {
			background: url(../../static/img/coupon.png) no-repeat;
			background-size: 100%;
			padding: 12rpx 22rpx;
			width: 150rpx;
			text-align: center;

			text {
				font-size: 26rpx;
				color: #FFFFFF;
				width: 100%;
				text-align: center;

			}
		}
	}
</style>
