<template>
  <div class="content">
    <div class="header">
      <div class="top" @click="toIndex"><span class="name">金刚石文档</span></div>
      <div class="topRight">
        <img class="avatar" style="width:30px;height:30px" src="../../assets/bg.jpeg" />
      </div>
      <div class="topRight">
        <a-icon type="bell" style="font-size:25px;margin-top:3px;" />
      </div>
    </div>
    <div class="body">
      <div class="sideMenu">
        <div class="menuItem">
          <div class="fixedItem">
            <div class="text">
              金刚石模版
            </div>
            <a-divider></a-divider>
            <div class="text">
              我的模版
            </div>
          </div>
          <div class="scrollMenu">
            <a-tree :tree-data="treeData" :default-expanded-keys="['0-0']" @select="onSelect"> </a-tree>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="model">
          <div class="titleBar">
            <a-breadcrumb separator=">" class="breadcrumb">
              <a-breadcrumb-item href="www.baidu.com">{{ model.type }}</a-breadcrumb-item>
              <a-breadcrumb-item href="www.baidu.com">{{ model.title }} </a-breadcrumb-item>
            </a-breadcrumb>
            <!-- <span class="title-text">
              {{ model.title }}
            </span>
            <img class="in-img" src="../../assets/bg.jpeg" /> -->
          </div>
          <div class="articleContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMine: false,
      treeData: [
        {
          title: "人文",
          key: "0",
          children: [
            {
              title: "人文模版1",
              key: "0-0",
            },
            {
              title: "人文模版2",
              key: "0-1",
            },
          ],
        },
        {
          title: "科学",
          key: "1",
          children: [
            {
              title: "科学模版1",
              key: "1-0",
            },
            {
              title: "科学模版2",
              key: "1-1",
            },
          ],
        },
      ],
      model: {
        type: "人文",
        title: "人文模版1",
        intro: "非常好用的模版",
        src: require("../../assets/bg.jpeg"),
        key: "0-0",
      },
    };
  },
  methods: {
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
  },
};
</script>
<style lang="scss" scoped>
.title-text {
  margin: auto;
  border: black 1px solid;
}
.in-img {
  border: black 1px solid;
  width: 300px;
  height: 200px;
}
.header {
  width: 100%;
  height: 60px;
  background-color: white;
}
.content {
  bottom: 0;
  top: 60px;
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
.btn {
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 0 5px 0 5px;
  padding: 0 5px 0 5px;
}
.sideMenu {
  background-color: #f7f7f7;
  width: 230px;
  padding: 0;
  position: fixed;
  top: 60px;
  bottom: 0;
  border-right: rgb(190, 189, 189) solid 1px;
}
.main {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 230px;
  width: 100%;
  overflow: scroll;
  background-color: #f7f7f7;
}
.body {
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f7f7f7;
}
.text {
  // border: 1px solid red;
  text-align: left;
  margin: 5px auto 5px 15px;
  width: 80px;
}
.menuItem {
  margin: 10px auto 0 auto;
  // border: 1px solid blue;
  width: 170px;
  height: 500px;
}
.fixedItem {
  // border: 1px solid blue;
  margin-top: 20px;
  position: fixed;
  top: 60px;
  left: 0;
  width: 200px;
}
.scrollMenu {
  position: fixed;
  top: 200px;
  left: 0;
  bottom: 0;
  width: 200px;
  overflow: scroll;
}
.breadcrumb {
  margin: 30px;
  font-size: 18px;
}
.articleContent {
  height: 800px;
  margin-left: 200px;
  margin-top: 180px;
  left: 230px;
  bottom: 0;
  width: 100%;
  overflow: scroll;
  // border: blue solid 1px;
}
.titleBar {
  height: 180px;
  position: fixed;
  top: 60px;
  left: 230px;
  bottom: 0;
  width: 100%;
  // border: red 1px solid;
}
</style>
