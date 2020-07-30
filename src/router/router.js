import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../view/home.vue'
import Commodity from '../view/commodity.vue'
import Cart from '../view/cart.vue'
import Own from '../view/own.vue'
import Comm_detail from '../view/comm_detail.vue'
import Signin from '../view/signin.vue'
import Newcommodity from '../view/new_commodity.vue'
import Distribution from '../view/distribution.vue'
import Classify from '../view/classify.vue'
import Confirmorder from '../view/confirm_order.vue'
import Addadress from '../view/add_adress.vue'
import Buysuccess from '../view/buysuccess.vue'
import Ownorder from '../view/ownorder.vue'
import Selectaddress from '../view/selectaddress.vue'
import Orderdetail from '../view/order_detail.vue'
import Owncards from '../view/own_cards.vue'
import Intergralmall from '../view/intergral_mall.vue'
import Collage from '../view/collage.vue'
import Bargain from '../view/bargain.vue'
import Recommend from '../view/recommend.vue'
import Usersafe from '../view/user_safe.vue'
import Paynotequery from '../view/paynote_query.vue'
import Confirmordercart from '../view/confirm_order_cart.vue'
import Personsignin from '../view/person_signin.vue'
import Register from '../view/register.vue'

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},//首页
        {path:'/home',component: Home},//首页
        {path:'/commodity',component: Commodity},//商品页
        {path:'/cart',component: Cart},//购物车
        {path:'/own',component: Own},//我的
        {path:'/comm_detail/:name/:id',component: Comm_detail},//商品详情页
        {path:'/signin',component: Signin},//首页签到
        {path:'/new_commodity',component: Newcommodity},//新品上新
        {path:'/distribution',component: Distribution},//首页分销中心
        {path:'/classify',component: Classify},//商品分类
        {path:'/confirm_order_cart',name:'Confirmordercart',component: Confirmordercart},//提交订单
        {path:'/confirm_order/:num/:id',name:'confirm_order',component: Confirmorder},//立即购买
        {path:'/add_adress',component: Addadress},//新增收货地址
        {path:'/buysuccess',component: Buysuccess},//购买成功
        {path:'/ownorder',component: Ownorder},//我的订单
        {path:'/selectaddress',component: Selectaddress},//选择收获地址 
        {path:'/order_detail/:id',component: Orderdetail},//订单详情
        {path:'/own_cards',component: Owncards},//我的礼品卡
        {path:'/intergral_mall',component: Intergralmall},//积分商城
        {path:'/collage',component: Collage},//拼团
        {path:'/bargain',component: Bargain},//砍价
        {path:'/recommend',component: Recommend},//推荐
        {path:'/user_safe',component: Usersafe},//账号
        {path:'/paynote_query',component: Paynotequery},//支付单查询
        {path:'/person_signin',component: Personsignin},//个人登录
        {path:'/register',component: Register},//个人注册
    ]
})
export default router