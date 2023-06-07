<template>
  <div class="container-fluid">
    <div class="bg-light" style="height: 50px;border-radius:15px 15px 15px 15px;margin-top: 25px" >
      <breadcrumb style="margin-left: 30px;padding-top: 10px" name="用户管理"></breadcrumb>
    </div>
    <div  class="bg-light" style="height: 810px;border-radius:20px 20px 20px 20px;margin-top: 20px">
      <div class="container-fluid">
        <div class="text-start">
          <button type="button" class="btn btn-primary mt-3 me-3"  data-bs-toggle="modal" data-bs-target="#Write-Modal" >创建新用户</button>
        </div>
      </div>
      <div class="container-fluid" style="padding-top: 10px;font-size: 20px">
        <table  class="table table-bordered table-hover" >
          <thead >
          <tr>
            <th>#</th>
            <th class="text-center">用户头像</th>
            <th class="text-center">用户名</th>
            <th class="text-center">权限</th>
            <th class="text-center">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td >{{index+1}}</td>
            <td class="text-center"><img :src="item.photo" alt="mdo" width="46" height="46" class="rounded-circle"></td>
            <td ><input type="text" class="form-control"   v-model="item.username"></td>
            <td ><select class="form-select form-select md-3 col-8" aria-label=".form-select-sm example" v-model="item.power">
              <option value="学生">学生</option>
              <option value="导师">导师</option>
              <option value="管理员">管理员</option>
            </select></td>
            <td class="text-center">
              <router-link :to="'/people/'+item.id" type="button" class="btn btn-outline-primary " >查看ta主页</router-link>
              <button type="button" class="btn btn-outline-success ms-3" @click.prevent="update(item.id,item.username,item.power)">保存修改</button>
              <button type="button" class="btn btn-outline-danger ms-3" @click.prevent="delete_user(item.id)">删除该用户</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="Write-Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-white bg-primary">
            <h1 class="modal-title fs-5" id="exampleModalLabel">创建新用户</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-2">
                <label for="title" class="col-form-label">用户名:</label>
                <input type="text" class="form-control" v-model="username">
              </div>
              <div class="mb-2">
                <label for="title" class="col-form-label">用户密码:</label>
                <input type="password" class="form-control" v-model="password">
                <div class="form-text">默认密码为：123456</div>
              </div>
              <div class="mb-2">
                <label for="title" class="col-form-label">权限:</label>
                <select class="form-select form-select md-3 col-8" aria-label=".form-select-sm example" v-model="power">
                  <option value="学生" selected>学生</option>
                  <option value="导师">导师</option>
                  <option value="管理员">管理员</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <span class="error-message  me-3 fs-5 ">{{error_message }}</span>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="add_user">添加新用户</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import $ from "jquery";
import breadcrumb from "@/components/Breadcrumb";
import {useRouter} from "vue-router";
export default {
  name: "HumanManagerView",
  components:{
    breadcrumb
  },
  setup(){
    let items=ref([]);
    const store =useStore();
    const router=useRouter();
    let username=ref('');
    let password=ref('123456');
    let power=ref('学生');
    let error_message=ref('')
    const fresh_list=()=>{
      if(store.state.user.power!="管理员"){
          alert("无权限");
          router.push({name:"404"});
      }
      $.ajax({
        url:"http://127.0.0.1:3000/user/getlist/",
        headers:{
          Authorization: "Bearer " + store.state.user.token,
        },
        type:"get",
        success(resp){
          items.value=resp;
        }
      })
    };
    fresh_list();
    const update=(_id,_username,_power)=>{
      $.ajax({
        url:"http://127.0.0.1:3000/admin/update/user/",
        type:"post",
        data:{
          id:_id,
          username:_username,
          power:_power
        },
        headers:{
          Authorization: "Bearer " + store.state.user.token,
        }
        ,
        success(resp){
          if(resp.error_message==="success"){
            alert("修改成功")
            fresh_list();
          }else{
           alert("无权限");
          }
        },
      })
    }
    const delete_user=(_id)=>{
      $.ajax({
        url:"http://127.0.0.1:3000/admin/delete/user/",
        type:"post",
        data:{
          user_id:_id,
        },
        headers:{
          Authorization: "Bearer " + store.state.user.token,
        }
        ,
        success(resp){
          if(resp.error_message==="success"){
            alert("删除成功")
            fresh_list();
          }else{
            alert("无权限");
          }
        },
      })
    }
    const add_user=()=>{

      $.ajax({
        url:"http://127.0.0.1:3000/user/account/register/",
        type:"post",
        data:{
          username:username.value,
          password:password.value,
          confirmedPassword:password.value,
          power:power.value
        },
        success(resp){
          if(resp.error_message==="success"){
            alert("添加成功")
            fresh_list();
          }else{
            error_message.value=resp.error_message;
          }
        },
      })
    }
    return {
        items,store,username,password,power,error_message,add_user,update,delete_user
    }
  }
}
</script>

<style scoped>

</style>