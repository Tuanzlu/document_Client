<template>
<div class="register_container">
    <p>找 回 密 码</p>
    <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="输入用户名">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            },
          ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="安全问题">
        <a-input
          v-decorator="[
            'question',
            {
              rules: [{ required: true, message: 'question is required!' }],
            },
          ]"
        />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="答案">
        <a-input
          v-decorator="[
            'answer',
            {
              rules: [{ required: true, message: 'answer is required!' }],
            },
          ]"
        />
        </a-form-item>
        <div class = "register_footer">
            已有账号？
            <a href="#/login">
            去登录！
            </a>
            </br>
            </br>
            <a-button  type="primary" html-type="submit" style="width: 70%">
                提 交
            </a-button>
            <a-modal
                title="重置密码"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
                >
                <a-form-item v-bind="formItemLayout" label="重置密码" has-feedback>
                    <a-input v-model="password"
                        v-decorator="[
                        'password',
                        {
                            rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: validateToNextPassword,
                            },
                            { min: 3, message: '密码长度大于3', trigger: 'blur' },
                            ],
                        },
                        ]"
                        type="password"
                    />
                </a-form-item>
            </a-modal>
        </div>
        </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
export default {
  data() {
    return {
      confirmDirty: false,
      userid:"",
      password: "",
      autoCompleteResult: [],
      visible: false,
      confirmLoading: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'set' });
  },
  methods: {
    //获取安全验证模块
    get(values){
      this.password="";
      let params = new URLSearchParams();
      params.append('username', values.username);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getUserQuestionByUsername;
      getData(url,params).then((res) => {
        //console.log(res.data);
        if(res.code === '0'){
          if(res.data.question === values.question 
              && res.data.answer === values.answer){
                this.$message.success('验证成功');
                this.visible = true;
                this.userid = res.data.userid;
          }
        }
        else if(res.code === '1'){
          this.$message.error('用户名重复，请更换');
        }
        else{
          console.log(res.code);
          this.$message.error('服务器返回出错');
        }
      });
    },
    //重新设置密码
    set(){
      let params = new URLSearchParams();
      params.append('userid', this.userid);
      params.append('password', this.password);
      //console.log(this.password);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.setPassword;
      putData(url,params).then((res) => {
        //console.log(res.data);
        if(res.code === '0'){
          this.$message.success('修改成功');
          this.$router.push("/login");
        }
        else if(res.code === '1'){
          this.$message.error('用户名重复，请更换');
        }
        else{
          console.log(res.code);
          this.$message.error('服务器返回出错');
        }
      });
    },
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      console.log(this.password);
      this.set();
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    //表单验证函数
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          //console.log(11111111111111);  
          console.log(values);
          this.get(values);
        }
        else{
          this.$message.error('请检查输入格式');
        }
      });
    },
  },
};
</script>
<style>
.register_container{
  width: 400px;
  border-radius: 3px;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 10%;
}
.register_container p{
  font-size: 30px;

}
.register_container div{
    text-align:right;
}
</style>