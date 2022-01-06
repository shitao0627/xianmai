<template>
	<view class="Applyforrefund page2">
		<view class="type-box">
			<!-- 退款类型 -->
			<view class="type" @click="show(1)">
				<view class="type-title">
					退款类型
				</view>
				<view class="type-icon">
					{{data.type}}
					<text class="icon iconfont" style="margin-left: 20rpx;">&#xe7eb;</text>
				</view>
			</view>
			<!-- 退款原因 -->
			<view class="type" @click="show(2)" style="border-bottom: 1rpx solid #E0E0E0; border-top: 1rpx solid #E0E0E0;">
				<view class="type-title">
					退款原因
				</view>
				<view class="type-icon">
					{{data.reason}}
					<text class="icon iconfont" style="margin-left: 20rpx;">&#xe7eb;</text>
				</view>
			</view>
			<view class="type">
				<view class="type-title">
					退款金额
				</view>
				<view class="type-icon" style="margin-right: 10rpx;">
					最多可退
					￥80
				</view>
			</view>
		</view>
		<!-- 退款说明 -->
		<view class="type-box">
			<view class="type">
				<view class="type-title">
					退款说明:
				</view>
				<view class="type-input">
					<input placeholder="选填" v-model="data.explain" />
				</view>
			</view>
		</view>
		<!-- 上传凭证 -->
		<view class="Applyforrefund-footer">
			<view class="Applyforrefund-footer-title">
				上传凭证
			</view>

			<!-- 照片提交 -->
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


		<!-- 弹窗插件 -->
		<webpopup ref="popup1" ype="bottom" height="300">
			<view v-for="item,index in typelist" class="reason" @click="choiceType(index)">
				{{item}}
			</view>
			<view class="reason" @click="hide(1)">
				取消
			</view>
		</webpopup>
		<webpopup ref="popup2" ype="bottom" height="700">
			<view v-for="item,index in reasonlist" class="reason" @click="Refundreason(index)">
				{{item}}
			</view>
			<view class="reason" @click="hide(2)">
				取消
			</view>
		</webpopup>
	</view>
</template>

<script>
	import upload from "../uni-file-picker/uni-file-picker.vue"
	import webpopup from "../wyb-popup/wyb-popup.vue"
	export default {
		data() {
			return {
				// 页面所有信息
				data: {
					type: "请选择",
					reason: "请选择",
					explain: "",
					imageValue: []
				},
				// 类型弹窗
				typelist: ['仅退款', '退货退款'],
				// 原因弹窗
				reasonlist: ["7天无理由", "卖家发错货", "大小尺寸与商品描述不符", "退货退款", "拍错／多拍／不想要", "漏货／少货／空包裹", "其他"]
			}
		},
		components: {
			webpopup,
			upload
		},
		methods: {
			// 点击提交事件,列表数据都再data中
			//订单号和订单金额可通过组件传值进行传递
			Submit() {
				console.log(this.data)
			},
			// 添加照片
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
			// 显示弹窗组件
			show(data) {
				if (data == 1) {
					this.$refs.popup1.show()
				} else if (data == 2) {
					this.$refs.popup2.show()
				}
			},
			// 点击取消隐藏弹窗组件
			hide(data) {
				if (data == 1) {
					this.$refs.popup1.hide()
				} else if (data == 2) {
					this.$refs.popup2.hide()
				}
			},
			// 将用户选择的结果赋值给data内的属性
			// 类型
			choiceType(res) {
				this.data.type = this.typelist[res]
				this.$refs.popup1.hide()
			},
			// 原因
			Refundreason(res) {
				this.data.reason = this.reasonlist[res]
				this.$refs.popup2.hide()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.Applyforrefund {
		.type-box {
			margin-top: 20rpx;
			background-color: #FFFFFF;

			.type {
				margin-left: 20rpx;
				width: 710rpx;
				height: 100rpx;
				display: flex;
				line-height: 100rpx;
				justify-content: space-between;

				.type-title {
					font-size: 26rpx;
					color: #333333;
					font-weight: bold;
				}

				.type-icon {
					font-size: 26rpx;
					color: #999999;
				}

				.type-input {
					margin-top: 28rpx;
					width: 580rpx;
					height: 50rpx;
				}
			}
		}

		.Applyforrefund-footer {
			height: 298rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			padding-top: 20rpx;
			padding-left: 20rpx;

			.Applyforrefund-footer-title {
				font-size: 23rpx;
				color: #333333;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

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

		.reason {
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			color: #666666;
			font-size: 28rpx;
			border-bottom: 1px solid #E7E7E7;
		}
	}
</style>
