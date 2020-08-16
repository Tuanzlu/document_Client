<template>
  <div>
    <div class="cardList">
      <div class="singleCard" v-for="(item, i) in list" :key="i">
        <a-card hoverable class="card" @click="toDoc(item, i)">
          <img
            slot="cover"
            src="../assets/word1.jpg"
            alt="example"
            style="width:90px;height:90px;margin:10px auto -20px auto"
          />
          <a-dropdown class="set">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a href="#"><a-icon type="setting"/></a>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="toCoop">协作</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="toShare" ref="myshare">分享</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="toDelete(item, i)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <span>
            <h3>{{ item.title }}</h3>
          </span>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteData } from "@/api/webdelete";

export default {
  props: ["list"],
  methods: {
    toShare() {
      this.flag = !this.flag;
    },
    toDoc(item) {
      this.$router.push({
        path: "/document",
        query: {
          docid: item.docid,
        },
      });
    },
    toDelete(item, i) {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem("UserId"));
      params.append("userid", userId);
      params.append("docid", item.docid);
      let url = this.$urlPath.website.deleteDoc;
      deleteData(url, params).then((res) => {
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
    },
  },
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
</style>
