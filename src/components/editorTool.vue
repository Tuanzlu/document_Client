<template>
  <div class="editor-tool">
    <a-button class="btn" v-on:click="getContent">保存</a-button>
    <div ref="editor" style="text-align: left;"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  props: {
    content: {
      type: String,
    },
  },
  data() {
    return {
      editorContent: "",
    };
  },
  methods: {
    getContent: function() {
      this.$emit("Edit", this.editorContent);
    },
  },
  watch: {
    content: function(newVal) {
      this.editorContent = newVal;
    },
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = (html) => {
      this.editorContent = html;
    };
    editor.customConfig.debug = true;
    // editor.customConfig.pasteFilterStyle = false;
    editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.pasteIgnoreImg = true;
    // 配置服务器端地址 upload:上传图片地址
    editor.customConfig.uploadImgServer = "http://123.56.145.79:8090/uploadUserImage";
    editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      console.log(files, insert);
      var objectURL = URL.createObjectURL(files[0]);
      // 上传代码返回结果之后，将图片插入到编辑器中
      insert(objectURL);
    };
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      //设置延迟执行
      editor.create();
      editor.txt.html(this.editorContent);
    }, 500);
  },
};
</script>

<style scoped>
.btn {
  /* border: 5px red solid; */
  float: right;
  background-color: #f7f7f7;
  text-align: center;
  width: 60px;
  height: 32px;
  margin: 0px 5px 0 5px;
  padding: 0 5px 0 5px;
}
.editor-tool {
  /* border: yellow 1px solid; */
  min-height: 823px;
  width: 1200px;
  margin: auto;
  z-index: 100 !important;
}
/* ::v-deep .w-e-menu-panel * {
  padding: 3px;
  margin: 0;
  box-sizing: border-box;
} */
::v-deep .w-e-toolbar .w-e-menu {
  position: relative;
  text-align: center;
  padding: 5px 11px;
  cursor: pointer;
  z-index: 102 !important;
}

::v-deep .w-e-text-container {
  z-index: 100 !important;
  min-height: 760px;
  width: 816px;
  margin-top: 80px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
::v-deep .w-e-text {
  background-color: white;
  min-height: 580px;
  /* border: white 1px solid; */
  overflow-y: scroll;
  padding: 60px 60px 0px 60px;
}
</style>
