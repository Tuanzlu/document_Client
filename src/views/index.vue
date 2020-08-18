<template>
  <div class="content">
    <div class="header">
      <div class="top" @click="toIndex"><span class="name">金刚石文档</span></div>
      <div class="topRight">
        <a-input-search class="searchBar" placeholder="搜索文件" @search="onSearch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: white;
}
.content {
  min-height: 800px;
  background-color: #f7f7f7;
}
.top {
  float: left;
  margin: 15px 10px 0 10px;
}
.topRight {
  float: right;
  margin: 15px 10px 0 10px;
}

.name {
  text-align: center;
  width: 100px;
  font-size: 20px;
  height: 100%;
  margin: 15px;
}
.searchBar {
  width: 200px;
  margin: 0;
}
</style>
