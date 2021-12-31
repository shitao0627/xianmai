<template>
	<view class="shopping">
		
		<!-- 如果为空不显示 -->
		<!-- <view class="shop_car_null" v-if="car==='null'"> -->
		<view class="shop_car_null">
			<!-- 头部标题 -->
			<view class="shop_car_header">
				<view></view>
				<view class="shop_car_title">购物车</view>
				<view class="shop_car_title_right">编辑</view>
			</view>
			<view class="shop_car_null_img">
				<image src="../../static/img/shop_car.png"></image>
			</view>
			<view class="shop_car_null_text">购物车是空的</view>
			<view class="shop_car_null_button">
				<view class="snapped_up">马上抢购</view>
				<view class="stroll">随便逛逛</view>
			</view>
			<!-- 如果为空，显示推荐组件 -->
			<view class="speity">
				<speity></speity>
			</view>
		</view>
		<!-- 如果不为空显示 -->
		<view class="shop_car">
			<!-- 头部标题 -->
			<view class="shop_car_header">
				<view></view>
				<view class="shop_car_title">购物车(3)</view>
				<view class="shop_car_title_right">管理</view>
			</view>
			<!-- 提醒 -->
			<view class="shop_car_remind">
				<view class="icon iconfont icon-laba icon_laba"></view>
				<view class="shop_car_remind_text">当前定位为上海配送站，该购物车只展示当前配送站的产品。</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// car:null
				
			}
		},
		methods: {
	
		}
	}
</script>

<style lang="scss">
	.shopping{
		
		.shop_car_null{
			background: #FFFFFF;
			.shop_car_header{
				background: #FFFFFF;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.shop_car_title{
					font-size: 1.2rem;
					font-family: PingFangSC;
					font-weight: 600;
					color: #333333;
					line-height: 50px;
					padding-left: 80px;
				}
				.shop_car_title_right{
					font-size: 1rem;
					font-family: PingFangSC;
					font-weight: 600;
					color: #666666;
					padding: 0 20px;
				}
			}
			.shop_car_null_img{
				margin: 0 auto;
				padding-top: 25px;
				width: 200px;
				height: 160px;
				image{
					width: 200px;
					height: 160px;
				}
			}
			.shop_car_null_text{
				text-align: center;
				font-size: 1rem;
				font-family: PingFangSC;
				font-weight: 400;
				color: #999999;
				line-height: 10px;
			}
			.shop_car_null_button{
				display: flex;
				align-items: center;
				justify-content: center;
				.snapped_up{
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
				.stroll{
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
		.shop_car{
			background: #FFFFFF;
			.shop_car_header{
				background: #FFFFFF;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.shop_car_title{
					font-size: 1.2rem;
					font-family: PingFangSC;
					font-weight: 600;
					color: #333333;
					line-height: 50px;
					padding-left: 80px;
				}
				.shop_car_title_right{
					font-size: 1rem;
					font-family: PingFangSC;
					font-weight: 600;
					color: #666666;
					padding: 0 20px;
				}
			}
			.shop_car_remind{
				display: flex;
				align-items: center;
				background: #EBEBEB;
				width: 100%;
				.icon_laba{
					padding: 0 5px 0 10px;
					font-size: 1.5rem;
					color: #EA473F;
					// font-weight: bold;
				}
				.shop_car_remind_text{
					font-size: .7rem;
					font-family: PingFang SC;
					font-weight: bold;
					color: #EA473F;
					line-height: 35px;
				}
			}
		}
	}
	/* css自定义改变滑动按钮样式 */
	.shopBox>>>.uni-swipe_button {
		border-radius: 16rpx 0 0 16rpx !important;
	}
</style>
