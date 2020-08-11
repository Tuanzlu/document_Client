<template>
  <div class="Info_container">
      <p>个 人 信 息</p>
      <div class="Info_box">
        <div style="float:left;">
        <uploadPhoto></uploadPhoto></div>
        </br>
        <!--分割线-->
        <div style="float:left;width: 2px;height: 300px; background: #000;margin-right: 40px;margin-left: 20px;"></div> 
        
        <!--右边内容-->
        <a-list size="large">
            <div>
                <a-icon type="user" style="margin-right: 10px"/> 
                用户名：<a-input placeholder="从后台调用用户名" style="width:40%"/>
            </div>
            </br></br>
            <div>
                <a-icon type="lock"  style="margin-right: 10px"/>
                密码：（从后台调入）
                <a-button type="link" style="float: right;">修改</a-button>
            </div>
            </br>
            </br>
            <div>
                <a-icon type="wechat"  style="margin-right: 10px"/>
                微信：（从后台调入）
                <a-button type="link" style="float: right;">修改</a-button>
            </div>
            </br></br>
            <div>
                <a-icon type="mail"  style="margin-right: 10px"/>
                邮箱：（从后台调入）
                <a-button type="link" style="float: right;">修改</a-button>
            </div>
            </br></br>
            <div>
                <a-icon type="contacts"  style="margin-right: 10px ;float: center"/>
                账号ID：（从后台调入）
                <a-button type="link" style="float: right;">修改</a-button>
            </div>
        </a-list>
      </div> 
  </div>
</template>

<script>
import uploadPhoto from '@/components/uploadPhoto';
export default {
  components: {
        uploadPhoto,
  },
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
    width: 530px;
    border-radius: 3px;
    position: absolute;
    left: 30%;
    right: 30%;
    top: 10%;
    font-size: 30px;
}
.Info_box{
  border:3px solid #000;
  height: 460px;
  width: 600px;
  padding:50px 30px; 
  margin-bottom: 50px;
}


</style>