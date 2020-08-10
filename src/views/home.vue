<template>
  <div>
    <div class="content">
      <div class="title">
        金刚石文档
      </div>
      <p class="intro">
        在线编辑
      </p>
      <a-button type="default" class="startBtn" @click="Index">开始使用</a-button>
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
    Login() {
      this.$router.push({
        name: "Index",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  // border: 2px red solid;
  width: 100%;
  height: 1000px;
  background: url("../assets/bg.jpeg") no-repeat center bottom;
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
</style>
