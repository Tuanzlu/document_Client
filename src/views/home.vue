<template>
  <div>
    <div class="content">
      <img src="../assets/logo.png" style="height: 100px; width: 300px;" />
      <div class="title">
        陨 石 文 档
      </div>
      <p class="intro">
        在线编辑 协作无间
      </p>
      <div class="myButton" @click="toLogin">开 始 使 用</div>
    </div>
    <div class="footer">
      <div class="aboutUs" @click="toAbout">关于我们</div>
      <span class="bottomTitle">Copyright © 2020 summer-project</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    toAbout() {
      this.$router.push({
        name: "About",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  // border: 2px red solid;
  width: 100%;
  height: 800px;
  background: url("../assets/bg.jpeg") no-repeat center bottom;
  background-size: cover;
}
.footer {
  // border: 2px red solid;
  height: 200px;
  // background-color: rgb(95, 109, 160);
  background-image: linear-gradient(-186deg, #fce2c1 0%, #98623c 100%);
}
.title {
  font-family: 华文新宋;
  // border: 2px red solid;
  font-size: 40px;
  color: #000;
  text-align: center;
  padding-top: 20px;
  background-color: #deb068;
  opacity: 0.8;
  margin: auto;
  margin-top: 100px;
  width: 300px;
  height: 100px;
}
.intro {
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: white;
  background-color: #deb068;
  opacity: 0.8;
  width: 300px;
  height: 60px;
  margin: auto;
}
.startBtn {
  display: block;
  margin: 0 auto;
}
.aboutUs {
  cursor: pointer;
  width: 100px;
  display: block;
  margin: 0 auto;
  padding-top: 30px;
  font-size: 20px;
  color: white;
  // border: 1px solid blue;
}
.bottomTitle {
  // border: 1px solid blue;
  width: 230px;
  color: white;
  margin: 80px auto 0 auto;
  display: block;
}
.myButton {
  box-shadow: inset 0px 1px 0px 0px #fce2c1;
  background-color: #deb068;
  border-radius: 7px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 6px 23px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #000;
  width: 150px;
  text-align: center;
  margin: 40px 0 0 645px;
  height: 40px;
}
.myButton:hover {
  background-color: #c38743;
}
.myButton:active {
  position: relative;
  top: 1px;
}
</style>
