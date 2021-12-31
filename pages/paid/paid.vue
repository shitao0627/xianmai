<template>
	<view class="paid">
		<view class="paid_header">
			<view class="portrait">
				<image src="../../static/img/user.png"></image>
			</view>
			<view class="text">代付订单已创建成功，发送给好友帮你付款吧～</view>
		</view>
		<!-- 代付金额及产品 -->
		<view class="paid_main">
			<view class="title">代付金额</view>
			<view class="price">&yen;7099</view>
			<view class="preferential">(优惠已减300元)</view>
			<view class="button">发送给微信好友</view>
			<view class="text">如果订单申请退款，已支付金额将原路退还给你的好友</view>
			<!-- 购买商品列表 -->
			<view class="goods_list">
				<view class="g-item" v-for="(item,key) in buylist"  v-show="key<num">
					<image :src="item.img"></image>
					<view class="right">
						<view class="title clamp">{{item.name}}</view>
						<view class="spec">{{item.spec}}</view>
						<view class="price-box">
							<text class="price">￥{{item.price}}</text>
							<text class="number">x{{item.number}}</text>
						</view>
					</view>
				</view>
				<!-- 点击查看更多 -->
				<view class="more" @tap="more">
					{{txt}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buylist:[],
				isShow: true,
				txt: '查看更多',
				num: 1
			}
		},
		onLoad(options) {
			console.log(options);
			this.buylist = JSON.parse(options.buylist)          
		},
		methods: {
			more(){
				this.isShow = !this.isShow;    
				this.num = this.isShow? 1: this.buylist.length;
				this.txt = this.isShow?  '查看更多':'收起'
			}
		},
	}
</script>

<style lang="scss">
	.paid{
		.paid_header{
			background: linear-gradient(90deg, #46E3BC, #32AADF);
			width: 100%;
			height: 300rpx;
			padding: 60rpx 0 130rpx 0;
			.portrait{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin: 30rpx auto;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.text{
				font-size: 30rpx;
				font-family: PingFangSC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
			}
		}
		.paid_main{
			position: relative;
			top: -160rpx;
			left: 0;
			margin: 0 30rpx;
			padding: 30rpx;
			border-radius: 14rpx;
			background: #FFFFFF;
			.title{
				text-align: center;
				font-size: 32rpx;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
				padding: 18rpx 0;
			}
			.price{
				text-align: center;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #EA473F;
			}
			.preferential{
				text-align: center;
				font-size: 28rpx;
				font-family: PingFangSC;
				font-weight: 500;
				color: #999999;
				padding-bottom: 30rpx;
			}
			.button{
				background: linear-gradient(90deg, #46E3BC, #32AADF);
				border-radius: 12rpx;
				color: #FFFFFF;
				font-size: 34rpx;
				text-align: center;
				line-height: 90rpx;
			}
			.text{
				font-size: 28rpx;
				font-family: PingFangSC;
				font-weight: 500;
				color: #999999;
				padding: 20rpx 0;
			}
		}
		.goods_list{
			padding-top: 10rpx;
			border-top: 1px solid #e7e7e7;
			.g-item {
				display: flex;
				margin: 20upx 10upx;
					
				image {
					flex-shrink: 0;
					display: block;
					width: 180upx;
					height: 180upx;
					border-radius: 4upx;
				}
					
				.right {
					flex: 1;
					padding-left: 24upx;
					overflow: hidden;
				}
					
				.title {
					font-size: 30rpx;
					line-height: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					padding: 0;
				}
					
				.spec {
					font-size: 28rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #999999;
					line-height: 50rpx;
				}
					
				.price-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 32upx;
					
					padding-top: 10upx;
					
					.price {
						margin-bottom: 4upx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #EA473F;
					}
					.number{
						font-size: 32rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #333333;
					}
				}
					
				.step-box {
					position: relative;
				}
			}
			.more{
				font-size: 26rpx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #999999;
				text-align: center;
				position: relative;
				bottom: -20rpx;
			}
		}
	}
	
</style>
