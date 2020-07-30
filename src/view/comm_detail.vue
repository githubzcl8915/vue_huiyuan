<template>
  <div class="comm_detail">
    <!-- 头部导航 -->
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 轮播 -->
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="item in carousellist" :key="item.id">
            <img :src="item.picurl" alt="">
        </van-swipe-item>
        <template #indicator>
            <div class="custom-indicator">
            {{ current + 1 }}/4
            </div>
        </template>
    </van-swipe>
    <!-- 轮播下商品信息 -->
    <div class="commodity_info">
        <div class="comm_info_content">
            <p class="content">{{commodity_obj.detail}}</p>
            <p class="share" @click="share">
                <span><van-icon :name="commodity_obj.share_icon" size="18" color="#999" /></span>
                <span>{{commodity_obj.share}}</span>
            </p>
            <!-- 分享弹出框 -->
            <!-- <van-cell title="显示分享面板" @click="showShare = true" /> -->
            <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelects"
            />
        </div>
        <div class="comm_info_price">
            <span class="price_xs">{{commodity_obj.sellprice}}<b>{{'￥'+commodity_obj.price}}</b></span>
            <span>{{commodity_obj.selled + commodity_obj.sellnum + commodity_obj.sellunit}}</span>
        </div>
    </div>

    <!-- cell促销弹出框 -->
    <div class="promotion">
        <van-cell is-link @click="showPopup">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
                <span class="custom-title">{{commodity_obj.promotion}}</span>
                <van-tag type="danger">{{commodity_obj.promotion_cont}}</van-tag>
            </template>
        </van-cell>

        <!-- 弹出框 -->
        <van-action-sheet v-model="show" :title="commodity_obj.promotion_detail">
            <div class="content">
                <van-cell is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                    <template #title>
                        <van-tag type="danger">{{commodity_obj.promotion_cont1}}</van-tag>
                        <span class="custom-title">{{commodity_obj.promotion_cont}}</span>
                    </template>
                </van-cell>
            </div>
        </van-action-sheet>
    </div>

    <!-- 购买数量 -->
    <div class="buynum">
        <div class="numcont">{{commodity_obj.num}}</div>
        <div class="num">
            <van-stepper v-model="value" />
        </div>
    </div>

    <!-- 商品评论 -->
    <div class="comment">
        <van-cell :title="commodity_obj.comment" is-link :value="commodity_obj.comment_num" />
    </div>

    <!-- 店铺 -->
    <div class="store">
        <div class="logo_name">
            <div class="logo">
                <img :src="logoname.pic_url" alt="">
            </div>
            <div class="storename">
                <span>{{logoname.name}}</span>
                <div class="authentication">
                    <van-icon :name="logoname.icon" size="18" />
                    <b>{{logoname.authentication}}</b>
                </div>
            </div>
        </div>
        <div class="gostore">
            <div class="gostore_btn" v-for="item in gostore" :key="item.id">
                <van-button :to='item.path' :icon="item.icon" type="info" round :color="item.color">{{item.name}}</van-button>
            </div>
        </div>
    </div>

    <!-- 图文详情 -->
    <div class="pic_details">
        <p><span>图片详情</span></p>
        <img v-for="item in pic_detail" :key="item.id" :src="item.pic_url" alt="">
    </div>

    <!-- 底部购买栏 -->
    <div class="tabbar_buy">
        <van-goods-action>
            <van-goods-action-icon v-for="items in buy_cart" :key="items.id" :icon="items.icon" :text="items.name" :badge="(items.name == '购物车') ? totalNum :''" :to="items.path" />
            <van-goods-action-button v-for="item in add_cart" :key="item.id" :type="item.type" :text="item.name" @click="addcart($event)" :to="(item.name == '立即购买')? '/confirm_order/'+value+'/'+comm_id:''"/>
        </van-goods-action>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
import {mapState} from 'vuex';
export default {
    data () {
        return {
            value: 1,//立即购买传过去的数量
            comm_id: this.$route.params.id,//立即购买传过去的id
            current: 0,
            commodity_obj:{},
            carousellist:[],
            show: false,
            showShare: false,//分享
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
            ],
            buy_cart:[
                {id:1,name:'客服',icon:'chat-o',path:'/customer'},
                {id:2,name:'购物车',icon:'cart-o',path:'/cart'},
                {id:3,name:'店铺',icon:'shop-o',path:'/commodity'},
            ],
            add_cart:[{ id:4,name:'加入购物车',type:'warning'},{id:5,name:'立即购买',type:'danger'}],
            logoname:{name:'汇源',icon:'passed',authentication:'App认证',pic_url:'http://www.huiyuan.com.cn/img/ceac4_1.png'},
            gostore:[
                {id:1,name:'全部商品',icon:'bag-o',color:'#7232dd',path:'/commodity'},
                {id:2,name:'进入店铺',icon:'shop-o',color:'linear-gradient(to right, #4bb0ff, #6149f6)',path:'/home'}
            ],
            pic_detail:[
                {id:1,pic_url:'http://www.huiyuan.com.cn/repository/image/EvA6ImPZSfCgz8_k0pYHLQ.jpg'},
                {id:2,pic_url:'http://www.huiyuan.com.cn/repository/image/fFx7hC5KRHGwow-qqT8u7Q.jpg'},
                {id:3,pic_url:'http://www.huiyuan.com.cn/repository/image/0c7d253f-6c0c-417d-abcd-b6763f80f4f0.jpg'},
            ],
            gethuiyuancart: function(){
                var gethuiyuancarts = JSON.parse(localStorage.getItem('huiyuan_cart') || '[]');
                return gethuiyuancarts;
            }(),
            huiyuan_cart_comm:[],
        }
    },
    computed: {
      ...mapState(['commodity_all']),
      totalNum(){
          var totalnum = 0;
          this.gethuiyuancart.forEach(item =>{
              totalnum += item.comm_nums;
          })
          return totalnum;
      }  
    },
    created () {
      this.getcommodityInfo();  
    },
    methods: {
        getcommodityInfo(){
            var params_name = this.$route.params.name;
            var params_id = this.$route.params.id;
            var midarr1 = [];
            midarr1 = this.commodity_all.filter(item => {
                return item.name == params_name;
                // console.log(item.name,params_name)
            })
            // console.log(midarr1[0].commodity)
            var midarr2 = midarr1[0].commodity.filter(item =>{
                return item.id == params_id;
            })
            this.carousellist = midarr2[0].pic_arr;
            this.commodity_obj = midarr2[0];
            console.log(midarr2)
        },
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            Toast(item.name);
        },
        showPopup(){
            this.show = true;
        },
        share(){
            this.showShare = true;
        },
         onSelects(option) {
            Toast(option.name);
            this.showShare = false;
        },
        showToast(msg){
            this.$toast({message: msg})
        },
        addcart(that){
            // console.log(this.commodity_obj);
            // var new_huiyuan_cart = this.gethuiyuancart;
            // 点击加入购物车
            if(that.target.innerText == '加入购物车'){
                var isExite = this.gethuiyuancart.some(item =>{
                    return item.id == this.commodity_obj.id;
                })
                // console.log(isExite);
                if(isExite){
                    this.gethuiyuancart = this.gethuiyuancart.map(item =>{
                        if(item.id == this.commodity_obj.id){
                            // console.log(item.comm_nums,this.value)
                            item.comm_nums = Number(item.comm_nums) + this.value;
                        }
                        return item;
                    })
                }else{
                    this.commodity_obj.comm_nums = this.value;
                    // console.log(this.commodity_obj)
                    this.gethuiyuancart.push(this.commodity_obj);
                }
                Toast('已加入购物车！')
                localStorage.setItem('huiyuan_cart',JSON.stringify(this.gethuiyuancart));
            }else{
                // 点击立即购买
                console.log(this.value,this.$route.params.id)
                
            }
        }
    },
    mounted () {
        this.$router.afterEach(() => {
            window.scrollTo(0, 0)
        })
    }
}
</script>

<style lang="scss" scoped>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .van-swipe{
        height: 320px;
    }
    .van-swipe img{
        width: 100%;
        height: 100%;
    }
    .custom-title{
        padding-right: 8px;
    } 
    .comm_detail{
        // background-color: #fff;
        padding-top: 46px;
        padding-bottom: 50px;
        .commodity_info{
            padding: 15px;
            margin-bottom: 10px;
            background-color: #fff;
            .comm_info_content{
                display: flex;
                justify-content: space-between;
                p{
                    font-size: 16px;
                    color: #333;
                    text-align: left;
                }
                .content{
                    width: 80%;
                }
                .share{
                    width: 15%;
                    display: flex;
                    flex-direction: column;
                    span{
                        font-size: 12px;
                        color: #999;
                        margin-left: 50%;
                        // transform: translateX(-100%);
                    }
                }
            }
            .comm_info_price{
                display: flex;
                justify-content: space-between;
                padding-top: 15px;
                span{
                    font-size: 14px;
                    color: #999;
                    b{
                        font-size: 18px;

                    }
                }
                .price_xs{
                    color: red;
                }
            }
        }
        .promotion{
            margin-bottom: 10px;
            .content {
                padding: 16px 16px 160px;
                .custom-title{
                    padding-left: 8px;
                } 
            }
        }
        .buynum{
            padding: 30px 15px;
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            margin-bottom: 10px;
            .numcont{
                font-size: 14px;
                color: #333;
            }
            .num{

            }
        }
        .store{
            background-color: #fff;
            margin-bottom: 10px;
            padding: 0 15px;
            .logo_name{
                display: flex;
                padding-bottom: 15px;
                border-bottom: solid 1px #f4f4f4;
                .logo{
                    width: 50px;
                    height: 20px;
                    margin-right: 30px;
                    img{
                        width: 100%;
                    }
                }
                .storename{
                    span{
                        font-size: 14px;
                        color: #333;
                    }
                    .authentication{
                        display: flex;
                        align-items: center;
                        b{
                            font-size: 14px;
                            color: green;
                        }
                    }
                }
            }
            .gostore{
                padding: 10px 0;
                text-align: center;
                .gostore_btn{
                    display: inline-block;
                    margin: 0 30px;
                }
            }
        }
        .pic_details{
            width: 100%;
            background-color: #fff;
            p{
                text-align: center;
                line-height: 20px;
                font-size: 16px;
                color: red;
                border-bottom: solid 1px #f4f4f4;
                margin-bottom: 20px;
                padding: 10px 0;
                span{
                    border-bottom: solid 1px red;
                    padding: 10px 0;
                }
            }
            img{
                width: 100%;
                height: auto;
            }
        }
    }
</style>
