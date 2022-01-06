import App from './App'
import store from './store'
import api from '@/common/vmeitime-http/'
import md5 from 'js-md5'
// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.sign = (params, secret) => {
	if (secret === undefined) {
		secret = 'D98TZQWpTVlb1nqfkfO615U5ZEignoqW'
	}
	let result = secret
	let sortedParams = Object.keys(params).sort()
	for (let i = 0; i < sortedParams.length; i++) {
		let k = sortedParams[i]
		result += k + params[k]
	}
	result += secret
	return md5(result)
}

App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif