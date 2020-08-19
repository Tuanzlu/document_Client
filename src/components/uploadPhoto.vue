<template>
  <div class="photo">
    <div style="width:100px;height:100px;border:1px solid;text-align:center;border-radius:50%" @click="openImg">
    <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="input" />
      <span v-if="imgUrl==''">点击上传</span>
      <img style="height:100%;width:100%;border-radius:50%" v-if="imgUrl!=''" :src="imgUrl" />
    </div>
  </div>
</template>
<script>
import { postData } from "@/api/webpost";
import { putData } from "@/api/webput";
import { getData } from "@/api/webget";
export default {
  data() {
    return {
      isSelectFile: false,
      imgUrl: "",
    };
  },
  methods: {
    tirggerFile(event) {
      let file = event.target.files[0];
      this.files = file;
      let url = "";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function() {
      url = this.result.substring(this.result.indexOf(",") + 1);
      that.imgUrl = "data:image/png;base64," + url;
      };
      this.loadPhoto(file);
    },
    openImg() {
      this.$refs.input.click();
    },
    loadPhoto(file){
      let params = new FormData();
      params.append('image', file); 
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.uploadUserImage;
      postData(url,params).then((res) => {
        //console.log(res);
        if(res.code === '0'){
          console.log(res.data.userimgpath);
          this.imgUrl = res.data.userimgpath;
          this.putPhoto(res.data.userimgpath);
        }
        else if(res.code === '1'){
          this.$message.error('格式出错');
        }
        else{
          console.log(res.code);
          this.$message.error('上传失败');
        }
      });
    },
    putPhoto(e){
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem('UserId'));
      params.append("userid", userId);
      params.append('userimgpath', e);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.updateUserImgPath;
      putData(url,params).then((res) => {
        console.log(res);
        if(res.code === '0'){
          this.$message.success('上传成功');
        }
        else{
          console.log(res.code);
          this.$message.error('上传失败');
        }
      });
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