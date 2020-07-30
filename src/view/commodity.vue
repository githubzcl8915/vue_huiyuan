<template>
  <div class="commodity">
    <!-- 头部导航 -->
    <van-nav-bar title="商品" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 头部搜索 -->
    <div class="header_search">
      <div class="classify" @click="showPopup">
        <van-icon name="bars" color="#999" style="line-height: inherit;" />
        <span>分类</span>
        <!-- 点击分类左边弹出框 -->
        <van-popup v-model="show" position="right" :style="{width: '30%', height: '100%' }" close-on-click-overlay />
      </div>
      <div class="search">
        <van-search v-model="value" shape="round" clearable placeholder="请输入搜索关键词" />
      </div>
      <div class="list">
        <van-icon name="apps-o" color="#999" style="line-height: inherit;" />
        <span>列表</span>
      </div>
    </div>

    <!-- 商品分类 -->
    <div class="commodity_classify">
      <!-- 商品排序 -->
      <van-tabs v-model="active" animated title-active-color="#ee0a24" @click="getindex">
        <van-tab v-for="item in commodity_all" :key="item.id" :title="item.name">
          <!-- 商品信息 -->
          <div class="commodity_ima">
            <div class="commodity_item" v-for="items in commodity_item" :key="items.id">
              <router-link :to="'/comm_detail/'+paramsname+'/'+items.id">
                <div class="commodity_pic">
                  <img :src="items.pic_url" alt="">
                </div>
                <div class="commodity_content">
                  <div class="content">{{items.detail}}</div>
                  <div class="cart_price">
                    <div class="comm_price">
                      ￥{{items.price}}
                    </div>
                    <div class="comm_cart">
                      <van-icon :name="items.icon" color="red" style="line-height: inherit;" />
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data () {
    return {
      value: '',
      active: 0,
      show: false,
      paramsname:'全部',//传递参数给商品详情页，先匹配分类，在匹配id
      commodity_info:[],
      commodity_item:[],
    }
  },
  created () {
    this.getactive_info();
    // this.getcommodity_item()
  },
  computed: {
    ...mapState(['commodity_all'])
  },
  methods: {
    getindex(index){
      this.commodity_info = this.commodity_all.filter(item =>{
        return (item.id-1) == index;
      })
      this.commodity_item = this.commodity_info[0].commodity;
      this.paramsname = this.commodity_info[0].name;
      console.log(this.commodity_info,this.paramsname)
    },
    getactive_info(){
      this.commodity_item = this.commodity_all[0].commodity;
    },
    showPopup() {
      this.show = true;
    },
  },
  mounted () {
    this.$router.afterEach(() => {
        window.scrollTo(0, 0)
    })
  }
}
</script>

<style lang="scss">
  .commodity{
    padding-top: 46px;
    padding-bottom: 50px;
    .header_search{
      display: flex;    
      padding: 0 10px; 
      background-color: #fff;
      border-bottom: solid 1px #f4f4f4;
      position: fixed;
      width: 100%;
      z-index: 999;
      .classify{
        // text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{
          font-size: 12px;
          color: #999;
          display: block;
        }
      }
      .search{
        flex-grow: 1;
      }
      .list{
        // text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span{
          font-size: 12px;
          color: #999;
          display: block;
        }
      }
    }
    .commodity_classify{
      padding-top: 2.7rem;
      .van-tab{
        flex-basis: 20% !important;
        .van-tabs__wrap{
          position: fixed !important;
          // z-index: 999;
        }
      }
      .van-tabs__content.van-tabs__content--animated{
        background-color: #fff;
        .van-tab__pane{
          padding: 0 15px;
        }
      }
      .commodity_ima{
        .commodity_item{
          // display: flex;
          padding: 10px 0;
          a{
            display: flex;
          .commodity_pic{
            width: 30%;
            height: 120px;
            img{
              width: 100% !important;
              height: 100%;
              border: solid 1px red;
            }
          }
          .commodity_content{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 70%;

            padding-left: 10px;
            .content{
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
              // height: 60px;
              font-size: 14px;
              color: #333;
            }
            .cart_price{
              display: flex;
              justify-content: space-between;
              .comm_price{
                font-size: 16px;
                color: red;
              }
              .comm_cart{}
            }
          }
          }
        }
      }

    }
  }

</style>
<style lang="scss">
  .commodity_classify{
      padding-top: 2.7rem;
      .van-tabs__wrap{
        position: fixed !important;
        z-index: 10;
        width: 100%;
      }
      .van-tabs__content.van-tabs__content--animated{
        padding-top: 2.7rem;
      }
  }  
</style>