<template>
	<view class="login">
		<!-- <view class="login_header">
			<view class="icon iconfont icon-fanhui" @tap="back"></view>
			<view class="title">登录</view>
			<view class=""></view>
		</view> -->
		<view class="swiperMain">
			<view class="swiperHead">
				<!--组件-->
				<swiperNavBar :scrollIntoView="scrollIntoView" :swiperTabList='swiperTabList'
					:swiperTabIdx='swiperTabIdx' :currentSwiperWidth='currentSwiperWidth'
					:currentSwiperHeight='currentSwiperHeight' :swiperCurrentSize='swiperCurrentSize'
					:swiperColor='swiperColor' :swiperCurrentColor='swiperCurrentColor'
					:currentSwiperLineShow="currentSwiperLineShow"
					:currentSwiperLineActiveWidth="currentSwiperLineActiveWidth"
					:currentSwiperLineActiveHeight="currentSwiperLineActiveHeight"
					:currentSwiperLineActiveBg="currentSwiperLineActiveBg"
					:currentSwiperLineAnimatie="currentSwiperLineAnimatie" v-if=" swiperTabList.length > 1 "
					@change="CurrentTab">
				</swiperNavBar>
				<!--组件-->
			</view>

			<!--内容-->
			<view class="swiperCont" :style="{ paddingTop:currentSwiperHeight + 'rpx' }">
				<swiper class="swiper" :style="{ height:mainHeight + 'px' }" :current="swiperTabIdx"
					@change="SwiperChange">
					<swiper-item class="swiperItem">
						<form class="" @submit="formSubmit">
							<view class="input_card">
								<view class="uni-form-item uni-column">
									<input class="uni-input" type="number" placeholder="+86请输入手机号码" />
								</view>
								<view class="uni-form-item uni-column password_card">
									<input class="uni-input" password type="text" placeholder="请输入验证码" />
									<view class="to_change_password">获取验证码</view>
								</view>
							</view>
							
							<view class="login_button" @tap='bindLogin'>
								<button form-type="submit">登录</button>
							</view>
						</form>
						<view class="toreg">还没有账号？立即注册</view>
						<!-- 第三方账号登录 -->
						<view class="weixin_login">
							<view class="weixin_login_header">
								<view class="header_line"></view>
								<view class="header_title">第三方账号登录</view>
								<view class="header_line"></view>
							</view>
							<view class="weixin_login_button">
								<view class="icon iconfont icon-weixin1"></view>
								<view>微信登录</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="swiperItem">
						<form class="" @submit="formSubmit">
							<view class="input_card">
								<view class="uni-form-item uni-column">
									<input class="uni-input" type="number" placeholder="请输入手机号" />
								</view>
								<view class="uni-form-item uni-column password_card">
									<input class="uni-input" password type="text" placeholder="请输入密码" />
									<view class="to_change_password">忘记密码？</view>
								</view>
							</view>
							
							<view class="login_button">
								<button form-type="submit">登录</button>
							</view>
						</form>
						<view class="toreg">还没有账号？立即注册</view>
						<!-- 第三方账号登录 -->
						<view class="weixin_login">
							<view class="weixin_login_header">
								<view class="header_line"></view>
								<view class="header_title">第三方账号登录</view>
								<view class="header_line"></view>
							</view>
							<view class="weixin_login_button">
								<view class="icon iconfont icon-weixin1"></view>
								<view>微信登录</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!--内容-->
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				//导航
				scrollIntoView: 0, //设置哪个方向可滚动，则在哪个方向滚动到该元素
				swiperTabList: ['手机快捷登录', '账号密码登录'], //导航列表
				swiperTabIdx: 0,
				swiperCurrentSize: '32rpx', //导航的字体大小
				swiperColor: '#999999', //导航栏字体未选中前颜色
				swiperCurrentColor: '#222222', //选中当前导航栏字体颜色
				currentSwiperWidth: '50%', //当前导航的宽度 % upx rpx px  （导航超出可左右滑动 ）
				currentSwiperHeight: 100, //当前导航的高度度 rpx px
				mainHeight: 600, //全屏或者局部滑动设置的高度
				currentSwiperLineShow: true, //是否显示导航栏的线条 （线条距离标题太近的话可自行修改.swiperLine的css）
				currentSwiperLineActiveBg: '#222222', //当前选中的导航栏线条颜色
				currentSwiperLineActiveWidth: '80rpx', //当前选中的导航栏线条的宽度 upx rpx px
				currentSwiperLineActiveHeight: '6rpx', //当前选中的导航栏线条的高度度 upx rpx px
				currentSwiperLineAnimatie: 300, //当前选中的导航栏线条过渡效果


				//（全屏出现滚动条 去掉paddingTop 但导航栏会遮住部分内容 自行改.swiperCont .swiper里css）
				//也可获取导航栏的高度  屏幕高度减去导航栏高度 = 你的内容全屏高度  不会出现滚动条
			}
		},
		computed: {
			username() {
				return this.$store.state.username 
			}
		},
		methods: {
			//微信登录
			arr(){
				console.log(1)
			},
			bindLogin(e) {  
				let name = e.detail.value.nameValue,  
					password = e.detail.value.passwordValue;  
				uni.request({  
					url: ``,  
					header: {  
						"Content-Type": "application/x-www-form-urlencoded"  
					},  
					data: {  
						"username": name,  
						"password": password  
					},  
					method: "POST",  
					success: (e) => {  
						if (e.data.code === 0) {//登录成功后改变vuex的状态，并退出登录页面  
							this.login(e.data)  
							uni.navigateBack()  
						}  
					}  
				})  
			},  
			...mapMutations(['login']),
			back() {
				uni.navigateBack()
			},
			//tab点击事件 自行完善需要的代码
			CurrentTab: function(index, item) {
				this.swiperTabIdx = index;
				this.scrollIntoView = Math.max(0, index - 1);
				//console.log(index + '----' + item)
			},
			//滑动事件  自行完善需要的代码
			SwiperChange: function(e) {
				//console.log(e)
				//console.log(e.detail)
				//console.log(e.detail.current);
				this.swiperTabIdx = e.detail.current;
				this.scrollIntoView = Math.max(0, e.detail.current - 1);
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

	}


	.swiperMain {
		width: 100%;
		margin-top: 0rpx;
	}

	.swiperHead {
		position: fixed;
		top: 80rpx;
		z-index: 10;
		width: 100%;
		background: #FFFFFF;
	}

	.swiperHead scroll-view {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.swiperTab {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
	}

	.swiperCont {
		width: 100%;
		padding-top: 70rpx;
	}

	/* #ifdef H5 */
	.swiperHead {
		position: fixed;
		top: 44px;
		z-index: 10;
		width: 100%;
		background: #FFFFFF;
	}

	/* #endif */

	.swiper {
		width: 100%;
	}

	.swiperItem {
		overflow: auto;
		// background: #00B26A;
		// text-align: center;
		// color: #222;
		// font-size: 30upx;
		form{
			margin: 20rpx;
			.input_card{
				padding: 0 30rpx;
				margin: 0 30rpx;
				background: #FFFFFF;
				
				.uni-form-item{
					border-bottom: 1px solid #E7E7E7;
					height: 100rpx;
					.uni-input{
						height: 100rpx;
					}
				}
				.password_card{
					
					position: relative;
					
					.to_change_password{
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
			.login_button{
				margin: 60rpx 30rpx 10rpx 30rpx;
				background: linear-gradient(270deg, #46E3BC, #32AADF);
				button{
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 100rpx;
					background: linear-gradient(270deg, #46E3BC, #32AADF);
				}
			}
		}
		.toreg{
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}
		.weixin_login{
			margin-top: 300rpx;
			.weixin_login_header{
				display: flex;
				justify-content: center;
				align-items: center;
				.header_line{
					width: 150rpx;
					height: 2px;
					background: #E0E0E0;
				}
				.header_title{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					padding: 0 30rpx;
				}
			}
			.weixin_login_button{
				text-align: center;
				margin: 50rpx;
				.icon{
					font-size: 100rpx;
					color: rgb(40,169,69);
				}
				view{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					line-height: 45px;
				}
			}
		}
	}

	.swiperItem image {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
