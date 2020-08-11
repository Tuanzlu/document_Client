<template>
  <div class="Info_container">
      <p>个 人 信 息</p>
        <a-list size="large">
            <div>
                <a-icon type="user"/> 
                用户名：<a-input placeholder="从后台调用用户名" style="width:50%"/>
            </div>
            </br>
            <div>
                <a-icon type="lock" />
                密码：（从后台调入）
            </div>
            </br>
            <div>
                <a-icon type="wechat" />
                微信：（从后台调入）
            </div>
            </br>
            <div>
                <a-icon type="contacts" />
                账号ID：（从后台调入）
            </div>
        </a-list>
       
  </div>
</template>

<script>

export default {
    
    data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
  },
}
</script>

<style>
.Info_container {
    width: 400px;
    border-radius: 3px;
    position: absolute;
    left: 30%;
    right: 30%;
    top: 10%;
    font-size: 30px;
}
</style>