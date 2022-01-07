<template>
	<view class="successOk" >
		<view class="Navigation">
			评价成功
			<view class="btnok" @click="over">
				完成
			</view>
		</view>
		<view class="btn">
			<view class="btn-box">
				<view class="btn-left" @click="goevaluation">
					查看评价
				</view>
				<view class="btn-right">
					立即追加
				</view>
			</view>
		</view>
		<view class="Line">
			<view class="text">
				这些订单等待追加评价
			</view>
		</view>
		<view class="footer">
			<view class="footer-content">
				<view class="footer-img">
					<image class="img" src="../../static/img/goods2.png" mode=""></image>
				</view>
				<view class="footer-text">
					按摩精油通经络全身推油身 体肩颈足部开背推拿刮痧...salfkhlkgfhlkdghlkfhlakfhlsakfh
				</view>
				<view class="footer-btn" >
					写追加
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			goevaluation(){
				uni.navigateTo({
					url:"/pages/my/myorder/myorder"
				})
			},
			over(){
				uni.switchTab({
					url:"/pages/my/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.successOk{
		.Navigation{
			height: 88rpx;
			background-image: linear-gradient(to left,#32AADF,#46E3BC);
			color: #FFFFFF ;
			text-align: center;
			line-height: 88rpx;
			font-size: 34rpx;
			position: relative;
			.btnok{
				position: absolute;
				right: 20rpx;
				top: 0;
				z-index: 999;
				font-size: 28rpx;
			}
		}
		.btn{
			height: 216rpx;
			background-color: #FFFFFF ;
			padding-left: 64rpx;
			padding-right: 64rpx;
			.btn-box{
				display: flex;
				justify-content: space-between;
				font-size: 32rpx;
				.btn-left{
					margin-top: 72rpx;
					height: 72rpx;
					width: 248rpx;
					background-image: linear-gradient(to left,#32AADF,#46E3BC);
					color: #FFFFFF ;
					border-radius: 36rpx;
					text-align: center;
					line-height: 72rpx;
				}
				.btn-right{
					margin-top: 72rpx;
					height: 72rpx;
					width: 248rpx;
					color: #46E3BC;
					border: 1rpx solid #46E3BC; 
					border-radius: 36rpx;
					text-align: center;
					line-height: 72rpx;
				}
			}
		}
	    .Line{
			margin-left: 20rpx;
			margin-right: 20rpx;
			margin-top: 44rpx;
			height: 1rpx;
			background-color: #DDDDDD  ;
			position: relative;
			.text{
				width: 450rpx;
				left: 130rpx;
				top: -44rpx;
				height: 88rpx;
				position: absolute;
				background-color: #F3F4F6;
				border: 1px solid #F3F4F6;
				text-align: center;
				line-height: 88rpx;
			}
		}
	    .footer{
			margin-top: 44rpx;
			padding: 20rpx;
			border-bottom: 1rpx solid #E7E7E7 ;
			background-color: #FFFFFF ;
			.footer-content{
				display: flex;
				justify-content: space-between;
				.footer-img{
					width: 130rpx;
					height: 130rpx;
					.img{
						width: 130rpx;
						height: 130rpx;
					}
				}
				.footer-text{
					position: relative;
					top: 32rpx;
					right: 40rpx;
					height: 72rpx;
					text-align: left;
					width: 300rpx;
					text-align: center;
					font-size: 26rpx;
					color: #333333 ;
					display:-webkit-box;
					    -webkit-box-orient:vertical;
					    -webkit-line-clamp:2;
					    overflow:hidden;
				}
				.footer-btn{
					margin-top: 32rpx;
					width: 150rpx;
					height: 60rpx;
					border: 1px solid #46E3BC ;
					color:#46E3BC ;
					border-radius: 30rpx;
					text-align: center;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
