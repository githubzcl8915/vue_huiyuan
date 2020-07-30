<template>
  <div class="selectaddress">
        <!-- 头部导航 -->
        <van-nav-bar title="收货地址" left-text="返回" left-arrow @click-left="$router.back()">
        <template right>
            <van-icon name="search" size="18" />
        </template>
        </van-nav-bar>

        <!-- 我的收货地址 -->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            管理我的收获地址
        </van-divider>

        <div class="my_receving_address">
            <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            to="/add_adress"
            />
        </div>

        <!-- 设置收货地址 -->
        <div class="set_address">
            <van-button type="primary" round block @click="setaddress">设置为收货地址</van-button>
        </div>
        
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            chosenAddressId: 1,
            list: [],//vant组件存放收货地址
            gethuiyuan_area:function(){
                var huiyuan_area_list = [];
                huiyuan_area_list = JSON.parse(localStorage.getItem('huiyuan_area') || '[]')
                return huiyuan_area_list;
            }(),
            gethuiyuan_area_default:function(){
                var huiyuan_area_default_list = [];
                huiyuan_area_default_list = JSON.parse(localStorage.getItem('huiyuan_area_default') || '[]')
                return huiyuan_area_default_list;
            }(),
        };
    },
    created () {
        this.gethuiyuan_areas();
    },
    methods: {
        onAdd() {
            Toast('新增地址');
            this.$router.push({path:'./add_adress'});
        },
        onEdit(item, index) {
            Toast('编辑地址:' + index);
        },
        gethuiyuan_areas(){
            //获取收获地址
            this.list = this.gethuiyuan_area;
            this.list.unshift(this.gethuiyuan_area_default[0]);
            this.list.map((item,index) =>{
                item.id = index + 1;
                item.address = item.province + item.city + item.country + item.addressDetail;
                return item;
            });

            // localStorage.setItem('huiyuan')
            // console.log(this.list)
            this.$store.state.huiyuan_area_lists = this.list;
        },
        setaddress(){
            //更改收货地址
            // console.log(this.chosenAddressId)
            this.$store.state.area_id = this.chosenAddressId;
            this.$router.push({path:'/confirm_order/'+this.$route.query.num+'/'+this.$route.query.id});

        },
        mounted () {
            // this.$router.beforeEach((to, from, next) => {
            //     // ${//to and from are Route Object,next() must be called to resolve the hook}
            //     if(to.path == '/confirm_order_cart'){
            //         this.$router.push('/confirm_order_cart')
            //     }else if(to.path == '/confirm_order'){
            //         this.$router.push({path:'/confirm_order/'+this.$route.query.num+'/'+this.$route.query.id});
            //     }
            //     console.log(from,next)
            // })
        }
    },
}
</script>

<style lang="scss" scoped>
    .selectaddress{
        padding-top: 46px;
        background-color: #fff;
        .set_address{
            padding: 1rem 1rem;
            position: fixed;
            bottom: 3rem;
            width: 100%;
        }
    }
</style>