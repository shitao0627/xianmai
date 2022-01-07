<template>
	<!-- 退款页面 -->
	<view >
		<Applyforrefund></Applyforrefund>
	</view>
</template>

<script>
	import Applyforrefund from "../../../components/Applyforrefund/index.vue"
	export default{
		onLoad(option){
			this.OrderNum=option.id
		},
		data(){
			return {
				OrderNum:""
			}
		},
		components:{Applyforrefund},
		methods:{
			// 弹出提示框
			arr(){
				uni.showModal({
				    title: '注意事项',
				    content: '退回货物时候，请填写下单时的收件姓名和手机号！',
					showCancel:false,
					confirmText:"知道了",
					confirmColor:"#46E3BC",
				    success:res=>{
						console.log(1)
					}
				});
			}
				
		},
		mounted(){
			this.arr()
		}
	}
</script>

<style>
</style>
