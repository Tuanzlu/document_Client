<template>
  <div class="cardList">
    <div class="singleCard" v-for="(item, i) in list" :key="i">
      <a-card class="card" hoverable>
        <img
          slot="cover"
          src="@/assets/pic4.jpg"
          alt="example"
          style="width: 130px; height: 130px; margin: 5px auto -20px auto;"
          @click="toSingleModel(item.templateid)"
        />
        <template slot="actions" class="ant-card-actions">
          <a-icon key="edit" type="edit" @click="addDoc(item.templateid)" />
          <a-icon key="delete" type="delete" @click="deleteTemplate(item.templateid)" />
        </template>
        <a-card-meta style="margin:0px auto -10px auto" :title="item.title" @click="toSingleModel(item.templateid)">
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script>
import { postData } from "@/api/webpost";

import { deleteData } from "@/api/webdelete";
export default {
  props: ["list", "teamidP"],
  data() {
    return {
      teamid: -1,
      modelList: [],
      userid: parseInt(window.sessionStorage.getItem("UserId")),
    };
  },
  methods: {
    addDoc(id) {
      if (this.teamid == -1) {
        this.addDocByTemplate(id);
      } else {
        this.addTeamDocByTemplate(id);
      }
    },
    toSingleModel(templateid) {
      this.$router.push({
        path: "/singlemodel",
        query: {
          templateid: templateid,
          teamid: this.teamid,
        },
      });
    },
    deleteTemplate(templateid) {
      let params = new URLSearchParams();
      params.append("templateid", templateid);
      params.append("userid", this.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.deleteTemplate;
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log("删除成功");
          this.$parent.getMyTemplateList();
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //团队基于模版创建文档
    addTeamDocByTemplate(templateid) {
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("templateid", templateid);
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
    addDocByTemplate(templateid) {
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("templateid", templateid);
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
  watch: {
    list: function(newVal) {
      this.modelList = newVal;
    },
    teamidP: function(newVal) {
      this.teamid = newVal;
    },
  },
};
</script>
<style lang="scss" scoped>
.singleCard {
  display: block;
  float: left;
  margin: 25px;
}
.cardList {
  max-height: 500px;
  width: 800px;
  margin: 30px 60px 30px 60px;
}
.card {
  text-align: center;
  // height: 180px;
  width: 180px;
}
</style>
