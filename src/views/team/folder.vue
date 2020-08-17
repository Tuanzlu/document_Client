<template>
  <div class="folder">
    <div>
      <h2>{{ teaminfo.teamname }} 的团队空间</h2>
      <p>{{ teaminfo.intro }}</p>
      <p>
        <router-link :to="{ path: '/team/memberlist', query: { teamid: this.teamid } }">
          <a-icon type="team" />成员列表
        </router-link>
      </p>
      <h3>团队文档</h3>
    </div>
    <div class="btn">
      <a-button type="default" @click="addTeamDoc">创建团队文档</a-button>
       </br>
       </br>
      <a-button type="default" @click="toModel">团队模板库</a-button>
    </div>
    <div>
      <a-divider></a-divider>
      <wordCard style="margin:-20px 0 0 -85px" :list="teamdoclist"></wordCard>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import { postData } from "@/api/webpost";
import wordCard from "@/components/wordCard.vue";

export default {
  components: {
    wordCard,
  },
  data() {
    return {
      teamid: 0,
      teaminfo: {},
      teamdoclist: [],
    };
  },
  methods: {
    toModel() {
      console.log(this.teamid);
      this.$router.push({
        path: "/model",
        query: {
          teamid: this.teamid,
        },
      });
    },
    getTeamInfo() {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      let url = this.$urlPath.website.getTeamInfo;
      getData(url, params).then((res) => {
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
    getTeamDocList() {
      let params = new URLSearchParams();
      params.append("teamid", this.teamid);
      let url = this.$urlPath.website.getTeamDocList;
      getData(url, params).then((res) => {
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
      params.append("userid", parseInt(window.sessionStorage.getItem("UserId")));
      params.append("teamid", this.teamid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addTeamDoc;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$router.push({
            path: "/document",
            query: {
              docid: res.data.docid,
            },
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
    },
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
    },
  },
};
</script>

<style>
.btn {
  margin-top: -100px;
  float: right;
  width: 100px;
}
.folder {
  width: 1000px;
  margin-left: 300px;
}
</style>
