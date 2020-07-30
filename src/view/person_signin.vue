<template>
  <div class="person_singin">

    <!-- 头部导航 -->
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.back()">
      <!-- <template #right>
        <van-icon name="manager-o" size="18" />
      </template> -->
    </van-nav-bar>

    <!-- 登录信息 -->
    <div class="signin">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          type="text"
          label="用户名"
          right-icon="warning-o"
          placeholder="请输入用户名"
        />
        <van-field
          id="passwords"
          ref="password"
          v-model="password"
          required
          :type="passwords"
          clearable
          label="密码"
          :right-icon="righticon"
          placeholder="请输入密码"
          @click-right-icon="show_password"
        />
      </van-cell-group>
    </div>

    <!-- 登录按钮 -->
    <div class="signin_btn">
      <van-button type="primary" block @click="signin">登录</van-button>
    </div>

    <!-- 跳转注册 -->
    <div class="to_register">
      <router-link to="/register">
        <p>没有账号，<span>立即注册</span></p>
      </router-link>
    </div>

    <!-- 其他方式登录 -->
    <div class="other_signin">
      <!-- 分割线 -->
      <van-divider>其他方式登录</van-divider>

      <!-- 其他方式 -->
      <div class="othersignin">
        <div class="other_item" v-for="item in other_signin" :key="item.id">
          <van-icon :name="item.icon" size="50" color='rgb(8, 166, 214)' />
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data () {
    return {
      username:'',
      password:'',
      passwords:'password',
      righticon:'closed-eye',//密码框右边的图标
      other_signin:[
        {id:1,name:'支付宝',icon:'alipay'},
        {id:2,name:'手机号',icon:'phone'}
      ],
      get_user_info:function(){
        var user_info = JSON.parse(localStorage.getItem('huiyuan_user_info') || '[]') ;
        return user_info;
      }()
    }
  },
  methods: {
    show_password(){
      // var passwords = document.getElementById('passwords');
      // console.log(this.)
      // 通过ref获取html元素来改变某个属性的属性值（如果属性值是直接写在标签属性中的字符串）会报错，可以通过给他的属性值绑定到data中作为中间值来操作就不会报错
      if(this.passwords == 'password'){
        this.passwords = 'text'
        this.righticon = 'eye-o'
      }else{
        this.passwords = 'password'
        this.righticon = 'closed-eye'
      }
    },
    signin(){
      var signin_info = [];
      //登录点击事件
      // console.log(this.username,this.password)
      var isExited = this.get_user_info.some(item =>{
        return (item.name === this.username) && (item.password === this.password);
      })
      if(this.username&&this.password){
        // console.log(this.get_user_info.length)
        if(this.get_user_info.length == 0){
          Toast('该用户未注册')
        }else{
          if(isExited){
            signin_info[0] = this.get_user_info.filter(item =>{
              return (item.name === this.username) && (item.password === this.password);
            })
            console.log(signin_info)
            localStorage.setItem('huiyuan_signin_info',JSON.stringify(signin_info));
            Toast('登陆成功')
            this.$router.push({path:'/own'})
          }else{
            Toast('用户名或密码错误')
          }
          // this.get_user_info.forEach(item =>{
          //   console.log(item.name == this.username,item.password == this.password)
          //   if((item.name != this.username) || (item.password != this.password)){
          //     Toast('用户名或密码错误')
          //   }
          //   else if((item.name === this.username) && (item.password === this.password)){
          //     signin_info[0] = item;
          //     localStorage.setItem('huiyuan_signin_info',JSON.stringify(signin_info));
          //     Toast('登录成功')
          //     // this.$router.push({path:'/own'})
          //   }
          //   else{
          //     Toast('你是傻逼吗')
          //   }
          // })
        }

      }else{
        Toast('用户名或密码为空')
      }
      
    }
  },
  // mounted () {
  //   this.$refs.password
  // }
}
</script>

<style lang="scss" scoped>
  .person_singin{
    padding-top: 46px;
    background-color: #fff;
    .signin{
      padding: 2rem 1rem;
    }
    .signin_btn{
      padding: 1rem 1.5rem;
    }
    .other_signin{
      padding: 0 1rem;
      .othersignin{
        display: flex;
        .other_item{
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span{
            color: rgb(12, 183, 235);
            
          }
        }
      }
    }
    .to_register{
      // background-color: red ;
      p{
        text-align: center;
        color: #999;
        font-size: 14px;
        span{
          color: blue;
        }
      }
    }
  }
</style>