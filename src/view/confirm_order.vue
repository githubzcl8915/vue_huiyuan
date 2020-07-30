<template>
  <div class="comfirm_order">
    <!-- 头部导航 -->
    <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    
    <!-- 收货地址 -->
    <div class="address_comm">
        <div class="address">
            <!-- 有收货地址 -->
            <div v-if="(gethuiyuan_area.length || gethuiyuan_area_default.length)" class="receving_comm">
                <router-link :to="{path:'/selectaddress',query:{num:this.$route.params.num,id:this.$route.params.id}}">
                    <div class="name_tel">
                        <span>{{receving_info.name+'：'+huiyuan_default_address.name}}</span>
                        <span>{{receving_info.tel+'：'+huiyuan_default_address.tel}}</span>
                    </div>
                    <div class="comm_address">
                        <p>{{receving_info.receving_address+'：'+huiyuan_default_address.province+huiyuan_default_address.city+huiyuan_default_address.county+huiyuan_default_address.addressDetail}}</p>
                    </div>
                </router-link>
            </div>
            <!-- 没有收货地址 -->
            <van-cell v-else v-for="item in own_info" :title="item.title" :key="item.id" :icon="item.icon" to="/add_adress">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon :name="item.icon_go" style="line-height: inherit;" />
                </template>
            </van-cell>
        </div>
        <div class="line">
            <ul>
                <li v-for="item in 10" :key="item"></li>
            </ul>
        </div>


        
    </div>

    <!-- 购物清单 -->
    <div class="comm_list">
        <div class="comm_header">
            <van-icon name="label-o" style="line-height: inherit;" />
            <span>购物清单</span>
        </div>
        <div class="comm_info">
            <van-card
            :num="comm_obj[0].comm_nums"
            :price="comm_obj[0].price"
            :title="comm_obj[0].name"
            :thumb="comm_obj[0].pic_url"
            />
        </div>
        <!-- 留言 -->
        <div class="leave_msg">
            <van-field
            v-model="message"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
            />
        </div>
        <div class="comm_foot">
            <p class="comm_num">{{all_comm_num_price.all+this.$route.params.num+all_comm_num_price.symbol+all_comm_num_price.comm}}</p>
            <p class="comm_price">
                合计:
                <b>￥{{totalprice.toFixed(2)}}</b>
            </p>
        </div>
    </div>

    <!-- 优惠券 -->
    <van-cell :title="view_info.coupon" is-link :value="view_info.coupon_content+view_info.coupon_num+view_info.symbol" />

    <!-- 支付方式 -->
    <van-cell :title="view_info.pay_content" :value="view_info.paymode" />

    <!-- 订单信息 -->
    <div class="order_info">
        <ul>
            <li v-for="item in comm_info" :key="item.id">
                <span>{{item.title}}</span>
                <span>{{item.symbol + (item.price ? item.price : totalprice)}}</span>
            </li>
        </ul>
    </div>

    <!-- 遮掩背景空标签 -->
    <div class="bg-c"></div>

    <!-- 订单提交 -->
    <router-link to="/buysuccess">
    <van-submit-bar :price="Number(totalprice*100)" button-text="提交订单" @submit="onSubmit">
    </van-submit-bar>
    </router-link>
  </div>

  
</template>

<script>
export default {
    data () {
        return {
            message:'',//留言信息
            receving_info:{name:'收货人',tel:'电话',receving_address:'收货地址'},
            own_info:[
                {id:1,icon_go:'arrow',icon:'location-o',title:'请先添加收货地址'},
            ],
            all_comm_num_price:{all:'共计',symbol:'件',comm:'商品',allprice:'合计'},
            comm_info:[
                {id:1,title:'商品金额',symbol:'￥'},
                {id:2,title:'运费',price:'0',symbol:'+￥'},
                {id:3,title:'优惠金额',price:'0',symbol:'-￥'},
                {id:4,title:'实际支付',symbol:'￥'},
            ],
            view_info:{
                coupon:'优惠券',symbol:'元',coupon_num:'0',coupon_content:'已优惠',paymode:'在线支付',pay_content:'支付方式'
            },
            gethuiyuan_area:function(){
                var huiyuan_area_list = [];
                huiyuan_area_list = JSON.parse(localStorage.getItem('huiyuan_area') || '[]')
                return huiyuan_area_list;
            }(),
            comm_obj:{},//商品渲染信息
            huiyuan_default_address:{},//如果有收货地址信息的渲染列表
            gethuiyuan_area_default:function(){
                var huiyuan_area_default_list = [];
                huiyuan_area_default_list = JSON.parse(localStorage.getItem('huiyuan_area_default') || '[]')
                return huiyuan_area_default_list;
            }(),
            get_order_info:function(){
                var getorder = [];
                getorder = JSON.parse(localStorage.getItem('huiyuan_order') || '[]')
                return getorder;
            }(),
        }
    },
    computed: {
      totalprice(){
        return (this.comm_obj[0].price * this.comm_obj[0].comm_nums)
        // return console.log(this.comm_obj[0])
      }  
    },
    created () {
        this.get_default_address();
        this.get_comm_info();
    },
    methods: {
        onSubmit(){
            //将订单信息存入
            var order_arr = this.get_order_info;
            
            var order_comm = this.$store.state.commodity_all[0].commodity.find(item =>{
                return item.id == this.$route.params.id;
            })
            order_comm.remarks = this.message;
            order_comm.receving_areas = this.huiyuan_default_address;
            order_comm.totalprice = this.totalprice;
            console.log(order_comm)
            order_arr.push(order_comm);
            localStorage.setItem('huiyuan_order',JSON.stringify(order_arr));
        },
        get_default_address(){
            //获取收货地址
            if(this.gethuiyuan_area_default.length){
                console.log('有默认地址')
                this.huiyuan_default_address = this.gethuiyuan_area_default[0];
            }else{
                this.huiyuan_default_address = this.gethuiyuan_area[0];
            }

            // 修改收货地址
            // console.log(this.$store.state.huiyuan_area_lists,this.$store.state.area_id)
            var recevinglist = this.$store.state.huiyuan_area_lists;
            var recevingid = this.$store.state.area_id;
            if(recevingid && recevinglist){
                var midarr = recevinglist.filter(item=>{
                    return item.id == recevingid;
                })
                this.huiyuan_default_address = midarr[0];
                console.log('有id',midarr[0])

            }
            // this.huiyuan_default_address = recevinglist.filter(item=>{
            //     return item.id == recevingid;
            // })
        },
        get_comm_info(){
            this.comm_obj = this.$store.state.commodity_all[0].commodity.filter(item =>{
                item.comm_nums = this.$route.params.num;//地址栏获取商品数量;
                return item.id == this.$route.params.id;//地址栏获取商品id;
            })
            // console.log(this.comm_obj)
        }        
    }
}
</script>

<style lang="scss">
    .comfirm_order{
        padding-top: 46px;
        padding-bottom: 50px;
        background-color: #fff;
        .van-cell.van-cell--clickable{
            padding-left: 15px;
            padding-right: 15px;
        }
        .address_comm{
            // margin-bottom: .5rem;
            .address{
                color: red;
                .receving_comm{
                    padding: 0 20px;
                    .name_tel{
                        display: flex;
                        justify-content: space-between;
                        padding: .5rem 0;
                        span{
                            color: #555;
                            font-size: 14px;
                        }
                    }
                    .comm_address{
                        padding-bottom: .5rem;
                        p{font-size: 14px;color: #555;}
                    }
                }
            }
            .line{
                ul{
                    display: flex;
                    li{
                        width: 8%;
                        margin: 0 1%;
                    }
                    li:nth-child(odd){
                        border-bottom: solid 1px red;
                    }
                    li:nth-child(even){
                        border-bottom: solid 1px blue;
                    }
                }
            }
        }
        .comm_list{
            background-color: #fff;
            .comm_header{
                line-height: 2rem;
                padding: 0 15px;
                border-bottom: solid 1px #e4e4e4;
                display: flex;
                // justify-content: center;
                align-items: center;
                span{
                    font-size: 16px;
                    margin-left: 10px;
                    color: #333;
                }
            }
            .comm_info{
                .van-card{
                    background-color: #fff;
                    border-bottom: solid 1px #e4e4e4;
                    .van-card__title.van-multi-ellipsis--l2{
                        font-size: 14px;
                    }
                    .van-card__content{
                        padding: 0 .5rem;
                        .van-card__price{
                            color: red;
                        }
                    }
                }
            }
            .leave_msg{
                border-bottom: solid 1px #e4e4e4;
            }
            .comm_foot{
                display: flex;
                line-height: 2.5rem;
                padding: 0 15px;
                .comm_num{
                    width: 70%;
                    text-align: right;
                    // padding-right: 3rem;
                }
                .comm_price{
                    text-align: right;
                    width: 30%;
                }
                p{
                    font-size: 14px;
                    text-align: right;
                    color: #333;
                    b{
                        font-weight: normal;
                        color: red;
                    }
                }
            }
        }
        .order_info{
            background-color: #fff;
            padding: 1rem 15px;
            ul{
                margin: 0;
                padding: 0;
                list-style: none;
                li{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    color: #999;
                    line-height: 1.5rem;
                }
            }
        }
    }

</style>