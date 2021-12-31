<template>
	<view class="technician">
		<view class="technician_module">
			<view class="technician_card" v-for="item in technician">
				<image :src="item.src"></image>
				<view class="title">{{item.title}}</view>
				<text class="label">{{item.label}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"technician",
		data() {
			return {
				technician:[{
					src:"../../static/img/45254.png",
					title:"招聘足疗按摩技师",
					label:"招聘"
				},{
					src:"../../static/img/54245.png",
					title:"招聘按摩技师",
					label:"招聘"
				},{
					src:"../../static/img/452542.png",
					title:"招聘足疗技师",
					label:"招聘"
				},{
					src:"../../static/img/452542.png",
					title:"招聘足疗按摩技师",
					label:"招聘"
				},{
					src:"../../static/img/technician.png",
					title:"招聘spa技师",
					label:"招聘"
				}]
			};
		}
	}
</script>

<style lang="scss">
	.technician{
		width: 100%;
		.technician_module{
			background: #FFFFFF;
			margin: 10px;
			border-radius: 8px;
			display: flex;
			white-space: nowrap;
			/*overflow-x: scroll;*/
			overflow-y: hidden;

			.technician_card{
				width: 115px;
				margin-right: 5px;
				padding-bottom: 10px;
				image{
					width: 115px;
					height: 80px;
				}
				.title{
					font-size: .9rem;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					padding: 1px 5px;
					margin-bottom: 3px;
				}
				.label{
					background: #4C94FF;
					padding: 1px 5px;
					font-size: .7rem;
					color: #FFFFFF;
					border-radius: 5px;
					margin-left: 5px;
					
				}
			}
		}
	}
</style>
