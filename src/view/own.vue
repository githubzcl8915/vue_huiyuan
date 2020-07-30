<template>
  <div class="own">
    <!-- 头部导航 -->
    <van-nav-bar title="我的" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 个人信息 -->
    <div class="person_info">
      <div class="portrait_qrcode">
        <div class="portrait">
          <img :src="person_info[0].picurl" alt="">
          <span>{{(get_signin_info.length? get_signin_info[0][0].name:person_info[0].name)}}</span>
        </div>
        <div class="qrcode">
          <van-icon :name="person_info[0].icon" @click="showqrcode" />
          <!-- 点击二维码icon弹出指定的二维码 -->
          <van-dialog v-model="show" :title="person_info[0].scan_qrcode" show-cancel-button>
            <img class="show_qrcode" :src="person_info[0].qrcode" />
          </van-dialog>
        </div>
      </div>
      <div class="signin">
        <span>{{person_info[0].signin}}</span>
      </div>
    </div>

    <!-- 积分 余额 优惠券 -->
    <div class="integral">
      <div class="integral_item" v-for="item in integral" :key="item.id">
        <div class="integral_num">{{item.num}}</div>
        <div class="integral_name">{{item.name}}</div>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="order-info">
      <div class="go_order">
          <van-cell to="/ownorder" :title="order_info.ordername" is-link :value="order_info.vieworder" />
      </div>
      <div class="logistics">
        <van-grid :column-num="order_info.logistics.length" >
          <van-grid-item v-for="item in order_info.logistics" :key="item.id" :icon="item.icon" :text="item.title" @click="goownorder(item.id)"/>
        </van-grid>
      </div>
    </div>

    <!-- 个人信息活动 -->
    <div class="person_active">
      <van-cell v-for="item in own_info" :title="item.title" :key="item.id" :icon="item.icon" :to="item.path">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon :name="item.icon_go" style="line-height: inherit;" />
        </template>
      </van-cell>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,//控制二维码显示与隐藏
      person_info:[
        {id:1,name:'德玛西亚',icon:'qr',signin:'签到',scan_qrcode:'请扫描二维码',picurl:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1892204807,2455024704&fm=111&gp=0.jpg',qrcode:'https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=829888290,2650878176&fm=74&app=80&f=JPG&size=f121,121?sec=1880279984&t=274501980523d63a7d93c94f85aabbab'}
      ],
      integral:[
        {id:1,num:0.00,name:'余额'},
        {id:2,num:5,name:'积分'},
        {id:3,num:0,name:'优惠券'}
      ],
      order_info:{
        ordername:'订单信息',
        vieworder:'查看全部订单',
        icon:'arrow',
        logistics:[
          {id:1,icon:'credit-pay',title:'待付款'},
          {id:2,icon:'send-gift-o',title:'待发货'},
          {id:3,icon:'logistics',title:'待收货'},
          {id:4,icon:'records',title:'待评价'},
          {id:5,icon:'smile-comment-o',title:'退款/售后'},
        ]
      },
      own_info:[
          {id:1,icon_go:'arrow',icon:'gift-o',title:'签到有礼',path:'/signin'},
          {id:2,icon_go:'arrow',icon:'coupon-o',title:'我的礼品卡',path:'/own_cards'},
          {id:3,icon_go:'arrow',icon:'shrink',title:'分销中心',path:'/distribution'},
          {id:4,icon_go:'arrow',icon:'shop-o',title:'积分商城',path:'/intergral_mall'},
          {id:5,icon_go:'arrow',icon:'calender-o',title:'拼团',path:'/collage'},
          {id:6,icon_go:'arrow',icon:'label-o',title:'砍价',path:'/bargain'},
          {id:7,icon_go:'arrow',icon:'good-job-o',title:'推荐',path:'/recommend'},
          {id:8,icon_go:'arrow',icon:'setting-o',title:'账户与安全',path:'/user_safe'},
          {id:9,icon_go:'arrow',icon:'point-gift-o',title:'历史订单',path:'/ownorder'},
          {id:10,icon_go:'arrow',icon:'sign',title:'支付单查询',path:'/paynote_query'},
      ],
      get_signin_info:function(){
        var user_info = JSON.parse(localStorage.getItem('huiyuan_signin_info') || '[]') ;
        return user_info;
      }()
        
    }
  },
  methods: {
    showqrcode(){
      this.show = true;
      // console.log(this.show)
    },
    goownorder(id){
      console.log(this.$router)
      this.$router.push({path:'/ownorder',query:{id:id}})
    }
  }
}
</script>

<style lang="scss">
.own{
  width: 100%;
  padding-top: 46px;
  padding-bottom: 50px;
  // background-color: red;
  .person_info{
    width: 100%;
    height: 120px;
    display: flex;
    padding: 0 15px;
    background: linear-gradient(rgb(95, 141, 240),rgb(75, 241, 9));
    .portrait_qrcode{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      .portrait{
        display: flex;
        // background-color: red;
        img{width: 80px;height: 80px;border-radius: 50%;margin-right: 15px;}
        span{display:inline-block;color: #fff;font-size: 16px;line-height: 80px;}
      }
      .qrcode{
        margin-left: 10px;
        color: #fff;
        .van-dialog__header{
          color: #333;
          padding-bottom: 20px;
        }
        .van-dialog__content{
          text-align: center;
        }
        .show_qrcode{
          width: 120px;
          height: 120px;
          margin-bottom: 15px;
        }
      }
    }
    .signin{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      padding: 0;
      span{
        // background-color: red;
        margin-left: 100%;
        transform: translateX(-50%);
        white-space: nowrap;
        padding: 5px 10px;
        font-size: 14px;
        color: #fff;
        border: solid 1px #fff;
        border-radius: 15px;
      }
    }
  }
  .integral{
    padding: 10px 0 5px;
    background-color: #fff;
    margin-bottom: 10px;
    .integral_item{
      width: 33.3%;
      display: inline-block;
      padding: 0 5px;
      text-align: center;
      .integral_num{}
      .integral_name{font-size: 14px;color: #333;}
    }
  }
  .order-info{
    margin-bottom: 10px;
    .go_order{}
    .logistics{}
  }
  .person_active{

  }
}
</style>