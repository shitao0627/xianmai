<template>
	<view class="evaluation">
		<!-- <view class="evaluation_header">
			<view class="icon iconfont icon-fanhui" @tap="back"></view>
			<view class="evaluation_title">评价</view>
			<view class="icon iconfont icon-fenxiang1 evaluation_title_right" @tap=""></view>
		</view> -->
		<!--评价标签-->
		<view class="evaluation_lable">
			<view class="evaluation_lable_card" v-for="(item,index) in lable"  :key="index" :class="[index==inlable?'on':'']" @tap="onlable(index)">
				<text>{{item.name}}({{item.number}})</text>
			</view>
		</view>
		<!--评价列表-->
		<view class="evaluation_list">
			<view class="evaluation_card" v-for="item in evaluation" :key="evaluation.id">
				<view class="evaluation_user">
					<view class="portrait">
						<image :src="item.src"></image>
					</view>
					<view class="user_name">{{item.name}}</view>
					<view class="star">
						<view class="icon iconfont icon-star-full" v-for="index of item.star"></view>
						
					</view>
				</view>
				<view class="evaluation_product">
					<view class="product_text">产品规格：</view>
					<view class="product">{{item.product}}</view>
				</view>
				<view class="evaluation_text">{{item.text}}</view>
				<view class="evaluation_img_card">
					<view class="evaluation_img" v-for="img in item.url">
						<image :src="img.src"></image>
					</view>
					
				</view>
				
				<view class="evaluation_time">{{item.time}}</view>
				<!--用户追评-->
				<view class="evaluation_additional" v-if="item.additional!=''" >
					<view class="additional_title">用户追评</view>
					<view class="additional_text">{{item.additional}}</view>
				</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<!-- <view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box">
						<image src="../../static/share/wx.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>
		</view> -->
		<!--底部-->
		<view class="footer">
			<view class="icons">
		
				<view class="box" @tap="toChat">
					<view class="icon iconfont icon-kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep">
					<view class="icon iconfont icon-shoucang1" :class="[isKeep?'shoucangsel':'shoucang']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
				<view class="box" @tap="toshoping">
					<view class="icon iconfont icon-31gouwuche"></view>
					<view class="text">购物车</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isKeep: false, //收藏
				lable:[{
					name:'全部',
					number:'1.7万'
				},{
					name:'好评',
					number:'1.6万'
				},{
					name:'中评',
					number:'5261'
				},{
					name:'差评',
					number:'150'
				},{
					name:'追加评价',
					number:'25641'
				},{
					name:'有图',
					number:'1620'
				}],
				inlable:0,
				evaluation:[{
					id:1,
					src:'../../static/img/goods2.png',
					name:'用户名1',
					star:5,
					text:'质量不错，值得购买。',
					url:[{
						src:'../../static/img/goods2.png'
					},{
						src:'../../static/img/goods2.png'
					},{
						src:'../../static/img/goods2.png'
					}],
					time:'2018-06-10',
					additional:'一般一般一般',
					product:'大马士革玫瑰纯露125ml'
				},{
					id:1,
					src:'../../static/img/goods2.png',
					name:'用户名2',
					star:4,
					text:'质量不错，值得购买。',
					url:[{
						src:'../../static/img/goods2.png'
					}],
					time:'2018-06-10',
					additional:'',
					product:'大马士革玫瑰纯露125ml'
				},{
					id:1,
					src:'../../static/img/goods2.png',
					name:'用户名3',
					star:3,
					text:'质量不错，值得购买。',
					url:[],
					time:'2018-06-10',
					additional:'',
					product:'大马士革玫瑰纯露125ml'
				},{
					id:1,
					src:'../../static/img/goods2.png',
					name:'用户名4',
					star:2,
					text:'质量不错，值得购买。',
					url:[{
						src:'../../static/img/goods2.png'
					},{
						src:'../../static/img/goods2.png'
					},{
						src:'../../static/img/goods2.png'
					},{
						src:'../../static/img/goods2.png'
					}],
					time:'2018-06-10',
					additional:'一般一般一般',
					product:'大马士革玫瑰纯露125ml'
				},]
			}
		},
		methods: {
			onlable(index) {
				this.inlable = index;
			},
			back(){
				uni.navigateBack()
			},
			// 客服
			toChat() {
				uni.navigateTo({
					url: "../msg/chat/chat?name=客服008"
				})
			},
			// 分享
			share() {
				this.shareClass = 'show';
			},
			hideShare() {
				this.shareClass = 'hide';
				setTimeout(() => {
					this.shareClass = 'none';
				}, 150);
			},
			//收藏
			keep() {
				this.isKeep = this.isKeep ? false : true;
			},
			// 加入购物车
			joinCart() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						uni.showToast({
							title: "已加入购物车"
						});
					});
				}
				uni.showToast({
					title: "已加入购物车"
				});
			},
			//立即购买
			buy() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						this.toConfirmation();
					});
				}
				this.toConfirmation();
			},
		}
	}
</script>

<style lang="scss">
	.evaluation{
		.evaluation_header {
			background: #FFFFFF;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #e7e7e7;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9;
		
			.evaluation_title {
				font-size: 34rpx;
				font-family: PingFangSC;
				font-weight: 600;
				color: #333333;
				line-height: 50px;
			}
		
			.icon {
				font-size: 38rpx;
				font-family: PingFangSC;
				font-weight: 600;
				color: #666666;
				padding: 0 20px;
			}
		}
		.evaluation_lable{
			padding-top: 20rpx;
			padding-bottom: 30rpx;
			background: #FFFFFF;
			.evaluation_lable_card{
				border-radius: 40rpx;
				background: rgb(227,251,245);
				text-align: center;
				display: inline-block;
				margin: 12rpx 20rpx;
				padding: 10rpx 20rpx;
				text{
					color: #333333;
					font-size: 26rpx;
					
				}
			}
			.on{
				background: linear-gradient(120deg, #46E3BC, #32AADF);
				text{
					color: #FFFFFF;
				}
				
			}
		}
		.evaluation_list{
			padding-bottom: 120rpx;
			.evaluation_card{
				margin-top: 20rpx;
				padding: 20rpx;
				background: #FFFFFF;
				.evaluation_user{
					display: flex;
					align-items: center;
					.portrait{
						width: 75rpx;
						height: 75rpx;
						border-radius: 50%;
						image{
							width: 75rpx;
							height: 75rpx;
							border-radius: 50%;
						}
					}
					.user_name{
						font-size: 32rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #222222;
						line-height: 40rpx;
						margin-left: 20rpx;
					}
					.star{
						display: flex;
						align-items: center;
						padding: 0 10rpx;
						.icon{
							color: #FFC000;
							font-size: 30rpx;
							padding: 0 6rpx;
						}
					}
				}
				.evaluation_product{
					display: flex;
					align-items: center;
					margin: 24rpx 0;
					.product_text{
						font-size: 28rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #999999;
					}
					.product{
						font-size: 28rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #999999;
					}
				}
				.evaluation_text{
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
				}
				.evaluation_img_card{
					margin: 10rpx 0;
					display: flex;
					flex-wrap: wrap;
					.evaluation_img{
						width: 220rpx;
						height: 220rpx;
						padding: 6rpx;
						image{
							width: 220rpx;
							height: 220rpx;
						}
					}
				}
				.evaluation_time{
					font-size: 28rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #999999;
					line-height: 60rpx;
				}
				.evaluation_additional{
					border-top: 1px solid #e7e7e7;
					.additional_title{
						font-size: 36rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #46E3BC;
						padding: 20rpx 0;
					}
					.additional_text{
						font-size: 32rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #333333;
					}
				}
			}
		}
		.footer {
			position: fixed;
			bottom: 0upx;
			width: 100%;
			// padding: 0 4%;
			height: 100upx;
			border-top: solid 1upx #eee;
			background-color: #fff;
			z-index: 2;
			display: flex;
			justify-content: space-between;
			align-items: center;
		
			.icons {
				display: flex;
				height: 80upx;
				// margin-left: -4%;
		
				.box {
					width: 80upx;
					height: 80upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					padding: 0 6rpx;
		
					.shoucangsel {
						color: #F0AD4E;
					}
		
					.shoucang {
						color: #828282;
					}
		
					.icon {
						font-size: 40upx;
						// color: #828282;
					}
		
					.text {
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 22upx;
						color: #666;
					}
				}
			}
		
			.btn {
				height: 100upx;
				overflow: hidden;
				display: flex;
				margin-right: -2%;
				
		
				.joinCart,
				.buy {
					height: 100upx;
					padding: 0 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					font-size: 28upx;
					width: 150rpx;
					justify-content: center;
				}
		
				.joinCart {
					background-color: #555555;
				}
		
				.buy {
					background: linear-gradient(90deg, #46E3BC, #32AADF);
				}
			}
		}
	}
</style>
