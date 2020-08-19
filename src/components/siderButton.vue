<template>
  <div style="margin-top:48px;margin-right:110px">
    <div class="myButton" @click="createDocument">新 建 文  档</div>     
    </br></br></br>
    <div  class="myButton" @click="toModel">模 板 库</div>
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
.myButton {
  text-align:center;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background-color:#a8c97f;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Verdana;
	font-size:16px;
	font-weight:bold;
	padding:10px 16px;
	text-decoration:none;
	text-shadow:0px 1px 0px #090f00;
  width: 130px;
  position: fixed;
}
.myButton:hover {
	background-color:#a8bf93;
}
.myButton:active {
	position:relative;
	top:1px;
}

</style>