<template>

    <div class="container-fluid editor-content-view mb-5"  v-html="content">

      </div>
</template>

<script>
export default {
  props:['content'],
}
</script>

<style>
.editor-content-view {

  margin:0 0;
  padding:0 0;
  /*margin-top: 20px;*/
  overflow-x: auto;
}

.editor-content-view p{
  /*padding-left: 3%;*/
}
.editor-content-view iframe{
  /*height: auto;*/
  /*min-height: 300px;*/
  /*width:100%;*/
  /*padding-left: 5%;*/
  /*padding-right: 5%;*/
  height: auto;
  max-height: 400px;
  min-height: 300px;

  width:100%;
  border-radius: 8px 8px 8px 8px ;
}
.editor-content-view img{
  height: auto;
  max-height: 400px;
  min-height: 250px;
  width:100%;
  border-radius: 8px 8px 8px 8px ;
}
.editor-content-view li {
  white-space: pre-wrap; /* 保留空格 */
  margin-left: 3%;
  padding-left: 1%;
}

.editor-content-view blockquote {
  border-left: 8px solid #5ea7d4;
  padding: 10px 10px;
  margin: 10px 0;
  color: inherit;
  border-radius: 4px;
  border-left: 4px solid #2d8cf0;
  background-color: #e5e4e4;
}

.editor-content-view code {
  font-family: monospace;
  background-color: #2B2B2B;
  color: #bababa;
  
  padding: 5px;
  border-radius: 3px;
}

.editor-content-view h1,h2,h3,h4 {
   
}
.editor-content-view pre>code {
   display: inline-block;
   padding: 10px; 
   min-width: 100%;
}

.editor-content-view table {
  border-collapse: collapse;
}
.editor-content-view td,
.editor-content-view th {
  border: 1px solid #ccc;
  min-width: 50px;
  height: 20px;
}
.editor-content-view th {
  background-color: #f1f1f1;
}

.editor-content-view ul,
.editor-content-view ol {
  padding-left: 20px;
  padding-right: 5px;
}

.editor-content-view input[type="checkbox"] {
  margin-right: 5px;
}
    /*目录悬浮*/
    .menuBox {
        position: fixed;
    }
 
    /*内容居中*/
    .contentBox {
        width: 60%;
        margin: auto;
    }
 
    /*el-scrollbar 必须指定高度*/
    .scrollMenuBox {
        height: 600px;
        width: 200px;
    }
 
    /*隐藏水平滚动条*/
     .el-scrollbar__wrap {
        overflow-x: hidden;
    }

</style>