<template>
  <div class="cardList">
    <div class="singleCard" v-for="(item, i) in list" :key="i" style="background-color:#ede4cd;">
      <a-card hoverable class="card" @click="toDoc(item,i)">
        <a-icon
          type="file-word"
          style="color:#98623c; font-size:90px ;margin-left:-20px;margin-top:-20px;padding:10px"
        />
        <a-dropdown class="set">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a href="#">
              <a-icon type="setting" style="color:#a8bf93" />
            </a>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="toReturn(item,i)">恢复文档</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="toDelete(item,i)">彻底删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <span>
          <a-tooltip placement="bottom" :title="item.title">
            <p>{{ item.title}}</p>
          </a-tooltip>
        </span>
      </a-card>
    </div>
  </div>
</template>


<script>
import { deleteData } from "@/api/webdelete";
import { putData } from "@/api/webput";
export default {
  props: ["list"],
  methods: {
    toDoc(item) {
      this.$router.push({
        path: "/document",
        query: {
          docid: item.docid
        }
      });
    },
    toReturn(item, i) {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      params.append("docid", item.docid);
      let url = this.$urlPath.website.recoverDoc;
      //console.log(111111111111111111);
      putData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.list.splice(i, 1);
          this.$message.success("恢复成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    toDelete(item, i) {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      params.append("docid", item.docid);
      let url = this.$urlPath.website.deleteDocTotally;
      deleteData(url, params).then(res => {
        console.log(res.code);
        if (res.code === "0") {
          this.list.splice(i, 1);
          this.$message.success("删除成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.singleCard {
  display: block;
  float: left;
  margin: 25px;
}
.cardList {
  height: 500px;
  width: 800px;
  margin: 30px 60px 30px 60px;
}
.card {
  text-align: center;
  height: 150px;
  width: 120px;
}
h3 {
  font-size: 15px;
}
.set {
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 100;
}
p {
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  word-break: break-all; /* 内容自动换行 */
}
</style>
