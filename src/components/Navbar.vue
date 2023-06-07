<template>
  <div>
  <div class="modal fade" id="Search-Modal" tabindex="-1" aria-labelledby="Search-Modal" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header " style="background-color: rgba(205,205,205,0.5)">
          <h1 class="modal-title fs-4" id="exampleModalLabel">搜寻结果</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-1 fs-5">
          <div class="list-group ">
            <dic v-if="search_result.length==0" class="text-center m-5 ">
              没有搜到合适的结果😬
            </dic>
            <div class="card mb-3 " v-for="item in search_result" :key="item.id" >
              <div class="card-body">
                <div class="card-title row p-0 mb-0 mt-0">
                  <strong class="card-title fs-5 d-inline-block mb-2 col-md-10">{{item.title}}</strong>
                  <strong class="d-inline-block mb-2 text-success col-md-2 pe-3  text-end ">    <router-link :to="'/art/'+item.id" class="col-5 fs-6  text-end " >阅读&raquo;</router-link></strong>
                </div>
                <p class="card-text mt-0"><span class="text-secondary">简介：</span>{{item.description}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >关闭</button>
        </div>
      </div>
    </div>
  </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
<!--      <div class="container">-->
      <div class="container-fluid">
        <router-link class="navbar-brand me-5" :to="{name:'home'}" id="HomeTitle">数媒&Blog</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-1" id="pagetitle">
            <li class="nav-item">
              <router-link to="/home" class="nav-link" :id="route_name=='home'?'yes':'no'">首页</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/share" class="nav-link" :id="route_name=='share'?'yes':'no'">分享</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                分区
              </a>
              <ul class="dropdown-menu bg-dark  ">
                <li><a class="dropdown-item  text-primary" href="#">游戏开发</a></li>
                <li><a class="dropdown-item text-primary" href="#">网站建设</a></li>
                <li><a class="dropdown-item text-primary" href="#">影视后期</a></li>
                <li><a class="dropdown-item text-primary" href="#">三维建模</a></li>

              </ul>
            </li>
            <li class="nav-item">
            <router-link to="/help" class="nav-link" :id="route.path=='/art/10'?'yes':'no'">帮助</router-link>
            </li>
          </ul>
          <form class="d-flex w-40" role="search">
            <input class="form-control me-2" type="search" placeholder="搜索你喜欢的内容" aria-label="Search" v-model="search_text">
            <button class="btn btn-outline-success me-4 ps-2 pe-2 pt-1 pb-1" type="button"  data-bs-toggle="modal" data-bs-target="#Search-Modal" @click="on_search()"><i class="fa fa-search fs-3"></i></button>

          </form>
          <ul class="navbar-nav" v-if="$store.state.user.is_login" style="margin-right: 5%">
            <li class="nav-item dropdown" >
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                <img :src="$store.state.user.photo" alt="mdo" width="40" height="40" class="rounded-circle me-2">
                  {{$store.state.user.username}}
              </a>
              <ul class="dropdown-menu text-small bg-dark" style="">
                <li><router-link :to="'/people/'+store.state.user.id" class="dropdown-item text-primary" :id="route_name=='dashboard'?'selected':'no'">个人主页</router-link></li>
                <li><router-link to="/dashboard" class="dropdown-item text-primary" :id="route_name=='dashboard'?'selected':'no'">我的后台</router-link></li>

                <li><hr class="dropdown-divider bg-white"></li>
                <li><a class="dropdown-item text-primary" href="#" @click="logout">退出登录</a></li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav" v-else-if="true" style="font-size:large;margin-right: 5%">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'login'}" role="button">
                登录
              </router-link>
            </li>
            <li class="nav-item text-secondary mt-2 me-0 ms-0 p-0">
              /
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name:'register'}" role="button">
                注册
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- Modal -->

    </nav>
  </div>
</template>
    
    <script>
    import { useRoute } from 'vue-router'
    import {computed, ref} from 'vue'
    import { useStore } from 'vuex';
    import $ from 'jquery'
    export default {
        setup() {
            const route = useRoute();
            const store =useStore();
            let route_name = computed(() => route.name)
            let search_text=ref("");
            let search_result=ref([]);
            const logout=()=>{
              store.dispatch("logout");
            }
            const on_search=()=>{
              if(search_text.value==""){
                return ;
              }
              $.ajax({
                url: "http://127.0.0.1:3000/pub/search/",
                type: "post",
                headers: {
                  Authorization: "Bearer " + store.state.user.token,
                },
                data:{
                  search:search_text.value
                },
                success(resp) {
                  search_result.value=resp;
                  console.log(search_result);
                },
              })
            }
            return {
                route_name,
                logout,route,store,on_search,search_text,search_result
            }
        }
    }
    </script>
    
    <style scoped>
#yes{
color:floralwhite;
}
#no{
  color:darkgrey;
}
#HomeTitle{
  font:caption;
  color: beige;
  font-size: xx-large;
  margin-left: 5%;
}
#pagetitle{
  font-size: x-large;
}


    </style>
    