<template>
  <div class="content">
    <div class="header">
      <div class="top" @click="toIndex"><span class="name">金刚石文档</span></div>
      <div class="topRight">
        <img class="avatar" style="width: 30px; height: 30px;" src="../../assets/bg.jpeg" />
      </div>
      <div class="topRight">
        <a-icon type="bell" style="font-size: 25px; margin-top: 3px;" />
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
        </div>
      </div>
      <div class="main">
        <div class="offeredModel" v-if="!isMine">
          <div id="offered">
            <h3>最近更新</h3>
            <a-divider></a-divider>
            <modelCard :list="modelList"></modelCard>
          </div>
        </div>
        <div class="myModel" v-else>
          <modelCard :list="myModelList" :childrenEvent="parentEvent"></modelCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
// import { putData } from "@/api/webput";
// import { postData } from "@/api/webpost";
// import { deleteData } from "@/api/webdelete";
import modelCard from "@/components/modelCard.vue";
export default {
  components: {
    modelCard,
  },
  data() {
    return {
      userid: parseInt(window.sessionStorage.getItem("UserId")),
      isMine: true,
      modelList: [],
      myModelList: [],
    };
  },
  methods: {
    toIndex() {
      this.$router.push("/personIndex");
    },
    //获取我的模版列表
    getMyTemplateList() {
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getMyTemplateList;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.myModelList = res.data.myTemplateList;
          console.log("获取我的模版成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    parentEvent(data) {
      this.myModelList = data;
      console.log(this.myModelList);
    },
  },
  mounted() {
    this.getMyTemplateList();
  },
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
  cursor: pointer;
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
