<template>
  <div class="container-fluid">
    <div class="bg-light" style="height: 50px;border-radius:15px 15px 15px 15px;margin-top: 25px" >
      <breadcrumb style="margin-left: 30px;padding-top: 10px" name="关注管理"></breadcrumb>
    </div>
    <div  class="bg-light" style="height: 810px;border-radius:20px 20px 20px 20px;margin-top: 20px">
      <div class="container-fluid" style="padding-top: 10px;font-size: 20px">
        <table  class="table table-bordered table-hover" >
          <thead >
          <tr>
            <th>#</th>
            <th>关注者</th>
            <th>关注时间</th>
            <th class="text-center">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td >{{index+1}}</td>
            <td >{{item.username}}</td>
            <td >{{item.modifytime}}</td>
            <td class="text-center">
              <router-link :to="'/people/'+item.followed_id" type="button" class="btn btn-outline-primary " >查看ta主页</router-link>
              <button type="button" class="btn btn-outline-danger ms-3" @click.prevent="cancel(item.id)">取消关注</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/Breadcrumb";
import { ref} from "vue";
import  $ from 'jquery';
import {useStore} from "vuex";
export default {
  name: "FollowManageView",
  components:{breadcrumb},
  setup(){
    let items=ref([]);
    const store =useStore();
    const fresh_list=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/user/follow/getlist/",
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
    console.log(items);
    const cancel=(id)=>{
      $.ajax({
        url: "http://127.0.0.1:3000/user/follow/cancel/",
        type: "post",
        data: {
          art_id: id
        },
        headers:{
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp){
          if(resp.error_message=="success"){
            fresh_list();
          }else {
            alert("删除失败");
          }
        }
      })
    };
    return {
      items,fresh_list,cancel
    }
  }

}
</script>

<style scoped>

</style>