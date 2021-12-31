<template>
	<view class="reg">
		<!-- <view class="reg_header">
			<view class="icon iconfont icon-fanhui reg_fanhui" @click="navigateBack"></view>
			<view class="reg_header_title">注册</view>
			<view class="zhanwei"></view>
		</view> -->
		<view class="reg_form">
			<form @submit="formSubmit">
				<view class="reg_form_input">
					<view class="uni-form-item uni-column">
						<input class="uni-input" type="number" placeholder="请输入手机号码" />
					</view>
					<view class="uni-form-item uni-column password_card">
						<input class="uni-input" type="number" placeholder="请输入验证码" />
						<view class="to_change_password">获取验证码</view>
					</view>
					<view class="uni-form-item uni-column password_card">
						<input class="uni-input" password type="text" placeholder="请输入密码(6-20位)" />
					</view>
					<view class="uni-form-item uni-column password_card">
						<input class="uni-input" password type="text" placeholder="请确认密码" />
					</view>
					<view class="uni-form-item uni-column password_card">
						<input class="uni-input" type="text" placeholder="邀请码(选填)" />
					</view>
				</view>
				<view class="agreement">
					<radio><text>我已阅读并同意</text><text style="color: #017AFF;">《闲买用户使用协议》</text></radio>
				</view>
				
				<view class="login_button">
					<button form-type="submit">确定</button>
				</view>
			</form>
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
			navigateBack: function() {
				uni.navigateBack() //返回上一页
			},
			//提交表单
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
		}
	}
</script>

<style lang="scss">
	.reg {
		.reg_header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px;
			border-bottom: 1px solid #E7E7E7;
			background: #FFFFFF;

			.reg_fanhui {
				font-size: 1.3rem;
				font-weight: bold;
				color: #333333;
			}

			.reg_header_title {
				font-size: 1.2rem;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				line-height: 25px;
			}

			.zhanwei {
				width: 15px;
			}
		}

		.reg_form {
			width: 100%;


			form {
				.reg_form_input {
					background: #FFFFFF;
					padding: 0 30rpx;

					.uni-form-item {
						border-bottom: 1px solid #E7E7E7;
						height: 100rpx;

						.uni-input {
							height: 100rpx;
						}
					}

					.password_card {

						position: relative;

						.to_change_password {
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 100rpx;
							position: absolute;
							right: 0rpx;
							top: 0rpx;
						}
					}
				}
				.agreement{
					margin: 30rpx;
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					uni-radio .uni-radio-input{
						width: 38rpx;
						height: 38rpx;
						background-color: #46E3BC;
						border-color: #46E3BC;
					}
				}
				.login_button {
					margin: 60rpx 30rpx 10rpx 30rpx;
					background: linear-gradient(270deg, #46E3BC, #32AADF);

					button {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 100rpx;
						background: linear-gradient(270deg, #46E3BC, #32AADF);
					}
				}
			}
		}
	}
	
</style>
