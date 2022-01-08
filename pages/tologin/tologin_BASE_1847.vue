<template>
	<view class="login">
		<!-- <view class="login_header">
			<view class="icon iconfont icon-guanbi" @tap="toindex"></view>
			<view class="title">登录</view>
			<view class=""></view>
		</view> -->
		<view class="login_banner">
			<image src="../../static/img/login_banner.png"></image>
		</view>
		<view class="login_button">
			<view class="login_weixin" @tap="">
				<view class="icon iconfont icon-weixin"></view>
				<view class="login_weixin_name" @click="wxLogin">微信登录</view>
			</view>
			<view class="login_phone" @tap="login_phone">手机账号密码登录</view>
		</view>
		<view class="toregistered" @tap="toreg">还没有账号？立即注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:[],
			}
		},
		methods: {


			toindex() {
				uni.switchTab({
					url: "../index/index"
				})
			},
			login_phone() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			toreg() {
				uni.navigateTo({
					url: "../reg/reg"
				})
			},
			wxLogin: function() {
				let that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let access_token = loginRes.authResult.access_token
						let openid = loginRes.authResult.openid
						console.log('-------获取openid(unionid)-----');
						console.log('token', access_token)
						console.log('openid', openid)
						console.log(JSON.stringify(loginRes));
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log('-------获取微信用户所有-----');
								console.log(JSON.stringify(infoRes.userInfo));
								that.userInfo = JSON.parse(JSON.stringify(infoRes.userInfo))
								uni.reLaunch({
									url:'../my/index?openId='+that.userInfo.openId+'&nickName='+that.userInfo.nickName+'&avatarUrl='+that.userInfo.avatarUrl+'&unionId='+that.userInfo.unionId
								})
							}
						});
						
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	.login {
		.login_header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #FFFFFF;
			padding: 10px;

			.icon {
				font-size: 1.1rem;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
				line-height: 28px;
			}

			.title {
				font-size: 1.1rem;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
				line-height: 28px;
			}
		}

		.login_banner {
			width: 100%;

			image {
				width: 100%;
			}
		}

		.login_button {
			padding: 120px 60px;
			margin: 0 auto;
			text-align: center;

			.login_weixin {
				display: flex;
				background: #50B674;
				align-items: center;
				justify-content: center;
				border-radius: 50px;
				margin-bottom: 18px;

				.icon {
					color: #FFFFFF;
					font-size: 1.5rem;

				}

				.login_weixin_name {
					color: #FFFFFF;
					font-size: 1rem;
					line-height: 48px;
					padding: 0 5px;
				}
			}

			.login_phone {
				background: #999999;
				color: #FFFFFF;
				font-size: .9rem;
				line-height: 38px;
				border-radius: 30px;
			}
		}

		.toregistered {
			text-align: center;
			width: 100%;
			font-size: .8rem;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			line-height: 39px;
		}
	}
</style>
