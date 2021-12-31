<template>
	<view class="change_name">
		<view class="header">
			<view class="icon iconfont icon-fanhui" @tap="back"></view>
			<view class="title">修改用户名</view>
			<view class="save">保存</view>
		</view>
		<view class="change_name_main">
			<view class="current_name">
				<view class="current_lable">当前用户名</view>
				<view class="change_user_name">Mrs.顾</view>
			</view>
			<view class="new_name">
				<view class="new_lable">新用户名</view>
				<input class="uni-input" type="text" placeholder="" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.change_name{
		.header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #FFFFFF;
			padding: 20rpx;
			
			.icon {
				font-size: 1.1rem;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
				line-height: 28px;
				width: 25px;
			}
			
			.title {
				font-size: 1.1rem;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
				line-height: 28px;
			}
			.save{
				font-size: 1rem;
				font-family: PingFangSC;
				font-weight: 400;
				color: #222222;
				line-height: 28px;
			}
			
		}
		.change_name_main{
			background: #FFFFFF;
			margin: 30rpx 0;
			padding: 0 20rpx;
			.current_name{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #E7E7E7;
				.current_lable{
					font-size: 30rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #222222;
					line-height: 100rpx;
				}
				.current_user_name{
					font-size: 26rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #808080;
					line-height: 100rpx;
				}
			}
			.new_name{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.new_lable{
					font-size: 30rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #222222;
					line-height: 100rpx;
				}
				input{
					text-align: right;
				}
			}
		}
	}
</style>
