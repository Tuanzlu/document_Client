<template>
  <a-layout class="layout">
    <a-layout-header class="header" style="background: #fff">
      <div class="logo">金刚石文档</div>
      <!--<a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          nav 1
        </a-menu-item>
        <a-menu-item key="2">
          nav 2
        </a-menu-item>
        <a-menu-item key="3">
          nav 3
        </a-menu-item>
      </a-menu>-->
      <div class="topRight" style="margin-right:20px">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <img class="avatar" style="width:30px;height:30px" src="../../assets/bg.jpeg" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="#/personInfo">个 人 主 页</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">帮 助 事 项</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#/">退 出 登 录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="230" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="1">
            <router-link to="/personIndex"> <a-icon type="pie-chart" />个人主页 </router-link>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <router-link to="/manage/teamList" tag="div" slot="title"> <a-icon type="user" />团队协作空间 </router-link>
            <a-menu-item key="1-1">
              <router-link to="/manage/teamList">团队列表/文件夹/协作者列表</router-link>
            </a-menu-item>
            <a-menu-item key="1-2">
              <router-link to="/manage/addTeam">
                创建团队
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <!--<a-sub-menu key="sub2">
            <router-link to="/manage/userList" tag="div" slot="title"> <a-icon type="team" />协作者列表 </router-link>
            <a-menu-item key="2-1">
              文档 5
            </a-menu-item>
          </a-sub-menu>-->
        </a-menu>
      </a-layout-sider>

      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  .logo {
    height: 32px;
    line-height: 32px;
    color: black;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    float: left;
  }
}
.topRight {
  float: right;
}
</style>
