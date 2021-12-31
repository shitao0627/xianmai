
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/classify/index","pages/shopping/index","pages/my/index","pages/ceshi1/index","pages/ceshi/ceshi","pages/search/index","pages/goods_details/goods_details","pages/goods_list/goods_list","pages/set_up/set_up","pages/tologin/tologin","pages/login/login","pages/reg/reg","pages/changing_user_name/changing_user_name","pages/evaluation/evaluation","pages/order/order","pages/invoice/invoice","pages/paid/paid","pages/pay_success/pay_success","pages/address/address","pages/address/addressManage"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#FFFFFF","scrollIndicator":"none","titleView":false},"tabBar":{"color":"#7A7E83","selectedColor":"#46E3BC","borderStyle":"white","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/index/index","iconPath":"static/img/home0.png","selectedIconPath":"static/img/index.png","text":"首页"},{"pagePath":"pages/classify/index","iconPath":"static/img/classify.png","selectedIconPath":"static/img/fenlei.png","text":"分类"},{"pagePath":"pages/shopping/index","iconPath":"static/img/shopping.png","selectedIconPath":"static/img/gouwuc.png","text":"购物车"},{"pagePath":"pages/my/index","iconPath":"static/img/my.png","selectedIconPath":"static/img/my2.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"xianmai","compilerVersion":"3.2.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"闲买","navigationBarBackgroundColor":"#4FE6C4","navigationBarTextStyle":"white","navigationStyle":"custom"}},{"path":"/pages/classify/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","navigationStyle":"custom"}},{"path":"/pages/shopping/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","navigationStyle":"custom"}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/ceshi1/index","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/ceshi/ceshi","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/search/index","meta":{},"window":{"navigationBarTitleText":"搜索","navigationStyle":"custom"}},{"path":"/pages/goods_details/goods_details","meta":{},"window":{"navigationBarTitleText":"商品详情","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/goods_list/goods_list","meta":{},"window":{"navigationBarTitleText":"分类列表","enablePullDownRefresh":false}},{"path":"/pages/set_up/set_up","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false}},{"path":"/pages/tologin/tologin","meta":{},"window":{"navigationBarTitleText":"去登录","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/reg/reg","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/changing_user_name/changing_user_name","meta":{},"window":{"navigationBarTitleText":"修改昵称","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/evaluation/evaluation","meta":{},"window":{"navigationBarTitleText":"评价","enablePullDownRefresh":false}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"支付","enablePullDownRefresh":false}},{"path":"/pages/invoice/invoice","meta":{},"window":{"navigationBarTitleText":"发票","enablePullDownRefresh":false}},{"path":"/pages/paid/paid","meta":{},"window":{"navigationBarTitleText":"发起代付","enablePullDownRefresh":false}},{"path":"/pages/pay_success/pay_success","meta":{},"window":{"navigationBarTitleText":"下单成功","enablePullDownRefresh":false}},{"path":"/pages/address/address","meta":{},"window":{"navigationBarTitleText":"收货地址","enablePullDownRefresh":false}},{"path":"/pages/address/addressManage","meta":{},"window":{"navigationBarTitleText":"添加收货地址","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});