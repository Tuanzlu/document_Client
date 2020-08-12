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
                  :columns="columns"
                  :data-source="codata"
                  size="small"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="false"
                />
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
                <a-table
                  :columns="columns"
                  :data-source="codata"
                  size="small"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="false"
                />
              </div>
              <div class="manage-table">
                <a-table
                  :columns="columns"
                  :data-source="codata"
                  size="small"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="false"
                />
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
            <img class="avatar" style="width:30px;height:30px;" src="../../assets/bg.jpeg" />
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
    <div class="editor-tool" v-if="article.isEdit">
      <div class="editor">富文本编辑器</div>
    </div>
    <div class="body">
      <div class="main-edit" v-if="article.isEdit">
        <div class="inner">
          <div class="inner-title"><input class="input-title" v-model="article.title" type="text" /></div>
          <a-divider></a-divider>
          <div class="inner-content"><textarea class="input-content" v-model="article.content"></textarea></div>
        </div>
      </div>
      <div class="main-read" v-else>
        <div class="inner">
          <div class="inner-title">{{ article.title }}</div>
          <a-divider></a-divider>
          <div class="inner-content">{{ article.content }}</div>
        </div>
      </div>
      <div class="review">
        <div class="review-list">
          <div class="review-title">评论区</div>
          <a-divider></a-divider>
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.comment">
                <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-divider></a-divider>
        </div>
        <div class="review-input">
          <a-textarea v-model="review.comment" placeholder="输入评论内容" :rows="4" />
          <a-button style="float:right;margin:10px;" type="default" size="small" @click="addComment">发表</a-button>
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
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import { postData } from "@/api/webpost";
const codata = [
  {
    key: "1",
    src: "头像",
    username: "Tom",
    wechat: "12345",
    perms: "管理者",
  },
  {
    key: "2",
    src: "头像",
    username: "Tom",
    wechat: "12345",
    perms: "管理者",
  },
  {
    key: "3",
    src: "头像",
    username: "Tom",
    wechat: "12345",
    perms: "管理者",
  },
];
const columns = [
  {
    title: "Avatar",
    dataIndex: "src",
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Wechat",
    dataIndex: "wechat",
  },
  {
    title: "Perms",
    dataIndex: "perms",
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
  data() {
    return {
      data,
      codata,
      columns,
      href: "http://123.56.145.79:8090" + window.location.href.substr(21),
      review: {
        title: "user",
        comment: "",
      },
      isaddShare: true,
      user: {
        userid: 1,
        username: "lqy",
      },
      article: {
        docid: 42,
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
    };
  },
  methods: {
    // addNewDoc(){
    //   this.createDocument();
    // },
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
        this.article.isEdit = true;
      } else if (key == 2) {
        this.article.isEdit = false;
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
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.readDoc;
      getData(url, params).then((res) => {
        console.log(res.code);
        this.article = res.data.Doc;
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
    updateDocument() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("title", this.article.title);
      params.append("content", this.article.content);
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
  },
  mounted() {
    if (this.article.isNew == false) {
      this.getDocument();
    }
  },
};
</script>
<style lang="scss" scoped>
.manage-table {
  margin: 20px;
}
.co-table-one,
.co-table-two {
  margin: 20px;
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
  // border: blue 1px solid;
  background-color: white;
  margin: 10px auto 50px auto;
  width: 816px;
  height: 560px;
}
.review-list {
  margin: 0 auto 20px auto;
  width: 750px;
  height: 400px;
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
  height: 400px;
}
.two-content {
  // border: red 1px solid;
  width: 600px;
  height: 400px;
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
  margin: 80px auto 0 auto;
  min-height: 1160px;
  background-color: white;
}
.inner-title {
  font-size: 24px;
  margin-bottom: -10px;
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
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: white;
}
.content {
  min-height: 800px;
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
  border: blue 1px solid;
  padding-top: 130px;
  background-color: #f7f7f7;
}
.main-edit {
  border: white 1px solid;
  background-color: white;
  margin: 0 auto 50px auto;
  width: 816px;
  min-height: 1323px;
}
.main-read {
  border: white 1px solid;
  background-color: white;
  margin: 0px auto 50px auto;
  width: 816px;
  min-height: 1323px;
}
.editor {
  z-index: 99;
  border: blue 1px solid;
  background-color: #f7f7f7;
  margin: 0 auto 50px auto;
  text-align: center;
  font-size: 20px;
  width: 900px;
  height: 50px;
}
.editor-tool {
  z-index: 99;
  position: fixed;
  top: 60px;
  // border: red 1px solid;
  background-color: #f7f7f7;
  margin: 0 auto 50px auto;
  width: 100%;
  height: 70px;
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
