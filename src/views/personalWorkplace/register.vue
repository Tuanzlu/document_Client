<template>
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
              rules: [{ required: true, message: 'Username is required!' }],
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
        <div class = "register_footer">
            已有账号？
            <a href="#/register">
            去登录！
            </a>
            </br>
            </br>
            <a-button  @click="goPersonIndex" type="primary" html-type="submit" style="width: 80%">
                注 册
            </a-button>
        </div>
        </a-form-item>
    </a-form>
  </div>
</template>

<script>

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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
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
    goPersonIndex() {
        this.$router.push('/personIndex');
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