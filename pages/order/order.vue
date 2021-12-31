<template>
	<view class="order">
		<!-- <view class="order_header">
			<view class="icon iconfont icon-fanhui" @tap="back"></view>
			<view class="order_title">确认订单</view>
			<view class="icon"></view>
		</view> -->
		<!-- 地址 -->
		<navigator url="/pages/address/address?source=1" class="address-section">
			<view class="order-content">
				<view class="yticon icon iconfont icon-dizhi"></view>
				<view class="cen">
					<view class="top">
						<view class="name"><text>收货人:</text>{{addressData.name}}</view>
						<view class="mobile">{{addressData.mobile}}</view>
					</view>
					<view class="address"><text>收货地址：</text>{{addressData.address}} {{addressData.area}}</view>
				</view>
				<text class="yticon icon iconfont icon-right"></text>
			</view>

			<image class="a-bg" src="../../static/img/address_buttom.png"></image>
		</navigator>

		<view class="goods-section">
			<!-- <view class="g-header b-b">
				<image class="logo" src="http://duoduo.qibukj.cn/./Upload/Images/20190321/201903211727515.png"></image>
				<text class="name">西城小店铺</text>
			</view> -->
			<!-- 商品列表 -->
			<view class="g-item" v-for="item in buylist">
				<image :src="item.img"></image>
				<view class="right">
					<view class="title clamp">{{item.name}}</view>
					<view class="spec">{{item.spec}}</view>
					<view class="price-box">
						<text class="price">￥{{item.price}}</text>
						<text class="number">x{{item.number}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="g-item">
				<image src="../../static/img/goods2.png"></image>
				<view class="right">
					<view class="title clamp">韩版于是洞洞拖鞋 夏季浴室防滑简约居家【新人专享，限选意见】</view>
					<view class="spec">春装款 L</view>
					<view class="price-box">
						<view class="price">￥17.8</view>
						<view class="number">x 1</view>
					</view>
				</view>
			</view> -->
		</view>

		<!-- 订单明细 -->
		<view class="yt-list">
			<view class="length">
				<view class="text">购买数量</view>
				<view class="number">
					<view class="sub" @tap.stop="sub">
						<view class="">-</view>
					</view>
					<view class="input" v-for="item in buylist">
						<input type="number" v-model="item.number" />
					</view>
					
					<view class="add" @tap.stop="add">
						<view class="">+</view>
					</view>
				</view>
			</view>
			<view class="yt-list-cell b-b" @click="toggleMask('show')">
				<text class="cell-tit clamp">优惠券</text>
				<text class="cell-tip active">
					<text>3张可用</text>
					<text class="icon iconfont icon-right"></text>
				</text>
				<text class="cell-more wanjia wanjia-gengduo-d"></text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">运费</text>
				<text class="cell-tip">免运费</text>
				<text class="icon iconfont icon-right"></text>
			</view>
			<view class="yt-list-cell b-b" @tap="toinvoice">
				<text class="cell-tit clamp">发票</text>
				<text class="cell-tip">明细-个人</text>
				<text class="icon iconfont icon-right"></text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">使用金币&yen;0.07</text>
				<text class="cell-tip">
					<view><switch checked color="#19a538" style="transform: scale(.7,.7);" @change="switch1Change" /></view>
				</text>
			</view>
			<view class="yt-list-cell desc-cell">
				<text class="cell-tit clamp">买家留言</text>
				<input class="desc" type="text" v-model="desc" placeholder="请填写备注信息" placeholder-class="placeholder" />
			</view>
		</view>
		
		
		<!-- 底部 -->
		<view class="footer">
			<view class="price-content">
				<text>合计金额：</text>
				<text class="price">&yen;{{this.goodsPrice}}</text>
				<!-- <text class="price">475</text> -->
				<view class="cash_back">收货返现金：¥9.00</view>
			</view>
			<text class="submit" @click="toggleMaskpay('show')">提交订单</text>
		</view>
		
		<!-- 优惠券面板 -->
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 优惠券页面，仿mt -->
				<view class="coupon_header">
					<view class="zhan"></view>
					<view class="title">优惠券</view>
					<view class="icon iconfont icon-guanbi1"  @tap="toggleMask"></view>
				</view>
				<view class="coupon-item" v-for="(item,index) in couponList" :key="index">
					<view class="con">
						<view class="left">
							<view class="price"><text style="font-size: 34rpx;padding-right: 10rpx;">&yen;</text>{{item.price}}</view>
							<view class="price_jian">满300元可用</view>
						</view>
						<view class="middle">
							<view class="title">{{item.title}}</view>
							<view class="time">有效期至2019-06-30</view>
						</view>
						
						<view class="right">
							<view class="coupons_button">立即使用</view>
						</view>
						
						<view class="circle l"></view>
						<view class="circle r"></view>
					</view>
					<view class="gz">
						<text>使用规则：</text>
						<text class="tips">限新用户使用</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 支付面板 -->
		<view class="mask" :class="maskpay===0 ? 'none' : maskpay===1 ? 'show' : ''" @click="toggleMaskpay">
			<view class="mask-content" @click.stop.prevent="stopPrevent">
				<!-- 支付面板 -->
				<view class="coupon_header">
					<view class="zhan"></view>
					<view class="title">选择支付方式</view>
					<view class="icon iconfont icon-guanbi1" @click="toggleMaskpay"></view>
				</view>
				<view class="pay-type-list">
					<view class="type-item b-b" @click="changePayType(1)">
						<text class="icon iconfont icon-weixin2"></text>
						<view class="con">
							<text class="tit">微信支付</text>
						</view>
						<label class="radio">
							<radio value="" color="#18CB6D" :checked='payType == 1' />
							</radio>
						</label>
					</view>
					<view class="type-item b-b" @click="changePayType(2)">
						<text class="icon iconfont icon-31haoyou"></text>
						<view class="con">
							<text class="tit">微信好友代付</text>
						</view>
						<label class="radio">
							<radio value="" color="#18CB6D" :checked='payType == 2' />
							</radio>
						</label>
					</view>
					<view class="type-item b-b" @click="changePayType(3)">
						<text class="icon iconfont icon-alipay"></text>
						<view class="con">
							<text class="tit">支付宝支付</text>
						</view>
						<label class="radio">
							<radio value="" color="#18CB6D" :checked='payType == 3' />
							</radio>
						</label>
					</view>
					<view class="type-item" @click="changePayType(4)">
						<text class="icon iconfont icon-icon-test"></text>
						<view class="con">
							<text class="tit">余额支付</text>
							<text>可用余额 ¥198.5</text>
						</view>
						<label class="radio">
							<radio value="" color="#18CB6D" :checked='payType == 4' />
							</radio>
						</label>
					</view>
					<view class="type-item" @click="changePayType(5)">
						<text class="icon iconfont icon-shouhuoicon"></text>
						<view class="con">
							<text class="tit">货到付款</text>
						</view>
						<label class="radio">
							<radio value="" color="#18CB6D" :checked='payType == 5' />
							</radio>
						</label>
					</view>
				</view>
				<!--去付款-->
				<view class="topay"  @click="toggleMaskpay">
					<view class="topay_button" v-if="payType==1">微信支付{{this.goodsPrice}}元</view>
					<view class="topay_button" v-if="payType==2" @tap="topaid">好友代付{{this.goodsPrice}}元</view>
					<view class="topay_button" v-if="payType==3">支付宝支付{{this.goodsPrice}}元</view>
					<view class="topay_button" v-if="payType==4" @tap="show = true">余额支付{{this.goodsPrice}}元</view>
					<view class="topay_button" v-if="payType==5">银行卡支付{{this.goodsPrice}}元</view>
				</view>
			</view>
		</view>
		<passkeyborad :buylist="this.goodsPrice" :show="show" @close="close"></passkeyborad>
	</view>
</template>
 
<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	export default {
		components: {
			passkeyborad,
		},
		data() {
			return {
				show: false,
				buylist:[],		//订单列表
				maskState: 0, //优惠券面板显示状态
				maskpay:0, //支付面板
				desc: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [
					{
						title: '新用户专享优惠券',
						price: 5,
					},
					{
						title: '庆五一发一波优惠券',
						price: 10,
					},
					{
						title: '优惠券优惠券优惠券优惠券',
						price: 15,
					}
				],
				addressData: {
					name: '许小星',
					mobile: '13853989563',
					addressName: '金九大道',
					address: '山东省济南市历城区山东省济南市历城区',
					area: '149号',
					default: false,
				}
			}
		},
		onShow() {
			//页面显示时，加载订单信息
			uni.getStorage({
				key:'buylist',
				success: (ret) => {
					this.buylist = ret.data;
					this.goodsPrice=0;
					//合计
					let len = this.buylist.length;
					for(let i=0;i<len;i++){
						this.goodsPrice = this.goodsPrice + (this.buylist[i].number*this.buylist[i].price);
					}
					this.deduction = this.int/100;
					this.sumPrice = this.goodsPrice-this.deduction+this.freight;
				}
			});
			// uni.getStorage({
			// 	key:'selectAddress',
			// 	success: (e) => {
			// 		this.recinfo = e.data;
			// 		uni.removeStorage({
			// 			key:'selectAddress'
			// 		})
			// 	}
			// });
			console.log(this.buylist)
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		onLoad(option){
			//商品数据
			//let data = JSON.parse(option.data);
			//console.log(data);
		},
		methods: {
			clearOrder(){
				uni.removeStorage({
					key: 'buylist',
					success: (res)=>{
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
			//显示优惠券面板
			toggleMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskState = 2;
				setTimeout(()=>{
					this.maskState = state;
				}, timer)
			},
			//显示支付面板
			toggleMaskpay(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.maskpay = 2;
				setTimeout(()=>{
					this.maskpay = state;
				}, timer)
			},
			numberChange(data) {
				this.number = data.number;
			},
			submit(){
				uni.redirectTo({
					url: '/pages/money/pay'
				})
			},
			stopPrevent(){},
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			toinvoice(){
				uni.navigateTo({
					url:'../invoice/invoice'
				})
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
				// console.log(type)
			},
			topaid(){
				var buylist = JSON.stringify(this.buylist)
				uni.navigateTo({
					url:"../paid/paid?buylist=" + buylist
				})
			},
			//减少数量
			sub() {
				if (this.buylist.number <= 1) {
					return;
				}
				this.buylist.number--;
				console.log("132"+this.buylist.number)
			},
			//增加数量
			add() {
				this.buylist.number++;
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 100upx;
	}
	.order{
		.order_header {
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
		
			.order_title {
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
		.address-section {
			padding: 30upx 0;
			background: #fff;
			position: relative;
			// margin-top: 100rpx;
			.order-content {
				display: flex;
				align-items: center;
				.icon-dizhi{
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100rpx;
					color: #888;
					font-size: 44upx;
				}
			}
		
			.icon-shouhuodizhi {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 90upx;
				color: #888;
				font-size: 44upx;
			}
		
			.cen {
				display: flex;
				flex-direction: column;
				flex: 1;
				font-size: 28upx;
				margin-right: 30rpx;
				.top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.name{
						font-size: 30rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #333333;
					}
					.mobile{
						font-size: 30rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #333333;
					}
				}
				.address{
					font-size: 30rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
					line-height: 44rpx;
				}
			}
			
			.name {
				font-size: 34upx;
				margin-right: 24upx;
			}
		
			.address {
				margin-top: 16upx;
				margin-right: 20upx;
				
			}
		
			.icon-right {
				font-size: 32upx;
				
				margin-right: 30upx;
			}
		
			.a-bg {
				position: absolute;
				left: 0;
				bottom: 0;
				display: block;
				width: 100%;
				height: 5upx;
			}
		}
		
		.goods-section {
			margin-top: 24upx;
			background: #fff;
			padding-bottom: 1px;
			padding: 20rpx;
		
			
			.logo {
				display: block;
				width: 50upx;
				height: 50upx;
				border-radius: 100px;
			}
		
			.name {
				font-size: 30upx;
				
				margin-left: 24upx;
			}
		
			.g-item {
				display: flex;
				margin: 20upx 10upx;
		
				image {
					flex-shrink: 0;
					display: block;
					width: 180upx;
					height: 180upx;
					border-radius: 4upx;
				}
		
				.right {
					flex: 1;
					padding-left: 24upx;
					overflow: hidden;
				}
		
				.title {
					font-size: 30rpx;
					line-height: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
		
				.spec {
					font-size: 28rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #999999;
					line-height: 50rpx;
				}
		
				.price-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 32upx;
					
					padding-top: 10upx;
		
					.price {
						margin-bottom: 4upx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #EA473F;
					}
					.number{
						font-size: 32rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #333333;
					}
				}
		
				.step-box {
					position: relative;
				}
			}
		}
		.yt-list {
			margin-top: 16upx;
			background: #fff;
			padding-bottom: 50rpx;
			.length {
				margin-top: 30upx;
				// border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30upx;
				border-bottom: 1px solid #e7e7e7;
				border-top: 1px solid #e7e7e7;
				.text {
					font-size: 30rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
				}
				.price{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #EA473F;
				}
				.number {
					display: flex;
					justify-content: center;
					align-items: flex-end;
			
					.input {
						width: 80upx;
						height: 56upx;
						margin: 0upx;
						background-color: #FFFFFF;
						border-top: 1px solid #888;
						border-bottom: 1px solid #888;
						input {
							width: 70upx;
							height: 50upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 30upx;
							color: #333333;
						}
					}
			
					.sub,
					.add {
						width: 80upx;
						height: 56upx;
						background-color: #FFFFFF;
						border-radius: 5upx;
						border: 1px solid #888;
						font-size: 40upx;
						text-align: center;
						line-height: 50upx;
			
						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
			
						}
					}
				}
			}
		}
		
		.yt-list-cell {
			display: flex;
			align-items: center;
			padding: 10upx 30upx 10upx 30upx;
			line-height: 70upx;
			position: relative;
		
			&.cell-hover {
				background: #fafafa;
			}
		
			&.b-b:after {
				left: 30upx;
			}
		
			.cell-icon {
				height: 32upx;
				width: 32upx;
				font-size: 22upx;
				color: #fff;
				text-align: center;
				line-height: 32upx;
				background: #f85e52;
				border-radius: 4upx;
				margin-right: 12upx;
		
				&.hb {
					background: #ffaa0e;
				}
		
				&.lpk {
					background: #3ab54a;
				}
		
			}
		
			.cell-more {
				align-self: center;
				font-size: 24upx;
				
				margin-left: 8upx;
				margin-right: -10upx;
			}
		
			.cell-tit {
				flex: 1;
				font-size: 30upx;
				
				margin-right: 10upx;
			}
		
			.cell-tip {
				font-size: 26upx;
				
		
				&.disabled {
					
				}
		
				&.active {
					
				}
				&.red{
					
				}
			}
		
			&.desc-cell {
				.cell-tit {
					max-width: 120upx;
				}
			}
		
			.desc {
				flex: 1;
				font-size: 28rpx;
				
			}
		}
		
		
		
		
		.footer{
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 995;
			display: flex;
			align-items: center;
			width: 100%;
			height: 120upx;
			justify-content: flex-end;
			font-size: 30upx;
			background-color: #fff;
			z-index: 998;
			
			box-shadow: 0 -1px 5px rgba(0,0,0,.1);
			.price-content{
				padding-right: 30upx;
				font-size: 32rpx;
				text-align: right;
				.cash_back{
					font-size: 28rpx;
					padding-top: 10rpx;
				}
			}
			.price-tip{
				
				margin-right: 8upx;
			}
			.price{
				font-size: 34upx;
				font-weight: bold;
				color: #EA473F;
			}
			.submit{
				display:flex;
				align-items:center;
				justify-content: center;
				width: 260upx;
				height: 100%;
				color: #FFFFFF;
				background: linear-gradient(90deg, #46E3BC, #32AADF);
				font-size: 32upx;
				
			}
		}
		
		/* 优惠券面板 */
		.mask{
			display: flex;
			align-items: flex-end;
			position: fixed;
			left: 0;
			top: var(--window-top);
			bottom: 0;
			width: 100%;
			background: rgba(0,0,0,0);
			z-index: 9995;
			transition: .3s;
			
			.mask-content{
				width: 100%;
				min-height: 30vh;
				max-height: 70vh;
				background: #f3f3f3;
				transform: translateY(100%);
				transition: .3s;
				overflow-y:scroll;
				.coupon_header{
					background: #FFFFFF;
					padding: 30rpx;
					display: flex;align-items: center;
					justify-content: space-between;
					.zhan{
						width: 40rpx;
					}
					.title{
						font-size: 36rpx;
						font-weight: 400;
						color: #333333;
						line-height: 50rpx;
					}
					.icon{
						font-size: 46rpx;
						color: #999999;
					}
				}
			}
			&.none{
				display: none;
			}
			&.show{
				background: rgba(0,0,0,.4);
				
				.mask-content{
					transform: translateY(0);
				}
			}
		}
		
		/* 优惠券列表 */
		.coupon-item{
			display: flex;
			flex-direction: column;
			margin: 20upx 24upx;
			background: #fff;
			box-shadow: 0px 9px 27px 0px rgba(225, 226, 234, 0.7);
			.gz{
				display: flex;
				align-items: center;
				padding-left: 30rpx;
				background: #FAFAFA;
				text{
					font-size: 24upx;
					line-height: 60rpx;
					color: #999999;
				}
			}
			.con{
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				position: relative;
				// height: 180upx;
				padding: 50rpx 30upx;
				
				&:after{
					position: absolute;
					left: 0;
					bottom: 0;
					content: '';
					width: 100%;
					height: 0;
					border-bottom: 1px dashed #f3f3f3;
					transform: scaleY(50%);
				}
			}
			.left{
				display: flex;
				flex-direction: column;
				justify-content: center;
				overflow: hidden;
				// height: 100upx;
			}
			.title{
				font-size: 28upx;
				
				margin-bottom: 10upx;
			}
			.time{
				font-size: 22upx;
				
			}
			.middle{
				.title{
					font-size: 30rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #666666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					width: 270rpx;
					
				}
				.time{
					font-size: 26rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #666666;
				}
			}
			.right{
				display: flex;
				align-items: center;
				.coupons_button{
					background: linear-gradient(90deg, #46E3BC, #32AADF);
					color: #FFFFFF;
					padding: 16rpx 30rpx;
					border-radius: 50rpx;
					font-size: 28rpx;
				}
			}
			.price{
				font-size: 56rpx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #06C1AE;
				text-align: center;
				
				// &:before{
				// 	content: '￥';
				// 	font-size: 34upx;
				// }
			}
			.price_jian{
				font-size: 28rpx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #06C1AE;
			}
			.tips{
				
			}
			.circle{
				position: absolute;
				left: -6upx;
				bottom: -10upx;
				z-index: 10;
				width: 20upx;
				height: 20upx;
				background: #f3f3f3;
				border-radius: 100px;
				&.r{
					left: auto;
					right: -6upx;
				}
			}
		}
		//支付面板
		.pay-type-list {
			// margin-top: 20upx;
			background-color: #fff;
			padding: 0 20upx;
			
			.type-item{
				// height: 120upx;
				padding: 20upx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// padding-right: 60upx;
				font-size: 30upx;
				position:relative;
				border-top: 1px solid #e7e7e7;
			}
			
			.icon{
				// width: 100upx;
				// padding: 4rpx;
				font-size: 60upx;
				color: #FFFFFF;
				border-radius: 8rpx;
				margin-right: 40rpx;
			}
			.icon-weixin2{
				background: #18CB6D;
			}
			.icon-31haoyou{
				background: rgb(255,135,0);
			}
			.icon-alipay{
				background: rgb(8,161,248);
			}
			.icon-icon-test{
				background: rgb(193,49,72);
			}
			.icon-shouhuoicon{
				background: rgb(52,178,124);
			}
			.tit{
				margin-bottom: 4upx;
			}
			.con{
				flex: 1;
				display: flex;
				flex-direction: column;
			}
		}
		.topay{
			.topay_button{
				color: #FFFFFF;
				font-size: 30rpx;
				font-family: PingFangSC;
				font-weight: 400;
				background: linear-gradient(90deg, #46E3BC, #32AADF);
				text-align: center;
				line-height: 110rpx;
			}
		}
	}
	

</style>
