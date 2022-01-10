<template>
	<!-- 购物车 -->
	<view>
		<!-- <view v-if="showHeader" class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="title">购物车</view>
		</view> -->
		<!-- 占位 -->
		<!-- <view v-if="showHeader" class="place"></view> -->
		<!-- 商品列表 -->
		<!-- 头部标题 -->
		<view class="shop_car_header">
			<view></view>
			<view class="shop_car_title">购物车</view>
			<view class="shop_car_title_right" @tap="allSelect">编辑</view>
		</view>
		<view class="goods-list">
			<view class="shop_car_null" v-if="buylist.length==0">
				<view class="" style="background: #FFFFFF;">
					<view class="shop_car_null_img">
						<image src="../../static/img/shop_car.png"></image>
					</view>
					<view class="shop_car_null_text">购物车是空的</view>
					<view class="shop_car_null_button">
						<view class="snapped_up" @tap="classify">马上抢购</view>
						<view class="stroll" @tap="classify">随便逛逛</view>
					</view>
				</view>
				
				<!-- 如果为空，显示推荐组件 -->
				<view class="speity">
					<speity></speity>
				</view>
			</view>
			<view class="shop_car" v-else>
				<!-- 提醒 -->
				<view class="shop_car_remind">
					<view class="icon iconfont icon-laba icon_laba"></view>
					<view class="shop_car_remind_text">当前定位为上海配送站，该购物车只展示当前配送站的产品。</view>
				</view>
				<view class="row" v-for="(row,index) in buylist" :key="index">
					<!-- 删除按钮 -->
					<view class="menu" @tap.stop="deleteGoods(row.id)">
						<view>删除</view>
						<view class="icon shanchu"></view>
					</view>
					<!-- 商品 -->
					<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']"
						@touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)"
						@touchend="touchEnd(index,$event)">
						<!-- checkbox -->
						<view class="checkbox-box" @tap="selected(index)">
							<view class="checkbox">
								<view :class="[row.selected?'on icon iconfont icon-zhengque':'']">
									<!-- <view class="icon iconfont icon-zhengque zhengque"></view> -->
								</view>
							</view>
						</view>
						<!-- 商品信息 -->
						<view class="goods-info" @tap="toGoods(row)">
							<view class="img">
								<image :src="row.img"></image>
							</view>
							<view class="info">
								<view class="title">{{row.name}}</view>
								<view class="spec">{{row.spec}}</view>
								<view class="price-number">
									<view class="price">&yen;{{row.price}}</view>
									<view class="number">
										<view class="sub" @tap.stop="sub(index)">
											<view class="icon jian">-</view>
										</view>
										<view class="input" @tap.stop="discard">
											<input type="number" v-model="row.number" @input="sum($event,index)" />
										</view>
										<view class="add" @tap.stop="add(index)">
											<view class="icon jia">+</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 优惠提醒 -->
				<view class="preferential">
					<view class="text">再买36.10元可使用20元优惠券</view>
					<view class="toclassify" @tap="classify">去凑单></view>
				</view>
				<!-- 脚部菜单 -->
				<view class="footer" :style="{bottom:footerbottom}">
					<view class="checkbox-box" @tap="allSelect">
						<view class="checkbox">
							<view :class="[isAllselected?'on icon iconfont icon-zhengque':'']"></view>
						</view>
						<view class="text">全选</view>
					</view>
					<view class="delBtn" @tap="deleteList" v-if="selectedList.length>0">删除</view>
					<view class="settlement">
						<view class="sum">合计:<view class="money">￥{{sumPrice}}</view>
						</view>
						<view class="btn" @tap="toConfirmation">结算({{selectedList.length}})</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sumPrice: '0.00',
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				showHeader: true,
				selectedList: [],
				isAllselected: false,
				buylist:[],
				goodsList: [{
						id: 1,
						img: '/static/img/goods2.png',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 2,
						img: '/static/img/goods2.png',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 2,
						img: '/static/img/goods2.png',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 2,
						img: '/static/img/goods2.png',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 3,
						img: '/static/img/goods2.png',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 4,
						img: '/static/img/goods2.png',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 5,
						img: '/static/img/goods2.png',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					}
				],
				//控制滑动效果
				theIndex: null,
				oldIndex: null,
				isStop: false
			}
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			//页面显示时，加载订单信息
			uni.getStorage({
				key:'buylist',
				success: (ret) => {
					this.buylist = ret.data;
					this.goodsPrice=0;
					//合计
					let len = this.buylist.length;
					for(let i=0;i<len;i++){
						this.goodsPrice = this.goodsPrice + (this.buylist[i].number*this.buylist[i].price);
					}
					this.deduction = this.int/100;
					this.sumPrice = this.goodsPrice-this.deduction+this.freight;
				}
			});
			console.log(this.buylist)
		},
		onLoad() {
			//兼容H5下结算条位置
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + 'px';
			// #endif
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		methods: {
			//加入商品 参数 goods:商品数据
			joinGoods(goods) {
				/*
				 * 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
				 * 在实际应用上，前端并不会直接插入记录到buylist这一个动作，一般是更新列表和本地列表缓存。
				 * 一般商城购物车的增删改动作是由后端来完成的,
				 * 后端记录后返回前端更新前端缓存
				 */
				let len = this.buylist.length;
				let isFind = false; //是否找到ID一样的商品
				for (let i = 0; i < len; i++) {
					let row = this.buylist[i];
					if (row.id == goods.id) { //找到商品一样的商品
						this.buylist[i].number++; //数量自增
						isFind = true; //找到一样的商品
						break; //跳出循环
					}
				}
				if (!isFind) {
					//没有找到一样的商品，新增一行到购物车商品列表头部
					this.buylist[i].unshift(goods);
				}
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150)
					}
				}
			},
			touchEnd(index, $event) {
				//结束禁止触发效果
				this.isStop = false;
			},
			//控制左滑删除效果-end


			//商品跳转
			toGoods(e) {
				uni.showToast({
					title: '商品' + e.id,
					icon: "none"
				});
				uni.navigateTo({
					url: '/pages/goods_details/goods_details?'
				});
			},
			//跳转确认订单页面
			toConfirmation() {
				let tmpList = [];
				let len = this.buylist.length;
				for (let i = 0; i < len; i++) {
					if (this.buylist[i].selected) {
						tmpList.push(this.buylist[i]);
					}
				}
				if (tmpList.length < 1) {
					uni.showToast({
						title: '请选择商品结算',
						icon: 'none'
					});
					return;
				}
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
			//删除商品
			deleteGoods(id) {
				let len = this.buylist.length;
				for (let i = 0; i < len; i++) {
					if (id == this.buylist[i].id) {
						this.buylist.splice(i, 1);
						break;
					}
				}
				this.selectedList.splice(this.selectedList.indexOf(id), 1);
				this.sum();
				this.oldIndex = null;
				this.theIndex = null;
			},
			// 删除商品s
			deleteList() {
				let len = this.selectedList.length;
				while (this.selectedList.length > 0) {
					this.deleteGoods(this.selectedList[0]);
				}
				this.selectedList = [];
				this.isAllselected = this.selectedList.length == this.buylist.length && this.buylist.length > 0;
				this.sum();
			},
			// 选中商品
			selected(index) {
				this.buylist[index].selected = this.buylist[index].selected ? false : true;
				let i = this.selectedList.indexOf(this.buylist[index].id);
				i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.buylist[index].id);
				this.isAllselected = this.selectedList.length == this.buylist.length;
				this.sum();
			},
			//全选
			allSelect() {
				let len = this.buylist.length;
				let arr = [];
				for (let i = 0; i < len; i++) {
					this.buylist[i].selected = this.isAllselected ? false : true;
					arr.push(this.buylist[i].id);
				}
				this.selectedList = this.isAllselected ? [] : arr;
				this.isAllselected = this.isAllselected || this.buylist.length == 0 ? false : true;
				this.sum();
			},
			// 减少数量
			sub(index) {
				if (this.buylist[index].number <= 1) {
					return;
				}
				this.buylist[index].number--;
				this.sum();
			},
			// 增加数量
			add(index) {
				this.buylist[index].number++;
				this.sum();
			},
			// 合计
			sum(e, index) {
				this.sumPrice = 0;
				let len = this.buylist.length;
				for (let i = 0; i < len; i++) {
					if (this.buylist[i].selected) {
						if (e && i == index) {
							this.sumPrice = this.sumPrice + (e.detail.value * this.buylist[i].price);
						} else {
							this.sumPrice = this.sumPrice + (this.buylist[i].number * this.buylist[i].price);
						}
					}
				}
				this.sumPrice = this.sumPrice.toFixed(2);
			},
			discard() {
				//丢弃
			},
			classify(){
				uni.switchTab({
					url:'../classify/index'
				})
			}

		}
	}
</script>
<style lang="scss">
	page {
		position: relative;
		background-color: #F9F9F9;
	}

	.checkbox-box {
		display: flex;
		align-items: center;

		.checkbox {
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #18CB6D;
			display: flex;
			justify-content: center;
			align-items: center;

			.on {
				width: 35upx;
				height: 35upx;
				border-radius: 100%;
				background-color: #18CB6D;
				font-size: .9rem;
				color: #FFFFFF;
				text-align: center;
				line-height: 35upx;
			}
		}

		.text {
			font-size: 28upx;
			margin-left: 10upx;
		}
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.title {
			font-size: 36upx;
		}

	}

	.place {

		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.shop_car_header {
		background: #FFFFFF;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;

		.shop_car_title {
			font-size: 40rpx;
			font-family: PingFangSC;
			font-weight: 600;
			color: #555;
			line-height: 50px;
			padding-left: 80px;
		}

		.shop_car_title_right {
			font-size: 1rem;
			font-family: PingFangSC;
			font-weight: 600;
			color: #666666;
			padding: 0 20px;
		}
	}

	.goods-list {
		width: 100%;
		padding: 0upx 0 120upx 0;
		background: #F3F4F6;
		margin-top: 180rpx;
		padding-bottom: 200rpx;
		.shop_car_null {
			

			.shop_car_null_img {
				margin: 0 auto;
				padding-top: 25px;
				width: 200px;
				height: 160px;

				image {
					width: 200px;
					height: 160px;
				}
			}

			.shop_car_null_text {
				text-align: center;
				font-size: 1rem;
				font-family: PingFangSC;
				font-weight: 400;
				color: #999999;
				line-height: 10px;
			}

			.shop_car_null_button {
				display: flex;
				align-items: center;
				justify-content: center;

				.snapped_up {
					text-align: center;
					margin: 35px 10px;
					width: 88px;
					height: 26px;
					border: 1px solid #999999;
					border-radius: 6px;
					font-size: 1rem;
					font-family: PingFangSC;
					font-weight: 400;
					color: #999999;
					line-height: 25px;
				}

				.stroll {
					text-align: center;
					margin: 35px 10px;
					width: 88px;
					height: 26px;
					border: 1px solid #F0250F;
					border-radius: 6px;
					font-size: 1rem;
					font-family: PingFangSC;
					font-weight: 400;
					color: #F0250F;
					line-height: 25px;
				}
			}
		}
		.preferential{
			position: fixed;
			bottom: 100rpx;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			width: 94%;
			padding: 14rpx 3%;
			z-index: 10;
			.toclassify{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #EA473F;
			}
			.text{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333;
			}
		}
		.footer {
			width: 96%;
			padding-left:4%;
			background-color: #fbfbfb;
			height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			position: fixed;
			bottom: 0upx;
			z-index: 5;

			.delBtn {
				border: solid 1upx #f06c7a;
				color: #f06c7a;
				padding: 0 30upx;
				height: 50upx;
				border-radius: 30upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.settlement {
				width: 60%;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.sum {
					width: 50%;
					font-size: 28upx;
					margin-right: 10upx;
					display: flex;
					justify-content: flex-end;
					color: #EA473F;

					.money {
						font-weight: 600;
						color: #EA473F;
					}
				}

				.btn {
					margin-left: 30upx;
					padding: 0 30upx;
					height: 100upx;
					background: linear-gradient(90deg, #46E3BC, #32AADF);
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
		.shop_car_remind{
			display: flex;
			align-items: center;
			background: #EBEBEB;
			width: 100%;
			position: fixed;
			top: 96rpx;
			left: 0;
			z-index: 10;
			
			.icon_laba{
				padding: 0 5px 0 10px;
				font-size: 42rpx;
				color: #EA473F;
				// font-weight: bold;
			}
			.shop_car_remind_text{
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #EA473F;
				line-height: 35px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
		.row {
			width: calc(100%);
			// height: calc(22vw + 40upx);
			height: 220upx;
			margin: 20upx auto;

			border-radius: 0upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;

			.menu {
				.icon {
					color: #fff;
					// font-size: 25upx;
				}

				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}

			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-30%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;

				.checkbox-box {
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}

				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info {
					width: 100%;
					display: flex;
					padding-right: 20upx;

					.img {
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;

						image {
							width: 22vw;
							height: 22vw;
						}
					}

					.info {
						width: 100%;
						height: 22vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;

						.title {
							font-size: .9rem;
							font-family: PingFangSC;
							font-weight: 400;
							color: #333333;
							line-height: 40upx;
							width: 100%;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}

						.spec {
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}

						.price-number {
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							height: 60upx;

							.price {
								font-size: 1rem;
								font-family: PingFang SC;
								font-weight: bold;
								color: #EA473F;
							}

							.number {
								display: flex;
								justify-content: center;
								align-items: flex-end;

								.input {
									width: 70upx;
									height: 50upx;
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
									width: 70upx;
									height: 50upx;
									background-color: #FFFFFF;
									border-radius: 5upx;
									border: 1px solid #666666;
									font-size: 40upx;
									.icon {
										font-size: 40upx;
										width: 70upx;
										height: 50upx;
										display: flex;
										justify-content: center;
										align-items: center;
										color: #666666;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
