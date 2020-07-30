<template>
  <div class="register">
    <!-- 头部导航 -->
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="$router.back()">
      <!-- <template #right>
        <van-icon name="manager-o" size="18" />
      </template> -->
    </van-nav-bar>

    <!-- 注册信息 -->
    <div class="register_info">
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

    <!-- 注册按钮 -->
    <div class="register_btn">
      <van-button type="primary" block @click="register">注册</van-button>
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
    register(){
      if(this.username&&this.password){
        if(/^[a-z|A-z|0-9]{6,18}$/.test(this.password)){
          // console.log('密码设置成功')
          // var userinfo_arr = this.get_user_info;
          // var userinfo_obj = {};
          // userinfo_obj.name = this.username;
          // userinfo_obj.password = this.password;
          // // console.log(userinfo_obj)
          // userinfo_arr.push(userinfo_obj);
          // localStorage.setItem('huiyuan_user_info',JSON.stringify(userinfo_arr));
          
          // Toast('注册成功')
          var userinfo_arr = this.get_user_info;
          var isExited = userinfo_arr.some(item =>{
            return item.name == this.username;
          })
          if(isExited){
            Toast('该用户名已被注册！')
          }else{
            var userinfo_obj = {};
            userinfo_obj.name = this.username;
            userinfo_obj.password = this.password;
            userinfo_obj.status = false;
            // console.log(userinfo_obj)
            userinfo_arr.push(userinfo_obj);
            localStorage.setItem('huiyuan_user_info',JSON.stringify(userinfo_arr));
            
            Toast('注册成功')
            this.$router.push({path:'/person_signin'})
          }

        }else{
          Toast('密码只允许6-18位字母和数字组成！')
          return false;
        }

        
      }else{
        Toast('信息不完整')
      }
      
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .register{
    background-color: #fff;
    padding-top: 46px;
    .register_info{
      padding-top: 1rem;
    }
    .register_btn{
      padding: 2rem 1rem;
    }
  }
</style>