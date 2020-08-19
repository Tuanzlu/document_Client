<template>
  <div class="mainContext">
    <div class="leftContext">
      <a-card
        :title="teaminfo.teamname + ' 的团队空间'"
        :bordered="false"
        style="width: 800px; padding: 0 0 16px 0;"
        headStyle="font-size:20px"
        bodyStyle="font-size:16px;padding-bottom:0"
      />
      <p style="margin-left:25px">{{teaminfo.intro}}</p>
      <div style="margin-left: -50px; margin-top: -30px;">
        <wordCard :list="teamdoclist"></wordCard>
      </div>
    </div>
    <div class="rightContext">
      <div style="margin-top:48px;margin-right:110px">
        <div class="myButton" @click="addTeamDoc">创建团队文档</div>
        <br />
        <br />
        <br />
        <div class="myButton" @click="toMemberList">成员列表</div>
        <a-popover trigger="click" placement="left">
          <template slot="content">
            <a-form
              :form="form"
              @submit="handleSubmit"
              layout:Vertical
              style="width: 400px; padding: 20px;"
            >
              <a-form-item label="团队名称">
                <a-input
                  allow-clear
                  v-model="teamname_update"
                  v-decorator="[
                    'teamname',
                    { rules: [{ required: true, message: '团队名称不能为空!' }], initialValue: this.teaminfo.teamname },
                  ]"
                />
              </a-form-item>
              <a-form-item label="团队介绍">
                <a-textarea
                  allow-clear
                  :auto-size="{ minRows: 5, maxRows: 8 }"
                  v-model="intro_update"
                  v-decorator="[
                    'intro',
                    { rules: [{ required: true, message: '团队介绍不能为空!' }], initialValue: this.teaminfo.intro },
                  ]"
                />
              </a-form-item>
              <a-form-item style="margin: 5px 0 0 140px;">
                <a-button type="primary" html-type="submit" ghost>提交修改</a-button>
              </a-form-item>
            </a-form>
          </template>
          <br />
          <br />
          <br />
          <div class="myButton" v-if="userid == leaderinfo.userid">团队设置</div>
          <br v-if="userid == leaderinfo.userid" />
          <br v-if="userid == leaderinfo.userid" />
          <br v-if="userid == leaderinfo.userid" />
        </a-popover>
        <div
          class="myButton"
          @click="showDeleteTeamConfirm"
          ghost
          v-if="userid == leaderinfo.userid"
        >解散团队</div>
        <div
          class="myButton"
          @click="showDeleteConfirm_Member"
          ghost
          v-if="userid != leaderinfo.userid"
        >退出团队</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import { deleteData } from "@/api/webdelete";
import { postData } from "@/api/webpost";
import wordCard from "@/components/wordCard.vue";
export default {
  components: {
    wordCard
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "addtime" }),
      teamid: 0,
      teaminfo: {},
      teamdoclist: [],
      leaderinfo: {},
      userid: parseInt(window.sessionStorage.getItem("UserId")),
      teamname_update: "",
      intro_update: ""
    };
  },
  methods: {
    toModel() {
      console.log(this.teamid);
      this.$router.push({
        path: "/model",
        query: {
          teamid: this.teamid
        }
      });
    },
    showDeleteConfirm_Member() {
      let that = this;
      this.$confirm({
        title: "退出团队确认",
        content: "你确认要退出团队吗？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.quitTeam_Member(
            parseInt(window.sessionStorage.getItem("UserId"))
          );
        },
        onCancel() {}
      });
    },
    showDeleteTeamConfirm() {
      let that = this;
      this.$confirm({
        title: "解散团队确认",
        content: "你确认要解散团队吗？解散团队后所有团队文档也将一并删除。",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.deleteTeam();
        },
        onCancel() {}
      });
    },
    quitTeam_Member(userid) {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      params.append("userid", userid);
      let url = this.$urlPath.website.quitTeam;
      deleteData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("退出成功");
          this.$router.push("/used");
        } else if (res.code === "1") {
          this.$message.error("您不在团队中");
        } else if (res.code === "2") {
          this.$message.error("团队队长不能退出");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    deleteTeam() {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      let url = this.$urlPath.website.deleteTeam;
      deleteData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("删除成功");
          this.$router.push("/used");
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          let params = new URLSearchParams();
          params.append("teamid", this.teamid);
          params.append("teamname", this.teamname_update);
          params.append("intro", this.intro_update);
          let url = this.$urlPath.website.updateTeam;
          putData(url, params).then(res => {
            console.log(res.code);
            if (res.code === "0") {
              this.$router.go(0);
              this.$message.success("修改成功");
            } else if (res.code === "1") {
              this.$message.error("用户未登录");
            } else if (res.code === "2") {
              this.$message.error("保存失败");
            } else {
              console.log(res.code);
              this.$message.error("服务器返回时间间隔过长");
            }
          });
        }
      });
    },
    toMemberList() {
      this.$router.push({
        path: "/team/memberlist",
        query: {
          teamid: this.teamid
        }
      });
    },
    getTeamInfo() {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      let url = this.$urlPath.website.getTeamInfo;
      getData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          //this.$message.success("查询成功");
          this.teaminfo = res.data.teaminfo;
          this.leaderinfo = res.data.leaderinfo;
          this.intro_update = res.data.teaminfo.intro;
          this.teamname_update = res.data.teaminfo.teamname;
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    getTeamDocList() {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      let url = this.$urlPath.website.getTeamDocList;
      getData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          //this.$message.success("查询成功");
          this.teamdoclist = res.data.teamdoclist;
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    addTeamDoc() {
      let params = new URLSearchParams();
      params.append(
        "userid",
        parseInt(window.sessionStorage.getItem("UserId"))
      );
      params.append("teamid", this.teamid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addTeamDoc;
      postData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.$router.push({
            path: "/document",
            query: {
              docid: res.data.docid
            }
          });
          this.$message.success("保存成功");
        } else if (res.code === "1") {
          this.$message.error("用户未登录");
        } else if (res.code === "2") {
          this.$message.error("保存失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    }
  },
  created() {
    this.teamid = this.$route.query.teamid;
    this.getTeamInfo();
    this.getTeamDocList();
  },
  watch: {
    $route() {
      this.teamid = this.$route.query.teamid;
      this.getTeamInfo();
      this.getTeamDocList();
    }
  }
};
</script>

<style>
.mainContext {
  width: 1200px;
  height: auto;
  position: relative;
}
.leftContext {
  float: left;
  width: 700px;
  margin-left: 280px;
  margin-top: 70px;
}
.rightContext {
  float: right;
  width: 110px;
  height: auto;
  margin-top: 100px;
}
.myButton {
  text-align: center;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background-color: #bfa46f;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Verdana;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 16px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #090f00;
  width: 130px;
  position: fixed;
}
.myButton:hover {
  background-color: #c7b370;
}
.myButton:active {
  position: relative;
  top: 1px;
}
</style>
