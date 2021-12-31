<template>
	<view class="set_up">
		<!-- <view class="set_up_header">
			<view class="icon iconfont icon-fanhui goods_list_fanhui" @tap="navigateBack"></view>
			<view class="set_up_title">设置</view>
			<view class="kong"></view>
		</view> -->
		<view class="main">
			<view class="cache">
				<view class="">清除缓存</view>
				<view class="">7.2M</view>
			</view>
			<view class="message">
				<view class="">消息接收设置</view>
				<view><switch checked color="#19a538" style="transform: scale(.7,.7);" @change="switch1Change" /></view>
			</view>
			<view class="version">
				<view class="">版本说明</view>
				<view class="">3.5.3</view>
			</view>
		</view>
		<view class="exit" @tap="loginto">退出当前账号</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//返回上一页
			navigateBack() {
				uni.navigateBack();
			},
			loginto(){
				uni.navigateTo({
					url:"../tologin/tologin"
				})
			},
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
		}
	}
</script>

<style lang="scss">
	.set_up{
		.set_up_header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:10px;
			background: #FFFFFF;
			.icon{
				font-size: 1.1rem;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
				line-height: 28px;
			}
			.set_up_title{
				font-size: 1.1rem;
				font-family: PingFangSC;
				font-weight: 500;
				color: #333333;
				line-height: 28px;
			}
			.kong{
				width: 15px;
			}
		}
		.main{
			background: #FFFFFF;
			padding: 0 10px;
			.cache{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top: 1px solid #e7e7e7;
				view{
					font-size: .9rem;
					font-family: PingFangSC;
					font-weight: 600;
					color: #666666;
					line-height: 50px;
				}
			}
			.message{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top: 1px solid #e7e7e7;
				view{
					font-size: .9rem;
					font-family: PingFangSC;
					font-weight: 600;
					color: #666666;
					line-height: 50px;
				}
			}
			.version{
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top: 1px solid #e7e7e7;
				view{
					font-size: .9rem;
					font-family: PingFangSC;
					font-weight: 600;
					color: #666666;
					line-height: 50px;
				}
			}
		}
		.exit{
			text-align: center;
			color: #FFFFFF;
			background: linear-gradient(90deg, #46E3BC, #32AADF);
			margin: 150px 10px 0 10px;
			padding: 15px;
			font-size: 1rem;
			
		}
	}
</style>
