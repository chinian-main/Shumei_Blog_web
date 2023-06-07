<template>
  <div class="container-fluid">
    <div class="bg-light" style="height: 50px;border-radius:15px 15px 15px 15px;margin-top: 25px" >
      <Breadcrumb style="margin-left: 30px;padding-top: 10px" name="编辑文章"></Breadcrumb>
    </div>


    <div class="" style="border: 1px  #ccc;border-radius:20px 20px 20px 20px;margin-top: 20px">
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 670px; overflow-y: hidden;"
          v-model="artInfo.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
    </div>
    <!-- Modal -->
    <div class="modal fade" id="Write-Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">修改博客文章</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="title" class="col-form-label">文章标题:</label>
                <input type="text" class="form-control" id="title-name" v-model="artInfo.title">
              </div>
              <div class="mb-3">
                <label for="description" class="col-form-label">文章简介:</label>
                <textarea class="form-control" id="description" rows="5" v-model="artInfo.description"></textarea>
              </div>
              <div class="mb-3 ms-4  row ">
                <div class="form-check form-switch  col-4">
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="artInfo.state">
                  <label class="form-check-label" for="flexSwitchCheckDefault">是否公开</label>
                </div>
                <div class="mb-3  col-8 row" >
                  <label class="form-check-label col-4" for="flexSwitchCheckDefault" >投稿专区:</label>
                  <select class="form-select form-select-sm md-3 col-8" aria-label=".form-select-sm example" style="width:50%" v-model="artInfo.zone">
                    <option value="0" >分享</option>
                    <option value="1">虚拟现实</option>
                    <option value="2">游戏</option>
                    <option value="3">图形学</option>
                    <option value="4">影视</option>
                    <option value="5">3D模型</option>
                  </select>
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <span class="error-message  me-3 fs-5 ">{{ artInfo.error_message }}</span>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="update_art(true)">保存修改</button>

          </div>
        </div>
      </div>
    </div>

    <div class="text-end">

      <button type="button" class="btn btn-primary mt-3 me-3" @click="addContent" data-bs-toggle="modal" data-bs-target="#Write-Modal" >修改标题</button>
      <button type="button" class="btn btn-secondary mt-3" data-bs-dismiss="Write-Modal"  @click="update_art(false)">保存修改</button>
    </div>
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import Breadcrumb from '@/components/Breadcrumb.vue'
import {onBeforeUnmount, reactive, shallowRef} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Boot } from '@wangeditor/editor';
import { Modal } from 'bootstrap/dist/js/bootstrap'
import markdownModule from '@wangeditor/plugin-md'
import {useRoute} from "vue-router";
import { useStore } from 'vuex';
import $ from 'jquery'
Boot.registerModule(markdownModule)

export default {
  components: { Editor, Toolbar,Breadcrumb },
  setup() {


    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    const artInfo = reactive({
      title: "",
      description: "",
      content: "",
      zone:"0",
      state:true,
      error_message: "",
    });

    const route=useRoute();
    // 内容 HTML
    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...(自动支持Markdown语法)' }
    const store=useStore();


    const get_art=()=>{
        $.ajax({
          url: "http://127.0.0.1:3000/pub/art/"+route.params.id+"/",
          type: "get",
          headers: {
            Authorization: "Bearer " + store.state.user.token,
          },
          success(resp) {
              artInfo.error_message=resp.art.error_message;
              artInfo.title=resp.art.title;
              artInfo.content=resp.art.content;
              artInfo.zone=resp.art.zoneId;
              artInfo.description=resp.art.description;
              artInfo.state=resp.art.state=='1'?true:false;
          }
        })
    };
    get_art();
    const update_art=(HasModal)=>{
      artInfo.error_message="";
      console.log(artInfo);
      $.ajax({
        url:"http://127.0.0.1:3000/user/art/update/",
        type:"post",
        data:{
          art_id:route.params.id,
          title:artInfo.title,
          description:artInfo.description,
          content:artInfo.content,
          zone:artInfo.zone,
          state:artInfo.state?"1":"0",
        },
        headers:{
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp){
          if(resp.error_message==="success"){
            if(HasModal==true)Modal.getInstance("#Write-Modal").hide();    get_art();
          }else{
            artInfo.error_message=resp.error_message;
          }
          alert("修改成功");
        }
      })
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      get_art,artInfo,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      update_art
    };
  }
}
</script>
<style  scoped>
.error-message{
  color:red;

}
</style>