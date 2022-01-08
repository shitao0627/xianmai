<template>
	<view class="mypage">
		<!--头部标题-->
		<!-- <view class="my_title">我的</view> -->
		<!--我的头部-->
		<view class="my_header">
			<view class="header_left">
				<view class="header_img">
					<image src="../../static/img/user.png"></image>
				</view>
				<view class="header_nickname">
					<view class="user_nickname">用户名</view>
					<view class="user_bianji">
						<text class="">编辑个人资料</text>
						<text class="icon iconfont icon-bianji" style="font-size: .8rem;"></text>
					</view>
				</view>
			</view>
			<view class="header_right icon iconfont icon-shezhi" @tap="set"></view>
		</view>
		<!--资产-->
		<view class="my_balance">
			<view class="my_balance_category" v-for="item in balance">
				<view class="my_balance_number">{{item.number}}</view>
				<view class="my_balance_name">{{item.name}}</view>
			</view>
		</view>
		<!--分享banner-->
		<view class="mypage_share">
			<image src="../../static/img/7857.png"></image>
		</view>
		<view class="my_list">
			<view class="my_list_icon" v-for="list in icon">
				<navigator :url="list.url">
					<view class="icon iconfont my_list_icons" :class="list.icon"></view>
					<view class="icon_name">{{list.name}}</view>
				</navigator>
				
			</view>
		</view>
		<!--招聘模块-->
		<technician></technician>
		<!--邀请广告图-->
		<view class="mypage_invitation">
			<image src="../../static/img/banner.jpg"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				userInfo:[],
				unionId:'',
				nickName:'',
				avatarUrl:'',
				openId:'',
				user:[],
				icon:[{
					url:'Myevaluation/Myevaluation',
					icon:'icon-wodedingdan',
					name:'我的订单',
					src:''
				},{
					url:'',
					icon:'icon-daishouhuo',
					name:'待收货',
					src:''
				},{
					url:'../address/address',
					icon:'icon-shouhuodizhi',
					name:'地址管理',
					src:''
				},{
					url:'',
					icon:'icon-daishouhuo',
					name:'我的退换货',
					src:''
				},{
					url:'collection/collection',
					icon:'icon-shoucang',
					name:'我的收藏',
					src:''
				},{
					url:'',
					icon:'icon-youjian',
					name:'意见反馈',
					src:''
				},{
					url:'',
					icon:'icon-kefu',
					name:'在线客服',
					src:''
				},{
					url:'',
					icon:'icon-24gl-phoneLoudspeaker',
					name:'投诉电话',
					src:''
				}],
				balance:[{
					number:'0.00',
					name:'购物卡余额',
					url:''
				},{
					number:'6350.00',
					name:'我的佣金',
					url:''
				},{
					number:'5',
					name:'我的优惠券',
					url:''
				},{
					number:'50.00',
					name:'我的金币',
					url:''
				},]
			}
		},
		methods:{
			set(){
				uni.navigateTo({
					url:"../set_up/set_up"
				})
			},
			set(){
				uni.navigateTo({
					url:"../set_up/set_up"
				})
			},
			getweixinlogin() {
				this.loading = true
				let params = {
					platform:2,
					unionid:this.unionId,
					nickname:this.nickName,
					avatar:this.avatarUrl,
					RegistrationID:this.openId,
				}
				params.sign = this.sign(params)
				this.$api.weixinlogin(params).then((res) => {
					this.loading = false;
					// console.log('request success', res)
			
					this.user = res.data.Response
					console.log('user', JSON.stringify(this.user))
				}).catch((err) => {
					this.loading = false;
				})
			},
		},
		
		onLoad(options) {
			this.unionId = options.unionId
			this.nickname = options.nickname
			this.avatarUrl = options.avatarUrl
			this.openId = options.openId
			console.log('userInfo',JSON.stringify(this.unionId))
			console.log('nickname',JSON.stringify(this.nickname))
			this.getweixinlogin()
		}
	}
</script>

<style lang="scss">
	.mypage{
		.my_title{
			width: 100%;
			background: #FFFFFF;
			text-align: center;
			font-size: 40rpx;
			font-weight: bold;
			color: #444;
			line-height: 48px;
		}
		.my_header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			padding: 10px 20px 20px;
			.header_left{
				display: flex;
				align-items: center;
				.header_img{
					width: 60px;
					height: 60px;
					border-radius: 50%;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.header_nickname{
					padding: 0 10px;
					.user_nickname{
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #444;
						line-height: 23px;
					}
					.user_bianji{
						font-size: .9rem;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						line-height: 23px;
					}
				}
			}
			.header_right{
				font-size: 50rpx;
				font-weight: bold;
				color: #666;
			}
		}
		.my_balance{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
			padding: 0px 10px 20px 10px;
			.my_balance_category{
				.my_balance_number{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #555;
					line-height: 25px;
					text-align: center;
				}
				.my_balance_name{
					font-size: 1rem;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					line-height: 25px;
					text-align: center;
				}
			}
		}
		.mypage_share{
			padding: 10px;
			height: 88px;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}
		}
		.my_list{
			border-radius: 10px;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			background: #FFFFFF;
			margin: 10px;
			padding: 5px 0;
			.my_list_icon{
				width: 25%;
				padding: 10px 0;
				text-align: center;
				.my_list_icons{
					font-size: 1.8rem;
					color: #5B5B5B;
					
				}
				.icon_name{
					font-size: .8rem;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					line-height: 35px;
				}
			}
		}
		.mypage_invitation{
			border-radius: 10px;
			padding: 10px;
			image{
				width: 100%;
				border-radius: 10px;
			}
		}
	}
</style>
