<template>
<<<<<<< HEAD
<div>
  <div style="float: left;">
    <a-menu v-model="use" mode="horizontal" style="margin-left:250px;width:70%"> 
=======
  <div style="float:right;width:70%">
    <<<<<<< HEAD
    <a-menu v-model="current" mode="horizontal" style="margin-left:20px">
      <a-menu-item key="use">
        <router-link to="/used"><a-icon type="clock-circle" />最近使用</router-link>
      </a-menu-item>
      <a-menu-item key="own">
        <router-link to="/own"><a-icon type="plus" />我创建的</router-link>
      </a-menu-item>
      <a-menu-item key="fav">
        <router-link to="/favorite"><a-icon type="star" />我的收藏</router-link>
      </a-menu-item>
    </a-menu>
    <div class="btn_box">
      <cards :list="info" v-if="info.length > 0"></cards>
    </div>
    =======
    <a-menu v-model="fav" mode="horizontal" style="margin-left:20px">
>>>>>>> 4fe8bfb9903c54cff36a9f177242bf6fcfda7796
      <a-menu-item key="use">
            <router-link to="/used"><a-icon type="clock-circle" />最近使用</router-link>
          </a-menu-item>
          <a-menu-item key="own">
            <router-link to="/own"><a-icon type="plus" />我创建的</router-link>
          </a-menu-item>
          <a-menu-item key="fav">
            <router-link to="/favorite"><a-icon type="star" />我的收藏</router-link>
          </a-menu-item>
        </a-menu>
        <div>
          <div class="btn_box" style=" margin-left:200px;width:70%;margin-top:-20px" >
            <cards :list="info" v-if="info.length > 0"></cards>
          </div>
        </div>
      </a-menu-item>
    </a-menu>
<<<<<<< HEAD
=======
    <div class="btn_box">
      <cards :list="info" v-if="info.length > 0"></cards>
    </div>
    >>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
>>>>>>> 4fe8bfb9903c54cff36a9f177242bf6fcfda7796
  </div>
  <siderButton></siderButton>
 </div>
</template>

<script>
import cards from "@/components/wordCard";
import siderButton from "@/components/siderButton";
import { getData } from "@/api/webget";
export default {
  components: {
    cards,siderButton
  },
  data() {
    return {
      info: [],
    };
  },
  props: ["list"],
  methods: {
    getInfo() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getCollected;
      getData(url, params).then((res) => {
        // console.log(res.code);
        if (res.code === "0") {
          console.log(res.data);
          for (let i = 0; i < res.data.readlist.length; i++) {
            this.info.push(res.data.readlist[i]);
          }
          console.log(this.info);
          this.$refs.list = this.info;
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style>
.btn_box {
  /*background-color: #7f7f7f;*/
  width: 740px;
  margin-left: 20px;
}
</style>
