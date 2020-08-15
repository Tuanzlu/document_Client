<template>
  <div style="margin-left: 300px;" class="folder">
    <h2>{{ teaminfo.teamname }} 的团队空间</h2>
    <p>{{ teaminfo.intro }}</p>
    <p>
      <router-link :to="{ path: '/team/memberlist', query: { teamid: this.teamid } }">
        <a-icon type="team" />成员列表
      </router-link>
    </p>
    <h3>团队文档</h3>
    <a-divider></a-divider>
    <modelCard :list="teamdoclist"></modelCard>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import modelCard from "@/components/modelCard.vue";

export default {
  components: {
    modelCard,
  },
  data() {
    return {
      teamid: 0,
      teaminfo: {},
      teamdoclist: [],
    };
  },
  methods: {
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
  },
  mounted() {
    this.teamid = this.$route.query.teamid;
    console.log(this.teamid);
    this.getTeamInfo();
    this.getTeamDocList();
  },
};
</script>

<style>
.folder {
  width: 1000px;
}
</style>
