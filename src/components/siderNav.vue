<template>
  <div class="toleft">
    <a-menu
      mode="inline"
      :open-keys="openKeys"
      style="width: 230px;color:#281a14;background-color:#dcd3b2;"
      @openChange="onOpenChange"
      @click="handleClick"
    >
      <a-menu-item key="1" id="id1">
        <a-icon type="edit" />工作台
        <router-link to="/used"></router-link>
      </a-menu-item>
      <a-menu-item key="2" id="id2">
        <a-icon type="mail" />收件箱
        <router-link to="/letter" style="color:#f8f4e6;background-color:#839b5c;"></router-link>
      </a-menu-item>
      <a-sub-menu key="sub1" id="id3">
        <span slot="title">
          <a-icon type="team" />
          <span>团队空间</span>
        </span>
        <a-menu-item>
          <router-link to="/addteam">
            <a-icon type="plus" />新的团队
          </router-link>
        </a-menu-item>
        <a-menu-item v-for="item in team" :key="item.teamid" @click="judge">
          <router-link :to="{ path: '/team', query: { teamid: item.teamid } }">{{ item.teamname }}</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="5" id="id5">
        <a-icon type="delete" />回收站
        <router-link to="/rubish"></router-link>
      </a-menu-item>
      <a-menu-item key="6" id="id6">
        <a-icon type="question" />帮助中心
        <router-link to="/help"></router-link>
      </a-menu-item>
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
      ifClick: false
    };
  },
  methods: {
    judge() {
      this.ifClick = true;
    },
    handleClick(e) {
      console.log("click ", e);
      if (parseInt(e.key) !== 4 && this.ifClick === false) {
        document.getElementById("id" + e.key).style.color = "#f8f4e6";
        document.getElementById("id" + e.key).style.backgroundColor = "#ae7c58";
      }
      if (this.ifClick === true) {
        this.ifClick = false;
        document.getElementById("id" + 3).style.color = "#f8f4e6";
        document.getElementById("id" + 3).style.backgroundColor = "#ae7c58";
        for (let i = 1; i <= 6; i++) {
          if (i === 4) continue;
          console.log(e.key, i);
          if (i !== 3) {
            document.getElementById("id" + i).style.color = "#281a14";
            document.getElementById("id" + i).style.backgroundColor = "#dcd3b2";
          }
        }
      } else {
        this.ifClick = false;
        for (let i = 1; i <= 6; i++) {
          if (i === 4) continue;
          console.log(e.key, i);
          if (parseInt(e.key) !== i) {
            document.getElementById("id" + i).style.color = "#281a14";
            document.getElementById("id" + i).style.backgroundColor = "#dcd3b2";
          }
        }
      }
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        //点击打开时
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        document.getElementById("id" + 3).style.color = "#f8f4e6";
        document.getElementById("id" + 3).style.backgroundColor = "#ae7c58";
        for (let i = 1; i <= 6; i++) {
          if (i === 3) continue;
          document.getElementById("id" + i).style.color = "#281a14";
          document.getElementById("id" + i).style.backgroundColor = "#dcd3b2";
        }
      }
    },
    getTeam() {
      let params = new URLSearchParams();
      let userid = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userid);
      //调用封装的getData函数，获取服务器返回值
      let url = this.$urlPath.website.getMyJoinedTeam;
      getData(url, params).then(res => {
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
    }
  },
  mounted() {
    document.getElementById("id" + 1).style.color = "#f8f4e6";
    document.getElementById("id" + 1).style.backgroundColor = "#ae7c58";
    this.getTeam();
  },
  watch: {
    $route() {
      this.getTeam();
    }
  }
};
</script>

<style>
.ant-menu-sub.ant-menu-inline {
  background-color: #ccc6af;
}
.toleft {
  position: fixed;
  height: auto;
  width: 230px;
  top: 59px;
  bottom: 0;
  margin-right: 100px;
  background-color: #dcd3b2;
}
</style>
