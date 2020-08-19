<template>
  <div>
    <div class="header">
      <div class="top" @click="toIndex" style="position: fixed; float: left;">
        <img
          src="../assets/logo.png"
          style="height: 60px; width: 185px; margin-left: 20px; margin-right: 630px; margin-top: -13px;"
        />
      </div>
      <div class="topRight">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <showdPhoto></showdPhoto>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="#" @click="toPerson">个 人 主 页</a>
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
            <div>
              <a-badge
                :count="this.unreadnoticelist.length"
                :number-style="{ backgroundColor: '#f8b862' }"
                title="新的消息"
              >
                <a-icon type="bell" style="font-size: 25px; margin-top: 3px; color: #250d00;" @click="showDrawer" />
              </a-badge>
              <a-drawer
                placement="right"
                :closable="false"
                :visible="visible_notice"
                :after-visible-change="afterVisibleChange"
                @close="onClose"
                width="400px"
              >
                <a-tabs default-active-key="1">
                  <a-tab-pane key="1">
                    <span slot="tab">未读通知</span>
                    <div v-for="(item, index) in unreadnoticelist" :key="index">
                      <a-card :bordered="false" class="notice-card" size="small">
                        <p>
                          <strong>{{ item.title }}</strong>
                        </p>
                        <p>{{ item.content }}</p>
                        <p>{{ item.addtime }}</p>
                        <a-button
                          type="primary"
                          ghost
                          size="small"
                          class="read-agree"
                          @click="agreeTeamInvitation(item.teamid, item.noticeid)"
                          v-if="item.type === 1"
                          >同意</a-button
                        >
                        <a-button
                          type="danger"
                          ghost
                          size="small"
                          class="read-disagree"
                          @click="disagreeTeamInvitation(item.teamid, item.noticeid)"
                          v-if="item.type === 1"
                          >拒绝</a-button
                        >
                        <a-button
                          type="primary"
                          ghost
                          size="small"
                          class="read-confirm"
                          @click="readNotice(item.noticeid)"
                          v-if="item.type === 2"
                          >设为已读</a-button
                        >
                        <a-button
                          type="primary"
                          ghost
                          size="small"
                          class="read-doc"
                          @click="gotoDoc(item.docid)"
                          v-if="item.type === 3"
                          >去查看</a-button
                        >
                        <a-button
                          type="primary"
                          ghost
                          size="small"
                          @click="readNotice(item.noticeid)"
                          style="margin-left: 5px;"
                          v-if="item.type === 3"
                          >设为已读</a-button
                        >
                        <a-button
                          type="primary"
                          ghost
                          size="small"
                          class="read-agree"
                          @click="agreeCooperateInvitation(item.docid, item.noticeid)"
                          v-if="item.type === 4"
                          >同意</a-button
                        >
                        <a-button
                          type="danger"
                          ghost
                          size="small"
                          class="read-disagree"
                          @click="disagreeCooperateInvitation(item.docid, item.noticeid)"
                          v-if="item.type === 4"
                          >拒绝</a-button
                        >
                      </a-card>
                    </div>
                  </a-tab-pane>
                  <a-tab-pane key="2">
                    <span slot="tab">已读通知</span>
                    <div v-for="(item, index) in readnoticelist" :key="index">
                      <a-card :bordered="false" class="notice-card" size="small">
                        <p>
                          <strong>{{ item.title }}</strong>
                        </p>
                        <p>{{ item.content }}</p>
                        <p>{{ item.addtime }}</p>
                        <span v-if="item.status === 1">
                          <a-button type="primary" ghost size="small" class="read2" disabled>已读</a-button>
                        </span>
                        <span v-else-if="item.status === 2">
                          <a-button type="primary" ghost size="small" class="read" disabled>已同意</a-button>
                        </span>
                        <span v-else>
                          <a-button type="primary" ghost size="small" class="read" disabled>已拒绝</a-button>
                        </span>
                        <span>
                          <a-button size="small" style="margin-left: 5px;" @click="deleteNotice(item.noticeid)"
                            >删除</a-button
                          >
                        </span>
                      </a-card>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </a-drawer>
            </div>
          </a>
        </a-dropdown>
      </div>
      <div class="topRight">
        <a-popover @click="clearSearch" placement="bottomRight" v-model="visible_search" title="搜索结果">
          <div slot="content" @click="hide">
            <a-list style="max-height: 300px; overflow: scroll;" item-layout="horizontal" :data-source="search">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.modifytime">
                  <a slot="title" @click="toDoc(item)">{{ item.title }}</a>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
          <a-input-search placeholder="搜索文件" style="width: 200px;" @search="onSearch" />
        </a-popover>
      </div>

      <div>
        <a-back-top />
        <strong style="color: rgba(64, 64, 64, 0.6);"> </strong>
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
      visible_notice: false,
      visible_search: false,
      readnoticelist: [],
      unreadnoticelist: [],
      search: [],
    };
  },
  methods: {
    toPerson() {
      let userid = parseInt(window.sessionStorage.getItem("UserId"));
      this.$router.push({
        path: "/personInfo",
        query: {
          userid: userid,
        },
      });
    },
    agreeCooperateInvitation(docid, noticeid) {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      params.append("docid", docid);
      params.append("noticeid", noticeid);
      let url = this.$urlPath.website.agreeCooperateInvitation;
      putData(url, params).then((res) => {
        if (res.code === "0") {
          this.$message.success("通过邀请");
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
    disagreeCooperateInvitation(docid, noticeid) {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      params.append("docid", docid);
      params.append("noticeid", noticeid);
      let url = this.$urlPath.website.disagreeCooperateInvitation;
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
    clearSearch() {
      this.search.splice(0, this.search.length);
    },
    toDoc(item) {
      this.$router.push({
        path: "/document",
        query: {
          docid: item.docid,
        },
      });
    },
    hide() {
      this.visible_search = true;
      this.search.splice(0, this.search.length);
    },
    onSearch(value) {
      console.log(value.length);
      if (value.length > 0) {
        let params = new URLSearchParams();
        let userId = parseInt(window.sessionStorage.getItem("UserId"));
        params.append("userid", userId);
        params.append("search", value);
        let url = this.$urlPath.website.getRelatedDocByTitle;
        getData(url, params).then((res) => {
          if (res.code === "0") {
            this.search = res.data.docList;
            console.log(this.search);
          } else if (res.code === "1") {
            this.$message.error("获取信息失败");
          } else {
            console.log(res.code);
            this.$message.error("服务器返回时间间隔过长");
          }
        });
      } else {
        this.search.splice(0, this.search.length);
      }
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible_notice = true;
    },
    onClose() {
      this.visible_notice = false;
    },
    getPhoto() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUserInfo;
      getData(url, params).then((res) => {
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
  background-color: #d6c6af ;
  height: 58px;
  width: 100%;
  position: fixed;
}
.top {
  cursor: pointer;
  margin: 15px 10px 0 10px;
  float: left;
}
.topRight {
  float: right;
  margin-left: 0px;
  margin-top: 16px;
  margin-right: 40px;
}
.notice-card {
  width: 330px;
  margin: 5px 0 0 20px;
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
