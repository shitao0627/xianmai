<template>
	<view class="Myevaluation">
		<!-- 我的评价 -->
		<!-- <Myevaluationswipe></Myevaluationswipe> -->
		<Myorder></Myorder>
	</view>
</template>

<script>
	// 引入商品评价
	// import Myevaluationswipe from "../../../components/Myevaluation/index.vue"
	import Myorder from "../../../components/Myorder/index.vue"
	export default{
		components:{Myorder}
	}
</script>

<style>
</style>
