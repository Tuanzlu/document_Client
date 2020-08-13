<template>
  <div class="Info_container">
      <p>个 人 信 息</p>
      <div class="Info_box">
        <div style="float:left;">
        <uploadPhoto></uploadPhoto>
        </div>
        </br>
        <!--分割线-->
        <div style="float:left;width: 2px;height: 300px; background: #000;margin-right: 40px;margin-left: 20px;"></div>  
        <!--右边内容-->
        <a-list size="large">
            <div>
                <a-icon type="user" style="margin-right: 10px"/> 
                <span> 用户名：{{info.username}}</span>
            </div>
            </br></br>
            <div>
                <a-icon type="contacts"  style="margin-right: 10px ;float: center"/>
                <span>账号ID：{{info.userid}}</span>
            </div>
            </br></br>
            <div>
                <a-icon type="lock"  style="margin-right: 10px"/>
                <span> 密码：{{info.password}}</span>
                <a-button @click="toPwd" type="link" style="float: right;">修改</a-button>
                <inputPwd ref="choosePwd" v-show="showPwd" v-on:closePwd="closePwd"></inputPwd>
            </div>
            </br>
            </br>
            <div>
                <a-icon type="wechat"  style="margin-right: 10px"/>
                <span> 微信：{{info.wechat}}</span>
                <a-button @click="toWechat" type="link" style="float: right;">修改</a-button>
                <inputBox ref="chooseButton" v-show="showWechat" v-on:closeme="closeme"></inputBox>
            </div>
            </br></br>
            <div>
                <a-icon type="mail"  style="margin-right: 10px"/>
                <span> 邮箱：{{info.email}}</span>
                <a-button @click="toEmail" type="link" style="float: right;">修改</a-button>
                <inputEmail ref="chooseE" v-show="showEmail" v-on:closeEmail="closeEmail"></inputEmail>
            </div>
            
        </a-list>
      </div> 
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import uploadPhoto from '@/components/uploadPhoto';
import inputBox from '@/components/inputBox';
import inputEmail from '@/components/inputEmail';
import inputPwd from '@/components/inputPwd';
export default {
  components: {
        uploadPhoto,
        inputBox,
        inputEmail,
        inputPwd,
  },
  data() {
    return {
      info: [],
      showWechat:false,
      showEmail: false,
      showPwd: false,
    };
  },
  methods: {
    email_blur(e) {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(e)) {
          return false;
      } else {
          return true;
      }
    },
    toWechat(){
      this.showWechat = !this.showWechat;
    },
    toEmail(){
      this.showEmail = !this.showEmail;
    },
    toPwd(){
      this.showPwd = !this.showPwd;
    },
    closePwd(){
      let res = this.$refs.choosePwd.getChoose();
      this.showPwd = !this.showPwd;
      console.log(res);
      if(res.flag === 0){
        if(res.new !== res.confirm){
          this.$message.error("请检查新密码和确认密码是否一致");
        }
        else if(res.confirm.length < 3){
          this.$message.error("密码必须大于三位");
        }
        else{
         // console.log(res.confirm.length);
          this.changePa(res.old,res.new);
        }
      }
      else{
        if(res[3] === 1)
          this.$message.error("请输入完全");
      }
    },
    closeEmail(){
      let res = this.$refs.chooseE.getChoose();
      this.showEmail = !this.showEmail;
      let select = this.email_blur(res);
      if(!select){
        this.$message.error("请检查邮箱输入格式");
      }
      else if(res){
        this.info.email = res;
        console.log(this.info.email);
        this.changeWE();
      }
    },
    closeme(){
      let res = this.$refs.chooseButton.getChoose();
      this.showWechat = !this.showWechat;
      if(res){
        this.info.wechat = res;
        console.log(this.info.wechat);
        this.changeWE();
      }
    },
    getInfo() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem('UserId'));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUserInfo;
      getData(url,params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          //this.$message.success("查询成功");
          this.info = res.data;
          this.info.password = "●●●●●●●●●●●●";
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    changeWE(){
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem('UserId'));
      params.append("userid", userId);
      params.append("wechat", this.info.wechat);
      params.append("email", this.info.email);
      console.log(this.change);
      let url = this.$urlPath.website.updateUserInfo;
      putData(url,params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("修改成功");
          this.info.wechat = res.data.wechat;
          this.change = '';
        } else if (res.code === "1") {
          this.$message.error("原密码输入错误");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    changePa(oldpwd,newpwd){
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem('UserId'));
      params.append("userid", userId);
      params.append("oldpwd", oldpwd);
      params.append("newpwd", newpwd);
      let url = this.$urlPath.website.alterPassword;
      putData(url,params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("修改成功");
        } else if (res.code === "1") {
          this.$message.error("原密码错误");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
  },
  created() {
    this.getInfo();

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