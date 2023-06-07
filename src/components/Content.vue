<template>
<div class="container-fluid">
  <div class="bg-light" style="height: 50px;border-radius:20px 20px 20px 20px;margin-top: 20px" >
      <breadcrumb style="margin-left: 30px;padding-top: 10px"></breadcrumb>
  </div>
  <div  class="bg-light" style="height: 810px;border-radius:20px 20px 20px 20px;margin-top: 20px">
        <div class="container-fluid" style="padding-top: 10px;font-size: 20px">
          <div class="panel-body form-inline align-items-end" style="padding-bottom: 40px">
            <label >编号:<input type="text" class="form-control"  v-model="id" ></label>
            <label >页面名称:<input type="text" class="form-control" v-model="name" ></label>
            <input type="button" value="添加" class="btn btn-primary" @click="add">
          </div>
          <table  class="table table-bordered table-hover" >
            <thead>
            <tr>
              <th>页面编号</th>
              <th>页面名称</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in arr" :key="item.id">
              <td v-text="item.id"></td>
              <td v-text="item.name"></td>
              <td><a href="" @click.prevent="del(item.id)">删除</a></td>
            </tr>
            </tbody>
          </table>
        </div>
  </div>
</div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "Content",
  components: {Breadcrumb},
  data:function (){
    return {
      arr:[
        {id:1,name:'首页'},
        {id:2,name:'论坛'},
        {id:3,name:'提问'},
        {id:4,name:'分享'},
        {id:5,name:'帮助'},
      ],
      id:'',
      name:''
    }

  },
  methods:{
    add(){
      this.arr.push({
        id:this.id,
        name:this.name,
      })
      this.id=this.name=this.price='';
    },
    del(id){
      var index=this.arr.findIndex(item=>{
        if(item.id==id)return true;
      })
      this.arr.splice(index,1);
    },
  }
}
</script>

<style scoped>

</style>