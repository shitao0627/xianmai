<template>
	<!-- 订单详情 -->
	<view class="Orderdetails">
		<view class="address-box">
			<view class="address-icon">
				<text class="icon iconfont">&#xe641;</text>
			</view>
			<view class="address-text">
				<view class="address-tel">
				<view class="address-name">
					收货人: 顾琪
				</view>
				<view >
					13156585962
				</view>
				</view>
				<view class="address">
					收货地址: 
					<text class="address-details">上海</text> 
					<text class="address-details">上海市青浦区</text> 
					<text class="address-details"> 赵巷镇</text> 
					<text class="address-details">青浦区赵巷镇崧秀路289号B4栋</text>
				</view>
			</view>
		</view>
		<view class="Productdetails-box">
		<view  v-for="item in list">
			<view class="Pendingpayment-list-box" v-for="items in item.goods_list" :key="items.id">
					<view class="Pendingpayment-img-box">
						<image :src="items.img" class="Pendingpayment-img"></image>
					</view>
					<view class="Pendingpayment-text-box">
						<view class="Pendingpayment-title">
							{{items.title}}
						</view>
						<view class="Pendingpayment-goods_title">
							{{items.goods_title}}
						</view>
						<view class="Pendingpayment-money">
							<view class="Pendingpayment-money-box">
							<view class="Pendingpayment-new">
								￥{{items.newmoney}}
							</view>
							<view class="Pendingpayment-old">
								{{items.oldmoney}}
							</view>
							</view>
							<view class="Pendingpayment-num">
								x{{items.number}}
							</view>
						</view>
					</view>
			</view>
		</view>
		<view class="Productdetails-text">
			<view class="Productdetails-box">
				<view class="Productdetails-title">
					商品总额
				</view>
				<view class="Productdetails-money">
					￥199.0
				</view>
			</view>
			<view class="Productdetails-box">
				<view class="Productdetails-title">
					运费（快递）
				</view>
				<view class="Productdetails-money">
					￥199.0
				</view>
			</view>
			<view class="Productdetails-box">
				<view class="Productdetails-title">
					优惠券
				</view>
				<view class="Productdetails-money">
					￥199.0
				</view>
			</view>
			<view class="Productdetails-box">
				<view class="Productdetails-title">
					金币抵扣
				</view>
				<view class="Productdetails-money">
					￥199.0
				</view>
			</view>
			<view class="Productdetails-confirm">
				<text>确认收货可获现金返点：¥9.0 </text>
			</view>
			<view class="Productdetails-footer">
				<text>共1件商品  实际付款 （含运费）：¥97.0</text>
			</view>
		</view>
		</view>
		<view class="Orderdetails-fotter">
			<view class="fotter-id-box">
				<view class="fotter-id">
					订单编号 : 123456789
				</view>
				<view class="btn">
					复制
				</view>
			</view>
			<view class="fotter-id-box">
				<view class="fotter-id">
					订单创建时间 : 2021-07-23
				</view>
			</view>
			<view class="fotter-id-box">
				<view class="fotter-id">
				    实际付款时间 : 2021-07-23
				</view>
			</view>
			<view class="footer">
				支付方式 ： 支付宝交易
			</view>
			<view class="footer" style="border: 0;">
				配送方式 ： 顺丰速运
			</view>
			<view class="footer" style="border-bottom: 0;">
				发票类型 ： 不开发票
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				list: [{
					id: 1,
					orderNum: 12256,
					goods_list: [{
						id: 1,
						title: "按摩精油通经络全身推油身体颈肩足部开开开开",
						goods_title: "大马士革玫瑰纯露350ml",
						img: "../../../static/img/goods2.png",
						newmoney: "98.00",
						oldmoney: "197.00",
						number: 1,
					}],
					data: "2022-01-04",
					time: "11:50:19",
				}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Orderdetails{
		.address-box{
			height: 190rpx;
			display: flex;
			padding: 20rpx;
			background-color: #FFFFFF;
			color: #666666;
			.address-icon{
				width: 86rpx;
				height: 190rpx;
				margin-top: 68rpx;
				.icon{
					font-size: 50rpx;
				}
			}
			.address-text{
				margin-top: 28rpx;
			.address-tel{
				width: 640rpx;
				height:65rpx;
				display: flex;
				justify-content: space-between;
				line-height: 65rpx;
				font-size: 26rpx;
			}
			.address{
				height: 65rpx;
				.address-details{
					margin-left: 20rpx;
					font-size: 13rpx;
				}
			}
			}
			
		}
		.Productdetails-box{
			margin-top: 20rpx;
			background-color: #FFFFFF;
		.Pendingpayment-list-box{
			width: 750rpx;
			height: 190rpx;
			display: flex;
			padding: 20rpx;
			border-bottom: 1rpx solid #E0E0E0;
			.Pendingpayment-img-box{
				width: 185rpx;
				height: 185rpx;
				.Pendingpayment-img{
					width: 185rpx;
					height: 185rpx;
				}
			}
			.Pendingpayment-text-box{
				margin-left: 20rpx;
				width: 495rpx;
				.Pendingpayment-title{
					font-size: 26rpx;
					color: #222222;
					font-weight: 600;
				}
				.Pendingpayment-goods_title{
					margin-top: 20rpx;
					font-size: 24rpx;
					color: #999999 ;
				}
				.Pendingpayment-money{
					width: 495rpx;
					display: flex;
					margin-top: 25rpx;
					justify-content: space-between;
				.Pendingpayment-money-box{
					width: 200rpx;
					height: 40rpx;
					line-height: 40rpx;
					display: flex;
					justify-content: space-between;
					.Pendingpayment-new{
						font-size: 30rpx;
						color: #333333;
						font-weight: 600;
					}
					.Pendingpayment-old{
						font-size: 24rpx;
						color: #999999;
						text-decoration: line-through;
					}
				}
			}
			}
		}
		 .Productdetails-text{
			 height: 298rpx;
			 background-color: #FFFFFF ;
			 padding: 21rpx;
			 .Productdetails-box{
				 display: flex;
				 justify-content: space-between;
				 color: #666666;
			 }
			 .Productdetails-money{
				 color: #999999 ;
				 font-size: 24rpx;
			 }
			 .Productdetails-confirm{
				 text-align: right;
				 font-size: 28rpx;
				 color: #999999 ;
				 margin-top: 10rpx;
			 }
			 .Productdetails-footer{
				 text-align: right;
				 font-size:28rpx;
				 color: #333333;
				 margin-top: 10rpx;
			 }
		 }
		}
		.Orderdetails-fotter{
			padding: 20rpx;
			margin-top: 20rpx;
			height: 418rpx;
			color: #666666 ;
			background-color: #FFFFFF ;
			.fotter-id-box{
				display: flex;
				justify-content: space-between;
				.btn{
					width: 120rpx;
					height: 42rpx;
					border: 1px solid #999999 ;
					text-align: center;
					line-height: 42rpx;
					border-radius: 21rpx;
				}
				margin-bottom: 20rpx;
			}
			.footer{
				height: 85rpx;
				line-height: 85rpx;
				border-top: 1rpx solid #E7E7E7;
				border-bottom: 1rpx solid #E7E7E7;
			}
		}
		
	}
</style>
