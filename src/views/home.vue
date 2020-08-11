<template>
  <div>
    <div class="content">
      <div class="title">
        金刚石文档
      </div>
      <p class="intro">
        在线编辑
      </p>
      <a-button type="default" class="startBtn" @click="toLogin">开始使用</a-button>
    </div>
    <div class="footer">
      <div class="aboutUs" @click="toAbout">关于我们</div>
      <span class="bottomTitle">Copyright © 2020 summer-project</span>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data() {
    return {};
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "Index",
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
}
.footer {
  // border: 2px red solid;
  height: 200px;
  // background-color: rgb(95, 109, 160);
  background-image: linear-gradient(-186deg, #0d1b35 0%, #3d65de 100%);
}
.title {
  // border: 2px red solid;
  font-size: 40px;
  color: white;
  text-align: center;
  padding-top: 200px;
}
.intro {
  line-height: 50px;
  text-align: center;
  font-size: 24px;
  color: white;
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
</style>
