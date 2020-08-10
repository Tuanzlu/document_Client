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
        <span v-show="!isNew">上次保存于{{ article.lasttime }}</span>
      </div>
      <div class="topRight">
        <a-button class="btn">
          <a-icon type="more" />
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
    <div class="body">
      <div class="editor">富文本编辑器</div>
      <div class="main">内容编辑区</div>
      <div class="review">评论区</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {
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
      console.log(this.article.isCollected);
      console.log(!this.article.isCollected);
    },
  },
};
</script>
<style lang="scss" scoped>
.name {
  border: 1px solid red;
  max-width: 300px;
  font-size: 20px;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
}
.header {
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
  margin: 0 5px 0 5px;
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
.main {
  border: blue 1px solid;
  background-color: white;
  margin: 10px auto 50px auto;
  width: 816px;
  height: 1323px;
}
.editor {
  border: blue 1px solid;
  background-color: white;
  margin: 10px auto 50px auto;
  width: 900px;
  height: 100px;
}
.review {
  border: blue 1px solid;
  background-color: white;
  margin: 10px auto 50px auto;
  width: 816px;
  height: 500px;
}
</style>
