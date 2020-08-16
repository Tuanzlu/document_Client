<template>
  <div class="login_container">
    <p>登 录</p>
    <a-form-model ref="loginRef" :model="loginForm">
      <a-form
        ref="loginRef"
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [
                  { required: true, message: '请输入用户名' },
                  { min: 3, message: '用户名长度大于3', trigger: 'blur' },
                ],
              },
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请输入密码' },
                  { min: 3, message: '密码长度大于3', trigger: 'blur' },
                ],
              },
            ]"
            placeholder="Password"
            type="password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-model-item>
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
          <a-button html-type="submit" class="login-form-button">
            登 录
          </a-button>
          没有账号？
          <a href="#/register">
            去注册！
          </a>
        </a-form-model-item>
      </a-form>
    </a-form-model>
  </div>
</template>

<script>
import { postData } from "@/api/webpost";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      loginForm: {
        username: "12",
        password: "12121",
        userId: 1,
      },
    };
  },
  methods: {
    //登录验证模块
    login(values) {
      let params = new URLSearchParams();
      params.append("username", values.userName);
      params.append("password", values.password);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.login;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("登录成功");
          window.sessionStorage.setItem("UserId", res.data.userid);
          const webAdrs = window.sessionStorage.getItem("WebAdrs");
          if (webAdrs) {
            console.log("that way" + webAdrs);
            this.$router.push(webAdrs.substr(23));
          } else if (!webAdrs) {
            console.log("this way");
            this.$router.push("/used");
          }
        } else if (res.code === "1" || res.code === "2") {
          this.$message.error("用户名或密码错误");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //表单验证函数
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.login(values);
        } else {
          this.$message.error("请检查输入");
        }
      });
    },
  },
  mounted() {
    //this.postLogin(params);
  },
};
</script>
<style>
.login_container {
  width: 300px;
  border-radius: 3px;
  position: absolute;
  left: 40%;
  right: 30%;
  top: 10%;
}
.login_container p {
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
