<template>
  <div class="container-fluid">
    <div class="bg-light" style="height: 50px;border-radius:15px 15px 15px 15px;margin-top: 25px" >
      <breadcrumb style="margin-left: 30px;padding-top: 10px" name="个人信息"></breadcrumb>
    </div>
    <div  class="bg-light" style="height: 810px;border-radius:20px 20px 20px 20px;margin-top: 20px">
      <div class="container-fluid row" style="padding-top: 10px;font-size: 20px">
    <div class="col-5" style="margin-left: 15px;padding-top: 30px">
        <div class="card" style="width:300px;">
          
          <div class="card-body">
            <img class="card-img-top mt-2 mb-2" :src="user.photo" alt="Card image">
            <h4 class="card-title text-center">{{ user.username}}</h4>
            <p class="card-text text-center">{{ user.tag}}</p>

            <router-link to="/dashboard/follow" class="btn btn-primary   ms-2 me-5" >粉丝:{{fans_Number}}</router-link>
            <router-link to="/dashboard/follow"   class="btn btn-primary  ms-5   ">关注:{{follow_Number}}</router-link>

          </div>
        </div>
      </div>
    <div class="col-7" style="width: 500px;height: 700px ;margin-top: 30px">
      <div class="input-group mb-4">
        <span class="input-group-text" id="basic-addon1">UID</span>
        <input type="text" class="form-control" placeholder="抱歉无修改权限" aria-label="ID" aria-describedby="basic-addon1" :value="user.id" disabled>
      </div>
      <div class="input-group mb-4">
        <span class="input-group-text" id="basic-addon1">用户名</span>
        <input type="text" class="form-control" placeholder="请输入你需要修改的用户名" aria-label="Username" aria-describedby="basic-addon1" v-model="user.username">
      </div>
      <div class="input-group mb-4">
        <span class="input-group-text" id="basic-addon1">权限</span>
        <input type="text" class="form-control" placeholder="抱歉无修改权限" aria-label="Username" aria-describedby="basic-addon1" :value="user.power" disabled>
      </div>
      <div class="input-group mb-4 ">
        <label class="input-group-text" for="inputGroupSelect01">导师</label>
        <select class="form-select fs-5" id="inputGroupSelect01" v-model="user.teachId">
          <option value="0" selected> &nbsp;&nbsp;无导师</option>
          <option v-for="teach in teachs" :key="teach.id" :value="teach.id">
           &nbsp;&nbsp;{{teach.username}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </option>
        </select>
      </div>
      <div class="mb-3">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">头像url</span>
          <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="user.photo">
        </div>
        <div class="form-text">输入你头像的url地址可修改头像</div>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">邮箱</span>
        <input type="text" class="form-control" placeholder="请输入你需要修改的邮箱" aria-label="email" aria-describedby="basic-addon1" v-model="user.email" >
      </div>

      <div class="input-group">
        <span class="input-group-text">个性标签</span>
        <textarea class="form-control"  v-model="user.tag" ></textarea>
      </div>

      <a href="#" class="btn btn-primary text-end" style="margin: 20px 20px" @click="update_userInfo()">确认修改</a>
    </div>
      </div>
  </div>
  </div>
</template>
<script>
import breadcrumb from "@/components/Breadcrumb";
import { useStore } from "vuex";
import $ from "jquery";
import {reactive, ref} from "vue";
export default {
  components:{breadcrumb},
  setup() {
    const store=useStore();
    const user = reactive({//响应式对象才能进行绑定
      tag: store.state.user.tag,
      username:store.state.user.username,
      power:store.state.user.power,
      email:store.state.user.email,
      photo:store.state.user.photo,
      id:store.state.user.id,
      teachId:store.state.user.teachId,
    });
    // eslint-disable-next-line no-unused-vars
    let teachs=ref([]);
    let fans_Number=ref(0);
    let follow_Number=ref(0);
    const get_fans_Number=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/"+store.state.user.id+"/fans/",
        type:"get",
        success(resp){
          fans_Number.value=resp;
        }
      })
    }
    const get_follow_Number=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/"+store.state.user.id+"/followed/",
        type:"get",
        success(resp){
          follow_Number.value=resp;
        }
      })
    }
    get_fans_Number(),get_follow_Number();
    const get_teachs=()=>{

      $.ajax({
        url:"http://127.0.0.1:3000/user/teachs/",
        type:"get",
        headers:{
        Authorization: "Bearer " + store.state.user.token },
          success(resp){
            teachs.value=resp;
          }

      })
    }
    get_teachs();
    const update_userInfo=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/user/account/update/",
        type:"post",
        data:{
          tag:user.tag,
          username:user.username,
          email:user.email,
          photo:user.photo,
          teachId:user.teachId,
        },
        headers:{
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp){
          if(resp.error_message==="success") {
              store.dispatch("getinfo",{
                success(){
                  alert("修改成功");
                }
              })
          }
        }
      })
    }

    return {
        update_userInfo,user,teachs,fans_Number,follow_Number
    }
  }
}
</script>

<style scoped>
input{
  font-size: large;
  
}
</style>