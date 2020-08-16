<template>
  <div class="cardList">
    <div class="singleCard" v-for="(item, i) in list" :key="i">
<<<<<<< HEAD
=======
<<<<<<< HEAD
      <a-card class="card">
        <img slot="cover" src="../assets/bg.jpeg" alt="example" style="width:180px;height:150px;margin:10px auto -20px auto" />
        <span
          ><h3>{{ item.title }}</h3></span
        >
=======
>>>>>>> personWorkspace
      <a-card class="card" hoverable>
        <img
          slot="cover"
          src="@/assets/pic4.jpg"
          alt="example"
          style="width: 130px; height: 130px; margin: 5px auto -20px auto;"
          @click="toSingleModel(item.templateid)"
        />
        <template slot="actions" class="ant-card-actions">
          <a-icon key="edit" type="edit" @click="addDocByTemplate(item.templateid)" />
          <a-icon key="delete" type="delete" @click="deleteTemplate(item.templateid)" />
        </template>
        <a-card-meta style="margin:0px auto -10px auto" :title="item.title" @click="toSingleModel(item.templateid)">
        </a-card-meta>
<<<<<<< HEAD
=======
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
>>>>>>> personWorkspace
      </a-card>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { getData } from "@/api/webget";
import { deleteData } from "@/api/webdelete";
export default {
  props: ["list"],
=======
<<<<<<< HEAD
export default {
  props: ["list"],
=======
import { getData } from "@/api/webget";
import { deleteData } from "@/api/webdelete";
export default {
  props: ["list"],
>>>>>>> personWorkspace
  data() {
    return {
      modelList: [],
      userid: parseInt(window.sessionStorage.getItem("UserId")),
    };
  },
  methods: {
    toSingleModel(templateid) {
      this.$router.push({
        path: "/singlemodel",
        query: {
          templateid: templateid,
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
    //基于模版创建文档
    addDocByTemplate(templateid) {
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("templateid", templateid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addDocByTemplate;
      getData(url, params).then((res) => {
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
  },
<<<<<<< HEAD
=======
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
>>>>>>> personWorkspace
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
  overflow: scroll;
=======
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
>>>>>>> personWorkspace
  width: 800px;
  margin: 30px 60px 30px 60px;
}
.card {
  text-align: center;
<<<<<<< HEAD
  // height: 180px;
  width: 180px;
=======
<<<<<<< HEAD
  height: 200px;
  width: 200px;
=======
  // height: 180px;
  width: 180px;
>>>>>>> 8876c10619cc86aec0a53236e585ce5bfdfc512c
>>>>>>> personWorkspace
}
</style>
