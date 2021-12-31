<template>
	<view class="pay_success">
		<view class="red_envelope">
			<view class="red_envelope_img">
				<image src="../../static/img/red_envelope.png" ></image>
			</view>
			<view class="back_button">
				<view class="back_button_left">
					<view></view>
					<text>查看订单</text>
				</view>
				<view class="back_button_right">
					<view></view>
					<text @tap="tohome">去首页</text>
				</view>
			</view>
		</view>
		<speity></speity>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			tohome(){
				uni.switchTab({
					url:"../index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.pay_success{
		.red_envelope{
			background-color: #FFFFFF;
			padding: 30rpx;
			.red_envelope_img{
				width: 100%;
				image{
					width: 100%;
					border-radius: 20rpx;
				}
			}
			.back_button{
				padding: 20rpx 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.back_button_left{
					text{
						font-size: 34rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #46E3BC;
					}
				}
				.back_button_right{
					text{
						font-size: 34rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #46E3BC;
					}
				}
			}
		}
	}
</style>
