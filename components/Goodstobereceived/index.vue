<template>
	<!-- 待收货 -->
	<view class="Pendingpayment">
		<scroll-view scroll-y="true" style="width: 100%;height: 800px;">
		<view class="Pendingpayment-box" v-for="item in list" :key="item.id">
			<view class="Pendingpayment-header">
				<view class="Pendingpayment-number">
					订单号:{{item.orderNum}}
				</view>
				<view class="Pendingpayment-state">
					待收货
				</view>
			</view>
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
			<view class="Pendingpayment-footer">
				<view class="Pendingpayment-data-box">
					<view class="Pendingpayment-data">
						{{item.data}}
					</view>
					<view class="Pendingpayment-time">
						{{item.time}}
					</view>
				</view>
				<view class="Pendingpayment-number-box">
					<view class="Pendingpayment-number">
						共{{0}}件商品
					</view>
					<view class="Pendingpayment-money">
						合计 : ￥{{item.goods_list|fillter}}
					</view>
				</view>
			</view>
			<view class="Pendingpayment-btn-box">
				<view class="Topay" @click="Confirmreceipt(item.orderNum)">
					确认收货
				</view>
				<view class="unorder" @click="refund(item.orderNum)">
					<view>申请退款</view>
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "../../../static/img/goods2.png",
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
				},{
					id: 2,
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
				},{
					id: 3,
					orderNum: 12256,
					goods_list: [{
						id: 1,
						title: "按摩精油通经络全身推油身体颈肩足部开开开开",
						goods_title: "大马士革玫瑰纯露350ml",
						img: "../../../static/img/goods2.png",
						newmoney: "98.00",
						oldmoney: "197.00",
						number: 1,
					},{
						id: 2,
						title: "按摩精油通经络全身推油身体颈肩足部开开开开",
						goods_title: "大马士革玫瑰纯露350ml",
						img: "../../../static/img/goods2.png",
						newmoney: "98.00",
						oldmoney: "197.00",
						number: 1,
					},{
						id: 3,
						title: "按摩精油通经络全身推油身体颈肩足部开开开开",
						goods_title: "大马士革玫瑰纯露350ml",
						img: "../../../static/img/goods2.png",
						newmoney: "98.00",
						oldmoney: "197.00",
						number: 1,
					},],
					data: "2022-01-04",
					time: "11:50:19",
				},{
					id: 4,
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
				},{
					id: 5,
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
				},{
					id: 6,
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
		},
		filters:{
			// 过滤结算总价
			fillter(data){
				var arr = 0;
			data.map(item=>{
					arr+=item.number*item.newmoney
				})
				return arr
			}
		},
		methods:{
			refund(id){
				uni.navigateTo({
					url:"/pages/my/Applyforrefund/Applyforrefund?id="+id
				})
			},
			Confirmreceipt(id){
				uni.navigateTo({
					url:"/pages/my/Confirmreceipt/Confirmreceipt?id="+id
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.Pendingpayment {
		.Pendingpayment-box {
			margin-top: 20rpx;
			background-color: #FFFFFF;

			.Pendingpayment-header {
				width: 710rpx;
				margin-left: 20rpx;
				height: 80rpx;
				display: flex;
				text-align: center;
				line-height: 80rpx;
				justify-content: space-between;

				.Pendingpayment-number {
					color: #333333;
					font-size: 26rpx;
				}

				.Pendingpayment-state {
					color: #46E3BC;
					font-size: 24rpx;
				}
			}
			.Pendingpayment-list-box{
				width: 750rpx;
				height: 226rpx;
				background-color: #FAFAFA ;
				display: flex;
				.Pendingpayment-img-box{
					margin-left: 20rpx;
					width: 185rpx;
					height: 185rpx;
					.Pendingpayment-img{
						width: 185rpx;
						height: 185rpx;
					}
				}
				.Pendingpayment-text-box{
					width: 495rpx;
					margin-left: 20rpx;
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
			.Pendingpayment-footer{
				width: 750rpx;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				text-align: center;
				line-height: 80rpx;
				.Pendingpayment-data-box{
					margin-left: 20rpx;
					font-size: 24rpx;
					color: #999999;
					display: flex;
					width: 250rpx;
					justify-content: space-between;
				}
				.Pendingpayment-number-box{
					margin-right: 20rpx;
					width: 288rpx;
					display: flex;
					justify-content: space-between;
					font-size: 26rpx;
					color: #333333;
					font-weight: 600;
				}
			}
			.Pendingpayment-btn-box{
				height: 108rpx;
				.unorder{
					width: 158rpx;
					height: 58rpx;
					border: 1rpx solid #EB382D;
					text-align: center;
					line-height: 58rpx;
					color: #EB382D;
					float: right;
					margin-top: 25rpx;
					margin-right: 21rpx;
					border-radius: 8rpx;
				}
				.Topay{
					width: 158rpx;
					height: 58rpx;
					border: 1rpx solid #46E3BC;
					text-align: center;
					line-height: 58rpx;
					color: #46E3BC;
					float: right;
					margin-top: 25rpx;
					margin-right: 21rpx;
					border-radius: 8rpx;
				}
			}
		}
	}
</style>

