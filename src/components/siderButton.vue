<template>
  <div style="float: right;margin-top:100px;margin-right:50px">
            <a-button type="default" @click="createDocument">新建文档</a-button>
            </br>
            </br>
            <a-button type="default" @click="toModel">模版库</a-button>
  </div>
</template>

<script>

import { postData } from "@/api/webpost";
export default {
  data(){
    return {
      userid:parseInt(window.sessionStorage.getItem("UserId")),
    }
  },
  methods:{
    toModel() {
      this.$router.push({
        path:"/model",
        query:{
          teamid:-1
        }
        
      });
    },
    createDocument() {
      let params = new URLSearchParams();

      params.append("userid", this.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addDoc;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.docid = res.data.docid;
          this.$router.push({
            path: "/document",
            query: {
              docid: res.data.docid,
              teamid: -1,
            },
          });
          this.$message.success("保存成功");
        } else if (res.code === "1") {
          this.$message.error("用户未登录");
        } else if (res.code === "2") {
          this.$message.error("保存失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
  }
}
</script>

<style>

</style>