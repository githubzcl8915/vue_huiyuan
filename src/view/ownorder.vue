<template>
  <div class="ownorder">

    <!-- 头部导航 -->
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 订单状态 -->
    <div class="orderstatus">
        <van-tabs v-model="active" :border="false">
            <van-tab title="全部">
                <!-- 订单详情 -->
                <div class="orderdetail" v-for="(item,i) in get_order_info" :key="i">
                    <van-panel title="vivo官方旗舰店" status="已完成">
                      <!-- <div>内容</div> -->
                    </van-panel>

                    <!-- 如果是多个商品的订单 -->
                    <div class="aaa" v-if="Array.isArray(item)">
                      <van-card
                        v-for="items in item"
                        :key="items.id"
                        :num="items.comm_nums"
                        :price="items.price"
                        :desc="items.detail"  
                        :title="items.name"
                        :thumb="items.pic_url"
                      />
                    </div>
                    <!-- 如果是单个商品的订单 -->
                    <div class="bbb" v-else>
                      <van-card
                        :num="item.comm_nums"
                        :price="item.price"
                        :desc="item.detail"  
                        :title="item.name"
                        :thumb="item.pic_url"
                      />
                    </div>

                    <div class="viewdetail">
                      <div class="total">
                        <span>共计<a>{{item.comm_nums}}</a>件商品</span>
                        <span>总计: <a>{{(Array.isArray(item)? Number(item[0].totalprice):Number(item.totalprice)).toFixed(2)}}</a></span>
                      </div>
                      <div class="discount">
                        <span>(含运费:<a>0.00</a></span>
                        <span>优惠:<a>0.00</a>)</span>
                      </div>
                      <div class="btns">
                        <button class="del" @click="delitem(i)">删除订单</button>
                        <button><router-link :to="'/order_detail/'+i">查看详情</router-link></button>
                      </div>
                    </div>
                </div>

            </van-tab>
            <van-tab title="待付款">
              <div class="no_comm">
                <van-empty description="暂时没有任何商品" />
                <van-button type="primary">赶紧选购</van-button>
              </div>
            </van-tab>
            <van-tab title="待收货">
              <div class="no_comm">
                <van-empty description="暂时没有任何商品" />
                <van-button type="primary">赶紧选购</van-button>
              </div>
            </van-tab>
            <van-tab title="待评价">
              <div class="no_comm">
                <van-empty description="暂时没有任何商品" />
                <van-button type="primary">赶紧选购</van-button>
              </div>
            </van-tab>
        </van-tabs>
    </div>

        

  </div>
</template>

<script>
export default {
  data(){
    return{
      active: 0,
      ordernews:[],
      totalprice: 0,
      totalnum: 0,
      get_order_info:function(){
          var getorder = [];
          getorder = JSON.parse(localStorage.getItem('huiyuan_order') || '[]')
          return getorder;
      }(),
    }
  },
  created(){
    this.get_from_own_id();
  },
  methods:{
    get_from_own_id(){
      // console.log(this.$route.query.id)
      this.active = this.$route.query.id - 1
    },
    delitem(id){
      // alert(id)
      // console.log(id)
      this.get_order_info = this.get_order_info.filter((item,index)=>{
        return index != id; 
      })
      // let ordered = JSON.parse(localStorage.getItem('ordernews') || '[]')
      // this.ordernews = ordered.filter(item => {
      //   return item.id != id
      // })
      localStorage.setItem('huiyuan_order',JSON.stringify(this.get_order_info))

    },
  }
}
</script>

<style scoped>
  .top{
    border-bottom: solid 1px #e4e4e4;
  }
  .orderstatus{
    padding-top: 46px;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .van-tabs__content{
    padding-top: 100px;
  }
  .orderdetail{
    padding-bottom: 20px;
    border-bottom: 10px solid #f4f4f4;
  }
  .viewdetail{
    text-align: right;
    margin-top: 10px;
    padding-right: 20px;
    border-top: solid 1px rgb(241, 241, 241)
  }
  .viewdetail .total{
    padding-top: 10px;
    font-size: 14px;
  }
  .viewdetail .total span{
    margin-left: 15px;
    color: #333
  }
  .viewdetail .total span a{
    color: red
  }
  .viewdetail .discount{
    padding-top: 10px;
    font-size: 14px;
  }
  .viewdetail .discount span{
    margin-left: 15px;
    color: #333
  }
  .viewdetail .discount span a{
    color: red
  }
  .viewdetail .btns{
    padding-top: 20px;
  }
  .viewdetail .btns button{
    padding: 5px 15px;
    background-color: rgb(247, 70, 70);
    border: none;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
  }
  .viewdetail .btns .del{
    margin-right: 15px;
  }
  .viewdetail .btns a{
    color: #fff;
  }
</style>
<style lang="scss">
  .ownorder{
    .orderstatus{
      .van-tabs__wrap{
        width: 100%;
        z-index: 999;
        position: fixed !important;
      }  
      .van-tabs__content{
        padding-top: 44px;
      }
    }
  }


</style>