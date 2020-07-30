<template>
  <div class="own_cards">
      <!-- 头部导航 -->
        <van-nav-bar title="我的礼品卡" left-text="返回" left-arrow @click-left="$router.back()">
        <template right>
            <van-icon name="search" size="18" />
        </template>
        </van-nav-bar>

        <!-- 卡片分类 -->
        <van-tabs v-model="active" color="#07c160" title-active-color="#07c160">
          <van-tab v-for="item in cards_list" :key="item.id" :title="item.name">
            <van-empty description="暂无此类礼品卡！">
              <van-button round type="danger" class="bottom-button">
                更多礼品卡
              </van-button>
            </van-empty>

            <!-- 底部绑定卡片 -->
            <div class="binding">
              <van-button type="primary" block>绑定礼品卡</van-button>
            </div>
          </van-tab>
        </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 1,
      cards_list:[
        {id:1,name:'可使用',card_details:[]},
        {id:2,name:'已赠送',card_details:[]},
        {id:3,name:'不可用',card_details:[]},
      ]    
    }
  }
}
</script>

<style lang="scss" scoped>
  .own_cards{
    padding-top: 46px;
    height: 100vh;
    .bottom-button {
      width: 160px;
      height: 40px;
      color: #fff;
      background-color: #07c160;
      border: none;
    }
    .binding{
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 0 1rem;
    }
  }

</style>