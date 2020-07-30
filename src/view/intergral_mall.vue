<template>
  <div class="intergral_mall">
      <!-- 头部导航 -->
        <van-nav-bar title="积分商城" left-text="返回" left-arrow @click-left="$router.back()">
        <template right>
            <van-icon name="search" size="18" />
        </template>
        </van-nav-bar>

        <!-- banner -->
        <div class="banner">
          <div class="pic_img"></div>
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
  .intergral_mall{
    padding-top: 46px;
    .banner{
      .pic_img{
        background-image: url(/src/assets/images/good_commodity.jpg);
      }
    }
  }

</style>