<template>
  <div>
      <div id="components-layout-demo-basic">
        <a-layout>
         <a-layout-header>
             <a-row>
                 <a-col :span="4">
                    logo图标（待补）
                </a-col>
                <a-col :span="17">
                    
                </a-col>
                <a-col :span="2">
                    <a-button type="primary" @click="goLogin()" :size="size" >
                    登录
                    </a-button>
                   
                </a-col>
                <a-col :span="1">
                     <a-button @click="goRegister()" :size="size">
                    注册
                    </a-button>
                   
                </a-col>
            </a-row>
         </a-layout-header>
        </a-layout>
      </div>

  </div>
</template>

<script>
export default {
    methods: {
            goLogin() {
                this.$router.push('/login');
            },
            goRegister() {
                this.$router.push('/register');
            }
        }
}
</script>

<style scoped>
#components-layout-demo-basic {
  text-align: left;
  
  font-weight: bold;  
  margin: 0px;
}
#components-layout-demo-basic .ant-layout-header{
  background: #7dbcea;
  color: #fff;
}

</style>