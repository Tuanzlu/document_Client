<template>
  <div>
    <div class="header">
      <div class="top" @click="toIndex">
        <span class="name">金刚石文档</span>
      </div>
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
            <a-icon type="bell" style="font-size: 25px; margin-top: 3px;" />
          </a>
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
import { putData } from "@/api/webput";
import { deleteData } from "@/api/webdelete";
import showdPhoto from "@/components/showPhoto";
export default {
  components: {
    showdPhoto,
  },
  data() {
    return {
      imgUrl: "",
      visible: false,
      readnoticelist: [],
      unreadnoticelist: [],
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
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
      if (window.location.href.substr(23) != "/used") {
        this.$router.replace("/used");
      }
    },
    getReadNotice() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getReadNoticeByUser;
      getData(url, params).then((res) => {
        if (res.code === "0") {
          this.readnoticelist = res.data.readnoticelist;
        } else if (res.code === "1") {
          this.$message.error("失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    getUnreadNotice() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUnreadNoticeByUser;
      getData(url, params).then((res) => {
        if (res.code === "0") {
          this.unreadnoticelist = res.data.unreadnoticelist;
        } else if (res.code === "1") {
          this.$message.error("失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    agreeTeamInvitation(teamid, noticeid) {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      params.append("teamid", teamid);
      params.append("noticeid", noticeid);
      let url = this.$urlPath.website.agreeTeamInvitation;
      putData(url, params).then((res) => {
        if (res.code === "0") {
          this.$message.success("通过邀请");
          this.getUnreadNotice();
          this.getReadNotice();
          this.$router.push({
            path: "/team",
            query: {
              teamid: teamid,
            },
          });
        } else if (res.code === "1") {
          this.$message.error("失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    disagreeTeamInvitation(teamid, noticeid) {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      params.append("teamid", teamid);
      params.append("noticeid", noticeid);
      let url = this.$urlPath.website.disagreeTeamInvitation;
      deleteData(url, params).then((res) => {
        if (res.code === "0") {
          this.$message.success("拒绝邀请");
          this.getUnreadNotice();
          this.getReadNotice();
        } else if (res.code === "1") {
          this.$message.error("失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    readNotice(noticeid) {
      let params = new URLSearchParams();
      params.append("noticeid", noticeid);
      let url = this.$urlPath.website.readNotice;
      putData(url, params).then((res) => {
        if (res.code === "0") {
          this.getUnreadNotice();
          this.getReadNotice();
        } else if (res.code === "1") {
          this.$message.error("失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    deleteNotice(noticeid) {
      let params = new URLSearchParams();
      params.append("noticeid", noticeid);
      let url = this.$urlPath.website.deleteNotice;
      deleteData(url, params).then((res) => {
        if (res.code === "0") {
          this.getUnreadNotice();
          this.getReadNotice();
        } else if (res.code === "1") {
          this.$message.error("失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    gotoDoc(docid) {
      this.$router.push({
        path: "/document",
        query: {
          docid: docid,
        },
      });
    },
  },
  mounted() {
    this.getPhoto();
    this.getUnreadNotice();
    this.getReadNotice();
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
.notice-card {
  width: 330px;
  margin: 10px 0 0 20px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.3);
}
.notice-card .read-agree {
  margin-left: 200px;
}
.notice-card .read-disagree {
  margin-left: 5px;
}
.notice-card .read-confirm {
  margin-left: 229px;
}
.notice-card .read {
  margin-left: 177px;
}
.notice-card .read2 {
  margin-left: 187px;
}
.notice-card .read-doc {
  margin-left: 166px;
}
</style>
