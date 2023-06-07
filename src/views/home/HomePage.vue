<template>

    <div class="container-full main" >
      <div id="demo" class="carousel slide" data-bs-ride="carousel"  >
        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
        </div>

        <!-- The slideshow/carousel -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://s1.ax1x.com/2023/06/03/pC9ZAn1.jpg" alt="Shanghai" class="d-block" style="width:100%; height: 700px;">
            <div class="carousel-caption">
              <h3>毕业季</h3>
              <p>6月是毕业的季节，致青春，不散场。</p>
            </div>
          </div>

          <div class="carousel-item">
            <img src="https://s1.ax1x.com/2023/06/03/pC9VBTK.jpg" alt="Wuhan" class="d-block" style="width:100%;  height: 700px;">
            <div class="carousel-caption">
              <h3>AI绘图</h3>
              <p>AI绘图正在改变世界!</p>
            </div>
          </div>
         
          <div class="carousel-item">
            <img src="https://s1.ax1x.com/2023/06/04/pC9Iqnx.jpg" alt="Beijing" class="d-block" style="width:100%; height: 700px;">
            <div class="carousel-caption">
              <h3>城建风光-女排雕塑</h3>
              <p>这一定是一场激烈的排球比赛！</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="https://s1.ax1x.com/2023/06/04/pC971tU.jpg" alt="Wuhan" class="d-block" style="width:100%;  height: 700px;">
            <div class="carousel-caption">
              <h3>红叶</h3>
              <p>像花一样的叶子</p>
            </div>
          </div>
        </div>

        <!-- Left and right controls/icons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>

      <div class="container-fluid bg-white p-4 " style="width: 90%;">
        <div class="row pt-3">
          <div class="col-md-4">
            <div class="item">
              <h5 class="mt-2 text-center fs-4 mb-2">分享</h5>
              <router-link to="/share" class="link-unstyled">
                <img src="https://img.zcool.cn/community/0141a15944f2b9a8012193a3e89a01.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp" class="img-fluid shadow-sm mb-4" alt="Landing">
              </router-link>

            </div>
          </div>
          <div class="col-md-4">
            <div class="item">
              <h5 class="mt-2 text-center fs-4 mb-2">游戏</h5>

              <router-link to="/unity" class="link-unstyled">
                <img src="https://img.zcool.cn/community/0169cb5944f2b9a8012193a3cd0d32.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp" class="img-fluid shadow-sm mb-4" alt="Dashboard">
              </router-link>

            </div>
          </div>
          <div class="col-md-4">
            <div class="item">
              <h5 class="mt-2 text-center fs-4 mb-2">登录</h5>
              <router-link to="/login" class="link-unstyled ">
                <img src="https://img.zcool.cn/community/01a43e5944f2baa8012193a334bee7.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp" class="img-fluid shadow-sm mb-4" alt="Pages">
              </router-link>

            </div>
          </div>
        </div>
      </div>
<!--      <iframe-->
<!--          id="unity-infame"-->
<!--          ref="frame"-->
<!--          src="/static/unity/index.html"-->
<!--          width= "100%" height="100%">-->
<!--      </iframe>-->


  </div>

</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
frame{
  overflow: hidden;
}
frame::-webkit-scrollbar{
  display:none

}
.item:hover{
  cursor: pointer;
  color: #5faaff;
  filter: brightness(70%);
}
</style>