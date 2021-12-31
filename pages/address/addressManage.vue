<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">收件人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">店铺名称</text>
			<input class="input" type="text" v-model="addressData.store" placeholder="选填:店铺名称" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text>
			<text class="icon iconfont icon-dizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="请输入详细地址" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.defaule" color="#46E3BC" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					name: '',
					mobile: '',
					addressName: '在地图选择',
					address: '',
					store:'',
					area: '',
					default: false
				}
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.default = e.detail;
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			
			//提交
			// confirm(){
			// 	let data = this.addressData;
			// 	if(!data.name){
			// 		this.$api.msg('请填写收货人姓名');
			// 		return;
			// 	}
			// 	if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
			// 		this.$api.msg('请输入正确的手机号码');
			// 		return;
			// 	}
			// 	if(!data.address){
			// 		this.$api.msg('请在地图选择所在位置');
			// 		return;
			// 	}
			// 	if(!data.area){
			// 		this.$api.msg('请填写门牌号信息');
			// 		return;
			// 	}
				
			// 	//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
			// 	this.$api.prePage().refreshList(data, this.manageType);
			// 	this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
			// 	setTimeout(()=>{
			// 		uni.navigateBack()
			// 	}, 800)
			// },
		}
	}
</script>

<style lang="scss">
	page{
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		border-bottom: 1px solid #e7e7e7;
		
		.tit{
			flex-shrink: 0;
			width: 150upx;
			font-size: 30upx;
		}
		.input{
			flex: 1;
			font-size: 30upx;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 100upx;
		margin: 60upx auto;
		color: #fff;
		background: linear-gradient(90deg, #46E3BC, #32AADF);
	}
</style>
