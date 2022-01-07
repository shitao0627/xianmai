<template>
	<!-- 评价界面 -->
	<view class="scores">
		<view class="score-box">
			<view class="score-img-box">
				<image class="score-img" src="../../static/img/goods2.png" mode=""></image>
			</view>
			<view class="score-title">
				描述相符
			</view>
			<view class="score">
				<htzrate @change="ceshiChange" v-model="data.value" :size="40" :gutter="40"></htzrate>
			</view>
			<view class="score-text">
				{{data.score}}
			</view>
		</view>
		<view class="evaluate">
			<view class="evaluate-text">
				<textarea v-model="data.text" placeholder="商品是否满足您的期待呢？请点评一下吧!" style="width: 100%;">123</textarea>
			</view>
			<view class="evaluate-img">
				<upload :limit="3" @select="select">
					<view class="img-box">
						<text class="icon iconfont icontext">&#xe7df;</text>
						<view class="text">
							上传凭证
						</view>
						<view class="text">
							（最多三张）
						</view>
					</view>
				</upload>
			</view>
			<view class="Submit" @click="Submit">提交</view>
		</view>
	</view>
</template>

<script>
	import htzrate from "../htz-rate/htz-rate.vue"
	import upload from "../uni-file-picker/uni-file-picker.vue"
	export default{
		data(){
			return {
				data:{
					value:0,
					 imageValue:[],
					 text:"",
					 score:""
				},
				list:["较差","尚可","一般","良好","非常好"]
			}
		},
		methods:{
			Submit() {
				console.log(this.data)
				uni.navigateTo({
					url:"/pages/my/successOk/successOk"
				})
			},
			select(e) {
				if (e.tempFilePaths.length == 1) {
					e.tempFilePaths.map(item => {
						this.data.imageValue.push(item)
					})
				} else if (e.tempFilePaths.length == 2) {
					e.tempFilePaths.map(item => {
						this.data.imageValue.push(item)
					})
				} else if (e.tempFilePaths.length == 3) {
					this.data.imageValue = [],
						e.tempFilePaths.map(item => {
							this.data.imageValue.push(item)
						})
				}
			},
			ceshiChange(val) {
				this.data.score=this.list[val-1]
			                uni.showToast({
			                    title: '你选择了' + val + '分',
			                    icon: 'none',
			                    duration: 1000
			                });
			            },
		},
		components:{
			htzrate,
			upload
		}
	}
</script>

<style lang="scss" scoped>
	.scores{
		.score-box{
			height: 108rpx;
			border-top: 1rpx solid #E0E0E0;
			border-bottom: 1rpx solid #E0E0E0 ;
			display: flex;
			line-height: 108rpx;
			padding-left: 20rpx;
			background-color: #FFFFFF;
			.score-img-box{
				margin-top: 20rpx;
				width: 68rpx;
				height: 68rpx;
				.score-img{
					width: 68rpx;
					height: 68rpx;
				}
			}
			.score-title{
				margin-left: 20rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #333333 ;
			}
			.score{
				margin-top: 10rpx;
				margin-left:30rpx;
			}
			.score-text{
				color: #999999;
				font-size: 28rpx;
			}
		}
		.evaluate{
			height: 444rpx;
			background-color: #FFFFFF;
			padding: 20rpx;
			.evaluate-text{
				height: 220rpx;
			}
			.evaluate-img{
				.img-box {
					width: 160rpx;
					height: 160rpx;
					color: #CCCCCC;
					text-align: center;
				
					.icontext {
						font-size: 80rpx;
					}
				
					.text {
						transform: scale(0.8);
					}
				}
			}
			.Submit {
				width: 100%;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				background-image: linear-gradient(to left, #46E3BC, #32AADF);
				font-size: 30rpx;
				font-weight: bold;
				color: #FFFFFF;
				position: fixed;
				bottom: 0;
				left: 0;
			}
			
		}
	}
</style>
