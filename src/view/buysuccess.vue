<template>
  <div class="successContainer">
      <van-nav-bar 
      :z-index="999" title="购买成功"
      :style="{'height': '59px'}" 
      left-arrow fixed  @click-left="$router.back()"> 
       </van-nav-bar>

      <div class="msg">
          <van-icon name="checked" color="#52b838" size="105px"/>
        <h2>购买成功</h2>
        <p>
            已收到您的货款,请留意<router-link to="/ownorder">订单详情</router-link>以及<router-link to="/home">返回首页</router-link>另外祝您生活愉快 感谢您的支持与厚爱
        </p>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {}
    }
}
</script>

<style lang="scss" scoped>
    .successContainer{
        min-height: 100vh;
        padding-top: 59px;
        box-sizing: border-box;
        background: #f4f4f4;
        color: #333;
        .van-nav-bar__title{
            line-height: 59px;
            font-size: 17px;
        }
        .van-nav-bar__left{
            bottom: 8px;
            font-size: 17px;
            .van-nav-bar__text{
                color: #333;
            }
            i{
                color: #333;
                font-size: 24px;
            }
        }
        .van-nav-bar__right{
          bottom: 8px;
          i{
          color: #333;
          }
        }
        .msg{
            i{
                padding-top: 55px;
                padding-bottom: 40px;
            }
        }
        text-align: center;
        h2{
            font-size: 30px;
            font-weight: 400;
        }
        p{
            font-size: 15px;
            margin: auto;
            margin-top: 10px;
            width: 90%;
            a{
                color: #1574e3;
            }
        }
    }
</style>