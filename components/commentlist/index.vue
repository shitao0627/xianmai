<template>
	<!-- 用户评价 -->
	<view class="commentbox">
		<view class="commentlist" v-for="item in list" :key="item.id">
			<view class="userbox">
				<image class="headimage" :src="item.headimage"></image>
				<text class="username">{{item.username}}</text>
			</view>
			<view class="title-box">
				产品规格 : {{item.goods_title}}
			</view>
			<!-- 判断用户是否评价 -->
			<view class="userevaluate">
				{{item.userevaluate==undefined ? '此用户没有填写评价':item.userevaluate}}
			</view>
			<!-- 判断用户评论是否含有照片 -->
			<view  v-if="item.img==undefined ? false : true">
				<view  class="user_img_box">
					<!-- 循环用户上传图片数组判断照片的数量适用不同的类名 -->
					<view :class="item.img.length==1 ? 'img_box':'img_box2'" v-for="items in item.img">
						<image :src="items" :class="item.img.length==1 ? 'img_box_img':'img_box_img2'"></image>
					</view>
				</view>
			</view>
			<view class="commoditybox">
				<view class="commoditybox_img_box">
					<image class="commoditybox_img" :src="item.goods_img" ></image>
				</view>
				<view class="commoditybox_text">
					<view class="commoditybox_title">
						{{item.title}}
					</view>
					<view class="commoditybox_money">
						￥{{item.goods_money}}
						
					</view>
				</view>
			</view>
			<view class="commentbox_footer">
				<view class="commentbox_data">
					{{item.data}}
				</view>
				<view  class="commentbox-add">
					<!-- 跳转追加评论页面 -->
					<navigator>追加评论</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				img:"@/static/img/goods2.png",
				list:[{
					id:1,  //id
					username:"用户名1", //用户名
					headimage:require("@/static/img/user.png"),  //用户头像
					goods_title:"大马士革玫瑰纯露350ml",  //商品标题
					userevaluate:"很好用",    //用户评价
					goods_img:require("@/static/img/goods2.png"), //商品图片
					title:"按摩精油通经络全身推油身体颈肩足部开开开开",  //商品描述
					goods_money:"97.00",   //商品价格
					data:"2018-06-10",     //上传事件
					 
				},{
					id:2,
					username:"用户名2",
					headimage:require("@/static/img/user.png"),
					goods_title:"大马士革玫瑰纯露350ml",
					// userevaluate:"",
					goods_img:require("@/static/img/goods2.png"),
					title:"按摩精油通经络全身推油身体颈肩足部开开开开",
					goods_money:"97.00",
					data:"2018-06-10",
					
				},{
					id:3,
					username:"用户名2",
					headimage:require("@/static/img/user.png"),
					img:["../../../static/img/goods2.png"],   //用户上传的图片 有单张或多张数组表示
					goods_title:"大马士革玫瑰纯露350ml",
					// userevaluate:"",
					goods_img:require("@/static/img/goods2.png"),
					title:"按摩精油通经络全身推油身体颈肩足部开开开开",
					goods_money:"97.00",
					data:"2018-06-10",
					
				},{
					id:4,
					username:"用户名2",
					headimage:require("@/static/img/user.png"),
					img:["../../../static/img/goods2.png",
					"../../../static/img/goods2.png",
					"../../../static/img/goods2.png"],
					goods_title:"大马士革玫瑰纯露350ml",
					// userevaluate:"",
					goods_img:require("@/static/img/goods2.png"),
					title:"按摩精油通经络全身推油身体颈肩足部开开开开",
					goods_money:"97.00",
					data:"2018-06-10",
					
				},{
					id:5,
					username:"用户名2",
					headimage:require("@/static/img/user.png"),
					goods_title:"大马士革玫瑰纯露350ml",
					// userevaluate:"",
					goods_img:require("@/static/img/goods2.png"),
					title:"按摩精油通经络全身推油身体颈肩足部开开开开",
					goods_money:"97.00",
					data:"2018-06-10",
					
				}]
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.commentbox{
		.commentlist{
			margin-top: 20rpx;
			background-color: #FFFFFF;
			.userbox{
				height: 120rpx;
				// line-height: 116rpx;
				text-align: left;
				.headimage{
					margin-top: 30rpx;
					margin-left: 20rpx;
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
				}
				.username{
					color: #222222 ;
					font-size: 32rpx;
					margin-left: 20rpx;
					position: relative;
					top: -10rpx;
					font-weight: 400;
				}
			}
			.title-box{
				margin-left: 19rpx;
				height: 23rpx;
				color: #999999;
				text-align: left;
				font-size: 24rpx;
			}
			.userevaluate{
				font-weight: 400;
				font-size: 30rpx;
				text-align: left;
				margin-top: 33rpx;
				margin-left: 20rpx;
				height: 29rpx;
				color: #333333 ;
			}
			.commoditybox{
				width: 710rpx;
				height: 150rpx;
				margin-left: 20rpx;
				margin-top:20rpx ;
				display: flex;
				.commoditybox_img_box{
					width: 146rpx;
					height: 146rpx;
					.commoditybox_img{
						width: 146rpx;
						height: 146rpx;
					}
				}
				.commoditybox_text{
					width: 564rpx;
					height: 150rpx;
					background-color: #FAFAFA ;
					.commoditybox_title{
						margin-top:29rpx;
						margin-left: 20rpx;
						width: 519rpx;
						height: 30rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: #3E3E3E ;
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:1;	
					}
					.commoditybox_money{
						margin-top: 36rpx;
						margin-left: 31rpx;
						text-align: left;
						color: #333333;
						font-weight: 400;
						font-size: 28rpx;
					}
				}
			}
			.commentbox_footer{
				width: 100%;
				height: 120rpx;
				.commentbox_data{
					width: 134rpx;
					height: 19rpx;
					color: #999999;
					text-align: left;
					position: relative;
					left: 19rpx;
					bottom: -54rpx;
				}
				.commentbox-add{
					width: 140rpx;
					height: 42rpx;
					text-align: center;
					line-height: 42rpx;
					color: #46E3BC;
					border: 1px solid #46E3BC;
					float: right;
					margin-right: 20rpx;
					margin-top: 30rpx;
					
				}
			}
			.user_img_box{
				width: 710rpx;
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				margin-left: 20rpx;
			}
			.img_box{
				// margin-left: 20rpx;
				// margin-top: 28rpx;
				width: 351rpx;
				height: 351rpx;
				.img_box_img{
					width: 351rpx;
					height: 351rpx;
				}
			}
			.img_box2{
				width:232rpx ;
				height: 232rpx;
				.img_box_img2{
					width: 232rpx;
					height: 232rpx;
				}
			}
		}
	}
</style>
