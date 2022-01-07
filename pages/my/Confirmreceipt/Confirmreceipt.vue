<template>
	<!-- 确认收货 -->
	<view class="unorder">
		<view class="unorder-header">
			<view class="unorder-header-box">
				<text>交易成功</text>
				<image class="unorder-header-img" src="../../../static/img/user.png" mode=""></image>
			</view>
		</view>
		<view class="unorder-header-fotter">
			<view class="unorder-header-fotter-box">
				<view class="unorder-header-text">
					<text class="icon iconfont">&#xe69e;</text>
					<text style="margin-left: 20rpx;">暂无物流信息</text>
				</view>
				<view class="unorder-header-datatime">
					<text>2018-06-22</text>
					<text style="margin-left: 20rpx;">13:44:10</text>
				</view>
			</view>
			<view class="unorder-icon">
				<text class="icon iconfont">&#xe7eb;</text>
			</view>
		</view>
		<Orderdetails></Orderdetails>
		<view class="footer-btn">
			<view class="Topay" @click="goevaluate()">
				去评价
			</view>
			<view class="Topay">
				<navigator>再来一单</navigator>
			</view>
			<view class="btn"@click="refund()">
				申请退款
			</view>
		</view>
	</view>
</template>

<script>
	import Orderdetails from "../../../components/Orderdetails/index.vue"
	export default{
		// 接收订单号
		onLoad(option){
			this.Ordernum=option.id
		},
		data(){
			return {
				Ordernum:"",
			}
		},
		components:{Orderdetails},
		methods:{
			refund(id){
				uni.navigateTo({
					url:"/pages/my/Applyforrefund/Applyforrefund?id="+id
				})
			},
			goevaluate(id){
				uni.navigateTo({
					url:"/pages/my/goevaluate/goevaluate?id="+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unorder{
		.unorder-header{
			height: 200rpx;
			background-image: linear-gradient(to left,#46E3BC,#32AADF );
			padding-left: 80rpx;
			padding-right: 84rpx;
			line-height: 200rpx;
			color: #FFFFFF;
			.unorder-header-box{
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
			}
			.unorder-header-img{
				margin-top: 13rpx;
				width: 225rpx;
				height: 175rpx;
			}
		}
		.unorder-header-fotter{
			height: 110rpx;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #E7E7E7 ;
			background-color: #FFFFFF;
			.unorder-icon{
				height: 110rpx;
				line-height: 110rpx;
				.icon{
					font-size: 40rpx;
					color: #999999;
				}
			}
			.unorder-header-text{
				color: #46E3BC;
				font-size: 26rpx;
			}
			.unorder-header-datatime{
				margin-top: 20rpx;
				color: #999999;
			}
			
		}
		.footer-btn{
			margin-top: 20rpx;
			height: 98rpx;
			background-color: #FFFFFF ;
			.btn{
				width: 158rpx;
				height: 58rpx;
				text-align: center;
				line-height: 58rpx;
				border: 1rpx solid #EB382D ;
				color: #EB382D ;
				border-radius: 8rpx;
				float: right;
				margin-top: 20rpx;
				margin-right: 20rpx;
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
</style>
