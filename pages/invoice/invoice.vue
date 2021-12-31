<template>
	<view class="invoice">
		<!-- <view class="invoice_header">
			<view class="icon iconfont icon-fanhui" @tap="back"></view>
			<view class="invoice_title">发票信息</view>
			<view class="invoice_title_right"></view>
		</view> -->
		<view class="zhan"></view>
		<view class="kong"></view>
		
		<view class="invoice_main" v-for="(item,index) in invoice">
			<view class="invoice_type">
				 <view class="title">发票类型</view>
				 <view class="type_button">
					 <view class="button" v-for="(item,index) in item.type" :key="index" :class="[index==intype?'on':'']" @tap="ontype(index)">{{item.name}}</view>
				 </view>
			</view>
			<view class="kong"></view>
			<view class="invoice_heading">
				<view class="title">发票台头</view>
				<view class="heading_button">
					<view class="button" v-for="(item,index) in item.heading" :key="index" :class="[index==inheading?'on':'']" @tap="onheading(index,$event)">{{item.name}}</view>
				</view>
			</view>
			<view class="company_information" v-if="inheading==1">
				<input class="uni-input"  placeholder="公司名称" />
				<input class="uni-input"  placeholder="公司税号" />
			</view>
			<view class="company_information" v-else>
				<input class="uni-input"  placeholder="抬头名称" />
			</view>
		</view>
		<!--footer-->
		<view class="footer">
			<view class="button" @tap="toorder(options)">确&nbsp;定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				intype:0,
				inheading:0,
				invoice:[{
					id:"1",
					type:[{
						name:'纸质发票'
					},{
						name:'电子发票'
					}],
					heading:[{
						name:'个人',
					},{
						name:'单位',
					}],
				}],
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			ontype(index) {
				this.intype = index;
				
			},
			onheading(index,e) {
				this.inheading = index;
				console.log(e.currentTarget .innerHTML)
				console.log("onheading下标："+index);
			},
			toorder(options){
				uni.navigateTo({
					url:'../order/order'
				})
			},
		}
	}
</script>

<style lang="scss">
	page{background: #FFFFFF;}
	.invoice{
		.zhan{
			padding-top: 100rpx;
			
		}
		.kong{
			height: 20rpx;
			width: 100%;
			background: #F9F9F9;
		}
		.invoice_header {
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
		
			.invoice_title {
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
			.invoice_title_right{
				width: 80rpx;
			}
		}
		.invoice_main{
			.invoice_type{
				padding: 20rpx;
				.type_button{
					display: flex;
					align-items: center;
					.button{
						// background: linear-gradient(90deg, #46E3BC, #32AADF);
						background: #E0E0E0;
						border-radius:10rpx;
						font-size: 26rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #FFFFFF;
						padding: 18rpx 44rpx;
						margin: 20rpx 40rpx 10rpx 0;
					}
					.on{
						background: linear-gradient(90deg, #46E3BC, #32AADF);
						
					}
				}
			}
			.invoice_heading{
				padding: 20rpx;
				border-bottom: 1px solid #e7e7e7;
				.heading_button{
					display: flex;
					align-items: center;
					.button{
						// background: linear-gradient(90deg, #46E3BC, #32AADF);
						background: #E0E0E0;
						border-radius:10rpx;
						font-size: 26rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #FFFFFF;
						padding: 18rpx 44rpx;
						margin: 20rpx 40rpx 10rpx 0;
					}
					.on{
						background: linear-gradient(90deg, #46E3BC, #32AADF);
						
					}
				}
			}
			.title{
				font-size: 30rpx;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
			}
			.company_information{
				input{
					background: #F5F5F5;
					border-radius: 6rpx;
					padding-left: 18rpx;
					height: 80rpx;
					font-size: 30rpx;
					margin: 20rpx 20rpx;
				}
			}
		}
		.footer{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: linear-gradient(90deg, #46E3BC, #32AADF);
			font-size: 36rpx;
			font-family: PingFangSC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 110rpx;
		}
	}
</style>
