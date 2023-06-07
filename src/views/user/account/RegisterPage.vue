<template>
    <main class="container" id="main" >
      <div class="col-sm-6 col-lg-4 mb-4" style="position: relative; left: 33.3333%; margin:40px">
        <div class="card p-3">
        <form @submit.prevent="register">
          <h3 >注册</h3>
              <div class="form-group mt-3">
                <label for="username">用户名</label>
                <input type="username" class="form-control" v-model="username"  required="required">
              </div>
              <div class="form-group mt-3">
                <label for="password">密码</label>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="form-group mt-3">
                <label for="confirmedPassword">确认密码</label>
                <input type="password" class="form-control" v-model="confirmedPassword">
              </div>

              <button type="submit" class="btn btn-primary mt-3" style="width:100%">登录</button>
          </form>
        </div>
      </div>
     </main>
    </template>
    
    <script>
    import $ from 'jquery'
    import {ref} from 'vue';
    import { useStore } from 'vuex';
    import router from '@/router';
    export default{
     setup(){
      let username=ref('');
      let password=ref('');
      const store=useStore();
      let error_message=ref('');
      let confirmedPassword=ref('');
      
      const register=()=>{
        $.ajax({
            url:"http://127.0.0.1:3000/user/account/register/",
            type:"post",
            data:{
                username:username.value,
                password:password.value,
                confirmedPassword:confirmedPassword.value,
                power:"学生",
            },
            success(resp){
                if(resp.error_message==="success"){
                    router.push({name:"login"});
                }else{
                    error_message.value=resp.error_message;
                }
            },        
        })
      }
      return{
        username,
        password,
        error_message,
        confirmedPassword,
        register
      }
     }
     
    }
    
    </script >
    
    <style scoped>
    #main{
      width: 80%;
      height: 550px;
    }
    </style>