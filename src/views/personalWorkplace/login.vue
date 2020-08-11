<template>
  <div class="login_container">
    <p>登 录</p>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            },
          ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          v-decorator="[
            '密码',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          记住密码
        </a-checkbox>
        <a class="login-form-forgot" href="">
          忘记密码？
        </a>
        <a-button @click="goPersonIndex" type="primary" html-type="submit" class="login-form-button">
          登 录
        </a-button>
        没有账号？
        <a href="#/register">
          去注册！
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    goPersonIndex() {
        this.$router.push('/personIndex');
    },
  },
};
</script>
<style>
.login_container{
  width: 300px;
  border-radius: 3px;
  position: absolute;
  left: 40%;
  right: 30%;
  top: 10%;
}
.login_container p{
  font-size: 30px;

}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

</style>