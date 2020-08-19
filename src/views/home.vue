<template>
  <div>
    <div class="content">
      <img src="../assets/logo.png"/>
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
  background-size:cover;
}
.footer {
  // border: 2px red solid;
  height: 200px;
  // background-color: rgb(95, 109, 160);
  background-image: linear-gradient(-186deg, #fff 0%, #a6c8b2 100%);
}
.title {
  // border: 2px red solid;
  font-size: 40px;
  color: #000;
  text-align: center;
  padding-top: 20px;
  background-color: #a6c8b2;
  opacity:0.8;
  margin-left: 500px;
  width: 300px;
  height: 100px;
}
.intro {
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: white;
  background-color: #a6c8b2;
  opacity:0.7;
  width: 300px;
  height: 60px;
  margin-left: 500px;
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
  color: black;
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
	box-shadow: 0px 10px 14px -7px #3e7327;
	background:linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
	background-color:#77b55a;
	border-radius:4px;
	border:1px solid #4b8f29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:16px;
	font-weight:bold;
	padding:6px 12px;
	text-decoration:none;
	text-shadow:0px 1px 0px #5b8a3c;
  width: 150px;
  text-align:center;
  margin-left: 580px;
  height: 40px;
}
.myButton:hover {
	background:linear-gradient(to bottom, #72b352 5%, #77b55a 100%);
	background-color:#72b352;
}
.myButton:active {
	position:relative;
	top:1px;
}


</style>
