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
                <span> 用户名：{{info.name}}</span>
                <a-button type="link" style="float: right;">修改</a-button>
            </div>
            </br></br>
            <div>
                <a-icon type="contacts"  style="margin-right: 10px ;float: center"/>
                <span>账号ID：{{info.userId}}</span>
            </div>
            </br></br>
            <div>
                <a-icon type="lock"  style="margin-right: 10px"/>
                <span> 密码：{{info.password}}</span>
                <a-button type="link" style="float: right;">修改</a-button>
            </div>
            </br>
            </br>
            <div>
                <a-icon type="wechat"  style="margin-right: 10px"/>
                <span> 微信：{{info.wechat}}</span>
                <a-button @click="toggleModal" type="link" style="float: right;">修改</a-button>
                <inputBox ref="chooseButton" v-show="showModal" v-on:closeme="closeme"></inputBox>
            </div>
            </br></br>
            <div>
                <a-icon type="mail"  style="margin-right: 10px"/>
                <span> 邮箱：{{info.email}}</span>
                <a-button type="link" style="float: right;">修改</a-button>
            </div>
            
        </a-list>
      </div> 
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import uploadPhoto from '@/components/uploadPhoto';
import inputBox from '@/components/inputBox';
export default {
  components: {
        uploadPhoto,inputBox
  },
  data() {
    return {
      info: {
        email: '123@buaa.com',
        name: 'username',
        userId: 0,
        password: '12345',
        wechat: 'wechat',
      },
      showModal:false,
    };
  },
  methods: {
    toggleModal(){
      this.showModal = !this.showModal;
    },
    closeme(){
      //let res = this.$refs.chooseButton.getChoose();
      //console.log(res);
      this.showModal = !this.showModal;
    },
    getInfo() {
      let params = new URLSearchParams();
      let userId = parseInt(window.sessionStorage.getItem('UserId'));
      params.append("userid", userId);
      let url = this.$urlPath.website.getUserInfo;
      getData(url,params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("查询成功");
        } else if (res.code === "1") {
          this.$message.error("未登录");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    }
  },
  mounted() {
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