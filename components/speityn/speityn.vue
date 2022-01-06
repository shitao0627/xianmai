<template>
	<view class="speity">
		<!-- <view class="speity_header">
			<view class="speity_header_line"></view>
			<view class="speity_header_point"></view>
			<view class="speity_header_title">特色推荐</view>
			<view class="speity_header_point"></view>
			<view class="speity_header_line"></view>
		</view> -->
		<view class="speity_card" v-for="item in list"  @tap="gotodetails(item)">
			<!-- 商品图片 -->
			<view class="speity_img">
				<image :src="item.goods_image"></image>
			</view>
			<view class="speity_title">{{item.goods_name}}</view>
			<view class="speity_details">
				<text class="speity_price">&yen;{{item.price}}</text>
				<view class="speity_details_model">
					<view class="speity_share">
						<text class="speity_share_name">分享</text>
						<text class="speity_share_details">赚钱30%</text>
					</view>
					<view class="speity_mail">{{item.addresss}}</view>
				</view>
			</view>
			<view class="speity_bottom">
				<view class="speity_people">{{item.sales_volume}}人购买</view>
				<view class="icon iconfont icon-31gouwuche speity_shopping"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"speityn",
		data() {
			return {
				
			};
		},
		props:{
			list: {
				type: Array,
				default: []
			},
			recommendList: {
				type: Array,
				default: () => []
			},
		},
		methods:{
			gotodetails(item){
				uni.navigateTo({
					url:"/pages/goods_details/goods_details?goods_id="+item.goods_id+'&img='+item.goods_image+'&name='+item.goods_name+'&address='+item.addresss+'&persionNum='+item.sales_volume
				})
			},
		}
	}
</script>

<style lang="scss">
	.speity{
		display: flex;
		flex-wrap: wrap;
		margin: 4px;
		.speity_header {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px 0;
			width: 100%;
			text-align: center;
			.speity_header_line {
				width: 30px;
				border: 1px solid #666;
			}
		
			.speity_header_point {
				width: 3px;
				height: 3px;
				background: #666;
				border-radius: 50%;
				margin: 0 10px;
			}
		
			.speity_header_title {
				font-size: 1.1rem;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333;
			}
		}
		.speity_card{
			width: 150px;
			margin: 6px;
			background: #FFFFFF;
			padding: 0px 10px;
			.speity_img{
				width: 150px;
				// height: 150px;
				text-align: center;
				margin: 25px auto;
				image{
					width: 150px;
					height: 130px;
				}
			}
			.speity_title{
				font-size: 1rem;
				font-family: PingFang SC;
				font-weight: 500;
				color: #2D2D2D;
				line-height: 28px;
				overflow: hidden; // 溢出隐藏
				text-overflow: ellipsis; // 显示省略号
				white-space: nowrap; // 不换行
			}
			.speity_details{
				display: flex;
				align-items: center;
				justify-content:space-between;
				border-bottom: 1px solid #F1F2F5;
				padding-bottom: 5px;
				.speity_price{
					font-size: 1rem;
					font-weight: 500;
					color: #2D2D2D;
				}
				.speity_details_model{
					display: flex;
					align-items: center;
					
					.speity_share{
						border: 1px solid #E73E37;
						border-radius: 4px;
						background: #FAF1F3;
						.speity_share_name{
							background: #E73E37;
							border-radius: 2px 0px 0px 2px;
							padding: 1px 2px;
							color: #FFFFFF;
							font-size: .5rem;
						}
						.speity_share_details{
							border-radius: 2px 0px 0px 2px;
							padding: 1px 3px;
							color: #E73E37;
							font-size: .5rem;
						}
					}
					
				}
				.speity_mail{
					background: #FAF1F3;
					border: 1px solid #E73E37;
					border-radius: 4px;
					font-size: .5rem;
					font-family: PingFang SC;
					color: #E73E37;
					margin-left: 3px;
				}
			}
			.speity_bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-top: 6px;
				padding-bottom: 5px;
				.speity_people{
					font-size: .9rem;
					font-family: PingFangSC;
					font-weight: .8rem;
					color: #878787;
				}
				.speity_shopping{
					color: #18C462;
					font-size: 1.3rem;
				}
			}
		}
	}
	
</style>
