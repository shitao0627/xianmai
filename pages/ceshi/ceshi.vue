<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:[]
			}
		},
		onLoad: function (item) { //option为object类型，会序列化上个页面传递的参数
		        console.log(item.title); //打印出上个页面传递的参数。
		    },
		methods: {
			
		},

	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.text-area {
			display: flex;
			justify-content: center;

			.title {
				font-size: 36rpx;
				color: #8f8f94;
			}
		}
	}
</style>
