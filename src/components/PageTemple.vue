<template>
  <main class="container" style="width: 90%;padding-top: 20px;background-color: #F1F1F1">
      <div class="p-4 p-md-5 mb-4 rounded text-bg-dark  " >
        <div class="col-md-6 px-0 ">
          <h1 class="display-4 fst-italic">分享你的所见所得</h1>
          <p class="lead my-3">生活中的许多快乐，都是互相分享得来的。比如说，我们这些住校生，每天除了上课、听课、下课外还有什么事可做呢？我们会在宿舍围坐在一起，分享快乐。我们会谈一下今天发生的趣事，或是远处那边的师兄，又或是说说谁的悄悄话，等等。</p>
          <p class="lead mb-0">    <router-link to="dfsf"  class="text-white fw-bold">前往阅读...</router-link></p>
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
              <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <router-link to="dfsf" class="stretched-link">继续阅读...</router-link>
            </div>
            <div class="col-auto d-none d-lg-block">
              <img class="bd-placeholder-img" width="200" height="250" src="https://www.w3school.com.cn/i/photo/wuhan.jpg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-success">科技</strong>
              <h3 class="mb-0">游戏开发沙龙</h3>
              <div class="mb-1 text-muted">Nov 11</div>
              <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <router-link to="dfsf" class="stretched-link">继续阅读...</router-link>
            </div>
            <div class="col-auto d-none d-lg-block">
              <img class="bd-placeholder-img" width="200" height="250" src="https://www.w3school.com.cn/i/photo/beijing.jpg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"/><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Vue-如何切换页面</h5>
              <p class="card-text">This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</p>
              <div class="card-text"><small class="text-muted">Last updated 3 mins ago</small>
              <router-link to="dfsf" style="margin-left: 500px">阅读></router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="position-sticky" style="top: 2rem;">
            <div class="p-4 mb-3 bg-light rounded">
              <h4 class="fst-italic">关于</h4>
              <p class="mb-0">版权归文章编辑者所有</p>
              <p class="mb-0">
                非原创文章归原创作者所有</p>
            </div>

            <div class="p-4">
              <h4 class="fst-italic">Archives</h4>
              <ol class="list-unstyled mb-0">
                <li><a href="#">March 2021</a></li>
                <li><a href="#">February 2021</a></li>
                <li><a href="#">January 2021</a></li>
                <li><a href="#">December 2020</a></li>
                <li><a href="#">November 2020</a></li>
                <li><a href="#">October 2020</a></li>
                <li><a href="#">September 2020</a></li>
                <li><a href="#">August 2020</a></li>
                <li><a href="#">July 2020</a></li>
                <li><a href="#">June 2020</a></li>
                <li><a href="#">May 2020</a></li>
                <li><a href="#">April 2020</a></li>
              </ol>
            </div>

            <div class="p-4">
              <h4 class="fst-italic">Elsewhere</h4>
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
export default {
  name: "SharePage"
}
</script>

<style scoped>
.bg-img{
  background-image: image("https://www.w3school.com.cn/i/photo/wuhan.jpg");
}
</style>