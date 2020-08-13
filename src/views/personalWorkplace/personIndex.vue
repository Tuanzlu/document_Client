<template>
  <div>
    <personNav></personNav>
    <siderNav></siderNav>
    
    <div class="used">
      <router-view></router-view>
    </div>
    <div style="float:right;margin:100px 80px 0 auto">
      <a-button type="default" @click="createDocument">新建文档</a-button></div>
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
  data() {},
  methods: {
    createDocument() {
      let params = new URLSearchParams();
      params.append("title", "无标题");
      params.append("content", "");
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addDoc;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
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
      this.$router.push("/document");
    },
  },
};
</script>

<style>
.used{
  width: 800px;
  margin-top: 30px;
  
  margin-left:250px;
}
</style>
