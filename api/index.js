 const axios = function (url,type="GET",data={}) {
	return new  Promise((resolve,reject,header={})=>{
		uni.request({
			url:"https://api.xianmaiyangsheng.com:5443/api"+url,
			method:type,
			data:data,
			header:header,
			success:res=>{
				resolve(res.data)
			},
			fail:res=>{
				reject(res.data)
			}
		})
	})
}

export default axios