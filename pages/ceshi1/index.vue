<template>
	<view>
		<div>
			<div v-for="(item,index) in productList" :key="index">
				<div :title="item.author_name" @click="comment(item.name)">{{item.title}}</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [],
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				uni.request({
					// url: "apis/HomePage/GetHomePageTop?rnd={123}&sign={ddefbdfc8bf506901e69fe0f87427a6b}",
					url: '/apis/HomePage/GetHomePageTop?rnd={123}&sign={ddefbdfc8bf506901e69fe0f87427a6b}', 
					method: 'get',
					dataType: 'json',
					success: (res) => {
						console.log(res.data);
						this.productList = res.data;
					},
				});
			},
			comment:function(item){
					uni.navigateTo({
						//多个参数用&拼接:url: '../comment/comment?id='+id'&name='+name
					    url: '../ceshi/ceshi?title='+item.title
					});
				},
		},

	}
</script>

<style>

</style>
