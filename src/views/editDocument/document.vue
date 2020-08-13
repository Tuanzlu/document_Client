<template>
  <div class="content">
    <div class="header">
      <div class="top">
        <a-button class="btn" @click="toLast">
          <a-icon type="left" />
        </a-button>
        <a-button class="btn">
          <a-icon type="plus" />
        </a-button>
      </div>
      <div class="top">
        <span class="name">{{ article.title }}</span>
      </div>
      <div class="top">
        <a-button class="btn" @click="collected">
          <a-icon type="star" theme="filled" v-if="article.isCollected" />
          <a-icon type="star" theme="outlined" v-else />
        </a-button>
      </div>
      <div class="top" :class="{ time: !article.isNew }">
        <span v-show="!article.isNew">上次保存于{{ article.modifytime }}</span>
      </div>
      <div class="topRight">
        <a-button class="btn">
          <a-dropdown class="more-card">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a-icon type="more" />
            </a>
            <a-menu class="more" slot="overlay" @click="onClick">
              <a-menu-item key="1">
                编辑
              </a-menu-item>
              <a-menu-item key="2">
                保存
              </a-menu-item>
              <a-menu-item key="3">
                保存为模版
              </a-menu-item>
              <a-menu-item key="4">
                创建副本
              </a-menu-item>
              <a-menu-item key="5">
                删除
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-button>
      </div>
      <div class="topRight">
        <a-popover class="cooperation" placement="bottomRight">
          <template slot="content">
            <div class="one-content" v-if="isaddShare">
              <div class="search-bar">
                <a-input-search
                  class="search-bar-input"
                  placeholder="输入姓名/邮箱/手机号/部门 添加协作权限"
                  @search="onSearch"
                />
              </div>
              <div class="co-table-one">
                <a-table
                  style="width:600px;margin-left:-40px;height:500px"
                  :columns="columns"
                  :data-source="codata"
                  size="small"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="false"
                >
                  <template slot="avatar">
                    <img
                      style="height:30px;width:30px"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </template>
                  <template slot="perms">
                    <a-select default-value="lucy" style="width: 120px" @change="handleChange">
                      <a-select-option value="read">
                        只能阅读
                      </a-select-option>
                      <a-select-option value="comment">
                        只能评论
                      </a-select-option>
                      <a-select-option value="edit">
                        可以编辑
                      </a-select-option>
                    </a-select>
                  </template>
                </a-table>
              </div>
            </div>
            <div class="two-content" v-else>
              <div class="search-bar">
                <a-input-search
                  class="search-bar-input"
                  placeholder="输入姓名/邮箱/手机号/部门 添加协作权限"
                  @search="onSearch"
                />
              </div>
              <div class="co-table-two">
                <div>
                  <span style="float:left">协作者</span>
                  <a-button style="float:right;z-index:99" type="default" size="small">添加协作者</a-button>
                  <a-divider></a-divider>
                </div>
                <a-table
                  style="width:600px;margin-left:-40px;height:200px"
                  :columns="columns"
                  :data-source="codata"
                  size="small"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="false"
                >
                  <template slot="avatar">
                    <img
                      style="height:30px;width:30px"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </template>
                  <template slot="perms">
                    <a-select default-value="lucy" style="width: 120px" @change="handleChange">
                      <a-select-option value="read">
                        只能阅读
                      </a-select-option>
                      <a-select-option value="comment">
                        只能评论
                      </a-select-option>
                      <a-select-option value="edit">
                        可以编辑
                      </a-select-option>
                    </a-select>
                  </template>
                </a-table>
              </div>
              <div class="manage-table">
                <div>
                  <span style="float:left">管理者</span>
                  <a-button style="float:right;z-index:99" type="default" size="small">添加管理者</a-button>
                  <a-divider></a-divider>
                </div>
                <a-table
                  style="width:600px;margin-left:-40px;height:200px"
                  :columns="columns"
                  :data-source="codata"
                  size="small"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="false"
                >
                  <template slot="avatar">
                    <img
                      style="height:30px;width:30px"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </template>
                  <template slot="perms">
                    <a-select default-value="lucy" style="width: 120px" @change="handleChange">
                      <a-select-option value="manager">
                        管理者
                      </a-select-option>
                      <a-select-option value="member">
                        成员
                      </a-select-option>
                    </a-select>
                  </template>
                </a-table>
              </div>
            </div>
          </template>
          <template slot="title">
            <div class="one-title" v-if="isaddShare">
              <a-button class="btn" @click="backDown">
                <a-icon type="left" />
              </a-button>
              <div class="one-title-text"><span>添加协作者</span></div>
            </div>
            <div class="two-title" v-else>
              <span>文档 {{ article.title }}</span>
            </div>
          </template>
          <a-button class="wordBtn">
            协作
          </a-button>
        </a-popover>
        <a-popover class="share" placement="bottomRight">
          <template slot="content">
            <div class="share-content">
              <div class="share-code"></div>
              <div class="share-link">链接：{{ href }}</div>
            </div>
          </template>
          <template slot="title">
            <div class="share-title">
              <span>分享链接</span>
            </div>
          </template>
          <a-button class="wordBtn">
            分享
          </a-button>
        </a-popover>
      </div>
      <div class="topRight">
        <a-button class="btn">
          <a-icon type="history" />
        </a-button>
      </div>
      <div class="topRight">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <span style="font-size: 16px; margin: 10px;">{{ user.username }}</span>
            <img class="avatar" style="width: 30px; height: 30px;" src="../../assets/bg.jpeg" />
          </a>
          <a-menu class="more" slot="overlay" @click="avatarOnClick">
            <a-menu-item key="1">
              账号设置
            </a-menu-item>
            <a-menu-item key="2">
              使用帮助
            </a-menu-item>
            <a-menu-item key="3">
              退出登录
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div class="body">
      <div class="editor-tool" v-if="isEdit">
        <div class="editor-inner">
          <div class="inner-title"><input class="input-title" v-model="article.title" type="text" /></div>
          <a-divider></a-divider>
          <editor :isEdit="isEdit" @Edit="Edit" style="width:816px;margin-bottom:80px"></editor>
        </div>
      </div>
      <!-- <div class="main-edit" v-if="article.isEdit">
        <div class="inner">
          <div class="inner-title"><input class="input-title" v-model="article.title" type="text" /></div>
          <a-divider></a-divider>
          <div class="inner-content"><textarea class="input-content" v-model="article.content"></textarea></div>
        </div>
      </div> -->
      <div class="main-read" v-else>
        <div class="inner">
          <div class="inner-title">{{ article.title }}</div>
          <a-divider></a-divider>
          <div class="inner-content">{{ article.content }}</div>
        </div>
      </div>
      <div class="review">
        <div class="review-title">评论区</div>
        <a-divider></a-divider>
        <div class="review-list">
          <a-list style="min-height:380px" item-layout="horizontal" :data-source="commentList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.content">
                <a slot="title" href="https://www.antdv.com/">{{ item.username }}</a>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-divider></a-divider>
        </div>
        <div class="review-input">
          <a-textarea style="resize:none" v-model="review.comment" placeholder="输入评论内容" :rows="4" />
          <a-button style="float: right; margin: 10px;" type="default" size="small" @click="addComment">发表</a-button>
        </div>
      </div>
      <div class="footer">
        <span class="footer-small">编写于</span>
        <span class="footer-big">金刚石文档</span>
      </div>
    </div>
  </div>
</template>

<script>
// import Cookies from "js-cookie";
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import { postData } from "@/api/webpost";
import editor from "@/components/editorTool.vue";
const codata = [
  {
    key: "1",
    src: "头像",
    username: "Tom",
    wechat: "13611793768",
    perms: "管理者",
  },
  {
    key: "2",
    src: "头像",
    username: "Tom",
    wechat: "13611793768",
    perms: "管理者",
  },
  {
    key: "3",
    src: "头像",
    username: "Tom",
    wechat: "13611793768",
    perms: "管理者",
  },
  {
    key: "4",
    src: "头像",
    username: "Tom",
    wechat: "13611793768",
    perms: "管理者",
  },
  {
    key: "5",
    src: "头像",
    username: "Tom",
    wechat: "13611793768",
    perms: "管理者",
  },
];
const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    align: "right",
    scopedSlots: { customRender: "avatar" },
  },
  {
    title: "Username",
    dataIndex: "username",
    align: "left",
  },
  {
    title: "Wechat",
    dataIndex: "wechat",
    align: "right",
  },
  {
    title: "Perms",
    dataIndex: "perms",
    align: "center",
    scopedSlots: { customRender: "perms" },
  },
];
const data = [
  {
    title: "user 1",
    comment: "这篇文章第二行有错别字，需要更改",
  },
  {
    title: "user 2",
    comment: "这篇文章第二行有错别字，需要更改",
  },
  {
    title: "user 3",
    comment: "这篇文章第二行有错别字，需要更改",
  },
  {
    title: "user 4",
    comment: "这篇文章第二行有错别字，需要更改",
  },
];
export default {
  components: {
    editor,
  },
  props: ["docidnum"],
  data() {
    return {
      content: "",
      data,
      canComment: false,
      isEdit: true,
      codata,
      columns,
      href: "http://123.56.145.79:8090" + window.location.href.substr(21),
      review: {
        title: "user",
        comment: "",
      },
      isaddShare: true,
      user: {
        userid: parseInt(window.sessionStorage.getItem("UserId")),
        username: "陆清媛",
      },
      article: {
        docid: 10,
        isEdit: true,
        isModel: false,
        isNew: false,
        isCollected: false,
        userid: "",
        shareperms: "",
        teamid: "",
        status: "",
        deletetime: "",
        title: "无标题",
        content: "暂无内容",
        modifytime: "2020-08-10 16:35",
      },
      commentList: [],
    };
  },
  mounted() {
    this.article.docid = this.$route.query.docidnum;
    console.log(this.article.docid);
    this.user.userid = parseInt(window.sessionStorage.getItem("UserId"));

    this.getDocument();
    this.getComment();
    // Cookies.set("LoginUserId", "6");
    // if (this.article.isNew == false) {
    //   this.getDocument();
    // }
  },
  methods: {
    // addNewDoc(){
    //   this.createDocument();
    // },
    Edit(data) {
      this.article.content = data;
      console.log(data);
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    addComment() {
      this.data.add(this.review);
    },
    toLast() {
      this.$router.go(-1);
    },
    backDown() {
      this.isaddShare = false;
    },
    collected() {
      this.article.isCollected = !this.article.isCollected;
    },
    onClick({ key }) {
      if (key == 1) {
        this.isEdit = true;
      } else if (key == 2) {
        this.isEdit = false;
        this.updateDocument();
      } else if (key == 3) {
        this.article.isModel = true;
      } else if (key == 4) {
        this.createDocument();
      } else if (key == 5) {
        this.article.status = 1;
      }
      console.log(`Click on item ${key}`);
    },
    avatarOnClick({ key }) {
      if (key == 1) {
        this.$router.push("/personInfo");
      } else if (key == 2) {
        this.$router.push("/help");
      } else if (key == 3) {
        console.log("退出登录");
      }
      console.log(`Click on item ${key}`);
    },
    getDocument() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.readDoc;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.user.username = res.data.authorname;
          this.canComment = res.data.canComment;
          this.article = res.data.doc;
          this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("用户未登录");
        } else if (res.code === "2") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    updateDocument() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("title", this.article.title);
      params.append("content", this.article.content);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.writeDoc;
      putData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("用户未登录");
        } else if (res.code === "2") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    createDocument() {
      let params = new URLSearchParams();
      params.append("title", this.article.title);
      params.append("content", this.article.content);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addDoc;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
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
    getComment() {
      let params = new URLSearchParams();
      params.append("docid", 1);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getComment;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("操作成功");
          this.commentList = this.res.data.commentList;
        } else if (res.code === "1") {
          this.$message.error("操作失败");
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
::v-deep .ant-table-tbody > tr > td {
  border-bottom: none;
  transition: all 0.3s, border 0s;
}
::v-deep .ant-table-small {
  border: none;
}
.manage-table {
  // border: blue 1px solid;
  margin: 20px;
  overflow: scroll;
}
.co-table-one {
  // border: blue 1px solid;
  margin: 20px;
  overflow: scroll;
}
.co-table-two {
  // border: blue 1px solid;
  margin: 20px;
  overflow: scroll;
}

.search-bar-input {
  width: 400px;
}
.search-bar {
  margin: auto;
  width: 400px;
}
.review-title {
  font-size: 18px;
  margin: 10px auto -10px auto;
  // border: red 1px solid;
}
.review {
  border: blue 1px solid;
  background-color: white;
  margin: 30px auto 50px auto;
  width: 816px;
  height: 620px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.review-list {
  // border: blue 1px solid;
  margin: 0 auto 20px auto;
  width: 750px;
  height: 380px;
  overflow: scroll;
}
.review-input {
  width: 750px;
  margin: auto;
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
  height: 600px;
}
.two-content {
  // border: red 1px solid;
  width: 600px;
  height: 600px;
}

.share-content {
  // border: red 1px solid;
  width: 280px;
  height: 280px;
  margin: 20px;
}
.share-title {
  // border: red 1px solid;
  font-size: 20px;
  text-align: center;
}
.share-code {
  background-color: green;
  border: red 1px solid;
  width: 200px;
  height: 200px;
  margin: 40px auto 10px auto;
}
.share-link {
  text-align: center;
  // border: red 1px solid;
  width: 250px;
  height: 30px;
  margin: 20px auto 10px auto;
}
.more {
  margin-top: 5px;
}
input,
textarea {
  outline: medium;
}
.inner-content {
  white-space: pre;
}
.input-title,
.input-title:active,
.input-title:hover {
  border: none;
}
.input-content,
.input-content:active,
.input-content:hover {
  resize: none;
  border: none;
  width: 100%;
  height: 1120px;
  margin-top: -10px;
  // border: blue 1px solid;
}
.inner {
  // border: red 1px solid;
  width: 616px;
  margin: 80px auto 20px auto;
  min-height: 823px;
  background-color: white;
}
.inner-title {
  background-color: white;
  font-size: 24px;
  margin-bottom: 30px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}

.name {
  // border: 1px solid red;
  max-width: 300px;
  font-size: 20px;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
}
.header {
  overflow: hidden;
  width: 100%;
  height: 60px;
  background-color: white;
}
.content {
  min-height: 823px;
  background-color: #f7f7f7;
}
.wordBtn {
  text-align: center;
  width: 50px;
  height: 30px;
  margin: 0;
  padding: 0 5px 0 5px;
}
.btn {
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 0 5px 0 5px;
  padding: 0 5px 0 5px;
}
.top {
  float: left;
  margin: 15px 10px 0 10px;
}
.topRight {
  float: right;
  margin: 15px 10px 0 10px;
}
.time {
  margin-top: 20px;
  color: rgb(190, 189, 189);
}
.body {
  border: red 1px solid;
  // padding-top: 130px;
  background-color: #f7f7f7;
}
// .main-edit {
//   border: white 1px solid;
//   background-color: white;
//   margin: 0 auto 50px auto;
//   width: 816px;
//   min-height: 1323px;
// }
.main-read {
  border: white 1px solid;
  background-color: white;
  margin: 30px auto 50px auto;
  width: 816px;
  min-height: 823px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.editor-inner {
  border: transparent 1px solid;
  margin: 0 auto 30px auto;
  width: 816px;
  height: 823px;
}
.editor-tool {
  // border: green 1px solid;
  background-color: #f7f7f7;
  margin: 10px auto 30px auto;
  width: 100%;
  min-height: 823px;
}

.footer-small {
  // border: blue 1px solid;
  width: 50px;
  text-align: center;
  display: inline-block;
  margin: auto;
}
.footer-big {
  // border: blue 1px solid;
  width: 80px;
  font-size: 16px;
  text-align: center;
  display: inline-block;
  margin: auto;
}
.footer {
  // border: red 1px solid;
  width: 200px;
  text-align: center;
  display: block;
  margin: -20px auto 0 auto;
  height: 60px;
}
</style>
