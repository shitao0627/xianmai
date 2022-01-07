<!--商品列表-->
<template>
	<div class="good-wrapper" @click="gotodetails">
		<div class="list">
			<div class="img">
				<img :src="img" lazy-load="true" />
				<div class='rebate_btn' v-if='cashback >= 5'>
					<p>{{cashback}}%现金</p>
				</div>
			</div>
			<div class="content">
				<p class="name">{{ name }}</p>
				<div class="big">
					<div class="left">
						<p class="price" v-if="!useCoin">￥{{ price }}</p>
						<p class="price" v-if="useCoin">{{ beanPrice }}</p>
					</div>
					<div class="right">
						<p class="deduction you"> 赚钱{{ channCashback || 3 }}% </p>
						<p class="you byou" v-if="express">包邮</p>
					</div>
				</div>
			</div>
			<div class="buy" @click.stop="search">
				<div class="left">
					<p class="number">{{ persionNum }}人购买</p>
				</div>
				<div class="right" v-if="showShopCar">
					<img class="addcart" src="http://m.xianmaiyangsheng.com/xcxImg/image/addcart.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: '闲买商品'
			},
			oldPrice: {
				type: Number,
				default: '0'
			},
			address: {
				type: String,
				default: '上海'
			},
			price: {
				type: Number,
				default: '0'
			},
			persionNum: {
				type: Number,
				default: 0
			},
			express: {
				type: Boolean,
				default: true
			},
			img: {
				type: String,
				default: 'http://oz7poj560.bkt.clouddn.com/%E9%97%B2%E4%B9%B0.png'
			},
			id: {
				type: Number,
				default: 1
			},
			showShopCar: {
				type: Boolean,
				default: true
			},
			cashback: {
				type: Number,
				default: 0
			},
			channCashback: {
				type: Number,
				default: 0
			},
			bean: {
				type: Number,
				default: 0
			},
			useCoin: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {}
		},
		computed: {
			beanPrice() {
				try {
					const yuan = (this.price - this.price * this.bean / 100).toFixed(2)
					return `${yuan}元+${(this.price - yuan).toFixed(2)}金币`
				} catch (e) {
					return ''
				}
			}
		},
		methods: {
			skipGoodsDetail() {
				// this.$emit("skipGoodsDetail", this.id)
				this.$emit(
					'skipGoodsDetail',
					this.id,
					this.img,
					this.name,
					this.address,
					this.persionNum
				)
			},
			gotodetails(){
				uni.navigateTo({
					url:"/pages/goods_details/goods_details?goods_id="+this.id+'&img='+this.img+'&name='+this.name+'&address='+this.address+'&persionNum='+this.persionNum
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.good-wrapper {
		position: relative;
		background: #ffffff;
		width: 168px;
		// height: 295px;
		box-sizing: border-box;
		font-size: 0px;
		box-shadow: 0 0 5px 3px rgba(200, 200, 200, 0.5);
		margin: 2px 0;
		overflow: hidden;

		.list {
			.left {
				float: left;
			}

			.right {
				float: right;
			}

			.name {
				font-size: 14px;
				max-height: 20px;
				height: 20px;
				line-height: 18px;
				word-break: keep-all;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.img {
				//display: inline-block;
				position: relative;

				img {
					width: 100%;
					height: 168px;
				}

				.rebate_btn {
					font-size: 16px;
					font-weight: bold;
					text-align: center;
					color: #ff3b00;
					position: relative;
					float: right;
					z-index: 99;
					width: 75px;
					height: 50px;
					margin-top: -76px;
					background: url('http://m.xianmaiyangsheng.com/xcxImg/image/goumaifan.png');
					background-size: 100% 100%;

					p {
						padding-top: 23px;
					}
				}
			}

			.content {
				padding: 6px 6px;
				box-sizing: border-box;

				.small {
					overflow: hidden;
					font-size: 13px;
					color: #8f8f8f;

					.old-price {
						text-decoration: line-through;
					}
				}

				.big {
					overflow: hidden;

					.price {
						font-size: 16px;
						color: #333;
						text-align: left;
						max-width: 330rpx;
						word-break: keep-all;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-top: 2px;
					}

					.right {
						display: flex;
						justify-content: space-between;

						.byou {
							padding: 0 3px;
							margin-left: 5px;
						}

						.you {
							color: #EA473F;
							border: 1px solid #EA473F;
							text-align: right;
							line-height: 12px;
							font-size: 10px;
							margin-top: 4px;
							margin-left: 2px;
							line-height: 18px;
							background: #FBF3F5;
						}

						.deduction {
							line-height: 18px;
							padding-right: 2px;
							border-radius: 1px;

							&::before {
								content: '分享';
								background: #EA473F;
								color: #fff;
								padding: 3px;
							}
						}
					}
				}
			}

			.buy {
				height: 35px;
				line-height: 35px;
				font-size: 12px;
				border-top: 0.5px solid #f6f6f6;
				padding-left: 10px;
				padding-right: 10px;

				.left {
					color: #8f8f8f;
				}

				.right {
					color: #18cb6d;
					height: 35px;
					line-height: 42px;

					.addcart {
						width: 20px;
						height: 20px;
					}

					.icon-fenxiang {
						font-size: 18px;
					}
				}
			}
		}
	}
</style>
