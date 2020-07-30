<template>
  <div class="signin">
    <!-- 头部导航 -->
    <van-nav-bar title="签到有礼" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

  <van-checkbox-group v-model="result" @change="changestatus($event)">
    <van-checkbox name="a">复选框 a</van-checkbox>
    <van-checkbox name="b">复选框 b</van-checkbox>
  </van-checkbox-group>


  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],

    };
  },
  methods: {
    changestatus(values){
      console.log(values)
    }
  }
}
</script>

<style>
  .signin{
    padding: 100px 0;
  }
</style>