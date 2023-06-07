<template>
  <main class="container" style="width: 90%;padding-top: 20px;background-color: #F1F1F1">
    <div class="p-4 ms-1 me-1 mb-3 rounded text-bg-secondary row " >
      <div class="col-md-3 ms-0 ps-0">
        <img :src="peopleInfo.photo" class="rounded-5 w-100 h-100">
      </div>
      <div class="col-md-9" style="position: relative;">
        <h1 class="display-4 fst-italic mt-4 mb-4">{{peopleInfo.username}}</h1>
        <p class="fs-5 mt-2"  style="color: #d9d9d9">联系方式：{{peopleInfo.email!=null?peopleInfo.email:"该用户没有留下联系方式"}}</p>
        <p class="fs-5" style="color: #d9d9d9"><span class="me-4">关注数：{{follow_Number}}</span><span class="me-4"> 粉丝数：{{fans_Number}}</span><span class="me-4"> 文章数：{{items.length}}</span><span class="me-4">总浏览量：{{sumViews}}</span></p>
        <p class="lead my-3"></p>
         <button  class="btn btn-primary fw-bold align-text-bottom me-4"  style=" position:absolute; bottom:0px;right:0px;" @click="follow_user()">关注一下</button>
      </div>
    </div>
    <div class="row g-5">
      <div class="col-md-8">

          <div class="card text-center pb-3 mb-3">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <router-link to="/123123"  class="nav-link active" aria-current="true" >动态</router-link>
                </li>
                <li class="nav-item dropdown ">
                  <router-link to="/123123" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">分区</router-link>
                  <ul class="dropdown-menu">
                    <li><router-link to="/123123"  class="dropdown-item" >计算机图形学</router-link></li>
                    <li><router-link to="/123123"  class="dropdown-item" >影视后期</router-link></li>
                    <li><router-link to="/123123"  class="dropdown-item" >游戏开发</router-link></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><router-link to="/123123"  class="dropdown-item">分享</router-link></li>
                  </ul>
                </li>
                <li class="nav-item ">
                  <router-link to="/123123"  class="nav-link  disabled">关注</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/123123"  class="nav-link disabled">收藏</router-link>
                </li>
              </ul>
            </div>
            <div class="card-body"    id="content"  tabindex="0">

              <div class="card mb-3" v-for="item in items" :key="item.id">
                  <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <p class="card-text">{{item.description}}</p>
                    <div class="card-text"><small class="text-muted">{{item.modifytime}}</small>
                      <router-link :to="'/art/'+item.id" style="margin-left: 500px">阅读></router-link>
                    </div>
                  </div>
                </div>
            </div>
<!--            <div class="card-footer">-->
<!--              <nav aria-label="Page navigation example "  >-->
<!--                <ul class="pagination justify-content-center" >-->
<!--                  <li class="page-item">-->
<!--                    <a class="page-link" href="#" aria-label="Previous">-->
<!--                      <span aria-hidden="true">&laquo;</span>-->
<!--                    </a>-->
<!--                  </li>-->
<!--                  <li class="page-item"><a class="page-link" href="#">1</a></li>-->
<!--                  <li class="page-item"><a class="page-link" href="#">2</a></li>-->
<!--                  <li class="page-item"><a class="page-link" href="#">3</a></li>-->
<!--                  <li class="page-item">-->
<!--                    <a class="page-link" href="#" aria-label="Next">-->
<!--                      <span aria-hidden="true">&raquo;</span>-->
<!--                    </a>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </nav>-->
<!--            </div>-->
      </div>
      </div>



      <div class="col-md-4">
        <div class="position-sticky" style="top: 2rem;">
          <div class="p-4 mb-3 bg-white rounded">
            <h4 class="fst-italic">个性标签</h4>
            <p class="mb-0">{{peopleInfo.tag}}</p>
          </div>

          <div class="p-4">
            <h4 class="fst-italic">作者精选作品</h4>
            <ol class="list-unstyled mb-0">

              <li v-for="(item) in ranklist" :key="item.id" class="row  mb-1 ">
                <router-link :to="{path:'/art/'+item.id}" class="col-md-12 " >{{item.title}}({{item.views}})</router-link>
<!--                <span class="text-end col-md-2 " ></span>-->
              </li>

            </ol>
          </div>

          <div class="p-4">
            <h4 class="fst-italic">其他链接</h4>
            <ol class="list-unstyled">
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import {computed, ref} from 'vue'
import  $ from  'jquery';
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import router from "@/router";


export default {
  name: "PeopleView",
  computed:{
    sumViews(){
      let sum =0;
      // eslint-disable-next-line no-undef
      for(let i =0;i<this.items.length;i++){
        // eslint-disable-next-line no-undef
        sum+=this.items[i].views;
      }
      return sum;
    }
  },
  setup(){
    const store=useStore();
    let items=ref([]);
    const route=useRoute();
    let peopleInfo=ref({});
    let ranklist=ref([]);
    const get_info=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/people/"+route.params.id+"/",
        type:"get",
        success(resp){
          peopleInfo.value=resp;//获取值需要value
          if(peopleInfo.value==null)     router.push({name:"404"});
        }
      })
    }
    let sum =ref(0);

    const follow_user=()=>{
      if(store.state.user.is_login==false) {
        router.push({name: 'login'});
        return ;
      }
      $.ajax({
        url: "http://127.0.0.1:3000/user/follow/",
        type: "post",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        data:{
          userId:store.state.user.id,
          followed_userId:route.params.id,
        },
        success(resp) {
          if(resp.error_message=="success"){
            alert("关注成功");
          }
          if (resp.error_message=='followed'){
              alert("已关注");
          }

        },
        error(){
          router.push({name:'404'});
        }

      })
    }
    const get_RankList=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/rank/"+route.params.id+"/",
        type:"get",
        success(resp){
            ranklist.value=resp;
        }
      })
    }
    get_RankList();
    const fresh_list=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/list/"+route.params.id+"/",
        type:"get",
        success(resp){
          items.value=resp;//获取值需要value
        }
      })
    };
    let fans_Number=ref(0);
    let follow_Number=ref(0);
    const get_fans_Number=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/"+route.params.id+"/fans/",
        type:"get",
        success(resp){
          fans_Number.value=resp;
        }
      })
    }
    const get_follow_Number=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/"+route.params.id+"/followed/",
        type:"get",
        success(resp){
          follow_Number.value=resp;
        }
      })
    }

    get_follow_Number(),get_fans_Number();
    fresh_list();
    get_info();


    return {
      store,fresh_list,items,get_info,peopleInfo,ranklist,follow_user,fans_Number,follow_Number
    }
  },

}
</script>

<style scoped>
#content{
  max-height: 1500px;
  overflow-y: auto;

}
</style>