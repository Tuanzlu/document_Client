<template>
  <div style="float:right;width:70%">
      <a-menu v-model="current" mode="horizontal" style="margin-left:20px">
        <a-menu-item key="use"> 
        <router-link to="/used"><a-icon type="clock-circle" />最近使用</router-link>
        </a-menu-item>
        <a-menu-item key="own" > 
        <router-link to="/own"><a-icon type="plus" />我创建的</router-link>
        </a-menu-item>
        <a-menu-item key="fav" > 
        <router-link to="/favorite"><a-icon type="star" />我的收藏</router-link>
        </a-menu-item>
      </a-menu>
      <div class="btn_box">
       <buttons></buttons>
       <buttons></buttons>
      
      </div>
  </div>
</template>

<script>
import buttons from "@/components/buttonDoc";
export default {
  components: {
    buttons,
  },
}
</script>

<style>
.btn_box{
    /*background-color: #7f7f7f;*/
    width: 740px;
<<<<<<< HEAD
=======
    margin-left: 20px;
>>>>>>> 71f4fae... 修改个人头像上传和页面展示，新增个人工作台展示相关文档
}

</style>