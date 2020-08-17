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
          <div class="text" v-if="teamid != -1">
            团队模版
          </div>
          <div class="text" v-else>
            我的模版
          </div>
        </div>
      </div>
      <div class="main">
        <div class="model">
          <div class="add-btn"><a-button type="default" @click="addDoc">使用此模版</a-button></div>
          <div class="title-bar">{{ template.title }}11</div>
          <div class="article-content" v-html="template.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
// import { putData } from "@/api/webput";
import { postData } from "@/api/webpost";
// import { deleteData } from "@/api/webdelete";
export default {
  data() {
    return {
      userid: parseInt(window.sessionStorage.getItem("UserId")),
      template: {
        templateid: this.$route.query.templateid,
        title: "",
        content: "",
      },
      teamid: -1,
    };
  },
  created() {
    this.templateid = this.$route.query.templateid;
    this.teamid = this.$route.query.teamid;
    console.log("test" + this.teamid);
    this.getTemplateByTemplateid();
    console.log(this.template);
  },
  methods: {
    addDoc() {
      if (this.teamid == -1) {
        this.addDocByTemplate();
      } else {
        this.addTeamDocByTemplate();
      }
    },
    toIndex() {
      this.$router.push("/personIndex");
    },
    //查看模版
    getTemplateByTemplateid() {
      let params = new URLSearchParams();
      params.append("templateid", this.templateid);
      //调用封装的puttData函数，获取服务器返回值
      let url = this.$urlPath.website.getTemplateByTemplateid;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.template.title = res.data.title;
          this.template.content = res.data.content;
          console.log(this.template);
          console.log("查看模版成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //团队基于模版创建文档
    addTeamDocByTemplate() {
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("templateid", this.template.templateid);
      params.append("teamid", this.teamid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addTeamDocByTemplate;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$router.push({
            path: "/document",
            query: {
              docid: res.data.docid,
            },
          });
          console.log("基于模版创建文档成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //个人基于模版创建文档
    addDocByTemplate() {
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("templateid", this.template.templateid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addDocByTemplate;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$router.push({
            path: "/document",
            query: {
              docid: res.data.docid,
            },
          });
          console.log("基于模版创建文档成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: white;
}
.text {
  // border: 1px solid red;
  text-align: left;
  margin: 5px auto -10px 15px;
  width: 80px;
  font-size: 16px;
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
  z-index: 99;
  // border: 1px solid blue;
  border-right: rgb(190, 189, 189) solid 1px;
}
.menuItem {
  margin: 10px auto 0 auto;
  // border: 1px solid blue;
  width: 170px;
  height: 500px;
}
.main {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 230px;
  width: 100%;
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
  font-size: 16px;
}
.article-content {
  border: blue 1px solid;
  height: 800px;
  width: 616px;
  margin: auto;
}
.title-bar {
  font-weight: 800;
  font-size: 20px;
  padding-top: 60px;
  margin: auto;
  width: 616px;
  height: 120px;
  // border: red 1px solid;
}
.add-btn {
  // border: red 1px solid;s
  float: right;
  margin-top: 60px;
}
.main {
  position: fixed;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 200px;
  width: 100%;
  overflow: scroll;
  // border: red 1px solid;
}
.model {
  // border: red 1px solid;
  width: 1000px;
  min-height: 800px;
  margin-left: 150px;
}
</style>
