<template>
  <div class="container-fluid">
    <div class="bg-light" style="height: 50px;border-radius:15px 15px 15px 15px;margin-top: 25px" >
      <breadcrumb style="margin-left: 30px;padding-top: 10px" name="文章管理"></breadcrumb>
    </div>
    <div  class="bg-light" style="height: 810px;border-radius:20px 20px 20px 20px;margin-top: 20px">
      <div class="container-fluid p-2  "  style="font-size: 20px">
        <div class="scollbar" style="overflow-x: auto; overflow-y: auto; height: 780px; width:100%;margin-right: 30px;">
          <table  class="table table-bordered table-hover" >
            <thead >
            <tr>
              <th>#</th>
              <th >文章标题</th>
              <th>文章分区</th>
              <th>文章状态</th>
              <th>创建时间</th>
              <th class="text-center">操作</th>
            </tr>
            </thead>
            <tbody  >
            <tr  v-for="(item, index) in items" :key="item.id">
              <td style="" >{{index+1}}</td>
              <td >{{item.title.length<10?item.title:item.title.slice(0,10)+'...'}}</td>
              <td >{{list[item.zoneId]}}</td>
              <td >{{item.state==true?"公开":"私有"}}</td>
              <td >{{item.createtime}}</td>
              <td class="text-center">
                <router-link :to="'/art/'+item.id" type="button" class="btn btn-outline-primary " >查看</router-link>
                <router-link :to="{name:'modify',params:{id:item.id}}" type="button" class="btn btn-outline-success ms-3">修改</router-link>
                <button type="button" class="btn btn-outline-danger ms-3" @click.prevent="del(item.id)">删除</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import  {ref} from 'vue';
import  $ from 'jquery';
import {useStore} from "vuex";

export default {
  name: "ArticleManager",
  components: {Breadcrumb},
  setup(){
    let list=ref(['分享','虚拟现实','游戏','图形学','影视','3D建模']);
    const store = useStore();
    let items=ref([]);
    const fresh_list=()=>{
        $.ajax({
          url:"http://127.0.0.1:3000/user/art/getlist/",
          headers:{
            Authorization: "Bearer " + store.state.user.token,
          },
          type:"get",
          success(resp){
            items.value=resp;//获取值需要value
          }
        })
    };
    fresh_list();
    const del=(id)=>{
      console.log(id);
      $.ajax({
          url: "http://127.0.0.1:3000/user/art/remove/",
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
      items,del,fresh_list,list
    }
  }
}
</script>
<style scoped>

.scollbar::-webkit-scrollbar{

  /*width: 2px;*/
}
/*table,tbody {*/
/*  display: block;*/
/*  height: 750px;*/
/*  !*border: 0;*!*/
/*  !*border-spacing: 0;*!*/
/*  !*border-collapse: collapse;*!*/
/*  cursor: default;*/
/*}*/

/*tbody {*/
/*  overflow-y: scroll;*/
/*}*/

/*table thead,*/
/*tbody tr {*/
/*  display: table;*/
/*  width: 100%;*/
/*  table-layout: fixed;*/
/*}*/

/*table thead {*/
/*  width: calc(100% - 1em)*/
/*}*/

/*table thead th {*/
/*  !*background: #84acde;*!*/
/*  width: 20%;*/
/*}*/

/*table tbody td {*/
/*  width: 20%;*/
/*  text-align: center;*/
/*}*/
</style>
