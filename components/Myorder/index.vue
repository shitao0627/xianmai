<template>
	<view class="Myorder-box">
		<!-- 自定义导航栏 -->
		<view class="Navigation">
		<view class="Navigation-box">
			<!-- 返回上一级 -->
			<view class="icon iconfont" @click="back">
				&#xe603;
			</view>
			<view >
				我的订单
			</view>
			<!-- 跳转到查询页面 -->
			<view class="icon iconfont">
				&#xe602;
			</view>
		</view>
		</view>
		 <view class="Myorder-header">
		        <view class="Myorder-header-title" :class="item.id==active? 'active':''" v-for="item,index in list" :key="item.id" @click="changeClass(item.id)">
				<view>{{item.title}}</view>
				<view>{{number[index]}}</view>
				</view>
		  </view>
		  <view >
		  	<!-- <orderList></orderList> -->
			<swiper  :current="swipactive"  duration="0" circular="true" style="height:800px;">
				<swiper-item>
						<view class="swiper-item" >
							<orderList></orderList>
						</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><Pendingpayment></Pendingpayment></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><Tobeshipped></Tobeshipped></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><Goodstobereceived></Goodstobereceived></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><Returnandexchange></Returnandexchange></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><Tobeevaluated></Tobeevaluated></view>
				</swiper-item>
			</swiper>
		  </view>
	</view>
</template>

<script>
	// 全部
	import orderList from "../orderList/index.vue"
	// 待付款
	import Pendingpayment from "../Pendingpayment/index.vue"
	// 待发货
	import Tobeshipped from "../Tobeshipped/index.vue"
	// 待收货
	import Goodstobereceived from "../Goodstobereceived/index.vue"
	// 退换货
	import Returnandexchange from "../Returnandexchange/index.vue"
	// 待评价
	import Tobeevaluated from "../Tobeevaluated/index.vue"
	export default{
		data(){
			return {
				 number:[],
				 active:1, //头部是否选中
				 swipactive:0, //订单展示
				 height:"",
				list:[{
					id:1,
				    title:"全部"
				},{
					id:2,
				    title:"待付款"
				},{
					id:3,
				    title:"待发货"
				},{
					id:4,
				    title:"待收货"
				},{
					id:5,
				    title:"退换货"
				},{
					id:6,
				    title:"待评价"
				}]
			}
		},
		components:{
		orderList,
		Pendingpayment,
		Tobeshipped,
		Goodstobereceived,
		Returnandexchange,
		Tobeevaluated},
		methods:{
			changeClass(index){
				this.active=index
				this.swipactive=index-1
			},
			back(){
				uni.navigateBack({
					delta:2
				})
			},
			// 获取用户订单分类的数量
			async GetOrderStatusNum(){
				let option = {
					"user_id":this.$store.state.uerInfo.user_id
					}
					option.sign = this.sign(option)	
					console.log(option)
				  let  arr = await this.$api.OrderStatusNum(option)
						for(let a in arr.data.Response){
							this.number.push(arr.data.Response[a])}
						// 插入待换货的数量   在此处再次发送请求进行插入
						this.number.splice(5,0,0)
						console.log(this.number)
			}
		},
		created(){
			this.GetOrderStatusNum()
		}
		// mounted(){
		// 	this.GetOrderStatusNum()
		// }
	}
</script>

<style lang="scss" scoped>
	.Myorder-box{
		.Navigation{
			width: 100%;
			height: 88rpx;
			.Navigation-box{
				width: 710rpx;
				margin-left: 20rpx;
				height: 88rpx;
				display: flex;
				justify-content: space-between;
				line-height: 88rpx;
				font-size: 34rpx;
				font-weight: bold;
				color: #333333;
			}
			.icon{
				font-size: 40rpx;
				color: #333333;
			}
		}
		.Myorder-header{
			width: 100%;
			height: 100rpx;
			display: flex;
			.Myorder-header-title{
				padding-top: 21rpx;
				flex: 1;
				height: 80rpx;
				text-align: center;
				font-size: 26rpx;
				position: relative;
			}
			.active{
				color:#46E2BC;
				border-bottom:4rpx transparent solid;
				border-image:linear-gradient(to right,#46E3BC ,#32AADF) 1 10;
			}
		}
	}
</style>
