<template>
	<view class="mypage">
		<!--头部标题-->
		<!-- <view class="my_title">我的</view> -->
		<!--我的头部-->
		<view class="my_header">
			<view class="header_left">
				<view class="header_img">
					<image :src="uerInfo.avatar"></image>
				</view>
				<view class="header_nickname">
					<view class="user_nickname">{{uerInfo.nick_name}}</view>
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
			<view class="my_balance_category">
				<view class="my_balance_number">{{uerInfo.amount}}</view>
				<view class="my_balance_name">余额</view>
			</view>
			<view class="my_balance_category">
				<view class="my_balance_number">0</view>
				<view class="my_balance_name">佣金</view>
			</view>
			<view class="my_balance_category">
				<view class="my_balance_number">{{uerInfo.count_wsy}}</view>
				<view class="my_balance_name">优惠券</view>
			</view>
			<view class="my_balance_category">
				<view class="my_balance_number">{{uerInfo.keeping_bean}}</view>
				<view class="my_balance_name">养生豆</view>
			</view>
		</view>
		<!--分享banner-->
		<view class="mypage_share">
			<image src="../../static/img/7857.png" @click="onShare()"></image>
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
	import appShare, { closeShare } from "@/utils/share.js"

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
				}]
			}
		},
		methods:{
			// 分享
			onShare(){
				let shareData = {
					shareUrl:"http://localhost:8081/ ",
					shareTitle:this.goodsdetails.goods_name,
					shareContent:this.goodsdetails.goods_name,
					shareImg:this.goodsdetails.goods_image,
					appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath : "pages/index/index",
					appWebUrl : "http://localhost:8081/ ",
				};
				let shareObj = appShare(shareData,res => {
					console.log("分享成功回调",res);
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare();
				});
				setTimeout(() => {
					// 第二种关闭弹窗的方式
					shareObj.close();
				},5000); 
			},
			set(){
				uni.navigateTo({
					url:"../set_up/set_up"
				})
			},
			},
			computed:{
				// 通过计算属性获取个人信息
				uerInfo(){
					return this.$store.state.uerInfo
				}
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
