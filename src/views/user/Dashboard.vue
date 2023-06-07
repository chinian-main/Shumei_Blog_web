<template>
  <div class="container-fluid" style="width:  90%">
    <div class="row">
<!--      <div class="position-sticky" style="top: 2rem;">-->
      <div class="myMenu col-md-3  ">
        <div class="menu_user">
          <router-link :to="'/people/'+store.state.user.id" class="menu_user_pic">
            <img :src="store.state.user.photo" alt="mdo" width="46" height="46" class="rounded-circle">
          </router-link>
          <div class="menu_user_name_box">
            <h3 style="color: #BBBBBB">{{store.state.user.username}}</h3>
          </div>
        </div>
    <!-- 用户信息 -->
        <router-link to="/dashboard/my" class="router">
          <div class="menu_item">
            <div class="menu_item_pic ">
              <i class="el-icon-s-help"></i>
              <!-- <i class="fa fa-address-card-o fs-3"></i> -->
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-chat-square-heart-fill"></i>个人信息</p>
            </div>
          </div>
        </router-link>

        <!-- 撰写博客 -->
        <router-link to="/dashboard/writer" class="router">
          <div class="menu_item">
            <div class="menu_item_pic ">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-chat-square-heart-fill"></i>撰写博客</p>
            </div>
          </div>
        </router-link>
        <!-- 文章管理 -->
        <router-link to="/dashboard/arts" class="router">
          <div class="menu_item">
            <div class="menu_item_pic">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-bookmark-plus-fill"></i>文章管理</p>
            </div>
          </div>
        </router-link>
        <!-- 收藏管理 -->
        <router-link to="/dashboard/collect" class="router">
          <div class="menu_item">
            <div class="menu_item_pic">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-bookmark-plus-fill"></i>收藏管理</p>
            </div>
          </div>
        </router-link>
        <!-- 关注管理 -->
        <router-link to="/dashboard/follow" class="router">
          <div class="menu_item">
            <div class="menu_item_pic">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-bookmark-plus-fill"></i>关注管理</p>
            </div>
          </div>
        </router-link>
        <!-- 用户管理 -->
        <router-link v-if="store.state.user.power=='管理员'" to="/dashboard/human" class="router">
          <div class="menu_item">
            <div class="menu_item_pic">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-bookmark-plus-fill"></i>用户管理</p>
            </div>
          </div>
        </router-link>
        <!-- 学生管理 -->
        <router-link v-if="store.state.user.power=='导师'" to="/dashboard/student" class="router">
          <div class="menu_item">
            <div class="menu_item_pic">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-bookmark-plus-fill"></i>学生管理</p>
            </div>
          </div>
        </router-link>
        <!-- 个人主页 -->
        <router-link :to="'/people/'+store.state.user.id" class="router">
          <div class="menu_item">
            <div class="menu_item_pic">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-chat-square-heart-fill"></i>个人主页</p>
            </div>
          </div>
        </router-link>
        <!-- 回到首页 -->
        <router-link to="/home" class="router">
          <div class="menu_item">
            <div class="menu_item_pic">
              <i class="el-icon-s-help"></i>
            </div>
            <div class="menu_item_box">
              <p class="menu_item_box_a text-light"><i class="bi bi-arrow-up-left-square-fill"></i>回到首页</p>
            </div>
          </div>
        </router-link>
      </div>

      <div class="view col-md-9">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: "DashBoard",
  setup(){
      const store=useStore();
      return {
        store
      }
  }
}
</script>

<style scoped>
i{
  color:#CDCDCD
}
.view{
  left: 10px;
  top: 10px;
  position: relative;
  background-color: rgba(205, 205, 205, 0.5);
}


.myMenu {
  position: relative;
  top:10px;
  bottom:10px;
  width: 308px;
  height: 928px;
  background-color: rgba(89, 91, 93, 0.5);
  box-shadow: 0 0 10px rgb(10 10 10 / 20%);
  display: flex;
  flex-direction: column;
}

.menu_user {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #e8eaee;
  display: flex;
  align-items: center;
}

.menu_user_pic {
  position: relative;
  left: 57px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu_user_name_box {
  position: absolute;
  width: 120px;
  height: 16px;
  left: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.menu_item {
  width: 100%;
  height: 60px;
  background-color: #595B5D;
  display: flex;
  align-items: center;
}

.menu_item:hover {
  background-color: rgba(60, 63, 65, 0.5);
  cursor: pointer;
}


.menu_item_pic {
  position: relative;
  left: 70px;
}

.menu_item_box {
  position: relative;
  left: 80px;
  width: 135px;
  height: 50px;
}
i{
  margin-right: 5px;
}
/* 菜单列表字体 */
.menu_item_box_a {
  font-size: 24px;
  text-decoration:none;
}
/* 重置路由链接样式 */
.router {
  text-decoration-color: #595B5D;


}

</style>
