<template>
  <div>
    <div class="cardList">
      <div class="singleCard" v-for="(item, i) in list" :key="i" style="background-color: #ede4cd;">
        <a-card hoverable class="card" @click="toDoc(item, i)">
          <a-icon
            type="file-word"
            style="color: #98623c; font-size: 90px; margin-left: -20px; margin-top: -20px; padding: 10px;"
          />
          <div>
            <a-dropdown class="set">
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                <a href="#">
                  <a-icon type="setting" style="color: #d6c6af; font-size: 23px;" />
                </a>
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="toCoop(item)">协作</a>
                  <a-modal v-model="visible" title="添加协作者" @ok="handleOk" width="650px" :footer="null">
                    <div class="one-content" v-if="isaddShare">
                      <div class="search-bar">
                        <a-button class="btn" @click="backDown">
                          <a-icon type="left" />
                        </a-button>
                        <a-input-search
                          class="search-bar-input"
                          placeholder="输入用户名 添加协作权限"
                          v-model="searchWord"
                          @search="handleSearch"
                        />
                      </div>
                      <div class="co-table-one">
                        <a-table
                          class="table-add"
                          :columns="columns"
                          :data-source="searchUser"
                          size="small"
                          :rowKey="(record) => record.userid"
                          :bordered="false"
                          :pagination="false"
                          :showHeader="true"
                        >
                          <template slot="avatar" slot-scope="text, record">
                            <a-avatar style="height: 30px; width: 30px;" :src="record.userimgpath" />
                          </template>
                          <template slot="perms" slot-scope="text, record">
                            <a-select
                              style="width: 120px;"
                              defaultValue="修改权限"
                              @change="(e) => handleChange(e, record.userid)"
                            >
                              <a-select-option v-for="item in items" :value="item.value" :key="item.value">{{
                                item.value
                              }}</a-select-option>
                            </a-select>
                          </template>
                        </a-table>
                      </div>
                    </div>
                    <div class="two-content" v-else>
                      <div class="search-bar">
                        <a-input-search
                          class="search-bar-input"
                          placeholder="输入用户名 添加协作权限"
                          v-model="searchWord"
                          @search="handleSearch"
                        />
                        <a-button @click="refreshList" type="default" style="float: right;">刷新列表</a-button>
                      </div>
                      <div class="co-table-two" v-for="(item, i) in userList" :key="i">
                        <span class="type-text">{{ item.type }}</span>
                        <a-table
                          class="perm-table"
                          :columns="showColumns"
                          :data-source="item.list"
                          size="small"
                          :rowKey="(record) => record.userid"
                          :bordered="false"
                          :pagination="false"
                          :showHeader="false"
                        >
                          <template slot="avatar" slot-scope="text, record">
                            <a-avatar style="height: 30px; width: 30px;" :src="record.userimgpath" />
                          </template>
                          <template slot="perms" slot-scope="text, record">
                            <a-select
                              style="width: 120px;"
                              defaultValue="修改权限"
                              @change="(e) => handleChange(e, record.userid)"
                            >
                              <a-select-option v-for="item in items" :value="item.value" :key="item.value">{{
                                item.value
                              }}</a-select-option>
                            </a-select>
                          </template>
                        </a-table>
                      </div>
                    </div>
                  </a-modal>
                </a-menu-item>
                <a-menu-item>
                  <a @click="toShare(item)" ref="myshare">分享</a>
                  <a-modal v-model="shareVisible" title="分享文档" @ok="shareHandleOk" width="450px" :footer="null">
                    <div class="share-content">
                      <div class="switch">
                        <span style="float: left;">公开链接：</span>
                        <a-switch @change="onChange" style="float: left;" />
                      </div>
                      <div class="single-selection" v-show="isOpenShare">
                        <a-radio-group v-model="value" @change="onChangeRadio">
                          <a-radio :value="1">只能阅读</a-radio>
                          <a-radio :value="2">只能评论</a-radio>
                          <a-radio :value="3">可以编辑</a-radio>
                        </a-radio-group>
                      </div>
                      <div class="share-code">
                        <vue-qr :logoSrc="imageUrl" :text="href" :size="200"></vue-qr>
                      </div>
                      <div class="share-link">链接：{{ href }}</div>
                    </div>
                  </a-modal>
                </a-menu-item>
                <a-menu-item>
                  <a @click="toDelete(item, i)">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <div>
            <a-tooltip placement="bottom" :title="item.title">
              <p>{{ item.title }}</p>
            </a-tooltip>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import { deleteData } from "@/api/webdelete";
import { putData } from "@/api/webput";
import { getData } from "@/api/webget";
const userList = [
  {
    type: "只能阅读",
    key: "1",
    list: [],
  },
  {
    type: "只能评论",
    key: "2",
    list: [],
  },
  {
    type: "可以编辑",
    key: "3",
    list: [],
  },
];

const columns = [
  {
    title: "头像",
    dataIndex: "avatar",
    align: "right",
    scopedSlots: { customRender: "avatar" },
  },
  {
    title: "用户名",
    dataIndex: "username",
    align: "center",
  },
  {
    title: "微信号",
    dataIndex: "wechat",
    align: "center",
  },
  {
    title: "操作权限",
    dataIndex: "perms",
    align: "center",
    scopedSlots: { customRender: "perms" },
  },
];
const showColumns = [
  {
    title: "头像",
    dataIndex: "avatar",
    align: "right",
    width: "100px",
    scopedSlots: { customRender: "avatar" },
  },
  {
    title: "用户名",
    dataIndex: "username",
    align: "center",
    width: "150px",
  },
  {
    title: "微信号",
    dataIndex: "wechat",
    align: "center",
    width: "200px",
  },
  {
    title: "操作权限",
    dataIndex: "perms",
    align: "center",
    width: "100px",
    scopedSlots: { customRender: "perms" },
  },
];
const items = [
  {
    key: 0,
    value: "只能阅读",
  },
  {
    key: 1,
    value: "只能评论",
  },
  {
    key: 2,
    value: "可以编辑",
  },
  {
    key: 3,
    value: "删除已有权限",
  },
];
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      href: window.location.href,
      imageUrl: require("../assets/bg.jpeg"),
      searchWord: "",
      isaddShare: true,
      columns,
      value: 1,
      items,
      doc: {},
      showColumns,
      userList,
      searchUser: [],
      visible: false,
      shareVisible: false,
      isOpenShare: false,
      user: {
        userid: parseInt(window.sessionStorage.getItem("UserId")),
        username: "",
      },
    };
  },
  props: ["list"],
  methods: {
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    shareHandleOk(e) {
      console.log(e);
      this.shareVisible = false;
    },
    onChangeRadio(e) {
      this.updateSharePerms(e.target.value);
      console.log("radio checked", e.target.value);
    },
    onChange(checked) {
      if (checked == true) {
        this.isOpenShare = true;
        this.updateSharePerms(1);
      } else {
        this.updateSharePerms(0);
        this.isOpenShare = false;
      }
      console.log(`a-switch to ${checked}`);
    },
    toCoop(doc) {
      this.doc = doc;
      console.log(doc);
      this.visible = true;
      this.getPermsList(doc.docid);
    },
    //获取用户权限列表
    getPermsList() {
      let params = new URLSearchParams();
      params.append("docid", this.doc.docid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getPermsList;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.userList[0].list = res.data.onlyCanReadList;
          this.userList[1].list = res.data.onlyCanCommentList;
          this.userList[2].list = res.data.onlyCanWriteList;
          console.log("获取权限列表成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    handleChange(val, userid) {
      console.log("val=" + val);
      console.log("userid=" + userid);
      if (val == "只能阅读") {
        this.replacePermsByUserid(userid, 1);
      } else if (val == "只能评论") {
        this.replacePermsByUserid(userid, 2);
      } else if (val == "可以编辑") {
        this.replacePermsByUserid(userid, 3);
      } else if (val == "删除已有权限") {
        this.deletePerms(userid);
      }
    },
    backDown() {
      this.searchWord = "";
      this.isaddShare = false;
      this.getPermsList(this.doc.docid);
    },
    refreshList() {
      this.getPermsList(this.doc.docid);
    },
    //移除权限
    deletePerms(doneid) {
      let params = new URLSearchParams();
      params.append("docid", this.doc.docid);
      params.append("doneid", doneid);
      params.append("doid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.deletePerms;
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("删除权限成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else if (res.code === "2") {
          this.$message.error("不能删除创建者的权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //通过用户名查找用户
    getUserByUsername() {
      let params = new URLSearchParams();
      params.append("username", this.searchWord);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getUserByUsername;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.searchUser = res.data.userList;
          console.log("查询成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有符合条件的用户");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //通过用户id设置权限
    replacePermsByUserid(doneid, key) {
      let params = new URLSearchParams();
      params.append("docid", this.doc.docid);
      params.append("doneid", doneid);
      params.append("privateperms", key);
      params.append("doid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.replacePermsByUserid;
      putData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success(res.msg);
        } else if (res.code === "1") {
          this.$message.error(res.msg);
        } else if (res.code === "2") {
          this.$message.error(res.msg);
        } else if (res.code === "3") {
          this.$message.error(res.msg);
        } else if (res.code === "4") {
          this.$message.error(res.msg);
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //更改分享权限
    updateSharePerms(value) {
      let params = new URLSearchParams();
      params.append("docid", this.doc.docid);
      params.append("userid", this.user.userid);
      params.append("shareperms", value);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.updateSharePerms;
      putData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log("更改分享权限成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    toShare(doc) {
      this.href = "http://123.56.145.79:8100/#/document?docid=" + doc.docid;
      this.doc = doc;
      this.shareVisible = true;
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
    handleSearch() {
      this.isaddShare = true;
      this.getUserByUsername();
    },
  },
};
</script>
<style lang="scss" scoped>
.table-add {
  width: 550px;
  margin-left: 0px;
  height: 500px;
}
.perm-table {
  width: 550px;
  margin-top: -90px;
  margin-left: 0px;
  height: 100px;
}
.single-selection {
  margin: 0px auto 30px auto;
}
.switch {
  margin: -25px auto 30px auto;
  padding-bottom: 10px;
}
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
.btn {
  float: left;
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 0 50px 0 -30px;
  padding: 0 5px 0 5px;
}
.card {
  text-align: center;
  height: 150px;
  width: 120px;
}
p {
  text-align: center;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  word-break: break-all; /* 内容自动换行 */
}
.set {
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 100;
}
.one-title-text {
  display: inline-block;
  width: 500px;
  font-size: 20px;
  // border: red 1px solid;
  text-align: center;
}
.two-title {
  font-size: 20px;
}
.one-content {
  // border: red 1px solid;
  width: 600px;
  height: 500px;
}
.two-content {
  // border: red 1px solid;
  width: 600px;
  height: 500px;
}
.co-table-one {
  // border: blue 1px solid;
  display: block;
  margin: 20px;
  overflow: scroll;
}
.co-table-two {
  // border: blue 1px solid;
  margin: 10px auto 10px auto;
  overflow: scroll;
  width: 550px;
  height: 150px;
}
.type-text {
  float: left;
  color: grey;
  font-size: 16px;
}
.search-bar-input {
  width: 400px;
}
.search-bar {
  margin: auto;
  width: 500px;
  // border: red 1px solid;
}
.share {
  z-index: 1000;
}
.share-content {
  // border: red 1px solid;
  width: 350px;
  height: 380px;
  margin: 20px;
}
.share-title {
  // border: red 1px solid;
  font-size: 20px;
  text-align: center;
}
.share-code {
  background-color: green;
  // border: red 1px solid;
  width: 200px;
  height: 200px;
  margin: 10px auto 10px auto;
}
.share-link {
  text-align: left;
  // border: red 1px solid;
  width: 400px;
  height: 30px;
  margin: 20px auto 10px auto;
}
</style>
