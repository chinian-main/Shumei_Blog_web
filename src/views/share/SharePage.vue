<template>
  <main class="container" style="width: 90%;padding-top: 20px;background-color: #F1F1F1">
      <div class="p-4 p-md-5 mb-4 rounded text-bg-dark" >
        <div class="col-md-6 px-0 ">
          <h1 class="display-4 fst-italic">分享你的所见所得</h1>
          <p class="lead my-3">生活中的许多快乐，都是互相分享得来的。比如说，我们这些住校生，每天除了上课、听课、下课外还有什么事可做呢？我们会在宿舍围坐在一起，分享快乐。我们会谈一下今天发生的趣事，又或是说说谁的悄悄话，等等。</p>
          <p class="lead mb-0">    <button onclick="window.scrollTo(0, 450)" class="bg-dark text-white fw-bold">前往阅读...</button></p>
        </div>
      </div>
      <div>
        <h3>精选推荐</h3>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-primary">旅游</strong>
              <h3 class="mb-0">江西美好风情</h3>
              <div class="mb-1 text-muted">Nov 12</div>
              <p class="card-text mb-auto">江西是一个有着悠久历史和文化积淀的省份，旅游资源十分丰富，旅游景点众多，如南昌、九江、宜春、抚州等地都是非常适合旅游的城市。</p>
              <router-link to="/art/33" class="stretched-link">继续阅读...</router-link>
            </div>
            <div class="col-auto d-none d-lg-block">
              <img class="bd-placeholder-img" width="200" height="250" src="https://s1.ax1x.com/2023/05/30/p9j5yRK.png" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-success">科技</strong>
              <h3 class="mb-0">游戏开发沙龙</h3>
              <div class="mb-1 text-muted">Nov 11</div>
              <p class="mb-auto">一款简单的小游戏，变身成为小鸟躲避墙壁。</p>
              <router-link to="/unity" class="stretched-link">体验一下...</router-link>
            </div>
            <div class="col-auto d-none d-lg-block">
              <img class="bd-placeholder-img" width="200" height="250" src="https://img.zcool.cn/community/016652575d0d730000012e7e05f6e3.png@1280w_1l_2o_100sh.png" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-5">
        <div class="col-md-8">
          <div class="row">
            <h3 class="col-3">文章列表</h3>
            <nav aria-label="Page navigation example" class="col-9 " >
              <ul class=" pagination justify-content-end">
                <li class="page-item"><a class="page-link" @click="toPage(1,false)"> &laquo; </a></li>
                <li class="page-item" v-for="id of parseInt( pagesize)" :key="id" >
                  <a :class="id==current?'page-link active':'page-link '" @click="toPage(id,false)" >{{id}}</a>
                </li>
                <li class="page-item"><a class="page-link" @click="toPage(parseInt(pagesize),false)">&raquo;</a></li>
              </ul>
            </nav>
          </div>

          <div class="card mb-3 " v-for="item in items" :key="item.id">
            <div class="card-body">
                <div class="card-title row p-0 mb-0 mt-0">
                  <strong class="card-title fs-5 d-inline-block mb-2 col-md-10">{{item.title}}</strong>

                 <strong class="d-inline-block mb-2 text-success col-md-2 pe-3  text-end ">{{ list[item.zoneId] }}</strong>
                </div>
              <p class="card-text mt-0"><span class="text-secondary">简介：</span>{{item.description}}</p>
              <div class="card-text row">
                <small class="col-md-2 text-muted">收藏数：{{item.collections}}</small>
                <small class="col-md-2 text-muted">浏览量：{{item.views}}</small>
                <small class="col-md-3 text-muted">{{item.createtime}}</small>
                <router-link :to="'/art/'+item.id" class="col-5  text-end ">阅读&raquo;</router-link>
              </div>
            </div>
          </div>
          <nav aria-label="Page navigation example " >
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" @click="toPage(1,true)"> &laquo; </a></li>

              <li class="page-item" v-for="id of parseInt( pagesize)" :key="id" >
                <a :class="id==current?'page-link active':'page-link '" @click="toPage(id,true)" >{{id}}</a>
              </li>
              <li class="page-item"><a class="page-link" @click="toPage(parseInt(pagesize),true)">&raquo;</a></li>
            </ul>
          </nav>
        </div>

        <div class="col-md-4">
          <div class="position-sticky" style="top: 1rem;">
            <div class="p-4 mb-3 bg-light rounded">
              <h4 class="fst-italic">关于</h4>
              <p class="mb-0">版权归文章编辑者所有</p>
              <p class="mb-0">
                非原创文章归原创作者所有</p>
            </div>

            <div class="p-4">
              <h4 class="fst-italic d-flex justify-content-end"><span class="me-lg-auto">人气排行榜</span><span class="me-lg-0 text-secondary fs-6 mt-3">views</span></h4>
              <ol class="list-unstyled mb-0">

                <li v-for="(item,index) in ranklist" :key="item.id" class="row ">
                  <span class="col-md-1 fst-italic">{{index+1}}.</span>
                  <router-link :to="{path:'/art/'+item.id}" class="col-md-9 " >{{item.title}}</router-link>
                  <span class="text-end col-md-2 " >{{item.views}}</span>
                </li>

              </ol>
            </div>

            <div class="p-4">
              <h4 class="fst-italic">外部链接</h4>
              <ol class="list-unstyled">
                <li><a href="https://github.com">GitHub</a></li>
                <li><a href="http://bilibili.com">Bilibili</a></li>
                <li><a href="https://youtube.com">Youtube</a></li>
                <li><a href="https://zhihu.com">Zhihu</a></li>
                <li><a href="https://blog.csdn.net">CSDN</a></li>
              </ol>
            </div>
          </div>
        </div>
      </div>



  </main>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ref} from "vue";
import $ from "jquery";

export default {
  name: "SharePage",
  setup(){
    let list=ref(['分享','虚拟现实','游戏','图形学','影视','3D建模']);
      const store=useStore();
      const router=useRouter();
      const items=ref([]);
      const current=ref(1);
       const pagesize=ref(0);
       let ranklist=ref([]);

     const toPage=(id,flag)=>{
       current.value=id;
          $.ajax({
            url:"http://127.0.0.1:3000/pub/getPage/"+id+'/',
            type:"get",
            success(resp){
              items.value=resp;
              for(let i=0;i<items.value.length;i++){
                for(let j=0;j<items.value.length-i-1;j++){
                  if(flag===false){
                    if((items.value[j].collections<items.value[j+1].collections)||(items.value[j].collections===items.value[j+1].collections&&items.value[j].views<items.value[j+1].views)) {
                      var temp = items.value[j];
                      items.value[j]=items.value[j+1];
                      items.value[j+1]=temp;
                    }
                  }
                  else {
                    if((items.value[j].collections>items.value[j+1].collections)||(items.value[j].collections===items.value[j+1].collections&&items.value[j].views>items.value[j+1].views)) {
                      var temp = items.value[j];
                      items.value[j]=items.value[j+1];
                      items.value[j+1]=temp;
                    }
                  }

                }
              }
            }
          })
        };
      const get_ZoneSize=()=>{
      $.ajax({
        url:"http://127.0.0.1:3000/pub/zone/"+0+'/',
        type:"get",
        success(resp){
          pagesize.value=parseInt(resp)/10+(parseInt(resp)%10==0?0:1);
        }
      })
      }
      const get_ranklist=()=>{
        $.ajax({
          url:"http://127.0.0.1:3000/pub/rank/list/",
          type:"get",
          success(resp){
            ranklist.value=resp;
          }
        })
      }
      get_ranklist();
      get_ZoneSize();
      toPage(1,false);
      return {
        store,
        router,
        items,current,pagesize,
        toPage,ranklist,list
      }
  }
}
</script>

<style scoped>
.bg-img{
  background-image: image("https://www.w3school.com.cn/i/photo/wuhan.jpg");
}
</style>