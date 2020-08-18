<template>
<div class="total">
<div class="register_container">
    <p>注 册</p>
    <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="输入邮箱">
        <a-input
            v-decorator="[
            'email',
            {
                rules: [
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ],
            },
            ]"
        />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="输入用户名">
        <a-input
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: 'Username is required!' },
              { min: 3, message: '用户名长度大于3', trigger: 'blur' },],
            },
          ]"
        />
      </a-form-item>
        <a-form-item v-bind="formItemLayout" label="设置密码" has-feedback>
        <a-input
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
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
        <a-input
            v-decorator="[
            'confirm',
            {
                rules: [
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                {
                    validator: compareToFirstPassword,
                },
                ],
            },
            ]"
            type="password"
            @blur="handleConfirmBlur"
        />
        </a-form-item>
        
        <a-form-item v-bind="formItemLayout" label="微信号">
        <a-input
          v-decorator="[
            'wechatNumber',
            {
              rules: [{ required: true, message: 'wechatNumber is required!' }],
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

        <a-form-item v-bind="formItemLayout" label="个人简介">
        <a-textarea placeholder="" :rows="4" 
          v-decorator="[
            'intro',
            {
              rules: [{ required: true, message: 'Introduce is required!' }],
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
            <a-button  type="primary" html-type="submit" style="width: 80%">
                注 册
            </a-button>
        </div>
        </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
import { postData } from "@/api/webpost";
export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
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
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    //注册验证模块
    register(values){
      let params = new URLSearchParams();
      params.append('username', values.username); 
      params.append('password', values.password);
      params.append('email', values.email);
      params.append('wechat', values.wechatNumber);
      
      params.append('intro', values.intro);
      params.append('question', values.question);
      params.append('answer', values.answer);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.register;
      postData(url,params).then((res) => {
        console.log(res);
        if(res.code === '0'){
          this.$message.success('注册成功');
          this.$router.push('/login');
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
    //表单验证函数
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.register(values);
        }
        else{
          this.$message.error('请检查输入格式');
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
};
</script>
<style>
.total {
  background:url("../../assets/bg.jpeg");
  width: 100%;
  height: 800px;
  background-size:cover
}
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