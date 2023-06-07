<template>
<main class="container " id="main" >
  <div class="col-sm-6 col-lg-4 mb-4 mt-5" style="position: relative; left: 33.3333%; margin:40px">
    <div class="card p-3">
    <form @submit.prevent="login">
      <h3 >登录</h3>
          <div class="form-group mt-3">
            <label for="name">用户名</label>
            <input type="username" class="form-control" v-model="username"  required="required">
          </div>
          <div class="form-group mt-3">
            <label for="pwd">密码</label>
            <input type="password" class="form-control" v-model="password">
          </div>
          <div class="form-group form-check mt-3">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">记住我</label>
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
  const jwt_token=localStorage.getItem("jwt_token");
  if(jwt_token){
    store.commit("updateToken",jwt_token);
    store.dispatch("getinfo",{
      success(){
        router.push({name:"home"});
        store.commit("updatePullingInfo",false);
      },
      error(){
        store.commit("updatePullingInfo",false);
      }
    })
  }else{
    store.commit("updatePullingInfo",false);
  }
  const login=()=>{
    error_message.value="",
    store.dispatch("login",{
      username:username.value,
      password:password.value,
      success(){
        store.dispatch("getinfo",{
          success(){
            store.dispatch("getinfo",{
              success(){
                router.push({name:'home'});
              }
            })
          }
        })
      },
      error(){
        error_message.value="用户名或密码错误";
        alert(error_message.value);
      }
    })
  }
  return{
    username,
    password,
    error_message,
    login
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