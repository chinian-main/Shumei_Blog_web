<template>
    <main class="container"  >
      <div class="p-4 p-md-5 mb-4 rounded "  id="card" >
            <div class="col-md-8 px-0 ">
            <h3 class="display-4 fst-italic text-white">{{ art.title }}</h3>
            <p class="lead my-3 text-white">{{art.description}}</p>
            </div>
      </div>

      <div class="container-fluid row" style="width: 100%; margin:0;padding:0">
        <div class="col-md-8 " style="padding-left: -10%">
          <ContentShow :content="art.content">
          </ContentShow>

        </div>

        <div class="col-md-4">
          <div class="position-sticky" style="top: 2rem;">
          <div class="card text-center ">
            <div class="card-header">
                              <div class="d-flex flex-row-reverse " >
                                  <div class="p-md-2 me-5 mt-2">
                                      <button :disabled="followed" type="button" :class="followed?'btn btn-primary':'btn btn-outline-primary'" @click="follow_user()" >{{followed?'已':''}}关注</button>
                                  </div>
                                  <div class="p-md-3 fs-4 ">
                                      作者：
                                      {{ author.username }}
                                  </div>
                                  <div class="p-md-2 ">
                                      <router-link class="head-img" :to="'/people/'+author.id">
                                          <img :src="author.photo" alt="mdo" width="40" height="40" class="rounded-circle me-2 ">
                                      </router-link>

                                  </div>

                              </div>
            </div>
            <div class="card-body">

              <a href="#" @click="comment_list()" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">查看评论></a>

            </div>
            <div class="card-footer text-muted ">
              <span class="me-5">文章浏览量：{{art.views}}</span>
              <span class="">
                <button  type="button" class="btn btn-outline-primary" @click="collect_art()" >收藏数：{{art.collections}}</button>
              </span>
            </div>
          </div>
            <div class="p-4 mb-3 bg-light rounded mt-3">
              <h4 class="fst-italic">关于</h4>
              <p class="mb-0">版权归文章编辑者所有</p>
              <p class="mb-0">
                非原创文章归原创作者所有</p>
            </div>

            <div class="p-4">
              <h4 class="fst-italic">作者精选推荐</h4>
              <ol class="list-unstyled mb-0">
                <li v-for="item in ranklist" :key="item.id"
                ><router-link :to="'/art/'+item.id">{{item.title}}（{{item.views}}）</router-link></li>

              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">评论区（{{comments.length}}）</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div v-if="comments.length==0||comments==null" class="text-secondary text-center mt-5">
                  <h4>暂时还没有人留下评论</h4>
                  <h4>快留下你的评论吧🤞</h4>
                </div>

                <div class="card mb-3" v-for="comment in comments" :key="comment.id">
                <div class="row g-0">
                    <div class="col-md-3 ps-2 mt-3">
                      <router-link  :to="'/people/'+comment.userid">
                      <img :src="comment.photo" alt="mdo" width="40" height="40" class="rounded-circle  ">
                      </router-link>
                      <span class="card-text ms-2">{{comment.username}}</span>
                    </div>
                    <div class="col-md-9">
                    <div class="card-body">
                        <p class="card-text ">{{comment.content}}</p>
                        <p class="card-text text-end"><small class="text-muted">{{comment.createtime}}</small></p>
                    </div>
                    </div>
                </div>
                </div>

              </div>
              <div class="offcanvas-foot">
                <div class="input-group p-2">
                 <span class="input-group-text ">评论：</span> 
                  <textarea class="form-control btn-outline-primary" aria-label="With textarea" rows="6" v-model="content"></textarea>
                  <button  class="btn btn-outline-success" type="button" id="button-addon2"  @click="add_commet(route.params.id,content)">发表</button>

                </div>
              </div>
            </div>
    </main>
</template>

<script>
import { ref} from 'vue';
import { useStore } from 'vuex';
import  {useRouter,useRoute} from "vue-router";
import ContentShow from '@/components/ContentShow.vue'
import $ from 'jquery'
export default {
    components:{ContentShow},
    setup(){
        let content=ref(' ');
        const store=useStore();
        let author=ref({});
        let art=ref({});
        let comments=ref([]);
        const route=useRoute();
        const router=useRouter();
        let collected=ref(false);
        let followed=ref(false);
      let ranklist=ref([]);
        const fresh_art=()=>{
          $.ajax({
            url: "http://127.0.0.1:3000/pub/art/"+route.params.id+"/",
            type: "get",
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            success(resp) {
              art.value=resp.art;
              author.value=resp.author;
              collected.value=resp.collected;
              followed.value=resp.followed;
              $.ajax({
                url:"http://127.0.0.1:3000/pub/rank/"+resp.author.id+"/",
                type:"get",
                success(resp){
                  ranklist.value=resp;
                  console.log(ranklist);
                }
              })
            },
            error(){
              router.push({name:'404'});
            }
          })

        }
        fresh_art();


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
              followed_userId:author.value.id,
            },
            success(resp) {
              if(resp.error_message=="success")fresh_art();
              if (resp.error_message=='followed'){
                followed.value=true;
              }
              else {
                alert(resp.error_message);
              }
            },
            error(){
              router.push({name:'404'});
            }

          })
        }
        const collect_art=()=>{
          if(store.state.user.is_login==false) {
            router.push({name: 'login'});
            return ;
          }
          $.ajax({
            url: "http://127.0.0.1:3000/art/collect/",
            type: "post",
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            data:{
              userId:store.state.user.id,
              artId:art.value.id,
            },
            success(resp) {
              if(resp.error_message=="success")fresh_art();
              if (resp.error_message=='collected'){
                      collected.value=true;
              }
              else {
                 alert(resp.error_message);
              }
            },
            error(){
              router.push({name:'404'});
            }
          })
        }

        const comment_list=()=>{
          $.ajax({
            url: "http://127.0.0.1:3000/pub/comment/"+route.params.id+"/",
            type: "get",
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            success(resp) {
              comments.value=resp;
            },
          })
        }

        const add_commet=(art_id,content)=>{
          if(store.state.user.is_login==false) {
            router.push({name: 'login'});
            return ;
          }
          $.ajax({
            url: "http://127.0.0.1:3000/user/comment/add/",
            type: "post",
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            data:{
              art_id:art_id,
              content:content
            },
            success(resp) {
                if(resp.error_message == 'success'){
                    comment_list();
                }

            },
          })
        }


        return {
            store,author,art,fresh_art,follow_user,collect_art,comment_list,comments,add_commet,route,content,
          collected,followed,ranklist
        }
             
    }

}
</script>

<style scoped>
    .author{
        border: 3px solid rgba(12, 133, 255, 0.505);
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
    }
    .head-img{
        position: relative;
        padding-left: 8px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: rgb(0, 140, 255);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    main{
        width: 90%;
        background-color:#FFFFFF;
        padding-top: 20px;
    }
    #card{
        background-image:url("https://www.w3school.com.cn/i/photo/beijing.jpg") ;
        /*opacity: 100%;*/
        /*background-color: #212529;*/
        background-position:center;
        margin:0 auto;
    }
    .offcanvas-body::-webkit-scrollbar {
      width: 6px;
      /*height: 4px;*/
    }
    .offcanvas-body::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: rgba(0,0,0,0.2);
    }
    .offcanvas-body::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 0;
      background: rgba(0,0,0,0.1);

    }

</style>