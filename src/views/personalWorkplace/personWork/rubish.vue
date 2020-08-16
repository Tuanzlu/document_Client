<template>
  <div style="float:right;width:70%">
    <a-menu v-model="mail" mode="horizontal">
      <a-menu-item key="mail"> <a-icon type="delete" />回收站 </a-menu-item>
    </a-menu>
        <div class="btn_box">
          <cards :list="info"  v-if="info.length > 0"></cards>
        </div>
    
  </div>
</template>

<script>
import cards from "@/components/rubishCard";
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
      let url = this.$urlPath.website.getMyDeleteDoc;
      getData(url, params).then((res) => {
        // console.log(res.data.mydeletelist);
        if (res.code === "0") {
          //console.log(res.data);
          for (let i = 0; i < res.data.mydeletelist.length; i++) {
            this.info.push(res.data.mydeletelist[i]);
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
