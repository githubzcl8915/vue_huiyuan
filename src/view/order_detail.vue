<template>
  <div class="order_detail">
        <!-- 头部导航 -->
        <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="$router.back()">
        <template right>
            <van-icon name="search" size="18" />
        </template>
        </van-nav-bar>

        <!-- 订单状态 -->
        <div class="order_details">
            <p>订单详情: 已完成</p>
        </div>

        <!-- 收货人信息 -->
        <div class="receving_person" v-if="Array.isArray(order_comm)">
            <span>{{receving_person.title+'：'+order_comm[0].receving_areas.name}}</span>
            <span>{{receving_person.tel+'：'+order_comm[0].receving_areas.tel}}</span>
            <span class="rece_address">{{receving_person.address+'：'+order_comm[0].receving_areas.province+order_comm[0].receving_areas.city+order_comm[0].receving_areas.country+order_comm[0].receving_areas.addressDetail}}</span>
        </div>
        <div class="receving_person" v-else>
            <span>{{receving_person.title+'：'+order_comm.receving_areas.name}}</span>
            <span>{{receving_person.tel+'：'+order_comm.receving_areas.tel}}</span>
            <span class="rece_address">{{receving_person.address+'：'+order_comm.receving_areas.province+order_comm.receving_areas.city+order_comm.receving_areas.country+order_comm.receving_areas.addressDetail}}</span>
        </div>

        <!-- 商品信息 -->
        <div class="comm_detail">
            <!-- 如果是多个商品的订单 -->
            <div class="order_comm_isArray_true" v-if="Array.isArray(order_comm)">
                <van-card
                v-for="item in order_comm"
                :key="item.id"
                :num="item.comm_nums"
                :price="item.price"
                :desc="item.detail"
                :title="item.name"
                :thumb="item.pic_url"
                />
            </div>
            <!-- 如果是单个商品的订单 -->
            <div class="order_comm_isArray_false" v-else>
                <van-card
                :num="order_comm.comm_nums"
                :price="order_comm.price"
                :desc="order_comm.detail"
                :title="order_comm.name"
                :thumb="order_comm.pic_url"
                />
            </div>
        </div>

        <!-- 优惠详情 -->
        <div class="price_detail">
            <span v-for="item in price_detail" :key="item.id">{{item.title+'：'}}<b>{{(item.title == "商品总金额"? (order_comm.totalprice? order_comm.totalprice: order_comm[0].totalprice).toFixed(2):'0')}}</b></span>
        </div>

        <!-- 订单留言信息 -->
        <div class="order_remarks">
            <p v-if="Array.isArray(order_comm)">买家留言: {{order_comm[0].remarks? order_comm[0].remarks:'没有留言信息'}}</p>
            <p v-else>买家留言: {{order_comm.remarks? order_comm_remarks:'没有留言信息' }}</p>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            receving_person:
                {title:'收货人',tel:'电话',address:'收货地址'},
            price_detail:[
                {id:1,title:'商品总金额'},
                {id:2,title:'运费'},
                {id:3,title:'优惠'},
            ],
            order_comm:[],
            getorder_detail: function(){
                var order_comm_detail = [];
                order_comm_detail = JSON.parse(localStorage.getItem('huiyuan_order') || '[]');
                return order_comm_detail;
            }()
        }
    },
    created () {
      this.getorderid()  
    },
    methods: {
        getorderid(){
            // console.log(this.$route.params.id)
            var comm_order = this.getorder_detail.filter((item,index) =>{
                console.log(index ,this.$route.params.id)
                return index == this.$route.params.id;
            })
            this.order_comm = comm_order[0];
            console.log(this.order_comm)
        }
    }
}
</script>

<style lang="scss" scoped>
    .order_detail{
        background-color: #fff;
        padding-top: 46px;
        .order_details{
            padding: 0 15px;
            width: 100%;
            height: 6rem;
            display: flex;
            // justify-content: center;
            align-items: center;
            background: linear-gradient(90deg,rgb(8, 184, 238),rgb(42, 199, 238));
            p{
                color: #fff;
                font-size: 18px;
            }
        }
        .receving_person{
            padding: 10px 15px;
            border-bottom: solid 1px #e4e4e4;
            // display: flex;
            span{
                display: inline-block;
                width: 50%;
                font-size: 14px;
                padding:  6px 0;
            }
            .rece_address{
                width: 100%;
            }
        }
        .price_detail{
            padding: 20px 15px;
            border-bottom: solid 1px #e4e4e4;
            span{
                display: block;
                padding: 8px 0 0;
                b{
                    font-weight: normal;
                    color: red;
                }
            }
        }
        .order_remarks{
            // background-color: #f4f4f4;
            box-shadow: 0px 1px 10px 1px #f4f4f4;
            padding: 1rem 15px;
            p{
                font-size: 14px;
                color: #999;
            }
        }
    }
</style>