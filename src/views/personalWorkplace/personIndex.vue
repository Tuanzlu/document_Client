<template>
  <div>
    <div>
      <div>
        <personNav></personNav>
        <siderNav></siderNav>
      </div>
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
      docid: 0,
      userid: parseInt(window.sessionStorage.getItem("UserId")),
    };
  },
  methods: {
    toModel() {
      this.$router.push("/model");
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
