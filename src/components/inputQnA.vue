<template>
  <div class="modal-backdrop">
    <div class="modal" :style="mainStyles">
      <div class="modal-header">
        <h3>请输入修改之后的信息</h3>
      </div>
      <div class="modal-body">
        <a-input style="width: 250px;" v-model="ques" placeholder="请输入新的密保问题">
          <a-icon slot="prefix" type="question" />
          <a-tooltip slot="suffix" title="Extra information"> </a-tooltip>
        </a-input>

        <a-input style="width: 250px; margin-top: 15px;" v-model="ans" placeholder="请输入新的密保问题答案">
          <a-icon slot="prefix" type="info" />
          <a-tooltip slot="suffix" title="Extra information"> </a-tooltip>
        </a-input>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">确认</button>
        <button type="button" class="btn-close" @click="closeJust">关闭</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ques: "",
      ans: "",
      mainStyles: "",
      temp: {},
    };
  },
  methods: {
    closeSelf() {
      this.temp.ques = this.ques;
      this.temp.ans = this.ans;
      this.temp.flag = 1;
      this.ques = "";
      this.ans = "";
      this.$emit("closeEmail");
    },
    closeJust() {
      this.ques = "";
      this.ans = "";
      this.temp.flag = 0;
      this.temp.ques = "";
      this.temp.ans = "";
      this.$emit("closeEmail");
    },
    getChoose() {
      return this.temp;
    },
  },
};
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 300px;
}
.modal-header {
  /*(border-bottom: 1px solid #eee; */
  color: #313131;
  justify-content: space-between;
  padding: 15px;
  display: flex;
}
.modal-footer {
  /*border-top: 1px solid #eee; */
  justify-content: flex-end;
  padding: 10px;
  display: flex;
}
.modal-body {
  position: relative;
  padding: 0px 10px;
  text-align: center;
  font-size: 18px;
  margin-right: 40px;
  margin-left: 10px;
}
.btn-close {
  border-radius: 8px;
  margin-left: 16px;
  width: 56px;
  height: 36px;
  border: none;
  cursor: pointer;
}
.btn-close {
  color: #fff;
  background-color: #2d8cf0;
}
</style>
