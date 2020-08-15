<template>
  <div class="cardList">
    <div class="singleCard" v-for="(item, i) in list" :key="i" @click="toSingleModel(item.templateid)">
      <a-popover>
        <div slot="content">
          <div @click="useTemplate(item.templateid)" style="cursor:pointer">
            使用此模版创建文档
          </div>
          <div @click="deleteList(item.templateid)" style="cursor:pointer">
            删除模版
          </div>
        </div>
        <a-card class="card">
          <img
            slot="cover"
            src="@/assets/pic4.jpg"
            alt="example"
            style="width:130px;height:130px;margin:10px auto -20px
        auto"
          />
          <span>
            <h3>{{ item.title }}</h3>
          </span>
        </a-card>
      </a-popover>
    </div>
  </div>
</template>

<script>
import { deleteData } from "@/api/webdelete";
export default {
  props: ["list"],
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
    deleteList(id) {
      this.deleteTemplate(id);
      this.$emit("childrenEvent", this.modelList);
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

          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    useTemplate() {
      console.log("使用成功");
    },
  },

  watch: {
    list: function(newVal) {
      this.modelList = newVal;
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
  height: 180px;
  width: 180px;
}
</style>
