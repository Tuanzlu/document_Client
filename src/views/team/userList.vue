<template>
  <div style="margin-left:250px" class="list">
    <a-card
      :title="teaminfo.teamname+' 团队成员列表'"
      :bordered="false"
      style="width: 800px;padding:0 0 16px 0"
      headStyle="font-size:20px"
      bodyStyle="font-size:16px;padding-bottom:0"
    >
      <div>
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
          <a-button type="primary" ghost>邀请成员</a-button>
        </a-popover>
        <a-button type="primary" ghost style="margin-left:5px" @click="goback()">返回</a-button>
      </div>
      <a-list-item style="margin-top:10px">
        <a-list-item-meta description="团队创建者">
          <a slot="title">{{ leaderinfo.username }}</a>
          <a-avatar slot="avatar" :src="leaderinfo.userimgpath" />
        </a-list-item-meta>
      </a-list-item>

      <div>
        <a-list item-layout="horizontal" style="margin-top:10px">
          <div v-for="(item, index) in memberlist" :key="index">
            <a-list-item v-if="item.userid!=leaderinfo.userid">
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
          </div>
        </a-list>
      </div>
    </a-card>
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
      searchUser: [],
      leaderinfo: []
    };
  },
  methods: {
    goback() {
      this.$router.push({
        path: "/team",
        query: {
          teamid: this.teamid
        }
      });
    },
    quitTeam(userid) {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      params.append("userid", userid);
      let url = this.$urlPath.website.tickTeam;
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
          this.leaderinfo = res.data.leaderinfo;
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
          this.searchUser = res.data.userList;
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
