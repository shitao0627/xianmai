<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back">
					<view class="icon iconfont icon-fanhui" @tap="back" v-if="showBack"></view>
				</view>
				<view class="middle"></view>
				<view class="icon-btn">
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
					<!-- <view class="icon cart" @tap="joinCart"></view> -->

					<view class="icon iconfont icon-fenxiang1" @click="onShare()"></view>
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back">
					<view class="icon iconfont icon-fanhui" @tap="back" v-if="showBack"></view>
				</view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index"
						@tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
					<!-- <view class="icon cart" @tap="joinCart"></view> -->
					<view></view>
					<view class="icon iconfont icon-fenxiang1" @click="onShare()"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">

				<view class="box" @tap="toChat">
					<view class="icon iconfont icon-kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep">
					<view class="icon iconfont" :class="[isKeep?'icon-shoucang2':'icon-shoucang1']"></view>
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
		<!-- share弹窗 -->
		<!-- <view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box">
						<image src="../../static/share/wx.png" @click="onShare()"></image>
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
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="service_title">
						<view class="zhan"></view>
						<view class="service_title_text">服务</view>
						<view class="icon iconfont icon-guanbi1" @tap="hideService"></view>
					</view>
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title" style="display: flex;align-items: center;height: 40rpx;"><text
								class="icon iconfont icon-dian"
								style="font-size: 60rpx;width: 46rpx;"></text>{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<!-- <view class="btn"><view class="button" @tap="hideService">完成</view></view> -->
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="specification_information">
						<view class="specification_information_left">
							<view class="specification_information_img">
								<image :src="checkedItem.images"></image>
							</view>
							<view class="price_inventory">
								<view class="price">&yen;{{checkedItem.price}}</view>
								<view class="inventory">库存{{checkedItem.stock}}件</view>
							</view>
						</view>
						<view class="specification_information_right">
							<view class="icon iconfont icon-guanbi1" @tap="hideSpec"></view>
						</view>
					</view>
					<view class="specification_information_title">选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in checkedItem" :class="[index==selectSpec?'on':'']"
							@tap="setSelectSpec(index)" :key="index">{{item.specification}}</view>
					</view>
					<view class="length">
						<view class="text">购买数量</view>
						<view class="price">&yen;{{number*price}}</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="">-</view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="goodsData.number" />
							</view>
							<view class="add" @tap.stop="add">
								<view class="">+</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="btn"><view class="button" @tap="hideSpec">完成</view></view> -->
				<view class="layer_buttom">
					<view class="shujia">
						<view class="shujia_left" style="display: flex;">已选<input type="number" style="width: 60rpx;text-align: center;" v-model="goodsData.number" />个</view>
						<view class="shujia_right">商品金额 <text style="color: #EA473F;"> &yen;{{checkedItem.price*goodsData.number}}</text></view>
					</view>
					<view class="button_btn">
						<view class="button_btn_right" @tap="joinCart">加入购物车</view>
						<view class="button_btn_left" @tap="toConfirmation">立即购买</view>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in goodsdetails.img_list" :key="swiper.id">
					<image :src="swiper.goods_image"></image>
				</swiper-item>
			</swiper>
			<!-- <view class="indicator">{{currentSwiper+1}}/{{goodsdetails.img_list.length}}</view> -->
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="title">
				{{goodsdetails.goods_name}}
			</view>
			<view class="price">￥{{goodsdetails.price}}</view>
			<view class="goods-info-card">
				<view class="">快递:免运费</view>
				<view class="">月销{{goodsdetails.sales_volume}}笔</view>
				<view class="">{{goodsdetails.addresss}}</view>
			</view>
		</view>
		<!-- 优惠券-规则选择 -->
		<view class="info-box spec welfare">
			<view class="row" style="display: flex;align-items: center;justify-content: space-between;">
				<view class="coupons_row">
					<view class="text"style="flex: none;">优惠券</view>
						<view class="coupons_img" v-for="(item, index) in goodsdetails.coupons_list" :key="index">
							<text>满{{item.available}}减{{item.face_value}}</text>
						</view>
				</view>
				
				<view class="coupons">
					<view class="coupons_button">立即<br />领取</view>
				</view>
			</view>
			<view class="row" style="margin: 0;border: none;">
				<view class="text">返现</view>
				<view class="content">
					购买可获得1%现金返点
				</view>
			</view>
		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row" @tap="showService">
				<view class="text">服务</view>
				<view class="content">
					<view class="serviceitem" v-for="(item,index) in goodsData.service" :key="index">{{item.name}}
					</view>
				</view>
				<view class="arrow">
					<view class="icon iconfont icon-right"></view>
				</view>
			</view>
			<view class="row" @tap="showSpec(false)">
				<view class="text">规格</view>
				<!-- <view class="content">
					<view>选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</view>
					</view>
				</view> -->
				<view class="arrow">
					<view class="icon iconfont icon-right"></view>
				</view>
			</view>
			<view class="row" style="margin: 0;border: none;">
				<view class="text" style="width: 100rpx;">产品参数</view>
				<!-- <view class="content"><view class="serviceitem" v-for="(item,index) in goodsData.service" :key="index">{{item.name}}</view></view>
				<view class="" style="font-size: 26rpx;">{{productParameter.parameter_name}}&{{productParameter.parameter_value}}</view> -->
				<view class="arrow">
					<view class="icon iconfont icon-right"></view>
				</view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						好评率98%
						<view class="icon iconfont icon-right"></view>
					</view>
				</view>
			</view>
			<view class="evaluation">
				<view class="evaluation_card">
					<view class="evaluation_card_left">
						<view class="evaluation_card_left_top">
							<image :src="goodsData.comment.userface"></image>
							<view>{{goodsData.comment.username}}</view>
						</view>
						<view class="content">{{goodsData.comment.content}}</view>
					</view>
					<view class="evaluation_card_right">
						<image :src="goodsData.comment.userface"></image>
					</view>
				</view>
				<view class="evaluation_card">
					<view class="evaluation_card_left">
						<view class="evaluation_card_left_top">
							<image :src="goodsData.comment.userface"></image>
							<view>{{goodsData.comment.username}}</view>
						</view>
						<view class="content">{{goodsData.comment.content}}</view>
					</view>
					<view class="evaluation_card_right">
						<image :src="goodsData.comment.userface"></image>
					</view>
				</view>
				<view class="evaluation_card">
					<view class="evaluation_card_left">
						<view class="evaluation_card_left_top">
							<image :src="goodsData.comment.userface"></image>
							<view>{{goodsData.comment.username}}</view>
						</view>
						<view class="content">{{goodsData.comment.content}}</view>
					</view>
					<view class="evaluation_card_right">

						<image :src="goodsData.comment.userface"></image>
					</view>
				</view>
			</view>

			<!-- <view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view> -->
		</view>
		<!-- 详情 -->
		<view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content" v-for="(item, index) in goodsdetails.goods_details" style="width: 100%;">
				<image :src="item" style="width: 100%;"></image>
			</view>
		</view>
		<!--猜你喜欢-->
		<speity style="padding-bottom: 110rpx;" :recommendList="recommendList"></speity>
	</view>
</template>

<script>
	import appShare, { closeShare } from "@/utils/share.js"
	export default {
		data() {
			return {
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11, //层级
				afterHeaderzIndex: 10, //层级
				beforeHeaderOpacity: 1, //不透明度
				afterHeaderOpacity: 0, //不透明度
				number:0,
				price:0,
				//是否显示返回按钮
				// #ifndef MP
				showBack: true,
				// #endif
				//商品信息
				goods:[{
					title:'商品商品商品商品商品商品商品商品商品商品商品商品商品商品商品商品商品商品',
					price:'8.8',
					coupon:'满5000减500',
					sales:'1231',
					specifications:[{
						number:'100ml',
					},{
						number:'200ml',
					},{
						number:'300ml',
					},{
						number:'400ml',
					},]
				}],
				//轮播主图数据
				swiperList: [{
						id: 1,
						img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg'
					},
					{
						id: 2,
						img: 'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg'
					},
					{
						id: 3,
						img: 'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg'
					},
					{
						id: 4,
						img: 'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg'
					}
				],
				//轮播图下标
				currentSwiper: 0,
				anchorlist: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: '', //服务弹窗css类，控制开关动画
				specClass: '', //规格弹窗css类，控制开关动画
				shareClass: '', //分享弹窗css类，控制开关动画
				// 商品信息
				goodsData: {
					id: 1,
					name: "商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
					price: "127.00",
					number: 1,
					img:'../../static/img/goods2.png',
					inventory:'1651',
					service: [{
							name: "极速退货",
							description: "卖家将在消费者提出退货申请的24小时内进行处理。"
						},
						{
							name: "24小时发货",
							description: "卖家将在订单完成付款后的24小时内发货，特殊情况除外。"
						},
					],
					spec: ["100ml", "200ml", "300ml", "400ml"],
					comment: {
						number: 102,
						userface: '../../static/img/goods2.png',
						username: '大黑哥',
						content: '很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
					}
				},
				selectSpec: null, //选中规格
				isKeep: false, //收藏
				address:'',
				goodsdetails:[],//产品详情
				recommend:[],//上个页面携带参数
				recommendList:[],//特色推荐
				pagesize:10,
				specification:[],//规格
				checkedItem:[],//规格
				productParameter:[],//产品参数
			};
		},
		onLoad(option) {
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数
			
			this.recommend =  JSON.parse(JSON.stringify(option))
			console.log('recommend'+this.recommend); //打印出上个页面传递的参数。
			this.getgoodsdetails()
			this.getrecommend()
			this.getspecification()
			this.getproductParameter()
			this.getappraiseNum()
			this.getappraiseList()
		},
		onReady() {
			this.calcAnchor(); //计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
		},
		onPageScroll(e) {
			//锚点切换
			this.selectAnchor = e.scrollTop >= this.anchorlist[2].top ? 2 : e.scrollTop >= this.anchorlist[1].top ? 1 : 0;
			//导航栏渐变
			let tmpY = 375;
			e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
			this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
			this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
			//切换层级
			this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
			this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showToast({
				title: '触发上拉加载'
			});
		},
		mounted() {

		},
		methods: {
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//消息列表
			// toMsg(){
			// 	uni.navigateTo({
			// 		url:'../msg/msg'
			// 	})
			// },
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
							title: "请选择规格"
						});
					});
				}
				
				let tmpList = [];
				let goods = {
					id: this.goodsData.id,
					img: '../../static/img/goods2.png',
					name: this.goodsData.name,
					spec: '规格:' + this.goodsData.spec[this.selectSpec],
					price: this.goodsData.price,
					number: this.goodsData.number,
					selected: false
				};
				tmpList.push(goods);
				uni.setStorage({
					key: 'buylist',
					data: tmpList,
					success: () => {
						this.specClass = 'hide';
						//回调
						
						this.selectSpec && this.specCallback && this.specCallback();
						this.specCallback = false;
						setTimeout(() => {
							this.specClass = 'none';
						}, 200);
						uni.showToast({
							title: "已加入购物车"
						});
					}
				})
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
			//商品评论
			toRatings() {
				uni.navigateTo({
					url: '../evaluation/evaluation'
				})
			},
			//跳转确认订单页面
			toConfirmation() {
				let tmpList = [];
				let goods = {
					id: this.goodsdetails.goods_id,
					img: this.goodsdetails.goods_image,
					name: this.goodsdetails.goods_name,
					// spec: '规格:' + this.goodsdetails.spec[this.selectSpec],
					price: this.goodsdetails.price,
					number: this.goodsData.number,
					selected: false,
					coupons: this.goodsdetails.coupons_list
				};
				tmpList.push(goods);
				uni.setStorage({
					key: 'buylist',
					data: tmpList,
					success: () => {
						uni.navigateTo({
							url: '../order/order'
						})
					}
				})
			},
			//跳转评论列表
			showComments(goodsid) {
				uni.navigateTo({
					url:"../evaluation/evaluation"
				})
			},
			//跳转订单页
			toorder(){
				uni.navigateTo({
					url:'../order/order'
				})
			},
			//选择规格
			setSelectSpec(index) {
				this.selectSpec = index;
				this.number = this.checkedItem[index].number
				this.price = this.checkedItem[index].price
			},
			//减少数量
			sub() {
				if (this.goodsData.number <= 1) {
					return;
				}
				this.number--;
			},
			//增加数量
			add() {
				this.number++;
			},
			//跳转锚点
			toAnchor(index) {
				this.selectAnchor = index;
				uni.pageScrollTo({
					scrollTop: this.anchorlist[index].top,
					duration: 200
				});
			},
			//计算锚点高度
			calcAnchor() {
				this.anchorlist = [{
						name: '主图',
						top: 0
					},
					{
						name: '评价',
						top: 0
					},
					{
						name: '详情',
						top: 0
					}
				]
				let commentsView = uni.createSelectorQuery().select("#comments");
				commentsView.boundingClientRect((data) => {
					let statusbarHeight = 0;
					//APP内还要计算状态栏高度
					// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
					// #endif
					let headerHeight = uni.upx2px(100);
					this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
					this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;

				}).exec();
			},
			//返回上一页
			back() {
				uni.switchTab({
					url:'../classify/index'
				})
			},
			toshoping(){
				uni.switchTab({
					url:"../shopping/index"
				})
			},
			//服务弹窗
			showService() {
				console.log('show');
				this.serviceClass = 'show';
			},
			//关闭服务弹窗
			hideService() {
				this.serviceClass = 'hide';
				setTimeout(() => {
					this.serviceClass = 'none';
				}, 200);
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback() {
				return;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调

				this.selectSpec && this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			discard() {
				//丢弃
			},
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
			// 获取商品详情信息
			getgoodsdetails() {
				this.loading = true
				let params = {
					user_id: 0,
					goods_id: this.recommend.goods_id,
					address: this.address
				}
				params.sign = this.sign(params)
				this.$api.goodsdetails(params).then((res) => {
					this.loading = false;
					this.goodsdetails = res.data.Response
					console.log('goodsdetails', this.goodsdetails)
					// console.log('navigation', this.navigation)
				}).catch((err) => {
					this.loading = false;
				})
			},
			// 获取规格
		async getspecification() {
				this.loading = true
				let params = {
					goodsId: this.recommend.goods_id
				}
				params.sign = this.sign(params)
				let arr=await this.$api.specification(params)
				 this.checkedItem=arr.data.Response.spList
				console.log(this.checkedItem)
				},
				
			// 	.then((res) => {
			// 		this.loading = false;
			// 		this.specification = res.data.Response
			// 		this.checkedItem = res.data.Response.spList[0]
			// 		console.log('specification', this.specification)
			// 		console.log('checkedItem', this.checkedItem)
			// 		console.log('navigation', this.navigation)
			// 	}).catch((err) => {
			// 		this.loading = false;
			// 	})
			// },
			// 获取产品参数
			getproductParameter() {
				this.loading = true
				let params = {
					goods_id: this.recommend.goods_id
				}
				params.sign = this.sign(params)
				this.$api.productParameter(params).then((res) => {
					this.loading = false;
					this.productParameter = res.data.Response[0]
					console.log('productParameter', this.productParameter[0])
					// console.log('navigation', this.navigation)
				}).catch((err) => {
					this.loading = false;
				})
			},
			// 获取商品评价数量
			getappraiseNum() {
				this.loading = true
				let params = {
					goods_id: this.recommend.goods_id,
				}
				params.sign = this.sign(params)
				this.$api.appraiseNum(params).then((res) => {
					this.loading = false;
					this.appraiseNum = res.data.Response
					console.log('appraiseNum', this.appraiseNum)
					// console.log('navigation', this.navigation)
				}).catch((err) => {
					this.loading = false;
				})
			},
			// 获取商品评价列表
			getappraiseList() {
				this.loading = true
				let params = {
					goods_id: this.recommend.goods_id,
					pagesize: 20,
					page: 1,
					type: 1,
				}
				params.sign = this.sign(params)
				this.$api.appraiseList(params).then((res) => {
					this.loading = false;
					this.appraiseList = res.data.Response
					console.log('appraiseList', this.appraiseList)
					// console.log('navigation', this.navigation)
				}).catch((err) => {
					this.loading = false;
				})
			},
			// 获取特色推荐
			getrecommend(){
				this.loading = true
				let getRecommendParams = {
				        pagesize: 20,
				        address: this.address,
				        page: 1,
				        type: 1,
				    }
				getRecommendParams.sign = this.sign(getRecommendParams)
				this.$api.recommendList(getRecommendParams).then((res)=>{
					this.loading = false;
					// console.log('request success', res)
				
					this.recommendList = res.data.Response
					console.log('recommendList_detals', this.recommendList)
					// this.navigation = res.data.Response.list
					// console.log('navigation', this.navigation)
					// this.res = '请求结果 : ' + JSON.stringify(res);
				}).catch((err)=>{
					this.loading = false;
					// console.log('request fail', err);
				})
			},
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.icon {
		font-size: 26upx;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		background-color: #f1f1f1;
		transition: opacity 0.05s linear;
	}

	.header {
		width: 100%;

		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			transition: opacity 0.05s linear;

			.back {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;

				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 66upx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding-left: 8rpx;
					font-size: 40upx;
				}
			}

			.middle {
				width: 100%;
			}

			.icon-btn {
				width: 60upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;

				.icon {
					&:first-child {
						margin-right: 5upx;
					}

					width: 66upx;
					height: 66upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 44upx;
				}
			}
		}

		.before {
			.back {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
				}
			}

			.icon-btn {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;

				}
			}
		}

		.after {
			background-color: #f1f1f1;

			.back {
				.icon {
					color: #666;
				}
			}

			.icon-btn {
				.icon {
					color: #666;
				}
			}

			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 7%;

				view {
					width: (100%/3);
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;

					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;

		.goods-info-card {
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				font-size: 28upx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #999999;
			}
		}
	}

	.goods-info {
		.price {
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #EA473F;
			line-height: 100upx;
		}

		.title {
			font-size: 32rpx;
			font-family: PingFangSC;
			font-weight: 600;
			color: #333333;
			line-height: 48upx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
	}

	.spec {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 20upx 0;
			border-bottom: 1px solid #e7e7e7;

			.text {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
				line-height: 60rpx;
				width: 80rpx;
			}

			.content {
				font-size: 30upx;
				display: flex;
				flex-wrap: wrap;

				.serviceitem {
					margin-right: 10upx;
					font-size: 30rpx;
				}

				.sp {
					width: 100%;
					display: flex;

					view {
						background-color: #f6f6f6;
						padding: 5upx 10upx;
						color: #999;
						margin-right: 10upx;
						font-size: 20upx;
						border-radius: 5upx;

						&.on {
							border: solid 1upx #f47952;
							padding: 4upx 8upx;
						}
					}
				}
			}
			.coupons{
				.coupons_button{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					background: linear-gradient(0deg, #FF6465, #FF1D35, #FF142E);
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
					padding-top: 4rpx;
				}
			}

			.arrow {
				position: absolute;
				right: 4%;

				.icon {
					color: #ccc;
				}
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 30upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;

					.icon {
						color: #17e6a1;
					}
				}
			}
		}

		.evaluation {
			margin-right: 10px;
			border-radius: 8px;
			display: flex;
			// white-space: nowrap;
			/*overflow-x: scroll;*/
			overflow-y: hidden;
			height: 280upx;
			width: 100%;

			.evaluation_card {
				display: flex;
				width: 500upx;
				margin: 10px;
				box-shadow: 10upx 10upx 10upx #E7E7E7;

				.evaluation_card_left {
					width: 250upx;
					padding: 15upx;

					.evaluation_card_left_top {
						display: flex;
						align-items: center;

						image {
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}

						view {
							width: 180upx;
						}
					}

					.content {
						width: 250upx;
					}
				}

				.evaluation_card_right {
					width: 250upx;
					height: 240upx;

					image {
						width: 250upx;
						height: 240upx;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;

				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}

				.username {
					font-size: 24upx;
					color: #999;
				}
			}

			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #666;
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

				.icon-shoucang1 {
					color: #828282;
					// background: linear-gradient(0deg, #46E3BC, #32AADF);
				}
				.icon-shoucang2{
					color: #46E3BC;
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

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 100%;
			// padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			.content {
				width: 100%;
				padding: 20upx 30rpx;
				
				.service_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #e7e7e7;
					// padding: 0 20rpx;

					.service_title_text {
						font-size: 40rpx;
						font-family: PingFangSC;
						font-weight: 400;
						color: #333333;
						line-height: 100rpx;
					}

					.icon {
						font-size: 60rpx;
						font-weight: 400;
						color: #999999;
					}

					.zhan {
						width: 50rpx;
					}
				}
				.specification_information{
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					padding-bottom: 20rpx;
					// padding: 0 30rpx;
					.specification_information_left{
						display: flex;
						align-items: flex-end;
						.specification_information_img{
							width: 200rpx;
							height: 120rpx;
							position: relative;
							image{
								position: absolute;
								top: -80rpx;
								left: 0;
								height: 200rpx;
								width: 200rpx;
								border-radius: 10rpx;
							}
						}
						.price_inventory{
							padding: 0 30rpx;
							.price{
								font-size: 40rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #EA473F;
								padding-bottom: 10rpx;
							}
							.inventory{
								font-size: 26rpx;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #666666;
							}
						}
					}
					.specification_information_right{
						.icon{
							font-size: 60rpx;
							color: #999999;
						}
					}
				}
				.specification_information_title{
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
					padding: 30rpx 0;
					border-top: 1px solid #e7e7e7;
				}
			}
			.layer_buttom{
				width: 100%;
				.shujia{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30rpx;
					border-top: 1px solid #e7e7e7;
					.shujia_left{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 60rpx;
						display: flex;
					}
					.shujia_right{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 60rpx;
						text{
							font-size: 28rpx;
						}
					}
				}
				.button_btn{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.button_btn_left{
						width: 50%;
						text-align: center;
						line-height: 110rpx;
						background: #555555;
						color: #FFFFFF;
						font-size: 32rpx;
						background: linear-gradient(90deg, #46E3BC, #32AADF);
					}
					.button_btn_right{
						width: 50%;
						font-size: 32rpx;
						text-align: center;
						line-height: 110rpx;
						background: #555555;
						color: #FFFFFF;
					}
				}
			}
			

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
				}

				.description {
					font-size: 30upx;
					color: #999;
					padding: 0 48rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #7F7E7F;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 30upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;
					line-height: 50rpx;

					&.on {
						background: linear-gradient(90deg, #46E3BC, #32AADF);
						color: #FFFFFF;
						font-size: 28upx;
						padding: 5upx 30upx;
						border-radius: 8upx;
						margin: 0 30upx 20upx 0;
					}
				}
			}

			.length {
				margin-top: 30upx;
				// border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 0;
				border-bottom: 1px solid #e7e7e7;
				border-top: 1px solid #e7e7e7;
				.text {
					font-size: 32rpx;
					font-family: PingFangSC;
					font-weight: 400;
					color: #333333;
				}
				.price{
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #EA473F;
				}
				.number {
					display: flex;
					justify-content: center;
					align-items: flex-end;

					.input {
						width: 70upx;
						height: 55upx;
						margin: 0upx;
						background-color: #FFFFFF;
						border-top: 1px solid #666666;
						border-bottom: 1px solid #666666;
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
						height: 55upx;
						background-color: #FFFFFF;
						border-radius: 5upx;
						border: 1px solid #7F7F7F;
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
	}

	.share {
		display: none;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.15s linear both;
			}

			.layer {
				animation: showLayer 0.15s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.15s linear both;
			}

			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			background-color: rgba(0, 0, 0, .5);
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			z-index: 11;
		}

		.layer {
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255, 255, 255, 1);

			.list {
				width: 100%;
				display: flex;
				padding: 10upx 0 30upx 0;

				.box {
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					image {
						width: 13.8vw;
						height: 13.8vw;
					}

					.title {
						margin-top: 10upx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 26upx;
					}
				}
			}

			.btn {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				border-top: solid 1upx #666666;
			}

			.h1 {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
			}
		}
		
	}
	.coupons_row{
		display: flex;
		align-items: center;
		.coupons_img{
			background: url(../../static/img/coupon.png) no-repeat;
			 background-size: 100%;
			 padding: 12rpx 22rpx;
			 width: 150rpx;
			 text-align: center;
			text{
				font-size: 26rpx;
				color: #FFFFFF;
				width: 100%;
				text-align: center;
				
			}
		}
	}
	
</style>
