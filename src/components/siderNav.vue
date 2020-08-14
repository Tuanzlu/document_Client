<template>
  <div class="toleft">
    <a-menu mode="inline" :open-keys="openKeys" style="width: 230px" @openChange="onOpenChange">
      <a-menu-item key="1"> <a-icon type="edit" />工作台<router-link to="/used"></router-link> </a-menu-item>
      <a-menu-item key="2"> <a-icon type="mail" />收件箱<router-link to="/letter"></router-link> </a-menu-item>
      <a-menu-item key="3"> <a-icon type="appstore" />我的桌面<router-link to="/table"></router-link> </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="team" /> <span>团队空间</span></span>
        <a-menu-item v-for="item in team" :key="item.teamid">
          <router-link :to="{path: '/team' , query:{teamid:item.teamid}}">{{ item.teamname }}</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="5"> <a-icon type="delete" />回收站<router-link to="/rubish"></router-link> </a-menu-item>
      <a-menu-item key="6"> <a-icon type="question" />帮助中心 </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
export default {
  data() {
    return {
      team: [],
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      current: ["mail"],
    };
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    getTeam() {
      let params = new URLSearchParams();
      let userid = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userid);
      //调用封装的getData函数，获取服务器返回值
      let url = this.$urlPath.website.getMyJoinedTeam;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log("查询团队成功");
          // this.$message.success("查询成功");
          this.team = res.data.joinlist;
        } else if (res.code === "1") {
          this.$message.error("用户未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
  },
  mounted() {
    this.getTeam();
  },
};
</script>

<style>
.toleft {
  position: fixed;
  width: 230px;
  top: 60px;
  bottom: 0;
  margin-right: 100px;
  /*background-color: #7f7f7f;*/
}
</style>
