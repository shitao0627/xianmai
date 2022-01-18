<template>
	<!-- 添加收货地址 -->
	<view class="content">
		<view class="row b-b">
			<text class="tit">收件人</text>
			<input class="input" type="text" v-model="addressData.recipient" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">店铺名称</text>
			<input class="input" type="text" v-model="addressData.store" placeholder="选填:店铺名称" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.shipping_address}}
			</text>
			<text class="icon iconfont icon-dizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.shipping_address_details" placeholder="请输入详细地址" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.is_default" color="#46E3BC" @change="switchChange" />
		</view>
		<!-- 提交按钮 -->
		<view>
			<view v-if="type == 'edit'">
				<button class="add-btn" @tap="editconfirm">提交</button>
			</view>
			<view v-else="type == 'add'">
				<button class="add-btn" @tap="addconfirm">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				addressData: {
					id:'',
					recipient: '',
					phone: '',

					shipping_address:'在地图选择',

					store:'',
					shipping_address_details: '',
					is_default: false,
					user_id:'1333624',
				},
				AddUserAddress:[],
				SaveUserAddress:[],
				addressArray: [],
				city:'',
				province:'',
				district:''
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				console.log('option',option.type)
				this.type = option.type
				console.log('option',JSON.parse(option.data))
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.is_default = e.is_default;
			},
			
			//地图选择地址  
			chooseLocation(){
				let that = this
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.shipping_address = data.name;
						// this.addressData.shipping_address = data.name;
						// console.log('data',data)
					}
				})
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,//设置该参数为true可直接获取经纬度及城市信息
					success: function (res) {
						console.log(res)
						that.city = res.address.city
						that.province = res.address.province
						that.district = res.address.district
						console.log(that.city)
						console.log(that.province)
						console.log(that.district)
					}
				});
			},
			
			
			//新增地址提交
			addconfirm(){
				let city = this.city
				let province = this.province
				let district = this.district
				let data = this.addressData;
				console.log('city',city)
				if(!data.recipient){
					uni.showToast({
						title: '请填写用户名',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
					uni.showToast({
						title: '请输入正确的手机号码',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!data.shipping_address){
					uni.showToast({
						title: '请在地图选择所在位置',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!data.shipping_address_details){
					uni.showToast({
						title: '请填写门牌号信息',
						icon:'none',
						duration: 2000
					});
					return;
				}
				// 获取规格
				let params = {
					user_id: '1333624',
					recipient: data.recipient,
					phone: data.phone,
					shipping_address: data.shipping_address,
					shipping_address_detail: data.shipping_address_details,
					is_default:data.is_default ? 0 : 1,
					province: province,
					city: city,
					zone: district,
					store: data.store
				}
				params.sign = this.sign(params)
				console.log('params',params)
				this.$api.AddUserAddress(params).then((res) => {
					this.loading = false;
					this.AddUserAddress = res
					console.log('AddUserAddress', this.AddUserAddress)
					// console.log('navigation', this.navigation)
					setTimeout(()=>{
						uni.navigateTo({
							url:'./address'
						})
					}, 800)
				}).catch((err) => {
					this.loading = false;
				})
				
				
			},
			//编辑地址提交
			editconfirm(){
				let data = this.addressData;
				if(!data.recipient){
					uni.showToast({
						title: '请填写用户名',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){
					uni.showToast({
						title: '请输入正确的手机号码',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!data.shipping_address){
					uni.showToast({
						title: '请在地图选择所在位置',
						icon:'none',
						duration: 2000
					});
					return;
				}
				if(!data.shipping_address_details){
					uni.showToast({
						title: '请填写门牌号信息',
						icon:'none',
						duration: 2000
					});
					return;
				}
				// 获取规格
				let params = {
					address_id: data.id,
					recipient: data.recipient,
					phone: data.phone,
					shipping_address: data.shipping_address,
					shipping_address_detail: data.shipping_address_details,
					is_default:data.is_default ? 0 : 1,
					province: '上海市',
					city: '上海市',
					zone: '青浦区',
					store: data.store
				}
				params.sign = this.sign(params)
				console.log('params',params)
				this.$api.SaveUserAddress(params).then((res) => {
					this.loading = false;
					this.SaveUserAddress = res
					console.log('SaveUserAddress', this.SaveUserAddress)
					// console.log('navigation', this.navigation)
				}).catch((err) => {
					this.loading = false;
				})
				
				setTimeout(()=>{
					uni.navigateTo({
						url:'./address'
					})
				}, 800)
			},
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
