import Vue from 'vue'
import Vuex from 'vuex'

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
			state.uerInfo.user_id = provider.user_id
			state.uerInfo.nick_name = provider.nick_name
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
	actions: {

	}
})
export default store
