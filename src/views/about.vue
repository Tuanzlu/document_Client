<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
        <font size="4">陨石文档_关于我们</font>
      </a-layout-header>
      <a-layout-content>
        <font size="6">我们来自BUAA</font>
        <p>
          <img src="../assets/map.png" width="60%" alt />
          <br />
          <img src="../assets/buaa.jpeg" style="width:50px;height:50px" />
          <font size="4">地址:北京市海淀区学院路37号 邮编:100191</font>
        </p>
        <a-divider />
        <font size="6">开发者</font>
        <div>
          <a-row justify="center">
            <a-col :span="2"></a-col>
            <a-col :span="4">
              <img src="../assets/avatar_lqy.jpg" style="width:90px;height:90px" />
              <br />陆清媛
            </a-col>
            <a-col :span="4">
              <img src="../assets/avatar_gyy.jpg" style="width:90px;height:90px" />
              <br />高雨瑶
            </a-col>
            <a-col :span="4">
              <img src="../assets/avatar_lrm.jpg" style="width:90px;height:90px" />
              <br />李睿明
            </a-col>
            <a-col :span="4">
              <img src="../assets/avatar_lmz.jpg" style="width:90px;height:90px" />
              <br />梁茂智
            </a-col>
            <a-col :span="4">
              <img src="../assets/avatar_zht.jpg" style="width:90px;height:90px" />
              <br />张浩天
            </a-col>
          </a-row>
        </div>
        <a-divider />
        <div>
          <font size="4">2020暑假软件工程实践项目</font>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <router-link to="/">
          <font size="4">返回登录</font>
        </router-link>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fce2c1;
  /*color: #fff;*/
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  /*background: rgba(16, 142, 233, 1);*/
  background: #fff;
  /*color: #fff;*/
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>