<template>
  <div style="float:right;width:70%">
    <h2>创建新的团队</h2>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="teamnname">
        <a-input
          v-model="teamname"
          v-decorator="['teamname', { rules: [{ required: true, message: 'Please input your teamname!' }] }]"
        />
      </a-form-item>
      <a-form-item label="intro">
        <a-textarea
          v-model="intro"
          v-decorator="['intro', { rules: [{ required: true, message: 'Please input your intro!' }] }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { postData } from "@/api/webpost";

export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "addtime" }),
      teamname: "name",
      intro: "intro",
      teamid: 0
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          let userId = parseInt(window.sessionStorage.getItem("UserId"));
          let params = new URLSearchParams();
          params.append("userid", userId);
          params.append("teamname", this.teamname);
          params.append("intro", this.intro);
          let url = this.$urlPath.website.addTeam;
          postData(url, params).then(res => {
            console.log(res.code);
            if (res.code === "0") {
              this.teamid = res.data.teamid;
              this.$router.push({
                path: "/team",
                query: {
                  teamid: this.teamid
                }
              });
              this.$message.success("创建成功");
            } else if (res.code === "1") {
              this.$message.error("用户未登录");
            } else if (res.code === "2") {
              this.$message.error("保存失败");
            } else {
              console.log(res.code);
              this.$message.error("服务器返回时间间隔过长");
            }
          });
        }
      });
    }
  }
};
</script>
<style>
</style>