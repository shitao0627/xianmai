<template>
	<!-- 暂时无收藏 -->
	<view class="uncollection">
		<view class="uncollection-logo-box">
			<image class="uncollection-logo" src="@/static/img/login_banner.png"></image>
			<view class="uncollection-text">暂无收藏</view>
			<view class="uncollection-btn-box">
				<view class="uncollection-left-btn">
					<!-- 添加跳转路由 -->
					<navigator>
						马上抢购
					</navigator>
				</view>
				<view class="uncollection-right-btn">
					<navigator>
						<!-- 添加跳转路由 -->
						随便逛逛
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.uncollection{
		.uncollection-logo-box{
			.uncollection-logo{
				margin-left: 244rpx;
				margin-top: 150rpx;
				width: 262rpx;
				height: 194rpx;
			}
		.uncollection-text{
			margin-top: 32rpx;
			margin-left: 244rpx;
			height: 25rpx;
			width: 262rpx;
			line-height: 25rpx;
			text-align: center;
			font-size: 26rpx;
			color: #999999;
		}
		.uncollection-btn-box{
			margin-left: 194rpx;
			margin-top: 65rpx;
			width: 362rpx;
			display: flex;
			justify-content: space-between;
			.uncollection-left-btn{
				width: 150rpx;
				height: 50rpx;
				border: 1rpx solid #999999;
				text-align: center;
				line-height: 50rpx;
				color: #999999;
				border-radius: 6rpx;
			}
		   .uncollection-right-btn{
			   width: 150rpx;
			   height: 50rpx;
			   border: 1rpx solid #F0250F;
			   text-align: center;
			   line-height: 50rpx;
			   color: #F0250F;
			   border-radius: 6rpx;
		   }
			
		}
		}
	}
</style>
