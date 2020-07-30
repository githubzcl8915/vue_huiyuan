<template>
  <div class="signin">
    <!-- 头部导航 -->
    <van-nav-bar title="分销中心" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 微客申请 -->
    <div class="request_weike">
      <div class="bg-pic">
        <img src="https://img.huodongju.net/Public/image/www/default_v4/home_v1/tool.png" alt="">
      </div>
      <div class="request_info">
        <div class="mobile_phone">
          <div class="mobile">手机号</div>
          <div class="get_mobile">
            <van-icon name="user-circle-o" size="18" color="white" />
            <span>一键获取</span>
          </div>
        </div>
        <div class="request_btn">
          <van-button type="primary" block color="red">立即申请</van-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped> 
  .signin{
    background-color: #f4f4f4;
    height: 100vh;
    padding-top: 46px;
    .request_weike{
      .bg-pic{
        width: 100%;
        height: 260px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .request_info{
        padding: 20px;
        background-color: #fff;
        .mobile_phone{
          display: flex;
          border-bottom: solid 1px #f4f4f4;
          margin-bottom: 20px;
          padding: 15px 0;
          .mobile{
            flex-grow: 1;
            font-size: 14px;
            color: #666;
          }
          .get_mobile{
            // text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            padding: 5px 0;
            border-radius: 17px;
            background-color: red;
            span{
              color: white;
              font-size: 14px;
              margin-left: 10px;
            }
          }
        }
        .request_btn{

        }
      }
    }
  }
</style>