<template>
	<view class="">
		<!--头部搜索-->
		<view class="classify_top">
			<view class="classify_search">
				<text class="icon iconfont icon-sousuo icon_search"></text>
				<text class="search_text">搜索你要的商品</text>
			</view>
			<view class="icon iconfont icon-fenxiang icon_fenxiang"></view>
		</view>
		
		<!--购买历史-->
		<view class="classify_record">
			<view class="classify_shop">我的常购</view>
			<view class="classify_shop_list">
				<view class="classify_shop_list_card" v-for="item in record">
					<image :src="item.src"></image>
				</view>
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="classside">
			<scroll-view @scroll="leftScroll" class="left_view p_r" scroll-y :style="{ height: scrollH + 'px' }"
				:scroll-into-view="leftScrollTop()">
				<block v-for="(item, index) in dataArr" :key="index">
					<view :class="[left_selectIndex == index ? 'left_item_s' : '', 'left_item']" :id="'left_' + index"
						@click="leftTap({ item, index })">{{ item.name }}</view>
				</block>
				<view class="seletItem" :style="{ top: left_selectIndex * 60 + 'px' }"></view>
				<view class="" style="height: 80px;">
					<!-- 站位 -->
				</view>
			</scroll-view>
		
			<scroll-view @scroll="rightScroll" class="right_view" scroll-y :style="{ height: scrollH + 'px' }"
				:scroll-into-view="'left_' + right_selectIndex" scroll-with-animation>
				<block v-for="(item, index) in dataArr" :key="index">
					<view :ref="'left_' + index" class="right_item " :id="'left_' + index">
						<text class="right_item_title ">{{ item.name }}</text>
						<view class="right_item_view">
							<view class="item" v-for="(subitem, subindex) in item.subArr" :key="subindex"
								@click="rightTap(item,subitem)">
								<image :src="subitem.img" :style="{ width: '100%', height: subItemW + 'px' }"></image>
								<text>{{ subitem.name }}</text>
							</view>
						</view>
					</view>
				</block>
				<view class="" :style="{ height: placeholderH + 'px' }">
					<!-- 站位 -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>


<script>
	import testdata from './testdata.js';
	export default {
		data() {
			return {
				left_scrolly: 0,
				// 底部有tabar-88 scrollH: uni.getSystemInfoSync().screenHeight-88
				scrollH: uni.getSystemInfoSync().screenHeight,
				subItemW: parseInt((uni.getSystemInfoSync().screenWidth * (2 / 3) - 15 * 2 - 24) / 3),
				left_selectIndex: 0,
				right_selectIndex: 0,
				ttscrollH: 0, //总高度
				placeholderH: 0, //占位高度

				heighArr: [],
				dataArr: testdata,
				record:[{
					src:'../../static/img/goods2.png'
				},{
					src:'../../static/img/goods.png'
				},{
					src:'../../static/img/goods2.png'
				},{
					src:'../../static/img/goods2.png'
				},{
					src:'../../static/img/goods.png'
				},]
			};
		},
		onLoad() {
			let self = this;
			setTimeout(function() {
				self.computerH();
			}, 100);
		},
		methods: {
			leftTap: function(e) {
				this.left_selectIndex = e.index;
				this.right_selectIndex = e.index;
			},
			// 左侧滚动
			leftScroll: function(e) {
				this.left_scrolly = e.detail.scrollTop;
			},
			// 左侧顶部高度
			leftScrollTop: function(e) {
				let b = this.left_selectIndex * 60 + 80;
				let c = b - this.scrollH;

				if (c > 0) {
					return 'left_' + this.left_selectIndex;
				}

				if (this.left_scrolly > b - 80) {
					return 'left_' + this.left_selectIndex;
				}
			},

			// 右边点击
			rightTap: function(item, subitem) {
				 uni.navigateTo({
					// url: 'test?id=1&name=uniapp'  c传递参数
		
					url:"/pages/goods_list/goods_list"
		
				})
				// uni.showModal({
				// 	title: `一级:${item.name}\n二级:${subitem.name}`,
				// 	showCancel: false
				// });
			},
			rightScroll: function(e) {
				let scrollH = e.detail.scrollTop + 30;
				let cc = this.ttscrollH - this.scrollH;

				let a = 0;
				let findInx = this.heighArr.findIndex(function(itemH, i) {
					a = a + itemH;
					return a > scrollH;
				});

				this.left_selectIndex = findInx;
			},

			// 计算高度
			computerH: function() {
				this.ttscrollH = 0;
				for (let item of this.dataArr) {
					let title_lineH = 49; //rpx
					let subNum = item.subArr.length;
					let subImgH = this.subItemW; //rpx
					let subTitleH = 40; //rpx
					let rowSpecH = 8; //rpx
					let rowN = subNum % 3;
					let rowSpecNum = parseInt(subNum / 3) + parseInt(rowN > 0 ? 1 : 0);
					let totalRpx = title_lineH + (subImgH + subTitleH) * rowSpecNum + rowSpecH * (rowSpecNum - 1);
					this.heighArr.push(totalRpx);
					this.ttscrollH = this.ttscrollH + totalRpx;
				}

				this.placeholderH = this.scrollH - this.heighArr[this.heighArr.length - 1];

				//以下方法也可以  但是通用性不高 上面方法 计算麻烦但是适合各种平台
				// let self=this
				// var selectorQuery = uni.createSelectorQuery()
				// selectorQuery.selectAll('.right_item').boundingClientRect(data => {
				// 	self.heighArr = data.map(item => {
				// 		return {
				// 			top: Math.round(item.top),
				// 			height: Math.round(item.height)
				// 		}
				// 	})
				// }).exec()
				// console.log('ttscrollH',this.$refs.left_0)
			}
		}
	};
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	// 顶部搜索框
	.classify_top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid #E7E7E7;
		background: #FFFFFF;
		.classify_search{
			width: 630rpx;
			background: #EDEDED;
			border-radius: 32px;
			display: flex;
			align-items: center;
			.icon_search{
				font-size: 1.5rem;
				color: #999999;
				padding: 3px 10px;
			}
			.search_text{
				font-size: 1rem;
				color: #999999;
				line-height: 35px;
			}
		}
		.icon_fenxiang{
			font-size: 1.8rem;
			color: #666666;
			
		}
	}
	// 我的常购
	.classify_record{
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		background: #FFFFFF;
		.classify_shop{
			width: 210rpx;
			box-shadow: 0px 5px 5px 0px #E7E7E7;
			font-size: .9rem;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			text-align: center;
			line-height: 60px;
			
		}
		.classify_shop_list{
			width: 530rpx;
			height: 60px;
			display: flex;
			align-items: center;
			// justify-content: space-between;
			.classify_shop_list_card{
				background: #E7E7E7;
				border-radius: 50%;
				width: 43px;
				height: 43px;
				border-radius: 50%;
				margin-left: 10px;
				image{
					width: 43px;
					height: 43px;
					border-radius: 50%;
				}
			}
		}
	}
	// 分类列表
	.classside {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: auto;
		position: absolute;
		left: 0rpx;
		right: 0rpx;
		overflow: hidden;
	}

	.left_view {
		background-color: #FFFFFF;
		position: relative;
		.uni-scroll-view{
			width: 220rpx;
			
		}
		// 蒙版
		.seletItem {
			height: 60px;
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			z-index: 10;
			right: 0rpx;
			background-color: rgba(255, 255, 255, 0.3);
			// background: #F8F8F8;
			transition: top 0.2s linear;
			display: flex;
			align-items: center;
			
			&::before {
				content: '';
				width: 8rpx;
				height: 35%;
				background-color: #24c06a;
				left: 0rpx;
				// border-radius: 0px 100rpx 100rpx 0px;
				background: linear-gradient(0deg, #46E3BC, #32AADF);
			}
		}

		.left_item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60px;
			margin-bottom: 0rpx;
			position: relative;
			font-weight: bold;
			font-size: 30rpx;color: #444;
		}

		.left_item_s {
			background-color: #f9f9f9;
			color: #46E3BC;
			font-weight: bold;
			position: relative;
			border-radius: 0px 5px 5px 0;
		}
	}

	.right_view {
		background-color: #F9F9F9;
		padding: 0rpx 12px;
		width: 540rpx;
		.right_item {
			background: #FFFFFF;
			border-radius: 8px;
			margin: 10px 0px;
			padding: 10px;
			.right_item_title {
				display: block;
				color: #555;
				line-height: 38px;
				font-size: 34rpx;
				font-weight: bold;
			}

			.right_item_view {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: auto;
				grid-gap: 8px 15px;

				.item {
					display: flex;
					flex-flow: column nowrap;
					align-items: center;
					image{
						border-radius: 14rpx;
					}
					text {
						color: #333;
						line-height: 58rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}
				}
			}
		}
	}
</style>
