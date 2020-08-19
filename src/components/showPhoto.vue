<template>
  <div class="photo">
    <div style="width:30px;height:30px;border:0px solid;text-align:center;" @click="openImg">
      <img style="height:100%;width:100%;border-radius:50%" v-if="imgUrl!=''" :src="imgUrl" />
    </div>
  </div>
</template>
<script>
import { getData } from "@/api/webget";
export default {
  data() {
    return {
      imgUrl: "../assets/bg.jpeg",
    };
  },
  methods: {
    openImg() {
      this.$refs.input.click();
    },
    getPhoto(){
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem('UserId'));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUserInfo;
      getData(url,params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.imgUrl = res.data.userimgpath;
        } else if (res.code === "1") {
          this.$message.error("获取头像失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    }
  },
  mounted(){
    this.getPhoto();
  }
}
</script>

<style>

</style>
