<template>
<div class="mainContext" style="top:0px;">
  <div class="leftContext">
    <a-menu v-model="current" mode="horizontal" > 
        <a-menu-item key="mail"><router-link to="/letter"> <a-icon type="user" />我发起的协作文档 </router-link></a-menu-item>
        <a-menu-item key="add"> <router-link to="/CoopTo"><a-icon type="usergroup-add" />
        我参与的协作文档 </router-link></a-menu-item>
    </a-menu>
        <div>
          <div class="btn_box" style="margin-left:-60px;margin-top:-30px">
            <cards :list="info" v-if="info.length > 0"></cards>
          </div>
        </div>
      </a-menu-item>
    </a-menu>
  </div>
  <div class="rightContext">
    <siderButton></siderButton>
  </div>
</div>
</template>

<script>
import cards from "@/components/wordCard";
import siderButton from "@/components/siderButton";
import { getData } from "@/api/webget";
export default {
  components: {
    cards,siderButton
  },
  data() {
    return {
      info: [],
      current: ['add'],
    };
  },
  props: ["list"],
  methods: {
    getInfo() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      let url = this.$urlPath.website.getOthersCooperateDoc;
      getData(url, params).then((res) => {
        // console.log(res.data.mydeletelist);
        if (res.code === "0") {
          //console.log(res.data);
          for (let i = 0; i < res.data.Otherscolist.length; i++) {
            this.info.push(res.data.Otherscolist[i]);
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
.mainContext{
  width: 1200px;
  height: auto;
  position:relative;
}
.leftContext
{
  float: left;
  width: 700px;
  margin-left: 280px;
  margin-top: 70px;

}
.rightContext
{
  float: right;
  width: 110px;
  height:auto;
  margin-top: 100px;
}
</style>
