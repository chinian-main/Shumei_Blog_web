<template>
  <main class="container-fluid">
    <div class="untiy-container">
    <iframe
        id="unity-iframe"
        ref="frame"
        src="/static/Bird/index.html"
        frameborder="0"
        scrolling="no"
        class="p-5"
        onload="resizeIframe(this)"
    >
    </iframe>
    </div>
  </main>
</template>

<script>

// eslint-disable-next-line no-unused-vars
  function resizeIframe(iframe) {
  iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}

export default {
  name: "UnityContentView",
  setup(){
    return {}
  }
}
</script>

<style scoped>
.untiy-container{
  display: flex;
  align-items: center;
  height: 100%;
}
.untiy-container iframe {
  margin:0 auto;

  width: 720px;
  height: 1080px;
  transform: scale(0.7) translateY(-250px);
}
main{
  width: 90%;
  background-color:#FFFFFF;
}
</style>