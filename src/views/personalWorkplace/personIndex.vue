<template>
<div>
    <personNav></personNav>
    <siderNav></siderNav>
    <div style="float:right;margin:100px 80px 0 auto">
      <a-button type="default" @click="createDocument">新建文档</a-button>
    </div>
      <router-view></router-view>
</div>
    
</template>

<script>
import { postData } from "@/api/webpost";
import personNav from "@/components/personNav";
import siderNav from "@/components/siderNav";
export default {
  components: {
    personNav,
    siderNav,
  },
  data() {
    return {
      docidnum: 0,
      userid: parseInt(window.sessionStorage.getItem("UserId")),
    };
  },
  methods: {
    createDocument() {
      let params = new URLSearchParams();

      params.append("userid", this.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addDoc;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.docidnum = res.data.docid;
          this.$router.push({
            path: "/document",
            query: {
              docidnum: res.data.docid,
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
  },
};
</script>

<style></style>
