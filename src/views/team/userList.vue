<template>
  <div style="margin-left:300px" class="list">
    <h2>
      {{ teaminfo.teamname }}团队 &nbsp;成员列表
      <span v-if="!isleader">
        <a-button type="danger" ghost @click="showDeleteConfirm_Member">退出团队</a-button>
      </span>
      <span v-else>
        <a-button type="danger" ghost @click="showDeleteTeamConfirm">解散团队</a-button>
      </span>
    </h2>
    <a-popover title="邀请成员加入团队" trigger="click" placement="bottomLeft" v-if="isleader">
      <template slot="content">
        <a-input-search
          style="width:550px"
          placeholder="输入用户名搜索用户"
          v-model="searchWord"
          @search="handleSearch"
        />
        <a-list item-layout="horizontal" :data-source="searchUser">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-button
              slot="actions"
              type="primary"
              ghost
              size="small"
              @click="inviteTeamMemberByUserId(item.userid)"
            >发送邀请</a-button>
            <a-list-item-meta>
              <span slot="title">{{ item.username }}</span>
              <a-avatar slot="avatar" :src="item.userimgpath" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </template>
      <a-button type="primary" ghost block>邀请成员</a-button>
    </a-popover>
    <a-divider></a-divider>
    <div>
      <a-list item-layout="horizontal">
        <a-list-item v-for="(item, index) in memberlist" :key="index">
          <!-- <a-select
          slot="actions"
          :default-value="item.teamperms"
          style="width: 120px"
          @change="handleChange"
          :disabled="!isleader"
        >
          <a-select-option :value="1">只能阅读</a-select-option>
          <a-select-option :value="2">可以评论</a-select-option>
          <a-select-option :value="3">可以编辑</a-select-option>
          </a-select>-->

          <a-radio-group
            @change="alterMemberPerms($event, index)"
            slot="actions"
            :default-value="item.teamperms"
            :disabled="!isleader"
          >
            <a-radio-button :value="1">只能阅读</a-radio-button>
            <a-radio-button :value="2">可以评论</a-radio-button>
            <a-radio-button :value="3">可以编辑</a-radio-button>
          </a-radio-group>

          <a-button
            slot="actions"
            type="danger"
            ghost
            v-if="isleader"
            @click="showDeleteConfirm(index)"
          >踢出团队</a-button>

          <a-list-item-meta>
            <a slot="title">{{ item.username }}</a>
            <a-avatar slot="avatar" :src="item.userimgpath" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import { deleteData } from "@/api/webdelete";
import { postData } from "@/api/webpost";
export default {
  data() {
    return {
      teamid: "",
      memberlist: [],
      isleader: false,
      teaminfo: "",
      searchUser: []
    };
  },
  methods: {
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
    showDeleteConfirm(index) {
      let that = this;
      this.$confirm({
        title: "踢出团队确认",
        content: "你确认要将该成员踢出团队吗？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.quitTeam(that.memberlist[index].userid);
        },
        onCancel() {}
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
    quitTeam(userid) {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      params.append("userid", userid);
      let url = this.$urlPath.website.quitTeam;
      deleteData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("已踢出团队");
          this.getTeamMemberList();
        } else if (res.code === "1") {
          this.$message.error("成员不在团队中");
        } else if (res.code === "2") {
          this.$message.error("团队队长不能退出");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
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
          this.$router.push("/personIndex");
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    alterMemberPerms(e, index) {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      params.append("userid", this.memberlist[index].userid);
      params.append("teamperms", e.target.value);
      let url = this.$urlPath.website.alterMemberPerms;
      putData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("修改成功");
        } else if (res.code === "1") {
          this.$message.error("权限参数错误");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    getTeamMemberList() {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      let url = this.$urlPath.website.getTeamMemberList;
      getData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.memberlist = res.data.memberlist;
          this.isleader =
            res.data.leaderid ===
            parseInt(window.sessionStorage.getItem("UserId"));
          //this.$message.success("查询成功");
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
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
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    handleSearch() {
      this.getUserByUsername();
    },

    //通过用户名查找用户
    getUserByUsername() {
      let params = new URLSearchParams();
      params.append("username", this.searchWord);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getUserByUsername;
      getData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.searchUser = [res.data.user];
          console.log("查询成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有符合条件的用户");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    inviteTeamMemberByUserId(userid) {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      params.append("userid", userid);
      let url = this.$urlPath.website.inviteTeamMemberByUserId;
      postData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("邀请成功，等待对方同意");
        } else if (res.code === "1") {
          this.$message.error("用户已在团队中");
        } else if (res.code === "2") {
          this.$message.error("已经邀请过该用户，等待同意");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    }
  },
  created() {
    this.teamid = this.$route.query.teamid;
    this.getTeamMemberList();
    this.getTeamInfo();
  }
};
</script>

<style>
.list {
  width: 600px;
}
</style>
