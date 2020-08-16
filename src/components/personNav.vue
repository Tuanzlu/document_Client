<template>
  <div>
    <div class="header">
      <div class="top" @click="toIndex"><span class="name">金刚石文档</span></div>
      <div class="topRight">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <showdPhoto></showdPhoto>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="#/personInfo">个 人 主 页</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">帮 助 事 项</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a href="#/">退 出 登 录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="topRight">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
<<<<<<< HEAD
            <a-icon type="bell" style="font-size:25px;margin-top:3px;" />
=======
            <a-icon type="bell" style="font-size: 25px; margin-top: 3px;" />
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
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
<<<<<<< HEAD
        <a-input-search placeholder="搜索文件" style="width: 200px" @search="onSearch" />
=======
        <a-input-search placeholder="搜索文件" style="width: 200px;" @search="onSearch" />
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
<<<<<<< HEAD
import showdPhoto from '@/components/showPhoto';
=======
import showdPhoto from "@/components/showPhoto";
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
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
<<<<<<< HEAD
    getPhoto(){
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem('UserId'));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUserInfo;
      getData(url,params).then((res) => {
=======
    getPhoto() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUserInfo;
      getData(url, params).then((res) => {
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
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
<<<<<<< HEAD
    }
  },
  mounted(){
    this.getPhoto();
  }
}
=======
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
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
</script>

<style scoped>
.header {
  height: 58px;
}
.top {
<<<<<<< HEAD
=======
  cursor: pointer;
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
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
