<template>
  <div>
    <Navbar></Navbar>
    <router-view/>
    <Footer></Footer>
  </div>

</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import "font-awesome/css/font-awesome.css"

export default{
  components: {
    Footer,
    Navbar,
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('store')) {
      this.$store.replaceState(
          Object.assign(
              {},
              this.$store.state,
              JSON.parse(localStorage.getItem('store'))
          )
      )
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },

}
</script>
<style>

body{
  /*background-color: #8C8987;*/

  background-image: url("https://www.w3school.com.cn/i/photo/shanghai-1.jpg");
  /*background-image: url("https://pic1.zhimg.com/v2-d58ce10bf4e01f5086c604a9cfed29f3_r.jpg");*/
  background-size: 100%;
  background-attachment: fixed;
  background-position: center;
}
</style>
