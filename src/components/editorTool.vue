<template>
  <div class="editor-tool">
    <div ref="editor" style="text-align: left;height:1323px"></div>
    <!-- <button v-on:click="getContent">查看内容</button> -->
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editable: true,
      editorContent: "",
    };
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    },
  },
  watch: {
    isEdit: {
      deep: true,
      handler(val) {
        this.editable = val;
        if (this.editable == false) {
          console.log(this.editable);
          this.$emit("Edit", this.editorContent);
        }
      },
    },
  },

  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = (html) => {
      this.editorContent = html;
    };
    editor.create();
  },
};
</script>

<style scoped>
.editor-tool {
  /* border: yellow 1px solid; */
  min-height: 623px;
  width: 900px;
  margin: auto;
}

::v-deep .w-e-menu-panel * {
  padding: 3px;
  margin: 0;
  box-sizing: border-box;
}
::v-deep .w-e-toolbar .w-e-menu {
  position: relative;
  text-align: center;
  padding: 5px 13px;
  cursor: pointer;
}

::v-deep .w-e-text-container {
  min-height: 623px;
  width: 816px;
  margin-top: 30px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
::v-deep .w-e-text {
  background-color: white;
  min-height: 623px;
  /* border: white 1px solid; */
  overflow-y: scroll;
  padding: 80px 60px 30px 60px;
}
</style>
