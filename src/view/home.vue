<template>
  <div class="home">
    <!-- 头部导航 -->
    <van-nav-bar title="首页" left-text="返回" left-arrow @click-left="$router.back()">
      <template #right>
        <router-link to="/person_signin">
        <van-icon name="manager-o" size="18" />
        </router-link>
      </template>
    </van-nav-bar>

    <!-- 轮播 -->
    <van-swipe @change="onChange" :autoplay="3000">
        <van-swipe-item v-for="item in carousellist" :key="item.id">
            <img :src="item.picurl" alt="">
        </van-swipe-item>
        <template #indicator>
            <div class="custom-indicator">
            {{ current + 1 }}/4
            </div>
        </template>
    </van-swipe>
    
    <!-- 轮播下分类 -->
    <div class="classify">

        <div class="item_classify" v-for="item in classifylist" :key="item.id">
            <router-link :to="item.path">
                <p><van-icon :name="item.icon" /></p>
                <p class="content">{{item.name}}</p>
            </router-link>
        </div>
    </div>

    <!-- 通知 -->
    <div class="notice_home">
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">{{notice_text}}</van-notice-bar>
    </div>

    <!-- 产品图片介绍 -->
    <div class="product">
        <img v-for="item in product_pic" :key="item.id" :src="item.picurl" alt="">
    </div>

    <!-- 商品分类 -->
    <div class="production">
        <van-grid :column-num="2" :gutter="8">
            <van-grid-item v-for="item in production_ima" :key="item.id" icon="photo-o" text="文字" :to="'/comm_detail/'+paramsname+'/'+item.id">
                <div class="product_item" :key="item.id">
                    <img :src="item.pic_url" alt="">
                    <div class="content_item">
                        <p>{{item.detail}}</p>
                        <div class="price_cart">
                            <span class="price">{{'￥'+ item.price}}</span>
                            <span><van-icon :name="item.icon" /></span>
                        </div>
                    </div>
                </div>
            </van-grid-item>
        </van-grid>
    </div>

  </div>
</template>

<script>
export default {
    data () {
        return {
            current: 0,
            notice_text: '汇源集团成立于1992年，已在全国建立了140多个经营实体，链接了1000多万亩优质果蔬茶粮等种植基地，建立了遍布全国的销售网络，构建了一个横跨东西、纵贯南北的农业产业化经营体系，形成了汇源果汁、汇源果业、汇源农业三大产业互相促进、共同发展的新格局。',
            product_pic: [
                {id: 1,picurl:'http://www.huiyuan.com.cn/repository/image/32ZxCU22Td2d9DiVfC4A6w.jpg'},
                {id: 2,picurl:'http://www.huiyuan.com.cn/repository/image/6fzfs7WMSu2QRfjch2wFFw.jpg'},
                {id: 3,picurl:'http://www.huiyuan.com.cn/img/xtbg.jpg'},
                {id: 4,picurl:'http://www.huiyuan.com.cn/repository/image/Ww97m_oWQsqz7gsWVKTL1Q.jpg'},
                {id: 5,picurl:'http://www.huiyuan.com.cn/repository/image/dNWKCTYeSP-gIZieO5Kqlw.jpg'},
            ],
            carousellist:[
                {id: 1,picurl:'http://www.huiyuan.com.cn/repository/image/f5f0b7fa-8549-4e09-9571-ea33585ee12e.jpg'},
                {id: 2,picurl:'http://www.huiyuan.com.cn/repository/image/QYFZfxnyQFqLXBmCg_LGzA.jpg'},
                {id: 3,picurl:'http://www.huiyuan.com.cn/repository/image/EvA6ImPZSfCgz8_k0pYHLQ.jpg'},
                {id: 4,picurl:'http://www.huiyuan.com.cn/repository/image/etUqLQzMT8mDKnqIi13jiA.jpg'}
            ],
            classifylist:[
                {id: 1,name:'签到有礼',icon:'gift-o',path:'/signin'},
                {id: 2,name:'新品上新',icon:'new-o',path:'/commodity'},
                {id: 3,name:'分销中心',icon:'manager-o',path:'/distribution'},
                {id: 4,name:'产品分类',icon:'apps-o',path:'/classify'}
            ],
            production_ima:[],
            paramsname:''
        }
    },
    created () {
      this.getproduction();  
      this.getparamsname();
    },
    methods: {
        onChange(index) {
            this.current = index;
        },
        getproduction(){
            // console.log(this.$route);
            this.production_ima = this.$store.state.commodity_all[0].commodity
        },
        getparamsname(){
            this.paramsname = this.$store.state.commodity_all[0].name
        }
    },    
    mounted () {
        this.$router.afterEach(() => {
            window.scrollTo(0, 0)
        })
    }
}
</script>

<style scoped>
    .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }
    .home{
        padding-top: 46px;
        padding-bottom: 50px;
    }
    .van-swipe{
        height: 260px;
    }
    .van-swipe img{
        width: 100%;
        height: 100%;
    }
    .classify{
        padding: 15px 0;
        background-color: #fff;
    }
    .item_classify{
        width: 25%;
        display: inline-block;
    }
    .item_classify:hover{
        cursor: pointer;
    }
    .item_classify p{
        text-align: center;
        color: red;
    }
    .item_classify .content{
        color: #999;
        font-size: 12px;
    }
    .product{
        width: 100%;
    }
    .product::after{
        display: block;
        content: ' ';
        clear: both;
        height: 0;
    }
    .product img{
        float: left;
        font-size: 0;
        width: 100%;
        height: auto;
    }
    .production{
        /* font-size: 0; */
        width: 100%;
        background-color: #f4f4f4;
    }
    .product_item{
        width: 100%;
        /* float: left; */
        /* display: inline-block; */
        /* padding: 10px; */
    }
    .product_item img{
        width: 100%;
    }
    .content_item{

    }
    .content_item p{
        font-size: 14px;
        color: #555;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; 
    }
    .price_cart{
        display: flex;
        justify-content: space-between;
        padding: 10px 8px;
    }
    .price_cart .price{
        color: red;
        font-size: 16px;
    }
    .price_cart span{
        color: red;
    }
</style>
<style>
    /* .van-grid-item{
        margin: 5px 0;
    }
    .van-grid-item__content{
        padding: 0 !important;
        margin: 5px;
    } */
</style>