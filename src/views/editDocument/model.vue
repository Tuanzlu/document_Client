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
          <div class="text">
            金刚石模版
          </div>
          <a-divider></a-divider>
          <div class="text">
            我的模版
          </div>
          <a-divider></a-divider>
          <a-anchor :affix="false">
            <a-anchor-link href="#test1" title="test1" />
            <a-anchor-link href="#test2" title="test2" />
          </a-anchor>
        </div>
      </div>
      <div class="main">
        <div class="offeredModel" v-if="!isMine">
          <div id="offered">
            <h3>最近更新</h3>
            <a-divider></a-divider>
            <modelCard :list="list"></modelCard>
          </div>
          <div id="test1">
            <h3>test1</h3>
            <a-divider></a-divider>
            <modelCard :list="list"></modelCard>
          </div>
          <div id="test2">
            <h3>test2</h3>
            <a-divider></a-divider>
            <modelCard :list="list"></modelCard>
          </div>
        </div>
        <div class="myModel" v-else>
          <div class="cardList">
            <div class="singleCard" v-for="(item, i) in list" :key="i">
              <a-card class="card">
                <img
                  slot="cover"
                  :src="item.src"
                  alt="example"
                  style="width:180px;height:150px;margin:10px auto -20px auto"
                />
                <span
                  ><h3>{{ item.title }}</h3></span
                >
              </a-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modelCard from "@/components/modelCard.vue";
export default {
  components: {
    modelCard,
  },
  data() {
    return {
      isMine: false,
      list: [
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
        {
          src: require("../../assets/bg.jpeg"),
          title: "模版",
        },
      ],
    };
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
  left: 200px;
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
  margin: 5px auto -10px 15px;
  width: 80px;
}
.menuItem {
  margin: 10px auto 0 auto;
  // border: 1px solid blue;
  width: 170px;
  height: 500px;
}
#offered {
  margin: 50px;
  height: 500px;
}
#test1 {
  margin: 100px 0 50px 50px;
  height: 500px;
}
#test2 {
  margin: 100px 0 50px 50px;
  height: 500px;
}
</style>
