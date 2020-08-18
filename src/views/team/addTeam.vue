<template>
  <div style="margin-left:250px;width:70%">
    <a-card title="创建新的团队" :bordered="false" style="width: 800px;" headStyle="font-size:20px"></a-card>
    <a-form
      :form="form"
      @submit="handleSubmit"
      layout:Vertical
      style="margin:30px 0 0 40px;width:700px"
    >
      <a-form-item label="团队名称">
        <a-input
          allow-clear
          placeholder="为你的团队起个名字"
          v-model="teamname"
          v-decorator="['teamname', { rules: [{ required: true, message: '团队名称不能为空!' }] }]"
        />
      </a-form-item>
      <a-form-item label="团队介绍">
        <a-textarea
          allow-clear
          v-model="intro"
          placeholder="详细的团队介绍会帮助成员们迅速了解你的团队"
          :auto-size="{ minRows: 5, maxRows: 8 }"
          v-decorator="['intro', { rules: [{ required: true, message: '团队介绍不能为空!' }] }]"
        />
      </a-form-item>
      <a-form-item style="margin-top:5px">
        <a-button type="primary" html-type="submit" ghost>提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { postData } from "@/api/webpost";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "addtime" }),
      teamname: "name",
      intro: "intro",
      teamid: 0,
      visible: true
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
<style></style>
