import Vue from 'vue'
import Vuex from 'vuex'
import  axios  from "../api/index.js"


Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		uerInfo: {},
		hasLogin: false
	},
	mutations: {
		login(state, provider) { //改变登录状态  
			state.hasLogin = true
			state.uerInfo.token = provider.token
			state.uerInfo.userName = provider.user_name
			uni.setStorage({ //将用户信息保存在本地  
				key: 'uerInfo',
				data: provider
			})
		},
		logout(state) { //退出登录  
			state.hasLogin = false
			state.uerInfo = {}
			uni.removeStorage({
				key: 'uerInfo'
			})
		}
	},
	actions:{
		userlogin(context,provider){
			console.log(provider)
			axios("/Lib/GetAddWXUser","GET",provider).then(res=>{
				console.log(res.Response)
				context.commit("login",res.Response)
			})
			
			// return  new Promise((resolv,rej)=>{
			// uni.request({
			// 	url:"https://api.xianmaiyangsheng.com:5443/api/Lib/GetAddWXUser",
			// 	method:"GET",
			// 	data:provider,
			// 	success:res=>{
			// 		console.log(res.data.Response)
			// 		resolv(res.data.Response)
			// 	},
			// 	fail:res=>{
			// 		rej(res.data.Response)
			// 	}
			// })	
			// }).then(res=>{
			// 	console.log(res)
			// 	context.commit("login",res)
			// })
			
			
			
			// this.weixinlogin(provider).then(res=>{
			// 	console.log(res.data.Response)
			// 	context.commit("login",res.data.Response)
			// })
		}
	}
})
export default store
