<template>
  <div class="total">
    <div class="register_container">
      <p>找 回 密 码</p>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="输入用户名"
      >
        <a-input v-model="username" />
      </a-form-item>
      <a-button
        type="primary"
        @click="get()"
        block
        style="margin-left:80px;margin-bottom:30px;width:70%"
        v-show="!isGet"
      >提 交</a-button>
      <span v-show="isGet">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label=" 您的安全问题是："
        >
          <a-input v-model="question" disabled />
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="请输入您的答案"
        >
          <a-input v-model="answer2" />
        </a-form-item>
        <a-button
          type="primary"
          @click="valid()"
          block
          style="margin-left:80px;margin-bottom:30px;width:70%"
        >提 交</a-button>
      </span>

      <a-form :form="form2" @submit="handleSubmit2">
        <div class="register_footer">
          已有账号？
          <a href="#/login">去登录！</a>
          <br />
          <br />

          <a-modal
            title="重置密码"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <a-form-item
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 12 }"
              label="重置密码"
              has-feedback
            >
              <a-input
                v-model="password"
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
      </a-form>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
export default {
  data() {
    return {
      form2: this.$form.createForm(this, { name: "set" }),
      isGet: false,
      question: "",
      answer: "",
      answer2: "",
      username: "",
      confirmDirty: false,
      userid: "",
      password: "",
      autoCompleteResult: [],
      visible: false,
      confirmLoading: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  methods: {
    //获取安全验证模块
    get() {
      if (this.username.length == 0) {
        this.$message.error("输入的用户名为空");
      } else {
        let params = new URLSearchParams();
        params.append("username", this.username);
        //调用封装的postData函数，获取服务器返回值
        let url = this.$urlPath.website.getUserQuestionByUsername;
        getData(url, params).then(res => {
          //console.log(res.data);
          if (res.code === "0") {
            this.username = res.data.username;
            this.question = res.data.question;
            this.answer = res.data.answer;
            this.userid = res.data.userid;
            this.isGet = true;
          } else if (res.code === "1") {
            this.$message.error("用户名不存在");
          } else {
            console.log(res.code);
            this.$message.error("服务器返回出错");
          }
        });
      }
    },
    valid() {
      if (this.answer == this.answer2) {
        this.visible = true;
      } else {
        this.$message.error("答案错误");
      }
    },
    //重新设置密码
    set() {
      let params = new URLSearchParams();
      params.append("userid", this.userid);
      params.append("password", this.password);
      //console.log(this.password);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.setPassword;
      putData(url, params).then(res => {
        //console.log(res.data);
        if (res.code === "0") {
          this.$message.success("修改成功");
          this.$router.push("/login");
        } else if (res.code === "1") {
          this.$message.error("用户名重复，请更换");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回出错");
        }
      });
    },

    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      console.log(this.password);
      if (this.password.length < 3) {
        this.$message.error("密码长度太短");
      } else {
        this.set();
      }
      setTimeout(() => {
        this.confirmLoading = false;
      }, 1);
    },
    handleCancel() {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    //表单验证函数

    handleSubmit2(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(err => {
        if (!err) {
          console.log("ok");
        } else {
          this.$message.error("请检查输入格式");
        }
      });
    }
  }
};
</script>
<style>
.total {
  background: url("../../assets/bg.jpeg");
  width: 100%;
  height: 1000px;
  background-size: cover;
}
.register_container {
  width: 500px;
  border-radius: 3px;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 10%;
  padding: 20px;
  padding-left: 50px;
  padding-right: 100px;
  background-color: white;
  opacity: 0.9;
}
.register_container p {
  font-size: 30px;
}
.register_container div {
  text-align: right;
}
</style>