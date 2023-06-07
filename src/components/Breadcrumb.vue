<template>
  <nav style="--bs-breadcrumb-divider: '>';font-size: 20px" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a class=" text-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample">Home</a></li>
      <li class="breadcrumb-item active" aria-current="page">{{name}}</li>
    </ol>
     
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">侧边栏</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
    <router-link to="/dashboard/my">aaa</router-link>
    <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div>
</div>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props:{
      name:String
  }
}
</script>

<style scoped>

</style>