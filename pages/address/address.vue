<template>
	<!-- 添加地址 -->
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.mobile}}</text>
				</view>
				<view class="address-box">
					<!-- <text v-if="item.default" class="tag">默认</text> -->
					<text class="address">{{item.addressName}} {{item.area}}</text>
				</view>
				<view class="set_up">
					<view class="setup_left">
						<view class="radio icon iconfont" :class="[index==intype?'icon-zhengque radios':'']" @tap.stop="ontype(index)"></view>
						<text>默认地址</text>
					</view>
					<view class="setup_right">
						<view @tap.stop="addAddress('edit', item)">编辑</view>
						<view>删除</view>
					</view>
				</view>
			</view>
			<!-- <text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text> -->
		</view>
		
		<button class="add-btn" @click="addAddress('add')">添加收货地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				intype:0,
				source: 0,
				addressList: [
					{
						name: '张三',
						mobile: '18666666666',
						addressName: '贵族皇仕牛排(东城店)',
						address: '北京市东城区',
						area: 'B区',
						default: true
					},{
						name: '李四',
						mobile: '18667766666',
						addressName: '龙回1区12号楼',
						address: '山东省济南市历城区',
						area: '西单元302',
						default: false,
					}
				]
			}
		},
		onLoad(option){
			console.log(option.source);
			this.source = option.source;
		},
		methods: {
			ontype(index) {
				this.intype = index;
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					// this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type){
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				
				console.log(data, type);
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		margin: 20rpx 0;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
		
		
	}
	.set_up{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #e7e7e7;
		padding-top: 20rpx;
		margin-top: 10rpx;
		.setup_left{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.radios{
				background: #5BB688;
				color: #FFFFFF;
				text-align: center;
				line-height: 36rpx;
				font-weight: bold;
				font-size: 30rpx;
			}
			.radio{
				width: 36rpx;
				height: 36rpx;
				border: 1px solid #e7e7e7;
			}
			text{
				font-size: 30rpx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #999999;
				padding-left: 20rpx;
			}
		}
		.setup_right{
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				font-size: 30rpx;
				font-family: PingFangSC;
				font-weight: 400;
				color: #222222;
				line-height: 60rpx;
				padding: 0 30rpx;
			}
		}
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			font-family: PingFangSC;
			font-weight: 400;
			color: #666;
			line-height: 50rpx;
		}
	}
	.u-box{
		font-size: 34upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #222222;
		line-height: 50rpx;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.icon-bianji{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 0upx;
		bottom: 0upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 34upx;
		color: #fff;
		background: linear-gradient(90deg, #46E3BC, #32AADF);
		border-radius: 0;
	}
</style>
