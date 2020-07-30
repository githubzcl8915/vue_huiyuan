<template>
  <div id="app">


    <!-- {{headername}} -->

    <router-view></router-view>

    <!-- 底部导航 -->
    <van-tabbar v-if="istabbarlist.indexOf(this.$route.path) >= 0" v-model="active" @change="onChange" route active-color="#07c160" inactive-color="#000">
      <van-tabbar-item v-for="item in tabbarlist" :key="item.id" :icon="item.icon" :to="item.path">{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>


  
</template>

<script>

// import { Notify } from 'vant';
export default {
  data () {
    return {
      active: 0,
      headertitle:'',
      istabbarlist:[],
      tabbarlist:[
        {id: 1,title:'首页',icon:'wap-home-o',path:'/home'},
        {id: 2,title:'商品',icon:'shop-o',path:'/commodity'},
        {id: 3,title:'购物车',icon:'shopping-cart-o',path:'/cart'},
        {id: 4,title:'我的',icon:'friends-o',path:'/own'}
      ],
    }
  },
  created () {
    this.getheadertitle();
    this.istabbar();
  },
  methods: {
    getheadertitle(){
      this.headertitle = this.tabbarlist.filter(item =>{
        return this.$route.path == item.path;
        // console.log(item.path,this.$route.path)
      })
      // console.log(this.headertitle[0].title,this.$route.path)
    },
    onChange() {
      // Notify({ type: 'primary', message: index });
        //     this.headertitle = this.tabbarlist.filter(item =>{
        // return this.$route.path == item.path;
        console.log(this.$route.path)
      // })
    },
    istabbar(){
      this.tabbarlist.map(item =>{
        this.istabbarlist.push(item.path);
      })
    }
  },
  computed: {
    // headername(){
    //   return this.headertitle = this.tabbarlist.filter(item =>{
    //     return this.$route.path == item.path;
    //   })
    // }
  },
  watch: {
    // headertitle(news,olds){
    //   this.headertitle = news;
    //   // console.log(news,olds)
    // }
  }
}
</script>

<style>
  *{
    margin: 0;
    box-sizing: border-box;
  }
  #app{
    background-color: #f4f4f4;
    max-width: 450px;
    height: 100%;
    margin: 0 auto;
  }
  .van-nav-bar.van-hairline--bottom{
    position: fixed;
    width: 100%;
    top: 0;
  }
</style>
