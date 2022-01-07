<template>
	<view >
		取消订单
	</view>
</template>

<script>
	export default{
		// 接收订单号
		onLoad(option){
			this.Ordernum=option.id
		},
		data(){
			return {
				Ordernum:"",
			}
		}
	}
</script>

<style>
</style>
