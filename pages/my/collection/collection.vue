<template>
	<!-- 用户收藏 -->
	<view class="collection">
		<!-- 用户没有收藏时显示 -->
		<uncollection v-if="false" ></uncollection>
		
		<!-- 如果获取到收藏品数据更换"list"完成下面渲染 -->
		<view v-for="item in list" :key="item.id" class="collection-list" v-if="true">
			<view class="collection-box">
				<view class="collection-img-box">
					<image :src="item.src" class="collection-img"></image>
				</view>
				<view class="collection-text-box">
					<view class="collection-title">{{item.title}}</view>
					<view class="collection-money">￥{{item.money}}<text class="collection-text">{{item.number}}人收藏</text></view>
					<view class="collection-btn-box">
						<!-- 绑定点击事件执行取消收藏 -->
						<button class="collection-btn-left">取消收藏</button>
						<!-- 绑定点击事件编程式导航跳转到详情页 -->
						<button class="collection-btn-right">去购买</button></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uncollection from "@/components/uncollection/index.vue"
	export default {
		data() {
			return {
				// 模拟数据
				list:[
					{   id:1,
						src:"../../../static/img/goods2.png",
						title:"按摩精油通经络全身推油身体肩颈足部开背推拿刮痧推油正品",
						money:97.00,
						number:0
					},{   id:2,
						src:"../../../static/img/goods2.png",
						title:"按摩精油通经络全身推油身体肩颈足部开背推拿刮痧推油正品",
						money:97.00,
						number:0
					},{   id:3,
						src:"../../../static/img/goods2.png",
						title:"按摩精油通经络全身推油身体肩颈足部开背推拿刮痧推油正品",
						money:97.00,
						number:0
					}
				]
			}
		},
		components:{
			uncollection
		},
		computed:{
			uerInfo(){
				return this.$store.state.uerInfo
			}
		},
		methods: {
			
		},
		mounted(){
			console.log(this.$store.state.uerInfo)
		}
	}
</script>

<style lang="scss" scoped>
	.collection{
		.collection-list{
			.collection-box{
				margin-top: 20rpx;
				width: 750rpx;
				height: 280rpx;
				background-color: #FFFFFF;
				display: flex;
				position: relative;
				.collection-img-box{
					margin-left: 20rpx;
					width: 280rpx;
					height: 280rpx;
					.collection-img{
						width: 280rpx;
						height: 280rpx;
					}
				}
				.collection-text-box{
					.collection-title{
						margin-top: 19rpx;
						margin-left: 19rpx;
						width: 383rpx;
						height: 67rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Regular;
						color:#3E3E3E;
					}
					.collection-money{
						margin-top: 19rpx;
						margin-left: 19rpx;
						font-size: 28.3rpx;
						.collection-text{
							font-size: 26rpx;
							margin-left: 32rpx;
							color: #999999 ;
						}
					}
					.collection-btn-box{
						width: 360rpx;
						position: absolute;
						right: 20rpx;
						bottom: 20rpx;
						display: flex;
						justify-content: space-between;
						.collection-btn-left{
							width: 160rpx;
							height: 50rpx;
							background-color: #FFFFFF;
							font-size: 16rpx;
							color: #333333 ;
							border-radius: 25rpx;
							border: 1rpx solid #333333;
							text-align: center;
							line-height: 50rpx;
						}
						.collection-btn-right{
							width: 160rpx;
							height: 50rpx;
							background-image: linear-gradient(to left,#46E3BC,#32AADF );
							font-size: 16rpx;
							color: #FFFFFF  ;
							border-radius: 25rpx;
							border: 0;
							text-align: center;
							line-height: 50rpx;
						}
					}				
				
				}
			}
		}
	}
</style>
