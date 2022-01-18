import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://api.xianmaiyangsheng.com:5443/api/',
        url: 'HomePage/GetHomePageTop',
		dataType: 'text',
        data,
    })
}

// 轮播图 & 导航列表
export const banner = (data) => {
    return http.request({
        url: '/HomePage/GetHomePageTop',
        method: 'GET', 
        data,
    })
}

//首页商品分类
// export const category = (data) => {
//     return http.request({
//         url: '/goods/category',
//         method: 'GET', 
//         data,
//     })
// }
// 特色推荐
export const recommendList = (data) => {
    return http.request({
        url: '/HomePage/GetHomePageRecommendGoods',
        method: 'GET', 
        data,
    })
}
//限时抢购
export const snap = (data) => {
    return http.request({
        url: '/HomePage/GetHomePageActivity',
        method: 'GET', 
        data,
    })
}
//商品分类
export const category = (data) => {
    return http.request({
        url: '/goods/category',
        method: 'GET', 
        data,
    })
}
//商品类别
export const goodsType = (data) => {
    return http.request({
        url: '/GoodsClassiFication/GetGoodsType',
        method: 'GET', 
        data,
    })
}
//商品分类列表
export const goodsList = (data) => {
    return http.request({
        url: '/GoodsClassiFication/GetGoodsList',
        method: 'GET', 
        data,
    })
}
//商品详情
export const goodsdetails = (data) => {
    return http.request({
        url: '/GoodsClassiFication/GetGoodsDetails',
        method: 'GET', 
        data,
    })
}
// 商品规格
export const specification = (data) => {
    return http.request({
        url: '/GoodsClassiFication/GetProductBySpecification',
        method: 'GET', 
        data,
    })
}
// 商品评价
export const productParameter = (data) => {
    return http.request({
        url: '/GoodsClassiFication/GetProductParameter',
        method: 'GET', 
        data,
    })
}
// 商品评价
export const appraiseNum = (data) => {
    return http.request({
        url: '/GoodsClassiFication/GetAppraiseNum',
        method: 'GET', 
        data,
    })
}
// 	获取评价数量
export const appraiseList = (data) => {
    return http.request({
        url: '/GoodsClassiFication/GetAppraiseList',
        method: 'GET', 
        data,
    })
}
// 	24小时到
export const hoursTo = (data) => {
    return http.request({
        url: '/HomePage/Get24HoursTo',
        method: 'GET', 
        data,
    })
}
// 	微信登录
export const weixinlogin = (data) => {
    return http.request({
        url: '/Lib/GetAddWXUser',
        method: 'GET', 
        data,
    })
}

export const OrderStatusNum = data=>{
	return http.request({
		url:'/UserBase/GetOrderCount',
		method:'GET',
		data
	})
}
//微信支付
export const WXPayAPP = data=>{
	return http.request({
		url:'/Lib/GetWXPayAPP',
		method:'GET',
		data
	})
}
//获取微信支付信息
export const PayInfo = data=>{
	return http.request({
		url:'/Lib/GetPayInfo',
		method:'GET',
		data
	})
}
//获取订单列表
export const OrderList = data=>{
	return http.request({
		url:'/UserBase/GetOrderList',
		method:'GET',
		data
	})
}
//(24小时到)提交订单
export const PostTwoFourSubmitOrder = data=>{
	return http.request({
		url:'/HomePage/PostTwoFourSubmitOrder',
		method:'POST',
		data
	})
}
//app微信支付


/*****收获地址*****/

//编辑保存收获地址
export const SaveUserAddress = data=>{
	return http.request({
		url:'/ShippingAddress/GetSaveUserAddress',
		method:'GET',
		data
	})
}
//新增收货地址
export const AddUserAddress = data=>{
	return http.request({
		url:'/ShippingAddress/GetAddUserAddress',
		method:'GET',
		data
	})
}
// 获取收获地址
export const UserAddress = data=>{
	return http.request({
		url:'/ShippingAddress/GetUserAddress',
		method:'GET',
		data
	})
}
// 删除收获地址
export const UserAddressDel = data=>{
	return http.request({
		url:'/ShippingAddress/GetUserAddressDel',
		method:'GET',
		data
	})
}
// 设置默认地址
export const EditDefalut = data=>{
	return http.request({
		url:'/ShippingAddress/GetEditDefalut',
		method:'GET',
		data
	})
}






export default {
	test,
    banner,
	recommendList,
	snap,
	category,
	goodsType,
	goodsList,
	goodsdetails,
	specification,
	productParameter,
	appraiseNum,
	appraiseList,
	hoursTo,
	weixinlogin,
	OrderStatusNum,
	WXPayAPP,
	PayInfo,
	OrderList,
	PostTwoFourSubmitOrder,
	SaveUserAddress,
	UserAddress,
	AddUserAddress,
	UserAddressDel,
	EditDefalut
}