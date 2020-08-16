<template>
  <div style="float:right;width:70%">
    <a-menu v-model="mail" mode="horizontal">
      <a-menu-item key="mail"><router-link to="/letter"> <a-icon type="user" />我发起的协作文档 </router-link></a-menu-item>
      <a-menu-item key="add"> <router-link to="/CoopTo"><a-icon type="usergroup-add" />
      我参与的协作文档 </router-link></a-menu-item>
    </a-menu>
        <div class="btn_box">
          <cards :list="info"  v-if="info.length > 0"></cards>
        </div>
  </div>
</template>

<script>
import cards from "@/components/wordCard";
import { getData } from "@/api/webget";
export default {
  components: {
    cards,
  },
  data() {
    return {
      info: [],
    };
  },
  props: ["list"],
  methods: {
    getInfo() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getMyCooperateDoc;
      getData(url, params).then((res) => {
        // console.log(res.data.mydeletelist);
        if (res.code === "0") {
          //console.log(res.data);
          for (let i = 0; i < res.data.Mycolist.length; i++) {
            this.info.push(res.data.Mycolist[i]);
          }
          console.log(this.info);
          this.$refs.list = this.info;
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style>
.btn_box {
  /*background-color: #7f7f7f;*/
  width: 740px;
  margin-left: 20px;
}
</style>
