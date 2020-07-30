<template>
  <div class="cart">
    <!-- 头部导航 -->
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="$router.back()">
      <template right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 商品信息 -->
    <div class="comm_info">
      <div class="no_comm" v-if="!gethuiyuancart.length">
        <p>暂时没用任何商品!</p>
      </div>
      <div class="comm_item" v-for="item in gethuiyuancart" :key="item.id">
        <!-- <van-checkbox v-model="checked"></van-checkbox> -->
        <!-- <van-radio-group v-model="radio">
          <van-radio name="1"></van-radio>
        </van-radio-group> -->
        <van-checkbox-group v-model="result" @change="changestatus($event)">
          <van-checkbox :name="item.id" v-model="checkeds"></van-checkbox>
        </van-checkbox-group>
        <div class="comm_content">
          <div class="pic_comm">
            <img :src="item.pic_url" alt="">
          </div>
          <div class="contents">
            <div class="cont">
              <p>{{item.detail}}</p>
              <button @click="del(item.id)">移除</button>
            </div>
            <div class="price_comm">
              <div class="price">￥{{item.price}}</div>
              <van-stepper v-model="item.comm_nums" @change="onchange(item.id,$event)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算 -->
    <div class="footcount" v-if="gethuiyuancart.length">
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @change="changeallstatus()" @click="aaa(checked,$event)">全选</van-checkbox>
      </van-submit-bar>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  data () {
    return {
      // radio: 1,
      result: [],
      checkedlistid:[],//选中的商品id
      checkedlist:[],//选中的商品
      checked: false,
      checkeds: false,
      // cart_comm_list:[],
      gethuiyuancart: function(){
          var gethuiyuancarts = JSON.parse(localStorage.getItem('huiyuan_cart') || '[]');
          return gethuiyuancarts;
      }(),
    }
  },
  created () {
    // this.getcommnum();
    // this.getcart_info();
  },
  computed: {
    //计算总价格
    totalPrice(){
      // var totalprice = 0;
      // // console.log(this.checkedlist)
      // this.checkedlist.forEach(item =>{
      //   // 组件默认单位为分，使其单位正确
      //   totalprice += Number(item.comm_nums) * Number(item.price) * 100;
      //   // console.log(Number(item.comm_nums),Number(item.price),totalprice)
      // })
      // return totalprice;
      
      var totalprice = 0;
      this.gethuiyuancart.filter(item =>{
        return this.result.indexOf(item.id) != -1;
      }).forEach(items=>{
        totalprice += Number(items.price) * items.comm_nums * 100;
      // console.log(Number(items.price),items.comm_nums)

      })

      return totalprice;
    }
  },
  methods: {
    onSubmit(){
      // 提交订单
      if(this.result.length){
        this.$router.push({name:'Confirmordercart'})
        // // this.$store.state.order_comms = this.result;
        // this.$store.commit('save_order_comm', this.result)
        localStorage.setItem('huiyuan_cart_id',JSON.stringify(this.result));
      }else{
        // alert('没有选中商品') 
        Toast('请先选中商品！')
      }
    },
    onchange(id,nums){
      // console.log(id,nums)
      // 改变步进器的值
      this.gethuiyuancart = this.gethuiyuancart.map(item => {
        if(item.id == id){
          item.comm_nums = nums;
        }
        return item;
      })

      localStorage.setItem('huiyuan_cart',JSON.stringify(this.gethuiyuancart));
    },
    // check_comm(id,e){
    //   console.log(id,e)
    // },
    del(id){
      this.gethuiyuancart = this.gethuiyuancart.filter(item =>{
        return item.id != id;
      })
      localStorage.setItem('huiyuan_cart',JSON.stringify(this.gethuiyuancart));
    },
    changestatus(values){
      // this.checkedlistid = values;
      // console.log(item)
      // var comm_all = this.$store.state.commodity_all[0].commodity;
      // if(this.result.length == this.gethuiyuancart.length){
      //   // console.log('全选')
      //   this.checked = true;
      // }else{
      //   console.log(this.result)
      // }

      this.gethuiyuancart.forEach(items =>{

        if(values.indexOf(items.id) != -1){
          if(this.checkedlist.some(itemss =>{return itemss.id == items.id;})){
            return false;
          }else{
            this.checkedlist.push(items);

          }
        }
      })
      // console.log(this.checkedlist,this.checkedlistid,comm_all)
      // console.log(values)
      // console.log(this.result,item)

    },
    changeallstatus(){
      // if(this.checked != true){
      //   console.log("反选")
      //   this.result = [];
      // }else{
      //   console.log("全选",this.checkeds)
      //   this.checkeds = true;
      //   this.result = [2,4,1];

      // }
      // console.log(e)
      // if(this.checked == true){
      //   this.result = [1,2,4]
      // }else{
      //   this.result = [];
      // }

    },
    aaa(checked,e){
      // console.log(checked,e)
      // 获取点击的是全选多选框来控制全选和全不选，e.isTrusted是全选多选框的一个随机属性，只是为了知道是通过点击的全选多选框控制的全选。
      if(e.isTrusted == true){
        if(checked == true){
          var allcomm_id = [];
          allcomm_id = this.gethuiyuancart.map(item=>{
            return item.id;
          })
          this.result = allcomm_id;
        }else if(checked == false){
          this.result = [];
        }
      }
    }

  },
  watch: {
    result(newvalue){
      // if(newvalue){
      //   console(111)
      // }else{
      //   console(222,oldvalue)
      // }
      // console.log(newvalue)
      if(this.result.length == this.gethuiyuancart.length){
        this.checked = true;
      }else{
        // this.result = newvalue;
        if(this.result.length == 0){
          this.checked = false;
        }else{
          this.result = newvalue;
          this.checked = false;
        }
        // console.log('没有选中全部',this.result,this.result.length,this.gethuiyuancart.length)
      }
    }
  }
  // updated () {
  //     JSON.parse(localStorage.getItem('huiyuan_cart') || '[]');
  // }
}
</script>

<style lang="scss">
  .cart{
    padding: 46px 0 50px;
    background-color: #fff;
    .comm_info{
      padding: 0 10px;
      .no_comm{
        padding: 20px 0;
        p{
          text-align: center;
          font-size: 20px;
          color: red;
          padding: 15px;
          line-height: 30px;
          border: solid 1px #f4f4f4;
          box-shadow: 5px 5px 5px #f4f4f4;
        }
      }
      .comm_item{
        display: flex;
        padding: 15px 0;
        background-color: #fafafa;
        .van-checkbox-group{
          display: flex;
          align-items: center;
        }
        .comm_content{
          flex-grow: 1;
          padding-left: 10px;
          display: flex;
          .pic_comm{
            width: 100px;
            height: 100px;
            margin-right: 10px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .contents{
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .cont{
              display: flex;
              justify-content: space-between;
              p{
                font-size: 14px;
                color: #555;
                width: 200px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              button{
                width: 20%;
                border: none;
                outline: none;
                background-color: red;
                color: #fff;
                font-size: 14px;
                padding: 5px 10px;
              } 
            }
            .price_comm{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .price{
                font-size: 16px;
                color: red;
              }
            }
          }
        }
      }
    }
  }

</style>