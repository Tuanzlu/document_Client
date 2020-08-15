<template>
  <div>
    <div class="header">
      <div class="top" @click="toIndex"><span class="name">金刚石文档</span></div>
      <div class="topRight">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <<<<<<< HEAD
            <img class="avatar" style="width: 30px; height: 30px;" src="../assets/bg.jpeg" />
            =======
            <showdPhoto></showdPhoto>
            >>>>>>> personWorkspace
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="#/personInfo">个 人 主 页</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">帮 助 事 项</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#/">退 出 登 录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="topRight">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <a-icon type="bell" style="font-size: 25px; margin-top: 3px;" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="#/personInfo">全 部 通 知</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">未 读 消 息</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="topRight">
        <a-input-search placeholder="搜索文件" style="width: 200px;" @search="onSearch" />
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import showdPhoto from "@/components/showPhoto";
export default {
  components: {
    showdPhoto,
  },
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    getPhoto() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUserInfo;
      getData(url, params).then((res) => {
        //console.log(1111111111);
        if (res.code === "0") {
          this.imgUrl = res.data.userimgpath;
          console.log(this.imgUrl);
        } else if (res.code === "1") {
          this.$message.error("获取头像失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    toIndex() {
      if (window.location.href.substr(23) != "/personIndex") {
        this.$router.replace("/personIndex");
      }
    },
  },
  mounted() {
    this.getPhoto();
  },
};
</script>

<style scoped>
.header {
  height: 58px;
}
.top {
  cursor: pointer;
  float: left;
  margin: 15px 10px 0 10px;
}
.name {
  text-align: center;
  width: 100px;
  font-size: 20px;
  height: 100%;
  margin: 15px;
}
.topRight {
  float: right;
  margin: 15px 10px 0 20px;
}
</style>
