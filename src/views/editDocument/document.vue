<template>
  <div class="content">
    <div class="header">
      <div class="top">
        <a-button class="btn">
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
        <span v-show="!article.isNew">上次保存于{{ article.lasttime }}</span>
      </div>
      <div class="topRight">
        <a-button class="btn">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a-icon type="more" />
            </a>
            <a-menu slot="overlay" @click="onClick">
              <a-menu-item key="1">
                编辑
              </a-menu-item>
              <a-menu-item key="2">
                保存
              </a-menu-item>
              <a-menu-item key="3">
                保存为模版
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-button>
      </div>
      <div class="topRight">
        <a-button class="wordBtn">
          协作
        </a-button>
        <a-button class="wordBtn">
          分享
        </a-button>
      </div>
      <div class="topRight">
        <a-button class="btn">
          <a-icon type="history" />
        </a-button>
      </div>
      <div class="topRight">
        <img class="avatar" style="width:30px;height:30px;" src="../../assets/bg.jpeg" />
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
      <div class="review">评论区</div>
      <div class="footer">
        <span class="footer-small">编写于</span>
        <span class="footer-big">金刚石文档</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
        isEdit: true,
        isModel: false,
        isNew: false,
        isCollected: false,
        title: "无标题",
        content: "暂无内容",
        lasttime: "2020-08-10 16:35",
      },
    };
  },
  methods: {
    collected() {
      this.article.isCollected = !this.article.isCollected;
    },
    onClick({ key }) {
      if (key == 1) {
        this.article.isEdit = true;
      } else if (key == 2) {
        this.article.isEdit = false;
      } else if (key == 3) {
        this.article.isModel = true;
      }
      console.log(`Click on item ${key}`);
    },
  },
};
</script>
<style lang="scss" scoped>
input,
textarea {
  outline: medium;
}
.inner-title {
  border: red 1px solid;
}
.inner-content {
  border: red 1px solid;

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
  border: none;
  width: 100%;
  height: 1120px;
  border: blue 1px solid;
}
.inner {
  border: red 1px solid;
  width: 616px;
  margin: 80px auto 0 auto;
  min-height: 1160px;
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
  padding-top: 130px;
  background-color: #f7f7f7;
}
.main-edit {
  border: blue 1px solid;
  background-color: white;
  margin: 0px auto 50px auto;
  width: 816px;
  min-height: 1323px;
}
.main-read {
  border: blue 1px solid;
  background-color: white;
  margin: 0px auto 50px auto;
  width: 816px;
  min-height: 1323px;
}
.editor {
  border: blue 1px solid;
  background-color: #f7f7f7;
  margin: 0 auto 50px auto;
  width: 900px;
  height: 50px;
}
.editor-tool {
  position: fixed;
  top: 60px;
  border: red 1px solid;
  background-color: #f7f7f7;
  margin: 0 auto 50px auto;
  width: 100%;
  height: 70px;
}
.review {
  border: blue 1px solid;
  background-color: white;
  margin: 10px auto 50px auto;
  width: 816px;
  height: 500px;
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
