<template>
  <div class="calssify">
    <!-- 头部导航 -->
    <van-nav-bar title="产品分类" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 侧边栏&&商品列表 -->
    <div class="aside_commodity">
        <!-- 侧边栏 -->
        <div class="aside_comm">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item v-for="item in comm_classify" :key="item.id" :title="item.name" @click="getcomm(item.name)" />
            </van-sidebar>
        </div>

        <!-- 侧边栏索引的商品列表 -->
        <div class="commodity_list">
            <van-grid :column-num="3">
                <van-grid-item v-for="item in filter_list" :key="item.id" :to="'/comm_detail/'+item.class+'/'+item.id">
                    <div class="comm_item">
                        <img :src="item.pic_url" alt="">
                        <p>{{item.name}}</p>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
    </div>    

  </div>
</template>

<script>
export default {
    data () {
        return {
            activeKey: 0,
            comm_classify:[
                {id:1,name:'全部'},
                {id:2,name:'按规格'},
                {id:3,name:'青春版'},
                {id:4,name:'经典版'},
                {id:5,name:'礼盒装'},
                {id:6,name:'家庭装'},
                {id:7,name:'汇源好水'},
                {id:8,name:'山楂汁'},
                {id:9,name:'沙棘汁'},
                {id:10,name:'汇源农谷'},
                {id:11,name:'汇源儿款'},
                {id:12,name:'汇源卡'},
                {id:13,name:'意中人'},
                {id:14,name:'新品上新'},
                {id:15,name:'红酒'},
                {id:16,name:'按口味'},
            ],
            classify_active:'全部',//分类商品默认显示栏目
            commodity_list:[],//全部商品数据
            filter_list:[],//分完类后的数据
        }
    },
    created () {
      this.getcommodity_info();  
      this.getcomm('全部');
    },
    methods: {
        getcommodity_info(){
            this.commodity_list = this.$store.state.commodity_all[0].commodity;
            // console.log(this.$store.state.commodity_all[0].commodity)
        },
        getcomm(name){
            this.filter_list = this.commodity_list.filter(item =>{
                if(name == this.classify_active){
                    return item;
                }
                // console.log(this.filter_list)

                return item.classify == name;
            })
        }
    }
}
</script>

<style lang="scss">
.calssify{
    padding-top: 46px;
    background-color: #fff;
    .aside_commodity{
        display: flex;
        .aside_comm{
            .van-sidebar{
                height: 100vh;
            }
        }
        .commodity_list{
            flex-grow: 1;
            height: 100vh;
            // background-color: red;
            overflow-y: auto;
            .comm_item{
                width: 100%;
                img{
                    width: 80px;
                    height: 80px;
                }
                p{
                    text-align: center;
                    color: #999;
                    font-size: 14px;
                }
            }

        }
    }

}

</style>